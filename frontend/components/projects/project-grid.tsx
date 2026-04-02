"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ui/project-card";

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
  const total = projects.length;
  const [visibleCount, setVisibleCount] = useState(Math.min(initialCount, total));
  const visibleProjects = useMemo(
    () => projects.slice(0, visibleCount),
    [projects, visibleCount],
  );
  const hasMore = visibleCount < total;

  return (
    <div>
      <div className={gridClassName}>
        {visibleProjects.map((project: any) => (
          <ProjectCard key={project.slug?.current || project.title} {...project} />
        ))}
      </div>

      {hasMore ? (
        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setVisibleCount((prev) => Math.min(prev + step, total))}
          >
            Show more projects
          </Button>
        </div>
      ) : null}
    </div>
  );
}
