import Image from "next/image";
import { LayoutTemplate } from "lucide-react";
import { SectionIntro, SectionPanel, SectionShell } from "@/components/ui/section-shell";
import GlobalWhatsAppButton from "@/components/global-whatsapp-button";
import type { LegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";
import { KOTACOM_SPLIT_DEFAULT_ILLUSTRATION } from "@/lib/illustrations/kotacom-split";

export function ProofSection({
  proofItems,
}: {
  proofItems: NonNullable<LegacyRewriteCopy["proofItems"]>;
}) {
  return (
    <SectionShell id="portfolio" className="py-10 md:py-12">
      <SectionIntro
        eyebrow="Proof"
        title="Portfolio & Bukti Kerja"
        description="Rekam jejak dan hasil pekerjaan kami yang menunjukkan standar visual serta kualitas cetak dalam memenuhi ragam kebutuhan industri."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {proofItems.map((item, index) => (
          <SectionPanel
            key={item.title}
            tone={index % 2 === 0 ? "rose" : "sky"}
            className="overflow-hidden rounded-[1.65rem] p-4 md:p-5"
          >
            <div className="flex h-full flex-col">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-white/75 px-3 py-1 text-ui-label text-foreground/70 dark:border-white/10 dark:bg-white/5">
                <LayoutTemplate className="size-3.5" />
                Bukti kerja
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {item.description}
              </p>
              <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-[1.35rem] border border-white/40 bg-white/70 dark:border-white/10 dark:bg-white/10">
                <Image
                  src={item.image || KOTACOM_SPLIT_DEFAULT_ILLUSTRATION}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 28vw, (min-width: 768px) 45vw, 100vw"
                />
              </div>
            </div>
          </SectionPanel>
        ))}
      </div>
    </SectionShell>
  );
}
