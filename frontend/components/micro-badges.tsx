import {
  BadgeCheck,
  ShieldCheck,
  Sparkles,
  Truck,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const BADGES = [
  {
    label: "Fast Response",
    description: "Respon cepat, jelas.",
    icon: Zap,
    accentClassName:
      "bg-amber-500/12 text-amber-700 ring-amber-500/20 dark:bg-amber-400/12 dark:text-amber-200 dark:ring-amber-300/15",
  },
  {
    label: "Secure Process",
    description: "Alur aman, rapi.",
    icon: ShieldCheck,
    accentClassName:
      "bg-sky-500/12 text-sky-700 ring-sky-500/20 dark:bg-sky-400/12 dark:text-sky-200 dark:ring-sky-300/15",
  },
  {
    label: "Guarantee",
    description: "Hasil terjaga konsisten.",
    icon: BadgeCheck,
    accentClassName:
      "bg-emerald-500/12 text-emerald-700 ring-emerald-500/20 dark:bg-emerald-400/12 dark:text-emerald-200 dark:ring-emerald-300/15",
  },
  {
    label: "Nationwide Delivery",
    description: "Kirim ke seluruh Indonesia.",
    icon: Truck,
    accentClassName:
      "bg-violet-500/12 text-violet-700 ring-violet-500/20 dark:bg-violet-400/12 dark:text-violet-200 dark:ring-violet-300/15",
  },
  {
    label: "Custom Request",
    description: "Bisa ikut kebutuhan.",
    icon: Sparkles,
    accentClassName:
      "bg-rose-500/12 text-rose-700 ring-rose-500/20 dark:bg-rose-400/12 dark:text-rose-200 dark:ring-rose-300/15",
  },
] as const;

export default function MicroBadges() {
  return (
    <section className="container section-divider py-10" id="micro-badges">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {BADGES.map((badge) => {
          const Icon = badge.icon;

          return (
            <article
              key={badge.label}
              className="group relative overflow-hidden rounded-[1.4rem] border border-black/8 bg-background/72 p-4 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.4)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-black/12 hover:bg-background/84 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-white/14 dark:hover:bg-white/[0.06]"
            >
              <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-70 dark:via-white/30" />
              <div className="flex h-full flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-2xl ring-1 backdrop-blur-sm",
                      badge.accentClassName
                    )}
                  >
                    <Icon className="size-4.5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="truncate text-sm font-semibold tracking-tight text-foreground/92">
                        {badge.label}
                      </h3>
                      <Badge
                        variant="outline"
                        className="rounded-full border-border/70 bg-background/70 px-2 py-0.5 text-[9px] font-medium tracking-[0.18em] uppercase text-foreground/55 backdrop-blur-sm"
                      >
                        Trust
                      </Badge>
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">
                  {badge.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
