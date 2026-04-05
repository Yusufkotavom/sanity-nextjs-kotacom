import { createSanityWriteClient, loadSanityEnv } from "./lib/sanity-page-guards.mjs";

const args = new Set(process.argv.slice(2));
const shouldWrite = args.has("--write");
const DRY_RUN = !shouldWrite;

// Missing serviceType documents that need to be created
const missingServiceTypes = [
  {
    _id: "service-type-apotik",
    _type: "serviceType",
    title: "Software Apotik",
    slug: { _type: "slug", current: "apotik" },
    category: "software",
    description: "Solusi software apotik untuk efisiensi bisnis farmasi Anda.",
    pricing: {
      startingPrice: 15000000,
      currency: "IDR",
      duration: "4-8 minggu",
    },
    sortOrder: 100,
  },
  {
    _id: "service-type-company-profile",
    _type: "serviceType",
    title: "Jasa Pembuatan Website Company Profile",
    slug: { _type: "slug", current: "company-profile" },
    category: "pembuatan-website",
    description: "Layanan jasa pembuatan website company profile profesional untuk bisnis Anda.",
    pricing: {
      startingPrice: 8000000,
      currency: "IDR",
      duration: "2-4 minggu",
    },
    sortOrder: 100,
  },
  {
    _id: "service-type-toko-online",
    _type: "serviceType",
    title: "Jasa Pembuatan Website Toko Online",
    slug: { _type: "slug", current: "toko-online" },
    category: "pembuatan-website",
    description: "Layanan jasa pembuatan website toko online profesional untuk bisnis Anda.",
    pricing: {
      startingPrice: 12000000,
      currency: "IDR",
      duration: "3-6 minggu",
    },
    sortOrder: 100,
  },
];

const upsertDoc = async (client, doc) => {
  if (DRY_RUN) {
    console.log(`DRY RUN: would create ${doc._id}`);
    return;
  }
  try {
    await client.createOrReplace(doc);
    console.log(`✅ Created ${doc._id}: ${doc.title}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
  } catch (err) {
    console.error(`❌ Failed to create ${doc._id}:`, err.message);
  }
};

async function main() {
  await loadSanityEnv();
  const client = await createSanityWriteClient();

  console.log(`\n✨ Creating missing serviceType documents (${DRY_RUN ? "DRY RUN" : "LIVE"})\n`);

  for (const doc of missingServiceTypes) {
    await upsertDoc(client, doc);
  }

  if (DRY_RUN) {
    console.log("\n⚠️  Dry run only. Re-run with --write to apply.");
  } else {
    console.log("\n✅ Missing serviceTypes created!");
    console.log("\nNext: Run cleanup script again to update serviceLocations and delete old services");
  }
}

main().catch((err) => {
  console.error("❌ Failed:", err);
  process.exit(1);
});
