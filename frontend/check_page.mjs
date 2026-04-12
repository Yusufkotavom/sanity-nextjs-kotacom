import { createSanityReadClient, loadSanityEnv } from "./scripts/lib/sanity-page-guards.mjs";
async function run() {
  await loadSanityEnv();
  const client = await createSanityReadClient();
  const doc = await client.fetch(`*[_id == "page-cetak-buku"][0]`);
  console.log("Blocks count:", doc.blocks ? doc.blocks.length : 0);
  console.log("Content status:", doc.contentStatus);
  console.log("Keys:", Object.keys(doc));
}
run().catch(console.error);
