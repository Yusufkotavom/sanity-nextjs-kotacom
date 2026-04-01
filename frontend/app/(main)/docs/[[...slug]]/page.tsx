import Link from "next/link";
import { notFound } from "next/navigation";
import DocsSidebar from "@/components/ui/docs-sidebar";
import DocsMobileNav from "@/components/ui/docs-mobile-nav";
import {
  getSchemauiDocByPath,
  getSchemauiDocs,
  getSchemauiDocsGroups,
} from "@/lib/schemaui-docs";

const toPath = (slug?: string[]) => (slug?.length ? `/docs/${slug.join("/")}` : "/docs");

export async function generateStaticParams() {
  const docs = getSchemauiDocs();
  return docs.pages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const path = toPath(params.slug);
  const page = getSchemauiDocByPath(path);

  if (!page) {
    return {
      title: "Documentation",
    };
  }

  return {
    title: `${page.title} | Docs`,
    description: `Imported docs from ${page.sourceUrl}`,
  };
}

export default async function DocsPage(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const path = toPath(params.slug);
  const page = getSchemauiDocByPath(path);

  if (!page) {
    notFound();
  }

  const groups = getSchemauiDocsGroups();
  const mobileOptions = groups.flatMap((group) =>
    group.pages.map((item) => ({
      label: `${group.name} - ${item.title}`,
      value: item.pathname,
    })),
  );

  return (
    <section>
      <div className="container py-12 xl:py-16">
        <div className="mx-auto flex w-full max-w-7xl gap-8">
          <DocsSidebar groups={groups} activePath={path} />

          <article className="min-w-0 flex-1 rounded-xl border bg-card p-4 sm:p-6 lg:p-8">
            <DocsMobileNav options={mobileOptions} currentValue={path} />
            <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>Source:</span>
              <Link
                href={page.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                {page.sourceUrl}
              </Link>
            </div>

            <div
              className="schemaui-docs-content"
              dangerouslySetInnerHTML={{ __html: page.articleHtml }}
            />
          </article>
        </div>
      </div>
    </section>
  );
}
