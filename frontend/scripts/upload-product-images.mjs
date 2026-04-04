import path from 'node:path';
import { createReadStream, readdirSync } from 'node:fs';
import { createClient } from '@sanity/client';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.resolve(__dirname, '..');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = '2024-01-01';
const token = process.env.SANITY_DEV || process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("Missing Sanity auth token");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

async function run() {
  const productsDir = path.join(frontendDir, 'public', 'images', 'products');
  const files = readdirSync(productsDir).filter(f => f.endsWith('.png'));

  const imagesMap = {
    'banner_print_': { title: 'Banner Printing', slug: 'banner-printing', curr: 'IDR', price: 50000 },
    'book_printing_': { title: 'Book Printing', slug: 'book-printing', curr: 'IDR', price: 30000 },
    'brochure_print_': { title: 'Brochure Printing', slug: 'brochure-printing', curr: 'IDR', price: 150000 },
    'business_card_print_': { title: 'Business Card Printing', slug: 'business-card-printing', curr: 'IDR', price: 40000 },
    'packaging_print_': { title: 'Packaging Printing', slug: 'packaging-printing', curr: 'IDR', price: 5000 },
    'quran_print_': { title: 'Quran Printing', slug: 'quran-printing', curr: 'IDR', price: 75000 },
    'sticker_print_': { title: 'Sticker Printing', slug: 'sticker-printing', curr: 'IDR', price: 20000 },
    'tshirt_print_': { title: 'T-Shirt Printing', slug: 't-shirt-printing', curr: 'IDR', price: 65000 },
    'wedding_album_print_': { title: 'Wedding Album Printing', slug: 'wedding-album-printing', curr: 'IDR', price: 120000 },
    'cetak_percetakan_thumb_': { title: 'Cetak Percetakan Umum', slug: 'cetak-percetakan-umum', curr: 'IDR', price: 10000 },
  };

  for (const file of files) {
    console.log(`Processing ${file}...`);
    const match = Object.keys(imagesMap).find(k => file.startsWith(k));
    if (!match) {
      console.log(`Skipping ${file}, no product mapping found.`);
      continue;
    }
    
    const info = imagesMap[match];
    const filepath = path.join(productsDir, file);
    
    console.log(`Uploading image for ${info.title}...`);
    const imageAsset = await client.assets.upload('image', createReadStream(filepath), {
      filename: file,
      contentType: 'image/png'
    });
    
    console.log(`Image uploaded. Asset ID: ${imageAsset._id}`);
    
    const query = `*[_type == "product" && slug.current == $slug][0]`;
    const existing = await client.fetch(query, { slug: info.slug });
    
    if (existing) {
      console.log(`Product ${info.title} exists. Updating image...`);
      await client.patch(existing._id)
        .set({
          image: {
            _type: 'image',
            asset: { _type: 'reference', _ref: imageAsset._id },
            alt: info.title
          }
        })
        .commit();
        console.log(`Product ${info.title} updated.`);
    } else {
      console.log(`Product ${info.title} not found. Creating new product...`);
      await client.create({
        _type: 'product',
        title: info.title,
        slug: { _type: 'slug', current: info.slug },
        price: info.price,
        currency: info.curr,
        availability: 'in-stock',
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: imageAsset._id },
          alt: info.title
        }
      });
      console.log(`Product ${info.title} created.`);
    }
  }
}

run().catch(console.error);
