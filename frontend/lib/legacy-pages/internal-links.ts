import type { LegacyAstroPage } from "./astro-static";

export type StrategicLink = {
  title: string;
  href: string;
};

const SECTION_LINKS: Record<string, StrategicLink[]> = {
  "pembuatan-website": [
    { title: "Layanan Website", href: "/services" },
    { title: "Artikel Website & SEO", href: "/blog/category/next-js" },
    { title: "Konsultasi Proyek", href: "/contact" },
  ],
  percetakan: [
    { title: "Layanan Percetakan", href: "/services" },
    { title: "Artikel Strategi Branding", href: "/blog" },
    { title: "Diskusi Kebutuhan Cetak", href: "/contact" },
  ],
  software: [
    { title: "Layanan Software", href: "/services" },
    { title: "Studi Kasus Pengembangan", href: "/blog/category/development" },
    { title: "Konsultasi Implementasi", href: "/contact" },
  ],
  "sistem-pos": [
    { title: "Layanan Software", href: "/services" },
    { title: "Artikel Operasional Bisnis", href: "/blog" },
    { title: "Konsultasi Sistem POS", href: "/contact" },
  ],
  layanan: [
    { title: "Service Catalog", href: "/services" },
    { title: "Produk Digital", href: "/products" },
    { title: "Hubungi Tim", href: "/contact" },
  ],
  about: [
    { title: "Layanan Utama", href: "/services" },
    { title: "Artikel Terbaru", href: "/blog" },
    { title: "Kontak", href: "/contact" },
  ],
  contact: [
    { title: "Tentang Kami", href: "/about" },
    { title: "Layanan", href: "/services" },
    { title: "Blog", href: "/blog" },
  ],
  privacy: [
    { title: "Tentang Kami", href: "/about" },
    { title: "Layanan", href: "/services" },
    { title: "Hubungi Tim", href: "/contact" },
  ],
};

export function getStrategicLinks(page: LegacyAstroPage): StrategicLink[] {
  return SECTION_LINKS[page.section] || [];
}
