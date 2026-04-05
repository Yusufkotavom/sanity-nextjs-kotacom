import type { LegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";
import { SectionIntro, SectionPanel, SectionShell } from "@/components/ui/section-shell";

export default function RewriteEeatSection({
  copy,
}: {
  copy: LegacyRewriteCopy;
}) {
  if (!copy.eeatPoints || copy.eeatPoints.length === 0) return null;

  return (
    <SectionShell id="kredibilitas" className="py-10 md:py-12">
      <SectionIntro
        eyebrow="E-E-A-T"
        title="Kredibilitas & Kepercayaan"
        description="Sinyal pengalaman, keahlian, otoritas, dan kepercayaan yang relevan untuk keputusan bisnis."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {copy.eeatPoints.map((item, index) => (
          <SectionPanel
            key={`${item.title}-${index}`}
            tone={index % 4 === 0 ? "sky" : index % 4 === 1 ? "amber" : index % 4 === 2 ? "emerald" : "rose"}
            className="rounded-[1.5rem] p-5 md:p-6"
          >
            <h3 className="text-base font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {item.description}
            </p>
          </SectionPanel>
        ))}
      </div>
    </SectionShell>
  );
}
