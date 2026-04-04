import type { Metadata } from "next";
import PageHybridShell from "@/components/hybrid/page-hybrid-shell";
import { fetchSanityPageBySlug } from "@/sanity/lib/fetch";
import {
  generateBasicMetadata,
  generatePageMetadata,
} from "@/sanity/lib/metadata";
import HomePeparMiddleSection from "@/components/hybrid/generated/home-pepar-middle-section";

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchSanityPageBySlug({ slug: "home-pepar" });

  if (page) {
    return generatePageMetadata({
      page,
      slug: "home-pepar",
    });
  }

  return generateBasicMetadata({
    title: "Kotacom | Solusi IT, Website, Software, Support, dan Percetakan",
    description:
      "Kotacom membantu bisnis membangun website, software, IT support, dan kebutuhan percetakan dengan pendekatan yang lebih terarah dan siap dieksekusi.",
    slug: "home-pepar",
  });
}

export default async function HomePeparPage() {
  return (
    <PageHybridShell slug="home-pepar">
      <HomePeparMiddleSection />
    </PageHybridShell>
  );
}
