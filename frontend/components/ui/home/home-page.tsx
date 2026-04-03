import Link from "next/link";
import { ArrowRight, Layers3, MoveRight, Orbit, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionIntro, SectionPanel, SectionShell } from "@/components/ui/section-shell";
import { kotacomSplitIllustrations } from "@/lib/illustrations/kotacom-split";
import { homePageContent } from "@/lib/local-content/home-page";

export default function HomePageView() {
  return (
    <main className="bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_14%,#ffffff_100%)] text-foreground">
      <section className="relative overflow-hidden border-b border-border/60 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.08),transparent_38%),linear-gradient(180deg,#0d1117_0%,#12161d_30%,#f7f7f7_30.1%,#ffffff_100%)] text-white">
        <div className="absolute inset-x-0 top-0 h-px bg-white/15" />
        <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-[1400px] flex-col justify-between px-5 pb-8 pt-16 md:px-8 md:pt-20 xl:px-12">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-white/56">
                {homePageContent.badge}
              </p>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-balance md:text-7xl">
                {homePageContent.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/68 md:text-lg">
                {homePageContent.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-white text-black hover:bg-white/92">
                  <Link href={homePageContent.primaryCta.href}>
                    {homePageContent.primaryCta.label}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/16 bg-white/6 text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href={homePageContent.secondaryCta.href}>
                    {homePageContent.secondaryCta.label}
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative lg:pb-4">
              <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset,0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 text-[11px] uppercase tracking-[0.28em] text-white/48">
                  <span>Unified Delivery Plane</span>
                  <span>Kotacom</span>
                </div>
                <div className="grid gap-6 px-5 py-5 md:grid-cols-[0.9fr_1.1fr]">
                  <div className="space-y-4">
                    {homePageContent.heroStats.map((item) => (
                      <div key={item.label} className="border-b border-white/8 pb-4 last:border-none last:pb-0">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-white/42">
                          {item.label}
                        </p>
                        <p className="mt-2 text-lg font-medium text-white/92">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="overflow-hidden rounded-[24px] border border-white/10 bg-black/20">
                    <img
                      src={kotacomSplitIllustrations.hero.cetakBukuV2}
                      alt="Kotacom delivery illustration"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-[26px] border border-white/10 bg-white/8 md:grid-cols-4">
            {homePageContent.pillars.map((pillar) => (
              <Link
                key={pillar.title}
                href={pillar.href}
                className="group bg-black/12 px-5 py-5 transition hover:bg-black/18"
              >
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/44">
                  {pillar.eyebrow}
                </p>
                <p className="mt-2 text-base font-medium text-white/90">{pillar.title}</p>
                <p className="mt-3 text-sm leading-6 text-white/58">
                  {pillar.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm text-white/78">
                  Open lane
                  <MoveRight className="size-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SectionShell className="py-18 md:py-24">
        <SectionIntro
          eyebrow="System"
          title="Empat jalur inti, satu bahasa delivery."
          description="Konten di halaman live kotacom.id cukup kaya, tapi tersebar menjadi beberapa blok layanan, portfolio, dan produk. Di homepage ini, isinya ditata ulang menjadi satu sistem yang lebih mudah dipahami dalam sekali scroll."
          className="max-w-3xl"
        />
        <div className="mt-10 grid gap-x-10 gap-y-12 lg:grid-cols-2">
          {homePageContent.pillars.map((pillar) => (
            <article key={pillar.title} className="border-t border-border/70 pt-5">
              <div className="flex items-center gap-3 text-sm text-foreground/46">
                <Layers3 className="size-4" />
                <span>{pillar.eyebrow}</span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{pillar.title}</h3>
              <p className="mt-4 max-w-xl text-base leading-7 text-foreground/70">
                {pillar.description}
              </p>
              <Button asChild variant="link" className="mt-4 h-auto px-0 text-foreground">
                <Link href={pillar.href}>Buka jalur ini</Link>
              </Button>
            </article>
          ))}
        </div>
      </SectionShell>

      <section className="border-y border-border/60 bg-muted/20">
        <SectionShell className="py-18 md:py-24" divider={false}>
          <SectionIntro
            eyebrow="Proof"
            title="Bagian terbaik dari home lama tetap dipakai: bukti, bukan janji."
            description="Portfolio, layanan unggulan, dan pesan operasional dari kotacom.id diperluas menjadi blok proof yang lebih rapat, supaya pengunjung cepat melihat relevansi sebelum membaca semua detail layanan."
            className="max-w-3xl"
          />
          <SectionPanel className="mt-10 grid gap-px overflow-hidden rounded-[28px] border border-border/70 bg-border/60 lg:grid-cols-3">
            {homePageContent.proofs.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group bg-background px-6 py-6 transition hover:bg-muted/30"
              >
                <p className="text-[11px] uppercase tracking-[0.28em] text-foreground/44">
                  {item.meta}
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-4 text-sm leading-6 text-foreground/68">
                  {item.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                  Detail
                  <MoveRight className="size-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </SectionPanel>
        </SectionShell>
      </section>

      <SectionShell className="py-18 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionIntro
            eyebrow="Workflow"
            title="Bukan marketplace layanan. Ini sistem kerja."
            description="Gaya Vercel yang Anda minta terasa kuat saat halaman bergerak seperti product narrative. Karena itu bagian ini disusun sebagai tiga langkah, bukan katalog card yang saling berebut perhatian."
            className="max-w-3xl"
          />
          <div className="space-y-6">
            {homePageContent.workflow.map((step, index) => (
              <div key={step.title} className="flex gap-4 border-t border-border/70 pt-5 first:border-t-0 first:pt-0">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border/70 text-sm font-medium text-foreground/72">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-foreground/70">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <section className="border-y border-border/60 bg-[linear-gradient(180deg,rgba(245,245,245,0.8)_0%,rgba(255,255,255,1)_100%)]">
        <SectionShell className="py-18 md:py-24" divider={false}>
          <SectionIntro
            eyebrow="Tech Stack"
            title="Stack yang disebut di kotacom.id tetap dipertahankan, tapi dibingkai sebagai kapasitas delivery."
            description="Alih-alih sekadar daftar logo, bagian ini menunjukkan kenapa stack itu relevan: untuk delivery website modern, software custom, dan infrastruktur operasional yang lebih stabil."
            className="max-w-3xl"
          />
          <SectionPanel className="mt-10 grid gap-px overflow-hidden rounded-[28px] border border-border/70 bg-border/60 md:grid-cols-2 xl:grid-cols-4">
            {homePageContent.tech.map((item) => (
              <div key={item.name} className="bg-background px-5 py-5">
                <div className="flex items-center gap-3">
                  <Orbit className="size-4 text-foreground/54" />
                  <h3 className="text-lg font-semibold tracking-tight">{item.name}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-foreground/66">{item.detail}</p>
              </div>
            ))}
          </SectionPanel>
        </SectionShell>
      </section>

      <SectionShell className="py-18 md:py-24">
        <div className="overflow-hidden rounded-[34px] border border-border/70 bg-[linear-gradient(135deg,#0d1117_0%,#151b25_48%,#0d1117_100%)] px-6 py-10 text-white md:px-10 md:py-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-white/64">
                <ShieldCheck className="size-4" />
                Rewritten from kotacom.id, tuned for a sharper landing flow
              </div>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">
                {homePageContent.finalCta.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-white/68 md:text-lg">
                {homePageContent.finalCta.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/92">
                <Link href={homePageContent.finalCta.primary.href}>
                  {homePageContent.finalCta.primary.label}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/16 bg-white/6 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href={homePageContent.finalCta.secondary.href}>
                  {homePageContent.finalCta.secondary.label}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </SectionShell>
    </main>
  );
}
