import { createSanityReadClient, createSanityWriteClient, loadSanityEnv } from "./scripts/lib/sanity-page-guards.mjs";

const WRITE_MODE = process.argv.includes("--write");

// Pattern yang terkena redirect di next.config.mjs
const REDIRECT_PATTERNS = [
  /^\/jasa-pembuatan-website-(.+)$/,
  /^\/pembuatan-website-(.+)$/,
  /^\/website-(.+)$/,
  /^\/jasa-cetak-kalender-(.+)$/,
  /^\/jasa-cetak-buku-(.+)$/,
  /^\/cetak-kalender-(.+)$/,
  /^\/software-(.+)$/,
];

function matchesRedirectPattern(route) {
  return REDIRECT_PATTERNS.some((re) => re.test(route));
}

async function run() {
  await loadSanityEnv();
  const readClient = await createSanityReadClient();
  const writeClient = WRITE_MODE ? await createSanityWriteClient() : null;

  const allDocs = await readClient.fetch(`*[defined(route) && route != null]{_id, _type, title, route}`);
  
  const targets = allDocs.filter((d) => d.route && matchesRedirectPattern(d.route));

  if (targets.length === 0) {
    console.log("Tidak ada dokumen Sanity yang rutenya terkena redirect pattern.");
    return;
  }

  console.log(`\n🗑️  Ditemukan ${targets.length} dokumen yang akan dihapus:`);
  targets.forEach((d) => console.log(`   [${d._type}] ${d._id} | ${d.route}`));

  if (!WRITE_MODE) {
    console.log(`\n⚠️  Dry-run. Tambahkan --write untuk benar-benar menghapus.`);
    return;
  }

  const transaction = writeClient.transaction();
  for (const doc of targets) {
    transaction.delete(doc._id);
  }
  await transaction.commit();
  console.log(`\n✅ Berhasil menghapus ${targets.length} dokumen!`);
}

run().catch(console.error);
