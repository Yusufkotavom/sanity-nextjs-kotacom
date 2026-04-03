"use client";

import ServiceCard from "@/components/ui/service-card";
import LoadMoreGrid from "@/components/ui/load-more-grid";

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
  return (
    <LoadMoreGrid
      items={services}
      initialCount={initialCount}
      step={step}
      gridClassName={gridClassName}
      buttonLabel="Show more services"
      getKey={(service: any) => service.slug?.current || service.title}
      renderItem={(service: any) => <ServiceCard {...service} />}
    />
  );
}
