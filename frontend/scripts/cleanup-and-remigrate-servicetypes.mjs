import { createSanityWriteClient, loadSanityEnv } from "./lib/sanity-page-guards.mjs";

const args = new Set(process.argv.slice(2));
const shouldWrite = args.has("--write");
const DRY_RUN = !shouldWrite;

// Service IDs that were incorrectly created as "service" type
// These are the actual remaining ones from check-sanity-state.mjs
const serviceIdsToDelete = [
  "service-astro-it-support-terbaik",
  "service-astro-printing-service-terbaik",
  "service-astro-website-software-development-terbaik",
  "service-cetak-kalender",
  "service-company-profile",
  "service-it-support",
  "service-software-apotik",
  "service-software-klinik",
  "service-toko-online",
];

// ServiceLocation IDs that need to be updated to reference serviceType
// These are the actual remaining ones from check-sanity-state.mjs
const serviceLocationIdsToUpdate = [
  "service-location-software-apotik-bandung",
  "service-location-website-company-profile-jakarta",
  "service-location-website-toko-online-surabaya",
];

const deleteDoc = async (client, docId) => {
  if (DRY_RUN) {
    console.log(`DRY RUN: would delete ${docId}`);
    return;
  }
  try {
    await client.delete(docId);
    console.log(`✅ Deleted ${docId}`);
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  } catch (err) {
    if (err.message.includes("not found")) {
      console.log(`⚠️  ${docId} not found (already deleted or never existed)`);
    } else {
      console.error(`❌ Failed to delete ${docId}:`, err.message);
    }
  }
};

const updateServiceLocation = async (client, docId) => {
  if (DRY_RUN) {
    console.log(`DRY RUN: would update ${docId} to use serviceType`);
    return;
  }
  try {
    // Fetch current doc
    const doc = await client.getDocument(docId);
    if (!doc) {
      console.log(`⚠️  ${docId} not found`);
      return;
    }

    // Update to use serviceType instead of service
    const serviceRef = doc.service?._ref;
    if (serviceRef) {
      // Map old service IDs to new serviceType IDs
      const serviceToTypeMap = {
        "service-software-apotik": "service-type-apotik",
        "service-company-profile": "service-type-company-profile",
        "service-toko-online": "service-type-toko-online",
      };
      
      const newServiceTypeRef = serviceToTypeMap[serviceRef] || serviceRef.replace("service-", "service-type-");
      
      await client
        .patch(docId)
        .unset(["service"])
        .set({ serviceType: { _type: "reference", _ref: newServiceTypeRef } })
        .commit();
      console.log(`✅ Updated ${docId} to reference ${newServiceTypeRef}`);
    } else {
      console.log(`⚠️  ${docId} has no service reference to update`);
    }

    // Small delay
    await new Promise(resolve => setTimeout(resolve, 500));
  } catch (err) {
    console.error(`❌ Failed to update ${docId}:`, err.message);
  }
};

async function main() {
  await loadSanityEnv();
  const client = await createSanityWriteClient();

  console.log(`\n🧹 Cleanup and re-migrate to serviceType (${DRY_RUN ? "DRY RUN" : "LIVE"})\n`);

  console.log(`📊 Summary:`);
  console.log(`  - ${serviceIdsToDelete.length} service docs to delete`);
  console.log(`  - ${serviceLocationIdsToUpdate.length} serviceLocation docs to update`);
  console.log();

  // Step 1: Update serviceLocations to use serviceType
  console.log("📝 Step 1: Updating serviceLocations to reference serviceType...");
  for (const docId of serviceLocationIdsToUpdate) {
    await updateServiceLocation(client, docId);
  }

  // Step 2: Delete old service documents
  console.log("\n🗑️  Step 2: Deleting old service documents...");
  for (const docId of serviceIdsToDelete) {
    await deleteDoc(client, docId);
  }

  // Step 3: Run migration script to create serviceType docs
  console.log("\n✨ Step 3: Now run the migration script to create serviceType docs:");
  console.log("  node --env-file=../vercel-frontend.env scripts/migrate-all-local-to-sanity.mjs --write");

  if (DRY_RUN) {
    console.log("\n⚠️  Dry run only. Re-run with --write to apply.");
  } else {
    console.log("\n✅ Cleanup complete!");
  }
}

main().catch((err) => {
  console.error("❌ Cleanup failed:", err);
  process.exit(1);
});
