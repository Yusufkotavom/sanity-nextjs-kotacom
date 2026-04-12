import { createSanityReadClient, loadSanityEnv } from "./scripts/lib/sanity-page-guards.mjs";

async function run() {
  await loadSanityEnv();
  const client = await createSanityReadClient();

  // Ambil semua rute aktif di sanity
  const allRoutes = await client.fetch(`*[defined(route)]{_id, _type, route, title}`);
  console.log("=== SEMUA RUTE DI SANITY ===");
  allRoutes.forEach(d => console.log(`[${d._type}] ${d.route}`));

  // Ambil juga semua redirect yang sudah ada di sanity
  const redirects = await client.fetch(`*[_type == "redirect"]{_id, from, to}`);
  console.log("\n=== REDIRECT YANG SUDAH ADA DI SANITY ===");
  console.log(JSON.stringify(redirects.slice(0, 10), null, 2));
  console.log(`Total redirects: ${redirects.length}`);
}

run().catch(console.error);
