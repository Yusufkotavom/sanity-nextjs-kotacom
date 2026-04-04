import { DEFAULT_CTA } from "../constants";
import { buildGenericCopy } from "../core";
import type { LegacyRewriteCopy } from "../types";
import type { LegacyAstroPage } from "../../astro-static";

export function buildPercetakanCetakCompanyProfilePageCopy(
  page: LegacyAstroPage,
): LegacyRewriteCopy {
  return {
    ...buildGenericCopy(page),
    primaryKeyword: "Jasa Cetak Company Profile Surabaya",
    secondaryKeywords: [
      "Cetak company profile Surabaya",
      "Percetakan profil perusahaan",
      "Company profile cetak berkualitas",
      "Jasa cetak company profile cepat",
      "Percetakan company profile online",
      "Cetak company profile untuk tender",
      "Cetak company profile untuk presentasi bisnis",
    ],
    description:
      "Layanan cetak company profile Surabaya untuk bisnis yang membutuhkan materi presentasi yang rapi, kredibel, dan selaras dengan identitas brand perusahaan.",
    intro:
      "Butuh company profile yang rapi untuk presentasi ke klien, kebutuhan tender, atau materi perkenalan bisnis? Kami bantu mencetak company profile dengan bahan yang sesuai, finishing yang lebih meyakinkan, dan proses yang lebih aman dari tahap file sampai hasil akhir.",
    highlights: [
      "Cocok untuk presentasi klien, partnership, profil perusahaan, dan kebutuhan tender.",
      "Material dan finishing dapat dipilih sesuai kesan brand yang ingin ditampilkan.",
      "File dicek lebih dulu agar layout, margin, dan hasil cetak lebih aman.",
      "Produksi dapat disesuaikan untuk kebutuhan jumlah kecil maupun batch presentasi yang lebih besar.",
    ],
    process: [
      "Kirim desain atau konsep company profile beserta target penggunaannya.",
      "Kami bantu cek file, jumlah halaman, material, dan finishing yang paling sesuai.",
      "Produksi dimulai setelah spesifikasi dan tampilan akhir disetujui.",
      "Hasil cetak dicek sebelum dikemas dan dikirim ke lokasi tujuan.",
    ],
    faqs: [
      {
        question: "Apakah company profile cetak masih relevan untuk bisnis saat ini?",
        answer:
          "Masih relevan, terutama untuk presentasi tatap muka, tender, meeting klien, dan kebutuhan materi profil yang terasa lebih profesional saat dibagikan langsung.",
      },
      {
        question: "Finishing apa yang cocok untuk company profile yang ingin terlihat premium?",
        answer:
          "Biasanya menggunakan material cover yang lebih tebal dengan laminasi doff atau gloss, lalu bisa ditambah opsi seperti spot UV untuk menonjolkan detail tertentu.",
      },
      {
        question: "Apakah bisa konsultasi jumlah halaman dan spesifikasi sebelum cetak?",
        answer:
          "Bisa. Kami bantu mempertimbangkan jumlah halaman, ketebalan kertas, dan jenis jilid agar hasil akhir sesuai tujuan presentasi dan budget Anda.",
      },
    ],
    ctaLabel: "Konsultasi Cetak Company Profile",
    ctaHref: DEFAULT_CTA,
    ctaLinks: [
      { label: "Konsultasi Company Profile", href: DEFAULT_CTA },
      { label: "Minta Rekomendasi Material", href: DEFAULT_CTA },
      { label: "Lihat FAQ Company Profile", href: "#faq" },
      { label: "Bandingkan dengan Cetak Brosur", href: "/percetakan/cetak-brosur" },
    ],
    finalCtaTitle: "Siapkan Company Profile yang Lebih Meyakinkan untuk Presentasi Bisnis",
    finalCtaDescription:
      "Kirim desain atau konsep Anda, lalu kami bantu memilih spesifikasi cetak yang paling pas untuk kebutuhan presentasi, tender, atau partnership.",
    testimonials: [
      {
        name: "Irfan W.",
        role: "Business Development Manager",
        quote: "Buku company profile produksi di sini punya warna corporate yang akurat, laminasinya rapi banget. Mantap untuk presentasi tender."
      },
      {
        name: "Anita F.",
        role: "Direktur Agensi",
        quote: "Pilihan kertas isi dan hardcover-nya premium. Klien kami langsung terkesan hanya dari menyentuh buku profil kami."
      }
    ],
    longGuide: [
      {
        title: "Finishing Premium untuk Menonjolkan Identitas Perusahaan",
        description: "Gunakan Spot UV pada logo perusahaan di cover untuk memberikan efek timbul yang mengkilap, atau tambahkan laminasi Doff/Matte agar terasa lebih halus elegan saat dipegang klien. Keputusan finishing ini sangat mempengaruhi kesan pertama pembaca."
      },
      {
        title: "Standar Format File untuk Toleransi Jilid",
        description: "Pastikan margin bagian dalam (Gutter margins) dilebihkan minimal 1-2 cm agar teks tidak tenggelam saat company profile dijilid, khususnya pada penjilidan lem panas atau jahit benang."
      }
    ]
  };
}
