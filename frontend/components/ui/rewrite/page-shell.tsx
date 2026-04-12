import { Fragment } from "react";
import type { LegacyAstroPage } from "@/lib/legacy-pages/astro-static";
import { buildLegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";
import {
  applyLegacyCopyOverrides,
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
  resolveNarrativeSections,
  resolveTemplateBlocks,
  resolveTemplateCopy,
  resolveTemplateExperience,
  resolveTemplateHero,
  resolvePrimaryHeroEyebrow,
  resolveTopBlockCount,
} from "@/lib/templates/resolve-template";
import { SectionPanel, SectionShell } from "@/components/ui/section-shell";
import { UtilityStrip } from "@/components/ui/rewrite/landing-sections/utility-strip";
import { ServiceTypesSection } from "@/components/ui/rewrite/landing-sections/service-types-section";
import { PricingPlansSection } from "@/components/ui/rewrite/landing-sections/pricing-plans-section";
import { FeaturesSection } from "@/components/ui/rewrite/landing-sections/features-section";
import { ProofSection } from "@/components/ui/rewrite/landing-sections/proof-section";
import { TestimonialsSection } from "@/components/ui/rewrite/landing-sections/testimonials-section";
import { LongGuideSection } from "@/components/ui/rewrite/landing-sections/long-guide-section";
import { FinalCtaSection } from "@/components/ui/rewrite/landing-sections/final-cta-section";

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
    page: templatePage,
    template: templatePage?.template || null,
  });
  const copy = applyLegacyCopyOverrides(templateCopy, override);
  const templateExperience = resolveTemplateExperience({
    page: templatePage,
    template: templatePage?.template || null,
  });
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
  const heroImageOverride = override?.heroOverride?.image?.asset
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
  const resolvedHeroEyebrow = resolvePrimaryHeroEyebrow({
    page: templatePage,
    template: templatePage?.template || null,
  });
  const templateHeroImage = templateHero?.image?.asset
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

  const utilityItems = [
    copy.serviceTypes?.length ? { id: "layanan", label: "Layanan" } : null,
    copy.pricingPlans?.length ? { id: "paket", label: "Paket" } : null,
    copy.features?.length ? { id: "fitur", label: "Fitur" } : null,
    copy.proofItems?.length ? { id: "portfolio", label: "Bukti Kerja" } : null,
    copy.testimonials?.length ? { id: "testimoni", label: "Testimoni" } : null,
    copy.longGuide?.length ? { id: "panduan", label: "Panduan" } : null,
    copy.faqs?.length ? { id: "faq", label: "FAQ" } : null,
  ].filter(Boolean) as Array<{ id: string; label: string }>;

  const laneSectionCopy = {
    website: {
      utilityTitle: "Alur keputusan cepat",
      utilityCtaTitle: "Aksi utama",
      servicesTitle: "Jenis website yang paling sering dicari",
      servicesDescription:
        "Pilih use case yang paling dekat dengan target bisnis Anda agar scope, fitur, dan prioritas launch lebih cepat jelas.",
      pricingTitle: "Paket website yang mudah dibandingkan",
      pricingDescription:
        "Harga disusun sebagai titik mulai yang jelas supaya Anda bisa memilih paket berdasar target lead, kebutuhan konten, dan kompleksitas pengerjaan.",
      featuresTitle: "Hal penting yang memengaruhi performa website",
      featuresDescription:
        "Bagian ini menyorot fondasi yang paling sering memengaruhi kredibilitas, kecepatan, dan konversi website bisnis.",
      proofTitle: "Contoh website yang relevan dengan intent bisnis",
      proofDescription:
        "Gunakan contoh ini untuk menilai apakah kualitas struktur, tampilan, dan pendekatan funnel kami cocok dengan kebutuhan Anda.",
      testimonialsDescription:
        "Masukan klien biasanya berputar pada kejelasan brief, hasil visual, dan kelancaran pengerjaan dari awal sampai live.",
      guideHeading: `Panduan memilih ${copy.primaryKeyword}`,
    },
    software: {
      utilityTitle: "Jalur evaluasi solusi",
      utilityCtaTitle: "Aksi cepat",
      servicesTitle: "Jenis implementasi software yang paling sering dibutuhkan",
      servicesDescription:
        "Kami membagi layanan berdasarkan kebutuhan operasional agar Anda bisa cepat membedakan mana yang cocok untuk MVP, integrasi, atau sistem penuh.",
      pricingTitle: "Pilihan implementasi software",
      pricingDescription:
        "Paket dibentuk untuk mempermudah keputusan antara validasi cepat, pengembangan bertahap, dan implementasi sistem yang lebih luas.",
      featuresTitle: "Kapabilitas yang paling memengaruhi operasional",
      featuresDescription:
        "Fokus utamanya bukan fitur dekoratif, tetapi hal yang benar-benar mempersingkat alur kerja, mengurangi error, dan memudahkan kontrol bisnis.",
      proofTitle: "Use case dan bukti implementasi",
      proofDescription:
        "Contoh pekerjaan berikut dipilih untuk menunjukkan kecocokan proses, integrasi, dan kualitas delivery pada proyek software custom.",
      testimonialsDescription:
        "Testimoni software paling berguna saat menjelaskan komunikasi proyek, ketepatan scope, dan dampak terhadap operasional harian tim.",
      guideHeading: `Panduan memilih ${copy.primaryKeyword}`,
    },
    printing: {
      utilityTitle: "Navigasi spesifikasi",
      utilityCtaTitle: "Hubungi tim cetak",
      servicesTitle: "Jenis kebutuhan cetak yang paling sering dikerjakan",
      servicesDescription:
        "Bagian ini membantu Anda memilah kebutuhan berdasarkan fungsi, volume, material, dan tenggat agar diskusi spesifikasi lebih cepat on point.",
      pricingTitle: "Estimasi investasi produksi",
      pricingDescription:
        "Harga diposisikan sebagai acuan awal. Nilai akhirnya tetap mengikuti volume, material, finishing, proofing, dan kebutuhan deadline.",
      featuresTitle: "Hal yang paling memengaruhi hasil cetak",
      featuresDescription:
        "Kami menekankan kualitas file, pilihan material, quality control, dan kesiapan distribusi agar hasil cetak tidak berhenti di tampilan saja.",
      proofTitle: "Contoh output dan bukti pengerjaan",
      proofDescription:
        "Portfolio dipakai untuk menunjukkan ketepatan spesifikasi, kualitas finishing, dan kesiapan hasil produksi untuk kebutuhan promosi atau operasional.",
      testimonialsDescription:
        "Masukan klien percetakan biasanya paling berguna saat membahas ketepatan hasil, kualitas QC, dan keamanan timeline produksi.",
      guideHeading: `Panduan memilih ${copy.primaryKeyword}`,
    },
    generic: {
      utilityTitle: "Navigasi halaman",
      utilityCtaTitle: "Aksi cepat",
      servicesTitle: "Ruang lingkup layanan",
      servicesDescription:
        "Gunakan bagian ini untuk melihat cakupan utama layanan sebelum masuk ke detail paket, proof, dan FAQ.",
      pricingTitle: "Pilihan paket layanan",
      pricingDescription:
        "Setiap paket dirancang untuk membantu Anda membandingkan scope dan titik mulai kerja secara lebih sederhana.",
      featuresTitle: "Nilai utama layanan",
      featuresDescription:
        "Bagian ini menyorot kemampuan inti yang paling berdampak terhadap hasil kerja dan pengalaman kolaborasi.",
      proofTitle: "Bukti kerja",
      proofDescription:
        "Contoh berikut membantu Anda menilai kecocokan kualitas, pendekatan, dan hasil implementasi secara lebih konkret.",
      testimonialsDescription:
        "Testimoni membantu memindahkan kepercayaan dari klaim kami ke pengalaman nyata klien.",
      guideHeading: `Panduan memilih ${copy.primaryKeyword}`,
    },
  }[templateExperience.lane];

  const sectionMap = new Map<string, React.ReactNode>();
  sectionMap.set(
    "utility",
    <UtilityStrip
      tocItems={utilityItems}
      ctaLinks={copy.ctaLinks}
      ctaLabel={copy.ctaLabel}
      ctaHref={copy.ctaHref}
      title={laneSectionCopy.utilityTitle}
      ctaTitle={laneSectionCopy.utilityCtaTitle}
    />,
  );
  sectionMap.set("highlights", <RewriteHighlights copy={copy} />);
  sectionMap.set(
    "serviceTypes",
    copy.serviceTypes?.length ? (
      <ServiceTypesSection
        serviceTypes={copy.serviceTypes}
        title={laneSectionCopy.servicesTitle}
        description={laneSectionCopy.servicesDescription}
      />
    ) : null,
  );
  sectionMap.set(
    "pricing",
    copy.pricingPlans?.length ? (
      <PricingPlansSection
        pricingPlans={copy.pricingPlans}
        serviceTitle={page.title}
        title={laneSectionCopy.pricingTitle}
        description={laneSectionCopy.pricingDescription}
      />
    ) : null,
  );
  sectionMap.set(
    "features",
    copy.features?.length ? (
      <FeaturesSection
        features={copy.features}
        title={laneSectionCopy.featuresTitle}
        description={laneSectionCopy.featuresDescription}
      />
    ) : null,
  );
  sectionMap.set(
    "proof",
    copy.proofItems?.length ? (
      <ProofSection
        proofItems={copy.proofItems}
        title={laneSectionCopy.proofTitle}
        description={laneSectionCopy.proofDescription}
      />
    ) : null,
  );
  sectionMap.set(
    "testimonials",
    copy.testimonials?.length ? (
      <TestimonialsSection
        testimonials={copy.testimonials}
        description={laneSectionCopy.testimonialsDescription}
      />
    ) : null,
  );
  sectionMap.set(
    "longGuide",
    copy.longGuide?.length ? (
      <LongGuideSection
        title={page.title}
        longGuide={copy.longGuide}
        heading={laneSectionCopy.guideHeading}
      />
    ) : null,
  );
  if (copy.eeatPoints && copy.eeatPoints.length > 0) {
    sectionMap.set("eeat", <RewriteEeatSection copy={copy} />);
  }
  if (locationOverview) {
    sectionMap.set(
      "location",
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
      </SectionShell>,
    );
  }
  if (customBlocksNode) {
    sectionMap.set("custom-blocks", customBlocksNode);
  }
  sectionMap.set("process-faq", <RewriteProcessFaq copy={copy} />);
  sectionMap.set(
    "finalCta",
    <FinalCtaSection copy={copy} lane={templateExperience.lane} />,
  );
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
  sectionMap.set("micro-badges", <MicroBadges />);
  const baseOrder = [
    ...resolveNarrativeSections({
      page: templatePage,
      template: templatePage?.template || null,
      copy,
    }),
    ...(customBlocksNode ? ["custom-blocks"] : []),
    "micro-badges",
  ];
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
        eyebrow={resolvedHeroEyebrow || override?.heroOverride?.eyebrow || undefined}
        heroImage={heroImage}
      />
      {children}
      {orderedIds.map((id) => (
        <Fragment key={id}>{sectionMap.get(id)}</Fragment>
      ))}
      {bottomBlocksNode}
    </>
  );
}
