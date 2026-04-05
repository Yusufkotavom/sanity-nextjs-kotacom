import { createSanityWriteClient, loadSanityEnv } from "./lib/sanity-page-guards.mjs";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const manifestPath = join(__dirname, "../lib/legacy-pages/astro-static-manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));

async function main() {
  await loadSanityEnv();
  const client = await createSanityWriteClient();

  console.log("\n📊 Comparing Local URLs vs Sanity URLs\n");

  // Get all routes from Sanity
  const sanityPages = await client.fetch(`
    *[_type == "page" && defined(route)]{ route, title, _type }
  `);
  
  const sanityPageLocations = await client.fetch(`
    *[_type == "pageLocation" && defined(route)]{ route, title, _type }
  `);
  
  const sanityServiceLocations = await client.fetch(`
    *[_type == "serviceLocation" && defined(route)]{ route, title, _type }
  `);

  const allSanityRoutes = new Map();
  [...sanityPages, ...sanityPageLocations, ...sanityServiceLocations].forEach(doc => {
    allSanityRoutes.set(doc.route, { title: doc.title, type: doc._type });
  });

  // Compare
  const results = {
    inBoth: [],
    onlyLocal: [],
    onlySanity: [],
    localTotal: manifest.length,
    sanityTotal: allSanityRoutes.size,
  };

  // Check local routes
  manifest.forEach(item => {
    if (allSanityRoutes.has(item.route)) {
      results.inBoth.push({
        route: item.route,
        localTitle: item.title,
        sanityTitle: allSanityRoutes.get(item.route).title,
        sanityType: allSanityRoutes.get(item.route).type,
        sourceFile: item.sourceFile,
      });
    } else {
      results.onlyLocal.push({
        route: item.route,
        title: item.title,
        sourceFile: item.sourceFile,
        section: item.section,
      });
    }
  });

  // Check Sanity-only routes
  allSanityRoutes.forEach((data, route) => {
    const localMatch = manifest.find(item => item.route === route);
    if (!localMatch) {
      results.onlySanity.push({
        route,
        title: data.title,
        type: data.type,
      });
    }
  });

  // Generate report
  const report = [];
  
  report.push("# URL Comparison: Local Generator vs Sanity CMS");
  report.push("");
  report.push(`Generated: ${new Date().toISOString()}`);
  report.push("");
  report.push("## Summary");
  report.push("");
  report.push(`- Total Local URLs: ${results.localTotal}`);
  report.push(`- Total Sanity URLs: ${results.sanityTotal}`);
  report.push(`- URLs in Both: ${results.inBoth.length}`);
  report.push(`- Only in Local: ${results.onlyLocal.length}`);
  report.push(`- Only in Sanity: ${results.onlySanity.length}`);
  report.push("");
  
  // URLs in both
  if (results.inBoth.length > 0) {
    report.push("## ✅ URLs in Both Systems");
    report.push("");
    report.push("| Route | Local Title | Sanity Title | Sanity Type | Source File |");
    report.push("|-------|-------------|--------------|-------------|-------------|");
    results.inBoth.forEach(item => {
      report.push(`| ${item.route} | ${item.localTitle} | ${item.sanityTitle} | ${item.sanityType} | ${item.sourceFile} |`);
    });
    report.push("");
  }

  // Only in local
  if (results.onlyLocal.length > 0) {
    report.push("## ⚠️ URLs Only in Local (Not Migrated to Sanity)");
    report.push("");
    report.push("| Route | Title | Section | Source File |");
    report.push("|-------|-------|---------|-------------|");
    results.onlyLocal.forEach(item => {
      report.push(`| ${item.route} | ${item.title} | ${item.section} | ${item.sourceFile} |`);
    });
    report.push("");
  }

  // Only in Sanity
  if (results.onlySanity.length > 0) {
    report.push("## 🆕 URLs Only in Sanity (New Content)");
    report.push("");
    report.push("| Route | Title | Type |");
    report.push("|-------|-------|------|");
    results.onlySanity.forEach(item => {
      report.push(`| ${item.route} | ${item.title} | ${item.type} |`);
    });
    report.push("");
  }

  // Analysis by section
  report.push("## 📈 Analysis by Section");
  report.push("");
  
  const sections = {};
  results.onlyLocal.forEach(item => {
    if (!sections[item.section]) {
      sections[item.section] = { total: 0, routes: [] };
    }
    sections[item.section].total++;
    sections[item.section].routes.push(item.route);
  });

  Object.keys(sections).sort().forEach(section => {
    report.push(`### ${section}`);
    report.push("");
    report.push(`Not migrated: ${sections[section].total} URLs`);
    report.push("");
    sections[section].routes.forEach(route => {
      report.push(`- ${route}`);
    });
    report.push("");
  });

  // Recommendations
  report.push("## 💡 Recommendations");
  report.push("");
  
  if (results.onlyLocal.length > 0) {
    report.push("### URLs to Migrate");
    report.push("");
    report.push("The following local URLs are not yet in Sanity:");
    report.push("");
    
    const byPattern = {
      static: [],
      cityBased: [],
      serviceBased: [],
    };
    
    results.onlyLocal.forEach(item => {
      if (item.sourceFile.includes("[kota]")) {
        byPattern.cityBased.push(item);
      } else if (item.sourceFile.includes("jasa-") || item.sourceFile.includes("cetak-") || item.sourceFile.includes("software/")) {
        byPattern.serviceBased.push(item);
      } else {
        byPattern.static.push(item);
      }
    });

    if (byPattern.static.length > 0) {
      report.push(`1. **Static Pages** (${byPattern.static.length} pages):`);
      report.push("   - Create as regular `page` documents in Sanity");
      report.push("   - Examples: " + byPattern.static.slice(0, 3).map(i => i.route).join(", "));
      report.push("");
    }

    if (byPattern.cityBased.length > 0) {
      report.push(`2. **City-Based Pages** (${byPattern.cityBased.length} pages):`);
      report.push("   - Already have location documents in Sanity");
      report.push("   - Create `pageLocation` documents with pattern `/{category}/{lokasi}`");
      report.push("   - Examples: " + byPattern.cityBased.slice(0, 3).map(i => i.route).join(", "));
      report.push("");
    }

    if (byPattern.serviceBased.length > 0) {
      report.push(`3. **Service Pages** (${byPattern.serviceBased.length} pages):`);
      report.push("   - Create as `page` documents (standalone service info pages)");
      report.push("   - Or create `serviceType` + `serviceLocation` for location-based variants");
      report.push("   - Examples: " + byPattern.serviceBased.slice(0, 3).map(i => i.route).join(", "));
      report.push("");
    }
  }

  if (results.inBoth.length > 0) {
    report.push("### Safe to Remove from Local");
    report.push("");
    report.push(`${results.inBoth.length} URLs are already in Sanity and can be removed from local generator.`);
    report.push("");
  }

  // Write report
  const reportPath = join(__dirname, "../../docs/url-comparison-local-vs-sanity.md");
  writeFileSync(reportPath, report.join("\n"), "utf-8");

  console.log(`✅ Report generated: docs/url-comparison-local-vs-sanity.md`);
  console.log("");
  console.log("Summary:");
  console.log(`  - URLs in both: ${results.inBoth.length}`);
  console.log(`  - Only in local: ${results.onlyLocal.length}`);
  console.log(`  - Only in Sanity: ${results.onlySanity.length}`);
}

main().catch(err => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
