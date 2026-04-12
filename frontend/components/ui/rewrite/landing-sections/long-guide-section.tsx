import { BookOpenText } from "lucide-react";
import { SectionShell } from "@/components/ui/section-shell";
import type { LegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";

export function LongGuideSection({
  title,
  longGuide,
  heading,
}: {
  title: string;
  longGuide: NonNullable<LegacyRewriteCopy["longGuide"]>;
  heading?: string;
}) {
  if (!longGuide.length) return null;

  return (
    <SectionShell id="panduan" className="py-10 md:py-12">
      <div className="mb-4 flex items-center gap-2">
        <BookOpenText className="size-4 text-foreground/70" />
        <h2 className="text-xl font-semibold md:text-2xl">
          {heading || `Panduan Lengkap ${title}`}
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {longGuide.map((item) => (
          <article key={item.title} className="surface-card rounded-xl p-5">
            <h3 className="text-base font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
