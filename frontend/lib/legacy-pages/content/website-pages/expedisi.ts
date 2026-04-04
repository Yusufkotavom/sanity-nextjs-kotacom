import { DEFAULT_CTA } from "../constants";
import type { LegacyRewriteCopy } from "../types";
import { buildWebsiteIndexPageCopy } from "./website-index";

export function buildWebsiteExpedisiPageCopy(): LegacyRewriteCopy {
  return {
    ...buildWebsiteIndexPageCopy(),
    primaryKeyword: "Jasa Pembuatan Website Expedisi",
    secondaryKeywords: [
      "Website perusahaan ekspedisi",
      "Website logistik profesional",
      "Website jasa pengiriman",
      "Website tracking layanan",
      "Website pengiriman barang",
      "Website logistik untuk lead B2B",
    ],
    description:
      "Jasa pembuatan website expedisi untuk menampilkan layanan pengiriman, area cakupan, dan jalur inquiry yang lebih jelas bagi calon klien.",
    intro:
      "Website expedisi kami rancang agar calon pelanggan mudah memahami layanan, area jangkauan, dan cara request pengiriman sehingga inquiry yang masuk lebih relevan.",
    highlights: [
      "Area layanan, jenis pengiriman, dan keunggulan operasional ditampilkan lebih cepat dipahami.",
      "Form inquiry dan CTA request dibuat agar calon klien tidak bingung saat ingin menghubungi tim Anda.",
      "Halaman layanan dapat dibagi menurut area, jenis armada, atau kategori pengiriman.",
      "Website membantu tim sales menerima prospek yang lebih siap dan lebih jelas kebutuhannya.",
    ],
    process: [
      "Pelajari jenis layanan, area coverage, dan profil klien yang ingin Anda targetkan.",
      "Susun struktur halaman layanan, area pengiriman, dan CTA request yang paling efektif.",
      "Bangun website yang menekankan kejelasan informasi dan kemudahan kontak di perangkat mobile.",
      "Lanjutkan optimasi konten dan form agar inquiry yang masuk semakin relevan untuk tim sales.",
    ],
    faqs: [
      {
        question: "Apa yang paling dicari calon klien di website expedisi?",
        answer:
          "Umumnya mereka ingin cepat mengetahui jenis layanan, area jangkauan, estimasi proses, dan cara request pengiriman atau penawaran.",
      },
      {
        question: "Apakah website expedisi cocok untuk target corporate?",
        answer:
          "Cocok. Website dapat disusun agar kebutuhan B2B seperti request penawaran, cakupan area, dan detail layanan lebih mudah ditindaklanjuti.",
      },
      {
        question: "Apakah perlu membuat halaman layanan per area atau per jenis pengiriman?",
        answer:
          "Sering kali iya, terutama jika layanan Anda berbeda menurut wilayah, kategori barang, atau kebutuhan klien tertentu.",
      },
    ],
    ctaLabel: "Bangun Website Expedisi",
    ctaHref: DEFAULT_CTA,
  };
}
