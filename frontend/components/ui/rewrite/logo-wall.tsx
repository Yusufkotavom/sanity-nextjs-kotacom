import { SectionIntro, SectionPanel, SectionShell } from "@/components/ui/section-shell";

export default function LogoWall({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: string[];
}) {
  if (items.length === 0) return null;

  return (
    <SectionShell>
      <SectionIntro
        eyebrow="Trusted Stack"
        title={title}
        description={description}
        align="center"
        className="max-w-4xl"
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((item, index) => (
          <SectionPanel
            key={item}
            tone={index % 5 === 0 ? "neutral" : index % 5 === 1 ? "sky" : index % 5 === 2 ? "amber" : index % 5 === 3 ? "emerald" : "rose"}
            className="rounded-[1.35rem] px-4 py-5 text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/45">
              {item}
            </p>
          </SectionPanel>
        ))}
      </div>
    </SectionShell>
  );
}
