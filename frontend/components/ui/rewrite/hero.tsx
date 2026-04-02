import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Image from "next/image";
import type { LegacyAstroPage } from "@/lib/legacy-pages/astro-static";
import type { LegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type RewriteHeroProps = {
  page: LegacyAstroPage;
  copy: LegacyRewriteCopy;
  sectionLabel: string;
  sectionHref: string;
  heroImage?: {
    src: string;
    alt: string;
  };
};

export default function RewriteHero({
  page: _page,
  copy,
  sectionLabel,
  sectionHref,
  heroImage,
}: RewriteHeroProps) {
  return (
    <section className="border-b border-border/70 bg-background">
      <div className="container py-16 md:py-24">
        {heroImage ? (
          <div className="mb-8 overflow-hidden rounded-2xl border border-border/70">
            <div className="relative aspect-[16/9]">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 70vw, 100vw"
                priority
              />
            </div>
          </div>
        ) : null}
        <p className="inline-flex items-center gap-2 rounded-full border border-sky-300/50 bg-sky-100/60 px-3 py-1 text-ui-label text-foreground/80 dark:bg-sky-950/30">
          <Sparkles className="size-3.5 text-sky-600 dark:text-sky-300" />
          Layanan {sectionLabel} Profesional
        </p>
        <h1 className="mt-3 max-w-5xl text-balance text-display-lg">
          {copy.primaryKeyword}
        </h1>
        <p className="mt-5 max-w-3xl text-ui-body leading-8 text-muted-foreground">
          {copy.intro}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {copy.secondaryKeywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-full border border-cyan-300/50 bg-cyan-100/60 px-3 py-1 text-xs text-foreground/80 dark:bg-cyan-950/30"
            >
              {keyword}
            </span>
          ))}
        </div>

        <div className="mt-9 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href={copy.ctaHref}>
              {copy.ctaLabel}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="#cta-quick">Lihat Pilihan CTA</Link>
          </Button>
          <Link
            href={sectionHref}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Jelajahi Layanan {sectionLabel}
          </Link>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          <article className="rounded-xl border border-sky-300/40 bg-background p-4">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <CheckCircle2 className="size-4 text-sky-600 dark:text-sky-300" />
              Konsultasi Cepat
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Response awal fokus kebutuhan dan estimasi ruang lingkup.
            </p>
          </article>
          <article className="rounded-xl border border-cyan-300/40 bg-background p-4">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <CheckCircle2 className="size-4 text-cyan-600 dark:text-cyan-300" />
              Produksi Terjadwal
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Timeline jelas agar eksekusi tetap rapi dan tepat target.
            </p>
          </article>
          <article className="rounded-xl border border-emerald-300/40 bg-background p-4">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-300" />
              Dukungan Setelah Launch
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Pendampingan optimasi supaya hasil tetap konsisten jangka panjang.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
