import { createSanityReadClient, createSanityWriteClient, loadSanityEnv } from "./scripts/lib/sanity-page-guards.mjs";

async function run() {
  await loadSanityEnv();
  const readClient = await createSanityReadClient();
  const writeClient = await createSanityWriteClient();

  console.log("Fetching documents to patch...");
  const docs = await readClient.fetch(`*[_type in ["pageLocation", "serviceLocation", "templateCtaLink"]]`);
  
  const transaction = writeClient.transaction();
  let operationsCount = 0;

  for (const doc of docs) {
    const unsets = [];
    if (doc.template === null) unsets.push('template');
    if (doc.location === null) unsets.push('location');
    if (doc.service === null) unsets.push('service');
    if (doc.serviceType === null) unsets.push('serviceType');
    if (doc.slug === null) unsets.push('slug');

    if (unsets.length > 0) {
      transaction.patch(doc._id, (p) => p.unset(unsets));
      operationsCount++;
    }
  }

  if (operationsCount > 0) {
    console.log(`Committing transaction to fix ${operationsCount} documents...`);
    await transaction.commit();
    console.log(`✅ Successfully fixed ${operationsCount} documents in 1 transaction.`);
  } else {
    console.log("No documents requiring patches were found.");
  }
}

run().catch(console.error);
