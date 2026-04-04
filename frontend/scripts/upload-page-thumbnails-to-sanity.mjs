/**
 * upload-page-thumbnails-to-sanity.mjs
 *
 * 1. Scan public/images/page-thumbnails/ for generated images
 * 2. Upload each image to Sanity as an image asset (cached by filename)
 * 3. Fetch all page documents WITHOUT a thumbnail
 * 4. Map each page slug → category → pick image variation (rotated)
 * 5. Patch each page.thumbnail with the matched image
 *
 * Run: node --env-file=../vercel-frontend.env scripts/upload-page-thumbnails-to-sanity.mjs
 * Dry:  DRY_RUN=true node --env-file=../vercel-frontend.env scripts/upload-page-thumbnails-to-sanity.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createClient } from '@sanity/client';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const THUMB_DIR = path.resolve(__dirname, '..', 'public', 'images', 'page-thumbnails');
const CACHE_FILE = path.join(THUMB_DIR, '.upload-cache.json');

const DRY_RUN = process.env.DRY_RUN === 'true';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token     = process.env.SANITY_DEV || process.env.SANITY_AUTH_TOKEN;

if (!projectId || !dataset || !token) {
  console.error('❌  Missing Sanity env vars');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false });

// ─── Category → file prefix mapping ─────────────────────────────────────────
// Files are named like: <category>_<model>_<n>.png
// We group by prefix to find variations per category.

const CATEGORY_PREFIXES = {
  homepage:       ['home_'],
  layanan:        ['layanan_'],
  website:        ['website_'],
  percetakan:     ['percetakan_'],
  software:       ['software_'],
  rakit_pc:       ['rakit_pc_'],
  game_pc:        ['game_pc_'],
  cetak_buku:     ['cetak_buku_'],
  cetak_brosur:   ['cetak_brosur_'],
  kartu_nama:     ['kartu_nama_'],
  karaoke:        ['karaoke_'],
  blog:           ['blog_'],
  portfolio:      ['portfolio_'],
  it_support:     ['it_support_'],
  cloud_network:  ['cloud_network_'],
  cybersecurity:  ['security_'],
  website_company:['website_company_'],
  toko_online:    ['toko_online_'],
  instalasi_sw:   ['instalasi_sw_'],
};

// ─── Slug → category mapping (patterns, most specific first) ─────────────────
function slugToCategory(slug) {
  if (!slug) return 'homepage';

  const s = slug.toLowerCase();

  // Exact matches
  if (['home-pepar', 'index', ''].includes(s))       return 'homepage';
  if (s === 'layanan')                               return 'layanan';
  if (s === 'percetakan')                            return 'percetakan';
  if (s === 'pembuatan-website')                     return 'website';
  if (s === 'software')                              return 'software';

  // Patterns
  if (s.includes('rakit-pc') || s.includes('rakit_pc'))       return 'rakit_pc';
  if (s.includes('game-pc') || s.includes('jual-game')
    || s.includes('isi-game') || s.includes('gaming-pc'))     return 'game_pc';

  if (s.includes('cetak-buku') || s.includes('buku-cetak')
    || s.includes('novel') || s.includes('yearbook')
    || s.includes('cetak-skripsi') || s.includes('naskah'))   return 'cetak_buku';

  if (s.includes('cetak-brosur') || s.includes('brosur')
    || s.includes('flyer') || s.includes('leaflet'))          return 'cetak_brosur';

  if (s.includes('kartu-nama') || s.includes('name-card')
    || s.includes('business-card'))                           return 'kartu_nama';

  if (s.includes('karaoke') || s.includes('lagu-karaoke')
    || s.includes('jual-lagu') || s.includes('cd-karaoke'))   return 'karaoke';

  if (s.includes('toko-online') || s.includes('toko_online')
    || s.includes('e-commerce') || s.includes('ecommerce')
    || s.includes('marketplace') || s.includes('shopify'))    return 'toko_online';

  if (s.includes('company-profile') || s.includes('profil-perusahaan')
    || s.includes('company_profile'))                         return 'website_company';

  if (s.includes('pembuatan-website') || s.includes('jasa-website')
    || s.includes('web-design') || s.includes('website-')
    || s.includes('-website') || s.includes('bikin-web')
    || s.includes('buat-web'))                                return 'website';

  if (s.includes('software') || s.includes('aplikasi')
    || s.includes('sistem-') || s.includes('-sistem')
    || s.includes('pos-') || s.includes('-pos')
    || s.includes('erp') || s.includes('crm')
    || s.includes('kasir'))                                   return 'software';

  if (s.includes('instalasi') || s.includes('install')
    || s.includes('setup-software'))                         return 'instalasi_sw';

  if (s.includes('cloud') || s.includes('networking')
    || s.includes('jaringan') || s.includes('wifi')
    || s.includes('server') || s.includes('infrastruktur'))   return 'cloud_network';

  if (s.includes('security') || s.includes('keamanan')
    || s.includes('antivirus') || s.includes('backup')
    || s.includes('firewall'))                                return 'cybersecurity';

  if (s.includes('support') || s.includes('helpdesk')
    || s.includes('maintenance') || s.includes('komputer')
    || s.includes('laptop') || s.includes('teknis'))          return 'it_support';

  if (s.includes('cetak') || s.includes('print')
    || s.includes('percetakan') || s.includes('sablon')
    || s.includes('spanduk') || s.includes('banner-cetak')
    || s.includes('stiker') || s.includes('undangan'))        return 'percetakan';

  if (s.includes('portofolio') || s.includes('portfolio')
    || s.includes('project') || s.includes('studi-kasus')
    || s.includes('kasus') || s.includes('sukses'))           return 'portfolio';

  if (s.includes('blog') || s.includes('artikel')
    || s.includes('tips') || s.includes('panduan')
    || s.includes('cara-') || s.includes('tutorial')
    || s.includes('update-20') || s.includes('top-')
    || s.includes('terbaik-'))                               return 'blog';

  if (s.includes('layanan') || s.includes('jasa')
    || s.includes('service'))                                return 'layanan';

  return 'homepage'; // fallback
}

// ─── Load upload cache ────────────────────────────────────────────────────────
function loadCache() {
  try { return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8')); }
  catch { return {}; }
}
function saveCache(cache) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

// ─── Build category → [files] map ────────────────────────────────────────────
function buildCategoryMap() {
  const files = fs.readdirSync(THUMB_DIR)
    .filter(f => f.endsWith('.png') && !f.startsWith('.'));

  const map = {};
  for (const [cat, prefixes] of Object.entries(CATEGORY_PREFIXES)) {
    map[cat] = files.filter(f => prefixes.some(p => f.startsWith(p)));
  }
  return map;
}

// ─── Upload one image to Sanity ───────────────────────────────────────────────
async function uploadToSanity(filepath) {
  const filename = path.basename(filepath);
  const stream = createReadStream(filepath);
  const asset = await client.assets.upload('image', stream, {
    filename,
    contentType: 'image/png',
  });
  return asset._id;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n📤  Upload Page Thumbnails → Sanity  [${DRY_RUN ? 'DRY RUN' : 'LIVE'}]`);
  console.log(`📁  Thumb dir: ${THUMB_DIR}\n`);

  const catMap = buildCategoryMap();

  // Show category inventory
  console.log('📦  Category inventory:');
  for (const [cat, files] of Object.entries(catMap)) {
    if (files.length) console.log(`   ${cat.padEnd(18)} → ${files.length} images`);
  }
  console.log();

  // Fetch pages without thumbnails
  const pages = await client.fetch(`
    *[_type == "page" && !defined(thumbnail.asset)]{
      _id, title, "slug": slug.current
    } | order(slug.current asc)
  `);

  console.log(`📋  Pages without thumbnail: ${pages.length}\n`);
  if (!pages.length) { console.log('✅  All pages already have thumbnails!'); return; }

  // Load upload cache (filename → assetId)
  const cache = loadCache();

  // Counters
  const catCursor = {}; // rotation index per category
  let patched = 0, skipped = 0, uploadCount = 0;

  for (const page of pages) {
    const cat = slugToCategory(page.slug);
    const files = catMap[cat] || catMap['homepage'] || [];

    if (!files.length) {
      console.log(`⚠️   [${page.slug}] No images for category "${cat}", skipping`);
      skipped++;
      continue;
    }

    // Rotate through variations for this category
    if (catCursor[cat] === undefined) catCursor[cat] = 0;
    const file = files[catCursor[cat] % files.length];
    catCursor[cat]++;

    const filepath = path.join(THUMB_DIR, file);
    console.log(`🖼️   [${page.slug}] → cat:${cat} → ${file}`);

    if (DRY_RUN) { patched++; continue; }

    // Upload to Sanity (cached by filename)
    let assetId = cache[file];
    if (!assetId) {
      try {
        assetId = await uploadToSanity(filepath);
        cache[file] = assetId;
        saveCache(cache);
        uploadCount++;
        console.log(`      ↑ Uploaded: ${assetId}`);
      } catch (e) {
        console.error(`      ❌ Upload failed: ${e.message}`);
        skipped++;
        continue;
      }
    } else {
      console.log(`      ♻️  Cached: ${assetId}`);
    }

    // Patch page thumbnail
    try {
      await client.patch(page._id).set({
        thumbnail: {
          _type: 'image',
          asset: { _type: 'reference', _ref: assetId },
          alt: page.title || page.slug || 'Kotacom thumbnail',
        },
      }).commit();
      console.log(`      ✅ Patched page "${page.title}"`);
      patched++;
    } catch (e) {
      console.error(`      ❌ Patch failed: ${e.message}`);
      skipped++;
    }
  }

  console.log('\n' + '═'.repeat(50));
  console.log('✨  Upload complete!');
  console.log(`   Patched : ${patched} pages`);
  console.log(`   Uploaded: ${uploadCount} new assets`);
  console.log(`   Skipped : ${skipped}`);
  if (DRY_RUN) console.log('   (Dry run — nothing written to Sanity)');
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
