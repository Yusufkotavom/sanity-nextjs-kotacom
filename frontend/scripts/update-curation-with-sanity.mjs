import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const sanityPagesPath = path.join(__dirname, '../tmp/sanity-pages.json');
  const sanityRedirectsPath = path.join(__dirname, '../tmp/sanity-redirects.json');
  const localManifestPath = path.join(__dirname, '../lib/legacy-pages/astro-static-manifest.json');
  const gscHealthPath = path.join(__dirname, '../tmp/gsc-kotacom-full/gsc-migration-health-merged.csv');
  const worklistV3Path = path.join(__dirname, '../../docs/curation/manual-top300-worklist-v3.csv');

  const sanityPages = JSON.parse(await fs.readFile(sanityPagesPath, 'utf8'));
  const sanityRedirects = JSON.parse(await fs.readFile(sanityRedirectsPath, 'utf8'));
  let localManifest = [];
  try {
    localManifest = JSON.parse(await fs.readFile(localManifestPath, 'utf8'));
  } catch (e) {
    console.warn("Could not read local manifest:", e.message);
  }

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

  // Helper to check wildcards from next.config.mjs
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

  // Check GSC Health Merged CSV
  const healthCsv = await fs.readFile(gscHealthPath, 'utf8');
  const healthLines = healthCsv.split('\n');
  const healthHeaders = healthLines[0].split(',');
  
  let coveredByPage = 0;
  let coveredByLocal = 0;
  let coveredByRedirect = 0;
  let coveredByWildcard = 0;
  let remaining = 0;

  for (let i = 1; i < healthLines.length; i++) {
    if (!healthLines[i].trim()) continue;
    const parts = healthLines[i].split(',');
    const oldPath = parts[1]; // Assuming oldPath is the second column
    
    if (sanityPaths.has(oldPath)) {
      coveredByPage++;
    } else if (localPaths.has(oldPath)) {
      coveredByLocal++;
    } else if (sanityRedirectMap.has(oldPath)) {
      coveredByRedirect++;
    } else if (matchesWildcard(oldPath)) {
      coveredByWildcard++;
    } else {
      remaining++;
    }
  }

  console.log('--- GSC MIGRATION HEALTH COVERAGE ---');
  console.log(`Covered by Sanity Page: ${coveredByPage}`);
  console.log(`Covered by Local Astro Page: ${coveredByLocal}`);
  console.log(`Covered by Sanity Redirect: ${coveredByRedirect}`);
  console.log(`Covered by Next.js Wildcard: ${coveredByWildcard}`);
  console.log(`Remaining / Not found: ${remaining}`);

  // Check Worklist V3
  const worklistCsv = await fs.readFile(worklistV3Path, 'utf8');
  const worklistLines = worklistCsv.split('\n');
  const worklistHeaders = worklistLines[0].split(',');
  
  const oldPathIdx = worklistHeaders.indexOf('oldPath');
  const reviewStatusIdx = worklistHeaders.indexOf('reviewStatus');
  
  let wlCoveredByPage = 0;
  let wlCoveredByLocal = 0;
  let wlCoveredByRedirect = 0;
  let wlCoveredByWildcard = 0;
  let wlRemaining = 0;

  const wlRemainingUrls = [];

  for (let i = 1; i < worklistLines.length; i++) {
    if (!worklistLines[i].trim()) continue;
    
    // Simple CSV parser for this specific file
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

    if (sanityPaths.has(oldPath)) {
      wlCoveredByPage++;
    } else if (localPaths.has(oldPath)) {
      wlCoveredByLocal++;
    } else if (sanityRedirectMap.has(oldPath)) {
      wlCoveredByRedirect++;
    } else if (matchesWildcard(oldPath)) {
      wlCoveredByWildcard++;
    } else {
      wlRemaining++;
      wlRemainingUrls.push(oldPath);
    }
  }

  console.log('\n--- MANUAL WORKLIST V3 COVERAGE ---');
  console.log(`Covered by Sanity Page: ${wlCoveredByPage}`);
  console.log(`Covered by Local Astro Page: ${wlCoveredByLocal}`);
  console.log(`Covered by Sanity Redirect: ${wlCoveredByRedirect}`);
  console.log(`Covered by Next.js Wildcard: ${wlCoveredByWildcard}`);
  console.log(`Remaining to be reviewed/migrated: ${wlRemaining}`);

  if (wlRemainingUrls.length > 0) {
    console.log('\nSample remaining URLs:');
    wlRemainingUrls.slice(0, 10).forEach(u => console.log('- ' + u));
  }
}

main().catch(console.error);