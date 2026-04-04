import { createClient } from '@sanity/client';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

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
    perspective: "previewDrafts",
    token: env.SANITY_DEV || env.SANITY_AUTH_TOKEN,
  });

  const redirects = await client.fetch(`*[_type == "redirect"]{source, destination, permanent}`);
  const pages = await client.fetch(`*[_type in ["post", "page", "product", "service", "project"] && defined(slug.current)]{_type, "slug": slug.current}`);
  const settings = await client.fetch(`*[_type == "settings"][0]`);
  console.log("Settings keys:", Object.keys(settings || {}));

  const redirectsJsonPath = path.join(__dirname, '../tmp/sanity-redirects.json');
  const pagesJsonPath = path.join(__dirname, '../tmp/sanity-pages.json');

  await fs.mkdir(path.dirname(redirectsJsonPath), { recursive: true });
  await fs.writeFile(redirectsJsonPath, JSON.stringify(redirects, null, 2));
  await fs.writeFile(pagesJsonPath, JSON.stringify(pages, null, 2));

  console.log(`Found ${redirects.length} redirects and ${pages.length} pages in Sanity.`);
}

main().catch(console.error);
