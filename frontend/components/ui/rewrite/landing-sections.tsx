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
import {
  SectionIntro,
  SectionPanel,
  SectionShell,
  SplitVisualPanel,
} from "@/components/ui/section-shell";
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
      <SectionShell id="toc">
        <SectionPanel tone="neutral" className="rounded-[1.75rem] p-5 md:p-7">
          <p className="text-ui-label text-foreground/70">Navigasi Cepat</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tocItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="inline-flex rounded-full border border-black/10 bg-white/70 px-3.5 py-1.5 text-xs text-foreground/80 transition-colors hover:border-black/15 hover:bg-white hover:text-foreground dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              >
                {item.label}
              </a>
            ))}
          </div>
        </SectionPanel>
      </SectionShell>

      {copy.ctaLinks?.length ? (
        <SectionShell id="cta-quick" divider={false} className="py-4">
          <SectionPanel tone="sky" className="rounded-[1.75rem] p-5 md:p-7">
            <p className="text-ui-label text-primary/80">Aksi Cepat</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {copy.ctaLinks.map((item) => (
                <Button key={item.label} asChild size="sm" variant="outline">
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
            </div>
          </SectionPanel>
        </SectionShell>
      ) : null}

      <SectionShell id="layanan">
        <SectionIntro
          eyebrow="Service Focus"
          title="Jenis Layanan Utama"
          description="Setiap section diarahkan ke pola visual-driven: satu pesan, satu visual, satu langkah lanjut yang jelas."
        />
        <div className="space-y-5">
          {serviceTypes.map((item, index) => (
            <SplitVisualPanel
              key={item.title}
              tone={index % 3 === 0 ? "amber" : index % 3 === 1 ? "sky" : "emerald"}
              reverse={index % 2 === 1}
              content={
                <>
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-white/75 px-3 py-1 text-ui-label text-foreground/70 dark:border-white/10 dark:bg-white/5">
                    <BookOpenText className="size-3.5" />
                    Layanan {index + 1}
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                    {item.description}
                  </p>
                  {item.href ? (
                    <div className="mt-5">
                      <Link
                        href={item.href}
                        className="inline-flex rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                      >
                        Lihat detail
                      </Link>
                    </div>
                  ) : null}
                </>
              }
              visual={
                item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 45vw, 100vw"
                  />
                ) : null
              }
            />
          ))}
        </div>
      </SectionShell>

      <SectionShell id="paket">
        <SectionIntro
          eyebrow="Investment"
          title="Paket & Investasi"
          description="Bukan sekadar daftar harga. Setiap opsi diposisikan sebagai level kesiapan bisnis yang berbeda, dengan frame visual yang jelas."
        />
        <div className="space-y-5">
          {pricingPlans.map((plan, index) => (
            <SplitVisualPanel
              key={plan.name}
              tone={
                plan.recommended
                  ? "sky"
                  : index % 3 === 0
                    ? "amber"
                    : index % 3 === 1
                      ? "emerald"
                      : "rose"
              }
              reverse={index % 2 === 1}
              content={
                <>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-3 py-1 text-ui-label text-foreground/70 dark:border-white/10 dark:bg-white/5">
                      <Store className="size-3.5" />
                      {plan.name}
                    </div>
                    {plan.recommended ? (
                      <span className="inline-flex rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
                        Recommended
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
                    {plan.price}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                    {plan.description}
                  </p>
                </>
              }
              visualClassName="p-6 md:p-7"
              visual={
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/45">
                    Yang Anda dapatkan
                  </p>
                  <ul className="mt-4 space-y-3 text-sm md:text-base">
                    {plan.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-black/8 bg-white/80 dark:border-white/10 dark:bg-white/10">
                          <BadgeCheck className="size-4 text-primary" />
                        </span>
                        <span className="pt-1 text-foreground/82">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              }
            />
          ))}
        </div>
      </SectionShell>

      {copy.ctaLinks?.length ? (
        <SectionShell id="cta-mid" className="py-8">
          <SectionPanel tone="sky" className="rounded-[1.75rem] p-5 md:p-6">
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
          </SectionPanel>
        </SectionShell>
      ) : null}

      <SectionShell id="fitur">
        <SectionIntro
          eyebrow="Core Features"
          title="Fitur Unggulan"
          description="Formatnya saya ubah dari card biasa menjadi panel modular, jadi tiap fitur punya pemisah, tint, dan hirarki visual yang lebih hidup."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature, index) => {
            const Icon =
              ICON_MAP[(feature.icon as keyof typeof ICON_MAP) || "default"] ||
              ICON_MAP.default;
            return (
              <SectionPanel
                key={feature.title}
                tone={index % 4 === 0 ? "sky" : index % 4 === 1 ? "amber" : index % 4 === 2 ? "emerald" : "rose"}
                className="rounded-[1.5rem] p-5 md:p-6"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl border border-black/8 bg-white/80 dark:border-white/10 dark:bg-white/10">
                    <Icon className="size-4 text-foreground/75" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </SectionPanel>
            );
          })}
        </div>
      </SectionShell>

      <SectionShell id="portfolio">
        <SectionIntro
          eyebrow="Proof"
          title="Portfolio & Bukti Kerja"
          description="Bagian ini juga digeser ke format visual-driven, sehingga setiap bukti kerja terasa seperti scene yang berdiri sendiri."
        />
        <div className="space-y-5">
          {proofItems.map((item, index) => (
            <SplitVisualPanel
              key={item.title}
              tone={index % 2 === 0 ? "rose" : "sky"}
              reverse={index % 2 === 1}
              content={
                <>
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-white/75 px-3 py-1 text-ui-label text-foreground/70 dark:border-white/10 dark:bg-white/5">
                    <LayoutTemplate className="size-3.5" />
                    Bukti kerja
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                    {item.description}
                  </p>
                </>
              }
              visual={
                <Image
                  src={item.image || KOTACOM_SPLIT_DEFAULT_ILLUSTRATION}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 45vw, 100vw"
                />
              }
            />
          ))}
        </div>
      </SectionShell>

      <SectionShell id="testimoni">
        <SectionIntro
          eyebrow="Testimonials"
          title="Apa Kata Klien"
          description="Bukti sosial juga saya dorong ke format scene, supaya tidak tenggelam sebagai kotak testimoni generik."
        />
        <div className="space-y-5">
          {testimonials.map((item, index) => (
            <SplitVisualPanel
              key={`${item.name}-${item.role}`}
              tone={index % 2 === 0 ? "neutral" : "rose"}
              reverse={index % 2 === 1}
              content={
                <>
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-white/75 px-3 py-1 text-ui-label text-foreground/70 dark:border-white/10 dark:bg-white/5">
                    <Star className="size-3.5" />
                    Testimoni klien
                  </div>
                  <blockquote className="mt-4 text-xl leading-9 font-medium text-foreground/88 md:text-2xl">
                    “{item.quote}”
                  </blockquote>
                  <footer className="mt-5 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{item.name}</span>
                    <span className="mx-2">·</span>
                    {item.role}
                  </footer>
                </>
              }
              visualClassName="p-6 md:p-7"
              visual={
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="grid gap-3">
                    <div className="rounded-2xl border border-black/8 bg-white/80 p-4 dark:border-white/10 dark:bg-white/10">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/45">
                        Delivery
                      </p>
                      <p className="mt-2 text-sm text-foreground/82">
                        Proses yang rapi, cepat, dan tetap mudah diikuti tim internal.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-black/8 bg-white/80 p-4 dark:border-white/10 dark:bg-white/10">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/45">
                        Impact
                      </p>
                      <p className="mt-2 text-sm text-foreground/82">
                        Fokus pada hasil yang bisa langsung dipakai untuk lead, campaign, atau operasional.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 h-24 rounded-[1.4rem] border border-white/40 bg-[linear-gradient(90deg,rgba(255,184,76,0.42),rgba(255,104,104,0.32),rgba(118,217,255,0.34))] dark:border-white/10" />
                </div>
              }
            />
          ))}
        </div>
      </SectionShell>

      {copy.longGuide?.length ? (
        <SectionShell id="panduan">
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
        </SectionShell>
      ) : null}

      <SectionShell id="cta-final">
        <SplitVisualPanel
          tone="amber"
          className="rounded-[1.9rem] shadow-[0_16px_44px_-26px_rgba(0,112,243,0.5)]"
          contentClassName="max-w-3xl"
          content={
            <>
              <p className="text-ui-label text-foreground/55">Closeout CTA</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-4xl">
                {copy.finalCtaTitle || `Siap Mulai ${copy.primaryKeyword}?`}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
                {copy.finalCtaDescription ||
                  "Diskusikan kebutuhan Anda sekarang. Tim kami akan membantu menyusun scope, timeline, dan strategi implementasi yang realistis untuk bisnis Anda."}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href={copy.ctaHref}>
                    {copy.ctaLabel || "Konsultasi Gratis Sekarang"}
                  </Link>
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
            </>
          }
          visualClassName="p-6 md:p-8"
          visual={
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/45">
                  Conversion path
                </p>
                <div className="mt-4 space-y-3">
                  {[
                    "Masuk lewat brief awal",
                    "Scope dan prioritas jadi jelas",
                    "Tim sales bisa follow-up lebih cepat",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-black/8 bg-white/80 px-4 py-3 dark:border-white/10 dark:bg-white/10"
                    >
                      <span className="inline-flex size-7 items-center justify-center rounded-full border border-black/8 bg-white text-xs font-semibold dark:border-white/10 dark:bg-black/20">
                        {index + 1}
                      </span>
                      <span className="text-sm text-foreground/82">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 h-28 rounded-[1.5rem] border border-white/40 bg-[linear-gradient(135deg,rgba(255,184,76,0.52),rgba(255,104,104,0.32),rgba(118,217,255,0.3))] dark:border-white/10" />
            </div>
          }
        />
      </SectionShell>
    </>
  );
}
