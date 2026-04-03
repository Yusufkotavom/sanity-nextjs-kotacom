import type { LegacyAstroPage } from "../astro-static";
import { DEFAULT_CTA } from "./constants";
import { buildGenericCopy } from "./core";
import type { LegacyRewriteCopy } from "./types";
import { titleCaseFromSlug } from "./utils";

export function buildWebsiteCityCopy(page: LegacyAstroPage): LegacyRewriteCopy {
  const city = titleCaseFromSlug(page.slug);
  const primaryKeyword = `Jasa Pembuatan Website ${city}`;

  return {
    primaryKeyword,
    secondaryKeywords: [
      `Pembuatan website ${city}`,
      `Website company profile ${city}`,
      `Jasa web profesional ${city}`,
      `Pembuatan landing page ${city}`,
      `Website SEO friendly ${city}`,
      `Website toko online ${city}`,
    ],
    description: `${primaryKeyword} untuk bisnis lokal yang membutuhkan website modern, SEO friendly, cepat diakses, dan siap dipakai untuk lead generation, company profile, maupun toko online.`,
    intro: `Kami membantu bisnis di ${city} membangun website yang fokus ke konversi, kecepatan, dan kredibilitas brand agar lebih mudah menangkap peluang dari traffic organik maupun iklan. Coverage ini juga kami perluas untuk intent yang sering muncul di live site seperti company profile, toko online, dan landing page bisnis lokal.`,
    highlights: [
      "Arsitektur halaman dibuat sesuai intent pencarian.",
      "Optimasi performa dan struktur SEO on-page sejak awal.",
      "Komponen konten reusable agar update lebih cepat.",
      "CTA dan alur kontak dioptimalkan untuk lead.",
    ],
    process: [
      "Audit kebutuhan bisnis dan kompetitor lokal.",
      "Penyusunan struktur halaman dan copy framework.",
      "Implementasi UI, konten, dan optimasi teknis.",
      "Go-live, monitoring, dan iterasi konversi.",
    ],
    faqs: [
      {
        question: `Apakah layanan ini khusus untuk bisnis di ${city}?`,
        answer:
          "Utamanya untuk kebutuhan pasar lokal, tetapi dapat disesuaikan untuk target nasional dengan pendekatan konten yang berbeda.",
      },
      {
        question: "Apakah website sudah siap SEO dari awal?",
        answer:
          "Ya. Struktur heading, metadata, internal linking, dan kecepatan halaman disiapkan dari tahap build.",
      },
      {
        question: `Apakah bisa dibuat website company profile, toko online, atau landing page untuk bisnis di ${city}?`,
        answer:
          "Bisa. Struktur dan CTA kami sesuaikan dengan model bisnis Anda, apakah fokusnya company profile, penjualan produk, akuisisi lead, atau kombinasi beberapa tujuan sekaligus.",
      },
    ],
    ctaLinks: [
      { label: `Konsultasi Website ${city}`, href: DEFAULT_CTA },
      { label: "Lihat Harga Website", href: "/pembuatan-website/harga" },
      { label: "Website Company Profile", href: "/pembuatan-website/jasa-pembuatan-website-company-profile" },
      { label: "Website Toko Online", href: "/pembuatan-website/jasa-pembuatan-website-toko-online" },
    ],
    ctaLabel: `Konsultasi Website ${city}`,
    ctaHref: DEFAULT_CTA,
  };
}

export function buildWebsiteIndexCopy(): LegacyRewriteCopy {
  return {
    primaryKeyword: "Jasa Pembuatan Website",
    secondaryKeywords: [
      "Jasa pembuatan website profesional",
      "Pembuatan website bisnis",
      "Website company profile",
      "Website siap SEO",
      "Jasa web developer Indonesia",
    ],
    description:
      "Jasa pembuatan website untuk bisnis yang membutuhkan tampilan kredibel, performa cepat, dan struktur SEO yang siap dikembangkan.",
    intro:
      "Kami membantu bisnis membangun website yang tidak hanya menarik secara visual, tetapi juga siap mendukung traffic organik, campaign iklan, dan konversi lead.",
    highlights: [
      "Struktur halaman disusun berdasarkan intent pencarian.",
      "Desain dan copy diarahkan untuk meningkatkan konversi.",
      "Optimasi performa, metadata, dan internal linking sejak awal.",
      "Website mudah dikembangkan untuk kebutuhan jangka panjang.",
    ],
    process: [
      "Audit tujuan bisnis, audience, dan positioning layanan.",
      "Penyusunan arsitektur halaman serta keyword mapping.",
      "Eksekusi desain, development, dan QA teknis.",
      "Launch, monitoring performa, dan iterasi konversi.",
    ],
    faqs: [
      {
        question: "Apakah website bisa dikembangkan bertahap?",
        answer:
          "Bisa. Kami menyusun fondasi yang fleksibel agar fitur dan konten baru dapat ditambahkan tanpa mengulang dari awal.",
      },
      {
        question: "Apakah website sudah siap untuk SEO dan iklan?",
        answer:
          "Ya. Struktur teknis, kecepatan, metadata, dan alur CTA disiapkan agar mendukung akuisisi dari organik maupun paid traffic.",
      },
    ],
    ctaLabel: "Mulai Proyek Website",
    ctaHref: DEFAULT_CTA,
  };
}

export function buildWebsiteServiceCopy(page: LegacyAstroPage): LegacyRewriteCopy {
  const serviceName = titleCaseFromSlug(page.slug);
  const primaryKeyword = `Jasa ${serviceName}`;

  const presets: Record<string, Partial<LegacyRewriteCopy>> = {
    harga: {
      primaryKeyword: "Harga Jasa Pembuatan Website",
      secondaryKeywords: [
        "Biaya pembuatan website",
        "Paket website bisnis",
        "Harga website company profile",
        "Estimasi biaya web profesional",
      ],
      description:
        "Informasi harga jasa pembuatan website yang transparan, dengan paket fleksibel sesuai kebutuhan bisnis dan target pertumbuhan.",
      intro:
        "Halaman ini membantu Anda memahami komponen biaya website, scope pekerjaan, dan opsi paket agar keputusan investasi digital lebih terukur.",
      ctaLabel: "Minta Estimasi Harga",
    },
    "jasa-migrasi-wordpress": {
      primaryKeyword: "Jasa Migrasi WordPress",
      secondaryKeywords: [
        "Migrasi website WordPress",
        "Pindah hosting WordPress aman",
        "Migrasi konten dan database",
        "Optimasi WordPress pasca migrasi",
      ],
      description:
        "Jasa migrasi WordPress aman untuk memindahkan situs, database, dan aset tanpa mengganggu performa dan visibilitas SEO.",
      intro:
        "Kami menangani proses migrasi WordPress end-to-end mulai dari backup, transfer, validasi fungsi, sampai optimasi pasca pindah server/platform.",
      ctaLabel: "Konsultasi Migrasi WordPress",
    },
    "jasa-pembuatan-website-company-profile": {
      primaryKeyword: "Jasa Pembuatan Website Company Profile",
      secondaryKeywords: [
        "Website company profile profesional",
        "Website profil perusahaan",
        "Web branding bisnis",
        "Pembuatan website corporate",
      ],
      description:
        "Jasa pembuatan website company profile untuk memperkuat kredibilitas brand, memperjelas layanan, dan mendukung akuisisi klien.",
      intro:
        "Kami menyusun website company profile dengan struktur konten yang jelas agar calon klien cepat memahami value perusahaan Anda.",
      ctaLabel: "Buat Website Company Profile",
    },
    "jasa-pembuatan-website-dokter-klinik": {
      primaryKeyword: "Jasa Pembuatan Website Dokter Klinik",
      secondaryKeywords: [
        "Website klinik profesional",
        "Website praktik dokter",
        "Website layanan kesehatan",
        "Website klinik siap SEO",
      ],
      description:
        "Jasa pembuatan website dokter dan klinik untuk meningkatkan kredibilitas layanan kesehatan dan memudahkan pasien menemukan informasi penting.",
      intro:
        "Kami membantu klinik dan praktik dokter membangun website informatif, terpercaya, dan mudah diakses untuk mendukung akuisisi pasien.",
      ctaLabel: "Konsultasi Website Klinik",
    },
    "jasa-pembuatan-website-expedisi": {
      primaryKeyword: "Jasa Pembuatan Website Expedisi",
      secondaryKeywords: [
        "Website perusahaan ekspedisi",
        "Website logistik profesional",
        "Website jasa pengiriman",
        "Website tracking layanan",
      ],
      description:
        "Jasa pembuatan website expedisi untuk menampilkan layanan pengiriman, area cakupan, dan keunggulan operasional secara jelas.",
      intro:
        "Website expedisi kami rancang agar pelanggan mudah memahami layanan, biaya, dan proses pengiriman sehingga meningkatkan konversi inquiry.",
      ctaLabel: "Bangun Website Expedisi",
    },
    "jasa-pembuatan-website-komunitas-ngo": {
      primaryKeyword: "Jasa Pembuatan Website Komunitas NGO",
      secondaryKeywords: [
        "Website NGO profesional",
        "Website organisasi sosial",
        "Website komunitas nirlaba",
        "Website kampanye sosial",
      ],
      description:
        "Jasa pembuatan website komunitas dan NGO untuk memperkuat komunikasi program, kredibilitas organisasi, dan dukungan publik.",
      intro:
        "Kami membantu NGO dan komunitas membangun website yang mudah dikelola untuk publikasi program, transparansi kegiatan, dan penguatan engagement.",
      ctaLabel: "Konsultasi Website NGO",
    },
    "jasa-pembuatan-website-konstruksi": {
      primaryKeyword: "Jasa Pembuatan Website Konstruksi",
      secondaryKeywords: [
        "Website perusahaan konstruksi",
        "Website kontraktor profesional",
        "Website portofolio proyek konstruksi",
        "Website tender dan layanan konstruksi",
      ],
      description:
        "Jasa pembuatan website konstruksi untuk menampilkan portofolio proyek, kompetensi teknis, dan kredibilitas perusahaan secara profesional.",
      intro:
        "Website konstruksi kami fokuskan pada penyajian portofolio proyek, layanan inti, dan keunggulan perusahaan agar mendukung peluang tender maupun klien baru.",
      ctaLabel: "Buat Website Konstruksi",
    },
    "jasa-pembuatan-website-sekolah": {
      primaryKeyword: "Jasa Pembuatan Website Sekolah",
      secondaryKeywords: [
        "Website sekolah modern",
        "Website pendidikan profesional",
        "Website informasi akademik",
        "Website profil sekolah",
      ],
      description:
        "Jasa pembuatan website sekolah untuk menyajikan profil institusi, informasi akademik, dan komunikasi orang tua-siswa secara terstruktur.",
      intro:
        "Kami membantu sekolah membangun website yang informatif dan mudah diakses agar komunikasi institusi, publikasi kegiatan, dan branding pendidikan lebih efektif.",
      ctaLabel: "Konsultasi Website Sekolah",
    },
    "jasa-pembuatan-website-toko-online": {
      primaryKeyword: "Jasa Pembuatan Website Toko Online",
      secondaryKeywords: [
        "Website e-commerce custom",
        "Website toko online profesional",
        "Pembuatan website jualan online",
        "Website katalog produk",
      ],
      description:
        "Jasa pembuatan website toko online untuk bisnis yang ingin meningkatkan penjualan dengan pengalaman belanja yang cepat dan terpercaya.",
      intro:
        "Website toko online kami rancang untuk memudahkan pelanggan menemukan produk, memahami keunggulan, dan melakukan transaksi dengan nyaman.",
      ctaLabel: "Bangun Website Toko Online",
    },
    template: {
      primaryKeyword: "Template Website Siap Pakai",
      secondaryKeywords: [
        "Template website bisnis",
        "Desain website profesional",
        "Template landing page",
        "Template company profile",
      ],
      description:
        "Template website siap pakai untuk mempercepat proses go-live bisnis tanpa mengorbankan kualitas struktur dan tampilan.",
      intro:
        "Kami menyediakan opsi template website untuk bisnis yang membutuhkan implementasi cepat dengan fondasi desain dan konten yang tetap profesional.",
      ctaLabel: "Pilih Template Website",
    },
    portfolio: {
      primaryKeyword: "Portfolio Website Kotacom",
      secondaryKeywords: [
        "Portofolio pembuatan website",
        "Contoh website bisnis",
        "Hasil proyek website",
        "Referensi desain website profesional",
      ],
      description:
        "Portfolio pembuatan website Kotacom berisi contoh implementasi untuk berbagai industri, dengan fokus hasil bisnis dan kualitas eksekusi.",
      intro:
        "Halaman portfolio ini menampilkan contoh pendekatan desain, struktur konten, dan strategi implementasi website yang telah kami kerjakan.",
      ctaLabel: "Diskusikan Proyek Website Anda",
    },
  };

  return {
    ...buildGenericCopy(page),
    primaryKeyword,
    secondaryKeywords: [
      `${serviceName} profesional`,
      `${serviceName} untuk bisnis`,
      `${serviceName} terpercaya`,
      `${serviceName} Indonesia`,
    ],
    description: `${primaryKeyword} dengan pendekatan strategis untuk kebutuhan bisnis yang membutuhkan website terstruktur, cepat, dan siap scale.`,
    intro: `${primaryKeyword} kami dirancang agar website tidak hanya terlihat baik, tetapi juga mendukung akuisisi lead dan kredibilitas brand.`,
    ctaLabel: `Konsultasi ${serviceName}`,
    ...presets[page.slug],
    ctaHref: DEFAULT_CTA,
  };
}
