import { createSanityReadClient, loadSanityEnv } from "./scripts/lib/sanity-page-guards.mjs";

const PROTECTED_IDS = new Set([
  "page-about", "page-ai-statement", "page-contact",
  "page-privacy", "page-layanan", "page-template", "page-sistem-pos",
]);

async function run() {
  await loadSanityEnv();
  const client = await createSanityReadClient();

  const emptyPages = await client.fetch(`*[_type == "page" && count(blocks) == 0]{_id, title, route}`);
  const candidates = emptyPages.filter((d) => !PROTECTED_IDS.has(d._id) && d.route);
  const routes = candidates.map((d) => d.route);

  const coverage = await client.fetch(
    `*[_type in ["pageLocation", "serviceLocation"] && route in $routes]{_id, _type, title, route}`,
    { routes }
  );

  const coveredRoutes = new Set(coverage.map((d) => d.route));
  
  const covered = candidates.filter((d) => coveredRoutes.has(d.route));
  const missing = candidates.filter((d) => !coveredRoutes.has(d.route));

  console.log(`\n✅ SUDAH ADA penggantinya (aman dihapus) — ${covered.length}:`);
  covered.forEach((d) => console.log(`   - ${d.route} | ${d.title}`));

  console.log(`\n❌ BELUM ADA pengganti di pageLocation/serviceLocation — ${missing.length}:`);
  missing.forEach((d) => console.log(`   - ${d.route} | ${d.title}`));
}

run().catch(console.error);
