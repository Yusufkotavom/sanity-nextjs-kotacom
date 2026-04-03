export type HomePrepareLane = {
  key: "website" | "software" | "support" | "printing";
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  bullets: string[];
};

export type HomePrepareHighlight = {
  title: string;
  description: string;
  bullets: string[];
};

export type HomePrepareServiceCluster = {
  title: string;
  description: string;
  href: string;
  priceHint: string;
  bullets: string[];
};

export const homePrepareContent = {
  eyebrow: "KOTACOM / HOME PREPARE",
  title: "Solusi IT dan digital terpadu untuk bisnis yang butuh eksekusi, bukan sekadar daftar layanan.",
  description:
    "Versi persiapan homepage ini mengambil struktur inti dari kotacom.id yang sudah live, lalu merapikannya ke bahasa visual rewrite: lebih tenang, lebih terstruktur, dan lebih mudah dibaca sebagai one-stop delivery system.",
  primaryCta: {
    label: "Jelajahi Layanan",
    href: "/layanan",
  },
  secondaryCta: {
    label: "Konsultasi via WhatsApp",
    href: "https://wa.me/6281335275219",
  },
  techStack: [
    "React",
    "Next.js",
    "Astro.js",
    "Node.js",
    "Laravel",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Google Cloud",
    "Flutter",
    "Docker",
  ],
  lanes: [
    {
      key: "website",
      eyebrow: "Website Development",
      title: "Website profesional yang cepat dipahami dan cepat bergerak ke konversi.",
      description:
        "Diposisikan untuk company profile, landing page, sekolah, toko online, dan kebutuhan promosi yang perlu struktur informasi lebih tajam.",
      href: "/pembuatan-website",
      bullets: ["Company profile", "Landing page", "Toko online"],
    },
    {
      key: "software",
      eyebrow: "Software Development",
      title: "Software custom untuk workflow yang terlalu spesifik bagi template generik.",
      description:
        "Cocok untuk dashboard internal, POS, CRM, otomasi operasional, dan integrasi proses bisnis yang butuh sistem kerja sendiri.",
      href: "/software",
      bullets: ["POS & dashboard", "CRM & operasional", "Integrasi proses"],
    },
    {
      key: "support",
      eyebrow: "IT Support & Infra",
      title: "Lapisan support teknis agar bisnis tetap jalan setelah build selesai.",
      description:
        "Layanan support, network setup, administrasi server, dan konsultasi digital dirangkum sebagai continuity layer, bukan add-on acak.",
      href: "/services",
      bullets: ["IT support", "Network setup", "System administration"],
    },
    {
      key: "printing",
      eyebrow: "Printing & Design",
      title: "Percetakan yang ditempatkan sebagai output bisnis, bukan sekadar list produk cetak.",
      description:
        "Buku, brosur, kalender, dan materi promosi diposisikan sebagai perpanjangan dari trust, sales, dan delivery bisnis.",
      href: "/percetakan",
      bullets: ["Cetak buku", "Brosur & kalender", "Materi promosi"],
    },
  ] satisfies HomePrepareLane[],
  highlights: [
    {
      title: "One-stop execution",
      description:
        "Website, software, support, dan printing dibaca sebagai empat lane yang bisa berdiri sendiri, tetapi tetap dirakit menjadi delivery system saat dibutuhkan.",
      bullets: [
        "Satu partner untuk build dan operasional",
        "Lebih sedikit handoff antar vendor",
        "Narasi bisnis lebih konsisten dari online ke offline",
      ],
    },
    {
      title: "Technical follow-through",
      description:
        "Nilai Kotacom bukan hanya di build awal, tetapi di kemampuan menjaga ritme setelah launch: support, iteration, maintenance, dan penyesuaian.",
      bullets: [
        "Scope lebih mudah diprioritaskan",
        "Dukungan teknis pasca-go-live lebih jelas",
        "Transisi dari pemasaran ke operasional lebih halus",
      ],
    },
    {
      title: "Commercial clarity",
      description:
        "Homepage lama punya banyak aset bagus, tetapi tersebar. Versi ini merapikan pesan supaya pengunjung langsung mengerti apa yang dijual, untuk siapa, dan langkah berikutnya.",
      bullets: [
        "Value proposition lebih cepat tertangkap",
        "CTA lebih fokus",
        "Lebih siap untuk hybrid content dan eksperimen CMS",
      ],
    },
  ] satisfies HomePrepareHighlight[],
  serviceClusters: [
    {
      title: "Dukungan IT Profesional",
      description:
        "Bagian ini mengambil semangat layanan support dari homepage live, lalu merapikannya ke offer yang mudah dipahami sebagai penjaga operasional.",
      href: "/services",
      priceHint: "Mulai dari support insidental hingga maintenance rutin",
      bullets: ["Macbook & Windows service", "Server maintenance", "Pengadaan alat IT"],
    },
    {
      title: "Jasa Pembuatan Website & Software",
      description:
        "Website dan software disatukan sebagai lane build utama, karena di banyak kasus prospek sebenarnya mencari solusi proses, bukan kategori teknis.",
      href: "/pembuatan-website",
      priceHint: "Mulai dari website bisnis hingga aplikasi custom",
      bullets: ["Website sekolah & perusahaan", "Custom web apps", "CRM, CMS, dashboard"],
    },
    {
      title: "Layanan Percetakan",
      description:
        "Printing tetap muncul kuat, tetapi sekarang terbaca sebagai pelengkap trust dan distribusi materi bisnis, bukan cabang yang terlepas dari narasi utama.",
      href: "/percetakan",
      priceHint: "Untuk buku, kalender, seminar kit, dan materi promosi",
      bullets: ["Jasa cetak buku", "Kalender & seminar kit", "Map, brosur, dan lainnya"],
    },
  ] satisfies HomePrepareServiceCluster[],
  closingTitle:
    "Struktur ini sudah cukup dekat ke home live, tetapi sekarang lebih siap dibaca, diuji, dan dipromosikan saat narasinya benar-benar matang.",
  closingDescription:
    "Bagian code-owned menjaga struktur inti tetap konsisten, sementara block Sanity di atas dan bawah memberi ruang untuk eksperimen hero, proof, dan CTA tanpa membongkar keseluruhan homepage.",
} as const;
