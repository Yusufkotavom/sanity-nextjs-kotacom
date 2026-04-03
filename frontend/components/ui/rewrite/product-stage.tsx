import Image from "next/image";
import { SectionIntro, SectionShell, SplitVisualPanel } from "@/components/ui/section-shell";

type ProductStageItem = {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  bullets: string[];
};

export default function ProductStage({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: ProductStageItem[];
}) {
  if (items.length === 0) return null;

  return (
    <SectionShell>
      <SectionIntro
        eyebrow="Product Stage"
        title={title}
        description={description}
      />
      <div className="space-y-5">
        {items.map((item, index) => (
          <SplitVisualPanel
            key={item.title}
            tone={index % 2 === 0 ? "neutral" : "sky"}
            reverse={index % 2 === 1}
            content={
              <>
                <p className="text-ui-label text-foreground/55">{item.eyebrow}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                  {item.description}
                </p>
                <ul className="mt-5 space-y-3">
                  {item.bullets.map((bullet, bulletIndex) => (
                    <li
                      key={bullet}
                      className="flex items-center gap-3 rounded-2xl border border-black/8 bg-white/70 px-4 py-3 text-sm text-foreground/82 dark:border-white/10 dark:bg-white/10"
                    >
                      <span className="inline-flex size-7 items-center justify-center rounded-full border border-black/8 bg-white text-xs font-semibold dark:border-white/10 dark:bg-black/20">
                        {bulletIndex + 1}
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </>
            }
            visualClassName="p-4 md:p-5"
            visual={
              item.image ? (
                <div className="relative h-full min-h-[260px] overflow-hidden rounded-[1.2rem] border border-black/8 bg-white dark:border-white/10 dark:bg-black/20">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 45vw, 100vw"
                  />
                </div>
              ) : (
                <div className="grid h-full min-h-[260px] gap-3 rounded-[1.2rem] border border-black/8 bg-white/75 p-4 dark:border-white/10 dark:bg-white/10">
                  <div className="rounded-2xl border border-black/8 bg-background/90 p-4 dark:border-white/10">
                    <div className="h-2 w-24 rounded-full bg-foreground/12" />
                    <div className="mt-3 h-20 rounded-xl bg-[linear-gradient(135deg,rgba(255,184,76,0.36),rgba(118,217,255,0.3))]" />
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-2xl border border-black/8 bg-background/90 p-4 dark:border-white/10">
                      <div className="h-2 w-16 rounded-full bg-foreground/12" />
                      <div className="mt-3 h-16 rounded-xl bg-foreground/6" />
                    </div>
                    <div className="rounded-2xl border border-black/8 bg-background/90 p-4 dark:border-white/10">
                      <div className="h-2 w-14 rounded-full bg-foreground/12" />
                      <div className="mt-3 h-16 rounded-xl bg-foreground/6" />
                    </div>
                  </div>
                </div>
              )
            }
          />
        ))}
      </div>
    </SectionShell>
  );
}
