import { createSanityReadClient, loadSanityEnv } from "./scripts/lib/sanity-page-guards.mjs";
async function run() {
  await loadSanityEnv();
  const client = await createSanityReadClient();
  // Ambil sample redirect yang ada isinya
  const sample = await client.fetch(`*[_type == "redirect" && defined(from) && from != null][0...5]`);
  console.log("Sample redirects with data:", JSON.stringify(sample, null, 2));
  
  // Cek total yang valid vs null
  const valid = await client.fetch(`count(*[_type == "redirect" && defined(from)])`);
  const nulls = await client.fetch(`count(*[_type == "redirect" && !defined(from)])`);
  console.log(`\nValid redirects: ${valid}`);
  console.log(`Empty redirects (null): ${nulls}`);
}
run().catch(console.error);
