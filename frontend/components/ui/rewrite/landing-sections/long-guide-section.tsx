import { BookOpenText } from "lucide-react";
import { SectionIntro, SectionShell } from "@/components/ui/section-shell";
import type { LegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";

export function LongGuideSection({
  title,
  longGuide,
  eyebrow = "Decision Guide",
  heading,
  description = "Gunakan panduan singkat ini untuk memperjelas prioritas pembelian, bukan untuk menambah kebingungan baru di akhir halaman.",
  cardEyebrow = "Pertimbangan",
}: {
  title: string;
  longGuide: NonNullable<LegacyRewriteCopy["longGuide"]>;
  eyebrow?: string;
  heading?: string;
  description?: string;
  cardEyebrow?: string;
}) {
  if (!longGuide.length) return null;

  return (
    <SectionShell id="panduan" className="py-10 md:py-12">
      <SectionIntro
        eyebrow={eyebrow}
        title={heading || `Panduan Lengkap ${title}`}
        description={description}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {longGuide.map((item, index) => (
          <article key={item.title} className="surface-card rounded-xl p-5">
            <div className="flex items-center gap-2 text-ui-label text-foreground/60">
              <BookOpenText className="size-4 text-foreground/70" />
              <span>
                {cardEyebrow} {index + 1}
              </span>
            </div>
            <h3 className="mt-3 text-base font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
