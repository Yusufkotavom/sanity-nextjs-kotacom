import Link from "next/link";
import docsIndex from "@/content/schemaui-docs.json";
import { getAstroLocalCatalog } from "@/lib/local-content/astro-catalog";
import {
  getJasaCetakBukuCityBySlugOrFallback,
  getJasaCetakBukuCityStaticParams,
} from "@/lib/local-content/jasa-cetak-buku-kota";
import {
  getLegacyRoutesByPrefix,
  getLegacySectionIndex,
  getLegacySections,
} from "@/lib/legacy-pages/astro-static";
import { generateBasicMetadata } from "@/sanity/lib/metadata";
import {
  fetchSanityBlogCategories,
  fetchSanityPages,
  fetchSanityPosts,
  fetchSanityProductCategories,
  fetchSanityProducts,
  fetchSanityProjects,
  fetchSanityServiceCategories,
  fetchSanityServices,
} from "@/sanity/lib/fetch";
import { unstable_noStore as noStore } from "next/cache";

type TocLink = {
  title: string;
  href: string;
};

type TocSection = {
  title: string;
  links: TocLink[];
};

function titleCaseFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function dedupeLinksPreserveOrder(links: TocLink[]) {
  const seen = new Set<string>();
  const output: TocLink[] = [];

  for (const link of links) {
    if (!link.href || seen.has(link.href)) continue;
    seen.add(link.href);
    output.push(link);
  }

  return output;
}

function dedupeLinksSorted(links: TocLink[]) {
  const seen = new Set<string>();
  const output: TocLink[] = [];

  for (const link of links) {
    if (!link.href || seen.has(link.href)) continue;
    seen.add(link.href);
    output.push(link);
  }

  return output.sort((a, b) => a.href.localeCompare(b.href));
}

function buildLegacySectionLinks(section: string): TocLink[] {
  const items = getLegacyRoutesByPrefix(`/${section}`);
  const index = items.find((item) => item.route === `/${section}`);
  const children = items
    .filter((item) => item.route !== `/${section}`)
    .sort((a, b) => a.route.localeCompare(b.route));

  return dedupeLinksPreserveOrder([
    ...(index ? [{ title: index.title, href: index.route }] : []),
    ...children.map((item) => ({
      title: item.title,
      href: item.route,
    })),
  ]);
}

function buildSanityLinks(
  items: Array<{ title?: string | null; slug?: { current?: string | null } | null }>,
  basePath: string,
) {
  return dedupeLinksSorted(
    items
      .map((item) => {
        const slug = item?.slug?.current;
        if (!slug) return null;
        const title = item?.title || titleCaseFromSlug(slug);
        return { title, href: `${basePath}/${slug}` };
      })
      .filter(Boolean) as TocLink[],
  );
}

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateBasicMetadata({
    title: "Table of Contents",
    description:
      "Daftar konten situs dari sumber lokal di dalam repository.",
    slug: "toc",
  });
}

export default async function TocPage() {
  noStore();

  const [
    astroLocalItems,
    sanityPages,
    sanityPosts,
    sanityServices,
    sanityProducts,
    sanityProjects,
    sanityBlogCategories,
    sanityProductCategories,
    sanityServiceCategories,
  ] = await Promise.all([
    getAstroLocalCatalog(),
    fetchSanityPages(),
    fetchSanityPosts(),
    fetchSanityServices(),
    fetchSanityProducts(),
    fetchSanityProjects(),
    fetchSanityBlogCategories(),
    fetchSanityProductCategories(),
    fetchSanityServiceCategories(),
  ]);

  const astroByType = astroLocalItems.reduce<Record<string, TocLink[]>>(
    (acc, item) => {
      const key = item.type;
      if (!acc[key]) acc[key] = [];
      acc[key].push({ title: item.title, href: item.href });
      return acc;
    },
    {},
  );

  const localDocsLinks = dedupeLinksSorted(
    (docsIndex.pages as Array<{ pathname: string; title: string }>).map((item) => ({
      title: item.title,
      href: item.pathname,
    })),
  );

  const staticCoreLinks = dedupeLinksSorted([
    { title: "Home", href: "/" },
    { title: "Blog", href: "/blog" },
    { title: "Services", href: "/services" },
    { title: "Products", href: "/products" },
    { title: "Projects", href: "/projects" },
    { title: "Docs", href: "/docs" },
    { title: "TOC", href: "/toc" },
  ]);

  const legacySections = getLegacySections();
  const preferredLegacyOrder = [
    "pembuatan-website",
    "percetakan",
    "software",
    "sistem-pos",
    "about",
    "contact",
    "privacy",
  ];
  const orderedLegacySections = [
    ...preferredLegacyOrder.filter((section) => legacySections.includes(section)),
    ...legacySections.filter((section) => !preferredLegacyOrder.includes(section)),
  ].filter((section) => section !== "layanan");

  const legacySectionGroups: TocSection[] = orderedLegacySections.map((section) => {
    const index = getLegacySectionIndex(section);
    return {
      title: index?.title || titleCaseFromSlug(section),
      links: buildLegacySectionLinks(section),
    };
  });

  const sanityPageLinks = dedupeLinksSorted(
    sanityPages
      .map((page) => {
        const slug = page?.slug?.current;
        if (!slug) return null;
        return {
          title: page?.title || titleCaseFromSlug(slug),
          href: `/${slug}`,
        };
      })
      .filter(Boolean) as TocLink[],
  );

  const sanityPostLinks = buildSanityLinks(sanityPosts as any[], "/blog");
  const sanityServiceLinks = buildSanityLinks(sanityServices as any[], "/services");
  const sanityProductLinks = buildSanityLinks(sanityProducts as any[], "/products");
  const sanityProjectLinks = buildSanityLinks(sanityProjects as any[], "/projects");
  const sanityBlogCategoryLinks = dedupeLinksSorted(
    sanityBlogCategories
      .map((category) => {
        const slug = category?.slug?.current;
        if (!slug) return null;
        return {
          title: category?.title || titleCaseFromSlug(slug),
          href: `/blog/category/${slug}`,
        };
      })
      .filter(Boolean) as TocLink[],
  );
  const sanityProductCategoryLinks = dedupeLinksSorted(
    sanityProductCategories
      .map((category) => {
        const slug = category?.slug?.current;
        if (!slug) return null;
        return {
          title: category?.title || titleCaseFromSlug(slug),
          href: `/products/${slug}`,
        };
      })
      .filter(Boolean) as TocLink[],
  );
  const sanityServiceCategoryLinks = dedupeLinksSorted(
    sanityServiceCategories
      .map((category) => {
        const slug = category?.slug?.current;
        if (!slug) return null;
        return {
          title: category?.title || titleCaseFromSlug(slug),
          href: `/services/${slug}`,
        };
      })
      .filter(Boolean) as TocLink[],
  );

  const jasaCetakBukuCityLinks = dedupeLinksSorted(
    getJasaCetakBukuCityStaticParams()
      .map((item) => {
        const detail = getJasaCetakBukuCityBySlugOrFallback(item.slug);
        if (!detail) return null;
        return {
          title: detail.title || titleCaseFromSlug(detail.slug),
          href: `/${detail.slug}`,
        };
      })
      .filter(Boolean) as TocLink[],
  );

  const sections: TocSection[] = [
    { title: "Core Static", links: staticCoreLinks },
    ...legacySectionGroups,
    { title: "Generated Jasa Cetak Buku Kota", links: jasaCetakBukuCityLinks },
    { title: "Sanity Pages", links: sanityPageLinks },
    { title: "Sanity Posts", links: sanityPostLinks },
    { title: "Sanity Services", links: sanityServiceLinks },
    { title: "Sanity Products", links: sanityProductLinks },
    { title: "Sanity Projects", links: sanityProjectLinks },
    { title: "Sanity Blog Categories", links: sanityBlogCategoryLinks },
    { title: "Sanity Product Categories", links: sanityProductCategoryLinks },
    { title: "Sanity Service Categories", links: sanityServiceCategoryLinks },
    { title: "Local Astro Posts", links: dedupeLinksSorted(astroByType.post || []) },
    { title: "Local Astro Services", links: dedupeLinksSorted(astroByType.service || []) },
    { title: "Local Astro Products", links: dedupeLinksSorted(astroByType.product || []) },
    { title: "Local Astro Projects", links: dedupeLinksSorted(astroByType.project || []) },
    { title: "Local Docs Index", links: localDocsLinks },
  ];

  return (
    <main className="container py-12">
      <header className="mb-8">
        <p className="text-ui-label text-foreground/70">Table of Contents</p>
        <h1 className="mt-2 text-display-lg">All Content Sources</h1>
        <p className="mt-3 max-w-3xl text-ui-body text-muted-foreground">
          Halaman ini menggabungkan konten lokal di dalam repository agar Anda
          bisa melihat coverage URL dalam satu tempat.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {sections.map((section) => (
          <section key={section.title} className="rounded-xl border bg-card p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/75">
              {section.title}
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {section.links.length} item
            </p>
            <ul className="mt-4 space-y-2">
              {section.links.map((link) => (
                <li key={`${section.title}:${link.href}`}>
                  <Link
                    href={link.href}
                    className="inline-flex rounded-md px-2 py-1 text-sm text-foreground/90 transition-colors hover:bg-accent"
                  >
                    <span className="mr-2 text-muted-foreground">{link.href}</span>
                    <span>{link.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
