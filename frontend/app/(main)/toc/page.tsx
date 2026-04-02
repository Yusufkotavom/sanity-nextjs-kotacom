import Link from "next/link";
import docsIndex from "@/content/schemaui-docs.json";
import { getAstroLocalCatalog } from "@/lib/local-content/astro-catalog";
import legacyManifest from "@/lib/legacy-pages/astro-static-manifest.json";
import { generateBasicMetadata } from "@/sanity/lib/metadata";
import { unstable_noStore as noStore } from "next/cache";

type TocLink = {
  title: string;
  href: string;
};

type TocSection = {
  title: string;
  links: TocLink[];
};

function dedupeLinks(links: TocLink[]) {
  const seen = new Set<string>();
  const output: TocLink[] = [];

  for (const link of links) {
    if (!link.href || seen.has(link.href)) continue;
    seen.add(link.href);
    output.push(link);
  }

  return output.sort((a, b) => a.href.localeCompare(b.href));
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

  const astroLocalLinks = dedupeLinks(
    (await getAstroLocalCatalog()).map((item) => ({
      title: item.title,
      href: item.href,
    })),
  );

  const legacyLinks = dedupeLinks(
    (legacyManifest as Array<{ route: string; title: string }>).map((item) => ({
      title: item.title,
      href: item.route,
    })),
  );

  const localDocsLinks = dedupeLinks(
    (docsIndex.pages as Array<{ pathname: string; title: string }>).map((item) => ({
      title: item.title,
      href: item.pathname,
    })),
  );

  const staticCoreLinks = dedupeLinks([
    { title: "Home", href: "/" },
    { title: "Blog", href: "/blog" },
    { title: "Services", href: "/services" },
    { title: "Products", href: "/products" },
    { title: "Projects", href: "/projects" },
    { title: "Docs", href: "/docs" },
    { title: "TOC", href: "/toc" },
  ]);

  const sections: TocSection[] = [
    { title: "Core Static", links: staticCoreLinks },
    { title: "Local Astro Mirror", links: astroLocalLinks },
    { title: "Local Legacy Routes", links: legacyLinks },
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
