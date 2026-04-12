import { createSanityReadClient, loadSanityEnv } from "./scripts/lib/sanity-page-guards.mjs";
async function run() {
  await loadSanityEnv();
  const client = await createSanityReadClient();
  const q1 = await client.fetch(`*[_type in ["page", "service", "serviceLocation", "pageLocation"] && (route == "/cetak-buku" || route == "/percetakan/cetak-buku")]{_id, route, title}`);
  console.log("Docs with route:", q1);
  const q2 = await client.fetch(`*[_type == "redirect"]{source, destination}`);
  console.log("Redirects:", q2.filter(r => r.source && r.source.includes('cetak-buku')));
}
run().catch(console.error);
