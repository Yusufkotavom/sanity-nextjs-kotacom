import { createClient } from 'next-sanity';

const token = process.env.SANITY_DEV || process.env.SANITY_AUTH_TOKEN;
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'b017f7tl',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token
});

async function run() {
  const query = `*[_type in ["page", "redirect", "post", "product", "service"] && (slug.current match "*aceh*" || source match "*aceh*")]{ _id, _type, "slug": slug.current, source }`;
  const docs = await client.fetch(query);
  console.log(JSON.stringify(docs, null, 2));
}

run().catch(console.error);
