import { DEFAULT_CTA } from "../constants";
import type { LegacyRewriteCopy } from "../types";
import { buildWebsiteIndexPageCopy } from "./website-index";

export function buildWebsiteCompanyProfilePageCopy(): LegacyRewriteCopy {
  return {
    ...buildWebsiteIndexPageCopy(),
    primaryKeyword: "Jasa Pembuatan Website Company Profile",
    secondaryKeywords: [
      "Website company profile profesional",
      "Website profil perusahaan",
      "Website company profile perusahaan",
      "Website profil perusahaan untuk lead",
      "Website corporate profesional",
      "Website branding bisnis",
      "Pembuatan website corporate",
    ],
    description:
      "Jasa pembuatan website company profile untuk perusahaan yang ingin tampil lebih kredibel, menjelaskan layanan dengan rapi, dan memudahkan calon klien menghubungi tim Anda.",
    intro:
      "Kami menyusun website company profile yang membantu perusahaan tampil lebih profesional, menjelaskan layanan dengan jelas, dan memberi jalur kontak yang meyakinkan bagi calon klien, partner, maupun tim procurement.",
    highlights: [
      "Website company profile disusun untuk memperkuat trust, positioning, dan akuisisi lead.",
      "Struktur konten memudahkan calon klien memahami profil, layanan, dan keunggulan perusahaan.",
      "Portofolio, testimoni, dan CTA kontak ditempatkan agar keputusan inquiry lebih cepat.",
      "Fondasi website tetap bisa dikembangkan saat bisnis membutuhkan fitur tambahan di tahap berikutnya.",
    ],
    process: [
      "Pelajari positioning bisnis, target klien, dan informasi yang paling penting untuk ditampilkan.",
      "Susun struktur halaman company profile, layanan, portofolio, dan trust signal utama.",
      "Bangun halaman publik yang rapi, mudah dinavigasi, dan siap menerima inquiry.",
      "Lanjutkan pengembangan bertahap jika nantinya dibutuhkan fitur tambahan atau area privat.",
    ],
    faqs: [
      {
        question: "Apa saja halaman penting di website company profile?",
        answer:
          "Biasanya meliputi profil perusahaan, layanan, portofolio, testimoni, FAQ, dan halaman kontak yang jelas agar calon klien mudah memahami bisnis Anda.",
      },
      {
        question: "Siapa target utama halaman company profile seperti ini?",
        answer:
          "Biasanya calon klien, partner, investor, dan tim procurement yang perlu menilai kredibilitas perusahaan sekaligus kesiapan proses bisnisnya.",
      },
      {
        question: "Apakah website company profile bisa membantu menghasilkan lead?",
        answer:
          "Bisa. Dengan struktur layanan yang jelas, bukti kerja yang kuat, dan CTA yang tepat, website company profile dapat menjadi pintu masuk inquiry yang lebih berkualitas.",
      },
    ],
    ctaLinks: [
      { label: "Konsultasi Website Company Profile", href: DEFAULT_CTA },
      { label: "Bandingkan Paket Website", href: "/pembuatan-website/harga" },
      { label: "Lihat Portfolio Website", href: "/pembuatan-website/portfolio" },
      { label: "Lihat FAQ Implementasi", href: "#faq" },
    ],
    ctaLabel: "Buat Website Company Profile",
    ctaHref: DEFAULT_CTA,
  };
}
