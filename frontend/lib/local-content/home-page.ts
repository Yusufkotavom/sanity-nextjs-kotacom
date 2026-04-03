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
    "Homepage ini merangkum pesan utama kotacom.id menjadi satu pengalaman yang lebih tenang, lebih tajam, dan lebih dekat ke gaya produk modern. Fokusnya tetap sama: membantu bisnis bergerak lebih cepat lewat website, software custom, infrastruktur IT, dan produksi materi promosi.",
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
        "Expanded from the current site’s website-development messaging into a clearer product promise: responsive build, stronger information hierarchy, and a cleaner path from landing page to conversion.",
      href: "/pembuatan-website",
    },
    {
      eyebrow: "Software",
      title: "Software custom untuk proses yang terlalu spesifik untuk template generik.",
      description:
        "Built around the software-development narrative from kotacom.id, then rewritten into a productized lane for POS, internal tools, operations flow, and tailored business systems.",
      href: "/software",
    },
    {
      eyebrow: "IT Support",
      title: "Dukungan teknis yang menutup celah operasional sebelum berubah jadi bottleneck.",
      description:
        "Includes support, network setup, administration, and consultation as one continuity layer rather than disconnected service bullets.",
      href: "/services",
    },
    {
      eyebrow: "Printing",
      title: "Percetakan yang diposisikan sebagai output bisnis, bukan sekadar daftar produk cetak.",
      description:
        "Expanded from the current printing offers into a stronger service frame for books, brochures, calendars, and branded materials that actually support sales and trust.",
      href: "/percetakan",
    },
  ] satisfies HomePillar[],
  proofs: [
    {
      meta: "Case focus",
      title: "Restaurant Management System",
      description:
        "Current portfolio language on kotacom.id already points to integrated operations. Here it is reframed as proof that Kotacom can connect front-of-house, stock, and reporting into one system.",
      href: "/projects/restaurant-management-system",
    },
    {
      meta: "Delivery focus",
      title: "Website & software delivery lane",
      description:
        "The live site speaks about website, e-commerce, and software separately. This page brings them into one delivery model: discover, scope, build, stabilize, then scale.",
      href: "/services",
    },
    {
      meta: "Operational focus",
      title: "IT support and infrastructure continuity",
      description:
        "Support, network, and administration offers are grouped as operational assurance so prospects can understand what happens after launch, not just before it.",
      href: "/services/it-support-terbaik",
    },
  ] satisfies HomeProof[],
  workflow: [
    {
      title: "Map the bottleneck",
      description:
        "Start from the actual friction inside marketing, sales, ops, or publishing. The page positions Kotacom as an execution partner, not a generic feature vendor.",
    },
    {
      title: "Assemble the lane",
      description:
        "Website, software, support, and print are combined only where they help the business move faster. The structure is modular but the delivery story stays coherent.",
    },
    {
      title: "Ship with follow-through",
      description:
        "The expanded rewrite emphasizes post-launch support, iteration, and operational handoff so the offer feels complete instead of one-off.",
    },
  ] satisfies HomeWorkflowStep[],
  tech: [
    { name: "React", detail: "Modern UI foundations for modular product interfaces." },
    { name: "Next.js", detail: "Routing, metadata, and delivery tuned for fast deployment." },
    { name: "Astro.js", detail: "Legacy migration context and content-first architecture." },
    { name: "Angular", detail: "Enterprise-grade application delivery when teams need structure." },
    { name: "Nuxt.js", detail: "Alternative front-end lane for Vue ecosystems." },
    { name: "Node.js", detail: "API and service runtime for custom operational tooling." },
    { name: "Laravel", detail: "Structured backend workflows for internal systems and dashboards." },
  ] satisfies HomeTech[],
  finalCta: {
    title: "Homepage ini dirancang untuk menunjukkan arah Kotacom yang lebih tajam, lebih modern, dan lebih mudah dipahami.",
    description:
      "Halaman ini memadatkan website, software, IT support, dan percetakan ke dalam satu narasi yang lebih product-led tanpa meninggalkan isi inti kotacom.id.",
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
