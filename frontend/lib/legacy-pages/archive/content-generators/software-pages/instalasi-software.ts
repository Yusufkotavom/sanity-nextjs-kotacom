import { DEFAULT_CTA } from "../constants";
import { buildSoftwareIndexPageCopy } from "./software-index";
import type { LegacyRewriteCopy } from "../types";

export function buildInstalasiSoftwarePageCopy(): LegacyRewriteCopy {
  return {
    ...buildSoftwareIndexPageCopy(),
    primaryKeyword: "Instalasi Software Perusahaan",
    secondaryKeywords: [
      "Instalasi aplikasi bisnis",
      "Konfigurasi software operasional",
      "Setup sistem perusahaan",
      "Instalasi software aman",
    ],
    description:
      "Jasa instalasi software perusahaan dengan proses konfigurasi terstruktur, validasi teknis, dan dokumentasi handover.",
    intro:
      "Layanan instalasi software membantu bisnis menyiapkan sistem agar bisa dipakai dengan konfigurasi yang benar, alur fungsi yang sudah diuji, dan panduan penggunaan yang lebih jelas.",
    highlights: [
      "Konfigurasi awal disusun agar software siap dipakai tanpa langkah yang membingungkan.",
      "Pengujian fungsi utama dilakukan setelah setup untuk mengurangi risiko error saat dipakai.",
      "Dokumentasi dan handover membantu tim memahami sistem lebih cepat.",
      "Instalasi dapat disesuaikan dengan kebutuhan infrastruktur dan ritme operasional bisnis.",
    ],
    process: [
      "Pelajari lingkungan instalasi, pengguna, dan kebutuhan setup yang paling penting.",
      "Lakukan konfigurasi software dan komponen pendukung sesuai scope penggunaan.",
      "Uji fungsi inti agar sistem siap dipakai dengan lebih aman.",
      "Serahkan dokumentasi singkat dan arahan penggunaan untuk tim pengelola.",
    ],
    faqs: [
      {
        question: "Apa bedanya instalasi software dengan implementasi software?",
        answer:
          "Instalasi lebih fokus pada setup dan konfigurasi teknis, sedangkan implementasi biasanya mencakup transisi proses kerja, training, dan pendampingan setelah go-live.",
      },
      {
        question: "Apakah instalasi selalu perlu dokumentasi?",
        answer:
          "Sebaiknya iya, karena dokumentasi membantu tim memahami setup dasar, langkah penggunaan, dan tindak lanjut jika ada perubahan kecil setelah sistem aktif.",
      },
    ],
    ctaLabel: "Jadwalkan Instalasi",
    ctaHref: DEFAULT_CTA,
  };
}
