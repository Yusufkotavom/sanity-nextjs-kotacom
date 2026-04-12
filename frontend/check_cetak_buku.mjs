import { createSanityReadClient, loadSanityEnv } from "./scripts/lib/sanity-page-guards.mjs";
async function run() {
  await loadSanityEnv();
  const client = await createSanityReadClient();
  const docs = await client.fetch(`*[defined(route) && route match "/percetakan/cetak-buku*"]{_id, _type, route, title}`);
  console.log("ServiceLocation cetak-buku routes:");
  docs.forEach(d => console.log(`  ${d.route} [${d._type}]`));
}
run().catch(console.error);
