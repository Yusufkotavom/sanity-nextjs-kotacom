import { createSanityReadClient, loadSanityEnv } from "./scripts/lib/sanity-page-guards.mjs";
async function run() {
  await loadSanityEnv();
  const client = await createSanityReadClient();
  const docs = await client.fetch(`*[_type == "page" && count(blocks) == 0]{_id, title, route, _type}`);
  console.log(`Found ${docs.length} empty pages:`);
  docs.forEach(d => console.log(`- ${d._id} | ${d.route || "(no route)"} | ${d.title}`));
}
run().catch(console.error);
