export type TemplateLane =
  | "website"
  | "software"
  | "printing"
  | "generic";

export type TemplateTrustMode = "safe" | "aggressive";

export type TemplateRouteKind = "base" | "city" | "service" | "service-city";

export type TemplateSourceMode =
  | "page-first"
  | "template-first"
  | "template-only"
  | "page-only"
  | "base-only";

export type TemplateLink = {
  href?: string | null;
};

export type TemplateCtaLink = {
  label?: string | null;
  link?: TemplateLink | null;
};

export type TemplateServiceType = {
  title?: string | null;
  description?: string | null;
  image?: any;
  link?: TemplateLink | null;
};

export type TemplatePricingPlan = {
  name?: string | null;
  price?: string | null;
  description?: string | null;
  items?: string[] | null;
  recommended?: boolean | null;
};

export type TemplateFeature = {
  title?: string | null;
  description?: string | null;
  icon?: string | null;
};

export type TemplateProofItem = {
  title?: string | null;
  description?: string | null;
  image?: any;
  link?: TemplateLink | null;
};

export type TemplateTestimonial = {
  name?: string | null;
  role?: string | null;
  quote?: string | null;
};

export type TemplateLongGuide = {
  title?: string | null;
  description?: string | null;
};

export type TemplateContentVariant = {
  slot?:
    | "heroEyebrow"
    | "primaryKeyword"
    | "intro"
    | "description"
    | "ctaLabel"
    | "finalCtaTitle"
    | "finalCtaDescription"
    | null;
  text?: string | null;
  lane?: TemplateLane | null;
  intent?: "awareness" | "commercial" | "decision" | null;
  strength?: TemplateTrustMode | null;
  requiresLocation?: boolean | null;
  requiresService?: boolean | null;
  routeKinds?: TemplateRouteKind[] | null;
  disallowedContexts?: string[] | null;
};

export type TemplateSourcePolicy = {
  pricingSource?: TemplateSourceMode | null;
  proofSource?: TemplateSourceMode | null;
  testimonialSource?: TemplateSourceMode | null;
  maxQuickLinks?: number | null;
};

export type TemplateFaq = {
  question?: string | null;
  answer?: string | null;
};

export type TemplateStructured = {
  primaryKeyword?: string | null;
  secondaryKeywords?: string[] | null;
  description?: string | null;
  intro?: string | null;
  highlights?: string[] | null;
  eeatPoints?: Array<{ title?: string | null; description?: string | null }> | null;
  process?: string[] | null;
  faqs?: TemplateFaq[] | null;
  ctaLabel?: string | null;
  ctaLink?: TemplateLink | null;
  ctaLinks?: TemplateCtaLink[] | null;
  serviceTypes?: TemplateServiceType[] | null;
  pricingPlans?: TemplatePricingPlan[] | null;
  features?: TemplateFeature[] | null;
  proofItems?: TemplateProofItem[] | null;
  testimonials?: TemplateTestimonial[] | null;
  longGuide?: TemplateLongGuide[] | null;
  finalCtaTitle?: string | null;
  finalCtaDescription?: string | null;
  contentVariants?: TemplateContentVariant[] | null;
};

export type TemplateMeta = {
  title?: string | null;
  description?: string | null;
  canonicalUrl?: string | null;
  focusKeyword?: string | null;
  secondaryKeywords?: string[] | null;
  noindex?: boolean | null;
  image?: any;
};

export type TemplateDoc = {
  _id?: string;
  title?: string | null;
  slug?: { current?: string | null } | null;
  variant?: string | null;
  lane?: TemplateLane | null;
  trustMode?: TemplateTrustMode | null;
  sourcePolicy?: TemplateSourcePolicy | null;
  isHybrid?: boolean | null;
  shellId?: string | null;
  topBlockCountDefault?: number | null;
  heroEyebrow?: string | null;
  heroImage?: any;
  structured?: TemplateStructured | null;
  blocks?: any[] | null;
  metaDefaults?: TemplateMeta | null;
};

export type TemplatePageDoc = {
  _id?: string;
  _type?: string;
  title?: string | null;
  route?: string | null;
  routePattern?: string | null;
  slug?: { current?: string | null } | null;
  heroEyebrow?: string | null;
  heroImage?: any;
  topBlockCount?: number | null;
  contentStatus?: string | null;
  structured?: TemplateStructured | null;
  blocks?: any[] | null;
  meta?: TemplateMeta | null;
  template?: TemplateDoc | null;
  service?: {
    title?: string | null;
    slug?: { current?: string | null } | null;
  } | null;
  serviceType?: {
    title?: string | null;
    slug?: { current?: string | null } | null;
    category?: string | null;
    description?: string | null;
  } | null;
  location?: {
    title?: string | null;
    slug?: { current?: string | null } | null;
    overview?: string | null;
    highlights?: string[] | null;
  } | null;
};
