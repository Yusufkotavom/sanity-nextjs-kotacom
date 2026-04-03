import {
  ArchiveCardArrow,
  ArchiveCardExcerpt,
  ArchiveCardMedia,
  ArchiveCardMeta,
  ArchiveCardShell,
  ArchiveCardTitle,
} from "@/components/ui/archive-card";

export default function ProjectCard({
  title,
  slug,
  excerpt,
  image,
  clientName,
  industry,
  completionYear,
}: {
  title?: string;
  slug?: { current?: string };
  excerpt?: string;
  image?: any;
  clientName?: string;
  industry?: string;
  completionYear?: number;
}) {
  return (
    <ArchiveCardShell href={`/projects/${slug?.current || ""}`} density="compact">
      <div>
        <ArchiveCardMedia image={image} heightVariant="compact" className="mb-3 lg:mb-3.5" />
        <ArchiveCardTitle density="compact">{title}</ArchiveCardTitle>
        <ArchiveCardMeta
          density="compact"
          items={[clientName, industry, completionYear]}
        />
        <ArchiveCardExcerpt density="compact">{excerpt}</ArchiveCardExcerpt>
      </div>
      <ArchiveCardArrow density="compact" />
    </ArchiveCardShell>
  );
}
