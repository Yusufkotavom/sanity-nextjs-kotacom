import type { Metadata } from "next";
import Script from "next/script";
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
    title: "Kotacom — Jasa IT, Website, Software & Percetakan Surabaya",
    description:
      "Solusi IT terpadu untuk bisnis: Jasa pembuatan website, software development custom, IT support, dan percetakan profesional di Surabaya dan sekitarnya.",
    slug: "home-pepar",
  });
}

export default async function HomePeparPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://kotacom.id/#organization",
        name: "Kotacom",
        url: "https://kotacom.id/",
        logo: "https://kotacom.id/logo.png",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+6285799520350",
          contactType: "customer service",
          areaServed: "ID",
          availableLanguage: "Indonesian",
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://kotacom.id/#localbusiness",
        name: "Kotacom IT Service & Percetakan",
        url: "https://kotacom.id/",
        telephone: "+6285799520350",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Surabaya",
          addressRegion: "Jawa Timur",
          addressCountry: "ID",
        },
        areaServed: ["Surabaya", "Sidoarjo", "Gresik"],
      },
      {
        "@type": "WebSite",
        "@id": "https://kotacom.id/#website",
        url: "https://kotacom.id/",
        name: "Kotacom",
        publisher: {
          "@id": "https://kotacom.id/#organization",
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="home-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHybridShell slug="home-pepar">
        <HomePeparMiddleSection />
      </PageHybridShell>
    </>
  );
}
