#!/usr/bin/env node
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_DEPLOY || process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

const orphanedIds = [
  "image-0706c52522c89bed43f181560fcb248a5bc2d5ed-1024x1024-jpg",
  "image-0f821e07410be126a3b24d2ea637989ca1ac4e16-526x150-svg",
  "image-1396ccac823445274c2f10e25a8eb52660bfece6-1024x1024-jpg",
  "image-240ffaed02641591c369afd4af0fa3e254200926-1200x630-webp",
  "image-3a0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e-1024x1024-jpg",
];

async function cleanup() {
  console.log(`🗑️  Cleaning up ${orphanedIds.length} orphaned images...\n`);
  
  let deleted = 0;
  for (const id of orphanedIds) {
    try {
      await client.delete(id);
      console.log(`✅ Deleted: ${id}`);
      deleted++;
    } catch (err) {
      console.log(`⚠️  Skip: ${id} (${err.message})`);
    }
  }
  
  console.log(`\n✅ Cleaned up ${deleted}/${orphanedIds.length} images\n`);
}

cleanup();
