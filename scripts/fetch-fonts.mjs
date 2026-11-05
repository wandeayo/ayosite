// Download the site's Google fonts into src/fonts/, so builds never fetch from Google Fonts.
//
//   node scripts/fetch-fonts.mjs
//
// Why: next/font/google downloads fonts during every build. On 2026-11-05 Google answered
// Vercel's production build with an Inter URL next/font 15.5 couldn't parse, and the build
// failed. next/font/local serves the same files from the same place (/_next/static/media),
// so nothing visible changes, but the build no longer depends on Google's response.
//
// This requests the CSS exactly as next/font/google does (same css2 URLs, same Chrome user
// agent, so Google returns woff2), keeps the latin face of each family (the subset every
// family here was configured with), downloads it, and prints each face's weight, style and
// unicode-range for the localFont() calls (see src/fonts/README.md).
//
// Guard: every non-ASCII character the site renders that falls outside latin must be absent
// from the font's other Google subsets too. Then dropping those subsets changes nothing: the
// characters already come from system fonts. The script fails if that stops being true.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "src", "fonts");
// next/font/google's user agent (next/dist/compiled/@next/font/dist/google/fetch-resource.js)
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36";

// The requests next/font/google made for this site's configs (union of weights per family).
const FAMILIES = [
  { name: "Geist", file: "geist", query: "Geist:wght@300;400;500;600" },
  { name: "Geist Mono", file: "geist-mono", query: "Geist+Mono:wght@400;500" },
  { name: "Inter", file: "inter", query: "Inter:wght@400;500;600" },
];

// Characters the site renders outside the latin range (see the commit that added this file).
const NON_LATIN = "←→↗↺≋⌃⌄✓✕✦❄❚⤢〜🛡";

const inRange = (cp, ranges) =>
  ranges.split(",").some((r) => {
    const [a, b] = r.trim().replace("U+", "").split("-");
    const lo = parseInt(a, 16);
    const hi = b ? parseInt(b, 16) : lo;
    return cp >= lo && cp <= hi;
  });

await mkdir(OUT, { recursive: true });
for (const fam of FAMILIES) {
  const res = await fetch(`https://fonts.googleapis.com/css2?family=${fam.query}&display=swap`, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${fam.name}: CSS request failed (${res.status})`);
  const css = await res.text();
  const faces = [...css.matchAll(/\/\*\s*([a-z-]+)\s*\*\/\s*@font-face\s*\{([^}]*)\}/g)].map(([, subset, body]) => ({
    subset,
    style: /font-style:\s*(\w+)/.exec(body)[1],
    weight: /font-weight:\s*(\d+)/.exec(body)[1],
    url: /src:\s*url\(([^)]+)\)/.exec(body)[1],
    range: /unicode-range:\s*([^;]+);/.exec(body)[1].trim(),
  }));

  for (const ch of NON_LATIN) {
    const cp = ch.codePointAt(0);
    const hit = faces.find((f) => f.subset !== "latin" && inRange(cp, f.range));
    if (hit) throw new Error(`${fam.name}: "${ch}" is in its ${hit.subset} subset; keeping only latin would change how it renders`);
  }

  const latin = faces.filter((f) => f.subset === "latin");
  const byStyle = new Map();
  for (const f of latin) {
    if (!/\.woff2$/.test(f.url)) throw new Error(`${fam.name}: unexpected font URL ${f.url}`);
    const file = `${fam.file}-${f.style}-latin.woff2`;
    const prev = byStyle.get(f.style);
    if (prev && prev.url !== f.url) throw new Error(`${fam.name} ${f.style}: weights use different files; expected one variable file`);
    byStyle.set(f.style, { ...f, file, weights: [...(prev?.weights ?? []), f.weight] });
  }
  for (const f of byStyle.values()) {
    const buf = Buffer.from(await (await fetch(f.url)).arrayBuffer());
    await writeFile(join(OUT, f.file), buf);
    console.log(`${fam.name.padEnd(17)} ${f.style.padEnd(7)} weights ${f.weights.join(",").padEnd(16)} → src/fonts/${f.file} (${(buf.length / 1024).toFixed(1)} KB)`);
  }
  console.log(`  latin unicode-range: ${latin[0].range}`);
  console.log(`  other subsets dropped: ${[...new Set(faces.map((f) => f.subset))].filter((s) => s !== "latin").join(", ") || "none"}`);
}
