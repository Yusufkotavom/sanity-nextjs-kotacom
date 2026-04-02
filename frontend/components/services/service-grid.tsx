"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ui/service-card";

type ServiceGridProps = {
  services: any[];
  initialCount?: number;
  step?: number;
  gridClassName?: string;
};

export default function ServiceGrid({
  services,
  initialCount = 16,
  step = 16,
  gridClassName = "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3",
}: ServiceGridProps) {
  const total = services.length;
  const [visibleCount, setVisibleCount] = useState(Math.min(initialCount, total));
  const visibleServices = useMemo(
    () => services.slice(0, visibleCount),
    [services, visibleCount],
  );
  const hasMore = visibleCount < total;

  return (
    <div>
      <div className={gridClassName}>
        {visibleServices.map((service: any) => (
          <ServiceCard key={service.slug?.current || service.title} {...service} />
        ))}
      </div>

      {hasMore ? (
        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setVisibleCount((prev) => Math.min(prev + step, total))}
          >
            Show more services
          </Button>
        </div>
      ) : null}
    </div>
  );
}
