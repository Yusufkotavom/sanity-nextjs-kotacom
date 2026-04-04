import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@sanity/client';
import crypto from 'crypto';

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
    apiVersion: '2026-04-01',
    token: env.SANITY_DEV || env.SANITY_AUTH_TOKEN
  });

  const sanityPagesPath = path.join(__dirname, '../tmp/sanity-pages.json');
  const sanityRedirectsPath = path.join(__dirname, '../tmp/sanity-redirects.json');
  const localManifestPath = path.join(__dirname, '../lib/legacy-pages/astro-static-manifest.json');
  const gscHealthPath = path.join(__dirname, '../tmp/gsc-kotacom-full/gsc-migration-health-merged.csv');

  const sanityPages = JSON.parse(await fs.readFile(sanityPagesPath, 'utf8'));
  const sanityRedirects = JSON.parse(await fs.readFile(sanityRedirectsPath, 'utf8'));
  
  let localManifest = [];
  try {
    localManifest = JSON.parse(await fs.readFile(localManifestPath, 'utf8'));
  } catch (e) {}

  const sanityPaths = new Set(sanityPages.map(p => {
    if (p._type === 'post') return `/blog/${p.slug}`;
    if (p._type === 'product') return `/products/${p.slug}`;
    if (p._type === 'service') return `/services/${p.slug}`;
    if (p._type === 'project') return `/projects/${p.slug}`;
    return `/${p.slug}`;
  }));

  localManifest.forEach(p => sanityPaths.add(p.route));
  ['/', '/blog', '/products', '/services', '/projects', '/about', '/contact', '/privacy'].forEach(p => sanityPaths.add(p));

  const sanityRedirectMap = new Map();
  sanityRedirects.forEach(r => {
    if (r.source && r.destination) {
      sanityRedirectMap.set(r.source, r.destination);
    }
  });

  function matchesWildcard(oldPath) {
    if (oldPath.startsWith('/product-tag/')) return true;
    if (oldPath.startsWith('/product-category/')) return true;
    if (oldPath.startsWith('/tag/')) return true;
    if (oldPath.startsWith('/product/')) return true;
    if (oldPath.startsWith('/service/')) return true;
    if (oldPath.startsWith('/digital-product/')) return true;
    if (oldPath.startsWith('/it-services/')) return true;
    if (oldPath.match(/^\/blog\/page\/\d+/)) return true;
    return false;
  }

  const healthCsv = await fs.readFile(gscHealthPath, 'utf8');
  const healthLines = healthCsv.split('\n');

  const toCreate = [];
  let skippedSpam = 0;

  for (let i = 1; i < healthLines.length; i++) {
    if (!healthLines[i].trim()) continue;
    const parts = healthLines[i].split(',');
    const oldPath = parts[1]; // second column
    
    if (!oldPath || oldPath === '/') continue;

    if (!sanityPaths.has(oldPath) && !sanityRedirectMap.has(oldPath) && !matchesWildcard(oldPath)) {
      // Smart Fallback
      let destination = '/';
      if (oldPath.startsWith('/products/')) destination = '/products';
      else if (oldPath.startsWith('/services/')) destination = '/services';
      else if (oldPath.startsWith('/projects/')) destination = '/projects';
      else if (oldPath.startsWith('/blog/')) destination = '/blog';
      else if (oldPath.startsWith('/about/')) destination = '/about';
      else if (oldPath.startsWith('/pembuatan-website/')) destination = '/services/jasa-pembuatan-website-surabaya';
      else if (oldPath.startsWith('/percetakan/')) destination = '/services/printing-services';
      
      // Specifically fix the known typo and dummy pages
      if (oldPath === '/services/printing-service') destination = '/services/printing-services';
      if (oldPath === '/services/it-supports') destination = '/services/it-support';
      if (oldPath === '/services/website-software-development') destination = '/services/jasa-pembuatan-website-surabaya';
      if (oldPath === '/services/software-development') destination = '/services/jasa-pembuatan-software-surabaya';
      
      // Ignore obvious spam, kazinolar, wp assets, etc
      if (
        oldPath.includes('kazinolar') || 
        oldPath.includes('wp-content') || 
        oldPath.includes('wp-includes') ||
        oldPath.includes('slot') ||
        oldPath.includes('gacor') ||
        oldPath.includes('toto')
      ) {
        skippedSpam++;
        continue;
      }

      toCreate.push({
        _type: 'redirect',
        source: oldPath,
        destination: destination,
        permanent: true,
        isEnabled: true
      });
    }
  }

  console.log(`Found ${toCreate.length} unmapped URLs to redirect to fallbacks.`);
  console.log(`Skipped ${skippedSpam} spam/asset URLs (they will naturally return 404/410).`);

  if (toCreate.length === 0) return;

  console.log('Publishing batch fallback redirects directly to Sanity Live...');
  const batchSize = 50;
  for (let i = 0; i < toCreate.length; i += batchSize) {
    const batch = toCreate.slice(i, i + batchSize);
    let transaction = client.transaction();
    
    batch.forEach(doc => {
      const docId = `redirect-${crypto.randomBytes(4).toString('hex')}`;
      transaction.create({ ...doc, _id: docId });
    });

    try {
      await transaction.commit();
      console.log(`✅ Batch ${Math.floor(i/batchSize) + 1} committed (${batch.length} items).`);
    } catch (e) {
      console.error(`Failed Batch ${Math.floor(i/batchSize) + 1}:`, e.message);
    }
  }
}

main().catch(console.error);