#!/usr/bin/env node
import { createClient } from '@sanity/client';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = join(fileURLToPath(import.meta.url), '..');
const FRONTEND_ROOT = join(__dirname, '..');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_DEPLOY || process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

const imagesToMigrate = [
  {
    local: '/images/branding/kotacom-logo.svg',
    file: 'public/images/branding/kotacom-logo.svg',
    alt: 'Kotacom Logo',
  },
  {
    local: '/images/kotacom-split-production-ready/hero/hero-cetak-buku-shark-v2.png',
    file: 'public/images/kotacom-split-production-ready/hero/hero-cetak-buku-shark-v2.png',
    alt: 'Kotacom IT services and printing illustration',
  },
  {
    local: '/images/products/cetak_percetakan_thumb_1775318012761.png',
    file: 'public/images/products/cetak_percetakan_thumb_1775318012761.png',
    alt: 'Percetakan thumbnail',
  },
];

async function uploadImage(filePath, alt) {
  try {
    const fullPath = join(FRONTEND_ROOT, filePath);
    const buffer = await readFile(fullPath);
    const filename = filePath.split('/').pop();
    
    const asset = await client.assets.upload('image', buffer, {
      filename,
      contentType: filename.endsWith('.svg') ? 'image/svg+xml' : 'image/png',
    });
    
    console.log(`✅ Uploaded: ${filename} -> ${asset._id}`);
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
      alt,
    };
  } catch (err) {
    console.error(`❌ Failed to upload ${filePath}:`, err.message);
    return null;
  }
}

async function main() {
  console.log('🚀 Migrating local images to Sanity...\n');
  
  const results = [];
  
  for (const img of imagesToMigrate) {
    const result = await uploadImage(img.file, img.alt);
    if (result) {
      results.push({
        local: img.local,
        sanity: result.asset._ref,
        url: `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${result.asset._ref.replace('image-', '').replace('-svg', '.svg').replace('-png', '.png')}`,
      });
    }
  }
  
  console.log('\n📊 Migration Results:\n');
  results.forEach(r => {
    console.log(`  ${r.local}`);
    console.log(`  → ${r.sanity}\n`);
  });
  
  console.log(`✅ Migrated ${results.length}/${imagesToMigrate.length} images\n`);
}

main();
