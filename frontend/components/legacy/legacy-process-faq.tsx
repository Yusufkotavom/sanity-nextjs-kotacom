import type { LegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";

type LegacyProcessFaqProps = {
  copy: LegacyRewriteCopy;
};

export default function LegacyProcessFaq({ copy }: LegacyProcessFaqProps) {
  return (
    <section className="container py-4">
      <div className="grid gap-8 rounded-2xl border border-border/80 bg-muted/25 p-6 md:grid-cols-[1.2fr_1fr] md:p-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Proses Eksekusi</h2>
          <ol className="mt-4 space-y-3">
            {copy.process.map((step, index) => (
              <li key={step} className="flex items-start gap-3">
                <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold">
                  {index + 1}
                </span>
                <p className="pt-1 text-sm text-foreground/85">{step}</p>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
          <div className="mt-4 space-y-3">
            {copy.faqs.map((item) => (
              <details
                key={item.question}
                className="rounded-lg border border-border/70 bg-background p-4"
              >
                <summary className="cursor-pointer text-sm font-medium text-foreground">
                  {item.question}
                </summary>
                <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
