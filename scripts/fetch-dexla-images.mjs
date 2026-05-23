import { writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "work", "dexla-design-system");

const IMAGES = [
  { name: "01-overview.png",         blockId: "18891097-c89f-80dc-a496-ef5f792a457f", url: "attachment:1a3e90ad-6d12-4765-b5d9-dc13607067a0:image.png" },
  { name: "02-problem.png",          blockId: "18991097-c89f-80f5-91d8-cc1cd5812f02", url: "attachment:705bbd04-ebd7-4295-90ac-64c503318989:image.png" },
  { name: "03-research.png",         blockId: "18d91097-c89f-80e3-b474-ce327fa890a3", url: "attachment:7d279f2b-9e92-4b3b-b0ce-323dab5b9b30:aec885c4-dd44-40a1-9335-73496c3527e9.png" },
  { name: "04-style-guide.png",      blockId: "18c91097-c89f-80af-b58a-e2545d391284", url: "attachment:d76a9494-0f3d-4b95-8597-1e3bf9c000cf:Notion_Cover_(5).png" },
  { name: "05-atomic-design.png",    blockId: "18991097-c89f-80ca-9384-e156a7f1e0a0", url: "attachment:6247de50-16e4-43bd-a74e-4f3194955f50:Notion_Cover_(4).png" },
  { name: "06-core-components.png",  blockId: "18d91097-c89f-80b2-bb7a-fe86836e2b4b", url: "attachment:15173873-8bde-4423-98b9-d2bba15c6a43:Frame_1000006775.png" },
  { name: "07-no-code-editor.png",   blockId: "18d91097-c89f-8060-b33e-e9244990b035", url: "attachment:cc0b877e-47ae-4f11-a61e-60be2fcb5e95:image.png" },
  { name: "08-scalability.png",      blockId: "18d91097-c89f-80ae-a76f-c59b08adeead", url: "attachment:6ac86197-367e-4ec5-b54c-2cc2c879c490:image.png" },
  { name: "09-documentation.png",    blockId: "18d91097-c89f-8032-9b1f-f0661e989180", url: "attachment:1884f85f-6a87-439e-9c4d-598af354c774:image.png" },
];

const SIGN_ENDPOINT = "https://dexlads.notion.site/api/v3/getSignedFileUrls";

async function signOne(image) {
  const body = {
    urls: [{ permissionRecord: { table: "block", id: image.blockId }, url: image.url }],
  };
  const res = await fetch(SIGN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", "User-Agent": "Mozilla/5.0" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`sign failed for ${image.name}: ${res.status}`);
  const json = await res.json();
  const signed = json.signedUrls?.[0];
  if (!signed) throw new Error(`no signed URL for ${image.name}`);
  return signed;
}

async function download(image) {
  const signed = await signOne(image);
  const res = await fetch(signed, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`download failed for ${image.name}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const dest = join(OUT_DIR, image.name);
  await writeFile(dest, buf);
  return { name: image.name, bytes: buf.length };
}

const results = await Promise.all(IMAGES.map(download));
results.forEach((r) => console.log(`${r.name.padEnd(28)} ${r.bytes.toLocaleString().padStart(10)} bytes`));
