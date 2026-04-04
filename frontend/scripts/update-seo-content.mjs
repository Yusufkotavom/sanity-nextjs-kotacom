import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_DEV || process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

async function main() {
  console.log("Fetching SEO settings...");
  const seoSettings = await client.fetch('*[_type == "seoSettings"][0]');
  if (seoSettings) {
    console.log("Updating seoSettings:", seoSettings._id);
    await client
      .patch(seoSettings._id)
      .set({
        defaultTitle: "KOTACOM - IT Service & Publications Terpercaya",
        defaultDescription: "IT Service & Publications - Pengadaan, Service, Penjualan, Website Development, Software Development, Social Media Management",
        titleSuffix: "Kotacom",
      })
      .commit();
    console.log("Updated seoSettings.");
  } else {
    console.log("seoSettings document not found, creating it...");
    await client.create({
      _type: "seoSettings",
      defaultTitle: "KOTACOM - IT Service & Publications Terpercaya",
      defaultDescription: "IT Service & Publications - Pengadaan, Service, Penjualan, Website Development, Software Development, Social Media Management",
      titleSuffix: "Kotacom",
    });
    console.log("Created seoSettings.");
  }

  console.log("Fetching home page document...");
  const homePage = await client.fetch('*[_type == "page" && slug.current == "index"][0]');
  if (homePage) {
    console.log("Updating home page:", homePage._id);
    await client
      .patch(homePage._id)
      .set({
        title: "Solusi IT & Digital Terpadu",
        "meta.title": "KOTACOM - IT Service & Publications Terpercaya",
        "meta.description": "IT Service & Publications - Pengadaan, Service, Penjualan, Website Development, Software Development, Social Media Management",
      })
      .commit();
    console.log("Updated home page metadata.");
  } else {
    console.log("Home page (slug: index) not found.");
  }
}

main().catch(console.error);
