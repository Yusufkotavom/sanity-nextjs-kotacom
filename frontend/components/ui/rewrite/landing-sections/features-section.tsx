import {
  Boxes,
  Gauge,
  LayoutTemplate,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Users,
} from "lucide-react";
import { SectionIntro, SectionPanel, SectionShell } from "@/components/ui/section-shell";
import type { LegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";

const ICON_MAP = {
  speed: Gauge,
  security: ShieldCheck,
  conversion: Rocket,
  design: LayoutTemplate,
  support: Users,
  ecommerce: ShoppingCart,
  boxes: Boxes,
  default: Sparkles,
} as const;

export function FeaturesSection({
  features,
}: {
  features: NonNullable<LegacyRewriteCopy["features"]>;
}) {
  return (
    <SectionShell id="fitur" className="py-10 md:py-12">
      <SectionIntro
        eyebrow="Core Features"
        title="Fitur Unggulan"
        description="Saya pertahankan grid modular di sini karena justru ini bagian yang paling efisien dibaca dalam format rapat."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {features.map((feature, index) => {
          const Icon =
            ICON_MAP[(feature.icon as keyof typeof ICON_MAP) || "default"] ||
            ICON_MAP.default;
          return (
            <SectionPanel
              key={feature.title}
              tone={index % 4 === 0 ? "sky" : index % 4 === 1 ? "amber" : index % 4 === 2 ? "emerald" : "rose"}
              className="rounded-[1.5rem] p-5 md:p-6"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl border border-black/8 bg-white/80 dark:border-white/10 dark:bg-white/10">
                  <Icon className="size-4 text-foreground/75" />
                </span>
                <div>
                  <h3 className="text-base font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </SectionPanel>
          );
        })}
      </div>
    </SectionShell>
  );
}
