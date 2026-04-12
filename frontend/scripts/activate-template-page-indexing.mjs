import {
  createSanityReadClient,
  createSanityWriteClient,
  loadSanityEnv,
} from "./lib/sanity-page-guards.mjs";

const WRITE_MODE = process.argv.includes("--write");

async function main() {
  await loadSanityEnv();
  const readClient = await createSanityReadClient();
  const writeClient = WRITE_MODE ? await createSanityWriteClient() : null;

  const docs = await readClient.fetch(
    `*[_type in ["pageLocation","serviceLocation"] && defined(template)]{
      _id,
      _type,
      title,
      route,
      routePattern,
      contentStatus,
      meta,
      template->{_id,title,lane,variant}
    } | order(coalesce(route, routePattern) asc)`
  );

  const candidates = docs.filter((doc) => doc?.meta?.noindex === true || doc?.contentStatus !== "index");

  console.log(`Found ${candidates.length} template-backed docs to activate.`);
  candidates.forEach((doc) => {
    console.log(
      `- ${doc._id} ${doc.route || doc.routePattern || "(no route)"} [${doc.template?.lane || "-"}]`
    );
  });

  if (!WRITE_MODE) {
    console.log("Dry run only. Re-run with --write to patch Sanity.");
    return;
  }

  for (const doc of candidates) {
    await writeClient
      .patch(doc._id)
      .set({
        contentStatus: "index",
        meta: {
          ...(doc.meta || {}),
          noindex: false,
        },
      })
      .commit();
  }

  console.log(`Patched ${candidates.length} docs.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
