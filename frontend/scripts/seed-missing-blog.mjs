import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@sanity/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to create title from slug
function toTitleCase(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

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

  const approvedCsvPath = path.join(__dirname, '../../docs/curation/manual-top300-approved-redirect-v3.csv');
  const sanityPagesPath = path.join(__dirname, '../tmp/sanity-pages.json');

  const sanityPages = JSON.parse(await fs.readFile(sanityPagesPath, 'utf8'));
  const existingSlugs = new Set(sanityPages.map(p => p.slug));

  const csvContent = await fs.readFile(approvedCsvPath, 'utf8');
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',');
  
  const finalTargetPathIdx = headers.indexOf('finalTargetPath');
  const finalDecisionIdx = headers.indexOf('finalDecision');

  const postsToCreate = new Map();
  const categoriesToCreate = new Map();

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    let cols = [];
    let cur = "";
    let quoted = false;
    for(let char of lines[i]) {
      if(char === '"') quoted = !quoted;
      else if(char === ',' && !quoted) { cols.push(cur); cur = ""; }
      else cur += char;
    }
    cols.push(cur);
    
    let targetPath = (cols[finalTargetPathIdx] || '').replace(/^"|"$/g, '').trim();
    const decision = cols[finalDecisionIdx];

    if (decision?.includes('approved_redirect') && targetPath.startsWith('/blog/')) {
      const parts = targetPath.split('/').filter(Boolean);
      
      if (parts.length === 2) {
        // e.g. /blog/smart-city-surabaya
        const slug = parts[1];
        if (!existingSlugs.has(slug)) {
          postsToCreate.set(slug, {
            _type: 'post',
            title: toTitleCase(slug),
            slug: { current: slug, _type: 'slug' },
          });
        }
      } else if (parts.length === 3 && parts[1] === 'category') {
        // e.g. /blog/category/teknologi
        const slug = parts[2];
        if (!existingSlugs.has(slug)) {
          categoriesToCreate.set(slug, {
            _type: 'category',
            title: toTitleCase(slug),
            slug: { current: slug, _type: 'slug' },
          });
        }
      }
    }
  }

  console.log(`Found ${postsToCreate.size} unique Posts and ${categoriesToCreate.size} Blog Categories to create.`);

  const allDocs = [...postsToCreate.values(), ...categoriesToCreate.values()];
  if (allDocs.length === 0) {
    console.log('No new posts/categories to create.');
    return;
  }

  console.log('Creating documents in Sanity...');
  
  const batchSize = 50;
  for (let i = 0; i < allDocs.length; i += batchSize) {
    const batch = allDocs.slice(i, i + batchSize);
    let transaction = client.transaction();
    
    batch.forEach(doc => {
      // Prefix ID with 'drafts.' to create as draft
      const docId = `drafts.${doc._type}-${doc.slug.current}`;
      transaction.createOrReplace({
        _id: docId,
        ...doc
      });
    });

    try {
      await transaction.commit();
      console.log(`✅ Successfully created batch ${Math.floor(i/batchSize) + 1} (${batch.length} drafts) in Sanity.`);
    } catch (err) {
      console.error(`❌ Failed to create documents:`, err.message);
    }
  }
}

main().catch(console.error);