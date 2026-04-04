/**
 * generate-page-thumbnails-v2.mjs
 *
 * Round 2: Generate MISSING thumbnails dengan:
 *   - Illustrated / vector art style (seperti percetakan & project images)
 *   - Model fallback chain jika model utama gagal (429/403)
 *   - Skip file yang sudah ada
 *   - Semua 1024x1024
 *
 * Fallback chain (dari murah ke mahal):
 *   prodia/flux-fast-schnell ($0.001) → xai/grok-imagine-image ($0.02)
 *   → google/imagen-4.0-fast-generate-001 ($0.02) → recraft/recraft-v3 ($0.04)
 *   → bfl/flux-pro-1.1 ($0.04)
 *
 * Run: node --env-file=../vercel-frontend.env scripts/generate-page-thumbnails-v2.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(__dirname, '..', 'public', 'images', 'page-thumbnails');
fs.mkdirSync(outputDir, { recursive: true });

const KEY1 = process.env.AI_GATEWAY_API_KEY; // primary key
const KEY2 = process.env.VERCEL_API_KEY || ''; // secondary key
const GATEWAY = 'https://ai-gateway.vercel.sh/v1/images/generations';

// Style suffix untuk semua prompt — illustrated vector art
const STYLE = 'flat vector illustration style, clean bold digital art, vibrant colors, modern illustrator artwork, 2D graphic design, no photography, no photorealism';
const BRAND = 'subtle "Kotacom" brand text in bottom center white semi-transparent font';

// Fallback model chain — coba berurutan sampai berhasil
const MODEL_CHAIN = [
  { model: 'prodia/flux-fast-schnell', key: KEY1 },
  { model: 'xai/grok-imagine-image',   key: KEY1 },
  { model: 'google/imagen-4.0-fast-generate-001', key: KEY1 },
  { model: 'recraft/recraft-v3',        key: KEY1 },
  { model: 'bfl/flux-pro-1.1',          key: KEY1, size: '1024x576' }, // BFL max width 1440
];

// ─── Image list — ONLY missing/new categories ────────────────────────────────
// (existing files ada: home_grok_1-3, layanan_grok_1-4, website_grok_1-3+5,
//  rakit_pc_grok_1-5, game_pc_grok_1-4, it_support_grok_1-4,
//  cetak_buku_grok_1-4, cetak_brosur_grok_1-2, karaoke_grok_3,
//  website_company_grok_1-3, toko_online_grok_1-3, instalasi_sw_grok_1-3,
//  blog_grok_1-3, portfolio_grok_1-3, security_grok_3, software_grok_5)

const IMAGES = [
  // ── Missing from round 1 (429 rate limit) ──
  { file: 'website_grok_4.png',
    prompt: `Illustrated square thumbnail for e-commerce website development service Indonesia. Dark background purple-orange gradient. Illustrated glowing laptop showing online store UI with product grid and shopping cart. Floating payment icons, delivery truck, shopping bag icons. ${STYLE}. ${BRAND}.` },

  { file: 'percetakan_grok_1.png',
    prompt: `Illustrated square hero for Indonesian printing company percetakan Kotacom. Dark charcoal gold gradient. Illustrated industrial printing press machine with colorful paper sheets flying out. Finished print products floating: business cards, brochures, roll banner, book. ${STYLE}. ${BRAND}.` },
  { file: 'percetakan_grok_2.png',
    prompt: `Illustrated square thumbnail for print shop jasa cetak Indonesia. Warm dark background. Isometric flat design printing factory: printing machines, conveyor belt with products, workers. CMYK color palette prominent. ${STYLE}. ${BRAND}.` },
  { file: 'percetakan_grok_3.png',
    prompt: `Illustrated square thumbnail for digital printing service Indonesia. Dark navy gold. Illustrated printing machine printing colorful brochures. Bold flat design with strong color blocking. ${STYLE}. ${BRAND}.` },
  { file: 'percetakan_grok_4.png',
    prompt: `Illustrated square thumbnail for Indonesian printing house. Dark background. Large illustrated magnifying glass focusing on printed brochure showing crisp CMYK color pattern dots. Quality printing inspection theme. ${STYLE}. ${BRAND}.` },
  { file: 'percetakan_grok_5.png',
    prompt: `Illustrated square thumbnail for all printing products percetakan. Dark neutral background. Colorful explosion of illustrated printed products from center: business cards, banners, books, stickers, packaging, certificates. Energetic confetti-like composition. ${STYLE}. ${BRAND}.` },

  { file: 'software_grok_1.png',
    prompt: `Illustrated square thumbnail for Indonesian software development company. Dark deep green gradient. Illustrated software dashboard UI window: analytics charts, KPI cards, sidebar navigation. Isometric screen floating in dark space. ${STYLE}. ${BRAND}.` },
  { file: 'software_grok_2.png',
    prompt: `Illustrated square thumbnail for custom software development Indonesia. Dark background matrix code subtle. Illustrated code editor window with colorful syntax. Hexagonal icons: database, API, mobile, cloud floating around. ${STYLE}. ${BRAND}.` },
  { file: 'software_grok_3.png',
    prompt: `Illustrated square thumbnail for business software ERP Indonesia. Dark slate background. Isometric 3D illustrated connected software modules: CRM box, ERP box, POS box, mobile app, database, cloud. Interconnected with glowing pipes. ${STYLE}. ${BRAND}.` },
  { file: 'software_grok_4.png',
    prompt: `Illustrated square thumbnail for POS and kasir software Indonesia. Dark blue background. Illustrated POS terminal with receipt paper, Indonesian rupiah coins and bills floating, transaction graphs going up. ${STYLE}. ${BRAND}.` },

  { file: 'cetak_brosur_grok_3.png',
    prompt: `Illustrated square thumbnail for brochure printing Indonesia. Dark background. Isometric illustrated printer machine producing stack of colorful trifold brochures. Bold flat design. ${STYLE}. ${BRAND}.` },

  { file: 'kartu_nama_grok_1.png',
    prompt: `Illustrated square thumbnail for Indonesian business card printing. Dark elegant black gold. Illustrated premium business cards arranged in fan spread, different elegant designs. Luxury print theme. ${STYLE}. ${BRAND}.` },
  { file: 'kartu_nama_grok_2.png',
    prompt: `Illustrated square thumbnail for kartu nama printing. Dark background. Multiple illustrated business card designs floating at angles: tech, restaurant, fashion, corporate. Colorful variety scattered. ${STYLE}. ${BRAND}.` },
  { file: 'kartu_nama_grok_3.png',
    prompt: `Illustrated square thumbnail for business card printing service Indonesia. Dark background. Hand holding illustrated minimalist white business card. Network dots and lines in background. Modern minimal illustration. ${STYLE}. ${BRAND}.` },

  { file: 'karaoke_grok_1.png',
    prompt: `Illustrated square thumbnail for Indonesian karaoke song service jual lagu karaoke. Dark stage background colorful spotlights. Illustrated microphone with musical notes and lyrics flying. Entertainment nightlife feel. ${STYLE}. ${BRAND}.` },
  { file: 'karaoke_grok_2.png',
    prompt: `Illustrated square thumbnail for HDD lagu karaoke Indonesia. Dark background neon pink purple. Retro illustrated hard drive and microphone, musical note icons, speakers. Digital music archive theme. ${STYLE}. ${BRAND}.` },

  { file: 'cloud_network_grok_1.png',
    prompt: `Illustrated square thumbnail for cloud computing service Indonesia. Dark midnight blue. Illustrated cloud shape made of glowing data nodes, server icons and device icons connecting. Clean tech vector. ${STYLE}. ${BRAND}.` },
  { file: 'cloud_network_grok_2.png',
    prompt: `Illustrated square thumbnail for network infrastructure Indonesia. Dark background. Isometric illustrated server room: server racks blue LED, cable bundles, cooling units, network switches. ${STYLE}. ${BRAND}.` },
  { file: 'cloud_network_grok_3.png',
    prompt: `Illustrated square thumbnail for WiFi network installation Indonesia. Dark cyan gradient. Illustrated building floor plan with WiFi signal rings coverage. Router, access points, connected devices. ${STYLE}. ${BRAND}.` },

  { file: 'security_grok_1.png',
    prompt: `Illustrated square thumbnail for cybersecurity service Indonesia. Dark background red-blue. Illustrated digital shield glowing protecting server from pixelated attack vector arrows. Security fortress concept. ${STYLE}. ${BRAND}.` },
  { file: 'security_grok_2.png',
    prompt: `Illustrated square thumbnail for IT security and antivirus Indonesia. Dark background. Illustrated lock made of circuit lines in center. Binary code streams. Safe digital environment. ${STYLE}. ${BRAND}.` },

  // ── New: Premium illustrated versions (use Key2 primera, Key1 fallback) ──
  { file: 'home_illust_1.png',
    prompt: `Illustrated square hero for Indonesian IT company Kotacom homepage. Dark deep navy gradient. Illustrated futuristic city Surabaya skyline with holographic data streams. Central illustrated laptop showing business dashboard with charts. Bold flat vector art. ${STYLE}. ${BRAND}.` },
  { file: 'home_illust_2.png',
    prompt: `Illustrated square hero for IT solutions company Indonesia. Dark space background. Illustrated digital globe earth with Indonesia highlighted, glowing data network connections spreading. Bold tech illustration. ${STYLE}. ${BRAND}.` },

  { file: 'website_illust_1.png',
    prompt: `Illustrated square for web development service Indonesia. Dark teal cyan gradient. Illustrated browser window with modern Indonesian business website. Floating UI elements: buttons, components, color swatches. Bold vector flat style. ${STYLE}. ${BRAND}.` },
  { file: 'website_illust_2.png',
    prompt: `Illustrated square for responsive web design service Indonesia. Dark background. Same website layout displayed on illustrated desktop monitor, tablet and phone - all matching responsive. Bold device mockup illustration. ${STYLE}. ${BRAND}.` },

  { file: 'percetakan_illust_1.png',
    prompt: `Illustrated square for printing company landing page Indonesia. Dark charcoal warm gold gradient. Illustrated premium flat-lay: business cards, brochures, book, roll banner, sticker sheet, packaging. All with bold graphical designs. ${STYLE}. ${BRAND}.` },
  { file: 'percetakan_illust_2.png',
    prompt: `Illustrated square for digital printing Indonesia. Dark background. Illustrated offset printing press machine in action, colorful CMYK ink rollers, paper sheets moving through. Industrial flat-design factory. ${STYLE}. ${BRAND}.` },

  { file: 'software_illust_1.png',
    prompt: `Illustrated square for software development company Indonesia. Dark green gradient. Illustrated isometric 3D software system: connected modules ERP, CRM, POS, mobile, cloud with neon-lit pipes between them. ${STYLE}. ${BRAND}.` },
  { file: 'software_illust_2.png',
    prompt: `Illustrated square for mobile app development Indonesia. Dark purple gradient. Illustrated large smartphone showing clean app UI with onboarding screen. App development icons floating: React, Flutter, API. ${STYLE}. ${BRAND}.` },

  { file: 'rakit_pc_illust_1.png',
    prompt: `Illustrated square for custom PC build service Indonesia. Dark background electric blue silver. Illustrated exploded view of PC components: motherboard, GPU, CPU, RAM, SSD, PSU - all with RGB glow. Technical blueprint overlay vectors. ${STYLE}. ${BRAND}.` },
  { file: 'rakit_pc_illust_2.png',
    prompt: `Illustrated square for gaming PC store Indonesia. Dark background. Illustrated gaming PC case with tempered glass showing glowing RGB components inside. Purple blue RGB ambient. Bold product illustration. ${STYLE}. ${BRAND}.` },

  { file: 'layanan_illust_1.png',
    prompt: `Illustrated square for IT services overview page Indonesia Kotacom. Dark navy gradient. Illustrated 4 large service icons in grid: globe for web, gear for software, printer device, support headset. Each in colorful rounded card. ${STYLE}. ${BRAND}.` },
  { file: 'layanan_illust_2.png',
    prompt: `Illustrated square for comprehensive IT company services Indonesia. Dark background. Illustrated circle of 6 connected illustrated professionals each holding their service icon: laptop, code, print, wrench, wifi, cloud. Teamwork composition. ${STYLE}. ${BRAND}.` },

  { file: 'it_support_illust_1.png',
    prompt: `Illustrated square for IT support helpdesk Indonesia. Dark slate blue. Illustrated IT support specialist at desk with headset, multiple monitor screens showing ticketing dashboard. Friendly tech support character. ${STYLE}. ${BRAND}.` },
  { file: 'it_support_illust_2.png',
    prompt: `Illustrated square for server and network maintenance Indonesia. Dark background. Illustrated data center server room: server racks with blue LED lights, cable management, network switches. Clean isometric illustration. ${STYLE}. ${BRAND}.` },

  { file: 'game_pc_illust_1.png',
    prompt: `Illustrated square for gaming PC store Indonesia. Dark red black gaming gradient. Illustrated epic gaming battle station: dual curved monitors showing FPS game, RGB keyboard, gaming mouse, headset. Bold gaming illustration. ${STYLE}. ${BRAND}.` },
  { file: 'game_pc_illust_2.png',
    prompt: `Illustrated square for jual game PC Indonesia. Dark background neon purple red. Illustrated gamepad controller floating above glowing gaming PC. Popular game genre icons exploding around it. Bold digital gaming art. ${STYLE}. ${BRAND}.` },
];

// ─── Runner with model fallback ───────────────────────────────────────────────
async function tryGenerate(prompt, filename) {
  const outPath = path.join(outputDir, filename);
  if (fs.existsSync(outPath)) {
    return { status: 'skip' };
  }

  for (const { model, key, size } of MODEL_CHAIN) {
    try {
      const body = { model, prompt, n: 1, size: size || '1024x1024' };
      const res = await fetch(GATEWAY, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const txt = await res.text();

      // Skip to next model on 429 (rate limit) or 403 (auth)
      if (res.status === 429 || res.status === 403) {
        process.stdout.write(` [${model} ${res.status}→skip]`);
        continue;
      }

      if (!res.ok) {
        process.stdout.write(` [${model} ${res.status}→skip]`);
        continue;
      }

      const data = JSON.parse(txt);
      const item = data?.data?.[0];
      if (!item) { process.stdout.write(` [${model} no-data→skip]`); continue; }

      if (item.b64_json) {
        const buf = Buffer.from(item.b64_json, 'base64');
        fs.writeFileSync(outPath, buf);
        return { status: 'ok', model, kb: Math.round(buf.length / 1024) };
      } else if (item.url) {
        const r = await fetch(item.url);
        const buf = Buffer.from(await r.arrayBuffer());
        fs.writeFileSync(outPath, buf);
        return { status: 'ok', model, kb: Math.round(buf.length / 1024) };
      }
    } catch (e) {
      process.stdout.write(` [${model} err→skip]`);
    }
  }

  return { status: 'fail' };
}

async function main() {
  if (!KEY1) { console.error('Missing AI_GATEWAY_API_KEY'); process.exit(1); }

  console.log(`\n🎨  Generate Page Thumbnails v2 — Illustrated Style`);
  console.log(`📦  Images to generate: ${IMAGES.length}`);
  console.log(`📁  Output: ${outputDir}\n`);

  let ok = 0, skip = 0, fail = 0;

  for (let i = 0; i < IMAGES.length; i++) {
    const { file, prompt } = IMAGES[i];
    process.stdout.write(`[${i+1}/${IMAGES.length}] ${file} ...`);

    const result = await tryGenerate(prompt, file);

    if (result.status === 'skip') {
      console.log(` ⏩ exists`);
      skip++;
    } else if (result.status === 'ok') {
      console.log(` ✅ ${result.model} ${result.kb}KB`);
      ok++;
    } else {
      console.log(` ❌ all models failed`);
      fail++;
    }

    // Small delay between requests
    await new Promise(r => setTimeout(r, 300));
  }

  const files = fs.readdirSync(outputDir).filter(f => f.endsWith('.png'));
  console.log(`\n✨  Done! ok:${ok} skip:${skip} fail:${fail}`);
  console.log(`📂  Total files in folder: ${files.length}`);
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
