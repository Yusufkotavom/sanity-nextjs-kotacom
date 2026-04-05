import { Fragment } from "react";
import type { LegacyAstroPage } from "@/lib/legacy-pages/astro-static";
import { buildLegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";
import {
  applyLegacyCopyOverrides,
  DEFAULT_SECTION_ORDER,
  resolveSectionOrder,
  type LegacyPageOverride,
} from "@/lib/legacy-pages/legacy-overrides";
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
import RewriteEeatSection from "@/components/ui/rewrite/eeat-section";
import RewriteProcessFaq from "@/components/ui/rewrite/process-faq";
import RewriteRelatedLinks from "@/components/ui/rewrite/related-links";
import MicroBadges from "@/components/micro-badges";
import { kotacomSplitIllustrations } from "@/lib/illustrations/kotacom-split";
import Blocks from "@/components/blocks";
import { urlFor } from "@/sanity/lib/image";
import { fetchLegacyPageOverrideByRoute, fetchTemplatePageByRoute } from "@/sanity/lib/fetch";
import {
  resolveTemplateBlocks,
  resolveTemplateCopy,
  resolveTemplateHero,
  resolveTopBlockCount,
} from "@/lib/templates/resolve-template";
import { SectionPanel, SectionShell } from "@/components/ui/section-shell";

type RewritePageShellProps = {
  page: LegacyAstroPage;
  siblings?: LegacyAstroPage[];
  children?: React.ReactNode;
  routeOverride?: string;
  sectionHrefOverride?: string;
  sectionLabelOverride?: string;
};

export default async function RewritePageShell({
  page,
  siblings = [],
  children,
  routeOverride,
  sectionHrefOverride,
  sectionLabelOverride,
}: RewritePageShellProps) {
  const resolvedRoute = routeOverride ?? page.route;
  const resolvedSectionHref =
    sectionHrefOverride ?? (page.section ? `/${page.section}` : resolvedRoute);
  const resolvedSectionLabel =
    sectionLabelOverride ?? page.section.replace(/-/g, " ");
  const templatePage = await fetchTemplatePageByRoute({ route: resolvedRoute });
  const override = (await fetchLegacyPageOverrideByRoute({
    route: resolvedRoute,
  })) as LegacyPageOverride;
  const baseCopy = buildLegacyRewriteCopy(page);
  const templateCopy = resolveTemplateCopy({
    base: baseCopy,
    template: templatePage?.template?.structured || null,
    override: templatePage?.structured || null,
    locationName: templatePage?.location?.title || null,
  });
  const copy = applyLegacyCopyOverrides(templateCopy, override);
  const related = siblings
    .filter((item) => item.route !== page.route)
    .slice(0, 12);
  const strategicLinks = getStrategicLinks(page);
  const breadcrumbParts = resolvedRoute.split("/").filter(Boolean);
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
        path: resolvedRoute,
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
        src: "/images/products/cetak_percetakan_thumb_1775318012761.png",
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
  const heroImageOverride = override?.heroOverride?.image
    ? {
        src: urlFor(override.heroOverride.image).width(1600).url(),
        alt:
          override.heroOverride.image?.alt ||
          `${copy.primaryKeyword} - KOTACOM`,
      }
    : null;
  const templateHero = resolveTemplateHero({
    page: templatePage,
    template: templatePage?.template || null,
  });
  const templateHeroImage = templateHero.image
    ? {
        src: urlFor(templateHero.image).width(1600).url(),
        alt:
          templateHero.image?.alt ||
          `${copy.primaryKeyword} - KOTACOM`,
      }
    : null;
  const heroImage = templateHeroImage || heroImageOverride || heroImageBySection;
  const locationOverview = templatePage?.location?.overview;
  const locationHighlights = templatePage?.location?.highlights || [];

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
  const customBlocks = override?.customBlocks || [];
  const customBlocksNode =
    customBlocks.length > 0 ? (
      <Blocks blocks={customBlocks} pageTitle={page.title} />
    ) : null;
  const templateBlocks = resolveTemplateBlocks({
    page: templatePage,
    template: templatePage?.template || null,
  });
  const topBlockCount = resolveTopBlockCount({
    page: templatePage,
    template: templatePage?.template || null,
  });
  const isHybridTemplate = Boolean(templatePage?.template?.isHybrid);
  const renderBlocks = templateBlocks.length > 0;
  const splitCount = Math.max(
    0,
    Math.min(topBlockCount, templateBlocks.length),
  );
  const topBlocks = renderBlocks && isHybridTemplate ? templateBlocks.slice(0, splitCount) : [];
  const bottomBlocks = renderBlocks
    ? isHybridTemplate
      ? templateBlocks.slice(splitCount)
      : templateBlocks
    : [];
  const topBlocksNode =
    topBlocks.length > 0 ? (
      <Blocks blocks={topBlocks} pageTitle={templatePage?.title || page.title} />
    ) : null;
  const bottomBlocksNode =
    bottomBlocks.length > 0 ? (
      <Blocks blocks={bottomBlocks} pageTitle={templatePage?.title || page.title} />
    ) : null;
  const sectionMap = new Map<string, React.ReactNode>();
  if (shouldRenderPercetakanModules) {
    sectionMap.set("percetakan-metrics", (
      <>
        <MetricsRail items={percetakanMetrics} />
        <InlinePhraseStrip phrases={percetakanPhraseStrip} />
      </>
    ));
    sectionMap.set("percetakan-stage", (
      <ProductStage
        title="Alur percetakan dibangun supaya kebutuhan bisnis lebih cepat masuk ke spesifikasi yang bisa diproduksi."
        description="Bukan sekadar menerima file lalu cetak, tetapi memastikan material, finishing, dan timeline cocok dengan tujuan promosi atau operasional Anda."
        items={percetakanStageItems}
      />
    ));
  }
  sectionMap.set("landing", (
    <RewriteLandingSections page={page} copy={copy} />
  ));
  if (shouldRenderPercetakanModules) {
    sectionMap.set("percetakan-quote", (
      <QuoteSpotlight
        eyebrow="Cerita klien"
        quote="Yang kami butuhkan bukan cuma cetak cepat, tapi hasil yang rapi dan enak dibagikan ke calon klien. Tim Kotacom bantu cek file, rapikan spesifikasi, lalu kirim hasil yang siap dipakai."
        author="Tim Marketing"
        role="B2B & Promotion Materials"
        highlights={["Spesifikasi rapi", "QC produksi", "Pengiriman aman"]}
      />
    ));
    sectionMap.set("percetakan-logo-wall", (
      <LogoWall
        title="Kebutuhan cetak yang biasa ditangani tidak berhenti di satu jenis materi."
        description="Kami hadir sebagai partner strategis untuk mendampingi lini bisnis Anda menangani pelbagai variasi produksi, mulai dari pamflet promosi kilat hingga buku profil representatif perusahaan."
        items={percetakanTrustItems}
      />
    ));
  }
  sectionMap.set("micro-badges", <MicroBadges />);
  sectionMap.set("highlights", <RewriteHighlights copy={copy} />);
  if (copy.eeatPoints && copy.eeatPoints.length > 0) {
    sectionMap.set("eeat", <RewriteEeatSection copy={copy} />);
  }
  if (customBlocksNode) {
    sectionMap.set("custom-blocks", customBlocksNode);
  }
  sectionMap.set("process-faq", <RewriteProcessFaq copy={copy} />);
  if (related.length > 0 || strategicLinks.length > 0) {
    sectionMap.set(
      "related-links",
      <RewriteRelatedLinks
        page={page}
        related={related}
        strategicLinks={strategicLinks}
      />,
    );
  }
  const baseOrder = shouldRenderPercetakanModules
    ? [
        "percetakan-metrics",
        "percetakan-stage",
        "landing",
        "percetakan-quote",
        "percetakan-logo-wall",
        "micro-badges",
        "highlights",
        "custom-blocks",
        "process-faq",
        "related-links",
      ]
    : DEFAULT_SECTION_ORDER;
  const requestedOrder = resolveSectionOrder(override, baseOrder);
  const orderedIds: string[] = [];
  const seen = new Set<string>();
  requestedOrder.forEach((id) => {
    if (sectionMap.has(id) && !seen.has(id)) {
      orderedIds.push(id);
      seen.add(id);
    }
  });
  baseOrder.forEach((id) => {
    if (sectionMap.has(id) && !seen.has(id)) {
      orderedIds.push(id);
      seen.add(id);
    }
  });

  return (
    <>
      {topBlocksNode}
      <JsonLd data={breadcrumbJsonLd} />
      {serviceJsonLd ? <JsonLd data={serviceJsonLd} /> : null}
      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}

      <RewriteHero
        page={page}
        copy={copy}
        sectionLabel={resolvedSectionLabel}
        sectionHref={resolvedSectionHref}
        eyebrow={templateHero.eyebrow || override?.heroOverride?.eyebrow || undefined}
        heroImage={heroImage}
      />
      {locationOverview ? (
        <SectionShell id="lokasi" className="py-10 md:py-12">
          <SectionPanel
            tone="sky"
            className="rounded-[1.75rem] p-6 md:p-8"
          >
            <p className="text-ui-label text-foreground/55">Lokasi</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              {templatePage?.location?.title || "Konteks Lokal"}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
              {locationOverview}
            </p>
            {locationHighlights.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-2 text-sm text-foreground/75">
                {locationHighlights.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border/60 px-3 py-1"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </SectionPanel>
        </SectionShell>
      ) : null}
      {children}
      {orderedIds.map((id) => (
        <Fragment key={id}>{sectionMap.get(id)}</Fragment>
      ))}
      {bottomBlocksNode}
    </>
  );
}
