import { DEFAULT_CTA } from "./constants";
import { WEBSITE_PAGE_OVERRIDES } from "./website-pages/overrides";
import type { LegacyRewriteCopy } from "./types";

export const WEBSITE_PRIORITY_OVERRIDES: Record<string, Partial<LegacyRewriteCopy>> = {
  ...WEBSITE_PAGE_OVERRIDES,
  portfolio: {
    intro:
      "Portfolio tidak hanya untuk pajangan visual. Copy halaman ini dipoles agar calon klien bisa menilai pendekatan kerja, relevansi hasil, dan potensi dampak bisnis dari proyek yang sudah pernah dikerjakan.",
    ctaLabel: "Diskusikan Proyek Serupa",
    finalCtaTitle: "Ingin Hasil Sejenis untuk Bisnis Anda?",
    finalCtaDescription:
      "Pilih referensi proyek yang paling dekat dengan kebutuhan Anda, lalu tim kami susun strategi implementasi yang realistis.",
    faqs: [
      {
        question: "Bagaimana membaca portfolio agar sesuai dengan kebutuhan bisnis saya?",
        answer:
          "Fokus pada kesamaan tujuan bisnis, kompleksitas fitur, dan model audience. Tim kami dapat membantu memetakan relevansinya untuk konteks Anda.",
      },
      {
        question: "Apakah hasil portfolio bisa dijadikan baseline estimasi proyek?",
        answer:
          "Bisa sebagai acuan awal. Estimasi final tetap disesuaikan dengan scope detail, timeline, dan kebutuhan integrasi aktual.",
      },
    ],
  },
};
