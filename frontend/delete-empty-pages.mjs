import { createSanityReadClient, createSanityWriteClient, loadSanityEnv } from "./scripts/lib/sanity-page-guards.mjs";

// Halaman yang DIPROTEKSI — jangan dihapus walau kosong
const PROTECTED_IDS = new Set([
  "page-about",
  "page-ai-statement",
  "page-contact",
  "page-privacy",
  "page-layanan",
  "page-template",
  "page-sistem-pos",
]);

const WRITE_MODE = process.argv.includes("--write");

async function run() {
  await loadSanityEnv();
  const readClient = await createSanityReadClient();
  const writeClient = WRITE_MODE ? await createSanityWriteClient() : null;

  const docs = await readClient.fetch(`*[_type == "page" && count(blocks) == 0]{_id, title, route}`);
  
  const toDelete = docs.filter((d) => !PROTECTED_IDS.has(d._id));
  const protected_ = docs.filter((d) => PROTECTED_IDS.has(d._id));

  console.log(`\n🔒 DILINDUNGI (skip):`);
  protected_.forEach((d) => console.log(`   - ${d._id} | ${d.route || "(no route)"}`));

  console.log(`\n🗑️  AKAN DIHAPUS (${toDelete.length} dokumen):`);
  toDelete.forEach((d) => console.log(`   - ${d._id} | ${d.route || "(no route)"} | ${d.title}`));

  if (!WRITE_MODE) {
    console.log(`\n⚠️  Dry-run saja. Tambahkan --write untuk benar-benar menghapus.`);
    return;
  }

  const transaction = writeClient.transaction();
  for (const doc of toDelete) {
    transaction.delete(doc._id);
  }
  await transaction.commit();
  console.log(`\n✅ Berhasil menghapus ${toDelete.length} halaman kosong!`);
}

run().catch(console.error);
