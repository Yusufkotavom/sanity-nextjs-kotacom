import { Quote } from "lucide-react";
import { SectionShell, SplitVisualPanel } from "@/components/ui/section-shell";

export default function QuoteSpotlight({
  quote,
  author,
  role,
}: {
  quote: string;
  author: string;
  role: string;
}) {
  return (
    <SectionShell>
      <SplitVisualPanel
        tone="rose"
        className="rounded-[1.9rem]"
        content={
          <>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-white/75 px-3 py-1 text-ui-label text-foreground/70 dark:border-white/10 dark:bg-white/5">
              <Quote className="size-3.5" />
              Customer story
            </div>
            <blockquote className="mt-4 text-2xl leading-10 font-medium text-foreground/88 md:text-4xl md:leading-[1.2]">
              “{quote}”
            </blockquote>
            <footer className="mt-6 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{author}</span>
              <span className="mx-2">·</span>
              {role}
            </footer>
          </>
        }
        visualClassName="p-6 md:p-8"
        visual={
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="space-y-3">
              {["Brief jelas", "Eksekusi cepat", "CTA lebih siap closing"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-black/8 bg-white/80 px-4 py-3 text-sm text-foreground/82 dark:border-white/10 dark:bg-white/10"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-5 h-32 rounded-[1.5rem] border border-white/40 bg-[linear-gradient(135deg,rgba(255,184,76,0.46),rgba(255,104,104,0.34),rgba(118,217,255,0.28))] dark:border-white/10" />
          </div>
        }
      />
    </SectionShell>
  );
}
