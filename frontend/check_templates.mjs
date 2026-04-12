import { createSanityReadClient, loadSanityEnv } from "./scripts/lib/sanity-page-guards.mjs";
async function run() {
  await loadSanityEnv();
  const client = await createSanityReadClient();
  const templates = await client.fetch(`*[_type == "pageTemplate"]{_id, title, lane, shellId}`);
  console.log("Templates:");
  templates.forEach(t => console.log(`  ${t._id} | ${t.lane} | shellId: ${t.shellId}`));
}
run().catch(console.error);
