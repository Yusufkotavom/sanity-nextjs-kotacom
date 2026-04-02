import { promises as fs } from "node:fs";
import path from "node:path";

export type JsonUsahaMetric = {
  value: string;
  label: string;
};

export type JsonUsahaItem = {
  title: string;
  description?: string;
  href?: string;
  features?: string[];
  badge?: string;
  price?: string;
};

export type JsonUsahaFaq = {
  question: string;
  answer: string;
};

export type JsonUsahaTestimonial = {
  name: string;
  role?: string;
  quote: string;
};

export type JsonUsahaPage = {
  slug: string;
  sourceFile: string;
  title: string;
  description: string;
  badge?: string;
  heroImage?: string;
  businessType?: string;
  businessAddress?: string;
  businessPhone?: string;
  heroCta?: {
    label: string;
    href: string;
  } | null;
  metrics: JsonUsahaMetric[];
  features: JsonUsahaItem[];
  services: JsonUsahaItem[];
  reasons: JsonUsahaItem[];
  deliverables: JsonUsahaItem[];
  pricing: JsonUsahaItem[];
  testimonials: JsonUsahaTestimonial[];
  faqs: JsonUsahaFaq[];
  contentSections: { title?: string; body: string }[];
  finalCta?: {
    title: string;
    description?: string;
    primaryLabel?: string;
    primaryHref?: string;
    secondaryLabel?: string;
    secondaryHref?: string;
  } | null;
};

const ROOT = path.join(
  process.cwd(),
  "content",
  "astro-local",
  "json-usaha",
);

function slugify(input: string) {
  return input
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/-+/g, "-");
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function asObject(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeMetric(item: unknown): JsonUsahaMetric | null {
  const source = asObject(item);
  const value = asString(source.point || source.number || source.value);
  const label = asString(
    source.description || source.label || source.title || source.name,
  );
  if (!value || !label) return null;
  return { value, label };
}

function normalizeItem(item: unknown): JsonUsahaItem | null {
  const source = asObject(item);
  const title = asString(source.title || source.name);
  const description = asString(source.description);
  const href = asString(
    source.link ||
      source.url ||
      asObject(source.cta).url ||
      asObject(source.link).url,
  );
  const badge = asString(source.badge);
  const price = asString(source.price);
  const features = asArray<unknown>(source.feature || source.features || source.benefits)
    .map((entry) => asString(entry))
    .filter(Boolean);

  if (!title && !description) return null;
  return {
    title: title || description,
    description: description || undefined,
    href: href || undefined,
    features: features.length ? features : undefined,
    badge: badge || undefined,
    price: price || undefined,
  };
}

function normalizeFaq(item: unknown): JsonUsahaFaq | null {
  const source = asObject(item);
  const question = asString(source.question || source.title);
  const answer = asString(source.answer || source.description);
  if (!question || !answer) return null;
  return { question, answer };
}

function normalizeTestimonial(item: unknown): JsonUsahaTestimonial | null {
  const source = asObject(item);
  const quote = asString(
    source.quote || source.description || source.content || source.testimonial,
  );
  const name = asString(source.name || source.title || source.client);
  const role = asString(source.role || source.position || source.company);
  if (!quote) return null;
  return {
    name: name || "Client",
    role: role || undefined,
    quote,
  };
}

function normalizeContentSections(data: Record<string, unknown>) {
  const content = asObject(data.content);
  const sections = asArray<unknown>(content.sections || content.content)
    .map((item) => {
      if (typeof item === "string") {
        const body = item.trim();
        return body ? { body } : null;
      }
      const source = asObject(item);
      const title = asString(source.title);
      const body = asString(source.description || source.content || source.body);
      if (!title && !body) return null;
      return {
        title: title || undefined,
        body: body || title,
      };
    })
    .filter(Boolean) as { title?: string; body: string }[];

  const fallback = [
    asString(content.description),
    asString(asObject(data.local).description),
    asString(asObject(data.business).description),
  ]
    .filter(Boolean)
    .map((body) => ({ body }));

  return sections.length ? sections : fallback;
}

function normalizeJsonUsaha(data: Record<string, unknown>, sourceFile: string): JsonUsahaPage {
  const fileBase = path.basename(sourceFile, ".json");
  const slug = slugify(fileBase);
  const hero = asObject(data.hero);
  const business = asObject(data.business);
  const features = asObject(data.features);
  const services = asObject(data.services);
  const whyUs = asObject(data.why_us);
  const whatYouGet = asObject(data.what_you_get);
  const pricing = asObject(data.pricing);
  const testimonials = asObject(data.testimonials);
  const faq = asObject(data.faq);
  const finalCta = asObject(data.final_cta);

  const title = asString(hero.title) || slug;
  const description =
    asString(hero.subtitle) ||
    asString(business.description) ||
    asString(asObject(data.content).subtitle) ||
    "Layanan bisnis code-driven dari source JSON Astro.";

  return {
    slug,
    sourceFile,
    title,
    description,
    badge: asString(hero.badge_text || features.badge_text) || undefined,
    heroImage: asString(hero.image_url || hero.background_image) || undefined,
    businessType: asString(business.type) || undefined,
    businessAddress: asString(business.address) || undefined,
    businessPhone: asString(business.phone) || undefined,
    heroCta: (() => {
      const label =
        asString(hero.cta_text) || asString(finalCta.primary_cta && asObject(finalCta.primary_cta).text);
      const href =
        asString(hero.cta_url) || asString(finalCta.primary_cta && asObject(finalCta.primary_cta).url) || "/contact";
      return label ? { label, href } : null;
    })(),
    metrics: [
      ...asArray<unknown>(hero.feature).map(normalizeMetric),
      ...asArray<unknown>(asObject(data.stats).stats).map(normalizeMetric),
    ].filter(Boolean) as JsonUsahaMetric[],
    features: asArray<unknown>(features.point || features.items)
      .map(normalizeItem)
      .filter(Boolean) as JsonUsahaItem[],
    services: asArray<unknown>(services.point || services.services)
      .map(normalizeItem)
      .filter(Boolean) as JsonUsahaItem[],
    reasons: asArray<unknown>(whyUs.point || whyUs.reasons)
      .map(normalizeItem)
      .filter(Boolean) as JsonUsahaItem[],
    deliverables: asArray<unknown>(whatYouGet.points)
      .map(normalizeItem)
      .filter(Boolean) as JsonUsahaItem[],
    pricing: asArray<unknown>(pricing.plan || pricing.plans)
      .map(normalizeItem)
      .filter(Boolean) as JsonUsahaItem[],
    testimonials: asArray<unknown>(testimonials.card || testimonials.testimonials)
      .map(normalizeTestimonial)
      .filter(Boolean) as JsonUsahaTestimonial[],
    faqs: asArray<unknown>(faq.points || faq.questions)
      .map(normalizeFaq)
      .filter(Boolean) as JsonUsahaFaq[],
    contentSections: normalizeContentSections(data),
    finalCta: (() => {
      const ctaTitle = asString(finalCta.title) || asString(hero.title);
      const ctaDescription =
        asString(finalCta.description || finalCta.subtitle) || description;
      const primary = asObject(finalCta.primary_cta);
      const secondary = asObject(finalCta.secondary_cta);
      return ctaTitle
        ? {
            title: ctaTitle,
            description: ctaDescription || undefined,
            primaryLabel:
              asString(primary.text) || asString(hero.cta_text) || "Hubungi Tim",
            primaryHref:
              asString(primary.url) || asString(hero.cta_url) || "/contact",
            secondaryLabel: asString(secondary.text) || undefined,
            secondaryHref: asString(secondary.url) || undefined,
          }
        : null;
    })(),
  };
}

async function readAllJsonUsahaFiles() {
  const entries = await fs.readdir(ROOT, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => entry.name)
    .sort();

  const pages = await Promise.all(
    files.map(async (fileName) => {
      const raw = await fs.readFile(path.join(ROOT, fileName), "utf8");
      const data = JSON.parse(raw) as Record<string, unknown>;
      return normalizeJsonUsaha(data, fileName);
    }),
  );

  return pages.sort((a, b) => a.slug.localeCompare(b.slug));
}

export async function getJsonUsahaPages() {
  return readAllJsonUsahaFiles();
}

export async function getJsonUsahaPageBySlug(slug: string) {
  const pages = await readAllJsonUsahaFiles();
  return pages.find((page) => page.slug === slug) || null;
}

export async function getJsonUsahaStaticParams() {
  const pages = await readAllJsonUsahaFiles();
  return pages.map((page) => ({ slug: page.slug }));
}
