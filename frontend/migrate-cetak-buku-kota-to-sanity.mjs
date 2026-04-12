/**
 * migrate-cetak-buku-kota-to-sanity.mjs
 *
 * Migrate 394 /jasa-cetak-buku-{kota} pages from local cities.json
 * into Sanity serviceLocation documents linked to page-template-percetakan.
 *
 * Usage:
 *   node migrate-cetak-buku-kota-to-sanity.mjs           # dry-run
 *   node migrate-cetak-buku-kota-to-sanity.mjs --write   # execute
 */

import { createSanityWriteClient } from "./scripts/lib/sanity-page-guards.mjs";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const WRITE = process.argv.includes("--write");
const BATCH_SIZE = 50;
const TEMPLATE_ID = "page-template-percetakan";

// Load cities from local JSON
const citiesPath = path.join(
  __dirname,
  "content/astro-local/jasa-cetak-buku-kota/cities.json"
);
const cities = JSON.parse(readFileSync(citiesPath, "utf8"));


function toSanityId(slug) {
  // Sanity IDs must not contain dots, use hyphens
  return `sl-${slug.replace(/\./g, "-")}`;
}

async function run() {
  const client = await createSanityWriteClient();

  async function getExistingRoutes() {
    const docs = await client.fetch(
      `*[_type == "serviceLocation" && route match "/jasa-cetak-buku-*"]{route}`
    );
    return new Set(docs.map((d) => d.route));
  }

  console.log(`\n📦 Loaded ${cities.length} kota dari cities.json\n`);

  const existingRoutes = await getExistingRoutes();
  console.log(
    `✅ Sudah ada di Sanity: ${existingRoutes.size} serviceLocation\n`
  );

  const toCreate = cities.filter(
    (city) => !existingRoutes.has(`/${city.slug}`)
  );

  console.log(`📋 Akan dibuat: ${toCreate.length} serviceLocation baru\n`);
  toCreate.slice(0, 5).forEach((c) => {
    console.log(`   /${c.slug} → ${c.city}`);
  });
  if (toCreate.length > 5) console.log(`   ... dan ${toCreate.length - 5} lainnya`);

  if (!WRITE) {
    console.log("\n⚠️  Dry-run. Tambahkan --write untuk eksekusi.\n");
    return;
  }

  // Process in batches
  let created = 0;
  for (let i = 0; i < toCreate.length; i += BATCH_SIZE) {
    const batch = toCreate.slice(i, i + BATCH_SIZE);
    const tx = client.transaction();

    for (const city of batch) {
      const docId = toSanityId(city.slug);
      const route = `/${city.slug}`;

      tx.createIfNotExists({
        _type: "serviceLocation",
        _id: docId,
        title: city.title || `Jasa Cetak Buku ${city.city}`,
        route,
        contentStatus: "index",
        template: {
          _type: "reference",
          _ref: TEMPLATE_ID,
        },
        structured: {
          _type: "templateRewriteCopy",
          description: city.excerpt || `Jasa cetak buku profesional di ${city.city}. Hasil cetak berkualitas, harga kompetitif, pengiriman ke seluruh Indonesia.`,
        },
      });
    }

    await tx.commit();
    created += batch.length;
    console.log(`✅ Batch ${Math.ceil((i + 1) / BATCH_SIZE)}: ${created}/${toCreate.length} dibuat`);
  }

  console.log(`\n🎉 Selesai! ${created} serviceLocation berhasil dibuat di Sanity.`);
  console.log(`\nHalaman-halaman ini sekarang dikelola lewat Sanity Studio.`);
}

run().catch(console.error);
