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

async function uploadImagesForType(folderName, docType, labelPatternPrefix) {
  const imagesDir = path.join(frontendDir, 'public', 'images', folderName);
  let files = [];
  try {
    files = readdirSync(imagesDir).filter(f => f.endsWith('.png'));
  } catch (err) {
    console.log(`Directory ${imagesDir} not found or inaccessible.`);
    return;
  }

  if (files.length === 0) {
    console.log(`No images found in ${imagesDir}.`);
    return;
  }

  const query = `*[_type == "${docType}"]{_id, title}`;
  const docs = await client.fetch(query);

  if (!docs || docs.length === 0) {
    console.log(`No ${docType} documents found.`);
    return;
  }

  console.log(`Found ${docs.length} ${docType} documents and ${files.length} images.`);

  let uploadedAssets = [];
  for (const file of files) {
    const filepath = path.join(imagesDir, file);
    console.log(`Uploading ${folderName} image: ${file}...`);
    const asset = await client.assets.upload('image', createReadStream(filepath), {
      filename: file,
      contentType: 'image/png'
    });
    uploadedAssets.push(asset);
  }

  // Shuffle docs or just assign randomly
  for (let i = 0; i < docs.length; i++) {
    const doc = docs[i];
    // Pick randomly from uploaded pool
    const asset = uploadedAssets[Math.floor(Math.random() * uploadedAssets.length)];
    
    console.log(`Patching ${docType} "${doc.title}" with image...`);
    await client.patch(doc._id)
      .set({
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id },
          alt: `${labelPatternPrefix}: ${doc.title} - Kotacom Surabaya`
        }
      })
      .commit();
  }
  
  console.log(`Finished patching all ${docType} documents.\n`);
}

async function run() {
  // Post schema typically uses 'mainImage' instead of 'image'
  await uploadImagesForType('post', 'post', 'Jasa IT Surabaya & Sidoarjo');
}

run().catch(console.error);
