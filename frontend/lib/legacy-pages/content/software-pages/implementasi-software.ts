import { DEFAULT_CTA } from "../constants";
import { buildSoftwareIndexPageCopy } from "./software-index";
import type { LegacyRewriteCopy } from "../types";

export function buildImplementasiSoftwarePageCopy(): LegacyRewriteCopy {
  return {
    ...buildSoftwareIndexPageCopy(),
    primaryKeyword: "Jasa Implementasi Software Surabaya",
    secondaryKeywords: [
      "Implementasi sistem bisnis",
      "Deployment software perusahaan",
      "Go-live aplikasi bisnis",
      "Pendampingan adopsi software",
      "System integration Surabaya",
      "Deployment enterprise software",
    ],
    description:
      "Jasa implementasi software Surabaya untuk system integration, deployment, dan adopsi software bisnis agar go-live lebih stabil dan minim gangguan operasional.",
    intro:
      "Layanan implementasi software difokuskan pada fase go-live yang lebih aman, transisi yang lebih tertata, dan pendampingan awal agar software benar-benar siap dipakai oleh tim.",
    highlights: [
      "Fase transisi disiapkan agar perpindahan ke sistem baru lebih terkontrol.",
      "Training dan pendampingan awal membantu tim lebih cepat beradaptasi.",
      "Validasi data dan fungsi utama diprioritaskan sebelum software dipakai penuh.",
      "Stabilisasi pasca go-live membantu mengurangi gangguan pada operasional harian.",
    ],
    process: [
      "Audit kesiapan data, pengguna, dan alur kerja sebelum go-live.",
      "Susun checklist implementasi, training, dan kebutuhan transisi yang paling penting.",
      "Jalankan go-live bertahap dengan monitoring pada fungsi utama sistem.",
      "Lanjutkan fase stabilisasi untuk memperbaiki isu prioritas lebih cepat.",
    ],
    faqs: [
      {
        question: "Apa risiko terbesar saat implementasi software?",
        answer:
          "Biasanya ada pada kesiapan data, kebiasaan pengguna, dan perubahan proses kerja. Karena itu implementasi perlu dibarengi checklist transisi yang jelas.",
      },
      {
        question: "Apakah implementasi selalu perlu training tim?",
        answer:
          "Dalam banyak kasus iya, karena training membantu pengguna memahami alur baru lebih cepat dan mengurangi kesalahan saat awal pemakaian.",
      },
      {
        question: "Apakah ada pendampingan setelah software live?",
        answer:
          "Ada. Fase setelah go-live biasanya dipakai untuk monitoring, perbaikan isu prioritas, dan penyesuaian kecil agar adopsi sistem lebih stabil.",
      },
    ],
    ctaLabel: "Konsultasi Implementasi",
    ctaHref: DEFAULT_CTA,
  };
}
