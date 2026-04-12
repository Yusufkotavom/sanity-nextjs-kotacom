import { createSanityReadClient, createSanityWriteClient, loadSanityEnv } from "./scripts/lib/sanity-page-guards.mjs";

const TEMPLATE_IDS = {
  website: "page-template-pembuatan-website",
  printing: "page-template-percetakan",
  software: "page-template-software",
  generic: "page-template-generic-company"
};

function inferLaneFromRoute(route) {
  const normalized = route || "";
  if (normalized.includes("/software")) return "software";
  if (
    normalized.includes("/percetakan") ||
    normalized.includes("/cetak-") ||
    normalized.includes("/jasa-cetak-")
  ) {
    return "printing";
  }
  if (normalized.includes("/pembuatan-website")) return "website";
  return "generic";
}

async function run() {
  await loadSanityEnv();
  const readClient = await createSanityReadClient();
  const writeClient = await createSanityWriteClient();

  console.log("Fetching documents missing template references...");
  const docs = await readClient.fetch(`*[_type in ["pageLocation", "serviceLocation"] && !defined(template)]`);
  
  if (docs.length === 0) {
    console.log("Semua dokumen location sudah memiliki template yang terhubung!");
    return;
  }

  console.log(`Ditemukan ${docs.length} dokumen tanpa template...`);
  const transaction = writeClient.transaction();
  let operationsCount = 0;

  for (const doc of docs) {
    const lane = inferLaneFromRoute(doc.route || doc.routePattern || doc.slug?.current || "");
    const templateId = TEMPLATE_IDS[lane];

    if (templateId) {
      console.log(`➡️ Menautkan '${doc.title || doc.route}' ke template [${lane}]`);
      transaction.patch(doc._id, (p) => p.set({
        template: {
          _type: "reference",
          _ref: templateId
        }
      }));
      operationsCount++;
    }
  }

  if (operationsCount > 0) {
    console.log(`\nMenyimpan transaksi untuk ${operationsCount} dokumen...`);
    await transaction.commit();
    console.log(`✅ Berhasil menghubungkan template ke ${operationsCount} halaman lokasi!`);
  }
}

run().catch(console.error);
