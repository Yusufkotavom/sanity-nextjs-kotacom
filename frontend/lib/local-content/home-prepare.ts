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

export type HomePrepareWorkflowStep = {
  title: string;
  description: string;
};

export type HomePrepareAssurance = {
  label: string;
  value: string;
};

export const homePrepareContent = {
  eyebrow: "KOTACOM",
  title:
    "Solusi IT, website, software, support, dan percetakan untuk bisnis yang butuh partner eksekusi.",
  description:
    "Kotacom membantu bisnis membangun fondasi digital yang rapi, menjalankan operasional yang lebih stabil, dan menyiapkan materi promosi yang siap dipakai untuk tumbuh.",
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
      title: "Website profesional yang jelas, cepat, dan siap mendukung penjualan.",
      description:
        "Untuk company profile, landing page, sekolah, toko online, dan kebutuhan promosi yang perlu struktur informasi rapi serta alur konversi yang kuat.",
      href: "/pembuatan-website",
      bullets: ["Company profile", "Landing page", "Toko online"],
    },
    {
      key: "software",
      eyebrow: "Software Development",
      title: "Software custom untuk proses bisnis yang tidak bisa diselesaikan template umum.",
      description:
        "Cocok untuk dashboard internal, POS, CRM, otomasi operasional, dan integrasi proses yang perlu sistem kerja sendiri.",
      href: "/software",
      bullets: ["POS & dashboard", "CRM & operasional", "Integrasi proses"],
    },
    {
      key: "support",
      eyebrow: "IT Support & Infra",
      title: "Support teknis dan infrastruktur agar operasional tetap stabil setiap hari.",
      description:
        "Layanan support, network setup, administrasi server, dan konsultasi teknis untuk menjaga ritme kerja tim tetap lancar.",
      href: "/services",
      bullets: ["IT support", "Network setup", "System administration"],
    },
    {
      key: "printing",
      eyebrow: "Printing & Design",
      title: "Percetakan dan materi promosi yang siap dipakai untuk membangun trust dan distribusi.",
      description:
        "Buku, brosur, kalender, seminar kit, dan materi promosi lain yang dirancang untuk kebutuhan bisnis, event, dan branding.",
      href: "/percetakan",
      bullets: ["Cetak buku", "Brosur & kalender", "Materi promosi"],
    },
  ] satisfies HomePrepareLane[],
  workflow: [
    {
      title: "Pahami kebutuhan bisnis",
      description:
        "Kami mulai dari tujuan, hambatan operasional, dan target yang ingin dicapai agar solusi yang dibuat benar-benar relevan.",
    },
    {
      title: "Susun solusi yang realistis",
      description:
        "Setelah arahnya jelas, kami bantu memetakan prioritas, scope kerja, timeline, dan bentuk implementasi yang paling masuk akal.",
    },
    {
      title: "Eksekusi dan pendampingan",
      description:
        "Pekerjaan tidak berhenti saat rilis. Kami lanjutkan dengan support, evaluasi, dan penyesuaian agar hasilnya tetap berguna di lapangan.",
    },
  ] satisfies HomePrepareWorkflowStep[],
  highlights: [
    {
      title: "Satu partner, lebih sedikit handoff",
      description:
        "Website, software, support, dan printing bisa berjalan sendiri-sendiri, tetapi akan jauh lebih efektif ketika dirancang sebagai satu alur kerja yang saling mendukung.",
      bullets: [
        "Satu partner untuk build dan operasional",
        "Lebih sedikit handoff antar vendor",
        "Narasi bisnis lebih konsisten dari online ke offline",
      ],
    },
    {
      title: "Dari build sampai pendampingan",
      description:
        "Nilai Kotacom bukan hanya di build awal, tetapi di kemampuan menjaga ritme setelah launch lewat support, iterasi, maintenance, dan penyesuaian yang dibutuhkan bisnis.",
      bullets: [
        "Scope lebih mudah diprioritaskan",
        "Dukungan teknis pasca-go-live lebih jelas",
        "Transisi dari pemasaran ke operasional lebih halus",
      ],
    },
    {
      title: "Pesan layanan lebih mudah dipahami",
      description:
        "Pengunjung perlu cepat mengerti apa yang dikerjakan Kotacom, siapa yang dibantu, dan langkah berikutnya tanpa harus membaca terlalu banyak penjelasan teknis.",
      bullets: [
        "Value proposition lebih cepat tertangkap",
        "CTA lebih fokus",
        "Struktur layanan lebih mudah dipindai",
      ],
    },
  ] satisfies HomePrepareHighlight[],
  serviceClusters: [
    {
      title: "Dukungan IT Profesional",
      description:
        "Layanan support yang membantu bisnis menjaga perangkat, jaringan, server, dan kebutuhan teknis tetap siap dipakai tanpa mengganggu ritme kerja.",
      href: "/services",
      priceHint: "Mulai dari support insidental hingga maintenance rutin",
      bullets: ["Macbook & Windows service", "Server maintenance", "Pengadaan alat IT"],
    },
    {
      title: "Jasa Pembuatan Website & Software",
      description:
        "Website dan software kami susun sebagai lane utama untuk bisnis yang ingin memperbaiki cara presentasi, cara kerja, dan alur penjualan sekaligus.",
      href: "/pembuatan-website",
      priceHint: "Mulai dari website bisnis hingga aplikasi custom",
      bullets: ["Website sekolah & perusahaan", "Custom web apps", "CRM, CMS, dashboard"],
    },
    {
      title: "Layanan Percetakan",
      description:
        "Percetakan kami posisikan sebagai pelengkap trust dan distribusi materi bisnis, mulai dari buku, seminar kit, sampai kebutuhan promosi offline.",
      href: "/percetakan",
      priceHint: "Untuk buku, kalender, seminar kit, dan materi promosi",
      bullets: ["Jasa cetak buku", "Kalender & seminar kit", "Map, brosur, dan lainnya"],
    },
  ] satisfies HomePrepareServiceCluster[],
  assurance: [
    {
      label: "Pendekatan terarah",
      value: "Kami bantu dari pemetaan kebutuhan sampai implementasi yang realistis.",
    },
    {
      label: "Eksekusi lintas layanan",
      value: "Website, software, support, dan percetakan bisa disusun sebagai satu alur kerja yang utuh.",
    },
    {
      label: "Siap ditindaklanjuti",
      value: "Konsultasi awal, penawaran, dan langkah mulai dirancang agar prospek bisa bergerak tanpa kebingungan.",
    },
  ] satisfies HomePrepareAssurance[],
  closingTitle: "Bangun solusi yang lebih rapi, lebih stabil, dan lebih siap dipakai untuk tumbuh.",
  closingDescription:
    "Jika bisnis Anda butuh partner untuk website, software, support, atau percetakan, Kotacom siap membantu memetakan kebutuhan dan menyiapkan langkah yang paling relevan.",
} as const;
