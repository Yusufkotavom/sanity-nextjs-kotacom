/**
 * test-vercel-image-gen.mjs
 *
 * Test generate image via Vercel AI Gateway dengan 5 model berbeda.
 * Output disimpan sebagai file PNG di public/images/page-thumbnails/
 *
 * Jalankan: node --env-file=../.env scripts/test-vercel-image-gen.mjs
 *       atau: node --env-file=../vercel-frontend.env scripts/test-vercel-image-gen.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(__dirname, '..', 'public', 'images', 'page-thumbnails');
fs.mkdirSync(outputDir, { recursive: true });

const GATEWAY_KEY = process.env.AI_GATEWAY_API_KEY;
if (!GATEWAY_KEY) {
  console.error('❌  Missing AI_GATEWAY_API_KEY');
  process.exit(1);
}

// Vercel AI Gateway base URL
const VERCEL_GATEWAY_BASE = 'https://ai-gateway.vercel.sh';

// 5 models to test, dari murah ke mahal
const TESTS = [
  {
    model: 'prodia/flux-fast-schnell',
    slug: 'home-pepar',
    prompt: 'Professional hero banner for Indonesian IT company homepage Kotacom Surabaya. Dark navy blue background with electric blue gradient. Shows city skyline with holographic digital overlay, laptop with dashboard UI. Premium tech illustrator style, wide 16:9.',
    filename: 'page_thumb_homepage_prodia.png',
  },
  {
    model: 'google/imagen-4.0-fast-generate-001',
    slug: 'layanan',
    prompt: 'Premium hero banner for Indonesian IT services page. Dark purple-blue gradient background. Isometric tech icons floating: website, software, printer, laptop, wifi, server rack. Each icon glows neon. Modern tech illustration, wide 16:9.',
    filename: 'page_thumb_layanan_imagen4_fast.png',
  },
  {
    model: 'recraft/recraft-v3',
    slug: 'pembuatan-website',
    prompt: 'Hero banner for Indonesian web development service Jasa Pembuatan Website. Teal and cyan gradient dark background. Glowing browser window showing modern business website. UI components floating around: buttons, nav bars. Clean illustrator style, 16:9.',
    filename: 'page_thumb_website_recraft_v3.png',
  },
  {
    model: 'bfl/flux-pro-1.1',
    slug: 'percetakan',
    prompt: 'Hero banner for Indonesian printing company percetakan. Dark charcoal and warm orange-gold gradient. Professional printing machine with paper, business cards, brochures, books, banners floating. Premium illustrator style, 16:9 landscape.',
    filename: 'page_thumb_percetakan_flux_pro.png',
  },
  {
    model: 'google/imagen-4.0-generate-001',
    slug: 'software',
    prompt: 'Hero banner for Indonesian software development service. Dark green and code-matrix gradient. Large software dashboard UI with charts and data. Code snippets, database icons, API lines, multi-device mockups. Futuristic tech illustration, 16:9.',
    filename: 'page_thumb_software_imagen4.png',
  },
];

async function generateWithVercelGateway(model, prompt) {
  console.log(`\n🤖  Trying model: ${model}`);

  // Try OpenAI-compatible images/generations endpoint
  const endpoint = `${VERCEL_GATEWAY_BASE}/v1/images/generations`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GATEWAY_KEY}`,
      'Content-Type': 'application/json',
      'x-vercel-ai-gateway-model': model,
    },
    body: JSON.stringify({
      model,
      prompt,
      n: 1,
      size: '1792x1024',
      response_format: 'b64_json',
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errText}`);
  }

  const data = await response.json();
  return data;
}

async function run() {
  console.log('🎨  Vercel AI Gateway — Image Generation Test');
  console.log(`📁  Output → ${outputDir}\n`);

  for (const test of TESTS) {
    try {
      const result = await generateWithVercelGateway(test.model, test.prompt);

      // Response: { data: [{ b64_json: '...' }] } or { data: [{ url: '...' }] }
      const item = result?.data?.[0];
      if (!item) {
        console.error(`❌  No data in response for ${test.model}:`, JSON.stringify(result).substring(0, 400));
        continue;
      }

      const outPath = path.join(outputDir, test.filename);

      if (item.b64_json) {
        const buf = Buffer.from(item.b64_json, 'base64');
        fs.writeFileSync(outPath, buf);
        console.log(`✅  Saved (b64): ${test.filename} (${Math.round(buf.length / 1024)} KB)`);
      } else if (item.url) {
        const imgRes = await fetch(item.url);
        const buf = Buffer.from(await imgRes.arrayBuffer());
        fs.writeFileSync(outPath, buf);
        console.log(`✅  Saved (url): ${test.filename} (${Math.round(buf.length / 1024)} KB)`);
      } else {
        console.error(`❌  Unknown response shape for ${test.model}:`, JSON.stringify(result).substring(0, 400));
      }
    } catch (err) {
      console.error(`❌  ${test.model} FAILED: ${err.message}`);
    }
  }

  console.log('\n✨  Test complete!');
}

run().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
