import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = '2024-01-01';
const token = process.env.SANITY_DEV || process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("Missing Sanity auth token");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

async function run() {
  const query = `*[_type == "product" && title match "Rakit*" && defined(image)]{_id, title, image}`;
  const products = await client.fetch(query);

  if (!products || products.length === 0) {
    console.log("No rakit pc products found with images.");
    return;
  }

  console.log(`Found ${products.length} rakit pc products to update alt text.`);

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    
    // Create an SEO-optimized & branded alt text
    const newAltText = `Jual PC Rakitan Custom: ${product.title} - Kotacom Surabaya`;
    
    console.log(`Patching alt text for: ${product.title}`);
    await client.patch(product._id)
      .set({
        'image.alt': newAltText
      })
      .commit();
  }

  console.log("Finished updating alt texts for all rakit pc products.");
}

run().catch(console.error);
