import type { LegacyAstroPage } from "../../astro-static";
import { DEFAULT_CTA } from "./constants";
import { PRIORITY_SLUG_OVERRIDES } from "./overrides";
import type { LegacyRewriteCopy } from "./types";

const SECTION_SEMANTIC_KEYWORDS: Record<string, string[]> = {
  "pembuatan-website": [
    "website profesional",
    "optimasi SEO on-page",
    "landing page konversi",
    "pengembangan website bisnis",
    "jasa web developer",
  ],
  percetakan: [
    "percetakan profesional",
    "cetak cepat dan presisi",
    "quality control produksi",
    "cetak buku satuan dan massal",
    "finishing premium",
  ],
  software: [
    "software custom bisnis",
    "implementasi bertahap",
    "integrasi sistem operasional",
    "efisiensi proses bisnis",
    "dashboard dan laporan",
  ],
  "sistem-pos": [
    "aplikasi kasir online",
    "sistem point of sale",
    "sinkronisasi stok",
    "laporan penjualan real-time",
    "POS retail dan F&B",
  ],
  layanan: [
    "layanan IT terintegrasi",
    "implementasi website software percetakan",
    "konsultasi digital bisnis",
  ],
  about: [
    "tim ahli IT",
    "partner teknologi bisnis",
    "pengalaman implementasi proyek",
  ],
  contact: [
    "konsultasi cepat",
    "respon tim profesional",
    "diskusi kebutuhan bisnis",
  ],
  privacy: [
    "perlindungan data pengguna",
    "keamanan informasi",
    "kebijakan privasi digital",
  ],
};

const SECTION_LONG_GUIDE_DEFAULT: Partial<
  Record<LegacyAstroPage["section"], Array<{ title: string; description: string }>>
> = {
  "pembuatan-website": [
    {
      title: "Struktur Halaman Berbasis Intent",
      description:
        "Kami memetakan halaman berdasarkan intent pencarian agar traffic lebih relevan dan peluang konversi lead meningkat.",
    },
    {
      title: "Optimasi SEO Sejak Tahap Build",
      description:
        "Metadata, heading, internal link, dan performa teknis disiapkan dari awal agar halaman lebih siap tumbuh di pencarian organik.",
    },
    {
      title: "Iterasi Berbasis Data",
      description:
        "Setelah live, konten dan CTA dioptimasi bertahap berdasarkan performa agar website terus berkembang sesuai target bisnis.",
    },
  ],
  software: [
    {
      title: "Prioritas Fitur Berorientasi Dampak",
      description:
        "Fitur dipilih berdasarkan dampak bisnis paling tinggi agar implementasi awal memberi hasil nyata lebih cepat.",
    },
    {
      title: "Integrasi dan Adopsi Tim",
      description:
        "Kami menyiapkan alur adopsi pengguna supaya software tidak hanya selesai dibangun, tetapi benar-benar dipakai operasional harian.",
    },
    {
      title: "Roadmap Pengembangan Bertahap",
      description:
        "Pengembangan dibagi dalam fase terukur agar risiko lebih rendah dan investasi sistem tetap efisien.",
    },
  ],
  "sistem-pos": [
    {
      title: "Kontrol Transaksi dan Stok",
      description:
        "Sistem POS dirancang untuk menjaga kecepatan transaksi sekaligus akurasi stok lintas cabang.",
    },
    {
      title: "Laporan Operasional Real-time",
      description:
        "Data penjualan dan performa item bisa dipantau untuk mendukung keputusan harian maupun strategi bulanan.",
    },
    {
      title: "Skalabilitas untuk Pertumbuhan Outlet",
      description:
        "Arsitektur POS disiapkan untuk pertumbuhan bisnis agar penambahan outlet tetap terkontrol.",
    },
  ],
  percetakan: [
    {
      title: "Standar File dan Spesifikasi Cetak",
      description:
        "Pemeriksaan file, ukuran, bleed, dan profil warna dilakukan sejak awal untuk menekan risiko revisi produksi.",
    },
    {
      title: "Produksi dengan Quality Control",
      description:
        "Setiap tahap produksi dipantau agar hasil cetak konsisten, rapi, dan sesuai target kualitas brand.",
    },
    {
      title: "Distribusi dan Ketepatan Waktu",
      description:
        "Timeline produksi dan pengiriman dibuat terukur agar materi cetak siap dipakai sesuai jadwal campaign.",
    },
  ],
};

const SLUG_INTENT_KEYWORDS: Array<{
  match: (page: LegacyAstroPage) => boolean;
  keywords: string[];
}> = [
  {
    match: (page) => page.slug.includes("harga") || page.slug.includes("biaya"),
    keywords: [
      "estimasi biaya",
      "paket layanan bisnis",
      "konsultasi budget",
      "harga transparan",
    ],
  },
  {
    match: (page) => page.slug.includes("migrasi"),
    keywords: [
      "minim downtime",
      "migrasi aman",
      "validasi pasca migrasi",
      "backup dan rollback plan",
    ],
  },
  {
    match: (page) => page.slug.includes("toko-online") || page.slug.includes("ecommerce"),
    keywords: [
      "konversi penjualan",
      "checkout flow",
      "katalog produk",
      "optimasi funnel e-commerce",
    ],
  },
  {
    match: (page) => page.slug.includes("cetak-buku") || page.slug.includes("buku"),
    keywords: [
      "print on demand",
      "offset printing",
      "finishing jilid",
      "estimasi produksi buku",
    ],
  },
  {
    match: (page) => page.slug.includes("kalender"),
    keywords: [
      "kalender promosi",
      "branding tahunan",
      "distribusi corporate gift",
      "produksi kalender custom",
    ],
  },
  {
    match: (page) => page.slug.includes("implementasi") || page.slug.includes("instalasi"),
    keywords: [
      "go-live terukur",
      "adopsi pengguna",
      "training operasional",
      "handover teknis",
    ],
  },
];

const SLUG_INTENT_FAQS: Array<{
  match: (page: LegacyAstroPage) => boolean;
  faqs: Array<{ question: string; answer: string }>;
}> = [
  {
    match: (page) => page.slug.includes("harga") || page.slug.includes("biaya"),
    faqs: [
      {
        question: "Apakah tersedia paket layanan sesuai budget bisnis?",
        answer:
          "Ya. Scope layanan bisa disusun bertahap agar tetap realistis terhadap budget tanpa mengorbankan fondasi utama.",
      },
      {
        question: "Bagaimana cara mendapatkan estimasi biaya yang lebih akurat?",
        answer:
          "Kirim kebutuhan detail (target, timeline, fitur/output) agar estimasi disesuaikan dengan kompleksitas riil proyek.",
      },
    ],
  },
  {
    match: (page) => page.slug.includes("migrasi"),
    faqs: [
      {
        question: "Bagaimana menjaga website tetap aman saat proses migrasi?",
        answer:
          "Kami menyiapkan backup, tahapan validasi, dan checklist pasca migrasi agar risiko gangguan layanan bisa ditekan.",
      },
      {
        question: "Apakah URL dan SEO existing tetap dipertahankan?",
        answer:
          "Ya, struktur URL, redirect, dan elemen SEO penting dipetakan agar visibilitas organik tetap terjaga setelah migrasi.",
      },
    ],
  },
  {
    match: (page) => page.slug.includes("cetak-buku") || page.slug.includes("buku"),
    faqs: [
      {
        question: "Metode cetak apa yang cocok untuk kebutuhan saya: POD atau offset?",
        answer:
          "POD cocok untuk jumlah kecil/validasi awal, sedangkan offset lebih efisien untuk kuantitas besar dengan biaya per unit lebih rendah.",
      },
      {
        question: "Apakah bisa konsultasi spesifikasi sebelum produksi buku dimulai?",
        answer:
          "Bisa. Tim kami bantu menyusun ukuran, jenis kertas, jilid, finishing, dan estimasi timeline agar keputusan produksi lebih tepat.",
      },
    ],
  },
  {
    match: (page) => page.slug.includes("implementasi") || page.slug.includes("instalasi"),
    faqs: [
      {
        question: "Bagaimana memastikan tim cepat beradaptasi dengan sistem baru?",
        answer:
          "Implementasi disertai panduan alur, training, dan fase transisi agar proses adopsi lebih lancar dan minim hambatan operasional.",
      },
      {
        question: "Apakah ada pendampingan setelah go-live?",
        answer:
          "Ada. Kami menyediakan fase stabilisasi pasca go-live untuk memastikan sistem berjalan sesuai target operasional.",
      },
    ],
  },
];

function uniqueKeywords(values: string[]) {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const value of values) {
    const normalized = value.trim();
    if (!normalized) continue;
    const key = normalized.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(normalized);
  }
  return result;
}

function uniqueCtaLinks(values: Array<{ label: string; href: string }>) {
  const seen = new Set<string>();
  const result: Array<{ label: string; href: string }> = [];
  for (const item of values) {
    const label = item.label.trim();
    const href = item.href.trim();
    if (!label || !href) continue;
    const key = `${label.toLowerCase()}|||${href.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push({ label, href });
  }
  return result;
}

export function enrichCopyForSeo(
  page: LegacyAstroPage,
  copy: LegacyRewriteCopy,
): LegacyRewriteCopy {
  const priorityOverride = PRIORITY_SLUG_OVERRIDES[page.slug] || {};
  const effectiveCopy: LegacyRewriteCopy = {
    ...copy,
    ...priorityOverride,
  };

  const semantic = SECTION_SEMANTIC_KEYWORDS[page.section] || [];
  const intentKeywords = SLUG_INTENT_KEYWORDS.filter((item) => item.match(page)).flatMap(
    (item) => item.keywords,
  );
  const derived = [
    `${effectiveCopy.primaryKeyword} profesional`,
    `${effectiveCopy.primaryKeyword} terpercaya`,
    `${effectiveCopy.primaryKeyword} untuk bisnis`,
    ...semantic,
    ...intentKeywords,
  ];

  const secondaryKeywords = uniqueKeywords([
    ...(effectiveCopy.secondaryKeywords || []),
    ...derived,
  ]).slice(0, 10);

  const description = effectiveCopy.description.includes("Kotacom")
    ? effectiveCopy.description
    : `${effectiveCopy.description} Didukung tim Kotacom dengan alur kerja terukur untuk hasil yang konsisten.`;

  const intro = /konversi|lead|operasional|produksi|efisiensi/i.test(effectiveCopy.intro)
    ? effectiveCopy.intro
    : `${effectiveCopy.intro} Fokus kami adalah memperkuat konversi, efisiensi operasional, dan kualitas implementasi jangka panjang.`;

  const extraFaqs = [
    {
      question: `Bagaimana estimasi biaya ${effectiveCopy.primaryKeyword.toLowerCase()} ditentukan?`,
      answer:
        "Biaya ditentukan dari ruang lingkup, kompleksitas eksekusi, target timeline, dan kebutuhan output akhir agar proposal lebih akurat.",
    },
    {
      question: "Apakah layanan bisa disesuaikan dengan kebutuhan bisnis spesifik?",
      answer:
        "Bisa. Tim kami menyesuaikan strategi, prioritas, dan deliverable agar implementasi tetap relevan dengan target bisnis Anda.",
    },
    ...SLUG_INTENT_FAQS.filter((item) => item.match(page)).flatMap((item) => item.faqs),
  ];
  const faqs = uniqueKeywords([
    ...(effectiveCopy.faqs || []).map((item) => `${item.question}|||${item.answer}`),
    ...extraFaqs.map((item) => `${item.question}|||${item.answer}`),
  ])
    .slice(0, 5)
    .map((item) => {
      const [question, answer] = item.split("|||");
      return { question, answer };
    });

  const longGuide =
    effectiveCopy.longGuide && effectiveCopy.longGuide.length > 0
      ? effectiveCopy.longGuide
      : SECTION_LONG_GUIDE_DEFAULT[page.section];

  const sectionDefaultCtas: Record<string, Array<{ label: string; href: string }>> = {
    "pembuatan-website": [
      { label: "Konsultasi Website", href: DEFAULT_CTA },
      { label: "Minta Estimasi Biaya", href: DEFAULT_CTA },
      { label: "Lihat Paket Layanan", href: "#paket" },
      { label: "Cek FAQ Implementasi", href: "#faq" },
      { label: "Jadwalkan Diskusi", href: DEFAULT_CTA },
    ],
    percetakan: [
      { label: "Konsultasi Spesifikasi Cetak", href: DEFAULT_CTA },
      { label: "Minta Simulasi Harga", href: DEFAULT_CTA },
      { label: "Lihat Paket Produksi", href: "#paket" },
      { label: "Cek Pertanyaan Umum", href: "#faq" },
      { label: "Mulai Proyek Cetak", href: DEFAULT_CTA },
    ],
    software: [
      { label: "Audit Kebutuhan Software", href: DEFAULT_CTA },
      { label: "Minta Scope Awal", href: DEFAULT_CTA },
      { label: "Lihat Opsi Paket", href: "#paket" },
      { label: "Cek FAQ Implementasi", href: "#faq" },
      { label: "Jadwalkan Discovery Call", href: DEFAULT_CTA },
    ],
    "sistem-pos": [
      { label: "Konsultasi Sistem POS", href: DEFAULT_CTA },
      { label: "Minta Demo Alur POS", href: DEFAULT_CTA },
      { label: "Lihat Paket POS", href: "#paket" },
      { label: "Cek FAQ POS", href: "#faq" },
      { label: "Diskusikan Integrasi Outlet", href: DEFAULT_CTA },
    ],
  };

  const ctaSeed = sectionDefaultCtas[page.section] || [
    { label: "Konsultasi Sekarang", href: DEFAULT_CTA },
    { label: "Minta Estimasi", href: DEFAULT_CTA },
    { label: "Lihat FAQ", href: "#faq" },
  ];
  const mergedCtaLinks = uniqueCtaLinks([...(effectiveCopy.ctaLinks || []), ...ctaSeed]).slice(
    0,
    6,
  );
  const defaultCtaLinks = mergedCtaLinks.length > 0 ? mergedCtaLinks : effectiveCopy.ctaLinks;

  const finalCtaTitle =
    effectiveCopy.finalCtaTitle || `Siap Optimalkan ${effectiveCopy.primaryKeyword}?`;
  const finalCtaDescription =
    effectiveCopy.finalCtaDescription ||
    "Diskusikan kebutuhan Anda bersama tim Kotacom untuk menyusun strategi implementasi yang realistis, terukur, dan berorientasi hasil bisnis. Respon awal kami fokus pada langkah eksekusi yang bisa langsung dijalankan.";

  return {
    ...effectiveCopy,
    secondaryKeywords,
    description,
    intro,
    faqs,
    longGuide,
    ctaLinks: defaultCtaLinks,
    finalCtaTitle,
    finalCtaDescription,
  };
}

export function buildGenericCopy(page: LegacyAstroPage): LegacyRewriteCopy {
  const keyword = page.title;

  return {
    primaryKeyword: keyword,
    secondaryKeywords: [
      `${keyword} profesional`,
      `${keyword} terpercaya`,
      `${keyword} Indonesia`,
    ],
    description: `${keyword} untuk bisnis yang butuh hasil cepat, terukur, dan siap scale dengan alur pengerjaan yang jelas.`,
    intro: `${keyword} difokuskan untuk mendukung pertumbuhan bisnis lewat eksekusi yang rapi, komunikasi jelas, dan hasil yang relevan dengan target market.`,
    highlights: [
      "Scope pekerjaan jelas sejak awal.",
      "Timeline produksi terstruktur.",
      "Kualitas output dipantau dengan proses QA sebelum hasil akhir dikirim atau digunakan.",
      "Handover dan support pasca-launch tersedia.",
    ],
    process: [
      "Discovery dan pemetaan kebutuhan.",
      "Penyusunan solusi, estimasi, dan prioritas kerja.",
      "Produksi bertahap dengan review berkala.",
      "QA, handover, dan optimasi lanjutan.",
    ],
    faqs: [
      {
        question: `Berapa lama proses ${keyword.toLowerCase()}?`,
        answer:
          "Durasi menyesuaikan kompleksitas. Setelah scope final, timeline disepakati di awal agar delivery tetap terukur.",
      },
      {
        question: "Apakah bisa menyesuaikan kebutuhan khusus?",
        answer:
          "Bisa. Kebutuhan bisnis, brand guideline, dan alur operasional akan jadi dasar solusi agar implementasi relevan.",
      },
    ],
    ctaLabel: "Konsultasi Sekarang",
    ctaHref: DEFAULT_CTA,
  };
}
