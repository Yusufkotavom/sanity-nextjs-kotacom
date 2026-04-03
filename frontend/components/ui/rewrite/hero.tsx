import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Image from "next/image";
import type { LegacyAstroPage } from "@/lib/legacy-pages/astro-static";
import type { LegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";
import { buttonVariants } from "@/components/ui/button";
import RewriteHeroPrimaryCta from "@/components/ui/rewrite/hero-primary-cta";
import { fetchSanitySettings } from "@/sanity/lib/fetch";
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

function splitHeadline(title: string) {
  const words = title.trim().split(/\s+/).filter(Boolean);

  if (words.length < 4) {
    return { lead: title, accent: "" };
  }

  return {
    lead: words.slice(0, -2).join(" "),
    accent: words.slice(-2).join(" "),
  };
}

export default async function RewriteHero({
  page,
  copy,
  sectionLabel,
  sectionHref,
  heroImage,
}: RewriteHeroProps) {
  const settings = (await fetchSanitySettings()) as
    | {
        whatsApp?: {
          enabled?: boolean;
          phoneNumber?: string;
          predefinedText?: string;
          ctaText?: string;
          sourceUrl?: string;
        } | null;
      }
    | null;
  const whatsApp = settings?.whatsApp;
  const headline = splitHeadline(copy.primaryKeyword);
  const spotlightKeywords = copy.secondaryKeywords.slice(0, 3);

  return (
    <section className="relative overflow-hidden border-b border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(255,255,255,1))] dark:bg-[linear-gradient(180deg,rgba(10,10,10,0.98),rgba(10,10,10,1))]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,rgba(255,190,92,0.24),transparent_52%),radial-gradient(circle_at_20%_30%,rgba(255,120,92,0.22),transparent_34%),radial-gradient(circle_at_82%_35%,rgba(110,198,255,0.22),transparent_32%)]" />
      <div className="container relative py-16 md:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-1.5 text-ui-label text-foreground/80 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
            <Sparkles className="size-3.5 text-amber-500" />
            Layanan {sectionLabel} Profesional
          </p>
          <h1 className="mt-5 text-balance text-display-lg md:text-6xl">
            <span>{headline.lead}</span>{" "}
            {headline.accent ? (
              <span className="bg-[linear-gradient(90deg,#ea580c,#ef4444,#0ea5e9)] bg-clip-text text-transparent">
                {headline.accent}
              </span>
            ) : null}
          </h1>
          <div className="mx-auto mt-6 max-w-3xl rounded-[1.4rem] border border-black/8 bg-white/70 p-5 shadow-[0_16px_50px_rgba(15,23,42,0.06)] backdrop-blur dark:border-white/10 dark:bg-white/5 md:p-6">
            <p className="text-pretty text-ui-body leading-8 text-foreground/72">
              {copy.intro}
            </p>
            <span className="mt-3 block text-sm font-medium text-sky-700 dark:text-sky-300">
              Brief lebih cepat, scope lebih jelas, dan CTA utama langsung ke
              WhatsApp.
            </span>
          </div>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <RewriteHeroPrimaryCta
              fallbackHref={copy.ctaHref}
              fallbackLabel={copy.ctaLabel}
              phoneNumber={
                whatsApp?.enabled ? whatsApp.phoneNumber || undefined : undefined
              }
              predefinedText={whatsApp?.predefinedText || undefined}
              ctaText={whatsApp?.ctaText || undefined}
              sourceUrl={whatsApp?.sourceUrl || undefined}
              canonicalPath={page.route}
            />
            <Link
              href={sectionHref}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "min-w-[13rem] rounded-full border-black/10 bg-white/70 px-6 backdrop-blur hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10",
              )}
            >
              Jelajahi Layanan {sectionLabel}
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {spotlightKeywords.length > 0 ? (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-foreground/66">
              {spotlightKeywords.map((keyword) => (
                <span key={keyword} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-500" />
                  {keyword}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mx-auto mt-12 max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white/80 p-5 shadow-[0_24px_90px_rgba(15,23,42,0.08)] backdrop-blur dark:border-white/10 dark:bg-white/5 md:p-8">
            <div className="absolute inset-x-10 bottom-0 h-40 rounded-full bg-[radial-gradient(circle,rgba(255,188,92,0.36),rgba(255,255,255,0)_60%)] blur-2xl" />
            <div className="absolute inset-x-0 bottom-0 h-[68%] bg-[linear-gradient(90deg,rgba(255,184,76,0.72),rgba(255,104,104,0.6),rgba(118,217,255,0.62),rgba(96,255,182,0.66))]" />
            <div className="absolute inset-x-0 bottom-0 h-[68%] bg-[linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="relative rounded-[1.5rem] border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(255,255,255,0.72))] p-6 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/55">
                  Conversion-focused hero
                </p>
                <p className="mt-3 text-pretty text-sm leading-7 text-foreground/68 md:text-base">
                  Tampilan rata tengah, dua CTA yang tegas, dan jalur kontak utama
                  diprioritaskan ke WhatsApp agar intent komersial tidak tercecer.
                </p>
              </div>

              {heroImage ? (
                <div className="relative mx-auto mt-8 aspect-[16/9] max-w-3xl overflow-hidden rounded-[1.5rem] border border-white/50 bg-white/60 shadow-[0_18px_60px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-black/20">
                  <Image
                    src={heroImage.src}
                    alt={heroImage.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 56rem, 100vw"
                    priority
                  />
                </div>
              ) : (
                <div className="relative mx-auto mt-10 h-48 max-w-3xl rounded-[1.5rem] border border-white/45 bg-white/55 shadow-[0_18px_60px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-black/20" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
