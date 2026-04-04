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
  const services = await client.fetch(`*[_type == "service"]{title}`);
  const projects = await client.fetch(`*[_type == "project"]{title}`);
  console.log("Services:", services.map(s => s.title));
  console.log("Projects:", projects.map(p => p.title));
}

run().catch(console.error);
