import type { LegacyAstroPage } from "@/lib/legacy-pages/astro-static";
import {
  KOTACOM_SPLIT_DEFAULT_ILLUSTRATION,
  kotacomSplitIllustrations,
} from "@/lib/illustrations/kotacom-split";

export const BASE_TOC = [
  { id: "layanan", label: "Jenis Layanan" },
  { id: "paket", label: "Paket Harga" },
  { id: "fitur", label: "Fitur Unggulan" },
  { id: "portfolio", label: "Portfolio" },
  { id: "testimoni", label: "Testimoni" },
  { id: "faq", label: "Pertanyaan Umum" },
];

export function getDefaultServiceTypes(page: LegacyAstroPage) {
  if (page.section === "percetakan") {
    return [
      {
        title: "Cetak Buku Satuan (POD)",
        description:
          "Cocok untuk penulis individu, dummy buku, atau kebutuhan cetak dengan kuantitas rendah namun tetap presisi.",
        href: "/percetakan/cetak-buku",
        image: kotacomSplitIllustrations.services.printing.pod,
      },
      {
        title: "Cetak Buku Massal (Offset)",
        description:
          "Produksi volume menengah hingga besar untuk penerbit, sekolah, dan lembaga dengan biaya per buku lebih efisien.",
        href: "/percetakan/cetak-buku",
        image: kotacomSplitIllustrations.services.printing.offset,
      },
      {
        title: "Finishing & Jilid Premium",
        description:
          "Pilihan jilid lem panas, jahit benang, hardcover, laminasi, dan finishing visual agar buku tampil profesional.",
        href: "/percetakan/cetak-buku",
        image: kotacomSplitIllustrations.services.printing.finishingJilid,
      },
    ];
  }

  return [
    {
      title: "Website Company Profile",
      description:
        "Meningkatkan kredibilitas brand dengan struktur konten profesional.",
      href: "/pembuatan-website/jasa-pembuatan-website-company-profile",
      image: kotacomSplitIllustrations.services.website.personalBrand,
    },
    {
      title: "Website Toko Online",
      description:
        "Mendukung penjualan online dengan alur belanja yang jelas dan cepat.",
      href: "/pembuatan-website/jasa-pembuatan-website-toko-online",
      image: kotacomSplitIllustrations.services.website.tokoOnline,
    },
    {
      title: "Website Custom",
      description:
        "Solusi website yang disesuaikan dengan model bisnis, funnel, dan kebutuhan layanan Anda.",
      href: "/pembuatan-website/template",
      image: kotacomSplitIllustrations.services.it.softwareCustom,
    },
  ];
}

export function getDefaultPricingPlans(page: LegacyAstroPage) {
  if (page.section === "percetakan") {
    return [
      {
        name: "Starter",
        price: "Mulai 500rb",
        description:
          "Untuk kebutuhan cetak basic dengan volume kecil-menengah.",
        items: ["Material standar", "Proofing basic", "Estimasi cepat"],
      },
      {
        name: "Growth",
        price: "Mulai 1,5jt",
        description:
          "Untuk bisnis yang butuh kualitas konsisten untuk campaign rutin.",
        items: [
          "Pilihan material lebih luas",
          "Quality check bertahap",
          "Prioritas produksi",
        ],
        recommended: true,
      },
      {
        name: "Scale",
        price: "Custom",
        description:
          "Untuk produksi volume tinggi atau kebutuhan finishing khusus.",
        items: ["Spesifikasi custom", "SLA proyek", "Pendampingan produksi"],
      },
    ];
  }

  return [
    {
      name: "Starter",
      price: "Mulai 1,5jt",
      description:
        "Untuk bisnis baru yang butuh website profesional cepat live.",
      items: ["Desain modern", "Halaman inti", "SEO basic"],
    },
    {
      name: "Growth",
      price: "Mulai 3,5jt",
      description:
        "Untuk bisnis yang fokus akuisisi lead dan konversi lebih tinggi.",
      items: [
        "Konten terstruktur",
        "Optimasi performa",
        "Konfigurasi conversion path",
      ],
      recommended: true,
    },
    {
      name: "Scale",
      price: "Custom",
      description:
        "Untuk kebutuhan website custom dengan integrasi lanjutan.",
      items: ["Arsitektur khusus", "Integrasi tools", "Roadmap scale-up"],
    },
  ];
}

export function getDefaultFeatures(page: LegacyAstroPage) {
  if (page.section === "percetakan") {
    return [
      {
        title: "Kualitas Cetak Stabil",
        description:
          "Kontrol warna dan hasil akhir dijaga agar output konsisten.",
        icon: "design",
      },
      {
        title: "Produksi Terukur",
        description:
          "Timeline produksi jelas dengan update progres di tiap fase.",
        icon: "speed",
      },
      {
        title: "Material Variatif",
        description:
          "Pilihan material dan finishing menyesuaikan tujuan campaign.",
        icon: "boxes",
      },
      {
        title: "Dukungan Konsultasi",
        description:
          "Bantu review file dan spesifikasi agar minim revisi saat produksi.",
        icon: "support",
      },
    ];
  }

  return [
    {
      title: "Loading Cepat",
      description:
        "Website dioptimalkan agar performa tetap cepat di perangkat mobile.",
      icon: "speed",
    },
    {
      title: "Fondasi SEO On-Page",
      description:
        "Struktur heading, metadata, dan tautan antarhalaman disiapkan sejak awal.",
      icon: "conversion",
    },
    {
      title: "Keamanan Dasar",
      description:
        "Konfigurasi keamanan dan best practice teknis untuk meminimalkan risiko.",
      icon: "security",
    },
    {
      title: "Mudah Dikelola",
      description:
        "Konten website dibuat mudah diperbarui saat ada promo, layanan baru, atau perubahan informasi.",
      icon: "support",
    },
  ];
}

export function getDefaultProofItems(page: LegacyAstroPage) {
  const image = KOTACOM_SPLIT_DEFAULT_ILLUSTRATION;
  if (page.section === "percetakan") {
    return [
      {
        title: "Campaign Promosi Retail",
        description: "Produksi materi cetak promosi untuk seasonal campaign.",
        image: kotacomSplitIllustrations.proof.growthResults,
      },
      {
        title: "Corporate Branding Kit",
        description:
          "Paket cetak branding untuk kebutuhan presentasi perusahaan.",
        image: kotacomSplitIllustrations.proof.portfolioShowcase,
      },
      {
        title: "Event Printing Delivery",
        description: "Support kebutuhan cetak event dengan deadline ketat.",
        image: kotacomSplitIllustrations.proof.testimonial,
      },
    ];
  }

  return [
    {
      title: "Website Company Profile",
      description:
        "Implementasi website profil perusahaan dengan fokus kredibilitas.",
      image,
    },
    {
      title: "Website E-commerce",
      description:
        "Website penjualan online dengan struktur produk terarah.",
      image,
    },
    {
      title: "Landing Page Campaign",
      description:
        "Landing page untuk campaign lead generation dengan CTA fokus.",
      image,
    },
  ];
}

export const DEFAULT_TESTIMONIALS = [
  {
    name: "Nadia A.",
    role: "Owner Bisnis Retail",
    quote:
      "Tim Kotacom membantu kami dari strategi sampai eksekusi. Proses rapi dan hasilnya langsung terasa di sisi operasional.",
  },
  {
    name: "Rizky P.",
    role: "Marketing Manager",
    quote:
      "Komunikasi cepat, timeline jelas, dan revisi terarah. Delivery project sangat membantu target campaign kami.",
  },
];
