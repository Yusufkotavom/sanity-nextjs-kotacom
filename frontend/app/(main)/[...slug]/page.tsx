import Blocks from "@/components/blocks";
import { notFound } from "next/navigation";
import {
  fetchSanityPageByPath,
  fetchSanityPagesStaticParams,
  type PageBlock,
} from "@/sanity/lib/fetch";
import {
  generateBasicMetadata,
  generatePageMetadata,
} from "@/sanity/lib/metadata";

// Serialization of this route's params
type RouteParams = { params: Promise<{ slug: string[] }> };

// Local view of the page doc (new fields not yet in generated sanity.types).
type PageDoc = {
  title?: string | null;
  path?: string | null;
  contentStatus?: string | null;
  blocks?: PageBlock[] | null;
} | null;

function routeFromSegments(segments?: string[]) {
  const clean = (segments || []).filter(Boolean);
  return "/" + clean.join("/");
}

// Pre-build every non-draft page so routes are statically available; new pages
// are still served on-demand (dynamicParams defaults to true).
export async function generateStaticParams() {
  const rows = await fetchSanityPagesStaticParams();
  const params: { slug: string[] }[] = [];
  const seen = new Set<string>();
  for (const row of rows) {
    const route = (row?.path || "").replace(/^\/+/, "").replace(/\/+$/, "");
    if (!route) continue; // root ("/") is served by app/(main)/page.tsx
    if (row.contentStatus === "draft") continue;
    if (seen.has(route)) continue;
    seen.add(route);
    params.push({ slug: route.split("/") });
  }
  return params;
}

export async function generateMetadata({ params }: RouteParams) {
  const { slug } = await params;
  const route = routeFromSegments(slug);
  const page = (await fetchSanityPageByPath({ path: route })) as PageDoc;

  if (page) {
    return generatePageMetadata({ page, slug: route.replace(/^\/+/, "") });
  }

  return generateBasicMetadata({
    title: "Halaman tidak ditemukan",
    slug: route.replace(/^\/+/, ""),
    noindex: true,
  });
}

export default async function CatchAllPage({ params }: RouteParams) {
  const { slug } = await params;
  const route = routeFromSegments(slug);
  const page = (await fetchSanityPageByPath({ path: route })) as PageDoc;

  // Sanity-only render path: NO code/template fallback. A missing page or a
  // draft page is a hard 404 (410 Gone is handled earlier by middleware).
  if (!page || page.contentStatus === "draft") {
    notFound();
  }

  return <Blocks blocks={page.blocks ?? []} pageTitle={page.title} />;
}
