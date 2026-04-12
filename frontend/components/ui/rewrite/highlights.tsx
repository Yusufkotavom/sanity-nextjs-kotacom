import type { LegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import GlobalWhatsAppButton from "@/components/global-whatsapp-button";
import { SectionIntro, SectionPanel, SectionShell } from "@/components/ui/section-shell";

type RewriteHighlightsProps = {
  copy: LegacyRewriteCopy;
  eyebrow?: string;
  title?: string;
  description?: string;
  secondaryCtaLabel?: string;
};

export default async function RewriteHighlights({
  copy,
  eyebrow = "Problem & Stakes",
  title = "Kenapa keputusan ini perlu dibuat dengan benar",
  description = "Bagian ini menyorot risiko, biaya salah pilih, dan alasan kenapa struktur layanan perlu diputuskan dengan lebih jelas sejak awal.",
  secondaryCtaLabel = "Lihat FAQ Implementasi",
}: RewriteHighlightsProps) {
  return (
    <SectionShell id="keunggulan" className="py-14 md:py-16">
      <SectionIntro
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {copy.highlights.map((item, index) => (
          <SectionPanel
            key={item}
            tone={index % 4 === 0 ? "sky" : index % 4 === 1 ? "amber" : index % 4 === 2 ? "emerald" : "rose"}
            className="rounded-2xl p-5"
          >
            <h2 className="text-sm font-semibold text-foreground">{item}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.description}</p>
          </SectionPanel>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <GlobalWhatsAppButton fallbackHref={copy.ctaHref} fallbackLabel={copy.ctaLabel} />
        <Button asChild variant="outline">
          <Link href="#faq">{secondaryCtaLabel}</Link>
        </Button>
      </div>
    </SectionShell>
  );
}
