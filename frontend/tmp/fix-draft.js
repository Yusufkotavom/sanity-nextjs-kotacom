const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'b017f7tl',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false,
  token: 'skMU5y462khTCoQizwtweMjnw2gQfSbLoPKQFVvPW8Qp3qavnPqY3k7reXbrQd7w6BG8qocFlioVavsf7PspJeFYwPgTjXwOtC0kwkszAnZnyz1ig9Kw5cxpRB3XvBJ2CGSw7zvsik2n9DfHySGwzg1n9HTwdry26lOgjxdg2ROZFrSuG5jC'
});

async function run() {
  const publishedDoc = await client.fetch('*[_id == "aiWriterSettings"][0]');
  
  if (publishedDoc && publishedDoc.prompts) {
    // Write prompts to the draft document so the Studio sees them
    await client.patch('drafts.aiWriterSettings').set({
      prompts: publishedDoc.prompts
    }).commit();
    console.log("Draft patched successfully");
  } else {
    console.log("Could not find prompts in published document");
  }
}

run().catch(console.error);
