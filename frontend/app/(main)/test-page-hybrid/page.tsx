import Blocks from "@/components/blocks";
import { fetchSanityPageBySlug } from "@/sanity/lib/fetch";
import { generateBasicMetadata, generatePageMetadata } from "@/sanity/lib/metadata";
import type { ReactNode } from "react";

function OwnershipTag({
  tone,
  children,
}: {
  tone: "code" | "sanity";
  children: ReactNode;
}) {
  const styles =
    tone === "code"
      ? "border-foreground/15 bg-foreground/[0.04] text-foreground/72 dark:border-white/15 dark:bg-white/[0.06] dark:text-white/75"
      : "border-emerald-500/25 bg-emerald-500/10 text-emerald-800 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-200";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] ${styles}`}
    >
      {children}
    </span>
  );
}

function InfoLine({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border/60 py-3 text-sm last:border-b-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium text-foreground">{value}</span>
    </div>
  );
}

export async function generateMetadata() {
  const page = await fetchSanityPageBySlug({ slug: "test-page-hybrid" });

  if (page) {
    return generatePageMetadata({
      page: {
        ...page,
        meta: {
          ...page.meta,
          noindex: true,
        },
      },
      slug: "test-page-hybrid",
    });
  }

  return generateBasicMetadata({
    title: "Test Page Hybrid",
    description:
      "Demo hybrid page yang menggabungkan route code-driven dengan block content dari Sanity.",
    slug: "test-page-hybrid",
    noindex: true,
  });
}

export default async function TestPageHybrid() {
  const page = await fetchSanityPageBySlug({ slug: "test-page-hybrid" });
  const pageWithSplit = page as (typeof page & { topBlockCount?: number }) | null;
  const blocks = page?.blocks ?? [];
  const blockTypes = blocks.map((block) => block._type);
  const hasSanityBlocks = blockTypes.length > 0;
  const rawTopBlockCount =
    typeof pageWithSplit?.topBlockCount === "number"
      ? pageWithSplit.topBlockCount
      : 3;
  const topBlockCount = Math.max(0, Math.min(rawTopBlockCount, blocks.length));
  const topBlocks = blocks.slice(0, topBlockCount);
  const bottomBlocks = blocks.slice(topBlockCount);

  return (
    <main className="bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-border/60 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.10),transparent_34%),linear-gradient(180deg,rgba(15,23,42,0.04),transparent_62%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.14),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_62%)]">
        <div className="container py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_380px] lg:items-end">
            <div className="max-w-4xl space-y-6">
              <OwnershipTag tone="code">Code Guardrail</OwnershipTag>
              <div className="space-y-5">
                <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  Blueprint hybrid yang jelas antara route ownership dan block
                  ownership.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  Halaman ini sengaja tidak dibuat full CMS. Route, urutan
                  section, fallback, dan source diagnostics tetap di code.
                  Hero, proof, FAQ, dan CTA dibaca dari document
                  <code className="mx-1 rounded bg-background/70 px-1.5 py-0.5 text-sm">
                    page
                  </code>
                  di Sanity agar pola ownership-nya mudah dipahami.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border/70 bg-background/90 p-6 shadow-[0_20px_80px_-36px_rgba(0,0,0,0.38)] backdrop-blur dark:bg-black/40">
              <div className="flex items-center justify-between gap-3">
                <OwnershipTag tone="code">Source Panel</OwnershipTag>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Published
                </span>
              </div>

              <div className="mt-5">
                <InfoLine
                  label="Current mode"
                  value={hasSanityBlocks ? "Hybrid active" : "Fallback only"}
                />
                <InfoLine
                  label="Slug"
                  value={
                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                      test-page-hybrid
                    </code>
                  }
                />
                <InfoLine
                  label="Top Sanity zone"
                  value={topBlocks.length > 0 ? `${topBlocks.length} blocks` : "Empty"}
                />
                <InfoLine
                  label="Bottom Sanity zone"
                  value={
                    bottomBlocks.length > 0 ? `${bottomBlocks.length} blocks` : "Empty"
                  }
                />
                <InfoLine label="Top block count" value={topBlockCount} />
                <InfoLine
                  label="Block registry"
                  value={
                    hasSanityBlocks ? (
                      <span className="max-w-[220px] text-xs leading-5 text-muted-foreground">
                        {blockTypes.join(", ")}
                      </span>
                    ) : (
                      "Unavailable"
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {topBlocks.length > 0 ? (
        <>
          <section className="border-b border-border/60 bg-background">
            <div className="container py-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-2">
                  <OwnershipTag tone="sanity">Sanity Block Zone</OwnershipTag>
                  <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                    Zone atas diambil dari
                    <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-xs">
                      blocks.slice(0, topBlockCount)
                    </code>
                    sehingga editor tetap bebas reorder semua block.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <Blocks blocks={topBlocks} pageTitle={page?.title} />
        </>
      ) : (
        <section className="container py-14">
          <div className="rounded-[2rem] border border-dashed border-border bg-muted/30 p-8">
            <OwnershipTag tone="code">Fallback Preview</OwnershipTag>
            <h2 className="mt-4 text-2xl font-semibold">
              Zone atas Sanity belum tersedia
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Ini perilaku yang diharapkan saat
              <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-xs">
                topBlockCount
              </code>
              bernilai
              <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-xs">0</code>
              atau block atas belum diisi.
            </p>
          </div>
        </section>
      )}

      <section className="border-y border-border/60 bg-muted/20">
        <div className="container py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-8">
              <div className="space-y-4">
                <OwnershipTag tone="code">Code Guardrail</OwnershipTag>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Susunan ideal untuk money page hybrid
                </h2>
                <p className="max-w-3xl text-base leading-7 text-muted-foreground">
                  Page utama tidak sebaiknya full bebas di CMS. Yang dijaga di
                  code adalah sequence, fallback, internal linking penting, dan
                  placement CTA. Yang didelegasikan ke Sanity adalah copy yang
                  memang sering berubah.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-3 border-l border-border/70 pl-5">
                  <div className="text-sm font-medium text-foreground">
                    1. User keeps freedom
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Editor bebas reorder semua block di satu array. Tidak perlu
                    isi placement per block.
                  </p>
                </div>
                <div className="space-y-3 border-l border-border/70 pl-5">
                  <div className="text-sm font-medium text-foreground">
                    2. Page controls split
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Field
                    <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-xs">
                      topBlockCount
                    </code>
                    menentukan berapa block yang tampil sebelum section code.
                  </p>
                </div>
                <div className="space-y-3 border-l border-border/70 pl-5">
                  <div className="text-sm font-medium text-foreground">
                    3. Route stays stable
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Penjelasan tengah, diagnostics, fallback, dan ritme halaman
                    tetap dimiliki route.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border/70 bg-background/90 p-7 shadow-[0_18px_70px_-42px_rgba(0,0,0,0.3)] dark:bg-black/30">
              <OwnershipTag tone="code">Ownership Map</OwnershipTag>
              <div className="mt-6 space-y-6 text-sm leading-6 text-muted-foreground">
                <div>
                  <div className="font-medium text-foreground">Code owns</div>
                  <p className="mt-2">
                    route, section order, fallback state, diagnostics, metadata
                    fallback, and non-negotiable UX rules.
                  </p>
                </div>
                <div>
                  <div className="font-medium text-foreground">Sanity owns</div>
                  <p className="mt-2">
                    block order, block composition, dan isi tiap block di atas
                    maupun bawah section code.
                  </p>
                </div>
                <div>
                  <div className="font-medium text-foreground">Do not hand off</div>
                  <p className="mt-2">
                    canonical rules, diagnostics, dan guardrail yang menentukan
                    bagaimana halaman membelah zone atas dan bawah.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {bottomBlocks.length > 0 ? (
        <section className="border-b border-border/60 bg-background">
          <div className="container py-6">
            <div className="space-y-2">
              <OwnershipTag tone="sanity">Bottom Sanity Zone</OwnershipTag>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                Zone bawah diambil dari
                <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-xs">
                  blocks.slice(topBlockCount)
                </code>
                sehingga kasus seperti 1 block atas + 1 block bawah bisa
                dikontrol tanpa schema block yang kaku.
              </p>
            </div>
          </div>
          <Blocks blocks={bottomBlocks} pageTitle={page?.title} />
        </section>
      ) : null}

      <section className="bg-muted/20">
        <div className="container py-16">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[2rem] border border-border/70 bg-background/90 p-8 dark:bg-black/30">
              <OwnershipTag tone="code">Next Step</OwnershipTag>
              <h2 className="mt-4 text-2xl font-semibold">
                Template ini sekarang layak dijadikan referensi ke
                <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-base">
                  /pembuatan-website
                </code>
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
                Pola yang sama bisa dipakai untuk page utama nyata: editor bebas
                menyusun block, lalu page-level split control menentukan berapa
                block yang tampil sebelum section code-owned di tengah. Dengan
                begitu tim konten dapat bergerak cepat tanpa menambah kerumitan
                field placement di tiap block.
              </p>
            </div>

            <div className="rounded-[2rem] border border-border/70 bg-background/90 p-8 dark:bg-black/30">
              <OwnershipTag tone="code">Failure Mode</OwnershipTag>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
                <li>Jika document page kosong, route tetap tampil.</li>
                <li>Jika reference rusak, renderer sekarang skip item null.</li>
                <li>Jika user hanya punya 2 block, set `topBlockCount = 1`.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
