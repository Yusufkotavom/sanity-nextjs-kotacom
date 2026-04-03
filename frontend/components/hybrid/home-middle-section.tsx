import Link from "next/link";

import { Button } from "@/components/ui/button";
import { homePageContent } from "@/lib/local-content/home-page";

export default function HomeMiddleSection() {
  return (
    <section className="border-y border-border/60 bg-muted/20">
      <div className="container py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_360px]">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center rounded-full border border-border/70 bg-background px-4 py-1 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                {homePageContent.badge}
              </span>
              <h2 className="max-w-4xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Sistem kerja Kotacom dibangun untuk menyatukan website,
                software, IT support, dan percetakan dalam satu ritme delivery.
              </h2>
              <p className="max-w-3xl text-base leading-7 text-muted-foreground">
                Section ini sengaja code-owned agar homepage tetap punya lapisan
                positioning yang stabil meskipun editor bebas mengatur block
                Sanity di atas dan di bawahnya.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {homePageContent.pillars.map((pillar) => (
                <div
                  className="rounded-[1.75rem] border border-border/70 bg-background/90 p-6"
                  key={pillar.href}
                >
                  <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {pillar.eyebrow}
                  </div>
                  <h3 className="mt-3 text-xl font-semibold leading-tight">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {pillar.description}
                  </p>
                  <div className="mt-5">
                    <Button asChild variant="outline">
                      <Link href={pillar.href}>Buka lane</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-border/70 bg-background/90 p-7 shadow-[0_18px_70px_-42px_rgba(0,0,0,0.3)]">
            <div className="space-y-5">
              <div>
                <div className="text-sm font-medium text-foreground">
                  Kenapa shell ini tetap di code
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Homepage tidak hanya butuh variasi content, tetapi juga
                  menjaga narasi inti tentang bagaimana empat lane layanan ini
                  saling terhubung.
                </p>
              </div>

              <div className="space-y-3">
                {homePageContent.workflow.map((step, index) => (
                  <div
                    className="border-l border-border/70 pl-4"
                    key={step.title}
                  >
                    <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Step {index + 1}
                    </div>
                    <div className="mt-1 text-sm font-medium text-foreground">
                      {step.title}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href={homePageContent.primaryCta.href}>
                    {homePageContent.primaryCta.label}
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={homePageContent.secondaryCta.href}>
                    {homePageContent.secondaryCta.label}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
