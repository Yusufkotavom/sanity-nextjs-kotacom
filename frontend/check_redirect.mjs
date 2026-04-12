import { createSanityReadClient, loadSanityEnv } from "./scripts/lib/sanity-page-guards.mjs";

async function run() {
  await loadSanityEnv();
  const client = await createSanityReadClient();
  const docs = await client.fetch(`*[_type == "redirect" && source == "/cetak-buku"]`);
  console.log("Redirects in Sanity:", JSON.stringify(docs, null, 2));

  const page = await client.fetch(`*[_type in ["page", "service", "pageLocation", "serviceLocation"] && route == "/cetak-buku"]{_id, _type, route}`);
  console.log("Pages mapping to /cetak-buku:", JSON.stringify(page, null, 2));
}

run().catch(console.error);
