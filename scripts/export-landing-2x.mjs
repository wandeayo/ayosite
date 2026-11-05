// Re-export the landing page thumbnail screens at 2x from Figma (handoff section 7).
//
//   FIGMA_TOKEN=figd_… node scripts/export-landing-2x.mjs [--dry-run] [--only arctic,carmen-02]
//   node scripts/export-landing-2x.mjs --from-dir ~/Desktop/figma-2x   (frames exported by hand)
//
// Figma's API limits Starter-plan tokens hard (a full run can lock a file
// out for days), so a normal run writes each verified image as it goes; use
// --dry-run sparingly. --from-dir skips the API: export each source node
// below from Figma at 2x as PNG, named <node id with - for :>.png.
//
// Each source frame is rendered through the Figma REST API at 2x of its 1x
// target width (1440 for web frames, 402 for the Arctic Edge phone), then
// cropped and painted out exactly as the bundled 1x assets were. Every result
// is checked before it is written: it's downscaled to 1x and compared with
// public/home/<name>.webp. A wrong crop or a missing paint-out fails loudly.
//
// After a clean run, set `hi: true` for the exported names in
// src/components/landing/thumbs/shot.tsx so the page serves them via srcset.
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "public", "home");
const TOKEN = process.env.FIGMA_TOKEN;
const DRY_RUN = process.argv.includes("--dry-run");
const argValue = (flag) => {
  const i = process.argv.indexOf(flag);
  return i > -1 ? process.argv[i + 1] : undefined;
};
/** Comma-separated asset-name prefixes to process, e.g. --only arctic */
const ONLY = argValue("--only")?.split(",");
/** Read frames exported by hand instead of calling the API (see readExported). */
const FROM_DIR = argValue("--from-dir");
/** Mean absolute channel difference (0–255) allowed between our 1x downscale and the shipped 1x. */
const MAX_MEAN_DIFF = 6;

const AYOSTRIDE = "vwDdZdo2eN64qSr1aHooSH";
const ARCTIC = "PZTu0Dqb8w4wOWDxUVSw1l";

// Rects are [x1, y1, x2, y2] in 1x frame coordinates, straight from section 7.
const ROW_TOPS = [354, 462, 570, 678, 786];
const STAT_LEFTS = [23, 277, 531, 785];
const ARCTIC_MARKER = { rect: [305, 631, 328, 643], color: "#212121" };

const SOURCES = [
  { file: AYOSTRIDE, node: "9:169064", width: 1440, out: [{ name: "carmen-01-scanning", crop: [0, 0, 1440, 1008] }] },
  {
    file: AYOSTRIDE,
    node: "9:169142",
    width: 1440,
    out: [
      {
        name: "carmen-02-review-base",
        crop: [0, 0, 1440, 1008],
        paint: [
          { rect: [600, 345, 1360, 895], color: "#fafafa" },
          { rect: [1080, 905, 1360, 962], color: "#fafafa" },
        ],
      },
      ...ROW_TOPS.map((y, i) => ({ name: `carmen-02-row-${i}`, crop: [605, y - 4, 1355, y + 102] })),
      { name: "carmen-02-buttons", crop: [1083, 908, 1354, 960] },
    ],
  },
  {
    file: AYOSTRIDE,
    node: "7:107656",
    width: 1440,
    // The handoff says "full frame", but the shipped 1x is the top 1500px of the
    // frame scaled to 1440 wide (the scroll in the timeline never goes further).
    out: [{ name: "carmen-03-campaign", crop: [0, 0, 1440, 1500], paint: [{ rect: [380, 427, 1388, 562], color: "#ffffff" }] }],
  },
  {
    file: AYOSTRIDE,
    node: "7:107678",
    width: null, // rendered at its own 2x; the stat crops are in the frame's own px
    out: STAT_LEFTS.map((x, i) => ({ name: `carmen-03-stat-${i}`, crop: [x, 177, x + 240, 306] })),
  },
  { file: AYOSTRIDE, node: "7:182106", width: 1440, out: [{ name: "airstride-01-board", crop: [0, 0, 1440, 1008] }] },
  { file: AYOSTRIDE, node: "7:184785", width: 1440, out: [{ name: "airstride-02-menu", crop: [1189, 482, 1428, 923] }] },
  { file: AYOSTRIDE, node: "7:183372", width: 1440, out: [{ name: "airstride-03-summary-modal", crop: [485, 185, 1005, 1056] }] },
  { file: ARCTIC, node: "274:10510", width: 402, out: [{ name: "arctic-01-cooling", crop: "full", paint: [ARCTIC_MARKER] }] },
  { file: ARCTIC, node: "107:1239", width: 402, out: [{ name: "arctic-02-heating", crop: "full", paint: [ARCTIC_MARKER] }] },
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/** Figma REST call. Retries 429s, honouring Retry-After (capped), with backoff. */
async function figma(path, attempt = 0) {
  const res = await fetch(`https://api.figma.com/v1${path}`, { headers: { "X-Figma-Token": TOKEN } });
  if (res.status === 429 && attempt < 5) {
    const retryAfter = Number(res.headers.get("retry-after"));
    const ms = Math.min(Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : 0, 120_000) || 5_000 * 2 ** attempt;
    console.log(`  rate limited on ${path.split("?")[0]}, retrying in ${Math.round(ms / 1000)}s`);
    await wait(ms);
    return figma(path, attempt + 1);
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Figma ${path} → ${res.status} ${body.err ?? body.message ?? ""}`.trim());
  return body;
}

/** A frame exported by hand from Figma at 2x, named after its node id (9:169064 → 9-169064.png). */
async function readExported(node, targetWidth) {
  const path = join(FROM_DIR, `${node.replace(":", "-")}.png`);
  const png = await readFile(path).catch(() => {
    throw new Error(`missing ${path} (export node ${node} from Figma at 2x as PNG)`);
  });
  const { width } = await sharp(png).metadata();
  return targetWidth && width !== 2 * targetWidth ? sharp(png).resize({ width: 2 * targetWidth }).png().toBuffer() : png;
}

/** Render one node so that its width is 2 × targetWidth (or plain 2x when targetWidth is null). */
async function render(file, node, targetWidth) {
  if (FROM_DIR) return readExported(node, targetWidth);
  let scale = 2;
  if (targetWidth) {
    const meta = await figma(`/files/${file}/nodes?ids=${encodeURIComponent(node)}`);
    const box = meta.nodes[node]?.document?.absoluteBoundingBox;
    if (!box) throw new Error(`node ${node} not found in ${file}`);
    scale = (2 * targetWidth) / box.width;
  }
  const { images } = await figma(`/images/${file}?ids=${encodeURIComponent(node)}&format=png&scale=${scale}`);
  const url = images[node];
  if (!url) throw new Error(`Figma returned no render for ${node}`);
  const png = Buffer.from(await (await fetch(url)).arrayBuffer());
  // Normalise to exactly 2 × target width: Figma rounds fractional scales.
  const img = sharp(png);
  const { width } = await img.metadata();
  return targetWidth && width !== 2 * targetWidth ? img.resize({ width: 2 * targetWidth }).png().toBuffer() : png;
}

async function build(frame, spec) {
  let img = sharp(frame);
  if (spec.paint?.length) {
    const composites = await Promise.all(
      spec.paint.map(async ({ rect: [x1, y1, x2, y2], color }) => ({
        input: await sharp({ create: { width: 2 * (x2 - x1), height: 2 * (y2 - y1), channels: 4, background: color } }).png().toBuffer(),
        left: 2 * x1,
        top: 2 * y1,
      })),
    );
    img = sharp(await img.composite(composites).png().toBuffer());
  }
  if (spec.crop !== "full") {
    const [x1, y1, x2, y2] = spec.crop;
    img = img.extract({ left: 2 * x1, top: 2 * y1, width: 2 * (x2 - x1), height: 2 * (y2 - y1) });
  }
  return img.png().toBuffer();
}

/** Downscale our 2x to 1x and compare with the shipped 1x asset. */
async function verify(name, png2x) {
  const ref = sharp(await readFile(join(OUT_DIR, `${name}.webp`)));
  const { width, height } = await ref.metadata();
  const got = await sharp(png2x).metadata();
  if (got.width !== 2 * width || got.height !== 2 * height) {
    throw new Error(`${name}: 2x is ${got.width}×${got.height}, expected ${2 * width}×${2 * height}`);
  }
  const a = await ref.removeAlpha().raw().toBuffer();
  const b = await sharp(png2x).resize(width, height, { kernel: "lanczos3" }).removeAlpha().raw().toBuffer();
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += Math.abs(a[i] - b[i]);
  return sum / a.length;
}

async function main() {
  if (!TOKEN && !FROM_DIR) {
    console.error("Set FIGMA_TOKEN to a Figma personal access token with File content: Read, or pass --from-dir.");
    process.exit(1);
  }
  const failures = [];
  const sources = SOURCES.map((s) => ({ ...s, out: s.out.filter((o) => !ONLY || ONLY.some((p) => o.name.startsWith(p))) })).filter(
    (s) => s.out.length,
  );
  for (const src of sources) {
    let frame;
    try {
      frame = await render(src.file, src.node, src.width);
    } catch (err) {
      for (const spec of src.out) failures.push(`${spec.name}: ${err.message}`);
      console.error(`FAILED ${src.node} (${src.out.map((s) => s.name).join(", ")}): ${err.message}`);
      continue;
    }
    for (const spec of src.out) {
      try {
        const png = await build(frame, spec);
        const diff = await verify(spec.name, png);
        if (diff > MAX_MEAN_DIFF) throw new Error(`${spec.name}: differs from shipped 1x (mean ${diff.toFixed(2)} > ${MAX_MEAN_DIFF})`);
        const target = join(OUT_DIR, `${spec.name}@2x.webp`);
        if (!DRY_RUN) await writeFile(target, await sharp(png).webp({ quality: 82, effort: 6 }).toBuffer());
        console.log(`${DRY_RUN ? "ok (dry run)" : "wrote"} ${spec.name}@2x.webp  mean diff ${diff.toFixed(2)}`);
      } catch (err) {
        failures.push(err.message);
        console.error(`FAILED ${err.message}`);
      }
    }
  }
  if (failures.length) {
    console.error(`\n${failures.length} asset(s) failed; nothing is wrong with the 1x set still in use.`);
    process.exit(1);
  }
  console.log("\nDone. Set `hi: true` for these names in src/components/landing/thumbs/shot.tsx.");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
