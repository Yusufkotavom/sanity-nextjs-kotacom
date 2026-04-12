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
  processEyebrow?: string;
  processTitle?: string;
  processDescription?: string;
  faqEyebrow?: string;
  faqTitle?: string;
  faqDescription?: string;
  supportPrompt?: string;
  supportCtaLabel?: string;
  supportLinkHref?: string;
  supportLinkLabel?: string;
};

export default async function RewriteProcessFaq({
  copy,
  processEyebrow = "Process",
  processTitle = "Bagaimana proyek ini berjalan",
  processDescription = "Bagian ini dipakai untuk menunjukkan bahwa proyek berjalan dengan tahapan yang bisa dipahami, bukan dengan proses yang terasa gelap di tengah jalan.",
  faqEyebrow = "Objection Handling",
  faqTitle = "Pertanyaan yang biasanya menahan keputusan",
  faqDescription = "FAQ di bawah ini dirancang untuk menjawab hambatan pembelian yang paling sering muncul sebelum brief dikirim.",
  supportPrompt = "Butuh jawaban yang lebih spesifik untuk konteks bisnis Anda?",
  supportCtaLabel = "Diskusi Kebutuhan",
  supportLinkHref = "#cta-final",
  supportLinkLabel = "Lanjut ke CTA Akhir",
}: RewriteProcessFaqProps) {
  return (
    <SectionShell id="faq" className="py-10 md:py-12">
      <SectionPanel
        tone="neutral"
        className="grid gap-8 rounded-[1.75rem] p-6 md:grid-cols-[1.2fr_1fr] md:p-8"
      >
        <div>
          <p className="text-ui-label text-foreground/55">{processEyebrow}</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">{processTitle}</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {processDescription}
          </p>
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
          <p className="text-ui-label text-foreground/55">{faqEyebrow}</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">{faqTitle}</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {faqDescription}
          </p>
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
              {supportPrompt}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <GlobalWhatsAppButton
                fallbackHref={copy.ctaHref}
                fallbackLabel={supportCtaLabel}
                size="sm"
              />
              <Button asChild size="sm" variant="outline">
                <Link href={supportLinkHref}>{supportLinkLabel}</Link>
              </Button>
            </div>
          </div>
        </div>
      </SectionPanel>
    </SectionShell>
  );
}
