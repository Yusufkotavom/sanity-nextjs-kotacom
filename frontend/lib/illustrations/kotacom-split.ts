const BASE = "/images/kotacom-split-production-ready";

export const kotacomSplitIllustrations = {
  brand: {
    logoReference: `${BASE}/brand/logo-kotacom-reference.png`,
  },
  hero: {
    cetakBukuV1: `${BASE}/hero/hero-cetak-buku-shark-v1.png`,
    cetakBukuV2: `${BASE}/hero/hero-cetak-buku-shark-v2.png`,
  },
  services: {
    printing: {
      pod: `${BASE}/services/printing/service-cetak-buku-pod-shark.png`,
      offset: `${BASE}/services/printing/service-cetak-buku-offset-shark.png`,
      finishingJilid: `${BASE}/services/printing/service-finishing-jilid-shark.png`,
      bannerPoster: `${BASE}/services/printing/service-banner-poster-shark.png`,
      kartuNamaBrosur: `${BASE}/services/printing/service-kartu-nama-brosur-shark.png`,
      stikerCutting: `${BASE}/services/printing/service-stiker-cutting-shark.png`,
      kalenderMerchandise: `${BASE}/services/printing/service-kalender-merchandise-shark.png`,
      undanganSertifikat: `${BASE}/services/printing/service-undangan-sertifikat-shark.png`,
      cetakSkripsi: `${BASE}/services/printing/service-cetak-skripsi-shark.png`,
      cetakModul: `${BASE}/services/printing/service-cetak-modul-shark.png`,
      cetakBukuCustom: `${BASE}/services/printing/service-cetak-buku-custom-shark.png`,
    },
    it: {
      websiteDevelopment: `${BASE}/services/it/service-website-development-shark.png`,
      softwareCustom: `${BASE}/services/it/service-software-custom-shark.png`,
      itSupport: `${BASE}/services/it/service-it-support-shark.png`,
      wordpressMigration: `${BASE}/services/it/service-wordpress-migration-shark.png`,
    },
    website: {
      sekolah: `${BASE}/services/website/service-website-sekolah-shark.png`,
      klinik: `${BASE}/services/website/service-website-klinik-shark.png`,
      tokoOnline: `${BASE}/services/website/service-website-toko-online-shark.png`,
      ngo: `${BASE}/services/website/service-website-ngo-shark.png`,
      konstruksi: `${BASE}/services/website/service-website-konstruksi-shark.png`,
      restoran: `${BASE}/services/website/service-website-restoran-shark.png`,
      hotel: `${BASE}/services/website/service-website-hotel-shark.png`,
      properti: `${BASE}/services/website/service-website-properti-shark.png`,
      personalBrand: `${BASE}/services/website/service-website-personal-brand-shark.png`,
    },
  },
  ui: {
    ctaConsultation: `${BASE}/ui/ui-cta-consultation-shark.png`,
    ctaSection: `${BASE}/ui/ui-cta-section-shark-v2.png`,
    processWorkflow: `${BASE}/ui/ui-process-workflow-shark.png`,
  },
  proof: {
    testimonial: `${BASE}/proof/proof-testimonial-shark.png`,
    growthResults: `${BASE}/proof/proof-growth-results-shark.png`,
    beforeAfter: `${BASE}/proof/proof-before-after-shark.png`,
    achievement: `${BASE}/proof/proof-achievement-shark.png`,
    portfolioShowcase: `${BASE}/proof/proof-portfolio-showcase-shark.png`,
  },
  states: {
    notFound: `${BASE}/states/state-404-shark.png`,
  },
  about: {
    team: `${BASE}/about/about-team-shark.png`,
  },
  contact: {
    support: `${BASE}/contact/contact-support-shark.png`,
  },
  micro: {
    fastResponse: `${BASE}/micro/micro-fast-response-shark.png`,
    secureProcess: `${BASE}/micro/micro-secure-process-shark.png`,
    guarantee: `${BASE}/micro/micro-guarantee-shark.png`,
    nationwideDelivery: `${BASE}/micro/micro-nationwide-delivery-shark.png`,
    customRequest: `${BASE}/micro/micro-custom-request-shark.png`,
  },
} as const;

export const KOTACOM_SPLIT_DEFAULT_ILLUSTRATION =
  kotacomSplitIllustrations.proof.portfolioShowcase;

export const KOTACOM_SPLIT_DEFAULT_SEO_IMAGE =
  kotacomSplitIllustrations.hero.cetakBukuV2;
