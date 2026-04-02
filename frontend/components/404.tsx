import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { kotacomSplitIllustrations } from "@/lib/illustrations/kotacom-split";
import MicroBadges from "@/components/micro-badges";

export default function Custom404() {
  return (
    <div className="relative z-20 py-12 md:py-16">
      <div className="container">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border/70 bg-card p-6 md:p-8">
          <div className="grid items-center gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h1 className="font-bold text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Page not found
              </h1>
              <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
                Halaman yang Anda cari tidak tersedia. Anda bisa kembali ke beranda
                atau lanjutkan ke halaman layanan utama.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <Link href="/">Back to Home page</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/services">Explore Services</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border/60 bg-muted/20">
              <Image
                src={kotacomSplitIllustrations.states.notFound}
                alt="404 state illustration"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 45vw, 100vw"
                priority
              />
            </div>
          </div>
        </div>
        <MicroBadges />
      </div>
    </div>
  );
}
