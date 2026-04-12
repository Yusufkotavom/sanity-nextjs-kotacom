#!/usr/bin/env node

/**
 * Script untuk upload environment variables ke Cloudflare Pages
 * Usage: node upload-env-to-cloudflare.mjs [project-name]
 */

import { readFileSync } from 'fs';
import { execSync } from 'child_process';

const PROJECT_NAME = process.argv[2] || 'seo-dashboard-kotacom';
const ENV_FILE = '.env.cloudflare';

console.log(`🚀 Uploading environment variables to Cloudflare Pages: ${PROJECT_NAME}\n`);

// Read env file
let envContent;
try {
  envContent = readFileSync(ENV_FILE, 'utf-8');
} catch (error) {
  console.error(`❌ Error: ${ENV_FILE} tidak ditemukan`);
  process.exit(1);
}

// Parse env file
const envVars = [];
const lines = envContent.split('\n');

for (const line of lines) {
  const trimmed = line.trim();
  
  // Skip comments dan empty lines
  if (!trimmed || trimmed.startsWith('#')) continue;
  
  const [key, ...valueParts] = trimmed.split('=');
  if (!key) continue;
  
  let value = valueParts.join('=').trim();
  
  // Skip jika value kosong atau placeholder
  if (!value || value.startsWith('replace-with') || value.startsWith('TODO')) {
    console.log(`⏭️  Skipping: ${key} (empty or placeholder)`);
    continue;
  }
  
  envVars.push({ key: key.trim(), value });
}

console.log(`📋 Found ${envVars.length} environment variables to upload\n`);

// Upload each env var
let successCount = 0;
let failCount = 0;

for (const { key, value } of envVars) {
  try {
    console.log(`⬆️  Uploading: ${key}`);
    
    // Use wrangler to set secret
    const command = `echo "${value.replace(/"/g, '\\"')}" | npx wrangler pages secret put "${key}" --project-name="${PROJECT_NAME}"`;
    
    execSync(command, {
      stdio: ['pipe', 'pipe', 'pipe'],
      encoding: 'utf-8'
    });
    
    successCount++;
    console.log(`   ✅ Success\n`);
  } catch (error) {
    failCount++;
    console.error(`   ❌ Failed: ${error.message}\n`);
  }
}

console.log('\n' + '='.repeat(50));
console.log(`✅ Upload selesai!`);
console.log(`   Success: ${successCount}`);
console.log(`   Failed: ${failCount}`);
console.log('='.repeat(50));
console.log(`\nVerifikasi di: https://dash.cloudflare.com`);
console.log(`Workers & Pages > ${PROJECT_NAME} > Settings > Environment variables`);
