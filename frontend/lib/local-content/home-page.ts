export type HomeHeroStat = {
  label: string;
  value: string;
};

export type HomePillar = {
  title: string;
  description: string;
  href: string;
  eyebrow: string;
};

export type HomeProof = {
  title: string;
  description: string;
  href: string;
  meta: string;
};

export type HomeWorkflowStep = {
  title: string;
  description: string;
};

export type HomeTech = {
  name: string;
  detail: string;
};

export const homePageContent = {
  badge: "KOTACOM / HOME",
  title: "IT, software, website, dan percetakan dalam satu sistem kerja yang ringkas.",
  description:
    "Kotacom membantu bisnis bergerak lebih cepat lewat website, software custom, infrastruktur IT, dan produksi materi promosi yang tersusun lebih rapi dalam satu alur layanan.",
  primaryCta: {
    label: "Diskusikan Kebutuhan",
    href: "/contact",
  },
  secondaryCta: {
    label: "Lihat Layanan",
    href: "/services",
  },
  heroStats: [
    { label: "Core lanes", value: "4" },
    { label: "Tracked offerings", value: "Website · Software · IT · Print" },
    { label: "Default response", value: "WhatsApp + scoped consult" },
  ] satisfies HomeHeroStat[],
  pillars: [
    {
      eyebrow: "Website",
      title: "Website yang cepat dipahami, cepat dimuat, dan mudah dikembangkan.",
      description:
        "Website bisnis yang responsif, pesannya jelas, dan alur halamannya membantu pengunjung bergerak lebih cepat dari kunjungan ke inquiry.",
      href: "/pembuatan-website",
    },
    {
      eyebrow: "Software",
      title: "Software custom untuk proses yang terlalu spesifik untuk template generik.",
      description:
        "Software custom untuk POS, otomasi proses, dan sistem kerja yang perlu mengikuti alur bisnis nyata, bukan memaksa tim mengikuti template umum.",
      href: "/software",
    },
    {
      eyebrow: "IT Support",
      title: "Dukungan teknis yang menutup celah operasional sebelum berubah jadi bottleneck.",
      description:
        "Mencakup support, network setup, administrasi server, dan konsultasi teknis sebagai satu jalur dukungan yang saling menyambung.",
      href: "/services",
    },
    {
      eyebrow: "Printing",
      title: "Percetakan yang diposisikan sebagai output bisnis, bukan sekadar daftar produk cetak.",
      description:
        "Layanan percetakan untuk buku, brosur, kalender, dan materi brand yang benar-benar mendukung penjualan, presentasi, dan trust bisnis.",
      href: "/percetakan",
    },
  ] satisfies HomePillar[],
  proofs: [
    {
      meta: "Case focus",
      title: "Restaurant Management System",
      description:
        "Contoh implementasi yang menunjukkan bagaimana operasional, stok, dan pelaporan bisa disatukan dalam satu sistem yang lebih rapi.",
      href: "/projects/restaurant-management-system",
    },
    {
      meta: "Delivery focus",
      title: "Website & software delivery lane",
      description:
        "Website, e-commerce, dan software dijelaskan sebagai satu alur delivery yang lebih utuh: pahami kebutuhan, susun scope, bangun, stabilkan, lalu kembangkan.",
      href: "/services",
    },
    {
      meta: "Operational focus",
      title: "IT support and infrastructure continuity",
      description:
        "Support, network, dan administrasi infrastruktur dijelaskan sebagai dukungan operasional berkelanjutan, bukan hanya pekerjaan sebelum launch.",
      href: "/services/it-support-terbaik",
    },
  ] satisfies HomeProof[],
  workflow: [
    {
      title: "Map the bottleneck",
      description:
        "Mulai dari hambatan nyata di marketing, sales, operasional, atau distribusi agar solusi yang dipilih benar-benar menjawab kebutuhan bisnis.",
    },
    {
      title: "Assemble the lane",
      description:
        "Website, software, support, dan print digabungkan hanya jika memang membantu bisnis bergerak lebih cepat. Strukturnya modular, tetapi alur layanannya tetap utuh.",
    },
    {
      title: "Ship with follow-through",
      description:
        "Setelah launch, dukungan, iterasi, dan pendampingan tetap dijaga agar hasilnya terasa lengkap, bukan sekadar proyek sekali jalan.",
    },
  ] satisfies HomeWorkflowStep[],
  tech: [
    { name: "React", detail: "Modern UI foundations for modular product interfaces." },
    { name: "Next.js", detail: "Routing, metadata, and delivery tuned for fast deployment." },
    { name: "Astro.js", detail: "Legacy migration context and content-first architecture." },
    { name: "Angular", detail: "Enterprise-grade application delivery when teams need structure." },
    { name: "Nuxt.js", detail: "Alternative front-end lane for Vue ecosystems." },
    { name: "Node.js", detail: "API and service runtime for custom operational tooling." },
    { name: "Laravel", detail: "Backend yang rapi untuk aplikasi bisnis, dashboard, dan alur data yang perlu dikembangkan lebih lanjut." },
  ] satisfies HomeTech[],
  finalCta: {
    title: "Homepage ini dirancang untuk menunjukkan arah Kotacom yang lebih tajam, lebih modern, dan lebih mudah dipahami.",
    description:
      "Kotacom merangkum website, software, IT support, dan percetakan ke dalam satu narasi layanan yang lebih jelas, lebih modern, dan lebih mudah dipahami calon klien.",
    primary: {
      label: "Buka Kontak",
      href: "/contact",
    },
    secondary: {
      label: "Lihat Portfolio",
      href: "/projects",
    },
  },
} as const;
