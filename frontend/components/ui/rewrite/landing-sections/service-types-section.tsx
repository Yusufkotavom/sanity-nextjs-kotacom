import Image from "next/image";
import Link from "next/link";
import { BookOpenText } from "lucide-react";
import { SectionIntro, SectionPanel, SectionShell } from "@/components/ui/section-shell";
import type { LegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";

export function ServiceTypesSection({
  serviceTypes,
  title = "Jenis Layanan Utama",
  description = "Kami mengategorikan layanan berdasarkan kebutuhan spesifik Anda untuk mempermudah eksekusi dan meningkatkan hasil kampanye bisnis.",
}: {
  serviceTypes: NonNullable<LegacyRewriteCopy["serviceTypes"]>;
  title?: string;
  description?: string;
}) {
  return (
    <SectionShell id="layanan" className="py-10 md:py-12">
      <SectionIntro
        eyebrow="Service Focus"
        title={title}
        description={description}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {serviceTypes.map((item, index) => (
          <SectionPanel
            key={item.title}
            tone={index % 3 === 0 ? "amber" : index % 3 === 1 ? "sky" : "emerald"}
            className="group overflow-hidden rounded-[1.65rem] p-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(15,23,42,0.14)] md:p-5"
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
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    sizes="(min-width: 1280px) 28vw, (min-width: 768px) 45vw, 100vw"
                  />
                </div>
              ) : null}
              {item.href ? (
                <div className="mt-5">
                  <Link
                    href={item.href}
                    className="inline-flex rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-foreground transition duration-300 hover:bg-white group-hover:border-black/20 group-hover:translate-x-1 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:group-hover:border-white/20"
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
