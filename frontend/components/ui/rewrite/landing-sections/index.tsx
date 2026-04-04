import type { LegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";
import {
  BASE_TOC,
  DEFAULT_TESTIMONIALS,
  getDefaultFeatures,
  getDefaultPricingPlans,
  getDefaultProofItems,
  getDefaultServiceTypes,
} from "./defaults";
import { UtilityStrip } from "./utility-strip";
import { ServiceTypesSection } from "./service-types-section";
import { PricingPlansSection } from "./pricing-plans-section";
import { FeaturesSection } from "./features-section";
import { ProofSection } from "./proof-section";
import { TestimonialsSection } from "./testimonials-section";
import { LongGuideSection } from "./long-guide-section";
import { FinalCtaSection } from "./final-cta-section";
import type { RewriteLandingSectionsProps, TocItem } from "./types";

function buildTocItems(copy: LegacyRewriteCopy): TocItem[] {
  const tocItems = [...BASE_TOC];
  if (copy.ctaLinks?.length) {
    tocItems.push({ id: "cta-quick", label: "Aksi Cepat" });
  }
  if (copy.longGuide?.length) {
    tocItems.push({ id: "panduan", label: "Panduan Lengkap" });
  }
  return tocItems;
}

export default function RewriteLandingSections({
  page,
  copy,
}: RewriteLandingSectionsProps) {
  const tocItems = buildTocItems(copy);
  const serviceTypes = copy.serviceTypes || getDefaultServiceTypes(page);
  const pricingPlans = copy.pricingPlans || getDefaultPricingPlans(page);
  const features = copy.features || getDefaultFeatures(page);
  const proofItems = copy.proofItems || getDefaultProofItems(page);
  const testimonials = copy.testimonials || DEFAULT_TESTIMONIALS;

  return (
    <>
      <UtilityStrip tocItems={tocItems} ctaLinks={copy.ctaLinks} />
      <ServiceTypesSection serviceTypes={serviceTypes} />
      <PricingPlansSection pricingPlans={pricingPlans} serviceTitle={page.title} />
      <FeaturesSection features={features} />
      <ProofSection proofItems={proofItems} />
      <TestimonialsSection testimonials={testimonials} />
      {copy.longGuide?.length ? (
        <LongGuideSection title={page.title} longGuide={copy.longGuide} />
      ) : null}
      <FinalCtaSection copy={copy} />
    </>
  );
}
