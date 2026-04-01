"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { TableOfContentsItem } from "@/lib/table-of-contents";

export default function BlogTableOfContents({
  items,
  variant = "all",
}: {
  items: TableOfContentsItem[];
  variant?: "all" | "mobile" | "desktop";
}) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!items.length) {
      return;
    }

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Number(a.target.getAttribute("data-toc-order")) -
              Number(b.target.getAttribute("data-toc-order")),
          );

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-100px 0px -60% 0px",
        threshold: [0, 1],
      },
    );

    elements.forEach((el, index) => {
      el.setAttribute("data-toc-order", String(index));
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [items]);

  if (!items.length) {
    return null;
  }

  const showMobile = variant !== "desktop";
  const showDesktop = variant !== "mobile";

  return (
    <>
      {showMobile && (
        <details className="mb-6 rounded-xl border border-border bg-muted/20 p-4 lg:hidden">
          <summary className="cursor-pointer text-sm font-semibold">
            Table of contents
          </summary>
          <nav className="mt-3 space-y-2">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "block text-sm transition-colors hover:text-foreground",
                  item.level === 3 && "pl-3",
                  item.level === 4 && "pl-6",
                  activeId === item.id ? "text-foreground font-medium" : "text-muted-foreground",
                )}
              >
                {item.text}
              </a>
            ))}
          </nav>
        </details>
      )}

      {showDesktop && (
        <aside className="hidden lg:block lg:sticky lg:top-24 h-fit">
          <div className="rounded-xl border border-border bg-muted/20 p-4">
            <p className="mb-3 text-sm font-semibold">Table of contents</p>
            <nav className="space-y-2">
              {items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={cn(
                    "block text-sm transition-colors hover:text-foreground",
                    item.level === 3 && "pl-3",
                    item.level === 4 && "pl-6",
                    activeId === item.id
                      ? "text-foreground font-medium"
                      : "text-muted-foreground",
                  )}
                >
                  {item.text}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      )}
    </>
  );
}
