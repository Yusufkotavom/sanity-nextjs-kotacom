import { DEFAULT_CTA } from "../constants";
import type { LegacyRewriteCopy } from "../types";
import { buildWebsiteIndexPageCopy } from "./website-index";

export function buildWebsiteKonstruksiPageCopy(): LegacyRewriteCopy {
  return {
    ...buildWebsiteIndexPageCopy(),
    primaryKeyword: "Jasa Pembuatan Website Konstruksi",
    secondaryKeywords: [
      "Website perusahaan konstruksi",
      "Website kontraktor profesional",
      "Website portofolio proyek konstruksi",
      "Website tender dan layanan konstruksi",
      "Website company profile kontraktor",
      "Website proyek konstruksi B2B",
    ],
    description:
      "Jasa pembuatan website konstruksi untuk menampilkan portofolio proyek, kompetensi teknis, dan kredibilitas perusahaan secara lebih meyakinkan.",
    intro:
      "Website konstruksi kami fokuskan pada penyajian portofolio proyek, layanan inti, dan kredensial perusahaan agar peluang tender, partnership, dan inquiry proyek baru semakin kuat.",
    highlights: [
      "Portofolio proyek dan rekam jejak perusahaan ditata agar mudah dinilai calon klien.",
      "Profil layanan, sertifikasi, dan keunggulan teknis disajikan lebih meyakinkan.",
      "CTA diskusi proyek ditempatkan agar calon klien mudah melanjutkan pembicaraan.",
      "Website dapat diarahkan untuk kebutuhan branding perusahaan maupun jalur tender B2B.",
    ],
    process: [
      "Pelajari layanan inti, jenis proyek, dan target klien yang ingin dikejar perusahaan.",
      "Susun struktur halaman profil, layanan, portofolio, dan bukti kredibilitas utama.",
      "Bangun website yang tegas, rapi, dan memudahkan calon klien mengevaluasi kapabilitas perusahaan.",
      "Lanjutkan pengembangan konten proyek agar rekam jejak perusahaan terus bertambah kuat.",
    ],
    faqs: [
      {
        question: "Apa konten terpenting di website perusahaan konstruksi?",
        answer:
          "Biasanya meliputi profil perusahaan, layanan inti, portofolio proyek, sertifikasi, area kerja, dan CTA untuk diskusi atau permintaan penawaran.",
      },
      {
        question: "Apakah website konstruksi bisa membantu kebutuhan tender?",
        answer:
          "Bisa. Struktur yang tepat membantu evaluator atau calon klien melihat rekam jejak, kompetensi, dan dokumen pendukung dengan lebih cepat.",
      },
      {
        question: "Apakah setiap proyek perlu dibuatkan halaman sendiri?",
        answer:
          "Sering kali iya, terutama untuk proyek yang kuat secara visual atau strategis, karena halaman proyek membantu membangun trust dan keyword coverage yang lebih spesifik.",
      },
    ],
    ctaLabel: "Buat Website Konstruksi",
    ctaHref: DEFAULT_CTA,
  };
}
