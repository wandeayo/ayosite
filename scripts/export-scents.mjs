// Build the Scents by Biba case study's data and images.
//
//   node scripts/export-scents.mjs <scents-shop-index.html> [--dry-run]
//
// Two inputs:
//  - waande-scents-handoff/reference/index.html, the approved case study. Its images are
//    base64 data URIs (phone screens, the link-preview card, bottle photos); they are
//    written out to public/side-quests/scents/ as .webp. It also says which perfumes each
//    figure shows and how each un-photographed bottle is drawn.
//  - the shop's built home page (scentsbybiba.vercel.app, or index.html from its preview
//    zip), which embeds the whole catalogue as <script id="catalog">. Every name, brand,
//    price, stock state and reference on the case study comes from there.
//
// The reference's own numbers were copied from the same catalogue, so they are checked
// against it: any perfume whose price, stock, reference or name disagrees fails the run,
// and so does a dupe guide whose three cheapest alternatives are not the ones it shows.
//
// Writes src/components/side-quests/scents/catalogue.ts and the images, and prints them.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REFERENCE = join(ROOT, "waande-scents-handoff", "reference", "index.html");
const OUT_IMG = join(ROOT, "public", "side-quests", "scents");
const OUT_TS = join(ROOT, "src", "components", "side-quests", "scents", "catalogue.ts");
const DRY_RUN = process.argv.includes("--dry-run");
const SHOP = process.argv.slice(2).find((a) => !a.startsWith("--"));
if (!SHOP) {
  console.error("usage: node scripts/export-scents.mjs <scents-shop-index.html> [--dry-run]");
  process.exit(1);
}

const fail = (msg) => {
  console.error(`✗ ${msg}`);
  process.exitCode = 1;
};

/* ---------------------------------------------------------------- inputs */

const ref = await readFile(REFERENCE, "utf8");
const shop = await readFile(SHOP, "utf8");

const catMatch = shop.match(/<script type="application\/json" id="catalog">([\s\S]*?)<\/script>/);
if (!catMatch) throw new Error(`no <script id="catalog"> in ${SHOP}`);
/** @type {Array<{s:string,n:string,b:string,g:string,fl:string,o:string,l:string,t:string,p:number,a:string,lo:number,r:string,z:string}>} */
const CATALOGUE = JSON.parse(catMatch[1]);
const bySlug = new Map(CATALOGUE.map((i) => [i.s, i]));

/** `const NAME = <json>;` from the reference's script. */
function refConst(name) {
  const m = ref.match(new RegExp(`const ${name} = (\\[|\\{)`));
  if (!m) throw new Error(`no const ${name} in the reference`);
  const start = m.index + m[0].length - 1;
  const end = ref.indexOf(";\n", start);
  return JSON.parse(ref.slice(start, end));
}
const REF_ITEMS = refConst("ITEMS");
const REF_ASSETS = refConst("ASSETS");

/** The reference's hidden <svg><defs>: gradients, clip paths and the eight bottle symbols. */
const DEFS = ref.match(/<svg width="0" height="0"[^>]*>(<defs>[\s\S]*?<\/defs>)<\/svg>/)?.[1];
if (!DEFS) throw new Error("no bottle <defs> in the reference");

/* ---------------------------------------------------------------- images */

/** @type {Map<string, {file:string,w:number,h:number}>} data URI → written file */
const written = new Map();
const files = [];

async function writeImage(dataUri, name) {
  if (written.has(dataUri)) return written.get(dataUri);
  const [, mime, b64] = dataUri.match(/^data:(image\/[a-z]+);base64,(.+)$/) ?? [];
  if (!b64) throw new Error(`not a base64 image: ${name}`);
  let buf = Buffer.from(b64, "base64");
  // Already webp: keep the bytes. Anything else (the link-preview JPEG) is re-encoded.
  if (mime !== "image/webp") buf = await sharp(buf).webp({ quality: 82 }).toBuffer();
  const { width: w, height: h } = await sharp(buf).metadata();
  const file = `${name}.webp`;
  if (!DRY_RUN) await writeFile(join(OUT_IMG, file), buf);
  files.push(`${file}  ${w}×${h}  ${(buf.length / 1024).toFixed(1)} KB`);
  const out = { file, w, h };
  written.set(dataUri, out);
  return out;
}

const imgRef = (img) => ({ src: `/side-quests/scents/${img.file}`, w: img.w, h: img.h });

/** `<img src>` of the first <img> after `marker` in the reference markup. */
function refImgAfter(marker) {
  const at = ref.indexOf(marker);
  if (at < 0) throw new Error(`marker not found: ${marker}`);
  return ref.slice(at).match(/<img[^>]*src="(data:[^"]+)"/)[1];
}

/** A reference card's art: a photo, or a drawn bottle `<use href="#b-…" style="--liq:url(#…);--cap:url(#…)">`. */
async function artFor(entry) {
  if (entry.ph) return { photo: imgRef(await writeImage(entry.ph, `p-${entry.s}`)) };
  const m = entry.svg?.match(/href="#b-(\w+)" style="--liq:url\(#([\w-]+)\);--cap:url\(#([\w-]+)\)"/);
  if (!m) throw new Error(`no art for ${entry.s}`);
  return { bottle: { shape: m[1], liq: m[2], cap: m[3] } };
}

/* -------------------------------------------------------------- perfumes */

const STOCK = { "in-store": "in", "order-in": "order", "sold-before": "order" };

/** One catalogue row, in the shape the figures use. */
function perfume(slug, art) {
  const c = bySlug.get(slug);
  if (!c) throw new Error(`${slug} is not in the catalogue`);
  return {
    s: c.s,
    n: c.n,
    b: c.b,
    p: c.p,
    a: STOCK[c.a] ?? fail(`${slug}: unknown stock "${c.a}"`),
    fl: c.fl,
    o: c.o.split(",").map((x) => x.trim()).filter(Boolean),
    g: c.g,
    lo: c.lo,
    r: c.r,
    z: c.z ?? "",
    art,
  };
}

/** The reference copied these from the catalogue: anything that drifted is a real error. */
function check(slug, refEntry, row) {
  const diffs = [];
  if (refEntry.n !== row.n) diffs.push(`name ${refEntry.n} ≠ ${row.n}`);
  if (refEntry.p !== row.p) diffs.push(`price ${refEntry.p} ≠ ${row.p}`);
  if (refEntry.a !== row.a) diffs.push(`stock ${refEntry.a} ≠ ${row.a}`);
  if (refEntry.r && refEntry.r !== row.r) diffs.push(`ref ${refEntry.r} ≠ ${row.r}`);
  if (refEntry.b !== undefined && refEntry.b !== row.b && !(row.b === "" && /confirm/i.test(refEntry.b)))
    diffs.push(`brand ${refEntry.b} ≠ ${row.b || "(none)"}`);
  if (diffs.length) fail(`${slug}: ${diffs.join(", ")}`);
}

await mkdir(OUT_IMG, { recursive: true });

// Fig. 1 (and the cards in Figs 7 and 9): the reference's 24 perfumes, in its order.
const ITEMS = [];
for (const e of REF_ITEMS) {
  const row = perfume(e.s, await artFor(e));
  check(e.s, e, row);
  ITEMS.push(row);
}

// Fig. 4: each "smells like" guide the reference shows, rebuilt from the catalogue:
// the original's own row, and the three cheapest perfumes the catalogue lists as like it.
const designer = CATALOGUE.filter((i) => /original/i.test(i.t));
const DUPES = [];
for (const d of REF_ASSETS.dupes) {
  const like = d.title.replace(/^Smells like /, "").replace(/&#39;/g, "'");
  if (!d.orig) {
    console.log(`· skipped "${like}": no original in the catalogue to price it against`);
    continue;
  }
  const orig = designer.find((i) => i.n === d.orig.n && i.b === d.orig.b);
  if (!orig) {
    fail(`${like}: original ${d.orig.n} (${d.orig.b}) is not in the catalogue`);
    continue;
  }
  if (orig.p !== d.orig.p) fail(`${like}: original price ${d.orig.p} ≠ ${orig.p}`);
  const alts = CATALOGUE.filter((i) => i.l === like)
    .sort((x, y) => x.p - y.p)
    .slice(0, 3);
  const refSlugs = d.alts.map((a) => a.s).sort().join();
  if (alts.map((a) => a.s).sort().join() !== refSlugs) fail(`${like}: the three cheapest are ${alts.map((a) => a.s)}, the reference shows ${refSlugs}`);
  const altRows = [];
  for (const a of alts) {
    const refAlt = d.alts.find((x) => x.s === a.s);
    // A perfume Fig. 1 also shows keeps the same photo (the reference embedded Khamrah twice).
    const shared = ITEMS.find((i) => i.s === a.s);
    const row = perfume(a.s, shared ? shared.art : await artFor(refAlt));
    if (refAlt) check(a.s, refAlt, row);
    altRows.push(row);
  }
  DUPES.push({
    page: d.page,
    like: like.replace(/'/g, "’"),
    orig: { n: orig.n, b: orig.b, p: orig.p },
    alts: altRows,
  });
}

/* ----------------------------------------------------- other reference art */

const tourNames = { "1home": "home", "2search": "search", "3shop": "collection", "4product": "product", "5bag": "bag", "6dupe": "smells-like", "7city": "city" };
const TOUR = [];
for (const [k, t] of REF_ASSETS.tour.entries()) {
  TOUR.push({ cap: t.cap, img: imgRef(await writeImage(t.src, `tour-${k + 1}-${tourNames[t.k] ?? t.k}`)) });
}

// The large Ramz Silver cut-out: Fig. 5's slider (both layers), Fig. 10's post and its live card.
const CUTOUT = imgRef(await writeImage(refImgAfter('class="layer before"'), "ramz-silver-cutout"));
const LINK_CARD = imgRef(await writeImage(refImgAfter('class="frame share"'), "link-preview-ramz-silver"));
for (const marker of ['class="layer after"', 'class="ig-img"', "04 · It’s live"]) {
  if (refImgAfter(marker) !== refImgAfter('class="layer before"')) fail(`expected the Ramz Silver cut-out after ${marker}`);
}

/* ---------------------------------------------------------------- output */

const stock = CATALOGUE.reduce((n, i) => n + (i.a === "order-in" ? 1 : 0), 0);
const ts = `/**
 * Generated by scripts/export-scents.mjs from the Scents by Biba catalogue (the shop's
 * <script id="catalog">, ${CATALOGUE.length} perfumes, ${stock} order-in) and the art in
 * waande-scents-handoff/reference/index.html. Do not edit by hand: re-run the script.
 */

export interface ImgSrc {
  src: string;
  w: number;
  h: number;
}

/** A drawn bottle: one of the eight silhouettes, a liquid gradient and a cap gradient (ids in BOTTLE_DEFS). */
export interface BottleSpec {
  shape: string;
  liq: string;
  cap: string;
}

export type Art = { photo: ImgSrc } | { bottle: BottleSpec };

export interface Perfume {
  /** Catalogue slug. */
  s: string;
  n: string;
  /** Brand; empty while Biba confirms it. */
  b: string;
  /** Price in naira. Order-in prices are estimates and read "About …". */
  p: number;
  /** "in": on the shelf in Jos. "order": ordered in for the buyer. */
  a: "in" | "order";
  /** Scent family, most prominent first, e.g. "Sweet · Vanilla". */
  fl: string;
  o: string[];
  g: "Women" | "Men" | "Unisex";
  /** Longevity, 1 to 3. */
  lo: number;
  /** Shop reference, quoted in the WhatsApp order. */
  r: string;
  /** Size in ml, when known. */
  z: string;
  art: Art;
}

export interface DupeGuide {
  page: string;
  like: string;
  orig: { n: string; b: string; p: number };
  alts: Perfume[];
}

export const CATALOGUE_SIZE = ${CATALOGUE.length};

/** Fig. 1's 24 perfumes. */
export const ITEMS: Perfume[] = ${JSON.stringify(ITEMS, null, 2)};

/** Fig. 4's guides: each original and the three cheapest perfumes in the shop like it. */
export const DUPES: DupeGuide[] = ${JSON.stringify(DUPES, null, 2)};

/** The phone-width tour of the live site. */
export const TOUR: { cap: string; img: ImgSrc }[] = ${JSON.stringify(TOUR, null, 2)};

export const CUTOUT: ImgSrc = ${JSON.stringify(CUTOUT)};
export const LINK_CARD: ImgSrc = ${JSON.stringify(LINK_CARD)};

/** Gradients, clip paths and the eight bottle symbols, verbatim from the reference. */
export const BOTTLE_DEFS = ${JSON.stringify(DEFS)};
`;

if (!DRY_RUN) {
  await mkdir(dirname(OUT_TS), { recursive: true });
  await writeFile(OUT_TS, ts);
}
console.log(files.join("\n"));
console.log(`${ITEMS.length} perfumes, ${DUPES.length} guides, ${TOUR.length} tour screens${DRY_RUN ? " (dry run)" : ` → ${OUT_TS.replace(ROOT + "/", "")}`}`);
