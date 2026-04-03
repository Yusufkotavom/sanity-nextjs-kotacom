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
import MetricsRail from "@/components/ui/rewrite/metrics-rail";
import ProductStage from "@/components/ui/rewrite/product-stage";
import QuoteSpotlight from "@/components/ui/rewrite/quote-spotlight";
import RewriteLandingSections from "@/components/ui/rewrite/landing-sections";
import LogoWall from "@/components/ui/rewrite/logo-wall";
import RewriteHighlights from "@/components/ui/rewrite/highlights";
import RewriteProcessFaq from "@/components/ui/rewrite/process-faq";
import RewriteRelatedLinks from "@/components/ui/rewrite/related-links";
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
    if (page.section === "percetakan") {
      return {
        src: kotacomSplitIllustrations.hero.cetakBukuV2,
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

  const percetakanMetrics = [
    {
      value: "Pre-press",
      label: "file, ukuran, bleed, dan spesifikasi dicek lebih dulu sebelum produksi berjalan",
      brand: "QC",
    },
    {
      value: "Custom",
      label: "banner, brosur, company profile, buku, stiker, dan materi promosi bisa disesuaikan kebutuhan",
      brand: "Print",
    },
    {
      value: "Terukur",
      label: "timeline produksi dan estimasi pengerjaan dibuat lebih jelas agar campaign tidak meleset",
      brand: "Deadline",
    },
    {
      value: "Nasional",
      label: "hasil produksi disiapkan untuk pengiriman Surabaya maupun luar kota dengan packing yang aman",
      brand: "Delivery",
    },
  ];

  const percetakanPhraseStrip = [
    "Spesifikasi lebih jelas",
    "Produksi lebih terkontrol",
    "Materi cetak lebih siap dipakai",
  ];

  const percetakanStageItems = [
    {
      eyebrow: "Tahap 1",
      title: "Kebutuhan cetak dipetakan dari fungsi, jumlah, material, dan deadline.",
      description:
        "Sebelum produksi dimulai, tim menurunkan kebutuhan Anda ke spesifikasi teknis supaya hasil cetak tidak sekadar bagus, tapi juga tepat guna untuk promosi atau operasional.",
      image: kotacomSplitIllustrations.services.printing.kartuNamaBrosur,
      bullets: [
        "Menentukan jenis materi cetak yang paling relevan",
        "Menyesuaikan kertas, ukuran, dan finishing dengan tujuan pakai",
        "Mengurangi risiko revisi dari spesifikasi yang kurang lengkap",
      ],
    },
    {
      eyebrow: "Tahap 2",
      title: "Produksi dijalankan dengan quality control agar hasil akhir tetap rapi dan konsisten.",
      description:
        "Setelah file dan spesifikasi disetujui, fokus berpindah ke ketepatan warna, kerapian trimming, finishing, serta kesiapan barang untuk diserahterimakan atau dikirim.",
      image: kotacomSplitIllustrations.services.printing.cetakBukuCustom,
      bullets: [
        "Pre-press checking sebelum mesin berjalan",
        "Pengecekan hasil cetak dan finishing per batch",
        "Packing dan pengiriman disesuaikan dengan jenis produk",
      ],
    },
  ];

  const percetakanTrustItems = [
    "Banner",
    "Brosur",
    "Company Profile",
    "Kartu Nama",
    "Stiker",
    "Buku",
    "Kalender",
    "Kemasan",
    "Undangan",
    "Merchandise",
  ];

  const shouldRenderPercetakanModules = page.section === "percetakan";

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
      {shouldRenderPercetakanModules ? (
        <>
          <MetricsRail items={percetakanMetrics} />
          <InlinePhraseStrip phrases={percetakanPhraseStrip} />
          <ProductStage
            title="Alur percetakan dibangun supaya kebutuhan bisnis lebih cepat masuk ke spesifikasi yang bisa diproduksi."
            description="Bukan sekadar menerima file lalu cetak, tetapi memastikan material, finishing, dan timeline cocok dengan tujuan promosi atau operasional Anda."
            items={percetakanStageItems}
          />
        </>
      ) : null}
      <RewriteLandingSections page={page} copy={copy} />
      {shouldRenderPercetakanModules ? (
        <>
          <QuoteSpotlight
            eyebrow="Cerita klien"
            quote="Yang kami butuhkan bukan cuma cetak cepat, tapi hasil yang rapi dan enak dibagikan ke calon klien. Tim Kotacom bantu cek file, rapikan spesifikasi, lalu kirim hasil yang siap dipakai."
            author="Tim Marketing"
            role="B2B & Promotion Materials"
            highlights={["Spesifikasi rapi", "QC produksi", "Pengiriman aman"]}
          />
          <LogoWall
            title="Kebutuhan cetak yang biasa ditangani tidak berhenti di satu jenis materi."
            description="Halaman percetakan ini diarahkan untuk bisnis yang butuh partner produksi lintas kebutuhan, dari materi promosi cepat sampai dokumen brand yang lebih formal."
            items={percetakanTrustItems}
          />
        </>
      ) : null}
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
