import { loadSanityEnv, createSanityWriteClient } from "./lib/sanity-page-guards.mjs";

async function check() {
  loadSanityEnv();
  const client = await createSanityWriteClient();
  const res = await client.fetch(`*[_type == "pageTemplate" && slug.current match "*pembuatan-website*"]{_id, title, slug}`);
  console.log(res);
}

check().catch(console.error);
