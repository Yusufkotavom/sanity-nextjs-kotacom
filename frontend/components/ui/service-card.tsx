import {
  ArchiveCardArrow,
  ArchiveCardExcerpt,
  ArchiveCardMedia,
  ArchiveCardMeta,
  ArchiveCardShell,
  ArchiveCardTitle,
} from "@/components/ui/archive-card";
import TaxonomyBadgeList from "@/components/ui/taxonomy-badge-list";

export default function ServiceCard({
  title,
  slug,
  excerpt,
  image,
  duration,
  startingPrice,
  currency,
  categories,
}: {
  title?: string;
  slug?: { current?: string };
  excerpt?: string;
  image?: any;
  duration?: string;
  startingPrice?: number;
  currency?: string;
  categories?: Array<{ _id?: string; title?: string }>;
}) {
  return (
    <ArchiveCardShell href={`/services/${slug?.current || ""}`} density="compact">
      <div>
        <ArchiveCardMedia image={image} heightVariant="compact" className="mb-3 lg:mb-3.5" />
        <ArchiveCardTitle density="compact">{title}</ArchiveCardTitle>
        <ArchiveCardMeta
          density="compact"
          items={[
            duration,
            typeof startingPrice === "number"
              ? `From ${currency || "IDR"} ${startingPrice}`
              : undefined,
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
