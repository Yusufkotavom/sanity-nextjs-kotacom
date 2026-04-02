import Image from "next/image";
import { kotacomSplitIllustrations } from "@/lib/illustrations/kotacom-split";

const BADGES = [
  {
    label: "Fast Response",
    src: kotacomSplitIllustrations.micro.fastResponse,
  },
  {
    label: "Secure Process",
    src: kotacomSplitIllustrations.micro.secureProcess,
  },
  {
    label: "Guarantee",
    src: kotacomSplitIllustrations.micro.guarantee,
  },
  {
    label: "Nationwide Delivery",
    src: kotacomSplitIllustrations.micro.nationwideDelivery,
  },
  {
    label: "Custom Request",
    src: kotacomSplitIllustrations.micro.customRequest,
  },
] as const;

export default function MicroBadges() {
  return (
    <section className="container section-divider py-10" id="micro-badges">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {BADGES.map((badge) => (
          <article
            key={badge.label}
            className="rounded-xl border border-border/70 bg-card p-3"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border/40 bg-muted/15">
              <Image
                src={badge.src}
                alt={badge.label}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
              />
            </div>
            <p className="mt-2 text-center text-xs font-medium text-foreground/82">
              {badge.label}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
