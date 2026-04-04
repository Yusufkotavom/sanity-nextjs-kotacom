import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const sanityRedirectsPath = path.join(__dirname, '../tmp/sanity-redirects.json');
  const sanityRedirects = JSON.parse(await fs.readFile(sanityRedirectsPath, 'utf8'));

  const uniqueDestinations = new Set();
  sanityRedirects.forEach(r => {
    if (r.destination && !r.destination.startsWith('http')) {
      uniqueDestinations.add(r.destination);
    }
  });

  console.log(`Checking ${uniqueDestinations.size} unique internal redirect destinations...`);

  let brokenCount = 0;
  const brokenDestinations = [];

  const batchSize = 10;
  const destArray = Array.from(uniqueDestinations);

  for (let i = 0; i < destArray.length; i += batchSize) {
    const batch = destArray.slice(i, i + batchSize);
    await Promise.all(batch.map(async (dest) => {
      const url = `https://sanity.kotacom.id${dest}`;
      try {
        const response = await fetch(url, { method: 'HEAD', redirect: 'follow' });
        if (response.status >= 400) {
          console.log(`[BROKEN] ${response.status} - ${dest}`);
          brokenCount++;
          brokenDestinations.push({ dest, status: response.status });
        }
      } catch (err) {
        console.log(`[ERROR] ${dest} - ${err.message}`);
        brokenCount++;
        brokenDestinations.push({ dest, error: err.message });
      }
    }));
  }

  console.log(`\nTotal broken destinations: ${brokenCount}`);
  
  if (brokenCount > 0) {
    console.log('Writing broken destinations to tmp/broken-destinations.json');
    await fs.writeFile(
      path.join(__dirname, '../tmp/broken-destinations.json'), 
      JSON.stringify(brokenDestinations, null, 2)
    );
  }
}

main().catch(console.error);