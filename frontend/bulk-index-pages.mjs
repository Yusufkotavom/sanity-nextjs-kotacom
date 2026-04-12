import { createSanityReadClient, createSanityWriteClient, loadSanityEnv } from "./scripts/lib/sanity-page-guards.mjs";

async function run() {
  await loadSanityEnv();
  const readClient = await createSanityReadClient();
  const writeClient = await createSanityWriteClient();

  console.log("Fetching location documents to index...");
  const docs = await readClient.fetch(`*[_type in ["pageLocation", "serviceLocation"]]`);
  
  const transaction = writeClient.transaction();
  let operationsCount = 0;

  for (const doc of docs) {
    if (doc.contentStatus !== "index" || doc?.meta?.noindex === true) {
      transaction.patch(doc._id, (p) => p.set({
        contentStatus: "index",
        meta: {
          ...(doc.meta || {}),
          noindex: false
        }
      }));
      operationsCount++;
    }
  }

  if (operationsCount > 0) {
    console.log(`Committing transaction to index ${operationsCount} pages...`);
    await transaction.commit();
    console.log(`✅ Successfully published & indexed ${operationsCount} pages!`);
  } else {
    console.log("No pages needed to be indexed. They are all live.");
  }
}

run().catch(console.error);
