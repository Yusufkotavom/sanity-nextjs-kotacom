import { createSanityReadClient, loadSanityEnv } from "./scripts/lib/sanity-page-guards.mjs";
async function run() {
  await loadSanityEnv();
  const client = await createSanityReadClient();
  const doc = await client.fetch(`*[route == "/percetakan/cetak-stiker"][0]{
    _id, _type, title, route, template->{_id, title, lane, structured},
    structured, blocks
  }`);
  console.log("Doc type:", doc?._type);
  console.log("Template:", doc?.template?._id);
  console.log("Has structured:", !!doc?.structured);
  console.log("Structured keys:", doc?.structured ? Object.keys(doc.structured) : []);
  console.log("Blocks count:", doc?.blocks?.length || 0);
  // Cek hero/intro di template
  const tmpl = doc?.template;
  if (tmpl?.structured) {
    console.log("\n--- TEMPLATE STRUCTURED ---");
    console.log(JSON.stringify(tmpl.structured, null, 2).slice(0, 1000));
  }
}
run().catch(console.error);
