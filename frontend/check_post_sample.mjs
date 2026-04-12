import { createSanityReadClient, loadSanityEnv } from "./scripts/lib/sanity-page-guards.mjs";
async function run() {
  await loadSanityEnv();
  const client = await createSanityReadClient();
  // Sample post untuk lihat shape
  const post = await client.fetch(`*[_type == "post"][0]{_id, title, slug, excerpt, body[0..1], categories[]->{_id,title}}`);
  console.log(JSON.stringify(post, null, 2));
  // Cek sample legacy page blocks
  const page = await client.fetch(`*[_id == "legacy-page-5-ide-finishing-cover-buku-yang-bikin-pembaca-jatuh-cinta-pada-pandangan-pertama"][0]{_id, title, route, blocks}`);
  console.log("\n--- LEGACY PAGE BLOCKS SAMPLE ---");
  console.log(JSON.stringify(page?.blocks?.slice(0,2), null, 2));
}
run().catch(console.error);
