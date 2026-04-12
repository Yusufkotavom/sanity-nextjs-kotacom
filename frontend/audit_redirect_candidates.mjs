import { createSanityReadClient, loadSanityEnv } from "./scripts/lib/sanity-page-guards.mjs";

// Daftar kota yang sudah ada di Sanity
const KNOWN_CITIES = [
  "ambon","balikpapan","banda-aceh","bandar-lampung","bandung","banjarmasin",
  "bengkulu","denpasar","gorontalo","jakarta","jambi","jayapura","kendari",
  "kupang","makassar","manado","manokwari","mataram","medan","padang",
  "palangkaraya","palembang","palu","pangkal-pinang","pekanbaru","pontianak",
  "samarinda","semarang","serang","surabaya","tanjung-pinang","tanjung-selor",
  "ternate","yogyakarta"
];

async function run() {
  await loadSanityEnv();
  const client = await createSanityReadClient();

  // Semua redirect kosong yang ada di Sanity (378 null entries)
  // Kita skip ini dan fokus bikin kandidat baru

  // Pattern 1: /jasa-pembuatan-website-{kota} => /pembuatan-website/{kota}
  const websitePatterns = KNOWN_CITIES.map(city => ({
    source: `/jasa-pembuatan-website-${city}`,
    destination: `/pembuatan-website/${city}`,
    category: "jasa-website-kota",
  }));

  // Pattern 2: /jasa-cetak-{kota} atau /cetak-{service}-{kota} => /percetakan/cetak-kalender/{kota}
  const cetakKalenderPatterns = KNOWN_CITIES.map(city => ({
    source: `/jasa-cetak-kalender-${city}`,
    destination: `/percetakan/cetak-kalender/${city}`,
    category: "jasa-cetak-kalender-kota",
  }));

  // Pattern 3: /pembuatan-website-{kota} => /pembuatan-website/{kota}  
  const shortWebsitePatterns = KNOWN_CITIES.map(city => ({
    source: `/pembuatan-website-${city}`,
    destination: `/pembuatan-website/${city}`,
    category: "pembuatan-website-kota",
  }));

  // Pattern 4: /website-{kota} => /pembuatan-website/{kota}
  const bareWebsitePatterns = KNOWN_CITIES.map(city => ({
    source: `/website-${city}`,
    destination: `/pembuatan-website/${city}`,
    category: "website-kota",
  }));

  const all = [...websitePatterns, ...cetakKalenderPatterns, ...shortWebsitePatterns, ...bareWebsitePatterns];

  console.log("=== KANDIDAT REDIRECT BARU ===\n");
  
  const grouped = {};
  for (const r of all) {
    if (!grouped[r.category]) grouped[r.category] = [];
    grouped[r.category].push(r);
  }

  for (const [cat, items] of Object.entries(grouped)) {
    console.log(`\n📂 ${cat} (${items.length} redirects)`);
    items.slice(0, 3).forEach(r => console.log(`   ${r.source} => ${r.destination}`));
    if (items.length > 3) console.log(`   ... dan ${items.length - 3} lainnya`);
  }

  console.log(`\nTotal kandidat: ${all.length} redirect`);
}

run().catch(console.error);
