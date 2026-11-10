import type { Metadata } from "next";
import Blocks from "@/components/blocks";
import { fetchSanityPageBySlug } from "@/sanity/lib/fetch";
import { generateBasicMetadata } from "@/sanity/lib/metadata";
import { generatePageMetadata } from "@/sanity/lib/metadata";
import PageHybridShell from "@/components/hybrid/page-hybrid-shell";
import HomePeparMiddleSection from "@/components/hybrid/generated/home-pepar-middle-section";

// Homepage. Sanity-only architecture (F3): render the `page` doc at path "/"
// (slug "index") from its blocks[]. Falls back to the legacy hybrid shell only
// if no such page exists yet (transitional safety).
export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchSanityPageBySlug({ slug: "index" });

  if (page) {
    return generatePageMetadata({
      page,
      slug: "index",
    });
  }

  return generateBasicMetadata({
    title: "Kotacom - Website, Software, IT Support, dan Percetakan",
    description:
      "Kotacom membantu bisnis bergerak lebih cepat lewat website, software custom, IT support, dan percetakan yang dirancang sebagai satu sistem delivery.",
    slug: "index",
  });
}

export default async function IndexPage() {
  const page = await fetchSanityPageBySlug({ slug: "index" });
  const pageBlocks = (page as { blocks?: unknown[] | null } | null)?.blocks ?? null;

  if (page && Array.isArray(pageBlocks) && pageBlocks.length > 0) {
    return <Blocks blocks={pageBlocks as never[]} pageTitle={page.title} />;
  }

  return (
    <PageHybridShell slug="index">
      <HomePeparMiddleSection />
    </PageHybridShell>
  );
}
