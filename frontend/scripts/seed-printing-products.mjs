import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@sanity/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendRoot = path.resolve(__dirname, '..');

// Helper to parse env
function parseEnvFile(raw) {
  const parsed = {};
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    parsed[key] = value;
  }
  return parsed;
}

async function main() {
  const envContent = fs.readFileSync(path.join(frontendRoot, '.env'), 'utf-8');
  const env = parseEnvFile(envContent);

  const client = createClient({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-01',
    token: env.SANITY_DEV || env.SANITY_AUTH_TOKEN,
  });

  const mapping = {
    'cetak-buku': '/home/ubuntu/.gemini/antigravity/brain/87b890ea-7e96-44cd-85dd-e19153188492/book_printing_1775318240720.png',
    'cetak-brosur': '/home/ubuntu/.gemini/antigravity/brain/87b890ea-7e96-44cd-85dd-e19153188492/brochure_print_1775318277612.png',
    'cetak-kemasan-product': '/home/ubuntu/.gemini/antigravity/brain/87b890ea-7e96-44cd-85dd-e19153188492/packaging_print_1775318295503.png',
    'cetak-kartu-nama': '/home/ubuntu/.gemini/antigravity/brain/87b890ea-7e96-44cd-85dd-e19153188492/business_card_print_1775318312900.png',
    'cetak-al-quran': '/home/ubuntu/.gemini/antigravity/brain/87b890ea-7e96-44cd-85dd-e19153188492/quran_print_1775318348924.png',
    'cetak-album-pernikahan': '/home/ubuntu/.gemini/antigravity/brain/87b890ea-7e96-44cd-85dd-e19153188492/wedding_album_print_1775318366789.png',
    'cetak-banner-spanduk': '/home/ubuntu/.gemini/antigravity/brain/87b890ea-7e96-44cd-85dd-e19153188492/banner_print_1775318383690.png',
    'cetak-kaos': '/home/ubuntu/.gemini/antigravity/brain/87b890ea-7e96-44cd-85dd-e19153188492/tshirt_print_1775318428414.png',
    'cetak-stiker': '/home/ubuntu/.gemini/antigravity/brain/87b890ea-7e96-44cd-85dd-e19153188492/sticker_print_1775318448869.png'
  };

  for (const [slug, imgPath] of Object.entries(mapping)) {
    if (!fs.existsSync(imgPath)) {
      console.log(`Image not found for ${slug}: ${imgPath}`);
      continue;
    }

    try {
      console.log(`Uploading unique image for ${slug}...`);
      const asset = await client.assets.upload('image', fs.createReadStream(imgPath), {
        filename: `${slug}-thumb.png`
      });

      const docId = `product-${slug}`;
      await client.patch(docId).set({
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id
          },
          alt: `Thumbnail ${slug}`
        }
      }).commit();
      
      console.log(`✅ Updated ${slug} with unique image.`);
    } catch (err) {
      console.error(`❌ Failed to update ${slug}:`, err.message);
    }
  }
}

main().catch(console.error);
