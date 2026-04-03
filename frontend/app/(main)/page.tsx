import type { Metadata } from "next";
import Blocks from "@/components/blocks";
import HomePageView from "@/components/ui/home/home-page";
import { fetchSanityPageBySlug } from "@/sanity/lib/fetch";
import { generateBasicMetadata } from "@/sanity/lib/metadata";
import { generatePageMetadata } from "@/sanity/lib/metadata";

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

  if (page) {
    return <Blocks blocks={page.blocks ?? []} pageTitle={page.title} />;
  }

  return <HomePageView />;
}
