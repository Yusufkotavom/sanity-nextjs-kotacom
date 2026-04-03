export type LegacyRewriteCopy = {
  primaryKeyword: string;
  secondaryKeywords: string[];
  description: string;
  intro: string;
  highlights: string[];
  process: string[];
  faqs: Array<{ question: string; answer: string }>;
  ctaLabel: string;
  ctaHref: string;
  ctaLinks?: Array<{ label: string; href: string }>;
  serviceTypes?: Array<{ title: string; description: string; href?: string; image?: string }>;
  pricingPlans?: Array<{
    name: string;
    price: string;
    description: string;
    items: string[];
    recommended?: boolean;
  }>;
  features?: Array<{ title: string; description: string; icon?: string }>;
  proofItems?: Array<{ title: string; description: string; image?: string; href?: string }>;
  testimonials?: Array<{ name: string; role: string; quote: string }>;
  longGuide?: Array<{ title: string; description: string }>;
  finalCtaTitle?: string;
  finalCtaDescription?: string;
};
