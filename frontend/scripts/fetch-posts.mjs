import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = '2024-01-01';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

async function run() {
  const posts = await client.fetch(`*[_type == "post"]{title}`);
  console.log("Posts:", posts.map(p => p.title));
}

run().catch(console.error);
