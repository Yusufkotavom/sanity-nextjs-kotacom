import Link from "next/link";
import {
  Blocks,
  BriefcaseBusiness,
  LaptopMinimal,
  Network,
  Printer,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  SectionIntro,
  SectionPanel,
  SectionShell,
} from "@/components/ui/section-shell";
import { homePrepareContent } from "@/lib/local-content/home-prepare";
import { cn } from "@/lib/utils";

const laneIconMap = {
  website: LaptopMinimal,
  software: Blocks,
  support: Network,
  printing: Printer,
} as const;

export default function HomePeparMiddleSection() {
  return (
    <>
      <SectionShell className="pt-12 lg:pt-16">
        <SectionPanel
          tone="neutral"
          className="grid gap-8 overflow-hidden rounded-[1.9rem] p-5 md:grid-cols-[minmax(0,1.2fr)_360px] md:p-7 lg:gap-10 lg:p-8"
        >
          <div className="space-y-6">
            <SectionIntro
              eyebrow="Service Architecture"
              title="Empat lane utama tetap dipertahankan, tetapi sekarang hubungannya lebih jelas dan lebih mudah dipindai."
              description="Alih-alih mengulang hero, section ini langsung menjelaskan bagaimana website, software, support, dan printing bekerja sebagai sistem delivery yang saling menguatkan."
              className="mb-0 max-w-4xl"
            />

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {homePrepareContent.lanes.map((lane) => {
                const Icon = laneIconMap[lane.key];

                return (
                  <Link
                    className="group rounded-[1.35rem] border border-border/70 bg-background/85 p-4 transition hover:border-primary/30 hover:bg-background"
                    href={lane.href}
                    key={lane.key}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-muted/40 text-foreground">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                          {lane.eyebrow}
                        </div>
                        <div className="text-sm font-medium text-foreground">
                          {lane.bullets[0]}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="rounded-[1.7rem] border border-border/70 bg-background/90 p-6 shadow-[0_18px_70px_-42px_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-3 text-sm font-medium text-foreground">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-muted/40">
                <Workflow className="h-4 w-4" />
              </span>
              Ritme delivery yang ingin dipertahankan
            </div>
            <div className="mt-5 space-y-4">
              {[
                "Pengunjung paham dulu empat lane inti Kotacom.",
                "Prospek melihat proof dan stack tanpa tenggelam dalam noise.",
                "CTA tetap fokus ke konsultasi dan eksplor layanan.",
                "Block Sanity tetap bebas bergerak di atas dan bawah shell ini.",
              ].map((item, index) => (
                <div className="border-l border-border/70 pl-4" key={item}>
                  <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Step {index + 1}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionPanel>
      </SectionShell>

      <SectionShell>
        <SectionIntro
          eyebrow="Tech Stack Kami"
          title="Teknologi yang dipakai tetap tampil, tetapi sekarang sebagai trust strip yang lebih rapi."
          description="Homepage live sudah kuat di area stack. Di versi prepare ini, daftar teknologi dipadatkan menjadi chip yang membantu trust tanpa mengganggu alur baca utama."
        />
        <div className="flex flex-wrap gap-3">
          {homePrepareContent.techStack.map((item) => (
            <div
              className="rounded-full border border-border/70 bg-muted/35 px-4 py-2 text-sm text-foreground"
              key={item}
            >
              {item}
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell>
        <SectionIntro
          eyebrow="Core Service Lanes"
          title="Empat lane utama tetap dipertahankan karena itu inti positioning homepage live."
          description="Bedanya, sekarang masing-masing lane punya framing yang lebih jelas: bukan hanya apa yang dikerjakan, tetapi juga peran lane tersebut dalam pertumbuhan bisnis."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {homePrepareContent.lanes.map((lane) => {
            const Icon = laneIconMap[lane.key];

            return (
              <SectionPanel
                className="rounded-[1.75rem] p-6 md:p-7"
                key={lane.key}
                tone={lane.key === "software" ? "sky" : "neutral"}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-ui-label text-foreground/55">{lane.eyebrow}</div>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">
                      {lane.title}
                    </h3>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/85">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                  {lane.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {lane.bullets.map((bullet) => (
                    <li
                      className="flex items-center gap-3 text-sm text-foreground/90"
                      key={bullet}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button asChild variant="outline">
                    <Link href={lane.href}>Buka lane</Link>
                  </Button>
                </div>
              </SectionPanel>
            );
          })}
        </div>
      </SectionShell>

      <SectionShell>
        <SectionPanel
          tone="amber"
          className="grid gap-6 rounded-[1.9rem] p-6 md:grid-cols-[minmax(0,1fr)_320px] md:p-8"
        >
          <div>
            <SectionIntro
              eyebrow="Mengapa Kami Ada"
              title="One-stop solution tetap jadi narasi utama, tetapi dipresentasikan lebih dewasa dan lebih product-led."
              description="Bagian live site yang menjelaskan alasan keberadaan Kotacom sudah tepat secara intent. Di sini saya rapikan agar lebih kuat sebagai positioning bisnis dan lebih siap dikombinasikan dengan block CMS."
              className="mb-0 max-w-3xl"
            />
          </div>
          <div className="space-y-3">
            {homePrepareContent.highlights.map((item) => (
              <div
                className="rounded-[1.35rem] border border-border/70 bg-background/90 p-4"
                key={item.title}
              >
                <div className="text-sm font-medium text-foreground">
                  {item.title}
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </SectionPanel>
      </SectionShell>

      <SectionShell>
        <SectionIntro
          eyebrow="Best Service"
          title="Tiga cluster offer dari homepage lama saya pertahankan karena ini blok komersial yang paling mudah dipahami."
          description="Saya sengaja tidak menjadikannya slider atau grid yang terlalu rumit. Untuk halaman utama, tiga blok yang jelas lebih kuat daripada eksplor komponen yang terlalu ramai."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {homePrepareContent.serviceClusters.map((cluster, index) => (
            <SectionPanel
              className="rounded-[1.75rem] p-6 md:p-7"
              key={cluster.title}
              tone={index === 1 ? "sky" : "neutral"}
            >
              <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {cluster.priceHint}
              </div>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">
                {cluster.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {cluster.description}
              </p>
              <ul className="mt-5 space-y-2">
                {cluster.bullets.map((bullet) => (
                  <li className="flex items-center gap-3 text-sm" key={bullet}>
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button asChild variant="outline">
                  <Link href={cluster.href}>Lihat detail</Link>
                </Button>
              </div>
            </SectionPanel>
          ))}
        </div>
      </SectionShell>

      <SectionShell className="pb-16 lg:pb-20">
        <SectionPanel
          tone="sky"
          className="rounded-[1.9rem] p-6 md:p-8"
        >
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_280px] md:items-end">
            <div>
              <div className="flex items-center gap-3 text-ui-label text-foreground/55">
                <Sparkles className="h-4 w-4" />
                Final readiness check
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                {homePrepareContent.closingTitle}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                {homePrepareContent.closingDescription}
              </p>
            </div>
            <div className="space-y-3">
              {[
                {
                  label: "Theme alignment",
                  value: "Rewrite shell dan block visual sudah makin dekat.",
                },
                {
                  label: "Hybrid ready",
                  value: "Top dan bottom blocks tetap bisa dieksperimenkan di Sanity.",
                },
                {
                  label: "Next step",
                  value: "Kunci hero dan proof terbaik, lalu uji sebelum promosi ke `/`.",
                },
              ].map((item) => (
                <div
                  className={cn(
                    "rounded-[1.25rem] border border-border/70 bg-background/90 p-4",
                  )}
                  key={item.label}
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <ShieldCheck className="h-4 w-4" />
                    {item.label}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/contact">Diskusikan kandidat homepage</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Bandingkan dengan homepage aktif</Link>
            </Button>
          </div>
        </SectionPanel>
      </SectionShell>
    </>
  );
}
