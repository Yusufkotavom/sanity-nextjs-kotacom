import { createSanityReadClient, loadSanityEnv } from "./scripts/lib/sanity-page-guards.mjs";

async function run() {
  await loadSanityEnv();
  const client = await createSanityReadClient();

  const pages = await client.fetch(`*[_type == "page"]{_id, title, route, "blockCount": count(blocks)}`);

  // Klasifikasi berdasarkan ID/title pattern
  const blogCandidates = {
    "legacy_informational": [],  // konten informatif lama
    "legacy_jasa_install": [],   // jasa install software/game (sudah usang)
    "legacy_jual_game": [],      // jual game PC
    "legacy_harga_tips": [],     // tips & harga informatif
    "active_pages": [],          // page aktif dengan konten modern
    "protected_empty": [],       // page penting tapi kosong
  };

  for (const p of pages) {
    const id = p._id;
    const title = (p.title || "").toLowerCase();
    
    if (id.startsWith("legacy-page-jasa-instal") || id.startsWith("legacy-page-jasa-install")) {
      blogCandidates.legacy_jasa_install.push(p);
    } else if (id.includes("jual-game") || id.includes("isi-game") || id.includes("download")) {
      blogCandidates.legacy_jual_game.push(p);
    } else if (id.startsWith("legacy-page-harga") || id.startsWith("legacy-page-tips") || 
               id.startsWith("legacy-page-update") || id.startsWith("legacy-page-terbaik")) {
      blogCandidates.legacy_harga_tips.push(p);
    } else if (id.startsWith("legacy-page-")) {
      blogCandidates.legacy_informational.push(p);
    } else if (p.blockCount === 0) {
      blogCandidates.protected_empty.push(p);
    } else {
      blogCandidates.active_pages.push(p);
    }
  }

  for (const [cat, items] of Object.entries(blogCandidates)) {
    console.log(`\n📂 ${cat.toUpperCase()} (${items.length}):`);
    items.slice(0, 5).forEach(p => console.log(`   - ${p._id} | ${p.title}`));
    if (items.length > 5) console.log(`   ... dan ${items.length - 5} lainnya`);
  }

  const totalLegacy = blogCandidates.legacy_jasa_install.length + blogCandidates.legacy_jual_game.length + 
                       blogCandidates.legacy_harga_tips.length + blogCandidates.legacy_informational.length;
  console.log(`\n\nRINGKASAN:`);
  console.log(`- Legacy pages (kandidat dihapus/blog): ${totalLegacy}`);
  console.log(`- Active pages: ${blogCandidates.active_pages.length}`);
  console.log(`- Protected empty: ${blogCandidates.protected_empty.length}`);
}

run().catch(console.error);
