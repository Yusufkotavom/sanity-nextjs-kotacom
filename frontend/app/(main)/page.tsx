import type { Metadata } from "next";
import HomePageView from "@/components/ui/home/home-page";
import { generateBasicMetadata } from "@/sanity/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generateBasicMetadata({
    title: "Kotacom - Website, Software, IT Support, dan Percetakan",
    description:
      "Kotacom membantu bisnis bergerak lebih cepat lewat website, software custom, IT support, dan percetakan yang dirancang sebagai satu sistem delivery.",
    slug: "index",
  });
}

export default function IndexPage() {
  return <HomePageView />;
}
