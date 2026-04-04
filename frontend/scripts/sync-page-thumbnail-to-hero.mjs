/**
 * sync-page-thumbnail-to-hero.mjs
 *
 * Menyalin field `thumbnail` dari setiap page document ke field `image`
 * di block hero-1 dan hero-2 yang ada di dalam `blocks[]`, jika block
 * tersebut belum memiliki image.
 *
 * Jalankan: node scripts/sync-page-thumbnail-to-hero.mjs
 * Dry-run:  DRY_RUN=true node scripts/sync-page-thumbnail-to-hero.mjs
 */

import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = '2024-01-01';
const token =
  process.env.SANITY_DEV ||
  process.env.SANITY_AUTH_TOKEN ||
  process.env.SANITY_API_WRITE_TOKEN;

const DRY_RUN = process.env.DRY_RUN === 'true';

if (!projectId || !dataset) {
  console.error('❌  Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET');
  process.exit(1);
}

if (!token) {
  console.error('❌  Missing Sanity auth token (SANITY_DEV / SANITY_AUTH_TOKEN)');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

async function run() {
  console.log(`\n📋  sync-page-thumbnail-to-hero  [${DRY_RUN ? 'DRY RUN' : 'LIVE'}]\n`);

  // Fetch all page documents that have a thumbnail set
  const pages = await client.fetch(`
    *[_type == "page" && defined(thumbnail.asset)]{
      _id,
      title,
      "slug": slug.current,
      thumbnail{
        _type,
        asset->{ _id, _type, url },
        alt
      },
      blocks[]{
        _key,
        _type,
        image
      }
    }
  `);

  if (!pages || pages.length === 0) {
    console.log('ℹ️   No page documents with a thumbnail found. Nothing to do.');
    return;
  }

  console.log(`Found ${pages.length} page(s) with thumbnails.\n`);

  let patchCount = 0;
  let skipCount = 0;

  for (const page of pages) {
    const { _id, title, slug, thumbnail, blocks = [] } = page;

    // Find hero-1 and hero-2 blocks that are missing an image
    const heroIndexes = [];
    blocks.forEach((block, idx) => {
      if (
        (block._type === 'hero-1' || block._type === 'hero-2') &&
        !block.image?.asset
      ) {
        heroIndexes.push({ idx, type: block._type, key: block._key });
      }
    });

    if (heroIndexes.length === 0) {
      console.log(`⏭️   [${slug}] "${title}" — all hero blocks already have an image, skipping.`);
      skipCount++;
      continue;
    }

    console.log(
      `🖼️   [${slug}] "${title}" — will set image on ${heroIndexes.length} hero block(s): ` +
      heroIndexes.map((h) => `${h.type}[${h.idx}]`).join(', ')
    );

    if (DRY_RUN) {
      patchCount += heroIndexes.length;
      continue;
    }

    // Build patch: set image on each hero block that is missing one
    const imageValue = {
      _type: 'image',
      asset: { _type: 'reference', _ref: thumbnail.asset._id },
      alt: thumbnail.alt || title || '',
    };

    let patch = client.patch(_id);
    for (const { idx } of heroIndexes) {
      patch = patch.set({ [`blocks[${idx}].image`]: imageValue });
    }

    try {
      await patch.commit();
      console.log(`   ✅  Patched page "${title}" (${_id})`);
      patchCount += heroIndexes.length;
    } catch (err) {
      console.error(`   ❌  Failed to patch page "${title}" (${_id}):`, err.message);
    }
  }

  console.log(`\n✨  Done! ${patchCount} hero block(s) updated, ${skipCount} page(s) skipped.`);
  if (DRY_RUN) {
    console.log('    (Dry run — no changes were written to Sanity)');
  }
}

run().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
