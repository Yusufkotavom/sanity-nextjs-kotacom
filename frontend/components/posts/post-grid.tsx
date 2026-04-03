"use client";

import PostCard from "@/components/ui/post-card";
import TaxonomyBadgeList from "@/components/ui/taxonomy-badge-list";
import LoadMoreGrid from "@/components/ui/load-more-grid";

type PostGridProps = {
  posts: any[];
  initialCount?: number;
  step?: number;
  gridClassName?: string;
};

export default function PostGrid({
  posts,
  initialCount = 16,
  step = 16,
  gridClassName = "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3",
}: PostGridProps) {
  return (
    <LoadMoreGrid
      items={posts}
      initialCount={initialCount}
      step={step}
      gridClassName={gridClassName}
      buttonLabel="Show more posts"
      getKey={(post: any) => post.slug?.current || post.title}
      renderItem={(post: any) => (
        <PostCard
          {...post}
          href={`/blog/${post.slug?.current}`}
          className="h-full"
          excerpt={
            <>
              <TaxonomyBadgeList
                items={post.categories}
                className="mb-2.5"
                size="compact"
              />
              <span>{post.excerpt}</span>
            </>
          }
        />
      )}
    />
  );
}
