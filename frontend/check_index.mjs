import { createSanityReadClient, loadSanityEnv } from "./scripts/lib/sanity-page-guards.mjs";

async function run() {
  await loadSanityEnv();
  const client = await createSanityReadClient();
  const doc = await client.fetch(`*[_type in ["pageLocation", "serviceLocation", "page", "service"] && route == "/percetakan/cetak-kalender/bandar-lampung"][0]{_id, title, route, contentStatus, meta{noindex}}`);
  console.log(JSON.stringify(doc, null, 2));
}

run().catch(console.error);
