import Link from "next/link";
import type { LegacyAstroPage } from "@/lib/legacy-pages/astro-static";
import type { LegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LegacyHeroProps = {
  page: LegacyAstroPage;
  copy: LegacyRewriteCopy;
  sectionLabel: string;
  sectionHref: string;
};

export default function LegacyHero({
  page,
  copy,
  sectionLabel,
  sectionHref,
}: LegacyHeroProps) {
  return (
    <section className="border-b border-border/70 bg-[radial-gradient(circle_at_top,_hsl(var(--muted))_0%,_transparent_68%)]">
      <div className="container py-14 md:py-20">
        <p className="text-ui-label text-foreground/70">
          Rewrite Wave 1 · {sectionLabel}
        </p>
        <h1 className="mt-3 max-w-5xl text-balance text-display-lg">
          {copy.primaryKeyword}
        </h1>
        <p className="mt-4 max-w-3xl text-ui-body text-muted-foreground">
          {copy.intro}
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          {copy.secondaryKeywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-full border border-border/80 bg-background/90 px-3 py-1 text-xs text-foreground/80"
            >
              {keyword}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href={copy.ctaHref}>{copy.ctaLabel}</Link>
          </Button>
          <Link
            href={sectionHref}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Jelajahi Cluster {sectionLabel}
          </Link>
        </div>

        <p className="mt-5 font-mono text-[12px] text-muted-foreground">
          Source file: {page.sourceFile}
        </p>
      </div>
    </section>
  );
}
