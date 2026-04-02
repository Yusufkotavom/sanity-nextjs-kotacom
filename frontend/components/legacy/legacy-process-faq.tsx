import type { LegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type LegacyProcessFaqProps = {
  copy: LegacyRewriteCopy;
};

export default function LegacyProcessFaq({ copy }: LegacyProcessFaqProps) {
  return (
    <section className="container py-4" id="faq">
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
          <Accordion type="single" collapsible className="mt-4 rounded-lg border border-border/70 bg-background px-4">
            {copy.faqs.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
