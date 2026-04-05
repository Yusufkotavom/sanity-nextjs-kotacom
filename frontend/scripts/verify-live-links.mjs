import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const sanityPagesPath = path.join(__dirname, '../tmp/sanity-pages.json');
  const sanityRedirectsPath = path.join(__dirname, '../tmp/sanity-redirects.json');
  const localManifestPath = path.join(__dirname, '../lib/legacy-pages/astro-static-manifest.json');
  const worklistV3Path = path.join(__dirname, '../../docs/curation/manual-top300-worklist-v3.csv');

  const sanityPages = JSON.parse(await fs.readFile(sanityPagesPath, 'utf8'));
  const sanityRedirects = JSON.parse(await fs.readFile(sanityRedirectsPath, 'utf8'));
  let localManifest = [];
  try {
    localManifest = JSON.parse(await fs.readFile(localManifestPath, 'utf8'));
  } catch (e) {}

  const sanityPaths = new Set(sanityPages.map(p => {
    if (p._type === 'post') return `/blog/${p.slug}`;
    if (p._type === 'product') return `/products/${p.slug}`;
    if (p._type === 'service') return `/services/${p.slug}`;
    if (p._type === 'project') return `/projects/${p.slug}`;
    return `/${p.slug}`;
  }));

  const localPaths = new Set(localManifest.map(p => p.route));

  const sanityRedirectMap = new Map();
  sanityRedirects.forEach(r => {
    if (r.source && r.destination) {
      sanityRedirectMap.set(r.source, r.destination);
    }
  });

  function matchesWildcard(oldPath) {
    if (oldPath.startsWith('/product-tag/')) return true;
    if (oldPath.startsWith('/product-category/')) return true;
    if (oldPath.startsWith('/tag/')) return true;
    if (oldPath.startsWith('/product/')) return true;
    if (oldPath.startsWith('/service/')) return true;
    if (oldPath.startsWith('/digital-product/')) return true;
    if (oldPath.startsWith('/it-services/')) return true;
    return false;
  }

  const worklistCsv = await fs.readFile(worklistV3Path, 'utf8');
  const worklistLines = worklistCsv.split('\n');
  const worklistHeaders = worklistLines[0].split(',');
  const oldPathIdx = worklistHeaders.indexOf('oldPath');

  const wlRemainingUrls = [];

  for (let i = 1; i < worklistLines.length; i++) {
    if (!worklistLines[i].trim()) continue;
    let cols = [];
    let cur = "";
    let quoted = false;
    for(let char of worklistLines[i]) {
      if(char === '"') quoted = !quoted;
      else if(char === ',' && !quoted) { cols.push(cur); cur = ""; }
      else cur += char;
    }
    cols.push(cur);
    const oldPath = cols[oldPathIdx];
    if (!oldPath) continue;

    if (!sanityPaths.has(oldPath) && !localPaths.has(oldPath) && !sanityRedirectMap.has(oldPath) && !matchesWildcard(oldPath)) {
      wlRemainingUrls.push(oldPath);
    }
  }

  console.log(`Verifying ${wlRemainingUrls.length} URLs on https://www.kotacom.id...\n`);

  for (const urlPath of wlRemainingUrls) {
    const fullUrl = `https://www.kotacom.id${urlPath}`;
    try {
      const response = await fetch(fullUrl, { method: 'HEAD', redirect: 'manual' });
      console.log(`[${response.status} ${response.statusText}] ${urlPath}`);
      if (response.status >= 300 && response.status < 400) {
        console.log(`   -> Redirects to: ${response.headers.get('location')}`);
      }
    } catch (error) {
      console.log(`[ERROR] ${urlPath} - ${error.message}`);
    }
  }
}

main().catch(console.error);