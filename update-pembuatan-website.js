// Script to update pembuatan-website page via Sanity HTTP API
const https = require('https');

const projectId = 'b017f7tl';
const dataset = 'production';
const token = 'skMU5y462khTCoQizwtweMjnw2gQfSbLoPKQFVvPW8Qp3qavnPqY3k7reXbrQd7w6BG8qocFlioVavsf7PspJeFYwPgTjXwOtC0kwkszAnZnyz1ig9Kw5cxpRB3XvBJ2CGSw7zvsik2n9DfHySGwzg1n9HTwdry26lOgjxdg2ROZFrSuG5jC';

async function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: `${projectId}.api.sanity.io`,
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve(body);
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function updatePage() {
  console.log('🔍 Step 1: Fetching new page data...\n');
  
  // Get the new page
  const query = encodeURIComponent('*[_id == "pembuatan-website-page"][0]');
  const newPageResponse = await makeRequest('GET', `/v2021-10-21/data/query/${dataset}?query=${query}`);
  const newPage = newPageResponse.result;
  
  if (!newPage) {
    console.log('❌ New page not found!');
    return;
  }
  
  console.log(`✅ Found new page: ${newPage.title}`);
  console.log(`   Blocks: ${newPage.blocks?.length || 0}\n`);
  
  console.log('🗑️  Step 2: Deleting old page...\n');
  
  // Delete old page
  const mutations = [
    { delete: { id: 'page-pembuatan-website' } }
  ];
  
  await makeRequest('POST', `/v2021-10-21/data/mutate/${dataset}`, { mutations });
  console.log('✅ Old page deleted\n');
  
  console.log('📝 Step 3: Creating page with correct ID...\n');
  
  // Create new page with correct ID
  const { _id, _rev, _createdAt, _updatedAt, ...pageData } = newPage;
  
  const createMutations = [
    {
      createOrReplace: {
        _id: 'page-pembuatan-website',
        _type: 'page',
        ...pageData
      }
    }
  ];
  
  await makeRequest('POST', `/v2021-10-21/data/mutate/${dataset}`, { mutations: createMutations });
  console.log('✅ Page created with correct ID\n');
  
  console.log('🗑️  Step 4: Cleaning up imported page...\n');
  
  // Delete imported page
  const cleanupMutations = [
    { delete: { id: 'pembuatan-website-page' } }
  ];
  
  await makeRequest('POST', `/v2021-10-21/data/mutate/${dataset}`, { mutations: cleanupMutations });
  console.log('✅ Imported page deleted\n');
  
  console.log('🔍 Step 5: Verifying...\n');
  
  // Verify
  const verifyQuery = encodeURIComponent('*[_type == "page" && slug.current == "pembuatan-website"]{_id, title, topBlockCount, "blockCount": count(blocks)}');
  const verifyResponse = await makeRequest('GET', `/v2021-10-21/data/query/${dataset}?query=${verifyQuery}`);
  
  console.log(`✅ Final result: ${verifyResponse.result.length} page(s)`);
  verifyResponse.result.forEach(page => {
    console.log(`   ID: ${page._id}`);
    console.log(`   Title: ${page.title}`);
    console.log(`   Blocks: ${page.blockCount}`);
    console.log(`   Top Block Count: ${page.topBlockCount}`);
  });
  
  console.log('\n✅ Done! Page is ready.');
  console.log('🔄 Revalidating frontend...\n');
}

updatePage().catch(console.error);
