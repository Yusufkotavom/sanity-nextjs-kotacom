import { createSanityReadClient, loadSanityEnv } from "./scripts/lib/sanity-page-guards.mjs";

async function run() {
  await loadSanityEnv();
  const client = await createSanityReadClient();

  const docs = await client.fetch(`*[defined(route) && route != null]{
    _id, _type, title, route, contentStatus,
    "noindex": coalesce(meta.noindex, false)
  } | order(route asc)`);

  const noindexed = docs.filter(d => d.noindex === true);
  const notIndexStatus = docs.filter(d => d.contentStatus !== "index" && !d.noindex);
  const readyToIndex = docs.filter(d => d.contentStatus === "index" && !d.noindex);

  console.log(`\n✅ SIAP DIINDEX Google (${readyToIndex.length} halaman):`);
  readyToIndex.forEach(d => console.log(`   ${d.route} [${d._type}]`));

  console.log(`\n⚠️  STATUS BUKAN "index" tapi noindex=false (${notIndexStatus.length} halaman):`);
  notIndexStatus.forEach(d => console.log(`   ${d.route} [status: ${d.contentStatus || "null"}]`));

  console.log(`\n🚫 NOINDEX=TRUE (${noindexed.length} halaman):`);
  noindexed.forEach(d => console.log(`   ${d.route} [${d._type}]`));

  console.log(`\nTotal dokumen dengan route: ${docs.length}`);
}
run().catch(console.error);
