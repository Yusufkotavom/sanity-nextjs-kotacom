import { loadSanityEnv, createSanityReadClient } from "./lib/sanity-page-guards.mjs";

async function check() {
  await loadSanityEnv();
  const client = await createSanityReadClient();
  const docs = await client.fetch(`*[_type in ["pageLocation", "serviceLocation", "location"] && slug.current == "jasa-cetak-buku-surabaya"]{_id, _type, title}`);
  console.log(JSON.stringify(docs, null, 2));
}

check().catch(console.error);
