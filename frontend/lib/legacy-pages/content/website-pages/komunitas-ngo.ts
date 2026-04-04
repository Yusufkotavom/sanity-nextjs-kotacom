import { DEFAULT_CTA } from "../constants";
import type { LegacyRewriteCopy } from "../types";
import { buildWebsiteIndexPageCopy } from "./website-index";

export function buildWebsiteKomunitasNgoPageCopy(): LegacyRewriteCopy {
  return {
    ...buildWebsiteIndexPageCopy(),
    primaryKeyword: "Jasa Pembuatan Website Komunitas NGO",
    secondaryKeywords: [
      "Website NGO profesional",
      "Website organisasi sosial",
      "Website komunitas nirlaba",
      "Website kampanye sosial",
      "Website donasi online",
      "Website komunitas untuk program sosial",
    ],
    description:
      "Jasa pembuatan website komunitas dan NGO untuk memperkuat komunikasi program, kredibilitas organisasi, serta dukungan publik yang lebih terarah.",
    intro:
      "Kami membantu NGO dan komunitas membangun website yang mudah dikelola untuk mempublikasikan program, menunjukkan dampak kegiatan, dan memudahkan publik mengambil langkah dukungan.",
    highlights: [
      "Program, dampak, dan ajakan aksi ditampilkan agar publik lebih mudah memahami misi organisasi.",
      "Halaman donasi, relawan, atau kolaborasi bisa disusun dengan CTA yang lebih jelas.",
      "Update kegiatan dan berita komunitas dapat dikelola lebih konsisten oleh tim pengelola.",
      "Website membantu organisasi terlihat lebih kredibel saat menjangkau donor, relawan, dan partner.",
    ],
    process: [
      "Pelajari tujuan program, bentuk dukungan yang diharapkan, dan profil audiens utama organisasi.",
      "Susun struktur halaman tentang organisasi, program, dampak, berita, dan CTA aksi yang paling penting.",
      "Bangun website yang hangat, mudah dibaca, dan mendukung storytelling program secara jelas.",
      "Lanjutkan optimasi konten agar website terus mendukung kepercayaan publik dan partisipasi komunitas.",
    ],
    faqs: [
      {
        question: "Apa yang paling penting di website NGO atau komunitas?",
        answer:
          "Biasanya meliputi profil organisasi, program utama, bukti dampak, update kegiatan, cara berdonasi atau bergabung, dan kontak resmi.",
      },
      {
        question: "Apakah website NGO bisa membantu meningkatkan dukungan publik?",
        answer:
          "Bisa. Website yang menjelaskan dampak program dengan jelas dan memberi CTA yang tepat dapat membantu publik lebih cepat memutuskan untuk berdonasi, menjadi relawan, atau berkolaborasi.",
      },
      {
        question: "Apakah konten website NGO harus sering diperbarui?",
        answer:
          "Idealnya iya, karena update program dan hasil kegiatan membantu menjaga kepercayaan publik dan memperlihatkan organisasi tetap aktif.",
      },
    ],
    ctaLabel: "Konsultasi Website NGO",
    ctaHref: DEFAULT_CTA,
  };
}
