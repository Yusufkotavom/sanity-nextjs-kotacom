import { createSanityReadClient, loadSanityEnv } from "./scripts/lib/sanity-page-guards.mjs";

async function run() {
  await loadSanityEnv();
  const client = await createSanityReadClient();

  // Semua page dengan konten
  const pages = await client.fetch(`*[_type == "page" && count(blocks) > 0]{_id, title, route, blocks[]{_type}}`);
  // Blog posts yang sudah ada 
  const blogPosts = await client.fetch(`*[_type == "post"]{_id, title, slug}`);
  
  console.log(`\n=== SEMUA PAGE DENGAN KONTEN (${pages.length}) ===`);
  pages.forEach(p => {
    const blockTypes = [...new Set(p.blocks?.map(b => b._type) || [])].join(", ");
    console.log(`- [${p._id}] ${p.route} | ${p.title} | blocks: ${blockTypes || "kosong"}`);
  });

  console.log(`\n=== BLOG POSTS YANG SUDAH ADA (${blogPosts.length}) ===`);
  blogPosts.forEach(p => console.log(`- ${p.title} | /${p.slug?.current}`));
}

run().catch(console.error);
