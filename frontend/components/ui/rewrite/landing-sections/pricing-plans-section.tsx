import { BadgeCheck } from "lucide-react";
import { SectionIntro, SectionPanel, SectionShell } from "@/components/ui/section-shell";
import type { LegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";

export function PricingPlansSection({
  pricingPlans,
}: {
  pricingPlans: NonNullable<LegacyRewriteCopy["pricingPlans"]>;
}) {
  return (
    <SectionShell id="paket" className="py-10 md:py-12">
      <SectionIntro
        eyebrow="Investment"
        title="Paket & Investasi"
        description="Harga saya ubah ke lane cards yang lebih ketat, jadi pembacaan antar paket tidak bergantung pada panel split yang terlalu panjang."
      />
      <div className="grid gap-4 xl:grid-cols-3">
        {pricingPlans.map((plan, index) => (
          <SectionPanel
            key={plan.name}
            tone={
              plan.recommended
                ? "sky"
                : index % 3 === 0
                  ? "amber"
                  : index % 3 === 1
                    ? "emerald"
                    : "rose"
            }
            className="rounded-[1.65rem] p-5 md:p-6"
          >
            <div className="flex h-full flex-col">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-3 py-1 text-ui-label text-foreground/70 dark:border-white/10 dark:bg-white/5">
                  {plan.name}
                </div>
                {plan.recommended ? (
                  <span className="inline-flex rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
                    Recommended
                  </span>
                ) : null}
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                {plan.price}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {plan.description}
              </p>
              <ul className="mt-5 space-y-3 text-sm">
                {plan.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-black/8 bg-white/80 dark:border-white/10 dark:bg-white/10">
                      <BadgeCheck className="size-4 text-primary" />
                    </span>
                    <span className="pt-1 text-foreground/82">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionPanel>
        ))}
      </div>
    </SectionShell>
  );
}
