import Link from "next/link";
import { Button } from "@/components/ui/button";
import GlobalWhatsAppButton from "@/components/global-whatsapp-button";
import { SectionShell, SplitVisualPanel } from "@/components/ui/section-shell";
import type { LegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";
import type { TemplateLane } from "@/types/template";

const laneSecondaryLinks: Record<
  TemplateLane,
  Array<{ href: string; label: string; variant: "outline" | "secondary" }>
> = {
  website: [
    { href: "#paket", label: "Lihat Paket", variant: "outline" },
    { href: "#faq", label: "Lihat FAQ", variant: "secondary" },
  ],
  software: [
    { href: "#portfolio", label: "Lihat Use Case", variant: "outline" },
    { href: "#faq", label: "Lihat FAQ", variant: "secondary" },
  ],
  printing: [
    { href: "#paket", label: "Lihat Spesifikasi", variant: "outline" },
    { href: "#faq", label: "Lihat FAQ", variant: "secondary" },
  ],
  generic: [
    { href: "#faq", label: "Lihat FAQ", variant: "outline" },
  ],
};

export async function FinalCtaSection({
  copy,
  lane = "generic",
}: {
  copy: LegacyRewriteCopy;
  lane?: TemplateLane;
}) {
  const secondaryLinks = laneSecondaryLinks[lane] || laneSecondaryLinks.generic;

  return (
    <SectionShell id="cta-final" className="py-10 md:py-12">
      <SplitVisualPanel
        tone="amber"
        className="rounded-[1.9rem] shadow-[0_16px_44px_-26px_rgba(0,112,243,0.5)]"
        contentClassName="max-w-3xl"
        content={
          <>
            <p className="text-ui-label text-foreground/55">Closeout CTA</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-4xl">
              {copy.finalCtaTitle || `Siap Mulai ${copy.primaryKeyword}?`}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
              {copy.finalCtaDescription ||
                "Diskusikan kebutuhan Anda sekarang. Tim kami akan membantu menyusun scope, timeline, dan strategi implementasi yang realistis untuk bisnis Anda."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <GlobalWhatsAppButton
                fallbackHref={copy.ctaHref}
                fallbackLabel={copy.ctaLabel || "Konsultasi Gratis Sekarang"}
                size="lg"
              />
              {secondaryLinks.map((item) => (
                <Button key={item.href} asChild size="lg" variant={item.variant}>
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
            </div>
          </>
        }
        visualClassName="p-6 md:p-8"
        visual={
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/45">
                Conversion path
              </p>
              <div className="mt-4 space-y-3">
                {[
                  "Masuk lewat brief awal",
                  "Scope dan prioritas jadi jelas",
                  "Tim sales bisa follow-up lebih cepat",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-black/8 bg-white/80 px-4 py-3 dark:border-white/10 dark:bg-white/10"
                  >
                    <span className="inline-flex size-7 items-center justify-center rounded-full border border-black/8 bg-white text-xs font-semibold dark:border-white/10 dark:bg-black/20">
                      {index + 1}
                    </span>
                    <span className="text-sm text-foreground/82">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 h-28 rounded-[1.5rem] border border-white/40 bg-[linear-gradient(135deg,rgba(255,184,76,0.52),rgba(255,104,104,0.32),rgba(118,217,255,0.3))] dark:border-white/10" />
          </div>
        }
      />
    </SectionShell>
  );
}
