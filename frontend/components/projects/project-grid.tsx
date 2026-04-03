"use client";

import ProjectCard from "@/components/ui/project-card";
import LoadMoreGrid from "@/components/ui/load-more-grid";

type ProjectGridProps = {
  projects: any[];
  initialCount?: number;
  step?: number;
  gridClassName?: string;
};

export default function ProjectGrid({
  projects,
  initialCount = 16,
  step = 16,
  gridClassName = "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3",
}: ProjectGridProps) {
  return (
    <LoadMoreGrid
      items={projects}
      initialCount={initialCount}
      step={step}
      gridClassName={gridClassName}
      buttonLabel="Show more projects"
      getKey={(project: any) => project.slug?.current || project.title}
      renderItem={(project: any) => <ProjectCard {...project} />}
    />
  );
}
