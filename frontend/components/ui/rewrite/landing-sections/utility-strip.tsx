import Link from "next/link";
import { Button } from "@/components/ui/button";
import GlobalWhatsAppButton from "@/components/global-whatsapp-button";
import { SectionPanel, SectionShell } from "@/components/ui/section-shell";
import type { LegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";
import type { TocItem } from "./types";

export function UtilityStrip({
  tocItems,
  ctaLinks,
  ctaLabel,
  ctaHref,
  title = "Navigasi Cepat",
  ctaTitle = "Aksi Cepat",
}: {
  tocItems: TocItem[];
  ctaLinks?: LegacyRewriteCopy["ctaLinks"];
  ctaLabel?: string;
  ctaHref?: string;
  title?: string;
  ctaTitle?: string;
}) {
  return (
    <SectionShell id="toc" className="py-8 md:py-10">
      <SectionPanel
        tone="neutral"
        className="grid gap-6 rounded-[1.75rem] p-5 md:grid-cols-[minmax(0,1fr)_minmax(280px,0.78fr)] md:p-7"
      >
        <div>
          <p className="text-ui-label text-foreground/70">{title}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tocItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="inline-flex rounded-full border border-black/10 bg-white/70 px-3.5 py-1.5 text-xs text-foreground/80 transition-colors hover:border-black/15 hover:bg-white hover:text-foreground dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
        {ctaLinks?.length || ctaLabel ? (
          <div className="border-t border-black/8 pt-1 md:border-l md:border-t-0 md:pl-6 dark:border-white/10">
            <p className="text-ui-label text-primary/80">{ctaTitle}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <GlobalWhatsAppButton
                fallbackHref={ctaHref}
                fallbackLabel={ctaLabel || "Konsultasi via WhatsApp"}
                size="sm"
              />
              {ctaLinks?.slice(0, 2).map((item, index) => (
                <Button
                  key={item.label}
                  asChild
                  size="sm"
                  variant={index === 0 ? "default" : "outline"}
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
            </div>
          </div>
        ) : null}
      </SectionPanel>
    </SectionShell>
  );
}
