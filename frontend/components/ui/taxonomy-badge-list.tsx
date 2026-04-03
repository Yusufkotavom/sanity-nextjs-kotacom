import Link from "next/link";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TaxonomyItem = {
  _id?: string;
  title?: string;
  slug?: {
    current?: string;
  };
};

export default function TaxonomyBadgeList({
  items,
  baseHref,
  className,
  size = "default",
}: {
  items?: TaxonomyItem[];
  baseHref?: string;
  className?: string;
  size?: "default" | "compact";
}) {
  if (!items?.length) {
    return null;
  }

  const badgeClassName =
    size === "compact" ? "px-2 py-0.5 text-[11px] leading-4" : undefined;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item, index) => {
        const key = `${item?._id || item?.slug?.current || item?.title || "taxonomy"}-${index}`;
        const content = item?.title || "";

        if (baseHref && item?.slug?.current) {
          return (
            <Link
              key={key}
              href={`${baseHref}/${item.slug.current}`}
              className={cn(badgeVariants({ variant: "secondary" }), badgeClassName)}
            >
              {content}
            </Link>
          );
        }

        return (
          <Badge key={key} variant="secondary" className={badgeClassName}>
            {content}
          </Badge>
        );
      })}
    </div>
  );
}
