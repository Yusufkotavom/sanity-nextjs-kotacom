import Image from "next/image";
import Link from "next/link";
import { BookOpenText } from "lucide-react";
import { SectionIntro, SectionPanel, SectionShell } from "@/components/ui/section-shell";
import type { LegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";

export function ServiceTypesSection({
  serviceTypes,
}: {
  serviceTypes: NonNullable<LegacyRewriteCopy["serviceTypes"]>;
}) {
  return (
    <SectionShell id="layanan" className="py-10 md:py-12">
      <SectionIntro
        eyebrow="Service Focus"
        title="Jenis Layanan Utama"
        description="Area layanan utama saya padatkan menjadi lane cards yang lebih cepat discan daripada deretan panel panjang."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {serviceTypes.map((item, index) => (
          <SectionPanel
            key={item.title}
            tone={index % 3 === 0 ? "amber" : index % 3 === 1 ? "sky" : "emerald"}
            className="overflow-hidden rounded-[1.65rem] p-4 md:p-5"
          >
            <div className="flex h-full flex-col">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-white/75 px-3 py-1 text-ui-label text-foreground/70 dark:border-white/10 dark:bg-white/5">
                <BookOpenText className="size-3.5" />
                Layanan {index + 1}
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {item.description}
              </p>
              {item.image ? (
                <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-[1.35rem] border border-white/40 bg-white/70 dark:border-white/10 dark:bg-white/10">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 28vw, (min-width: 768px) 45vw, 100vw"
                  />
                </div>
              ) : null}
              {item.href ? (
                <div className="mt-5">
                  <Link
                    href={item.href}
                    className="inline-flex rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                  >
                    Lihat detail
                  </Link>
                </div>
              ) : null}
            </div>
          </SectionPanel>
        ))}
      </div>
    </SectionShell>
  );
}
