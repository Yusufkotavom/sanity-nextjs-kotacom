import type { LegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";
import type { PageBlock } from "@/sanity/lib/fetch";

export type LegacyPageMetaOverride = {
  title?: string | null;
  description?: string | null;
  canonicalUrl?: string | null;
  focusKeyword?: string | null;
  secondaryKeywords?: string[] | null;
  noindex?: boolean | null;
  image?: any;
} | null;

export type LegacyPageHeroOverride = {
  title?: string | null;
  subtitle?: string | null;
  eyebrow?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  secondaryKeywords?: string[] | null;
  image?: any;
} | null;

export type LegacyPageOverride = {
  route: string;
  templateVariant?: string | null;
  heroOverride?: LegacyPageHeroOverride;
  highlightsOverride?: string[] | null;
  faqOverride?: Array<{ question?: string | null; answer?: string | null }> | null;
  sectionOrder?: string[] | null;
  customBlocks?: PageBlock[] | null;
  meta?: LegacyPageMetaOverride;
} | null;

export const DEFAULT_SECTION_ORDER = [
  "landing",
  "micro-badges",
  "highlights",
  "custom-blocks",
  "process-faq",
  "related-links",
];

export const VARIANT_SECTION_ORDERS: Record<string, string[]> = {
  narrative: [
    "landing",
    "custom-blocks",
    "highlights",
    "process-faq",
    "related-links",
    "micro-badges",
  ],
  "case-study": [
    "landing",
    "highlights",
    "custom-blocks",
    "process-faq",
    "related-links",
    "micro-badges",
  ],
  "faq-heavy": [
    "process-faq",
    "landing",
    "highlights",
    "custom-blocks",
    "related-links",
    "micro-badges",
  ],
};

export function applyLegacyCopyOverrides(
  copy: LegacyRewriteCopy,
  override: LegacyPageOverride,
): LegacyRewriteCopy {
  if (!override) return copy;

  const hero = override.heroOverride;

  return {
    ...copy,
    primaryKeyword: hero?.title || copy.primaryKeyword,
    intro: hero?.subtitle || copy.intro,
    ctaLabel: hero?.ctaLabel || copy.ctaLabel,
    ctaHref: hero?.ctaHref || copy.ctaHref,
    secondaryKeywords:
      hero?.secondaryKeywords?.filter(Boolean) || copy.secondaryKeywords,
    highlights: override.highlightsOverride || copy.highlights,
    faqs:
      override.faqOverride
        ?.filter((item) => item?.question && item?.answer)
        .map((item) => ({
          question: item?.question || "",
          answer: item?.answer || "",
        })) || copy.faqs,
  };
}

export function resolveSectionOrder(
  override: LegacyPageOverride,
  fallbackOrder: string[],
): string[] {
  const variantOrder = override?.templateVariant
    ? VARIANT_SECTION_ORDERS[override.templateVariant] || null
    : null;
  const requestedOrder =
    override?.sectionOrder && override.sectionOrder.length > 0
      ? override.sectionOrder
      : variantOrder;

  return requestedOrder && requestedOrder.length > 0 ? requestedOrder : fallbackOrder;
}
