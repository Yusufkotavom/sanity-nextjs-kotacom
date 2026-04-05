import { createClient } from "@sanity/client";

const DELETE_MODE = process.argv.includes("--delete");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "b017f7tl",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_DEV || process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});


const TYPES = ["post", "product", "service", "page", "project"];

async function main() {
  console.log(`Mode: ${DELETE_MODE ? "DELETE" : "REPORT ONLY"}`);
  console.log("Fetching documents with potential duplicate slugs...\n");

  const duplicateSuffix = /^(.+)-(\d+)$/;

  for (const type of TYPES) {
    const docs = await client.fetch(
      `*[_type == $type && defined(slug.current)]{ _id, _type, title, "slug": slug.current }`,
      { type }
    );

    // Find docs whose slug ends with -N where a sibling without -N exists
    const slugSet = new Set(docs.map((d) => d.slug));
    const duplicates = docs.filter((doc) => {
      const match = doc.slug?.match(duplicateSuffix);
      if (!match) return false;
      const basSlug = match[1];
      return slugSet.has(basSlug); // base slug exists = this is a duplicate
    });

    if (duplicates.length === 0) {
      console.log(`[${type}] ✅ No duplicates found`);
      continue;
    }

    console.log(`[${type}] ⚠️  Found ${duplicates.length} duplicate(s):`);
    for (const doc of duplicates) {
      console.log(`  - _id: ${doc._id}  slug: "${doc.slug}"  title: "${doc.title}"`);
    }

    if (DELETE_MODE) {
      for (const doc of duplicates) {
        await client.delete(doc._id);
        console.log(`  🗑️  Deleted: ${doc._id} ("${doc.slug}")`);
      }
    } else {
      console.log(`  ℹ️  Run with --delete to remove these documents`);
    }
    console.log("");
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error("Script error:", err.message);
  process.exit(1);
});
