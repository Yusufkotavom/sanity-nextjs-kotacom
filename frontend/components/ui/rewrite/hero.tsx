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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,190,92,0.24),transparent_52%),radial-gradient(circle_at_20%_30%,rgba(255,120,92,0.22),transparent_34%),radial-gradient(circle_at_82%_35%,rgba(110,198,255,0.22),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0)_42%,rgba(255,184,76,0.18)_68%,rgba(255,104,104,0.16)_78%,rgba(118,217,255,0.18)_88%,rgba(96,255,182,0.14)_100%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,190,92,0.16),transparent_52%),radial-gradient(circle_at_20%_30%,rgba(255,120,92,0.14),transparent_34%),radial-gradient(circle_at_82%_35%,rgba(110,198,255,0.14),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0)_42%,rgba(255,184,76,0.10)_68%,rgba(255,104,104,0.10)_78%,rgba(118,217,255,0.12)_88%,rgba(96,255,182,0.08)_100%)]" />
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
          <div className="mx-auto mt-6 max-w-3xl">
            <p className="text-pretty text-ui-body leading-8 text-foreground/72">
              {copy.intro}
            </p>
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

        <div className="mx-auto mt-12 max-w-4xl px-4">
          {heroImage ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-[1.5rem] border border-black/10 shadow-2xl dark:border-white/10">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 56rem, 100vw"
                priority
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
