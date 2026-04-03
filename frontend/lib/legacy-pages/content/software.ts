import type { LegacyAstroPage } from "../astro-static";
import { DEFAULT_CTA } from "./constants";
import type { LegacyRewriteCopy } from "./types";

export function buildSoftwareCopy(page: LegacyAstroPage): LegacyRewriteCopy {
  const title = page.title;
  const primaryKeyword =
    page.route === "/software" ? "Jasa Software Development Surabaya" : `Pengembangan ${title}`;

  return {
    primaryKeyword,
    secondaryKeywords:
      page.route === "/software"
        ? [
            "Software custom untuk bisnis",
            "Pengembangan aplikasi internal",
            "Sistem operasional terintegrasi",
            "Jasa software house Indonesia",
            "Implementasi dan instalasi software Surabaya",
            "Software enterprise dan UMKM",
          ]
        : [
            `${title} custom`,
            `${title} untuk operasional`,
            "Software bisnis terintegrasi",
            "Aplikasi internal perusahaan",
          ],
    description: `${primaryKeyword} untuk bisnis yang membutuhkan software custom, implementasi sistem, dan instalasi yang lebih terukur demi efisiensi operasional, visibilitas data, dan eksekusi tim yang lebih cepat.`,
    intro: `Kami membangun ${title.toLowerCase()} dengan pendekatan produk: requirement jelas, prioritas fitur terukur, dan implementasi bertahap agar cepat memberi dampak bisnis. Dibanding live site, rewrite ini kami perluas agar intent pencarian software custom, implementasi enterprise, dan instalasi operasional tertangkap lebih jelas dalam satu cluster SEO.`,
    highlights: [
      "Desain fitur berdasarkan alur kerja nyata tim.",
      "Skema data disiapkan agar mudah dikembangkan.",
      "Dashboard dan reporting fokus keputusan bisnis.",
      "Integrasi bertahap tanpa ganggu operasi berjalan.",
    ],
    process: [
      "Discovery proses bisnis dan bottleneck utama.",
      "Prioritas modul inti (MVP) untuk nilai tercepat.",
      "Pengembangan iteratif dengan demo berkala.",
      "Handover, dokumentasi, dan rencana scale-up.",
    ],
    faqs: [
      {
        question: "Apakah bisa integrasi dengan tools yang sudah dipakai?",
        answer:
          "Bisa. Integrasi direncanakan dari awal agar data flow tetap konsisten dan minim pekerjaan manual.",
      },
      {
        question: "Bagaimana pendekatan agar proyek tidak molor?",
        answer:
          "Scope dipecah per fase dengan indikator hasil yang jelas, sehingga prioritas dan delivery lebih terkontrol.",
      },
    ],
    ctaLabel:
      page.route === "/software"
        ? "Diskusi Pengembangan Software"
        : "Konsultasi Kebutuhan Software",
    ctaHref: DEFAULT_CTA,
  };
}

export function buildSoftwareDetailCopy(page: LegacyAstroPage): LegacyRewriteCopy {
  const presets: Record<string, Partial<LegacyRewriteCopy>> = {
    "implementasi-software": {
      primaryKeyword: "Jasa Implementasi Software Surabaya",
      secondaryKeywords: [
        "Implementasi sistem bisnis",
        "Deployment software perusahaan",
        "Go-live aplikasi internal",
        "Pendampingan adopsi software",
        "System integration Surabaya",
        "Deployment enterprise software",
      ],
      description:
        "Jasa implementasi software Surabaya untuk system integration, deployment, dan adopsi software bisnis agar go-live lebih stabil dan minim gangguan operasional.",
      ctaLabel: "Konsultasi Implementasi",
    },
    "instalasi-software": {
      primaryKeyword: "Instalasi Software Perusahaan",
      secondaryKeywords: [
        "Instalasi aplikasi bisnis",
        "Konfigurasi software operasional",
        "Setup sistem perusahaan",
        "Instalasi software aman",
      ],
      description:
        "Jasa instalasi software perusahaan dengan proses konfigurasi terstruktur, validasi teknis, dan dokumentasi handover.",
      ctaLabel: "Jadwalkan Instalasi",
    },
    "pembuatan-software": {
      primaryKeyword: "Jasa Pembuatan Software Custom Surabaya",
      secondaryKeywords: [
        "Pengembangan software custom",
        "Aplikasi bisnis sesuai workflow",
        "Sistem internal perusahaan",
        "Software operasional terintegrasi",
        "Custom software development Surabaya",
        "Aplikasi web dan mobile bisnis",
      ],
      description:
        "Jasa pembuatan software custom Surabaya untuk bisnis yang membutuhkan aplikasi web, mobile, dan sistem enterprise sesuai alur kerja internal dan target pertumbuhan.",
      ctaLabel: "Mulai Proyek Software",
    },
  };

  return { ...buildSoftwareCopy(page), ...(presets[page.slug] || {}) };
}
