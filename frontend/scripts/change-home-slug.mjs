import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_DEV || process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("Missing credentials");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

async function main() {
  try {
    const pages = await client.fetch(`*[_type == "page"]{ _id, title, "slug": slug.current }`);
    const homeOld = pages.find(p => p.slug === "index");
    const homeNew = pages.find(p => p.slug === "home-pepar");

    if (!homeOld && !homeNew) {
      console.log("Pages not found or already changed");
      return;
    }

    if (homeOld) {
      console.log(`Setting old home (${homeOld._id}) slug to index-old`);
      await client.patch(homeOld._id).set({ slug: { current: "index-old", _type: "slug" } }).commit();
    }

    if (homeNew) {
      console.log(`Setting new home (${homeNew._id}) slug to index`);
      await client.patch(homeNew._id).set({ slug: { current: "index", _type: "slug" } }).commit();
    }

    console.log("Successfully updated slugs in Sanity");
  } catch (error) {
    console.error("Error updating slugs", error);
  }
}

main();
