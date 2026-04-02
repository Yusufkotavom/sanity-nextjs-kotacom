import type { LegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type RewriteHighlightsProps = {
  copy: LegacyRewriteCopy;
};

export default function RewriteHighlights({ copy }: RewriteHighlightsProps) {
  return (
    <section className="container py-14 md:py-16" id="keunggulan">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Keunggulan Layanan
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
          Fokus pada kualitas output, kejelasan proses, dan pengalaman klien yang nyaman.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {copy.highlights.map((item) => (
          <article
            key={item}
            className="rounded-2xl border border-cyan-300/35 bg-card p-5 shadow-sm"
          >
            <h2 className="text-sm font-semibold text-foreground">{item}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.description}</p>
          </article>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild>
          <Link href={copy.ctaHref}>{copy.ctaLabel}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="#faq">Lihat FAQ Implementasi</Link>
        </Button>
      </div>
    </section>
  );
}
