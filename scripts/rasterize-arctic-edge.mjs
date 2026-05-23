import { pdfToPng } from "pdf-to-png-converter";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const PDF_PATH = resolve(".design-extract/ayowande/project/arctic-edge.pdf");
const OUT_DIR = resolve("public/work/arctic-edge");

mkdirSync(OUT_DIR, { recursive: true });

const pages = await pdfToPng(PDF_PATH, {
  viewportScale: 2.0,
  outputFolder: OUT_DIR,
  outputFileMask: "page",
});

for (const page of pages) {
  const name = `page-${String(page.pageNumber).padStart(2, "0")}.png`;
  writeFileSync(resolve(OUT_DIR, name), page.content);
  console.log(`wrote ${name} (${page.content.length} bytes)`);
}

console.log(`\nDone: ${pages.length} pages → ${OUT_DIR}`);
