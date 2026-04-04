const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'b017f7tl',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false,
  token: 'skMU5y462khTCoQizwtweMjnw2gQfSbLoPKQFVvPW8Qp3qavnPqY3k7reXbrQd7w6BG8qocFlioVavsf7PspJeFYwPgTjXwOtC0kwkszAnZnyz1ig9Kw5cxpRB3XvBJ2CGSw7zvsik2n9DfHySGwzg1n9HTwdry26lOgjxdg2ROZFrSuG5jC'
});

async function run() {
  console.log("Fetching home-pepar page...");
  const pageIds = ['drafts.69d7ce71-e7cb-4b2a-aecf-ceda595f9393', '69d7ce71-e7cb-4b2a-aecf-ceda595f9393']; // I don't know the explicit ID, but wait, the slug is "home-pepar". Let's search by slug.
  
  const page = await client.fetch('*[_type == "page" && slug.current == "home-pepar"][0]');
  if (page) {
    console.log("Patching home-pepar title...");
    
    // We want to replace the first block if it contains the old internal title.
    // Instead of replacing the block, let's just update the SEO/metadata fields for the document.
    await client.patch(page._id).set({
      title: "Solusi IT, Website, Software, dan Percetakan untuk Bisnis di Surabaya",
      "seo.metaTitle": "Kotacom — Jasa IT, Website, Software & Percetakan Surabaya",
      "seo.metaDescription": "Solusi IT terpadu untuk bisnis: Jasa pembuatan website, software development custom, IT support, dan percetakan profesional di Surabaya dan sekitarnya.",
    }).commit();
    console.log("Patched page content.");
  } else {
    console.log("Could not find home-pepar page.");
  }

  console.log("Fetching settingsNavigation...");
  const nav = await client.fetch('*[_type == "settingsNavigation"][0]');
  if (nav && nav.mainNav) {
    const newMainNav = nav.mainNav.filter(item => item.label !== 'dddddddddddd');
    if (newMainNav.length !== nav.mainNav.length) {
      console.log("Removing dddddddddddd from navigation");
      await client.patch(nav._id).set({ mainNav: newMainNav }).commit();
    }
  }
  
  console.log("Done");
}

run().catch(console.error);
