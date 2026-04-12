/**
 * migrate-legacy-to-blog.mjs
 * Migrasi legacy-page informatif ke post (blog) + redirect Sanity
 */
import { createSanityReadClient, createSanityWriteClient, loadSanityEnv } from "./scripts/lib/sanity-page-guards.mjs";

const WRITE_MODE = process.argv.includes("--write");

// Kategori yang akan dimigrasikan
const INFORMATIONAL_PREFIXES = [
  "legacy-page-5-ide",
  "legacy-page-5-kriteria",
  "legacy-page-5-rekomendasi-jasa",
  "legacy-page-7-kesalahan",
  "legacy-page-berapa-biaya",
  "legacy-page-cara-menyiapkan",
  "legacy-page-cara-membuat",
  "legacy-page-cetak-buku-full",
  "legacy-page-finishing",
  "legacy-page-harga-jasa-pembuatan",
  "legacy-page-hingga-semua",
  "legacy-page-jasa-cetak-kalender",
  "legacy-page-panduan-lengkap-cara",
  "legacy-page-panduan-lengkap-cetak",
  "legacy-page-panduan-lengkap-jenis",
  "legacy-page-panduan-rakit-pc",
  "legacy-page-rahasia-cetak",
  "legacy-page-terbaik-rakit-pc",
  "legacy-page-tips-jitu",
  "legacy-page-update-2024",
  "legacy-page-termurah-500ribu",
];

function isInformational(id) {
  return INFORMATIONAL_PREFIXES.some(prefix => id.startsWith(prefix));
}

function idToSlug(id) {
  // legacy-page-tips-jitu-... -> tips-jitu-...
  return id.replace(/^legacy-page-/, "");
}

async function run() {
  await loadSanityEnv();
  const readClient = await createSanityReadClient();
  const writeClient = WRITE_MODE ? await createSanityWriteClient() : null;

  // Ambil semua legacy pages informatif
  const pages = await readClient.fetch(`*[_type == "page" && _id match "legacy-page-*"]{_id, title, route, blocks}`);
  const candidates = pages.filter(p => isInformational(p._id));

  console.log(`\n📋 Ditemukan ${candidates.length} halaman untuk dimigrasi ke Blog:\n`);

  const migrations = candidates.map(page => {
    const slug = idToSlug(page._id);
    const oldRoute = page.route || `/${slug}`;
    const newRoute = `/blog/${slug}`;
    
    // Ambil excerpt dari blok pertama jika ada
    const firstBlock = page.blocks?.[0];
    const excerpt = firstBlock?.summary || firstBlock?.excerpt || null;

    const newPost = {
      _id: `post-migrated-${slug}`,
      _type: "post",
      title: page.title || slug,
      slug: { _type: "slug", current: slug },
      excerpt: excerpt || `Artikel tentang ${page.title}`,
      body: [
        {
          _key: `block-legacy-${slug}`,
          _type: "block",
          style: "normal",
          children: [
            {
              _key: "span-0",
              _type: "span",
              marks: [],
              text: `Konten artikel ini sedang dalam proses migrasi dari halaman lama. Silakan kunjungi halaman layanan kami untuk informasi lebih lengkap.`,
            },
          ],
          markDefs: [],
        },
      ],
    };

    const redirect = {
      _id: `redirect-blog-${slug}`,
      _type: "redirect",
      source: oldRoute,
      destination: newRoute,
      permanent: true,
      isEnabled: true,
    };

    return { page, slug, oldRoute, newRoute, newPost, redirect };
  });

  migrations.forEach(m => {
    console.log(`   ${m.oldRoute}  →  ${m.newRoute}`);
  });

  if (!WRITE_MODE) {
    console.log(`\n⚠️  Dry-run. Tambahkan --write untuk eksekusi.`);
    return;
  }

  // Jalankan dalam batch 50 untuk hindari timeout
  const BATCH = 50;
  let created = 0;

  for (let i = 0; i < migrations.length; i += BATCH) {
    const batch = migrations.slice(i, i + BATCH);
    const tx = writeClient.transaction();
    
    for (const m of batch) {
      tx.createOrReplace(m.newPost);
      tx.createOrReplace(m.redirect);
      // Hapus page lama
      tx.delete(m.page._id);
    }
    
    await tx.commit();
    created += batch.length;
    console.log(`✅ Batch ${Math.ceil(i/BATCH)+1}: ${created}/${migrations.length} halaman dimigrasi`);
  }

  console.log(`\n🎉 Selesai! ${migrations.length} halaman berhasil dimigrasi ke Blog + redirect dibuat!`);
}

run().catch(console.error);
