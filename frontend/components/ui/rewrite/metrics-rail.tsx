import { ArrowUpRight } from "lucide-react";
import { SectionPanel, SectionShell } from "@/components/ui/section-shell";

type MetricItem = {
  value: string;
  label: string;
  brand?: string;
};

export default function MetricsRail({
  items,
}: {
  items: MetricItem[];
}) {
  if (items.length === 0) return null;

  return (
    <SectionShell className="py-8 md:py-10">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item, index) => (
          <SectionPanel
            key={`${item.value}-${item.label}`}
            tone={index % 4 === 0 ? "amber" : index % 4 === 1 ? "sky" : index % 4 === 2 ? "emerald" : "rose"}
            className="rounded-[1.5rem] p-5"
          >
            <p className="text-3xl font-semibold tracking-tight md:text-4xl">
              {item.value}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.label}</p>
            {item.brand ? (
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/75 px-3 py-1 text-xs text-foreground/72 dark:border-white/10 dark:bg-white/10">
                <span>{item.brand}</span>
                <ArrowUpRight className="size-3.5" />
              </div>
            ) : null}
          </SectionPanel>
        ))}
      </div>
    </SectionShell>
  );
}
