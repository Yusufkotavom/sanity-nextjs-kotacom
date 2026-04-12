import { createSanityReadClient, loadSanityEnv } from "./scripts/lib/sanity-page-guards.mjs";

async function run() {
  await loadSanityEnv();
  const client = await createSanityReadClient();
  const docs = await client.fetch(`*[pt::text(structured.description) match "Pangkal Pinang" || structured.description match "Pangkal Pinang" || pt::text(structured.intro) match "Pangkal Pinang" || structured.intro match "Pangkal Pinang" || title match "Pangkal Pinang"]`);
  console.log(JSON.stringify(docs.map(d => ({id: d._id, type: d._type, title: d.title})), null, 2));
}

run().catch(console.error);
