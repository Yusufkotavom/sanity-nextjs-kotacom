import Link from "next/link";
import Image from "next/image";
import {
  Blocks,
  LaptopMinimal,
  Network,
  Printer,
  Sparkles,
  Workflow,
  CheckCircle2,
  Trophy,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import GlobalWhatsAppButton from "@/components/global-whatsapp-button";
import {
  SectionIntro,
  SectionPanel,
  SectionShell,
} from "@/components/ui/section-shell";
import { homePrepareContent } from "@/lib/local-content/home-prepare";
import { cn } from "@/lib/utils";
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECTS_QUERY } from "@/sanity/queries/project";
import { PRODUCTS_QUERY } from "@/sanity/queries/product";
import { POSTS_QUERY } from "@/sanity/queries/post";
import { SERVICES_QUERY } from "@/sanity/queries/service";
import ProjectCard from "@/components/ui/project-card";
import ProductCard from "@/components/ui/product-card";
import PostCard from "@/components/ui/post-card";
import ServiceCard from "@/components/ui/service-card";

const laneIconMap = {
  website: LaptopMinimal,
  software: Blocks,
  support: Network,
  printing: Printer,
} as const;

const testimonials = [
  {
    quote: "Website baru dari KOTACOM benar-benar mengubah cara kami mendapatkan klien. Tampilannya profesional dan sangat cepat. Timnya juga sangat responsif. Luar biasa!",
    name: "Budi Santoso",
    company: "PT Maju Bersama",
    role: "Business Owner",
  },
  {
    quote: "Masalah laptop kantor yang sering error sangat mengganggu produktivitas. Sejak pakai jasa maintenance KOTACOM, semua berjalan lancar. Problem solved!",
    name: "Siti Rahayu",
    company: "CV Digital Sejahtera",
    role: "Operational Manager",
  },
  {
    quote: "Kualitas cetak brosur dan buku profil perusahaan kami sangat tajam dan warnanya akurat. Benar-benar meningkatkan citra perusahaan kami di mata klien. Terima kasih KOTACOM.",
    name: "Ahmad Wijaya",
    company: "PT Karya Mandiri",
    role: "Marketing Director",
  }
];

export default async function HomePeparMiddleSection() {
  const { data: projectsData } = await sanityFetch({ query: PROJECTS_QUERY });
  const recentProjects = (projectsData || []).slice(0, 3);

  const { data: productsData } = await sanityFetch({ query: PRODUCTS_QUERY });
  const recentProducts = (productsData || []).slice(0, 3);

  const { data: servicesData } = await sanityFetch({ query: SERVICES_QUERY });
  const recentServices = (servicesData || []).slice(0, 3);

  const { data: postsData } = await sanityFetch({ query: POSTS_QUERY });
  const recentPosts = (postsData || []).slice(0, 3);

  return (
    <>
      {/* HERO SECTION WITH SPLIT LAYOUT */}
      <SectionShell className="pt-16 lg:pt-24">
        <SectionPanel
          tone="neutral"
          className="grid gap-8 overflow-hidden rounded-[1.75rem] p-5 md:grid-cols-[minmax(0,1fr)_minmax(320px,0.92fr)] md:p-7 lg:gap-10 lg:p-8"
        >
          <div className="flex flex-col justify-center">
            <div className="mb-3 inline-flex items-center gap-2 text-ui-label text-foreground/55">
              <Sparkles className="size-4" />
              <span>Layanan IT Terpadu</span>
            </div>
            <SectionIntro
              title="Bangun fondasi digital bisnis yang rapi, stabil, dan siap untuk tumbuh"
              className="mb-0 max-w-3xl"
            />
            <div className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
              <p>
                Fokus pada bisnis Anda, kami tangani website, software, infrastruktur IT, dan kebutuhan digital harian Anda.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="default">
                <Link href="/layanan">Jelajahi Solusi</Link>
              </Button>
              <GlobalWhatsAppButton
                label="Konsultasi Gratis"
                variant="outline"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="relative aspect-square overflow-hidden rounded-[1.5rem] border border-white/45 bg-white/70 shadow-[0_18px_48px_rgba(15,23,42,0.1)] dark:border-white/12 dark:bg-white/5">
              <Image
                src="/images/kotacom-split-production-ready/hero/hero-cetak-buku-shark-v2.png"
                alt="Kotacom IT services and printing illustration"
                fill
                className="object-contain p-4"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            </div>
          </div>
        </SectionPanel>
      </SectionShell>

      {/* 1. HERO EXTENSION: Stats Bar */}
      <SectionShell className="pt-12 lg:pt-16">
        <div className="mx-auto flex max-w-[1000px] flex-wrap justify-between gap-6 rounded-[1.9rem] border border-border/50 bg-background/50 px-8 py-8 shadow-sm backdrop-blur-sm sm:px-12">
          <div className="flex flex-1 items-center gap-4">
            <Trophy className="h-8 w-8 text-primary/70" />
            <div>
              <div className="text-2xl font-bold tracking-tight">2008</div>
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Berdiri Sejak</div>
            </div>
          </div>
          <div className="hidden h-12 w-px bg-border/50 md:block" />
          <div className="flex flex-1 items-center gap-4 md:justify-center">
            <CheckCircle2 className="h-8 w-8 text-primary/70" />
            <div>
              <div className="text-2xl font-bold tracking-tight">150+</div>
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Proyek Selesai</div>
            </div>
          </div>
          <div className="hidden h-12 w-px bg-border/50 md:block" />
          <div className="flex flex-1 items-center gap-4 md:justify-end">
            <MapPin className="h-8 w-8 text-primary/70" />
            <div>
              <div className="text-2xl font-bold tracking-tight">Surabaya</div>
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Jangkauan Nasional</div>
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell className="pt-12 lg:pt-16">
        <SectionPanel
          tone="neutral"
          className="grid gap-8 overflow-hidden rounded-[1.9rem] p-5 md:grid-cols-[minmax(0,1.2fr)_360px] md:p-7 lg:gap-10 lg:p-8"
        >
          <div className="space-y-6">
            <SectionIntro
              eyebrow="Layanan Utama Kotacom"
              title="Empat layanan utama yang saling melengkapi untuk membantu bisnis bergerak lebih rapi."
              description="Mulai dari website, software, support, hingga percetakan, setiap layanan dirancang agar bisa berdiri sendiri atau digabung menjadi sistem kerja yang lebih utuh."
              className="mb-0 max-w-4xl"
            />

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {homePrepareContent.lanes.map((lane) => {
                const Icon = laneIconMap[lane.key];

                return (
                  <Link
                    className="group rounded-[1.35rem] border border-border/70 bg-background/85 p-4 transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-background hover:shadow-[0_20px_60px_-40px_rgba(0,0,0,0.35)]"
                    href={lane.href}
                    key={lane.key}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border/70 bg-primary/10 text-foreground">
                        <Icon className="h-6 w-6" />
                      </span>
                      <div>
                        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                          {lane.eyebrow}
                        </div>
                        <div className="text-sm font-medium text-foreground">
                          {lane.bullets[0]}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="rounded-[1.7rem] border border-border/70 bg-background/90 p-6 shadow-[0_18px_70px_-42px_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-3 text-sm font-medium text-foreground">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-muted/40">
                <Workflow className="h-4 w-4" />
              </span>
              Cara kami bekerja
            </div>
            <div className="mt-5 space-y-4">
              {homePrepareContent.workflow.map((item, index) => (
                <div className="border-l border-border/70 pl-4" key={item.title}>
                  <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Step {index + 1}
                  </div>
                  <div className="mt-1 text-sm font-medium text-foreground">
                    {item.title}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <GlobalWhatsAppButton
                label="Konsultasi via WhatsApp"
                variant="outline"
                size="sm"
              />
              <Button asChild variant="ghost" size="sm">
                <Link href="/layanan">Lihat semua layanan</Link>
              </Button>
            </div>
          </div>
        </SectionPanel>
      </SectionShell>

      <SectionShell>
        <SectionIntro
          eyebrow="Teknologi yang Kami Gunakan"
          title="Stack yang dipilih untuk membantu performa, stabilitas, dan kemudahan pengembangan."
          description="Kami menggunakan teknologi yang relevan dengan kebutuhan proyek, bukan sekadar mengikuti tren."
        />
        <div className="flex flex-wrap gap-3">
          {homePrepareContent.techStack.map((item) => (
            <div
              className="flex items-center gap-2 rounded-xl border border-border/70 bg-muted/30 px-5 py-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted/60"
              key={item}
            >
              <Sparkles className="h-3 w-3 text-muted-foreground/60" />
              {item}
            </div>
          ))}
        </div>
      </SectionShell>

      {/* 2. PORTFOLIO PREVIEW */}
      {recentProjects.length > 0 && (
        <SectionShell>
          <div className="mb-8 flex items-end justify-between gap-4">
            <SectionIntro
              eyebrow="Portfolio & Case Studies"
              title="Proyek terbaru yang kami selesaikan."
              description="Beberapa contoh dari sistem, website, dan proyek IT yang kami kerjakan."
              className="mb-0"
            />
            <Button asChild variant="outline" className="hidden sm:flex">
              <Link href="/projects">Semua Portfolio</Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentProjects.map((project: any) => (
              <ProjectCard key={project._id || (project.slug && project.slug.current)} {...project} />
            ))}
          </div>
          <div className="mt-8 flex justify-center sm:hidden">
            <Button asChild variant="outline" className="w-full">
              <Link href="/projects">Semua Portfolio</Link>
            </Button>
          </div>
        </SectionShell>
      )}

      {/* PRODUCTS PREVIEW */}
      {recentProducts.length > 0 && (
        <SectionShell>
          <div className="mb-8 flex items-end justify-between gap-4">
            <SectionIntro
              eyebrow="Katalog Produk"
              title="Perangkat Kasir & IT"
              description="Pilihan produk dengan kualitas terbaik untuk mendukung kegiatan bisnis Anda."
              className="mb-0"
            />
            <Button asChild variant="outline" className="hidden sm:flex">
              <Link href="/products">Semua Produk</Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentProducts.map((product: any) => (
              <ProductCard key={product._id || (product.slug && product.slug.current)} {...product} />
            ))}
          </div>
          <div className="mt-8 flex justify-center sm:hidden">
            <Button asChild variant="outline" className="w-full">
              <Link href="/products">Semua Produk</Link>
            </Button>
          </div>
        </SectionShell>
      )}

      {/* SERVICES PREVIEW */}
      {recentServices.length > 0 && (
        <SectionShell>
          <div className="mb-8 flex items-end justify-between gap-4">
            <SectionIntro
              eyebrow="Layanan Tersedia"
              title="Solusi Teknis Khusus"
              description="Dari instalasi jaringan hingga percetakan dalam skala besar."
              className="mb-0"
            />
            <Button asChild variant="outline" className="hidden sm:flex">
              <Link href="/services">Semua Layanan</Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentServices.map((service: any) => (
              <ServiceCard key={service._id || (service.slug && service.slug.current)} {...service} />
            ))}
          </div>
          <div className="mt-8 flex justify-center sm:hidden">
            <Button asChild variant="outline" className="w-full">
              <Link href="/services">Semua Layanan</Link>
            </Button>
          </div>
        </SectionShell>
      )}

      {/* BLOG/POSTS PREVIEW */}
      {recentPosts.length > 0 && (
        <SectionShell>
          <div className="mb-8 flex items-end justify-between gap-4">
            <SectionIntro
              eyebrow="Artikel & Insights"
              title="Informasi Terbaru & Tips IT"
              description="Baca artikel seputar solusi teknologi dan tren industri dari tim ahli kami."
              className="mb-0"
            />
            <Button asChild variant="outline" className="hidden sm:flex">
              <Link href="/posts">Semua Artikel</Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post: any) => (
              <PostCard key={post._id || (post.slug && post.slug.current)} post={post} />
            ))}
          </div>
          <div className="mt-8 flex justify-center sm:hidden">
            <Button asChild variant="outline" className="w-full">
              <Link href="/posts">Semua Artikel</Link>
            </Button>
          </div>
        </SectionShell>
      )}

      <SectionShell>
        <SectionIntro
          eyebrow="Fokus Layanan"
          title="Layanan yang bisa dipakai terpisah atau disusun menjadi solusi yang lebih lengkap."
          description="Setiap lane dirancang untuk menjawab kebutuhan yang berbeda, tetapi tetap bisa saling terhubung saat bisnis membutuhkan alur kerja yang lebih utuh."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {homePrepareContent.lanes.map((lane) => {
            const Icon = laneIconMap[lane.key];

            return (
              <SectionPanel
                className="rounded-[1.75rem] p-6 md:p-7"
                key={lane.key}
                tone={lane.key === "software" ? "sky" : "neutral"}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-ui-label text-foreground/55">{lane.eyebrow}</div>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">
                      {lane.title}
                    </h3>
                  </div>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border/70 bg-primary/10">
                    <Icon className="h-6 w-6" />
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                  {lane.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {lane.bullets.map((bullet) => (
                    <li
                      className="flex items-center gap-3 text-sm text-foreground/90"
                      key={bullet}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button asChild variant="outline">
                    <Link href={lane.href}>Buka lane</Link>
                  </Button>
                </div>
              </SectionPanel>
            );
          })}
        </div>
      </SectionShell>

      <SectionShell>
        <SectionPanel
          tone="amber"
          className="grid gap-6 rounded-[1.9rem] p-6 md:grid-cols-[minmax(0,1fr)_320px] md:p-8"
        >
          <div>
            <SectionIntro
              eyebrow="Kenapa Banyak Bisnis Memilih Kotacom"
              title="Bukan hanya karena layanan yang lengkap, tetapi karena eksekusinya bisa dibuat lebih terarah."
              description="Kami membantu bisnis menyusun prioritas, memperjelas kebutuhan, dan menyiapkan implementasi yang bisa benar-benar dipakai."
              className="mb-0 max-w-3xl"
            />
          </div>
          <div className="space-y-3">
            {homePrepareContent.highlights.map((item) => (
              <div
                className="rounded-[1.35rem] border border-border/70 bg-background/90 p-4"
                key={item.title}
              >
                <div className="text-sm font-medium text-foreground">
                  {item.title}
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </SectionPanel>
      </SectionShell>

      {/* 4. TESTIMONIALS SECTION */}
      <SectionShell>
        <SectionIntro
          eyebrow="Kepercayaan Klien"
          title="Apa kata klien tentang layanan kami."
          description="Pengalaman nyata mereka yang telah mempercayakan kebutuhan IT, software, dan percetakan pada Kotacom."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((testi, i) => {
            const initial = testi.name.charAt(0).toUpperCase();
            return (
              <div key={i} className="flex flex-col justify-between rounded-[1.75rem] border border-border/50 bg-background/60 p-7 shadow-sm">
                <p className="italic leading-7 text-muted-foreground">&quot;{testi.quote}&quot;</p>
                <div className="mt-8 border-t border-border/50 pt-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                      {initial}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{testi.name}</div>
                      <div className="text-sm text-muted-foreground">{testi.role}</div>
                      {testi.company && (
                        <div className="text-xs text-muted-foreground/80">{testi.company}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground/70">
          * Nama klien telah diubah untuk menjaga privasi
        </p>
      </SectionShell>

      <SectionShell>
        <SectionIntro
          eyebrow="Layanan Unggulan"
          title="Tiga penawaran yang paling sering dicari bisnis saat ingin mulai bekerja bersama Kotacom."
          description="Blok ini membantu pengunjung memahami jalur layanan yang paling relevan tanpa harus menelusuri terlalu banyak halaman di awal."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {homePrepareContent.serviceClusters.map((cluster, index) => (
            <SectionPanel
              className="rounded-[1.75rem] p-6 md:p-7"
              key={cluster.title}
              tone={index === 1 ? "sky" : "neutral"}
            >
              <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {cluster.priceHint}
              </div>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">
                {cluster.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {cluster.description}
              </p>
              <ul className="mt-5 space-y-2">
                {cluster.bullets.map((bullet) => (
                  <li className="flex items-center gap-3 text-sm" key={bullet}>
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button asChild variant="outline" size="sm">
                  <Link href={cluster.href}>Lihat detail</Link>
                </Button>
              </div>
            </SectionPanel>
          ))}
        </div>
      </SectionShell>

      <SectionShell className="pb-12 lg:pb-16">
        <SectionPanel tone="sky" className="rounded-[1.9rem] p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_280px] md:items-end">
            <div>
              <div className="flex items-center gap-3 text-ui-label text-foreground/55">
                <Sparkles className="h-4 w-4" />
                Siap Mulai
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                {homePrepareContent.closingTitle}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                {homePrepareContent.closingDescription}
              </p>
            </div>
            <div className="space-y-3">
              {homePrepareContent.assurance.map((item) => (
                <div
                  className={cn("rounded-[1.25rem] border border-border/70 bg-background/90 p-4")}
                  key={item.label}
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    {item.label}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <GlobalWhatsAppButton
              label="Konsultasi Sekarang"
              className="rounded-full bg-green-500 text-white hover:bg-green-600"
            />
            <Button asChild variant="outline">
              <Link href="/contact">Kirim Brief Kebutuhan</Link>
            </Button>
          </div>
        </SectionPanel>
      </SectionShell>
    </>
  );
}
