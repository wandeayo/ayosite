// Build the About page's WebP images from the originals in public/about
// (waande-about-handoff/ABOUT.md: "use the existing originals at 2x").
//
//   node scripts/export-about-images.mjs
//
// Each photo gets a 1x and a 2x WebP. Sizes follow the reference layout (880px column):
//  - hero photo: up to ~690px wide (single column, 560–720px viewports), ~347px on desktop.
//    1x 720w, 2x 1440w.
//  - photo row: up to ~260px wide (two columns just under 560px), ~213px on desktop.
//    1x 260w, 2x 520w.
// Every source is 3:4, so the outputs are too; the page crops with object-fit as the reference does.
// EXIF orientation is applied before resizing (phone photos).
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const ABOUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "about");

const JOBS = [
  { src: "about-horse.jpg", out: "about-horse", w: 720 },
  { src: "about-friends.jpg", out: "about-friends", w: 260 },
  { src: "photo-3.jpeg", out: "photo-3", w: 260 },
  { src: "photo-7.jpg", out: "photo-7", w: 260 },
  { src: "photo-5.jpg", out: "photo-5", w: 260 },
];

for (const { src, out, w } of JOBS) {
  const input = join(ABOUT, src);
  const meta = await sharp(input).rotate().toBuffer({ resolveWithObject: true }).then((r) => r.info);
  if (meta.width < w * 2) throw new Error(`${src} is ${meta.width}px wide, under the ${w * 2}px 2x size`);
  for (const [scale, suffix] of [[1, ""], [2, "@2x"]]) {
    const info = await sharp(input)
      .rotate()
      .resize({ width: w * scale })
      .webp({ quality: 82 })
      .toFile(join(ABOUT, `${out}${suffix}.webp`));
    console.log(`${out}${suffix}.webp  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)} KB  (from ${meta.width}×${meta.height})`);
  }
}
