import path from 'node:path';
import { createReadStream, readdirSync } from 'node:fs';
import { createClient } from '@sanity/client';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.resolve(__dirname, '..');

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
  const imagesDir = path.join(frontendDir, 'public', 'images', 'rakit-pc');
  const files = readdirSync(imagesDir).filter(f => f.endsWith('.png'));

  if (files.length === 0) {
    console.log("No images found.");
    return;
  }

  const query = `*[_type == "product" && title match "Rakit*"]{_id, title}`;
  const products = await client.fetch(query);

  if (!products || products.length === 0) {
    console.log("No rakit pc products found.");
    return;
  }

  console.log(`Found ${products.length} rakit pc products and ${files.length} images.`);

  let uploadedAssets = [];
  for (const file of files) {
    const filepath = path.join(imagesDir, file);
    console.log(`Uploading ${file}...`);
    const asset = await client.assets.upload('image', createReadStream(filepath), {
      filename: file,
      contentType: 'image/png'
    });
    uploadedAssets.push(asset);
  }

  // Shuffle products or just assign sequentially (repeating images if needed)
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    // Randomly pick one of the 5 images
    const asset = uploadedAssets[Math.floor(Math.random() * uploadedAssets.length)];
    
    console.log(`Patching product ${product.title} with image...`);
    await client.patch(product._id)
      .set({
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id },
          alt: `Jual PC Rakitan Custom: ${product.title} - Kotacom Surabaya`
        }
      })
      .commit();
  }

  console.log("Finished patching all rakit pc products.");
}

run().catch(console.error);
