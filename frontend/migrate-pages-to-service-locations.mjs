import { createSanityReadClient, createSanityWriteClient, loadSanityEnv } from "./scripts/lib/sanity-page-guards.mjs";

// Halaman yang DIPROTEKSI — jangan dihapus walau kosong
const PROTECTED_IDS = new Set([
  "page-about", "page-ai-statement", "page-contact",
  "page-privacy", "page-layanan", "page-template", "page-sistem-pos",
]);

// Template ID mapping per lane
const TEMPLATE_IDS = {
  website: "page-template-pembuatan-website",
  printing: "page-template-percetakan",
  software: "page-template-software",
  generic: "page-template-generic-company",
};

function inferLane(route) {
  if (!route) return "generic";
  if (route.includes("/software")) return "software";
  if (route.includes("/percetakan") || route.includes("/cetak-") || route.includes("/jasa-cetak-")) return "printing";
  if (route.includes("/pembuatan-website")) return "website";
  return "generic";
}

function routeToId(route) {
  return "service-location" + route.replace(/\//g, "-");
}

const WRITE_MODE = process.argv.includes("--write");

async function run() {
  await loadSanityEnv();
  const readClient = await createSanityReadClient();
  const writeClient = WRITE_MODE ? await createSanityWriteClient() : null;

  // Ambil empty pages
  const emptyPages = await readClient.fetch(`*[_type == "page" && count(blocks) == 0]{_id, title, route}`);
  const candidates = emptyPages.filter((d) => !PROTECTED_IDS.has(d._id) && d.route);

  // Cek mana yang belum ada penggantinya
  const routes = candidates.map((d) => d.route);
  const existing = await readClient.fetch(
    `*[_type in ["pageLocation","serviceLocation"] && route in $routes]{route}`,
    { routes }
  );
  const existingRoutes = new Set(existing.map((d) => d.route));

  const missing = candidates.filter((d) => !existingRoutes.has(d.route));
  console.log(`\n📋 Akan dibuat ${missing.length} serviceLocation baru:`);

  const newDocs = missing.map((page) => {
    const lane = inferLane(page.route);
    const id = routeToId(page.route);
    return {
      _id: id,
      _type: "serviceLocation",
      title: page.title,
      route: page.route,
      contentStatus: "index",
      meta: { noindex: false },
      template: { _type: "reference", _ref: TEMPLATE_IDS[lane] },
    };
  });

  newDocs.forEach((d) => console.log(`   - [${inferLane(d.route)}] ${d._id} -> ${d.route}`));

  if (!WRITE_MODE) {
    console.log(`\n⚠️  Dry-run. Tambahkan --write untuk membuat dokumen.`);
    return;
  }

  const transaction = writeClient.transaction();
  for (const doc of newDocs) {
    transaction.createOrReplace(doc);
  }
  await transaction.commit();
  console.log(`\n✅ Berhasil membuat ${newDocs.length} serviceLocation baru!`);
}

run().catch(console.error);
