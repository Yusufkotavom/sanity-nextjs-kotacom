const WEBOOK_URL = 'http://localhost:3000/api/revalidate?secret=dbf637ca11029cbb31110fda38e2154c12bb144a';

const payload = {
  _type: "post",
  slug: { current: "test-slug-webhook" }
};

async function testWebhook() {
  console.log(`Testing Webhook at: ${WEBOOK_URL}...`);
  console.log(`Simulating Publish for type "${payload._type}" with slug "${payload.slug.current}"`);

  try {
    const res = await fetch(WEBOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (res.ok) {
      console.log('✅ Webhook Response Success!');
      console.log('Cache Invalidated For:', data.revalidated);
      console.log('Response body:', data);
    } else {
      console.error(`❌ Webhook Error (Status ${res.status}):`);
      console.error(data);
    }
  } catch (error) {
    if (error.cause && error.cause.code === 'ECONNREFUSED') {
       console.error('❌ Connection Refused. Make sure Next.js server is running on localhost:3000');
    } else {
       console.error('❌ Fetch Error:', error);
    }
  }
}

testWebhook();
