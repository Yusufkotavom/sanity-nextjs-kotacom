import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  BookOpenText,
  Boxes,
  Gauge,
  LayoutTemplate,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Store,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LegacyAstroPage } from "@/lib/legacy-pages/astro-static";
import type { LegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";
import {
  KOTACOM_SPLIT_DEFAULT_ILLUSTRATION,
  kotacomSplitIllustrations,
} from "@/lib/illustrations/kotacom-split";

type RewriteLandingSectionsProps = {
  page: LegacyAstroPage;
  copy: LegacyRewriteCopy;
};

const ICON_MAP = {
  speed: Gauge,
  security: ShieldCheck,
  conversion: Rocket,
  design: LayoutTemplate,
  support: Users,
  ecommerce: ShoppingCart,
  boxes: Boxes,
  default: Sparkles,
} as const;

const BASE_TOC = [
  { id: "layanan", label: "Jenis Layanan" },
  { id: "paket", label: "Paket Harga" },
  { id: "fitur", label: "Fitur Unggulan" },
  { id: "portfolio", label: "Portfolio" },
  { id: "testimoni", label: "Testimoni" },
  { id: "faq", label: "Pertanyaan Umum" },
];

function getDefaultServiceTypes(page: LegacyAstroPage) {
  if (page.section === "percetakan") {
    return [
      {
        title: "Cetak Buku Satuan (POD)",
        description:
          "Cocok untuk penulis individu, dummy buku, atau kebutuhan cetak dengan kuantitas rendah namun tetap presisi.",
        href: "/percetakan/cetak-buku",
        image: kotacomSplitIllustrations.services.printing.pod,
      },
      {
        title: "Cetak Buku Massal (Offset)",
        description:
          "Produksi volume menengah hingga besar untuk penerbit, sekolah, dan lembaga dengan biaya per buku lebih efisien.",
        href: "/percetakan/cetak-buku",
        image: kotacomSplitIllustrations.services.printing.offset,
      },
      {
        title: "Finishing & Jilid Premium",
        description:
          "Pilihan jilid lem panas, jahit benang, hardcover, laminasi, dan finishing visual agar buku tampil profesional.",
        href: "/percetakan/cetak-buku",
        image: kotacomSplitIllustrations.services.printing.finishingJilid,
      },
    ];
  }

  return [
      {
        title: "Website Company Profile",
        description: "Meningkatkan kredibilitas brand dengan struktur konten profesional.",
        href: "/pembuatan-website/jasa-pembuatan-website-company-profile",
        image: kotacomSplitIllustrations.services.website.personalBrand,
      },
      {
        title: "Website Toko Online",
        description: "Mendukung penjualan online dengan alur belanja yang jelas dan cepat.",
        href: "/pembuatan-website/jasa-pembuatan-website-toko-online",
        image: kotacomSplitIllustrations.services.website.tokoOnline,
      },
      {
        title: "Website Custom",
        description: "Solusi website sesuai kebutuhan bisnis dan workflow operasional.",
        href: "/pembuatan-website/template",
        image: kotacomSplitIllustrations.services.it.softwareCustom,
      },
  ];
}

function getDefaultPricingPlans(page: LegacyAstroPage) {
  if (page.section === "percetakan") {
    return [
      {
        name: "Starter",
        price: "Mulai 500rb",
        description: "Untuk kebutuhan cetak basic dengan volume kecil-menengah.",
        items: ["Material standar", "Proofing basic", "Estimasi cepat"],
      },
      {
        name: "Growth",
        price: "Mulai 1,5jt",
        description: "Untuk bisnis yang butuh kualitas konsisten untuk campaign rutin.",
        items: [
          "Pilihan material lebih luas",
          "Quality check bertahap",
          "Prioritas produksi",
        ],
        recommended: true,
      },
      {
        name: "Scale",
        price: "Custom",
        description: "Untuk produksi volume tinggi atau kebutuhan finishing khusus.",
        items: ["Spesifikasi custom", "SLA proyek", "Pendampingan produksi"],
      },
    ];
  }

  return [
    {
      name: "Starter",
      price: "Mulai 1,5jt",
      description: "Untuk bisnis baru yang butuh website profesional cepat live.",
      items: ["Desain modern", "Halaman inti", "SEO basic"],
    },
    {
      name: "Growth",
      price: "Mulai 3,5jt",
      description: "Untuk bisnis yang fokus akuisisi lead dan konversi lebih tinggi.",
      items: ["Konten terstruktur", "Optimasi performa", "Konfigurasi conversion path"],
      recommended: true,
    },
    {
      name: "Scale",
      price: "Custom",
      description: "Untuk kebutuhan website custom dengan integrasi lanjutan.",
      items: ["Arsitektur khusus", "Integrasi tools", "Roadmap scale-up"],
    },
  ];
}

function getDefaultFeatures(page: LegacyAstroPage) {
  if (page.section === "percetakan") {
    return [
      {
        title: "Kualitas Cetak Stabil",
        description: "Kontrol warna dan hasil akhir dijaga agar output konsisten.",
        icon: "design",
      },
      {
        title: "Produksi Terukur",
        description: "Timeline produksi jelas dengan update progres di tiap fase.",
        icon: "speed",
      },
      {
        title: "Material Variatif",
        description: "Pilihan material dan finishing menyesuaikan tujuan campaign.",
        icon: "boxes",
      },
      {
        title: "Dukungan Konsultasi",
        description: "Bantu review file dan spesifikasi agar minim revisi saat produksi.",
        icon: "support",
      },
    ];
  }

  return [
    {
      title: "Loading Cepat",
      description: "Website dioptimalkan agar performa tetap cepat di perangkat mobile.",
      icon: "speed",
    },
    {
      title: "Fondasi SEO On-Page",
      description: "Struktur heading, metadata, dan internal linking disiapkan sejak awal.",
      icon: "conversion",
    },
    {
      title: "Keamanan Dasar",
      description: "Konfigurasi keamanan dan best practice teknis untuk meminimalkan risiko.",
      icon: "security",
    },
    {
      title: "Mudah Dikelola",
      description: "Konten website dibuat mudah di-update agar tim internal lebih mandiri.",
      icon: "support",
    },
  ];
}

function getDefaultProofItems(page: LegacyAstroPage) {
  const image = KOTACOM_SPLIT_DEFAULT_ILLUSTRATION;
  if (page.section === "percetakan") {
    return [
      {
        title: "Campaign Promosi Retail",
        description: "Produksi materi cetak promosi untuk seasonal campaign.",
        image: kotacomSplitIllustrations.proof.growthResults,
      },
      {
        title: "Corporate Branding Kit",
        description: "Paket cetak branding untuk kebutuhan presentasi perusahaan.",
        image: kotacomSplitIllustrations.proof.portfolioShowcase,
      },
      {
        title: "Event Printing Delivery",
        description: "Support kebutuhan cetak event dengan deadline ketat.",
        image: kotacomSplitIllustrations.proof.testimonial,
      },
    ];
  }

  return [
    {
      title: "Website Company Profile",
      description: "Implementasi website profil perusahaan dengan fokus kredibilitas.",
      image,
    },
    {
      title: "Website E-commerce",
      description: "Website penjualan online dengan struktur produk terarah.",
      image,
    },
    {
      title: "Landing Page Campaign",
      description: "Landing page untuk campaign lead generation dengan CTA fokus.",
      image,
    },
  ];
}

const DEFAULT_TESTIMONIALS = [
  {
    name: "Nadia A.",
    role: "Owner Bisnis Retail",
    quote:
      "Tim Kotacom membantu kami dari strategi sampai eksekusi. Proses rapi dan hasilnya langsung terasa di sisi operasional.",
  },
  {
    name: "Rizky P.",
    role: "Marketing Manager",
    quote:
      "Komunikasi cepat, timeline jelas, dan revisi terarah. Delivery project sangat membantu target campaign kami.",
  },
];

export default function RewriteLandingSections({
  page,
  copy,
}: RewriteLandingSectionsProps) {
  const tocItems = [...BASE_TOC];
  if (copy.ctaLinks?.length) {
    tocItems.push({ id: "cta-quick", label: "Aksi Cepat" });
    tocItems.push({ id: "cta-mid", label: "Konsultasi Cepat" });
  }
  if (copy.longGuide?.length) {
    tocItems.push({ id: "panduan", label: "Panduan Lengkap" });
  }
  const serviceTypes = copy.serviceTypes || getDefaultServiceTypes(page);
  const pricingPlans = copy.pricingPlans || getDefaultPricingPlans(page);
  const features = copy.features || getDefaultFeatures(page);
  const proofItems = copy.proofItems || getDefaultProofItems(page);
  const testimonials = copy.testimonials || DEFAULT_TESTIMONIALS;

  return (
    <>
      <section className="container section-divider py-12" id="toc">
        <div className="surface-muted rounded-2xl p-5 md:p-7">
          <p className="text-ui-label text-foreground/70">Navigasi Cepat</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tocItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                  className="inline-flex rounded-md border border-border/70 bg-background px-3 py-1.5 text-xs text-foreground/80 transition-colors hover:border-border hover:bg-accent/80 hover:text-foreground"
                >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {copy.ctaLinks?.length ? (
        <section className="container py-4" id="cta-quick">
          <div className="surface-card rounded-2xl p-5 md:p-7">
            <p className="text-ui-label text-primary/80">Aksi Cepat</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {copy.ctaLinks.map((item) => (
                <Button key={item.label} asChild size="sm" variant="outline">
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="container section-divider py-12" id="layanan">
        <div className="mb-4 flex items-center gap-2">
          <BookOpenText className="size-4 text-foreground/70" />
          <h2 className="text-xl font-semibold md:text-2xl">Jenis Layanan Utama</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {serviceTypes.map((item) => (
            <article key={item.title} className="surface-card rounded-xl p-5">
              {item.image ? (
                <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-lg border border-border/50">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
              ) : null}
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              {item.href ? (
                <Link
                  href={item.href}
                  className="mt-4 inline-flex text-xs font-medium text-primary hover:underline"
                >
                  Lihat detail
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="container section-divider py-12" id="paket">
        <div className="mb-4 flex items-center gap-2">
          <Store className="size-4 text-foreground/70" />
          <h2 className="text-xl font-semibold md:text-2xl">Paket & Investasi</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-xl p-5 ${
                plan.recommended
                  ? "border border-primary/40 bg-background shadow-[0_10px_30px_-18px_rgba(0,112,243,0.45)]"
                  : "surface-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">{plan.name}</h3>
                {plan.recommended ? (
                  <span className="inline-flex rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
                    Recommended
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-lg font-semibold">{plan.price}</p>
              <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {plan.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <BadgeCheck className="mt-0.5 size-4 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {copy.ctaLinks?.length ? (
        <section className="container section-divider py-8" id="cta-mid">
          <div className="rounded-2xl border border-primary/30 bg-primary/[0.06] p-5 md:p-6">
            <p className="text-ui-label text-primary/80">Butuh Arahan Cepat?</p>
            <h3 className="mt-2 text-lg font-semibold tracking-tight md:text-xl">
              Pilih jalur CTA yang paling sesuai kebutuhan Anda
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Kami sarankan mulai dari konsultasi awal agar scope, estimasi, dan prioritas kerja
              langsung jelas.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {copy.ctaLinks.slice(0, 4).map((item, index) => (
                <Button key={`${item.label}-${item.href}`} asChild size="sm" variant={index === 0 ? "default" : "outline"}>
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="container section-divider py-12" id="fitur">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="size-4 text-foreground/70" />
          <h2 className="text-xl font-semibold md:text-2xl">Fitur Unggulan</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature) => {
            const Icon =
              ICON_MAP[(feature.icon as keyof typeof ICON_MAP) || "default"] ||
              ICON_MAP.default;
            return (
              <article key={feature.title} className="surface-card rounded-xl p-5">
                <div className="flex items-start gap-3">
                    <span className="inline-flex size-9 items-center justify-center rounded-lg border border-violet-300/40 bg-violet-100/70 dark:bg-violet-950/30">
                    <Icon className="size-4 text-foreground/75" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold">{feature.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container section-divider py-12" id="portfolio">
        <div className="mb-4 flex items-center gap-2">
          <LayoutTemplate className="size-4 text-foreground/70" />
          <h2 className="text-xl font-semibold md:text-2xl">Portfolio & Bukti Kerja</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {proofItems.map((item) => (
            <article key={item.title} className="surface-card overflow-hidden rounded-xl">
              <div className="relative aspect-[16/9]">
                <Image
                  src={item.image || KOTACOM_SPLIT_DEFAULT_ILLUSTRATION}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container section-divider py-12" id="testimoni">
        <div className="mb-4 flex items-center gap-2">
          <Star className="size-4 text-foreground/70" />
          <h2 className="text-xl font-semibold md:text-2xl">Apa Kata Klien</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.map((item) => (
            <blockquote key={`${item.name}-${item.role}`} className="surface-card rounded-xl p-5">
              <p className="text-sm text-foreground/85">“{item.quote}”</p>
              <footer className="mt-3 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{item.name}</span> · {item.role}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {copy.longGuide?.length ? (
        <section className="container section-divider py-12" id="panduan">
          <div className="mb-4 flex items-center gap-2">
            <BookOpenText className="size-4 text-foreground/70" />
            <h2 className="text-xl font-semibold md:text-2xl">
              Panduan Lengkap Cetak Buku
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {copy.longGuide.map((item) => (
              <article
                key={item.title}
                className="surface-card rounded-xl p-5"
              >
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="container section-divider py-12" id="cta-final">
        <div className="rounded-2xl border border-primary/30 bg-background p-6 shadow-[0_16px_44px_-26px_rgba(0,112,243,0.5)] md:p-9">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight">
              {copy.finalCtaTitle || `Siap Mulai ${copy.primaryKeyword}?`}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              {copy.finalCtaDescription ||
                "Diskusikan kebutuhan Anda sekarang. Tim kami akan membantu menyusun scope, timeline, dan strategi implementasi yang realistis untuk bisnis Anda."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={copy.ctaHref}>{copy.ctaLabel || "Konsultasi Gratis Sekarang"}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#paket">Lihat Paket</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/percetakan">Lihat Layanan Percetakan</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#faq">Lihat FAQ</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
