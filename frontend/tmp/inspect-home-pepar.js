const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'b017f7tl',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false,
  token: 'skMU5y462khTCoQizwtweMjnw2gQfSbLoPKQFVvPW8Qp3qavnPqY3k7reXbrQd7w6BG8qocFlioVavsf7PspJeFYwPgTjXwOtC0kwkszAnZnyz1ig9Kw5cxpRB3XvBJ2CGSw7zvsik2n9DfHySGwzg1n9HTwdry26lOgjxdg2ROZFrSuG5jC'
});

async function run() {
  const page = await client.fetch('*[_type == "page" && slug.current == "home-pepar"][0]');
  console.log(JSON.stringify(page, null, 2));
}

run().catch(console.error);
