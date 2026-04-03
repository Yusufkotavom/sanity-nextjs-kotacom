import type { LegacyAstroPage } from "@/lib/legacy-pages/astro-static";
import { buildLegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";
import JsonLd from "@/components/seo/json-ld";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
} from "@/lib/seo-jsonld";
import { getStrategicLinks } from "@/lib/legacy-pages/internal-links";
import RewriteHero from "@/components/ui/rewrite/hero";
import InlinePhraseStrip from "@/components/ui/rewrite/inline-phrase-strip";
import RewriteLandingSections from "@/components/ui/rewrite/landing-sections";
import MetricsRail from "@/components/ui/rewrite/metrics-rail";
import ProductStage from "@/components/ui/rewrite/product-stage";
import QuoteSpotlight from "@/components/ui/rewrite/quote-spotlight";
import RewriteHighlights from "@/components/ui/rewrite/highlights";
import RewriteProcessFaq from "@/components/ui/rewrite/process-faq";
import RewriteRelatedLinks from "@/components/ui/rewrite/related-links";
import LogoWall from "@/components/ui/rewrite/logo-wall";
import MicroBadges from "@/components/micro-badges";
import { kotacomSplitIllustrations } from "@/lib/illustrations/kotacom-split";

type RewritePageShellProps = {
  page: LegacyAstroPage;
  siblings?: LegacyAstroPage[];
};

export default function RewritePageShell({
  page,
  siblings = [],
}: RewritePageShellProps) {
  const copy = buildLegacyRewriteCopy(page);
  const sectionHref = page.section ? `/${page.section}` : page.route;
  const sectionLabel = page.section.replace(/-/g, " ");
  const related = siblings
    .filter((item) => item.route !== page.route)
    .slice(0, 12);
  const strategicLinks = getStrategicLinks(page);
  const breadcrumbParts = page.route.split("/").filter(Boolean);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    ...breadcrumbParts.map((segment, index) => ({
      name: segment
        .split("-")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" "),
      path: `/${breadcrumbParts.slice(0, index + 1).join("/")}`,
    })),
  ]);
  const showServiceSchema = [
    "pembuatan-website",
    "percetakan",
    "software",
    "sistem-pos",
    "layanan",
  ].includes(page.section);
  const serviceJsonLd = showServiceSchema
    ? buildServiceJsonLd({
        title: copy.primaryKeyword,
        description: copy.description,
        path: page.route,
      })
    : null;
  const faqJsonLd = copy.faqs.length > 0 ? buildFaqJsonLd(copy.faqs) : null;
  const heroImageBySection = (() => {
    if (page.route === "/contact" || page.section === "contact") {
      return {
        src: kotacomSplitIllustrations.contact.support,
        alt: `${copy.primaryKeyword} - KOTACOM`,
      };
    }
    if (page.section === "about") {
      return {
        src: kotacomSplitIllustrations.about.team,
        alt: `${copy.primaryKeyword} - KOTACOM`,
      };
    }
    if (page.section === "pembuatan-website") {
      return {
        src: kotacomSplitIllustrations.services.website.tokoOnline,
        alt: `${copy.primaryKeyword} - KOTACOM`,
      };
    }
    if (page.section === "software") {
      return {
        src: kotacomSplitIllustrations.services.it.softwareCustom,
        alt: `${copy.primaryKeyword} - KOTACOM`,
      };
    }
    if (page.section === "layanan") {
      return {
        src: kotacomSplitIllustrations.ui.processWorkflow,
        alt: `${copy.primaryKeyword} - KOTACOM`,
      };
    }
    if (page.section === "sistem-pos") {
      return {
        src: kotacomSplitIllustrations.services.it.itSupport,
        alt: `${copy.primaryKeyword} - KOTACOM`,
      };
    }
    return undefined;
  })();
  const metricItems = [
    { value: "24h", label: "respons awal untuk brief yang jelas dan siap ditindaklanjuti", brand: "KOTACOM" },
    { value: "3x", label: "jalur CTA lebih fokus agar lead tidak tercecer ke banyak arah", brand: "Sales-ready" },
    { value: "100%", label: "struktur halaman diarahkan ke intent komersial dan konsultasi", brand: "Landing flow" },
    { value: "1 scope", label: "satu page diarahkan ke satu pesan dan satu langkah lanjut utama", brand: "Conversion" },
  ];
  const phraseStrip = [
    "Visual lebih terarah",
    "Lead lebih siap ditindaklanjuti",
    "CTA lebih dekat ke closing",
  ];
  const productStageItems = [
    {
      eyebrow: "Stage 1",
      title: "Struktur halaman diarahkan ke kebutuhan buyer, bukan sekadar layout cantik.",
      description:
        "Kami susun section berdasarkan intent dan pertanyaan yang biasanya muncul sebelum prospek siap kontak ke sales.",
      image: heroImageBySection?.src,
      bullets: [
        "Headline menjawab value utama",
        "Proof dan trust ditempatkan lebih awal",
        "CTA mengikuti kesiapan user",
      ],
    },
    {
      eyebrow: "Stage 2",
      title: "Setiap visual sekarang jadi pembawa konteks, bukan dekorasi yang berdiri sendiri.",
      description:
        "Pola split text + visual dipakai berulang agar ritme halaman lebih jelas dan tiap section punya scene yang mudah dipindai.",
      bullets: [
        "Separator antar section lebih tegas",
        "Frame tipis dan tint saling nyambung",
        "Hierarchy mobile tetap terjaga",
      ],
    },
  ];
  const trustStackItems = [
    "Website",
    "SEO",
    "WhatsApp",
    "CRM",
    "Analytics",
    "Content",
    "Speed",
    "Security",
    "Sales",
    "Support",
  ];
  const spotlight = copy.testimonials?.[0] || {
    name: "Tim Bisnis",
    role: "Commercial Team",
    quote:
      "Halaman jadi lebih mudah dijelaskan ke calon klien dan jalur konsultasinya terasa jauh lebih siap untuk ditindaklanjuti tim sales.",
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      {serviceJsonLd ? <JsonLd data={serviceJsonLd} /> : null}
      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}

      <RewriteHero
        page={page}
        copy={copy}
        sectionLabel={sectionLabel}
        sectionHref={sectionHref}
        heroImage={heroImageBySection}
      />
      <MetricsRail items={metricItems} />
      <InlinePhraseStrip phrases={phraseStrip} />
      <ProductStage
        title="Section sekarang dibangun sebagai rangkaian scene, bukan tumpukan blok."
        description="Ini menutup gap utama dari referensi Vercel: tiap area punya visual state, pesan utama, dan arah interaksi yang lebih jelas."
        items={productStageItems}
      />
      <RewriteLandingSections page={page} copy={copy} />
      <QuoteSpotlight
        quote={spotlight.quote}
        author={spotlight.name}
        role={spotlight.role}
      />
      <LogoWall
        title="Komponen baru untuk ritme visual-driven sudah mulai lengkap."
        description="Layer ini menutup primitive yang sebelumnya belum kita miliki untuk pola section ala Vercel."
        items={trustStackItems}
      />
      <MicroBadges />
      <RewriteHighlights copy={copy} />
      <RewriteProcessFaq copy={copy} />
      <RewriteRelatedLinks
        page={page}
        related={related}
        strategicLinks={strategicLinks}
      />
    </>
  );
}
