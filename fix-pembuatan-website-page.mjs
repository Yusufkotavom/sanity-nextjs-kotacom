import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, 'studio', '.env') });

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'b017f7tl',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  token: process.env.SANITY_DEV || process.env.SANITY_AUTH_TOKEN,
  apiVersion: '2026-03-23',
  useCdn: false,
});

async function fixPembuatanWebsitePage() {
  console.log('🔍 Checking pembuatan-website pages...\n');

  // Fetch both pages
  const pages = await client.fetch(
    `*[_type == "page" && slug.current == "pembuatan-website"]{
      _id,
      _rev,
      title,
      topBlockCount,
      "blockCount": count(blocks),
      blocks[0..2]{_type}
    }`
  );

  console.log(`Found ${pages.length} page(s) with slug "pembuatan-website":\n`);
  pages.forEach((page, idx) => {
    console.log(`${idx + 1}. ID: ${page._id}`);
    console.log(`   Title: ${page.title}`);
    console.log(`   Blocks: ${page.blockCount}`);
    console.log(`   Top Block Count: ${page.topBlockCount}`);
    console.log(`   First blocks: ${page.blocks?.map(b => b._type).join(', ')}\n`);
  });

  const oldPage = pages.find(p => p._id === 'page-pembuatan-website');
  const newPage = pages.find(p => p._id === 'pembuatan-website-page');

  if (!newPage) {
    console.log('❌ New page not found!');
    return;
  }

  if (oldPage) {
    console.log('🗑️  Deleting old page (page-pembuatan-website)...');
    await client.delete(oldPage._id);
    console.log('✅ Old page deleted\n');
  }

  // Fetch full new page data
  console.log('📝 Fetching new page data...');
  const fullNewPage = await client.fetch(
    `*[_id == "pembuatan-website-page"][0]`
  );

  if (!fullNewPage) {
    console.log('❌ Could not fetch new page data');
    return;
  }

  // Create page with correct ID
  console.log('📝 Creating page with correct ID (page-pembuatan-website)...');
  
  const { _id, _rev, _createdAt, _updatedAt, ...pageData } = fullNewPage;
  
  const newPageWithCorrectId = {
    ...pageData,
    _id: 'page-pembuatan-website',
    _type: 'page',
  };

  await client.createOrReplace(newPageWithCorrectId);
  console.log('✅ Page created with correct ID\n');

  // Delete the old imported page
  console.log('🗑️  Deleting imported page (pembuatan-website-page)...');
  await client.delete('pembuatan-website-page');
  console.log('✅ Imported page deleted\n');

  // Verify
  console.log('🔍 Verifying final state...');
  const finalPages = await client.fetch(
    `*[_type == "page" && slug.current == "pembuatan-website"]{
      _id,
      title,
      topBlockCount,
      "blockCount": count(blocks)
    }`
  );

  console.log(`\n✅ Final result: ${finalPages.length} page(s)`);
  finalPages.forEach(page => {
    console.log(`   ID: ${page._id}`);
    console.log(`   Title: ${page.title}`);
    console.log(`   Blocks: ${page.blockCount}`);
    console.log(`   Top Block Count: ${page.topBlockCount}`);
  });

  console.log('\n✅ Done! Page is now ready.');
  console.log('🔄 Frontend will update on next build or revalidation.');
}

fixPembuatanWebsitePage().catch(console.error);
