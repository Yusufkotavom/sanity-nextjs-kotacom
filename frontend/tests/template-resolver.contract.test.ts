import assert from "node:assert/strict";

import type { LegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";
import type { TemplatePageDoc } from "@/types/template";

process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||= "test-project";
process.env.NEXT_PUBLIC_SANITY_DATASET ||= "test-dataset";
process.env.NEXT_PUBLIC_SANITY_API_VERSION ||= "2025-02-19";
process.env.NEXT_PUBLIC_SITE_URL ||= "https://www.example.com";

const baseCopy: LegacyRewriteCopy = {
  primaryKeyword: "Jasa Umum",
  secondaryKeywords: ["jasa umum", "solusi bisnis"],
  description: "Baseline description",
  intro: "Baseline intro",
  highlights: ["Cepat", "Rapi"],
  eeatPoints: [{ title: "Tim aktif", description: "Pendampingan real untuk klien" }],
  process: ["Brief", "Produksi", "Go live"],
  faqs: [{ question: "Apa langkah awal?", answer: "Kirim brief Anda." }],
  ctaLabel: "Konsultasi",
  ctaHref: "https://wa.me/628123456789",
  ctaLinks: [
    { label: "Konsultasi", href: "https://wa.me/628123456789" },
    { label: "Lihat portfolio", href: "/projects" },
  ],
  serviceTypes: [
    { title: "Layanan umum", description: "Cocok untuk banyak kebutuhan", href: "/services" },
  ],
  pricingPlans: [
    {
      name: "Baseline",
      price: "Rp 1.000.000",
      description: "Paket default",
      items: ["Kickoff", "Produksi"],
    },
  ],
  features: [{ title: "Proses jelas", description: "Tahapan mudah dipahami" }],
  proofItems: [{ title: "Proof umum", description: "Hasil kerja relevan", href: "/projects" }],
  testimonials: [{ name: "Client A", role: "Owner", quote: "Respons cepat dan jelas." }],
  longGuide: [{ title: "Panduan dasar", description: "Ringkasan proses kerja." }],
  finalCtaTitle: "Mulai proyek Anda",
  finalCtaDescription: "Diskusikan kebutuhan dan target bisnis Anda.",
};

const buildPage = (overrides: Partial<TemplatePageDoc> = {}): TemplatePageDoc => ({
  _id: "page-test",
  title: "Test Page",
  route: "/test",
  structured: null,
  meta: null,
  blocks: [],
  template: null,
  ...overrides,
});

const buildTemplate = (
  overrides: NonNullable<TemplatePageDoc["template"]> = {},
): NonNullable<TemplatePageDoc["template"]> => ({
  _id: "template-test",
  title: "Template Test",
  variant: "service-hero",
  lane: "website",
  trustMode: "aggressive",
  sourcePolicy: {
    pricingSource: "page-first",
    proofSource: "page-first",
    testimonialSource: "page-first",
    maxQuickLinks: 2,
  },
  structured: null,
  ...overrides,
});

async function main() {
  const {
    resolveNarrativeSections,
    resolveTemplateCopy,
    resolveTemplateExperience,
    resolvePrimaryHeroEyebrow,
  } = await import("@/lib/templates/resolve-template");

  {
    const template = buildTemplate({
      structured: {
        primaryKeyword: "Jasa Website {lokasi}",
        intro: "Website profesional untuk bisnis di {lokasi}.",
        finalCtaTitle: "Diskusikan website {lokasi}",
        contentVariants: [
          {
            slot: "heroEyebrow",
            text: "Website untuk bisnis {lokasi}",
            lane: "website",
            intent: "commercial",
            routeKinds: ["city"],
            requiresLocation: true,
          },
        ],
      },
    });
    const page = buildPage({ route: "/pembuatan-website", template });
    const copy = resolveTemplateCopy({ base: baseCopy, page, template });
    const eyebrow = resolvePrimaryHeroEyebrow({ page, template });

    assert.equal(copy.primaryKeyword, "Jasa Website");
    assert.equal(copy.intro, "Website profesional untuk bisnis di.");
    assert.equal(copy.finalCtaTitle, "Diskusikan website");
    assert.equal(eyebrow, "");
    assert(!copy.primaryKeyword.includes("{lokasi}"));
  }

  {
    const template = buildTemplate({
      lane: "software",
      trustMode: "safe",
      variant: "local-proof",
      structured: {
        contentVariants: [
          {
            slot: "description",
            text: "Naik 200% dalam 14 hari untuk software Anda.",
            lane: "software",
            strength: "aggressive",
            intent: "commercial",
          },
          {
            slot: "description",
            text: "Bangun software yang sesuai alur operasional Anda.",
            lane: "software",
            strength: "safe",
            intent: "commercial",
          },
        ],
        proofItems: [
          {
            title: "Website company profile",
            description: "Redesign website untuk brand FMCG.",
          },
          {
            title: "Software inventory",
            description: "Dashboard stok dan pembelian untuk apotik.",
          },
        ],
        testimonials: [
          {
            name: "Rina",
            role: "Marketing Manager",
            quote: "Website baru kami jadi lebih modern.",
          },
          {
            name: "Ari",
            role: "Owner Apotik",
            quote: "Workflow gudang lebih cepat setelah sistem baru aktif.",
          },
        ],
      },
    });
    const page = buildPage({
      route: "/software",
      template,
      structured: {
        contentVariants: [
          {
            slot: "description",
            text: "Harusnya tidak dipakai karena mode safe memblok aggressive bila tidak aman.",
            lane: "software",
            strength: "aggressive",
          },
        ],
      },
    });
    const copy = resolveTemplateCopy({ base: baseCopy, page, template });

    assert.equal(copy.description, "Bangun software yang sesuai alur operasional Anda.");
    assert.equal(copy.proofItems?.length, 1);
    assert.equal(copy.proofItems?.[0]?.title, "Software inventory");
    assert.equal(copy.testimonials?.length, 1);
    assert.equal(copy.testimonials?.[0]?.name, "Ari");
  }

  {
    const template = buildTemplate({
      lane: "printing",
      variant: "pricing-focus",
      sourcePolicy: {
        pricingSource: "template-only",
        proofSource: "template-only",
        testimonialSource: "template-only",
        maxQuickLinks: 3,
      },
      structured: {
        pricingPlans: [
          {
            name: "Cetak Buku Offset",
            price: "Rp 4.500 / buku",
            description: "MOQ dan finishing jelas",
            items: ["MOQ 300", "Proofing", "Finishing laminasi"],
          },
        ],
        proofItems: [
          {
            title: "Cetak katalog produk",
            description: "Produksi katalog dan distribusi untuk event.",
          },
        ],
        testimonials: [
          {
            name: "Bagas",
            role: "Purchasing",
            quote: "Timeline cetak dan QC lebih rapi.",
          },
        ],
      },
    });
    const page = buildPage({
      route: "/percetakan",
      template,
      structured: {
        pricingPlans: [
          {
            name: "Website Starter",
            price: "Rp 999.000",
            description: "Konflik harga lintas lane",
            items: ["Hosting", "CMS"],
          },
        ],
        proofItems: [
          {
            title: "Software gudang",
            description: "Implementasi dashboard operasional.",
          },
        ],
        testimonials: [
          {
            name: "Dian",
            role: "Owner",
            quote: "Software kami kini lebih stabil.",
          },
        ],
      },
    });
    const copy = resolveTemplateCopy({ base: baseCopy, page, template });
    const sections = resolveNarrativeSections({ page, template, copy });

    assert.equal(copy.pricingPlans?.length, 1);
    assert.equal(copy.pricingPlans?.[0]?.name, "Cetak Buku Offset");
    assert.equal(copy.proofItems?.[0]?.title, "Cetak katalog produk");
    assert.equal(copy.testimonials?.[0]?.name, "Bagas");
    assert.deepEqual(sections.slice(0, 5), ["utility", "pricing", "serviceTypes", "features", "proof"]);
  }

  {
    const template = buildTemplate({
      lane: "website",
      variant: "service-hero",
      structured: {
        contentVariants: [
          {
            slot: "heroEyebrow",
            text: "Website company profile untuk {lokasi}",
            lane: "website",
            routeKinds: ["service-city"],
            requiresLocation: true,
          },
        ],
      },
    });
    const page = buildPage({
      route: "/pembuatan-website/company-profile/jakarta",
      template,
      location: { title: "Jakarta" },
      serviceType: { title: "Company Profile" },
    });

    const experience = resolveTemplateExperience({ page, template });
    const eyebrow = resolvePrimaryHeroEyebrow({ page, template });

    assert.equal(experience.routeKind, "service-city");
    assert.equal(experience.lane, "website");
    assert.equal(eyebrow, "Website company profile untuk Jakarta");
  }

  console.log("template resolver contract tests passed");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
