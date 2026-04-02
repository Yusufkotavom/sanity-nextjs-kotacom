"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";

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
  const total = posts.length;
  const [visibleCount, setVisibleCount] = useState(Math.min(initialCount, total));
  const visiblePosts = useMemo(() => posts.slice(0, visibleCount), [posts, visibleCount]);
  const hasMore = visibleCount < total;

  return (
    <div>
      <div className={gridClassName}>
        {visiblePosts.map((post: any) => (
          <Link
            key={post.slug?.current || post.title}
            href={`/blog/${post.slug?.current}`}
            className="group overflow-hidden rounded-3xl border p-4 transition hover:border-primary"
          >
            {post.image?.asset?._id && (
              <div className="relative mb-4 h-56 overflow-hidden rounded-2xl">
                <Image
                  src={urlFor(post.image).url()}
                  alt={post.image.alt || ""}
                  fill
                  style={{ objectFit: "cover" }}
                  placeholder={post.image.asset?.metadata?.lqip ? "blur" : undefined}
                  blurDataURL={post.image.asset?.metadata?.lqip || ""}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
            )}
            <h2 className="text-2xl font-bold leading-tight">{post.title}</h2>
            {post.categories?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {post.categories.map((category: any, index: number) => (
                  <span
                    key={`${category?._id || category?.slug?.current || category?.title || "category"}-${index}`}
                    className={cn(badgeVariants({ variant: "secondary" }))}
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}
            {post.excerpt && <p className="mt-3 text-foreground/75">{post.excerpt}</p>}
          </Link>
        ))}
      </div>

      {hasMore ? (
        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setVisibleCount((prev) => Math.min(prev + step, total))}
          >
            Show more posts
          </Button>
        </div>
      ) : null}
    </div>
  );
}
