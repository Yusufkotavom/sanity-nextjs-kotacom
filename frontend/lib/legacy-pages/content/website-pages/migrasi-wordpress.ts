import { DEFAULT_CTA } from "../constants";
import type { LegacyRewriteCopy } from "../types";
import { buildWebsiteIndexPageCopy } from "./website-index";

export function buildWebsiteMigrasiWordpressPageCopy(): LegacyRewriteCopy {
  return {
    ...buildWebsiteIndexPageCopy(),
    primaryKeyword: "Jasa Migrasi WordPress",
    secondaryKeywords: [
      "Migrasi website WordPress",
      "Pindah hosting WordPress aman",
      "Migrasi konten dan database",
      "Optimasi WordPress pasca migrasi",
      "Migrasi WordPress tanpa downtime",
      "Jasa pindah website WordPress",
    ],
    description:
      "Jasa migrasi WordPress aman untuk memindahkan website, database, dan aset dengan risiko downtime lebih rendah dan visibilitas SEO tetap terjaga.",
    intro:
      "Kami membantu proses migrasi WordPress mulai dari backup, pemindahan data, pengecekan fungsi, hingga validasi pasca pindah server atau platform agar website tetap stabil.",
    highlights: [
      "Migrasi dirancang untuk menekan risiko downtime dan error pada halaman penting.",
      "URL, metadata, dan elemen SEO utama dipantau agar performa pencarian tidak turun drastis.",
      "Konten, media, dan database dipindahkan dengan pengecekan bertahap.",
      "Tahap stabilisasi setelah migrasi membantu menemukan dan memperbaiki masalah lebih cepat.",
    ],
    process: [
      "Audit struktur website, plugin, tema, dan potensi risiko sebelum migrasi dimulai.",
      "Siapkan backup penuh serta rencana pemindahan file, database, dan konfigurasi.",
      "Lakukan migrasi bertahap lalu cek fungsi utama, tampilan halaman, dan alur form atau checkout.",
      "Validasi pasca migrasi untuk memastikan redirect, metadata, dan performa situs tetap aman.",
    ],
    faqs: [
      {
        question: "Apakah migrasi WordPress selalu membuat website down?",
        answer:
          "Tidak selalu. Dengan persiapan yang benar, perpindahan bisa direncanakan agar gangguan layanan tetap minimal.",
      },
      {
        question: "Apakah artikel, gambar, dan halaman lama ikut berpindah?",
        answer:
          "Ya. Konten, media, dan database dapat dipindahkan bersama selama struktur situs lama masih bisa diakses dan diaudit dengan baik.",
      },
      {
        question: "Apakah setelah migrasi website langsung selesai?",
        answer:
          "Biasanya masih ada fase pengecekan akhir untuk memastikan tampilan, fungsi, redirect, dan elemen SEO penting berjalan seperti yang diharapkan.",
      },
    ],
    ctaLabel: "Konsultasi Migrasi WordPress",
    ctaHref: DEFAULT_CTA,
  };
}
