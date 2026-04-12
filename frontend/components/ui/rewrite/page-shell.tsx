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
      highlightsEyebrow: "Problem & Stakes",
      highlightsTitle: "Masalah utama biasanya bukan traffic, tetapi pesan yang tidak langsung nyambung",
      highlightsDescription:
        "Section ini dipakai untuk menegaskan apa yang biasanya membuat website gagal membantu penjualan: positioning kabur, CTA lemah, dan struktur halaman yang tidak cepat dipahami pengunjung.",
      servicesTitle: "Jenis website yang paling sering dicari",
      servicesDescription:
        "Gunakan bagian ini untuk menilai apakah kebutuhan Anda lebih cocok ke company profile, toko online, atau halaman penawaran yang lebih fokus closing.",
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
      processEyebrow: "Process",
      processTitle: "Bagaimana proyek website dijalankan agar tidak melebar di tengah jalan",
      processDescription:
        "Tahapan kerja berikut diposisikan untuk mengurangi revisi yang tidak perlu, menjaga arah konten tetap jelas, dan membuat jalur approval lebih rapi.",
      faqEyebrow: "Objection Handling",
      faqTitle: "Pertanyaan yang biasanya muncul sebelum proyek dimulai",
      faqDescription:
        "Pertanyaan ini biasanya muncul saat calon klien membandingkan vendor, menghitung risiko, dan ingin memastikan website benar-benar bisa dipakai setelah launch.",
      supportPrompt:
        "Butuh jawaban yang lebih spesifik soal scope, timeline, atau pengelolaan website setelah launch?",
      supportCtaLabel: "Diskusi Website",
      supportLinkLabel: "Lihat penutup & CTA",
      servicesEyebrow: "Service Fit",
      servicesBadgeLabel: "Use case",
      servicesLinkLabel: "Lihat use case",
      pricingEyebrow: "Investment",
      pricingRecommendedLabel: "Paling sering dipilih",
      pricingButtonLabelPrefix: "Pilih paket",
      proofEyebrow: "Proof",
      proofBadgeLabel: "Bukti website",
      testimonialsEyebrow: "Client Signals",
      testimonialsBadgeLabel: "Suara klien",
      finalCtaEyebrow: "Ready to Brief",
      finalJourneyTitle: "Langkah sesudah kontak",
      guideEyebrow: "Decision Guide",
      guideDescription:
        "Panduan ini membantu calon klien menyaring prioritas website sebelum masuk ke brief, revisi scope, atau diskusi anggaran.",
      guideCardEyebrow: "Checklist",
      guideHeading: `Panduan memilih ${copy.primaryKeyword}`,
    },
    software: {
      utilityTitle: "Jalur evaluasi solusi",
      utilityCtaTitle: "Aksi cepat",
      highlightsEyebrow: "Workflow Bottlenecks",
      highlightsTitle: "Software custom dibutuhkan saat proses kerja sudah terlalu mahal jika dibiarkan manual",
      highlightsDescription:
        "Bagian ini menjelaskan kenapa masalah software biasanya tidak selesai dengan penambahan fitur saja, tetapi perlu keputusan yang benar tentang alur kerja, role user, dan prioritas implementasi.",
      servicesTitle: "Jenis implementasi software yang paling sering dibutuhkan",
      servicesDescription:
        "Gunakan bagian ini untuk membedakan kebutuhan validasi MVP, perapian workflow internal, atau implementasi sistem yang lebih menyeluruh.",
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
      processEyebrow: "Implementation Path",
      processTitle: "Bagaimana kebutuhan software dipecah menjadi implementasi yang realistis",
      processDescription:
        "Kami gunakan tahapan ini untuk memastikan kebutuhan bisnis, logika user, dan risiko integrasi tidak bercampur menjadi scope yang kabur.",
      faqEyebrow: "Decision Questions",
      faqTitle: "Pertanyaan yang biasanya muncul sebelum build dimulai",
      faqDescription:
        "Pertanyaan ini biasanya menentukan apakah proyek lanjut ke discovery, MVP, atau implementasi yang lebih luas.",
      supportPrompt:
        "Butuh bahas bottleneck, integrasi, atau pembagian fase implementasi lebih detail?",
      supportCtaLabel: "Diskusi Software",
      supportLinkLabel: "Lihat langkah implementasi",
      servicesEyebrow: "Use Case Fit",
      servicesBadgeLabel: "Use case",
      servicesLinkLabel: "Lihat kebutuhan",
      pricingEyebrow: "Engagement Model",
      pricingRecommendedLabel: "Paling relevan",
      pricingButtonLabelPrefix: "Bahas paket",
      proofEyebrow: "Implementation Proof",
      proofBadgeLabel: "Use case",
      testimonialsEyebrow: "Delivery Trust",
      testimonialsBadgeLabel: "Masukan klien",
      finalCtaEyebrow: "Implementation Next Step",
      finalJourneyTitle: "Jalur implementasi",
      guideEyebrow: "Decision Guide",
      guideDescription:
        "Bagian ini membantu memperjelas keputusan teknis dan bisnis sebelum tim masuk ke estimasi, prioritas modul, atau fase implementasi.",
      guideCardEyebrow: "Pertimbangan",
      guideHeading: `Panduan memilih ${copy.primaryKeyword}`,
    },
    printing: {
      utilityTitle: "Navigasi spesifikasi",
      utilityCtaTitle: "Hubungi tim cetak",
      highlightsEyebrow: "Production Risks",
      highlightsTitle: "Masalah cetak paling mahal biasanya datang dari spesifikasi yang salah sejak awal",
      highlightsDescription:
        "Section ini dipakai untuk menekankan kenapa keputusan material, finishing, file, dan tenggat perlu dibuat lebih jelas sebelum produksi berjalan.",
      servicesTitle: "Jenis kebutuhan cetak yang paling sering dikerjakan",
      servicesDescription:
        "Gunakan bagian ini untuk memilah kebutuhan cetak berdasarkan fungsi akhirnya agar diskusi jumlah, material, dan deadline tidak terasa menebak.",
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
      processEyebrow: "Production Flow",
      processTitle: "Bagaimana pekerjaan cetak dijalankan agar hasil dan timeline lebih aman",
      processDescription:
        "Alur ini dibuat untuk mengurangi miskomunikasi soal file, material, finishing, dan target waktu sebelum produksi berjalan.",
      faqEyebrow: "Buyer Questions",
      faqTitle: "Pertanyaan yang biasanya muncul sebelum file masuk produksi",
      faqDescription:
        "Pertanyaan ini biasanya menentukan apakah pekerjaan cetak sudah siap diproses atau masih butuh penyesuaian spesifikasi.",
      supportPrompt:
        "Butuh bahas file, material, finishing, atau deadline yang paling realistis untuk kebutuhan cetak Anda?",
      supportCtaLabel: "Diskusi Kebutuhan Cetak",
      supportLinkLabel: "Lihat penawaran akhir",
      servicesEyebrow: "Print Fit",
      servicesBadgeLabel: "Kategori cetak",
      servicesLinkLabel: "Lihat detail cetak",
      pricingEyebrow: "Pricing Basis",
      pricingRecommendedLabel: "Paling sering diminta",
      pricingButtonLabelPrefix: "Bahas paket",
      proofEyebrow: "Production Proof",
      proofBadgeLabel: "Output produksi",
      testimonialsEyebrow: "Production Trust",
      testimonialsBadgeLabel: "Feedback klien",
      finalCtaEyebrow: "Ready for Production Brief",
      finalJourneyTitle: "Jalur pengerjaan",
      guideEyebrow: "Decision Guide",
      guideDescription:
        "Panduan ini membantu tim pembeli memeriksa hal yang paling sering memengaruhi biaya, kualitas hasil, dan keamanan deadline produksi.",
      guideCardEyebrow: "Checklist",
      guideHeading: `Panduan memilih ${copy.primaryKeyword}`,
    },
    generic: {
      utilityTitle: "Navigasi halaman",
      utilityCtaTitle: "Aksi cepat",
      highlightsEyebrow: "Context",
      highlightsTitle: "Gunakan halaman ini untuk memahami nilai layanan dan langkah berikutnya",
      highlightsDescription:
        "Template generic tetap harus menjelaskan ruang lingkup kerja, bukti, dan cara memulai tanpa terlihat seperti placeholder kosong.",
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
      processEyebrow: "Process",
      processTitle: "Bagaimana kerja sama dimulai dan dijalankan",
      processDescription:
        "Tahapan ini membantu pengunjung memahami seperti apa alur kerja sebelum mereka masuk ke diskusi kebutuhan yang lebih detail.",
      faqEyebrow: "Common Questions",
      faqTitle: "Pertanyaan sebelum memulai",
      faqDescription:
        "FAQ dipakai untuk menjawab keraguan umum sebelum calon klien memutuskan melanjutkan percakapan.",
      supportPrompt:
        "Butuh memvalidasi apakah layanan ini memang cocok dengan kebutuhan bisnis Anda?",
      supportCtaLabel: "Diskusi Kebutuhan",
      supportLinkLabel: "Lihat CTA akhir",
      servicesEyebrow: "Service Scope",
      servicesBadgeLabel: "Ruang lingkup",
      servicesLinkLabel: "Lihat detail",
      pricingEyebrow: "Investment",
      pricingRecommendedLabel: "Direkomendasikan",
      pricingButtonLabelPrefix: "Pilih paket",
      proofEyebrow: "Proof",
      proofBadgeLabel: "Bukti kerja",
      testimonialsEyebrow: "Testimonials",
      testimonialsBadgeLabel: "Testimoni klien",
      finalCtaEyebrow: "Next Step",
      finalJourneyTitle: "Jalur tindak lanjut",
      guideEyebrow: "Decision Guide",
      guideDescription:
        "Panduan ini memberi konteks tambahan supaya calon klien tidak berhenti hanya di level minat, tetapi bisa lanjut ke tindakan.",
      guideCardEyebrow: "Panduan",
      guideHeading: `Panduan memilih ${copy.primaryKeyword}`,
    },
  }[templateExperience.lane];

  const serviceContextName =
    templatePage?.serviceType?.title ||
    templatePage?.service?.title ||
    "";
  const locationContextName = templatePage?.location?.title || "";

  const routeAwareAddon = (() => {
    switch (templateExperience.routeKind) {
      case "city":
        return {
          services:
            locationContextName
              ? ` Di ${locationContextName}, bagian ini membantu mempercepat brief awal sebelum masuk ke penawaran dan timeline.`
              : "",
          pricing:
            locationContextName
              ? ` Konteks ${locationContextName} dipakai untuk membantu diskusi awal lebih cepat masuk ke scope yang realistis.`
              : "",
          proof:
            locationContextName
              ? ` Fokusnya adalah membuat pengunjung dari ${locationContextName} cepat melihat bukti yang relevan sebelum menghubungi tim.`
              : "",
          testimonials:
            locationContextName
              ? ` Ini penting untuk menurunkan keraguan saat visitor lokal membandingkan vendor yang terlihat mirip.`
              : "",
          finalDescription:
            locationContextName
              ? ` Tim kami bisa membantu menyusun scope, estimasi, dan langkah mulai yang masuk akal untuk kebutuhan ${locationContextName}.`
              : "",
          finalJourneySteps: [
            "Brief awal masuk dengan konteks lokasi",
            "Tim bantu pilah scope dan prioritas yang paling realistis",
            "Langkah follow-up jadi lebih cepat dan jelas",
          ],
        };
      case "service":
        return {
          services:
            serviceContextName
              ? ` Fokus halaman ini adalah kebutuhan ${serviceContextName}, jadi visitor tidak perlu memilah layanan yang tidak relevan.`
              : "",
          pricing:
            serviceContextName
              ? ` Paket diarahkan agar pembicaraan soal ${serviceContextName} bisa cepat masuk ke scope, deliverable, dan prioritas kerja.`
              : "",
          proof:
            serviceContextName
              ? ` Yang ditonjolkan di sini adalah bukti yang paling membantu visitor menilai kecocokan untuk ${serviceContextName}.`
              : "",
          testimonials:
            serviceContextName
              ? ` Testimoni diposisikan untuk menjawab keberatan yang biasanya muncul sebelum memilih layanan ${serviceContextName}.`
              : "",
          finalDescription:
            serviceContextName
              ? ` Diskusi awal akan langsung diarahkan ke kebutuhan ${serviceContextName}, bukan ke penawaran umum yang terlalu lebar.`
              : "",
          finalJourneySteps: [
            "Kebutuhan layanan langsung dipetakan",
            "Scope dan output yang paling relevan dipilih lebih cepat",
            "Tim bisa follow-up dengan brief yang lebih tajam",
          ],
        };
      case "service-city":
        return {
          services:
            serviceContextName && locationContextName
              ? ` Untuk ${serviceContextName} di ${locationContextName}, bagian ini dipakai agar brief awal cepat masuk ke kebutuhan yang benar-benar relevan.`
              : "",
          pricing:
            serviceContextName && locationContextName
              ? ` Angka awal diposisikan agar pembahasan ${serviceContextName} di ${locationContextName} tidak berhenti di estimasi kasar saja.`
              : "",
          proof:
            serviceContextName && locationContextName
              ? ` Bukti di section ini dipakai untuk memindahkan trust lebih cepat pada pengunjung yang mencari ${serviceContextName} di ${locationContextName}.`
              : "",
          testimonials:
            serviceContextName && locationContextName
              ? ` Testimoni membantu menurunkan rasa ragu ketika visitor sudah berada dekat tahap keputusan di ${locationContextName}.`
              : "",
          finalDescription:
            serviceContextName && locationContextName
              ? ` Tim kami bisa langsung membahas scope ${serviceContextName}, prioritas kerja, dan langkah mulai yang paling realistis untuk ${locationContextName}.`
              : "",
          finalJourneySteps: [
            "Brief masuk dengan konteks layanan dan lokasi",
            "Scope, prioritas, dan kebutuhan teknis dipilah lebih cepat",
            "Follow-up berjalan lebih dekat ke keputusan beli",
          ],
        };
      case "base":
      default:
        return {
          services: "",
          pricing: "",
          proof: "",
          testimonials: "",
          finalDescription: "",
          finalJourneySteps: [],
        };
    }
  })();

  const finalCtaCopy = {
    ...copy,
    finalCtaDescription:
      routeAwareAddon.finalDescription ||
      copy.finalCtaDescription,
  };

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
  sectionMap.set(
    "highlights",
    <RewriteHighlights
      copy={copy}
      eyebrow={laneSectionCopy.highlightsEyebrow}
      title={laneSectionCopy.highlightsTitle}
      description={laneSectionCopy.highlightsDescription}
      secondaryCtaLabel={laneSectionCopy.supportCtaLabel}
    />,
  );
  sectionMap.set(
    "serviceTypes",
    copy.serviceTypes?.length ? (
      <ServiceTypesSection
        serviceTypes={copy.serviceTypes}
        eyebrow={laneSectionCopy.servicesEyebrow}
        title={laneSectionCopy.servicesTitle}
        description={`${laneSectionCopy.servicesDescription}${routeAwareAddon.services}`}
        badgeLabel={laneSectionCopy.servicesBadgeLabel}
        linkLabel={laneSectionCopy.servicesLinkLabel}
      />
    ) : null,
  );
  sectionMap.set(
    "pricing",
    copy.pricingPlans?.length ? (
      <PricingPlansSection
        pricingPlans={copy.pricingPlans}
        serviceTitle={page.title}
        eyebrow={laneSectionCopy.pricingEyebrow}
        title={laneSectionCopy.pricingTitle}
        description={`${laneSectionCopy.pricingDescription}${routeAwareAddon.pricing}`}
        recommendedLabel={laneSectionCopy.pricingRecommendedLabel}
        buttonLabelPrefix={laneSectionCopy.pricingButtonLabelPrefix}
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
        eyebrow={laneSectionCopy.proofEyebrow}
        title={laneSectionCopy.proofTitle}
        description={`${laneSectionCopy.proofDescription}${routeAwareAddon.proof}`}
        badgeLabel={laneSectionCopy.proofBadgeLabel}
      />
    ) : null,
  );
  sectionMap.set(
    "testimonials",
    copy.testimonials?.length ? (
      <TestimonialsSection
        testimonials={copy.testimonials}
        eyebrow={laneSectionCopy.testimonialsEyebrow}
        description={`${laneSectionCopy.testimonialsDescription}${routeAwareAddon.testimonials}`}
        badgeLabel={laneSectionCopy.testimonialsBadgeLabel}
      />
    ) : null,
  );
  sectionMap.set(
    "longGuide",
    copy.longGuide?.length ? (
      <LongGuideSection
        title={page.title}
        longGuide={copy.longGuide}
        eyebrow={laneSectionCopy.guideEyebrow}
        heading={laneSectionCopy.guideHeading}
        description={laneSectionCopy.guideDescription}
        cardEyebrow={laneSectionCopy.guideCardEyebrow}
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
  sectionMap.set(
    "process-faq",
    <RewriteProcessFaq
      copy={copy}
      processEyebrow={laneSectionCopy.processEyebrow}
      processTitle={laneSectionCopy.processTitle}
      processDescription={laneSectionCopy.processDescription}
      faqEyebrow={laneSectionCopy.faqEyebrow}
      faqTitle={laneSectionCopy.faqTitle}
      faqDescription={laneSectionCopy.faqDescription}
      supportPrompt={laneSectionCopy.supportPrompt}
      supportCtaLabel={laneSectionCopy.supportCtaLabel}
      supportLinkLabel={laneSectionCopy.supportLinkLabel}
    />,
  );
  sectionMap.set(
    "finalCta",
    <FinalCtaSection
      copy={finalCtaCopy}
      lane={templateExperience.lane}
      eyebrow={laneSectionCopy.finalCtaEyebrow}
      journeyTitle={laneSectionCopy.finalJourneyTitle}
      journeySteps={routeAwareAddon.finalJourneySteps}
    />,
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
  const requestedOrder = templatePage?.template ? baseOrder : resolveSectionOrder(override, baseOrder);
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
