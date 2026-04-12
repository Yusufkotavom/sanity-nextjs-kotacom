import { loadSanityEnv, createSanityReadClient } from "./lib/sanity-page-guards.mjs";
import { writeFileSync } from "fs";

async function main() {
  await loadSanityEnv();
  const client = await createSanityReadClient();
  const docs = await client.fetch(`*[_type == "pageTemplate"]{
    _id, title, slug, variant, lane, trustMode, sourcePolicy, isHybrid, shellId,
    structured {
      primaryKeyword, secondaryKeywords, description, intro,
      highlights, eeatPoints, process, faqs, ctaLabel, ctaLinks,
      serviceTypes, pricingPlans, features, proofItems, testimonials,
      longGuide, finalCtaTitle, finalCtaDescription, contentVariants
    }
  }`);
  writeFileSync("/tmp/templates.json", JSON.stringify(docs, null, 2));
  console.log(`Found ${docs.length} templates`);
  docs.forEach(d => console.log(`  - ${d._id}  slug=${d.slug?.current}  lane=${d.lane || "-"}  variant=${d.variant}`));
}

main().catch(console.error);
