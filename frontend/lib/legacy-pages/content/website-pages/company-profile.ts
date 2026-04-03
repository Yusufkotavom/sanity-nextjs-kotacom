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
      "Website company profile dan sistem management perusahaan",
      "Website company profile dengan CRM ERP HR management",
      "Dashboard admin dan client portal perusahaan",
      "Web branding bisnis",
      "Pembuatan website corporate",
    ],
    description:
      "Jasa pembuatan website company profile dan sistem management perusahaan untuk memperkuat kredibilitas brand, memperjelas layanan, dan membuka integrasi CRM, ERP, HR, serta client portal.",
    intro:
      "Kami menyusun website company profile yang tidak berhenti di tampilan profil perusahaan. Halaman ini diarahkan untuk perusahaan yang juga membutuhkan sistem management terintegrasi seperti CRM, ERP, HR management, dashboard admin, dan client portal dalam satu fondasi digital.",
    highlights: [
      "Website company profile disusun untuk memperkuat trust, positioning, dan akuisisi lead.",
      "Fondasi arsitektur siap dikembangkan ke CRM, ERP, HR management, dan dashboard internal.",
      "Client portal dan area login dapat dirancang sesuai kebutuhan operasional perusahaan.",
      "Struktur konten membantu calon klien, partner, dan investor memahami value perusahaan lebih cepat.",
    ],
    process: [
      "Audit kebutuhan branding, sales flow, dan proses operasional yang ingin didigitalisasi.",
      "Susun struktur company profile, trust signal, dan area fitur enterprise prioritas.",
      "Bangun halaman publik, dashboard admin, atau portal klien secara bertahap sesuai scope.",
      "Go-live dengan dokumentasi, handover, dan roadmap pengembangan sistem lanjutan.",
    ],
    faqs: [
      {
        question: "Apakah website company profile bisa sekaligus terhubung ke sistem internal perusahaan?",
        answer:
          "Bisa. Fondasi website dapat disiapkan agar mudah dikembangkan ke CRM, ERP, HR management, dashboard admin, atau portal klien sesuai kebutuhan operasional.",
      },
      {
        question: "Siapa target utama halaman company profile seperti ini?",
        answer:
          "Biasanya calon klien, partner, investor, dan tim procurement yang perlu menilai kredibilitas perusahaan sekaligus kesiapan proses bisnisnya.",
      },
      {
        question: "Apakah implementasi harus langsung full enterprise sejak awal?",
        answer:
          "Tidak. Umumnya kami mulai dari halaman company profile dan modul prioritas yang paling cepat memberi dampak bisnis, lalu dikembangkan bertahap.",
      },
    ],
    ctaLinks: [
      { label: "Konsultasi Website Company Profile", href: DEFAULT_CTA },
      { label: "Diskusikan CRM dan Dashboard", href: DEFAULT_CTA },
      { label: "Bandingkan Paket Website", href: "/pembuatan-website/harga" },
      { label: "Lihat FAQ Implementasi", href: "#faq" },
    ],
    ctaLabel: "Buat Website Company Profile",
    ctaHref: DEFAULT_CTA,
  };
}
