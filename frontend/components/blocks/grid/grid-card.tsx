import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERY_RESULT, ColorVariant } from "@/sanity.types";
import { SectionPanel } from "@/components/ui/section-shell";
import SanityIcon from "@/components/icons/sanity-icon";

type Block = NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number];
type GridRow = Extract<Block, { _type: "grid-row" }>;
type GridColumn = NonNullable<NonNullable<GridRow["columns"]>>[number];
type GridCard = Extract<GridColumn, { _type: "grid-card" }>;

interface GridCardProps extends Omit<GridCard, "_type" | "_key"> {
  color?: ColorVariant;
}

export default function GridCard({
  color,
  uiIcon,
  title,
  excerpt,
  image,
  link,
}: GridCardProps) {
  return (
    <Link
      key={title}
      className="group flex w-full rounded-[1.4rem] ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      href={link?.href ?? "#"}
      target={link?.target ? "_blank" : undefined}
    >
      <SectionPanel
        tone={color === "primary" ? "sky" : "neutral"}
        className={cn(
          "flex w-full flex-col justify-between overflow-hidden rounded-[1.4rem] p-5 transition ease-in-out md:p-6",
          color === "primary"
            ? "group-hover:border-primary-foreground/50 group-hover:bg-sky-100/75 dark:group-hover:bg-sky-950/28"
            : "group-hover:border-primary/35 group-hover:bg-white/85 dark:group-hover:bg-white/8",
        )}
      >
        <div>
          {image && image.asset?._id && (
            <div className="relative mb-4 h-[15rem] overflow-hidden rounded-[1.15rem] border border-white/40 bg-white/60 sm:h-[20rem] md:h-[25rem] lg:h-[9.5rem] xl:h-[12rem] dark:border-white/10 dark:bg-white/5">
              <Image
                src={urlFor(image).url()}
                alt={image.alt || ""}
                placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
                blurDataURL={image?.asset?.metadata?.lqip || ""}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
                quality={100}
              />
            </div>
          )}
          <div className={cn(color === "primary" ? "text-background" : undefined)}>
            {title && (
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2">
                  <SanityIcon icon={uiIcon} className="size-5" />
                <h3 className="text-xl font-semibold leading-tight md:text-2xl">
                  {title}
                </h3>
                </div>
              </div>
            )}
            {excerpt ? (
              <p className="text-sm leading-6 text-muted-foreground md:text-base">
                {excerpt}
              </p>
            ) : null}
          </div>
        </div>
        <Button
          className="mt-6 self-start rounded-full"
          size="lg"
          variant={link?.buttonVariant}
          asChild
        >
          <div className="inline-flex items-center gap-2">
            <SanityIcon icon={link?.uiIcon || link?.icon} className="size-4" />
            <span>{link?.title ?? "Learn More"}</span>
          </div>
        </Button>
      </SectionPanel>
    </Link>
  );
}
