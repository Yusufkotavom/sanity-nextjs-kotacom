import { Star } from "lucide-react";
import { SectionIntro, SectionPanel, SectionShell } from "@/components/ui/section-shell";
import type { LegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";

export function TestimonialsSection({
  testimonials,
  eyebrow = "Testimonials",
  title = "Apa Kata Klien",
  description = "Kumpulan pengalaman klien yang menilai kualitas, komunikasi, dan konsistensi delivery kami.",
  badgeLabel = "Testimoni klien",
}: {
  testimonials: NonNullable<LegacyRewriteCopy["testimonials"]>;
  eyebrow?: string;
  title?: string;
  description?: string;
  badgeLabel?: string;
}) {
  return (
    <SectionShell id="testimoni" className="py-10 md:py-12">
      <SectionIntro
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {testimonials.map((item, index) => (
          <SectionPanel
            key={`${item.name}-${item.role}`}
            tone={index % 2 === 0 ? "neutral" : "rose"}
            className="rounded-[1.65rem] p-5 md:p-6"
          >
            <div className="flex h-full flex-col">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-white/75 px-3 py-1 text-ui-label text-foreground/70 dark:border-white/10 dark:bg-white/5">
                <Star className="size-3.5" />
                {badgeLabel}
              </div>
              <blockquote className="mt-4 text-xl leading-9 font-medium text-foreground/88 md:text-2xl">
                “{item.quote}”
              </blockquote>
              <footer className="mt-5 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{item.name}</span>
                <span className="mx-2">·</span>
                {item.role}
              </footer>
            </div>
          </SectionPanel>
        ))}
      </div>
    </SectionShell>
  );
}
