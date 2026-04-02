import { readFileSync } from "node:fs";
import path from "node:path";
import cities from "@/content/astro-local/jasa-cetak-buku-kota/cities.json";

export type JasaCetakBukuCityItem = {
  slug: string;
  citySlug: string;
  city: string;
  sourceId: string;
  title: string;
  excerpt: string;
  coverImage: string;
  status: string;
};

const CITY_ITEMS: JasaCetakBukuCityItem[] = cities as JasaCetakBukuCityItem[];
const CITY_MAP = new Map<string, JasaCetakBukuCityItem>(
  CITY_ITEMS.map((item) => [item.slug, item]),
);

let templateCache: string | null = null;

export function getJasaCetakBukuCityBySlug(slug: string) {
  return CITY_MAP.get(slug) || null;
}

export function getJasaCetakBukuCityStaticParams() {
  return CITY_ITEMS.map((item) => ({ slug: item.slug }));
}

export function getJasaCetakBukuCityTemplate() {
  if (templateCache) return templateCache;

  const templatePath = path.join(
    process.cwd(),
    "content",
    "astro-local",
    "jasa-cetak-buku-kota",
    "template.mdx",
  );

  templateCache = readFileSync(templatePath, "utf8");
  return templateCache;
}

