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
    perspective: 'raw',
    token: env.SANITY_DEV || env.SANITY_AUTH_TOKEN,
  });

  console.log('Fetching all drafts from Sanity...');
  const drafts = await client.fetch(`*[_id in path("drafts.**")]`);

  console.log(`Found ${drafts.length} drafts to publish.`);

  if (drafts.length === 0) return;

  const batchSize = 25;
  for (let i = 0; i < drafts.length; i += batchSize) {
    const batch = drafts.slice(i, i + batchSize);
    let transaction = client.transaction();

    batch.forEach(draft => {
      const publishedId = draft._id.replace('drafts.', '');
      const publishedDoc = { ...draft, _id: publishedId };
      
      // Create or replace the published document
      transaction.createOrReplace(publishedDoc);
      // Delete the draft
      transaction.delete(draft._id);
    });

    try {
      await transaction.commit();
      console.log(`✅ Published batch ${Math.floor(i/batchSize) + 1} (${batch.length} docs).`);
    } catch (error) {
      console.error(`❌ Failed to publish batch ${Math.floor(i/batchSize) + 1}:`, error.message);
    }
  }

  console.log('Finished publishing all drafts.');
}

main().catch(console.error);