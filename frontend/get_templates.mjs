import { createSanityReadClient, loadSanityEnv } from "./scripts/lib/sanity-page-guards.mjs";

async function run() {
  await loadSanityEnv();
  const client = await createSanityReadClient();
  const docs = await client.fetch(`*[_type == "pageTemplate"]{_id, title, lane}`);
  console.log(JSON.stringify(docs, null, 2));
}

run().catch(console.error);
