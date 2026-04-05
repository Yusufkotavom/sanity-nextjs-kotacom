import { createSanityWriteClient, loadSanityEnv } from "./lib/sanity-page-guards.mjs";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const manifestPath = join(__dirname, "../lib/legacy-pages/astro-static-manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));

const args = new Set(process.argv.slice(2));
const shouldWrite = args.has("--write");
const DRY_RUN = !shouldWrite;

const makeKey = () =>
  `key_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;

async function main() {
  await loadSanityEnv();
  const client = await createSanityWriteClient();

  console.log(`\n📦 Migrating Remaining URLs to Sanity (${DRY_RUN ? "DRY RUN" : "LIVE"})\n`);

  // Get existing routes from Sanity
  const existingRoutes = new Set();
  const sanityPages = await client.fetch(`*[_type == "page" && defined(route)]{ route }`);
  const sanityPageLocations = await client.fetch(`*[_type == "pageLocation" && defined(route)]{ route }`);
  const sanityServiceLocations = await client.fetch(`*[_type == "serviceLocation" && defined(route)]{ route }`);
  
  [...sanityPages, ...sanityPageLocations, ...sanityServiceLocations].forEach(doc => {
    existingRoutes.add(doc.route);
  });

  console.log(`📊 Found ${existingRoutes.size} existing routes in Sanity`);
  console.log(`📊 Found ${manifest.length} routes in local manifest`);

  // Categorize URLs to migrate
  const toMigrate = {
    static: [],
    cityBased: [],
    serviceBased: [],
  };

  manifest.forEach(item => {
    if (existingRoutes.has(item.route)) {
      // Already in Sanity, skip
      return;
    }

    if (item.sourceFile.includes("[kota]")) {
      toMigrate.cityBased.push(item);
    } else if (
      item.sourceFile.includes("jasa-") || 
      item.sourceFile.includes("cetak-") || 
      (item.sourceFile.includes("software/") && item.route !== "/software")
    ) {
      toMigrate.serviceBased.push(item);
    } else {
      toMigrate.static.push(item);
    }
  });

  console.log(`\n📈 URLs to migrate:`);
  console.log(`  - Static pages: ${toMigrate.static.length}`);
  console.log(`  - City-based pages: ${toMigrate.cityBased.length}`);
  console.log(`  - Service pages: ${toMigrate.serviceBased.length}`);
  console.log(`  - Total: ${toMigrate.static.length + toMigrate.cityBased.length + toMigrate.serviceBased.length}`);
  console.log();

  // Get existing locations and templates
  const locations = await client.fetch(`*[_type == "location"]{ _id, "slug": slug.current }`);
  const locationMap = new Map(locations.map(l => [l.slug, l._id]));

  const templates = await client.fetch(`*[_type == "pageTemplate"]{ _id, "slug": slug.current }`);
  const templateMap = new Map(templates.map(t => [t.slug, t._id]));

  console.log(`📍 Found ${locations.length} locations in Sanity`);
  console.log(`📄 Found ${templates.length} templates in Sanity`);
  console.log();

  let created = 0;
  let skipped = 0;
  let errors = 0;

  // Migrate static pages
  if (toMigrate.static.length > 0) {
    console.log(`\n📄 Migrating ${toMigrate.static.length} static pages...`);
    
    for (const item of toMigrate.static) {
      const doc = {
        _id: `page-${item.slug}`,
        _type: "page",
        title: item.title,
        route: item.route,
        slug: { _type: "slug", current: item.slug },
        blocks: [],
        meta: {
          noindex: true,
          description: `${item.title} - Kotacom`,
        },
      };

      if (DRY_RUN) {
        console.log(`  DRY RUN: would create page ${doc._id} (${item.route})`);
        created++;
      } else {
        try {
          await client.createOrReplace(doc);
          console.log(`  ✅ Created ${doc._id} (${item.route})`);
          created++;
          await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
        } catch (err) {
          console.error(`  ❌ Failed ${doc._id}: ${err.message}`);
          errors++;
        }
      }
    }
  }

  // Migrate city-based pages
  if (toMigrate.cityBased.length > 0) {
    console.log(`\n📍 Migrating ${toMigrate.cityBased.length} city-based pages...`);
    
    for (const item of toMigrate.cityBased) {
      const parts = item.route.split("/").filter(Boolean);
      const category = parts[0]; // pembuatan-website, percetakan
      const citySlug = parts[parts.length - 1]; // last segment is city
      
      const locationId = locationMap.get(citySlug);
      if (!locationId) {
        console.log(`  ⚠️  Skipped ${item.route}: location '${citySlug}' not found`);
        skipped++;
        continue;
      }

      // Check if this is a 3-level route (has service in middle)
      const hasService = parts.length === 3;
      
      if (hasService) {
        // This is a service location route like /percetakan/cetak-kalender/jakarta
        const serviceSlug = parts[1];
        
        // Find serviceType by slug - try exact match first, then without prefix
        let serviceTypes = await client.fetch(
          `*[_type == "serviceType" && slug.current == $slug][0]{ _id }`,
          { slug: serviceSlug }
        );
        
        // If not found, try removing "cetak-" or "jasa-pembuatan-website-" prefix
        if (!serviceTypes) {
          const cleanSlug = serviceSlug
            .replace(/^cetak-/, '')
            .replace(/^jasa-pembuatan-website-/, '')
            .replace(/^jasa-/, '');
          
          serviceTypes = await client.fetch(
            `*[_type == "serviceType" && slug.current == $slug][0]{ _id }`,
            { slug: cleanSlug }
          );
        }
        
        if (!serviceTypes) {
          console.log(`  ⚠️  Skipped ${item.route}: serviceType '${serviceSlug}' not found`);
          skipped++;
          continue;
        }

        const templateId = templateMap.get(category) || null;
        
        const doc = {
          _id: `service-location-${category}-${serviceSlug}-${citySlug}`,
          _type: "serviceLocation",
          title: item.title,
          route: item.route,
          routePattern: `/${category}/{service}/{lokasi}`,
          serviceType: { _type: "reference", _ref: serviceTypes._id },
          location: { _type: "reference", _ref: locationId },
          template: templateId ? { _type: "reference", _ref: templateId } : null,
          contentStatus: "draft",
          meta: { noindex: true },
        };

        if (DRY_RUN) {
          console.log(`  DRY RUN: would create serviceLocation ${doc._id} (${item.route})`);
          created++;
        } else {
          try {
            await client.createOrReplace(doc);
            console.log(`  ✅ Created ${doc._id} (${item.route})`);
            created++;
            await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
          } catch (err) {
            console.error(`  ❌ Failed ${doc._id}: ${err.message}`);
            errors++;
          }
        }
      } else {
        // This is a 2-level route like /pembuatan-website/jakarta
        const templateId = templateMap.get(category) || null;
        
        const doc = {
          _id: `page-location-${category}-${citySlug}`,
          _type: "pageLocation",
          title: item.title,
          route: item.route,
          routePattern: `/${category}/{lokasi}`,
          location: { _type: "reference", _ref: locationId },
          template: templateId ? { _type: "reference", _ref: templateId } : null,
          contentStatus: "draft",
          meta: { noindex: true },
        };

        if (DRY_RUN) {
          console.log(`  DRY RUN: would create pageLocation ${doc._id} (${item.route})`);
          created++;
        } else {
          try {
            await client.createOrReplace(doc);
            console.log(`  ✅ Created ${doc._id} (${item.route})`);
            created++;
            await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
          } catch (err) {
            console.error(`  ❌ Failed ${doc._id}: ${err.message}`);
            errors++;
          }
        }
      }
    }
  }

  // Migrate service pages (standalone)
  if (toMigrate.serviceBased.length > 0) {
    console.log(`\n🛠️  Migrating ${toMigrate.serviceBased.length} service pages...`);
    console.log(`⚠️  Note: These will be created as regular 'page' documents`);
    console.log(`   Consider if they should be serviceType + serviceLocation instead`);
    console.log();
    
    for (const item of toMigrate.serviceBased) {
      const doc = {
        _id: `page-${item.slug}`,
        _type: "page",
        title: item.title,
        route: item.route,
        slug: { _type: "slug", current: item.slug },
        blocks: [],
        meta: {
          noindex: true,
          description: `${item.title} - Kotacom`,
        },
      };

      if (DRY_RUN) {
        console.log(`  DRY RUN: would create page ${doc._id} (${item.route})`);
        created++;
      } else {
        try {
          await client.createOrReplace(doc);
          console.log(`  ✅ Created ${doc._id} (${item.route})`);
          created++;
          await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
        } catch (err) {
          console.error(`  ❌ Failed ${doc._id}: ${err.message}`);
          errors++;
        }
      }
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`  - Created: ${created}`);
  console.log(`  - Skipped: ${skipped}`);
  console.log(`  - Errors: ${errors}`);

  if (DRY_RUN) {
    console.log(`\n⚠️  Dry run only. Re-run with --write to apply.`);
  } else {
    console.log(`\n✅ Migration complete!`);
    console.log(`\nNext steps:`);
    console.log(`1. Review documents in Sanity Studio`);
    console.log(`2. Run comparison script to verify: node scripts/compare-local-vs-sanity-urls.mjs`);
    console.log(`3. Update contentStatus from 'draft' to 'index' when ready`);
    console.log(`4. Test URLs to verify they work`);
  }
}

main().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
