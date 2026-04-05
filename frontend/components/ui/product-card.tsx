import {
  ArchiveCardArrow,
  ArchiveCardExcerpt,
  ArchiveCardMedia,
  ArchiveCardMeta,
  ArchiveCardShell,
  ArchiveCardTitle,
} from "@/components/ui/archive-card";
import TaxonomyBadgeList from "@/components/ui/taxonomy-badge-list";

export default function ProductCard({
  title,
  slug,
  excerpt,
  image,
  price,
  currency,
  availability,
  categories,
  priority,
}: {
  title?: string;
  slug?: { current?: string };
  excerpt?: string;
  image?: any;
  price?: number;
  currency?: string;
  availability?: string;
  categories?: Array<{ _id?: string; title?: string }>;
  priority?: boolean;
}) {
  return (
    <ArchiveCardShell href={`/products/${slug?.current || ""}`} density="compact">
      <div>
        <ArchiveCardMedia image={image} heightVariant="compact" className="mb-3 lg:mb-3.5" priority={priority} />
        <ArchiveCardTitle density="compact">{title}</ArchiveCardTitle>
        <ArchiveCardMeta
          density="compact"
          items={[
            typeof price === "number" ? `${currency || "IDR"} ${price}` : undefined,
            availability,
          ]}
        />
        <TaxonomyBadgeList
          items={categories}
          size="compact"
          className="mt-2.5 gap-1.5"
        />
        <ArchiveCardExcerpt density="compact">{excerpt}</ArchiveCardExcerpt>
      </div>
      <ArchiveCardArrow density="compact" />
    </ArchiveCardShell>
  );
}
