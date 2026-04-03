"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type LoadMoreGridProps<T> = {
  items: T[];
  initialCount?: number;
  step?: number;
  gridClassName: string;
  buttonLabel: string;
  getKey: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => ReactNode;
};

export default function LoadMoreGrid<T>({
  items,
  initialCount = 16,
  step = 16,
  gridClassName,
  buttonLabel,
  getKey,
  renderItem,
}: LoadMoreGridProps<T>) {
  const total = items.length;
  const [visibleCount, setVisibleCount] = useState(Math.min(initialCount, total));
  const visibleItems = useMemo(
    () => items.slice(0, visibleCount),
    [items, visibleCount],
  );
  const hasMore = visibleCount < total;

  return (
    <div>
      <div className={gridClassName}>
        {visibleItems.map((item, index) => (
          <div key={getKey(item, index)}>{renderItem(item, index)}</div>
        ))}
      </div>

      {hasMore ? (
        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setVisibleCount((prev) => Math.min(prev + step, total))}
          >
            {buttonLabel}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
