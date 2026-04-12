import type { LegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";
import { urlFor } from "@/sanity/lib/image";
import type {
  TemplateCtaLink,
  TemplateLink,
  TemplateMeta,
  TemplatePageDoc,
  TemplateStructured,
} from "@/types/template";

const pickString = (value: string | null | undefined, fallback: string) => {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed.length > 0 ? value : fallback;
};

const applyLocationTokens = (value: string, locationName?: string | null) => {
  if (!locationName) return value;
  return value.replace(/\{(lokasi|location|city)\}/gi, locationName);
};

const applyLocationTokensArray = (
  items: string[],
  locationName?: string | null,
) => items.map((item) => applyLocationTokens(item, locationName));

const applyLocationEeatPoints = (
  items: Array<{ title?: string | null; description?: string | null }>,
  locationName?: string | null,
) =>
  items
    .map((item) => ({
      title: applyLocationTokens(item.title || "", locationName),
      description: applyLocationTokens(item.description || "", locationName),
    }))
    .filter((item) => item.title && item.description);

const pickArray = <T>(
  value: T[] | null | undefined,
  fallback: T[],
): T[] => {
  if (Array.isArray(value) && value.length > 0) return value;
  return fallback;
};

const resolveImageUrl = (image?: any) => {
  if (!image || !image.asset) return undefined;
  try {
    return urlFor(image).width(1600).url();
  } catch {
    return undefined;
  }
};

const resolveLinkHref = (link?: TemplateLink | null) => {
  if (!link) return undefined;
  return link.href || undefined;
};

const resolveCtaLinks = (
  items: TemplateCtaLink[] | null | undefined,
  fallback: LegacyRewriteCopy["ctaLinks"],
) => {
  if (!items || items.length === 0) return fallback;
  const resolved = items
    .map((item) => {
      const href = resolveLinkHref(item.link || undefined);
      if (!item.label || !href) return null;
      return { label: item.label, href };
    })
    .filter(Boolean) as Array<{ label: string; href: string }>;
  return resolved.length > 0 ? resolved : fallback;
};

export const resolveTemplateCopy = ({
  base,
  template,
  override,
  locationName,
}: {
  base: LegacyRewriteCopy;
  template?: TemplateStructured | null;
  override?: TemplateStructured | null;
  locationName?: string | null;
}): LegacyRewriteCopy => {
  let primaryKeyword = pickString(
    override?.primaryKeyword ?? template?.primaryKeyword,
    base.primaryKeyword,
  );
  if (
    locationName &&
    !primaryKeyword.toLowerCase().includes(locationName.toLowerCase())
  ) {
    primaryKeyword = `${primaryKeyword} ${locationName}`;
  }
  primaryKeyword = applyLocationTokens(primaryKeyword, locationName);
  const secondaryKeywords = pickArray(
    override?.secondaryKeywords ?? template?.secondaryKeywords,
    base.secondaryKeywords,
  );
  const locationKeyword =
    locationName && !secondaryKeywords.some((item) =>
      item.toLowerCase().includes(locationName.toLowerCase()),
    )
      ? [...secondaryKeywords, `${primaryKeyword} ${locationName}`]
      : secondaryKeywords;
  const description = applyLocationTokens(
    pickString(override?.description ?? template?.description, base.description),
    locationName,
  );
  const intro = applyLocationTokens(
    pickString(override?.intro ?? template?.intro, base.intro),
    locationName,
  );
  const highlights = applyLocationTokensArray(
    pickArray(override?.highlights ?? template?.highlights, base.highlights),
    locationName,
  );
  const eeatPoints = applyLocationEeatPoints(
    pickArray(override?.eeatPoints ?? template?.eeatPoints, []),
    locationName,
  );
  const process = applyLocationTokensArray(
    pickArray(override?.process ?? template?.process, base.process),
    locationName,
  );
  const faqs = pickArray(override?.faqs ?? template?.faqs, base.faqs)
    .map((item) => ({
      question: applyLocationTokens(pickString(item.question, ""), locationName),
      answer: applyLocationTokens(pickString(item.answer, ""), locationName),
    }))
    .filter((item) => item.question && item.answer);

  const ctaLabel = applyLocationTokens(
    pickString(override?.ctaLabel ?? template?.ctaLabel, base.ctaLabel),
    locationName,
  );
  const ctaHref =
    resolveLinkHref(override?.ctaLink) ||
    resolveLinkHref(template?.ctaLink) ||
    base.ctaHref;

  const ctaLinks = resolveCtaLinks(
    override?.ctaLinks ?? template?.ctaLinks,
    base.ctaLinks,
  )?.map((item) => ({
    ...item,
    label: applyLocationTokens(item.label, locationName),
  }));

  const serviceTypes = pickArray(
    override?.serviceTypes ?? template?.serviceTypes,
    base.serviceTypes || [],
  )
    .map((item) => ({
      title: applyLocationTokens(pickString(item.title ?? "", ""), locationName),
      description: applyLocationTokens(
        pickString(item.description ?? "", ""),
        locationName,
      ),
      image: resolveImageUrl(item.image),
      href: resolveLinkHref(item.link),
    }))
    .filter((item) => item.title && item.description);

  const pricingPlans = pickArray(
    override?.pricingPlans ?? template?.pricingPlans,
    base.pricingPlans || [],
  )
    .map((item) => ({
      name: applyLocationTokens(pickString(item.name ?? "", ""), locationName),
      price: pickString(item.price ?? "", ""),
      description: applyLocationTokens(
        pickString(item.description ?? "", ""),
        locationName,
      ),
      items: applyLocationTokensArray(
        pickArray(item.items || [], []),
        locationName,
      ),
      recommended: Boolean(item.recommended),
    }))
    .filter((item) => item.name && item.price);

  const features = pickArray(
    override?.features ?? template?.features,
    base.features || [],
  )
    .map((item) => ({
      title: applyLocationTokens(pickString(item.title ?? "", ""), locationName),
      description: applyLocationTokens(
        pickString(item.description ?? "", ""),
        locationName,
      ),
      icon: item.icon || undefined,
    }))
    .filter((item) => item.title && item.description);

  const proofItems = pickArray(
    override?.proofItems ?? template?.proofItems,
    base.proofItems || [],
  )
    .map((item) => ({
      title: applyLocationTokens(pickString(item.title ?? "", ""), locationName),
      description: applyLocationTokens(
        pickString(item.description ?? "", ""),
        locationName,
      ),
      image: resolveImageUrl(item.image),
      href: resolveLinkHref(item.link),
    }))
    .filter((item) => item.title && item.description);

  const testimonials = pickArray(
    override?.testimonials ?? template?.testimonials,
    base.testimonials || [],
  )
    .map((item) => ({
      name: applyLocationTokens(pickString(item.name ?? "", ""), locationName),
      role: applyLocationTokens(pickString(item.role ?? "", ""), locationName),
      quote: applyLocationTokens(pickString(item.quote ?? "", ""), locationName),
    }))
    .filter((item) => item.name && item.quote);

  const longGuide = pickArray(
    override?.longGuide ?? template?.longGuide,
    base.longGuide || [],
  )
    .map((item) => ({
      title: applyLocationTokens(pickString(item.title ?? "", ""), locationName),
      description: applyLocationTokens(
        pickString(item.description ?? "", ""),
        locationName,
      ),
    }))
    .filter((item) => item.title && item.description);

  return {
    primaryKeyword,
    secondaryKeywords: locationKeyword,
    description,
    intro,
    highlights,
    eeatPoints,
    process,
    faqs,
    ctaLabel,
    ctaHref,
    ctaLinks,
    serviceTypes: serviceTypes.length > 0 ? serviceTypes : base.serviceTypes,
    pricingPlans: pricingPlans.length > 0 ? pricingPlans : base.pricingPlans,
    features: features.length > 0 ? features : base.features,
    proofItems: proofItems.length > 0 ? proofItems : base.proofItems,
    testimonials: testimonials.length > 0 ? testimonials : base.testimonials,
    longGuide: longGuide.length > 0 ? longGuide : base.longGuide,
    finalCtaTitle: applyLocationTokens(
      pickString(
        override?.finalCtaTitle ?? template?.finalCtaTitle,
        base.finalCtaTitle || "",
      ),
      locationName,
    ),
    finalCtaDescription: applyLocationTokens(
      pickString(
        override?.finalCtaDescription ?? template?.finalCtaDescription,
        base.finalCtaDescription || "",
      ),
      locationName,
    ),
  };
};

export const resolveTemplateMeta = ({
  page,
  template,
}: {
  page?: TemplateMeta | null;
  template?: TemplateMeta | null;
}): TemplateMeta | null => {
  const pageHasMeta =
    Boolean(page?.title) ||
    Boolean(page?.description) ||
    Boolean(page?.canonicalUrl) ||
    Boolean(page?.focusKeyword) ||
    Boolean(page?.secondaryKeywords?.length) ||
    typeof page?.noindex === "boolean" ||
    Boolean(page?.image);
  const templateHasMeta =
    Boolean(template?.title) ||
    Boolean(template?.description) ||
    Boolean(template?.canonicalUrl) ||
    Boolean(template?.focusKeyword) ||
    Boolean(template?.secondaryKeywords?.length) ||
    typeof template?.noindex === "boolean" ||
    Boolean(template?.image);
  if (pageHasMeta) return page || null;
  if (templateHasMeta) return template || null;
  return page || template || null;
};

export const resolveTemplateBlocks = ({
  page,
  template,
}: {
  page?: TemplatePageDoc | null;
  template?: TemplatePageDoc["template"] | null;
}) => {
  const pageBlocks = page?.blocks || [];
  if (pageBlocks.length > 0) return pageBlocks;
  return template?.blocks || [];
};

export const resolveTemplateHero = ({
  page,
  template,
}: {
  page?: TemplatePageDoc | null;
  template?: TemplatePageDoc["template"] | null;
}) => ({
  eyebrow: page?.heroEyebrow || template?.heroEyebrow || undefined,
  image: page?.heroImage || template?.heroImage || undefined,
});

export const resolveTopBlockCount = ({
  page,
  template,
}: {
  page?: TemplatePageDoc | null;
  template?: TemplatePageDoc["template"] | null;
}) => {
  if (typeof page?.topBlockCount === "number") return page.topBlockCount;
  if (typeof template?.topBlockCountDefault === "number") {
    return template.topBlockCountDefault;
  }
  return 0;
};
