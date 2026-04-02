"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/product-card";

type ProductGridProps = {
  products: any[];
  initialCount?: number;
  step?: number;
};

export default function ProductGrid({
  products,
  initialCount = 16,
  step = 16,
}: ProductGridProps) {
  const total = products.length;
  const [visibleCount, setVisibleCount] = useState(
    Math.min(initialCount, total),
  );

  const visibleProducts = useMemo(
    () => products.slice(0, visibleCount),
    [products, visibleCount],
  );

  const hasMore = visibleCount < total;

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {visibleProducts.map((product: any) => (
          <ProductCard key={product.slug?.current || product.title} {...product} />
        ))}
      </div>

      {hasMore ? (
        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setVisibleCount((prev) => Math.min(prev + step, total))}
          >
            Show more products
          </Button>
        </div>
      ) : null}
    </div>
  );
}
