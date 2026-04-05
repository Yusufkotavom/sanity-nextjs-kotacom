import { createSanityWriteClient, loadSanityEnv } from "./lib/sanity-page-guards.mjs";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const manifestPath = join(__dirname, "../lib/legacy-pages/astro-static-manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));

const args = new Set(process.argv.slice(2));
const shouldWrite = args.has("--write");
const DRY_RUN = !shouldWrite;

const makeKey = () =>
  `key_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;

const withKeys = (items) =>
  (items || []).map((item) => ({
    _key: item._key || makeKey(),
    ...item,
  }));

// Extract unique cities from manifest
const extractCities = () => {
  const cities = new Set();
  manifest.forEach((item) => {
    const match = item.route.match(/\/(pembuatan-website|percetakan|software)\/([^/]+)$/);
    if (match && item.sourceFile.includes("[kota]")) {
      cities.add(match[2]);
    }
  });
  return Array.from(cities).sort();
};

// Extract unique services from manifest
const extractServices = () => {
  const services = new Map();
  
  // Pembuatan Website services
  manifest.forEach((item) => {
    if (item.route.startsWith("/pembuatan-website/jasa-")) {
      const slug = item.slug;
      const title = item.title;
      services.set(`website-${slug}`, {
        _id: `service-${slug}`,
        _type: "service",
        title,
        slug: { _type: "slug", current: slug.replace("jasa-pembuatan-website-", "") },
        excerpt: `Layanan ${title.toLowerCase()} profesional untuk bisnis Anda.`,
        startingPrice: 8000000,
        currency: "IDR",
        duration: "2-4 minggu",
      });
    }
  });

  // Percetakan services
  manifest.forEach((item) => {
    if (item.route.startsWith("/percetakan/cetak-") && !item.route.includes("/cetak-kalender/")) {
      const slug = item.slug;
      const title = item.title;
      services.set(`percetakan-${slug}`, {
        _id: `service-${slug}`,
        _type: "service",
        title,
        slug: { _type: "slug", current: slug.replace("cetak-", "") },
        excerpt: `Layanan ${title.toLowerCase()} dengan kualitas terbaik.`,
        startingPrice: 500000,
        currency: "IDR",
        duration: "3-7 hari",
      });
    }
  });

  // Software services
  manifest.forEach((item) => {
    if (item.route.startsWith("/software/") && item.route !== "/software") {
      const slug = item.slug;
      const title = item.title;
      services.set(`software-${slug}`, {
        _id: `service-${slug}`,
        _type: "service",
        title,
        slug: { _type: "slug", current: slug },
        excerpt: `Solusi ${title.toLowerCase()} untuk efisiensi bisnis Anda.`,
        startingPrice: 15000000,
        currency: "IDR",
        duration: "4-8 minggu",
      });
    }
  });

  return Array.from(services.values());
};

// Create location documents
const createLocationDocs = (cities) => {
  const provinceMap = {
    "jakarta": { province: "DKI Jakarta", region: "DKI Jakarta" },
    "surabaya": { province: "Jawa Timur", region: "Jawa Timur" },
    "bandung": { province: "Jawa Barat", region: "Jawa Barat" },
    "semarang": { province: "Jawa Tengah", region: "Jawa Tengah" },
    "yogyakarta": { province: "DI Yogyakarta", region: "DI Yogyakarta" },
    "medan": { province: "Sumatera Utara", region: "Sumatera" },
    "palembang": { province: "Sumatera Selatan", region: "Sumatera" },
    "pekanbaru": { province: "Riau", region: "Sumatera" },
    "padang": { province: "Sumatera Barat", region: "Sumatera" },
    "banda-aceh": { province: "Aceh", region: "Sumatera" },
    "bandar-lampung": { province: "Lampung", region: "Sumatera" },
    "jambi": { province: "Jambi", region: "Sumatera" },
    "bengkulu": { province: "Bengkulu", region: "Sumatera" },
    "makassar": { province: "Sulawesi Selatan", region: "Sulawesi" },
    "manado": { province: "Sulawesi Utara", region: "Sulawesi" },
    "palu": { province: "Sulawesi Tengah", region: "Sulawesi" },
    "kendari": { province: "Sulawesi Tenggara", region: "Sulawesi" },
    "gorontalo": { province: "Gorontalo", region: "Sulawesi" },
    "denpasar": { province: "Bali", region: "Bali & Nusa Tenggara" },
    "mataram": { province: "Nusa Tenggara Barat", region: "Bali & Nusa Tenggara" },
    "kupang": { province: "Nusa Tenggara Timur", region: "Bali & Nusa Tenggara" },
    "pontianak": { province: "Kalimantan Barat", region: "Kalimantan" },
    "palangkaraya": { province: "Kalimantan Tengah", region: "Kalimantan" },
    "banjarmasin": { province: "Kalimantan Selatan", region: "Kalimantan" },
    "samarinda": { province: "Kalimantan Timur", region: "Kalimantan" },
    "balikpapan": { province: "Kalimantan Timur", region: "Kalimantan" },
    "tanjung-selor": { province: "Kalimantan Utara", region: "Kalimantan" },
    "jayapura": { province: "Papua", region: "Papua & Maluku" },
    "manokwari": { province: "Papua Barat", region: "Papua & Maluku" },
    "ambon": { province: "Maluku", region: "Papua & Maluku" },
    "ternate": { province: "Maluku Utara", region: "Papua & Maluku" },
    "serang": { province: "Banten", region: "Jawa" },
    "tanjung-pinang": { province: "Kepulauan Riau", region: "Sumatera" },
    "pangkal-pinang": { province: "Bangka Belitung", region: "Sumatera" },
  };

  return cities.map((city) => {
    const titleCase = city
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    
    const info = provinceMap[city] || { province: titleCase, region: "Indonesia" };

    return {
      _id: `location-${city}`,
      _type: "location",
      title: titleCase,
      slug: { _type: "slug", current: city },
      province: info.province,
      region: info.region,
      overview: `${titleCase} merupakan kota penting di ${info.province} dengan kebutuhan layanan digital dan percetakan yang terus berkembang.`,
      highlights: [
        "Akses mudah ke target market lokal",
        "Ekosistem bisnis yang berkembang",
        "Dukungan infrastruktur memadai",
      ],
    };
  });
};

// Create serviceLocation documents for city-based routes
const createServiceLocationDocs = () => {
  const docs = [];

  manifest.forEach((item) => {
    // Skip non-city routes
    if (!item.sourceFile.includes("[kota]")) return;

    // Extract category and city from route
    const parts = item.route.split("/").filter(Boolean);
    if (parts.length < 2) return;

    const category = parts[0]; // pembuatan-website, percetakan, software
    const city = parts[parts.length - 1]; // last segment is city

    // Check if there's a service in between (3-level)
    const hasService = parts.length === 3;

    if (hasService) {
      const service = parts[1]; // middle segment is service
      docs.push({
        _id: `service-location-${category}-${service}-${city}`,
        _type: "serviceLocation",
        title: item.title,
        routePattern: `/${category}/{service}/{lokasi}`,
        service: { _type: "reference", _ref: `service-${service}` },
        location: { _type: "reference", _ref: `location-${city}` },
        template: { _type: "reference", _ref: `page-template-${category}` },
        contentStatus: "draft",
        meta: { noindex: true },
      });
    } else {
      // 2-level: /{category}/{city}
      docs.push({
        _id: `page-location-${category}-${city}`,
        _type: "pageLocation",
        title: item.title,
        routePattern: `/${category}/{lokasi}`,
        location: { _type: "reference", _ref: `location-${city}` },
        template: { _type: "reference", _ref: `page-template-${category}` },
        contentStatus: "draft",
        meta: { noindex: true },
      });
    }
  });

  return docs;
};

const upsertDoc = async (client, doc) => {
  if (DRY_RUN) {
    console.log(`DRY RUN: would upsert ${doc._type} (${doc._id})`);
    return;
  }
  try {
    await client.createOrReplace(doc);
    console.log(`✅ Upserted ${doc._type} (${doc._id})`);
    // Random delay between 1-3 seconds to avoid rate limiting
    const delay = 1000 + Math.random() * 2000;
    await new Promise(resolve => setTimeout(resolve, delay));
  } catch (err) {
    console.error(`❌ Failed to upsert ${doc._id}:`, err.message);
  }
};

async function main() {
  await loadSanityEnv();
  const client = await createSanityWriteClient();

  console.log(`\n📦 Migrating all local data to Sanity (${DRY_RUN ? "DRY RUN" : "LIVE"})\n`);

  const cities = extractCities();
  const services = extractServices();
  const locations = createLocationDocs(cities);
  const serviceLocations = createServiceLocationDocs();

  console.log(`\n📊 Summary:`);
  console.log(`  - ${cities.length} cities`);
  console.log(`  - ${services.length} services`);
  console.log(`  - ${locations.length} location docs`);
  console.log(`  - ${serviceLocations.length} serviceLocation/pageLocation docs`);
  console.log();

  // Upsert locations first
  console.log("📍 Creating locations...");
  for (const doc of locations) {
    await upsertDoc(client, doc);
  }

  // Upsert services
  console.log("\n🛠️  Creating services...");
  for (const doc of services) {
    await upsertDoc(client, doc);
  }

  // Upsert serviceLocations
  console.log("\n📌 Creating service/page locations...");
  for (const doc of serviceLocations) {
    await upsertDoc(client, doc);
  }

  if (DRY_RUN) {
    console.log("\n⚠️  Dry run only. Re-run with --write to apply.");
  } else {
    console.log("\n✅ Migration complete!");
    console.log("\nNext steps:");
    console.log("1. Review documents in Sanity Studio");
    console.log("2. Update contentStatus from 'draft' to 'index' when ready");
    console.log("3. Test URLs to verify they work");
    console.log("4. Remove local legacy code");
  }
}

main().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
