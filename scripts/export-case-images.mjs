// Build the case-study images from the originals already in public/work
// (case-study handoff, section 7), at 2x where the original allows it.
//
//   node scripts/export-case-images.mjs [--dry-run] [--only arctic,dexla]
//
// Every output is checked before it is written: it is downscaled to the size
// of the approved 1x capture in waande-case-handoff/assets/<key>.webp and
// compared with it. Arctic Edge captures are slightly inset from the full
// phone frame, so the crop offset is searched for, not assumed.
//
// Several Arctic screens are near-identical (System off vs No connection
// differs by ~0.5 mean, while resampling alone costs ~5), so a threshold
// can't catch a wrong mapping there. Each Arctic capture is therefore also
// ranked against every original in public/work/arctic-edge, and the mapped
// file must be the closest match. A wrong source or crop fails loudly.
//
// Writes public/work/<slug>/<name>.webp (1x) and <name>@2x.webp, and prints
// the sizes to put in the components.
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ASSETS = join(ROOT, "waande-case-handoff", "assets");
const WORK = join(ROOT, "public", "work");
const DRY_RUN = process.argv.includes("--dry-run");
const onlyIdx = process.argv.indexOf("--only");
const ONLY = onlyIdx > -1 ? process.argv[onlyIdx + 1].split(",") : null;
/** Mean absolute channel difference (0–255) allowed against the approved 1x capture. */
const MAX_MEAN_DIFF = 8;

const ARCTIC = [
  ["ae_cool", "Cooling", "cooling"],
  ["ae_heat", "Heating", "heating"],
  ["ae_off", "System on", "system-off"],
  ["ae_noconn", "System on-2", "no-connection"],
  ["ae_locked", "Locked indicator in interface", "locked"],
  ["ae_lockm", "Lock confirmation modal", "lock-sheet"],
  ["ae_connlost", "System on-3", "connection-lost"],
  ["ae_force", "Force start", "force-start"],
  ["ae_tcold", "Set temperature", "temp-cold"],
  ["ae_twarm", "Set temperature-1", "temp-warm"],
  ["ae_sched", "Timing sessions", "schedules"],
  ["ae_add_on", "Timing sessions-6", "add-power-on"],
  ["ae_add_off", "Timing sessions-7", "add-power-off"],
  ["ae_added", "Session added", "schedule-added"],
  ["ae_timer", "Session timer", "session-set"],
  ["ae_active", "Session timer-2", "session-active"],
  ["ae_done", "Session timer-1", "session-complete"],
  ["ae_settings", "Timing sessions-1", "settings"],
].map(([key, file, name]) => ({ group: "arctic", key, src: `arctic-edge/${file}.png`, slug: "arctic-edge", name, search: true }));

const OTHERS = [
  // The Arctic Edge cover; the live site wrongly serves it as Dexla's 04-style-guide.png.
  { group: "arctic", key: "ae_cover", src: "dexla-design-system/04-style-guide.png", slug: "arctic-edge", name: "cover" },
  { group: "dexla", key: "dx_brand", src: "dexla-design-system/02-problem.png", slug: "dexla-design-system", name: "brand" },
  { group: "dexla", key: "dx_atomic", src: "dexla-design-system/05-atomic-design.png", slug: "dexla-design-system", name: "atomic" },
  { group: "dexla", key: "dx_editor", src: "dexla-design-system/07-no-code-editor.png", slug: "dexla-design-system", name: "editor" },
  { group: "dexla", key: "dx_components", src: "dexla-design-system/06-core-components.png", slug: "dexla-design-system", name: "components" },
  { group: "dexla", key: "dx_docs", src: "dexla-design-system/09-documentation.png", slug: "dexla-design-system", name: "docs" },
];

const meanDiff = (a, b) => {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += Math.abs(a[i] - b[i]);
  return sum / a.length;
};

/** Raw RGB of `img` resized to w×h. */
const rgb = (img, w, h) => img.clone().removeAlpha().resize(w, h, { fit: "fill" }).raw().toBuffer();

/** Blurred thumbnails of every Arctic original at a given crop, for ranking. */
const RANK_W = 198;
const RANK_H = 434;
const rankCache = new Map();
async function arcticCandidates(box) {
  const key = JSON.stringify(box);
  if (!rankCache.has(key)) {
    const dir = join(WORK, "arctic-edge");
    const files = (await readdir(dir)).filter((f) => f.endsWith(".png"));
    const thumbs = await Promise.all(
      files.map(async (f) => [
        `arctic-edge/${f}`,
        await sharp(join(dir, f)).flatten({ background: "#000" }).extract(box).resize(RANK_W, RANK_H, { fit: "fill" }).blur(1).removeAlpha().raw().toBuffer(),
      ]),
    );
    rankCache.set(key, thumbs);
  }
  return rankCache.get(key);
}

async function build(job) {
  const capture = sharp(join(ASSETS, `${job.key}.webp`));
  const { width: cw, height: ch } = await capture.metadata();
  const want = await capture.clone().removeAlpha().raw().toBuffer();
  const source = sharp(join(WORK, job.src)).flatten({ background: "#000" });
  const { width: sw, height: sh } = await source.metadata();

  // Crop box in source px. Default: the whole image. Arctic: search for the inset
  // (the capture is 396×869 out of a 402×874 phone, i.e. a few px off each edge).
  let box = { left: 0, top: 0, width: sw, height: sh };
  if (job.search) {
    const k = sw / 402; // source px per 1x px
    let best = null;
    for (let dx = 0; dx <= 6; dx += 0.5) {
      for (let dy = 0; dy <= 5; dy += 0.5) {
        const b = { left: Math.round(dx * k), top: Math.round(dy * k), width: Math.round(cw * k), height: Math.round(ch * k) };
        if (b.left + b.width > sw || b.top + b.height > sh) continue;
        const d = meanDiff(await rgb(source.clone().extract(b), cw, ch), want);
        if (!best || d < best.d) best = { d, b };
      }
    }
    box = best.b;
  }

  if (job.search) {
    const cap = await sharp(join(ASSETS, `${job.key}.webp`)).resize(RANK_W, RANK_H, { fit: "fill" }).blur(1).removeAlpha().raw().toBuffer();
    const ranked = (await arcticCandidates(box)).map(([f, t]) => [f, meanDiff(t, cap)]).sort((a, b) => a[1] - b[1]);
    if (ranked[0][0] !== job.src) {
      throw new Error(`${job.key}: closest original is ${ranked[0][0]} (${ranked[0][1].toFixed(2)}), not ${job.src}`);
    }
  }

  const cropped = source.clone().extract(box);
  const diff = meanDiff(await rgb(cropped, cw, ch), want);
  if (diff > MAX_MEAN_DIFF) throw new Error(`${job.key}: mean diff ${diff.toFixed(2)} against the approved capture (crop ${JSON.stringify(box)})`);

  // 2x of the capture's size, capped at what the original actually has.
  const scale = Math.min(2, box.width / cw);
  const w2 = Math.round(cw * scale);
  const h2 = Math.round(ch * scale);
  const out = join(WORK, job.slug);
  if (!DRY_RUN) {
    await mkdir(out, { recursive: true });
    await writeFile(join(out, `${job.name}.webp`), await cropped.clone().resize(cw, ch).webp({ quality: 82 }).toBuffer());
    if (scale > 1.05) {
      await writeFile(join(out, `${job.name}@2x.webp`), await cropped.clone().resize(w2, h2).webp({ quality: 80 }).toBuffer());
    }
  }
  const hi = scale > 1.05 ? `@${scale.toFixed(2)}x ${w2}×${h2}` : "no 2x (original is 1x)";
  console.log(`${job.key.padEnd(14)} → ${job.slug}/${job.name}  1x ${cw}×${ch}  ${hi}  diff ${diff.toFixed(2)}`);
}

for (const job of [...ARCTIC, ...OTHERS]) {
  if (ONLY && !ONLY.includes(job.group)) continue;
  await build(job);
}
console.log(DRY_RUN ? "\nDry run: nothing written." : "\nDone.");
