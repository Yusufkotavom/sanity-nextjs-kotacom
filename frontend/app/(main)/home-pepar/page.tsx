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
    title: "Home Prepare | Hybrid Landing Page",
    description:
      "Home Prepare memakai pola hybrid: block Sanity di atas dan bawah, dengan middle section code-owned yang tetap menjaga struktur halaman utama.",
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
