import { createSanityReadClient, loadSanityEnv } from "./scripts/lib/sanity-page-guards.mjs";
async function run() {
  await loadSanityEnv();
  const client = await createSanityReadClient();
  const redirects = await client.fetch(`*[_type == "redirect" && from match "/jasa-cetak-buku*"][0...5]{from, to, permanent}`);
  console.log("Redirects di Sanity untuk /jasa-cetak-buku*:");
  console.log(JSON.stringify(redirects, null, 2));
  const count = await client.fetch(`count(*[_type == "redirect" && from match "/jasa-cetak-buku*"])`);
  console.log(`Total: ${count}`);
}
run().catch(console.error);
