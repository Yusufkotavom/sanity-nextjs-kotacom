import type { LegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import GlobalWhatsAppButton from "@/components/global-whatsapp-button";
import { SectionPanel, SectionShell } from "@/components/ui/section-shell";

type RewriteProcessFaqProps = {
  copy: LegacyRewriteCopy;
};

export default async function RewriteProcessFaq({ copy }: RewriteProcessFaqProps) {
  return (
    <SectionShell id="faq" className="py-10 md:py-12">
      <SectionPanel
        tone="neutral"
        className="grid gap-8 rounded-[1.75rem] p-6 md:grid-cols-[1.2fr_1fr] md:p-8"
      >
        <div>
          <p className="text-ui-label text-foreground/55">Execution</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Proses Eksekusi</h2>
          <ol className="mt-4 space-y-3">
            {copy.process.map((step, index) => (
              <li key={step} className="flex items-start gap-3">
                <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-violet-300/40 bg-background text-xs font-semibold">
                  {index + 1}
                </span>
                <p className="pt-1 text-sm text-foreground/85">{step}</p>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <p className="text-ui-label text-foreground/55">FAQ</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Pertanyaan Umum</h2>
          <Accordion
            type="single"
            collapsible
            className="mt-4 rounded-2xl border border-white/35 bg-white/70 px-4 dark:border-white/10 dark:bg-white/5"
          >
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
          <div className="mt-4 rounded-2xl border border-black/8 bg-background/70 p-4 dark:border-white/10 dark:bg-black/10">
            <p className="text-sm text-foreground/80">
              Butuh jawaban yang lebih spesifik untuk konteks bisnis Anda?
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <GlobalWhatsAppButton
                fallbackHref={copy.ctaHref}
                fallbackLabel="Diskusi Kebutuhan"
                size="sm"
              />
              <Button asChild size="sm" variant="outline">
                <Link href="#cta-mid">Lanjut ke CTA Cepat</Link>
              </Button>
            </div>
          </div>
        </div>
      </SectionPanel>
    </SectionShell>
  );
}
