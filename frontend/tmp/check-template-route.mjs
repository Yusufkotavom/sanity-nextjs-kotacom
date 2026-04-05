import { createClient } from '@sanity/client';
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-01',
  token: process.env.SANITY_DEV || process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});
const route = '/software/surabaya';
const query = '*[_type in ["pageLocation", "serviceLocation"] && route == $route][0]{_id,_type,route,title}';
const doc = await client.fetch(query, { route });
console.log(doc);
