import Image from "next/image";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generateBasicMetadata } from "@/sanity/lib/metadata";
import { kotacomSplitIllustrations } from "@/lib/illustrations/kotacom-split";

const palette = [
  { name: "Blue 500", hex: "#0EA5E9", note: "primary accent and workflow direction" },
  { name: "Blue 700", hex: "#0369A1", note: "headline accent and contrast partner" },
  { name: "Red 500", hex: "#EF4444", note: "alert, urgency, production checkpoints" },
  { name: "Yellow 400", hex: "#FACC15", note: "highlight, quality markers, CTA support" },
  { name: "Ink", hex: "#0F172A", note: "main text and deep contrast" },
  { name: "White", hex: "#FFFFFF", note: "base surface and breathing room" },
];

const principles = [
  "Background tetap netral. Warna masuk ke chip, border, icon, tool, dan object fokus.",
  "Maskot hiu harus terlihat ramah, cerdas, dan profesional. Hindari ekspresi agresif.",
  "Setiap ilustrasi wajib menjelaskan proses bisnis, bukan dekorasi abstrak.",
  "Selalu sisakan safe area teks 35-45% untuk headline dan CTA.",
];

const priorityPack = [
  "Hero universal `jasa-cetak-buku-(kota)` dengan 2-3 variasi visual.",
  "Jenis Layanan Utama: POD, Offset, Finishing/Jilid.",
  "Visual CTA/Contact untuk konsultasi cepat cetak buku.",
  "Visual social proof/testimonial untuk trust building.",
];

const heroVariants = [
  {
    title: "Hero V1",
    src: kotacomSplitIllustrations.hero.cetakBukuV1,
    description: "Versi balanced dengan workflow menyeluruh dan brand cue kuat.",
  },
  {
    title: "Hero V2",
    src: kotacomSplitIllustrations.hero.cetakBukuV2,
    description: "Versi lebih editorial dengan panel proses dan CTA emphasis.",
  },
  {
    title: "Workflow Companion",
    src: kotacomSplitIllustrations.ui.processWorkflow,
    description: "Companion visual untuk section proses dengan ritme yang seragam.",
  },
];

const serviceIllustrations = [
  {
    title: "Cetak Buku Satuan (POD)",
    src: kotacomSplitIllustrations.services.printing.pod,
    description: "Single proof, approval flow, dan positioning untuk order volume rendah.",
  },
  {
    title: "Cetak Buku Massal (Offset)",
    src: kotacomSplitIllustrations.services.printing.offset,
    description: "Stack produksi, efisiensi volume, dan narasi skala operasional.",
  },
  {
    title: "Finishing & Jilid Premium",
    src: kotacomSplitIllustrations.services.printing.finishingJilid,
    description: "Hardcover, finishing, dan kualitas detail pasca-cetak.",
  },
];

const supportIllustrations = [
  {
    title: "CTA / Contact",
    src: kotacomSplitIllustrations.ui.ctaConsultation,
    description: "Visual konsultasi cepat untuk mendorong inquiry.",
  },
  {
    title: "Social Proof",
    src: kotacomSplitIllustrations.proof.testimonial,
    description: "Visual testimonial/trust layer untuk mendorong keputusan.",
  },
];

const referenceStyle = {
  title: "Primary Style Reference",
  src: "/reference/flat-illustration-reference.jpg",
  description:
    "Target visual language: flat editorial illustration, airy layout, character-driven scene, UI props, bubble/chat cues, and organic accent shapes.",
};

export async function generateMetadata() {
  return await generateBasicMetadata({
    title: "Style Guide",
    description:
      "Unified style guide for KOTACOM illustration system, component direction, and priority visual pack.",
    slug: "style-guide",
  });
}

function ColorChip({
  name,
  hex,
  note,
}: {
  name: string;
  hex: string;
  note: string;
}) {
  return (
    <div className="rounded-2xl border bg-card p-4">
      <div
        className="h-20 rounded-xl border"
        style={{ backgroundColor: hex }}
        aria-label={`${name} ${hex}`}
      />
      <div className="mt-3">
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-xs text-foreground/70">{hex}</p>
        <p className="mt-2 text-xs text-foreground/70">{note}</p>
      </div>
    </div>
  );
}

function IllustrationCard({
  title,
  src,
  description,
}: {
  title: string;
  src: string;
  description: string;
}) {
  return (
    <Card className="overflow-hidden rounded-3xl">
      <div className="relative aspect-[16/9] border-b bg-muted/20">
        <Image src={src} alt={title} fill className="object-cover" />
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

export default function StyleGuidePage() {
  return (
    <section>
      <div className="container py-16 xl:py-20">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            links={[
              { label: "Home", href: "/" },
              { label: "Style Guide", href: "/style-guide" },
            ]}
          />

          <div className="mb-12 grid gap-8 rounded-[2rem] border bg-card p-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <Badge variant="outline" className="rounded-full px-3 py-1">
                Unified Style Guide
              </Badge>
              <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
                KOTACOM illustration system, component rhythm, and visual priority pack.
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-foreground/70 md:text-lg">
                Halaman ini menyatukan art direction, warna, mascot rules, dan batch
                aset ilustrasi prioritas untuk rollout halaman jasa. Fokus utama saat
                ini adalah cluster `jasa-cetak-buku-*`.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <a href="#priority-pack">Lihat Priority Pack</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="#illustration-gallery">Lihat Gallery</a>
                </Button>
              </div>
            </div>
            <Card className="rounded-[1.5rem] border-sky-300/30">
              <CardHeader>
                <CardTitle>Primary Focus</CardTitle>
                <CardDescription>
                  Lock sementara untuk produksi visual supaya rollout tidak menyebar.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-foreground/80">
                {priorityPack.map((item) => (
                  <p key={item} className="rounded-xl border bg-background px-4 py-3">
                    {item}
                  </p>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Card className="rounded-[2rem]">
              <CardHeader>
                <CardTitle>Design Principles</CardTitle>
                <CardDescription>
                  Aturan visual yang harus tetap konsisten di semua ilustrasi.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-7 text-foreground/80">
                {principles.map((item) => (
                  <p key={item} className="rounded-xl border px-4 py-3">
                    {item}
                  </p>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-[2rem]">
              <CardHeader>
                <CardTitle>Brand Palette</CardTitle>
                <CardDescription>
                  Biru, merah, kuning, dan netral dipakai sebagai object-level accents.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {palette.map((item) => (
                  <ColorChip key={item.hex} {...item} />
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <div className="mb-6">
              <h2 className="text-3xl font-semibold tracking-tight">Reference Style</h2>
              <p className="mt-2 max-w-3xl text-foreground/70">
                Ini style anchor yang harus diikuti untuk batch berikutnya. Aset baru
                harus mendekati ritme, proporsi, dan storytelling visual referensi ini.
              </p>
            </div>

            <IllustrationCard
              title={referenceStyle.title}
              src={referenceStyle.src}
              description={referenceStyle.description}
            />
          </div>

          <div id="priority-pack" className="mt-12">
            <div className="mb-6">
              <h2 className="text-3xl font-semibold tracking-tight">Priority Pack</h2>
              <p className="mt-2 max-w-3xl text-foreground/70">
                Batch yang dibutuhkan sekarang untuk mendukung remodeling halaman
                cetak buku: hero, layanan utama, CTA/contact, dan social proof.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {heroVariants.map((item) => (
                <IllustrationCard key={item.src} {...item} />
              ))}
            </div>
          </div>

          <div className="mt-12">
            <div className="mb-6">
              <h2 className="text-3xl font-semibold tracking-tight">
                Service Illustration Set
              </h2>
              <p className="mt-2 max-w-3xl text-foreground/70">
                Set inti untuk menjelaskan bisnis cetak buku secara konkret pada section
                layanan utama.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {serviceIllustrations.map((item) => (
                <IllustrationCard key={item.src} {...item} />
              ))}
            </div>
          </div>

          <div className="mt-12">
            <div className="mb-6">
              <h2 className="text-3xl font-semibold tracking-tight">Support Visuals</h2>
              <p className="mt-2 max-w-3xl text-foreground/70">
                Gambar pendukung untuk CTA, inquiry, dan trust layer agar ritme halaman
                tidak monoton.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {supportIllustrations.map((item) => (
                <IllustrationCard key={item.src} {...item} />
              ))}
            </div>
          </div>

          <div id="illustration-gallery" className="mt-12">
            <Card className="rounded-[2rem]">
              <CardHeader>
                <CardTitle>Implementation Notes</CardTitle>
                <CardDescription>
                  Hal yang harus dijaga saat aset mulai dipasang ke halaman produksi.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border p-5">
                  <h3 className="font-semibold">Hero usage</h3>
                  <p className="mt-2 text-sm leading-7 text-foreground/70">
                    Gunakan 1 hero utama per template dan simpan 2 varian lain untuk
                    A/B visual atau style selection. Safe area kiri untuk headline tetap
                    wajib dipertahankan.
                  </p>
                </div>
                <div className="rounded-2xl border p-5">
                  <h3 className="font-semibold">Service section usage</h3>
                  <p className="mt-2 text-sm leading-7 text-foreground/70">
                    Ilustrasi layanan harus langsung relevan ke judul layanan. Hindari
                    reuse visual generik jika membuat intent section melemah.
                  </p>
                </div>
                <div className="rounded-2xl border p-5">
                  <h3 className="font-semibold">CTA cadence</h3>
                  <p className="mt-2 text-sm leading-7 text-foreground/70">
                    CTA image dipakai di interval scroll tengah atau menjelang penutupan
                    halaman untuk menjaga momentum inquiry.
                  </p>
                </div>
                <div className="rounded-2xl border p-5">
                  <h3 className="font-semibold">Mascot consistency</h3>
                  <p className="mt-2 text-sm leading-7 text-foreground/70">
                    Saat nanti masuk batch hiu versi penuh, proporsi kepala, mata, dan
                    gesture harus konsisten antar file. Style guide ini jadi baseline.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
