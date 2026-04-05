import { DEFAULT_CTA } from "../constants";
import type { LegacyRewriteCopy } from "../types";
import { buildWebsiteIndexPageCopy } from "./website-index";

export function buildWebsiteSekolahPageCopy(): LegacyRewriteCopy {
  return {
    ...buildWebsiteIndexPageCopy(),
    primaryKeyword: "Jasa Pembuatan Website Sekolah",
    secondaryKeywords: [
      "Website sekolah modern",
      "Website pendidikan profesional",
      "Website informasi akademik",
      "Website profil sekolah",
      "Website PPDB online",
      "Website sekolah untuk orang tua dan siswa",
    ],
    description:
      "Jasa pembuatan website sekolah untuk menyajikan profil institusi, informasi akademik, kegiatan, dan komunikasi resmi secara lebih terstruktur.",
    intro:
      "Kami membantu sekolah membangun website yang informatif dan mudah diakses agar komunikasi institusi, publikasi kegiatan, dan penyampaian informasi kepada orang tua serta calon siswa menjadi lebih efektif.",
    highlights: [
      "Profil sekolah, program, dan informasi penting ditampilkan lebih rapi dan mudah dibaca.",
      "Agenda akademik, berita sekolah, dan kegiatan dapat dipublikasikan lebih konsisten.",
      "Halaman PPDB atau pendaftaran bisa dibuat lebih jelas untuk orang tua dan calon siswa.",
      "Konten disusun agar mudah diperbarui oleh tim pengelola sekolah setelah website live.",
    ],
    process: [
      "Pelajari kebutuhan informasi sekolah, target pengunjung, dan jalur komunikasi yang paling sering dipakai.",
      "Susun struktur halaman profil, program, berita, kegiatan, dan pendaftaran agar lebih mudah dipahami.",
      "Bangun website yang ringan, nyaman diakses lewat mobile, dan mudah dikelola.",
      "Lanjutkan optimasi konten agar website sekolah tetap aktif dan informatif sepanjang tahun ajaran.",
    ],
    faqs: [
      {
        question: "Halaman apa saja yang biasanya penting di website sekolah?",
        answer:
          "Biasanya meliputi profil sekolah, program pendidikan, berita atau kegiatan, PPDB, kontak, dan halaman informasi penting untuk orang tua maupun siswa.",
      },
      {
        question: "Apakah website sekolah bisa dipakai untuk PPDB?",
        answer:
          "Bisa. Website dapat menampilkan informasi jalur pendaftaran, syarat, jadwal, dan CTA yang memudahkan orang tua mengikuti proses PPDB.",
      },
      {
        question: "Apakah website sekolah harus sering diperbarui?",
        answer:
          "Idealnya iya, karena update rutin membuat informasi tetap relevan dan membantu sekolah terlihat aktif di mata calon siswa dan orang tua.",
      },
    ],
    ctaLabel: "Konsultasi Website Sekolah",
    ctaHref: DEFAULT_CTA,
  };
}
