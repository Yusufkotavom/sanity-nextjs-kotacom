import { cn } from "@/lib/utils";
import { BadgeCheck } from "lucide-react";
import GlobalWhatsAppButton from "@/components/global-whatsapp-button";
import { SectionIntro, SectionPanel, SectionShell } from "@/components/ui/section-shell";
import type { LegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";

function buildPricingPlanPrompt({
  planName,
  serviceTitle,
}: {
  planName: string;
  serviceTitle: string;
}) {
  return [
    `Halo Kotacom, saya tertarik dengan paket ${planName} untuk layanan ${serviceTitle}.`,
    "Mohon kirim detail scope, estimasi timeline, dan langkah mulai yang paling sesuai.",
  ].join("\n\n");
}

export async function PricingPlansSection({
  pricingPlans,
  serviceTitle,
  eyebrow = "Investment",
  title = "Paket & Investasi",
  description = "Pilihan investasi layanan dirancang secara transparan agar Anda dapat menyesuaikan cakupan dengan anggaran operasional tim.",
  recommendedLabel = "Recommended",
  buttonLabelPrefix = "Pilih",
}: {
  pricingPlans: NonNullable<LegacyRewriteCopy["pricingPlans"]>;
  serviceTitle: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  recommendedLabel?: string;
  buttonLabelPrefix?: string;
}) {
  return (
    <SectionShell id="paket" className="py-10 md:py-12">
      <SectionIntro
        eyebrow={eyebrow}
        title={title}
        description={description}
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
            className={cn(
              "group rounded-[1.65rem] p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_90px_rgba(15,23,42,0.16)] md:p-6",
              plan.recommended &&
                "relative overflow-hidden border-2 border-primary/35 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.18),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.76),rgba(255,255,255,0.62))] shadow-[0_30px_100px_rgba(37,99,235,0.18)] ring-1 ring-primary/15 dark:bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_36%),linear-gradient(180deg,rgba(15,23,42,0.72),rgba(15,23,42,0.56))]",
            )}
          >
            <div className="flex h-full flex-col">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-3 py-1 text-ui-label text-foreground/70 dark:border-white/10 dark:bg-white/5">
                  {plan.name}
                </div>
                {plan.recommended ? (
                  <span className="inline-flex rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-sm">
                    {recommendedLabel}
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
              <div className="mt-6">
                <GlobalWhatsAppButton
                  label={`${buttonLabelPrefix} ${plan.name}`}
                  predefinedText={buildPricingPlanPrompt({
                    planName: plan.name,
                    serviceTitle,
                  })}
                  className={cn(
                    "rounded-full border-0 bg-green-500 text-white shadow-lg transition duration-300 hover:bg-green-600 hover:shadow-[0_18px_50px_rgba(34,197,94,0.32)]",
                    plan.recommended &&
                      "bg-green-500/95 ring-2 ring-white/65 ring-offset-2 ring-offset-transparent dark:ring-white/20",
                  )}
                  ariaLabel={`Chat WhatsApp untuk paket ${plan.name}`}
                />
              </div>
            </div>
          </SectionPanel>
        ))}
      </div>
    </SectionShell>
  );
}
