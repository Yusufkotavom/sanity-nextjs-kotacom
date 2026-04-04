import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@sanity/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const envContent = await fs.readFile(path.join(__dirname, '../.env'), 'utf-8');
  const env = Object.fromEntries(
    envContent.split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'))
      .map(line => line.split('=').map(part => part.trim()))
  );

  const client = createClient({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-01',
    token: env.SANITY_DEV || env.SANITY_AUTH_TOKEN,
  });

  const sanityPagesPath = path.join(__dirname, '../tmp/sanity-pages.json');
  const sanityRedirectsPath = path.join(__dirname, '../tmp/sanity-redirects.json');
  const localManifestPath = path.join(__dirname, '../lib/legacy-pages/astro-static-manifest.json');
  const approvedCsvPath = path.join(__dirname, '../../docs/curation/manual-top300-approved-redirect-v3.csv');

  // Load existing data
  const sanityPages = JSON.parse(await fs.readFile(sanityPagesPath, 'utf8'));
  const sanityRedirects = JSON.parse(await fs.readFile(sanityRedirectsPath, 'utf8'));
  let localManifest = [];
  try {
    localManifest = JSON.parse(await fs.readFile(localManifestPath, 'utf8'));
  } catch (e) {
    console.warn("Could not read local manifest:", e.message);
  }

  // Build valid paths set
  const validPaths = new Set();
  
  // 1. Static index routes
  ['/', '/blog', '/products', '/services', '/projects', '/about', '/contact', '/privacy', '/blog/category', '/products/category', '/services/category'].forEach(p => validPaths.add(p));

  // 2. Sanity pages
  sanityPages.forEach(p => {
    if (p._type === 'post') validPaths.add(`/blog/${p.slug}`);
    else if (p._type === 'product') validPaths.add(`/products/${p.slug}`);
    else if (p._type === 'service') validPaths.add(`/services/${p.slug}`);
    else if (p._type === 'project') validPaths.add(`/projects/${p.slug}`);
    else if (p._type === 'category') {
      validPaths.add(`/blog/category/${p.slug}`);
      validPaths.add(`/products/category/${p.slug}`);
      validPaths.add(`/services/category/${p.slug}`);
    }
    else validPaths.add(`/${p.slug}`);
  });

  // 3. Astro static routes
  localManifest.forEach(p => validPaths.add(p.route));

  // Build existing redirects map to avoid duplicates
  const existingRedirectsMap = new Map();
  sanityRedirects.forEach(r => {
    if (r.source && r.destination) {
      existingRedirectsMap.set(r.source, r.destination);
    }
  });

  // Parse CSV
  const csvContent = await fs.readFile(approvedCsvPath, 'utf8');
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',');
  
  const oldPathIdx = headers.indexOf('oldPath');
  const finalTargetPathIdx = headers.indexOf('finalTargetPath');
  const finalDecisionIdx = headers.indexOf('finalDecision');
  const reviewStatusIdx = headers.indexOf('reviewStatus');

  const toCreate = [];
  let skippedNotApproved = 0;
  let skippedInvalidDest = 0;
  let skippedAlreadyExists = 0;

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    // Parse CSV line correctly
    let cols = [];
    let cur = "";
    let quoted = false;
    for(let char of lines[i]) {
      if(char === '"') quoted = !quoted;
      else if(char === ',' && !quoted) { cols.push(cur); cur = ""; }
      else cur += char;
    }
    cols.push(cur);
    
    const oldPath = cols[oldPathIdx];
    let targetPath = cols[finalTargetPathIdx];
    const decision = cols[finalDecisionIdx];
    const status = cols[reviewStatusIdx];

    if (!oldPath || !targetPath) continue;
    
    // Clean target path (remove quotes if any)
    targetPath = targetPath.replace(/^"|"$/g, '').trim();

    // Check if approved
    if (!decision?.includes('approved_redirect')) {
      skippedNotApproved++;
      continue;
    }

    // Check if destination is valid (exists in dev site / Sanity)
    if (!validPaths.has(targetPath)) {
      console.log(`❌ Invalid Destination: ${oldPath} -> ${targetPath}`);
      skippedInvalidDest++;
      continue;
    }

    // Check if already exists in Sanity
    if (existingRedirectsMap.has(oldPath)) {
      skippedAlreadyExists++;
      continue;
    }

    toCreate.push({
      _type: 'redirect',
      source: oldPath,
      destination: targetPath,
      permanent: true,
      isEnabled: true
    });
  }

  console.log('\n--- IMPORT SUMMARY ---');
  console.log(`Found ${toCreate.length} valid new redirects to import.`);
  console.log(`Skipped (Not Approved): ${skippedNotApproved}`);
  console.log(`Skipped (Invalid/Missing Destination): ${skippedInvalidDest}`);
  console.log(`Skipped (Already Exists): ${skippedAlreadyExists}`);

  if (toCreate.length === 0) {
    console.log('No new redirects to import.');
    return;
  }

  console.log('\nStarting import to Sanity in batches of 50...');
  
  // Batch upload
  const batchSize = 50;
  for (let i = 0; i < toCreate.length; i += batchSize) {
    const batch = toCreate.slice(i, i + batchSize);
    let transaction = client.transaction();
    
    batch.forEach(doc => {
      transaction.create(doc);
    });

    try {
      await transaction.commit();
      console.log(`✅ Batch ${Math.floor(i/batchSize) + 1} committed (${batch.length} items)`);
    } catch (err) {
      console.error(`❌ Failed to commit batch ${Math.floor(i/batchSize) + 1}:`, err.message);
    }
  }

  console.log('Import completed.');
}

main().catch(console.error);