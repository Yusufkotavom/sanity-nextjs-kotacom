import { createSanityReadClient, loadSanityEnv } from "./lib/sanity-page-guards.mjs";
import fs from "fs";
import path from "path";

function parseEnvFile(raw) {
  const parsed = {};
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    parsed[key] = value;
  }
  return parsed;
}

async function main() {
  const rootEnvPath = path.resolve("../../.env");
  let envs = {};
  try {
    const raw = fs.readFileSync(rootEnvPath, 'utf8');
    envs = parseEnvFile(raw);
  } catch (e) {}

  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || envs.NEXT_PUBLIC_SANITY_PROJECT_ID;
  process.env.NEXT_PUBLIC_SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || envs.NEXT_PUBLIC_SANITY_DATASET;

  await loadSanityEnv();
  const client = await createSanityReadClient();

  const exactRouteQuery = `*[_type in ["pageLocation", "serviceLocation"] && route == "/pembuatan-website/bandar-lampung"][0]{
    _id, _type, title, route, routePattern, "serviceTitle": service->title, "locationTitle": location->title
  }`;
  
  console.log("Checking exact route document...");
  const exactDoc = await client.fetch(exactRouteQuery);
  console.log(JSON.stringify(exactDoc, null, 2));

  if (!exactDoc) {
    console.log("\\nChecking pattern fallback...");
    // The pattern fallback code in fetch.ts uses:
    // pattern = "/pembuatan-website/{lokasi}"
    // service = undefined
    // city = "bandar-lampung"
    const patternQuery = `*[
      _type in ["pageLocation", "serviceLocation"]
      && routePattern == "/pembuatan-website/{lokasi}"
      && location->slug.current == "bandar-lampung"
    ]{
      _id, _type, title, route, routePattern, "locationTitle": location->title
    }`;
    const patternDocs = await client.fetch(patternQuery);
    console.log(JSON.stringify(patternDocs, null, 2));
  }
  
  console.log("\\nChecking legacy pages in astro-static-manifest...");
  try {
    const manifestPath = path.resolve("../lib/legacy-pages/astro-static-manifest.json");
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const legacyPage = manifest.find(p => p.route === "/pembuatan-website/bandar-lampung");
    if(legacyPage) {
       console.log("Found in Legacy Astro Static Manifest:", legacyPage);
    } else {
       console.log("Not found in Legacy Astro Static Manifest.");
    }
  } catch(e) {
    console.log("No legacy manifest found or error:", e.message);
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
