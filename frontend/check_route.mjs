import { createSanityReadClient, loadSanityEnv } from "./scripts/lib/sanity-page-guards.mjs";

async function run() {
  await loadSanityEnv();
  const client = await createSanityReadClient();
  const query = `*[_type in ["pageLocation", "serviceLocation", "page", "service"] && route == "/percetakan/cetak-buku"]{_id, _type, title, route, template->{_id, title}}`;
  const docs = await client.fetch(query);
  console.log(JSON.stringify(docs, null, 2));
}

run().catch(console.error);
