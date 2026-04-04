import fs from 'node:fs/promises';
import { google } from 'googleapis';

// Konfigurasi
const SA_FILE_PATH = '../../deploy/valued-sight-469014-d8-f24ec5dc7001.json';
const URL_TO_TEST = 'https://www.kotacom.id/page-a';
const INDEXNOW_HOST = 'www.kotacom.id';
const INDEXNOW_KEY = '6d10c4ecbdb64cc39dcc32492ed4d275';
// URL lokasi key (dashboard otomatis membuatkan format ini)
const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;

async function testGoogle() {
  console.log('\n--- 1. Testing Google Indexing API ---');
  try {
    const keyFile = await fs.readFile(new URL(SA_FILE_PATH, import.meta.url), 'utf8');
    const credentials = JSON.parse(keyFile);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const client = await auth.getClient();
    const indexing = google.indexing({ version: 'v3', auth: client });

    console.log(`Submitting URL to Google API: ${URL_TO_TEST}...`);
    const res = await indexing.urlNotifications.publish({
      requestBody: { url: URL_TO_TEST, type: 'URL_UPDATED' },
    });

    console.log('✅ Google API Success!');
    console.log(res.data);
  } catch (error) {
    console.error('❌ Google API Error:');
    console.error(error.message);
    if (error.response && error.response.data) {
        console.error(JSON.stringify(error.response.data, null, 2));
    }
  }
}

async function testIndexNow() {
  console.log('\n--- 2. Testing IndexNow API ---');
  try {
    const payload = {
      host: INDEXNOW_HOST,
      key: INDEXNOW_KEY,
      keyLocation: INDEXNOW_KEY_LOCATION,
      urlList: [URL_TO_TEST],
    };

    console.log(`Submitting to api.indexnow.org...`);
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    if (response.ok) {
      console.log('✅ IndexNow Success (HTTP Status ' + response.status + ')!');
      console.log(text || 'OK (No content returned, which is normal)');
    } else {
      console.error('❌ IndexNow Response Error (HTTP ' + response.status + '):');
      console.error(text);
    }
  } catch (error) {
    console.error('❌ IndexNow Fetch Error:', error.message);
  }
}

async function testAll() {
  await testGoogle();
  await testIndexNow();
}

testAll();
