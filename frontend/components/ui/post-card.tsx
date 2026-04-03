import { cn } from "@/lib/utils";
import { POSTS_QUERY_RESULT } from "@/sanity.types";
import {
  ArchiveCardArrow,
  ArchiveCardExcerpt,
  ArchiveCardMedia,
  ArchiveCardShell,
  ArchiveCardTitle,
} from "@/components/ui/archive-card";

type PostCard = NonNullable<POSTS_QUERY_RESULT[number]>;

interface PostCardProps extends Omit<PostCard, "slug"> {
  className?: string;
  href?: string;
}

export default function PostCard({
  className,
  href,
  title,
  excerpt,
  image,
}: PostCardProps) {
  return (
    <ArchiveCardShell
      href={href || "#"}
      density="compact"
      className={cn("ease-in-out", className)}
    >
      <div className="flex flex-col">
        <ArchiveCardMedia
          image={image}
          heightVariant="compact"
          className="mb-3 lg:mb-3.5"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          quality={100}
        />
        {title && (
          <div className="mb-1">
            <ArchiveCardTitle density="compact">{title}</ArchiveCardTitle>
          </div>
        )}
        <ArchiveCardExcerpt density="compact" className="mt-1">
          {excerpt}
        </ArchiveCardExcerpt>
      </div>
      <ArchiveCardArrow density="compact" className="mt-3 xl:mt-4" />
    </ArchiveCardShell>
  );
}
