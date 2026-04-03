import type { Metadata } from "next";
import HomePageView from "@/components/ui/home/home-page";
import { generateBasicMetadata } from "@/sanity/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generateBasicMetadata({
    title: "Home - Kotacom Product Style Landing",
    description:
      "Landing alternatif bergaya product-led untuk Kotacom, merangkum website, software, IT support, dan percetakan dalam satu alur yang lebih tajam.",
    slug: "home",
  });
}

export default function HomePreviewPage() {
  return <HomePageView />;
}
