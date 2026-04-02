import type { LegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";

type LegacyHighlightsProps = {
  copy: LegacyRewriteCopy;
};

export default function LegacyHighlights({ copy }: LegacyHighlightsProps) {
  return (
    <section className="container py-12" id="keunggulan">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {copy.highlights.map((item) => (
          <article
            key={item}
            className="rounded-xl border border-border/80 bg-card p-5 shadow-sm"
          >
            <h2 className="text-sm font-semibold text-foreground">{item}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{copy.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
