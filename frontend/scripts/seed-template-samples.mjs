import { createSanityWriteClient, loadSanityEnv } from "./lib/sanity-page-guards.mjs";

const args = new Set(process.argv.slice(2));
const shouldWrite = args.has("--write");
const DRY_RUN = !shouldWrite;

const makeKey = () =>
  `key_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;

const withKeys = (items) =>
  (items || []).map((item) => ({
    _key: item._key || makeKey(),
    ...item,
  }));

const baseTemplate = {
  _type: "pageTemplate",
  variant: "service-hero",
  isHybrid: true,
  topBlockCountDefault: 1,
  structured: {
    primaryKeyword: "Solusi Layanan Profesional Kotacom",
    secondaryKeywords: ["Konsultasi cepat", "Tim berpengalaman", "Hasil terukur"],
    description:
      "Dapatkan pendampingan end-to-end untuk kebutuhan digital dan percetakan bisnis Anda dengan proses yang jelas dan output yang konsisten.",
    intro:
      "Kami bantu menyiapkan strategi, produksi, dan eksekusi layanan dengan timeline yang transparan serta komunikasi yang responsif.",
    highlights: [
      "Brief cepat ditransformasikan ke scope jelas.",
      "Tim fokus pada kualitas output dan detail eksekusi.",
      "Timeline produksi dijaga lewat milestone terukur.",
      "Kontrol kualitas sebelum hasil dikirim ke klien.",
    ],
    eeatPoints: withKeys([
      {
        title: "Pengalaman Tim Produksi",
        description:
          "Berpengalaman menangani proyek B2B dan institusi dengan standar QC yang terukur.",
      },
      {
        title: "Keahlian Teknis",
        description:
          "Tim memahami spesifikasi material, desain, dan workflow operasional lintas industri.",
      },
      {
        title: "Otoritas & Portofolio",
        description:
          "Didukung portofolio pekerjaan nyata dan testimoni klien yang dapat diverifikasi.",
      },
      {
        title: "Kepercayaan & Transparansi",
        description:
          "Estimasi waktu, biaya, dan proses disampaikan jelas sejak awal.",
      },
    ]),
    process: [
      "Konsultasi awal dan mapping kebutuhan",
      "Riset, desain, dan validasi spesifikasi",
      "Produksi dan quality control bertahap",
      "Final delivery + support pasca implementasi",
    ],
    faqs: withKeys([
      {
        question: "Apakah bisa konsultasi sebelum proses dimulai?",
        answer:
          "Bisa. Kami lakukan discovery singkat agar scope dan estimasi lebih akurat.",
      },
      {
        question: "Bagaimana memastikan hasil sesuai target?",
        answer:
          "Setiap milestone dilengkapi quality check dan update progres agar tetap on-track.",
      },
    ]),
    ctaLabel: "Konsultasi Gratis",
    ctaLinks: withKeys([
      {
        label: "Diskusi Proyek",
        link: { isExternal: true, href: "https://www.kotacom.id/contact" },
      },
      {
        label: "Lihat Layanan",
        link: { isExternal: true, href: "https://www.kotacom.id/services" },
      },
    ]),
    serviceTypes: withKeys([
      {
        title: "Strategi & Konsultasi",
        description:
          "Pendampingan awal untuk menentukan kebutuhan, scope, dan prioritas utama.",
      },
      {
        title: "Produksi & Implementasi",
        description:
          "Eksekusi teknis dan produksi sesuai timeline dengan kontrol kualitas ketat.",
      },
      {
        title: "Optimasi & Support",
        description:
          "Perbaikan berkelanjutan dan dukungan pasca implementasi untuk hasil maksimal.",
      },
    ]),
    pricingPlans: withKeys([
      {
        name: "Starter",
        price: "Mulai 3jt",
        description: "Cocok untuk kebutuhan dasar dan validasi awal.",
        items: ["Scope ringan", "Timeline singkat", "Support dasar"],
      },
      {
        name: "Growth",
        price: "Mulai 8jt",
        description: "Untuk kebutuhan produksi yang lebih lengkap.",
        items: ["Scope menengah", "QA tambahan", "Support prioritas"],
        recommended: true,
      },
    ]),
    features: withKeys([
      {
        title: "Proses Terstruktur",
        description: "Setiap tahap kerja terdokumentasi untuk hasil yang rapi.",
        icon: "speed",
      },
      {
        title: "Quality Control",
        description: "Audit hasil sebelum delivery agar konsisten dengan brief.",
        icon: "security",
      },
    ]),
    proofItems: withKeys([
      {
        title: "Kampanye Brand Lokal",
        description: "Produksi materi promosi lengkap dengan timeline cepat.",
      },
      {
        title: "Implementasi Sistem Operasional",
        description: "Pendampingan end-to-end untuk digital workflow.",
      },
    ]),
    testimonials: withKeys([
      {
        name: "Rina S",
        role: "Marketing Lead",
        quote:
          "Tim Kotacom responsif dan detail. Proses jelas, hasil rapi, dan cepat.",
      },
    ]),
    longGuide: withKeys([
      {
        title: "Panduan memilih partner produksi",
        description:
          "Checklist singkat untuk memastikan layanan sesuai kebutuhan bisnis.",
      },
    ]),
    finalCtaTitle: "Siap memulai sekarang?",
    finalCtaDescription:
      "Sampaikan kebutuhan Anda, kami bantu menyiapkan strategi dan produksi terbaik.",
  },
};

const docs = [
  {
    _id: "page-template-percetakan",
    ...baseTemplate,
    title: "Template Percetakan",
    slug: { _type: "slug", current: "template-percetakan" },
    variant: "pricing-focus",
    shellId: "percetakan",
  },
  {
    _id: "page-template-pembuatan-website",
    ...baseTemplate,
    title: "Template Pembuatan Website",
    slug: { _type: "slug", current: "template-pembuatan-website" },
    variant: "service-hero",
    shellId: "pembuatan-website",
  },
  {
    _id: "page-template-software",
    ...baseTemplate,
    title: "Template Software",
    slug: { _type: "slug", current: "template-software" },
    variant: "local-proof",
    shellId: "software",
  },
  {
    _id: "page-template-generic-company",
    ...baseTemplate,
    title: "Template Generic Company",
    slug: { _type: "slug", current: "template-generic-company" },
    variant: "generic-company",
    shellId: "layanan",
  },
  {
    _id: "location-surabaya",
    _type: "location",
    title: "Surabaya",
    slug: { _type: "slug", current: "surabaya" },
    province: "Jawa Timur",
    region: "Jawa Timur",
    overview:
      "Surabaya sebagai pusat bisnis Jawa Timur memiliki kebutuhan tinggi untuk layanan digital dan percetakan skala menengah hingga besar, terutama untuk B2B dan institusi.",
    highlights: [
      "Target audiens B2B aktif",
      "Kebutuhan promosi tinggi",
      "Distribusi nasional lebih cepat",
    ],
  },
  {
    _id: "page-location-percetakan",
    _type: "pageLocation",
    title: "Percetakan Profesional",
    route: "/percetakan",
    slug: { _type: "slug", current: "percetakan" },
    template: { _type: "reference", _ref: "page-template-percetakan" },
    structured: {
      primaryKeyword: "Percetakan Profesional untuk Bisnis",
      description:
        "Percetakan lengkap untuk kebutuhan promosi, operasional, dan branding dengan hasil konsisten.",
      ctaLabel: "Minta Penawaran Percetakan",
      ctaLinks: withKeys([
        {
          label: "Cek Produk",
          link: { isExternal: true, href: "https://www.kotacom.id/products" },
        },
      ]),
    },
    contentStatus: "draft",
    meta: {
      noindex: true,
    },
  },
  {
    _id: "page-location-pembuatan-website",
    _type: "pageLocation",
    title: "Pembuatan Website Profesional",
    route: "/pembuatan-website",
    slug: { _type: "slug", current: "pembuatan-website" },
    template: { _type: "reference", _ref: "page-template-pembuatan-website" },
    structured: {
      primaryKeyword: "Jasa Pembuatan Website Profesional",
      description:
        "Bangun website cepat, modern, dan siap konversi untuk bisnis Anda.",
      ctaLabel: "Konsultasi Website",
      ctaLinks: withKeys([
        {
          label: "Lihat Portfolio",
          link: { isExternal: true, href: "https://www.kotacom.id/projects" },
        },
      ]),
    },
    contentStatus: "draft",
    meta: {
      noindex: true,
    },
  },
  {
    _id: "page-location-software",
    _type: "pageLocation",
    title: "Software Custom untuk Operasional",
    route: "/software",
    slug: { _type: "slug", current: "software" },
    template: { _type: "reference", _ref: "page-template-software" },
    structured: {
      primaryKeyword: "Software Custom Sesuai Proses Bisnis",
      description:
        "Sistem yang disesuaikan dengan alur kerja dan target bisnis Anda.",
      ctaLabel: "Diskusi Software",
    },
    contentStatus: "draft",
    meta: {
      noindex: true,
    },
  },
  {
    _id: "service-location-jasa-cetak-buku-surabaya",
    _type: "serviceLocation",
    title: "Jasa Cetak Buku Surabaya",
    route: "/jasa-cetak-buku-surabaya",
    slug: { _type: "slug", current: "jasa-cetak-buku-surabaya" },
    location: { _type: "reference", _ref: "location-surabaya" },
    template: { _type: "reference", _ref: "page-template-percetakan" },
    structured: {
      primaryKeyword: "Jasa Cetak Buku Surabaya",
      description:
        "Layanan cetak buku Surabaya untuk penulis, penerbit, dan komunitas dengan opsi POD maupun produksi massal.",
      ctaLabel: "Konsultasi Cetak Buku",
      ctaLinks: withKeys([
        {
          label: "Chat Sekarang",
          link: { isExternal: true, href: "https://www.kotacom.id/contact" },
        },
      ]),
      faqs: withKeys([
        {
          question: "Apakah bisa konsultasi spesifikasi cetak dulu?",
          answer:
            "Bisa. Kami bantu cek ukuran, kertas, dan finishing agar hasil lebih optimal.",
        },
      ]),
    },
    contentStatus: "draft",
    meta: {
      noindex: true,
    },
  },
];

const upsertDoc = async (client, doc) => {
  if (DRY_RUN) {
    console.log(`DRY RUN: would upsert ${doc._type} (${doc._id})`);
    return;
  }
  await client.createOrReplace(doc);
  console.log(`✅ Upserted ${doc._type} (${doc._id})`);
};

async function main() {
  await loadSanityEnv();
  const client = await createSanityWriteClient();

  console.log(`\n📦 Seeding template samples (${DRY_RUN ? "DRY RUN" : "LIVE"})\n`);
  for (const doc of docs) {
    await upsertDoc(client, doc);
  }

  if (DRY_RUN) {
    console.log("\nDry run only. Re-run with --write to apply.");
  }
}

main().catch((err) => {
  console.error("❌ Failed to seed template samples:", err);
  process.exit(1);
});
