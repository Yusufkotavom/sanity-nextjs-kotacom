import { createSanityReadClient, loadSanityEnv } from "./scripts/lib/sanity-page-guards.mjs";
async function run() {
  await loadSanityEnv();
  const client = await createSanityReadClient();
  // Cek berapa halaman cetak-buku kota yang ada di Sanity (semua tipe)
  const docs = await client.fetch(`*[defined(route) && route match "/jasa-cetak-buku-*"]{_id, _type, route}`);
  console.log(`\nDokumen /jasa-cetak-buku-* di Sanity: ${docs.length}`);
  docs.slice(0, 5).forEach(d => console.log(`  ${d._id} -> ${d.route}`));
}
run().catch(console.error);
