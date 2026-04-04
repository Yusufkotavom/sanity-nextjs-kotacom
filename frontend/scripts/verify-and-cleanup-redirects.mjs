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
    apiVersion: '2026-04-01',
    token: env.SANITY_DEV || env.SANITY_AUTH_TOKEN
  });

  console.log('Fetching all redirects from Sanity...');
  const allRedirects = await client.fetch(`*[_type == "redirect"]{_id, source, destination, isEnabled}`);
  console.log(`Found ${allRedirects.length} redirects.`);

  const falsePositives = [];
  const brokenLinks = [];
  
  // To avoid hitting rate limits, batch the requests
  const batchSize = 10;
  for (let i = 0; i < allRedirects.length; i += batchSize) {
    const batch = allRedirects.slice(i, i + batchSize);
    
    await Promise.all(batch.map(async (doc) => {
      if (!doc.source) return;
      
      const url = `https://sanity.kotacom.id${doc.source}`;
      try {
        // Send a request. If Vercel hasn't deployed the redirects, 
        // a 200 means the page actually exists and shouldn't be redirected.
        // A 404 means the redirect IS needed.
        const response = await fetch(url, { method: 'HEAD', redirect: 'manual' });
        
        if (response.status === 200) {
          falsePositives.push({ _id: doc._id, source: doc.source, destination: doc.destination });
        } else if (response.status === 404 || response.status === 410) {
          brokenLinks.push({ _id: doc._id, source: doc.source, status: response.status });
        }
      } catch (err) {
        console.log(`[ERROR] ${url} - ${err.message}`);
      }
    }));
    
    if (i % 100 === 0) console.log(`Processed ${i} / ${allRedirects.length}...`);
  }

  console.log(`\nVerification complete!`);
  console.log(`False Positives (Source is ALREADY 200 OK on live site): ${falsePositives.length}`);
  console.log(`Valid Redirects (Source is 404/410, so redirect is needed): ${brokenLinks.length}`);
  console.log(`Other status (e.g. 301/308): ${allRedirects.length - falsePositives.length - brokenLinks.length}`);

  if (falsePositives.length > 0) {
    console.log('\nSample False Positives (Should NOT be redirected):');
    falsePositives.slice(0, 10).forEach(f => console.log(`- ${f.source} (currently redirects to ${f.destination})`));
    
    console.log(`\nRemoving ${falsePositives.length} invalid redirects from Sanity...`);
    const deleteBatchSize = 50;
    for (let i = 0; i < falsePositives.length; i += deleteBatchSize) {
      const batch = falsePositives.slice(i, i + deleteBatchSize);
      let transaction = client.transaction();
      batch.forEach(doc => transaction.delete(doc._id));
      
      try {
        await transaction.commit();
        console.log(`✅ Deleted batch ${Math.floor(i/deleteBatchSize) + 1} (${batch.length} items).`);
      } catch (e) {
        console.error(`Failed to delete batch:`, e.message);
      }
    }
  }
}

main().catch(console.error);