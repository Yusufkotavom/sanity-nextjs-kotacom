"use client";

import { useMemo, useState, useEffect } from "react";
import ProjectCard from "@/components/ui/project-card";
import LoadMoreGrid from "@/components/ui/load-more-grid";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const types = useMemo(() => {
    const t = new Set(projects.map((p) => p.projectType || "portfolio"));
    return ["All", ...Array.from(t)];
  }, [projects]);

  const categories = useMemo(() => {
    const validProjects = selectedType === "All"
      ? projects
      : projects.filter(p => (p.projectType || "portfolio") === selectedType);

    const c = new Set(
      validProjects.flatMap((p) => p.categories?.map((cat: any) => cat.title) || [])
    );
    // Sort categories alphabetically but keep "All" first
    return ["All", ...Array.from(c).sort()];
  }, [projects, selectedType]);

  // Reset category if it's no longer valid for the selected type
  useEffect(() => {
    if (selectedCategory !== "All" && !categories.includes(selectedCategory)) {
      setSelectedCategory("All");
    }
  }, [categories, selectedCategory]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchType =
        selectedType === "All" || (p.projectType || "portfolio") === selectedType;
      const matchCategory =
        selectedCategory === "All" ||
        (p.categories && p.categories.some((c: any) => c.title === selectedCategory));
      return matchType && matchCategory;
    });
  }, [projects, selectedType, selectedCategory]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-6">
        
        {/* Top: Type Toggle Tabs */}
        <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
          <Tabs value={selectedType} onValueChange={setSelectedType} className="w-full">
            <TabsList className="h-10 items-center justify-start rounded-full bg-muted/60 p-1">
              {types.map((type) => {
                const label = type === "All" ? "All Projects" : type === "portfolio" ? "Portfolio" : type === "website" ? "Website" : type === "software" ? "Software" : type === "repository" ? "Repository" : type;
                
                return (
                  <TabsTrigger
                    key={type}
                    value={type}
                    className="rounded-full px-5 py-1.5 text-sm font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
                  >
                    {label}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>

        {/* Bottom: Category Filter and Count */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-border pt-6 mt-1">
          <div className="inline-flex flex-col gap-1.5 sm:flex-row sm:items-center">
            <label className="text-sm font-medium text-foreground/70 sm:mr-2">Category Filter:</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[220px] h-10 rounded-lg">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat === "All" ? "All Categories" : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm font-medium text-primary/80 bg-primary/10 px-4 py-2 rounded-lg inline-flex items-center">
            <span className="w-2 h-2 rounded-full bg-primary/60 mr-2"></span>
            Showing {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
          </div>
        </div>
      </div>
      {filteredProjects.length > 0 ? (
        <LoadMoreGrid
          items={filteredProjects}
          initialCount={initialCount}
          step={step}
          gridClassName={gridClassName}
          buttonLabel="Show more projects"
          getKey={(project: any) => project.slug?.current || project.title}
          renderItem={(project: any) => <ProjectCard {...project} />}
        />
      ) : (
        <div className="py-20 text-center text-foreground/60">
          <p>No projects commonly match the selected filters.</p>
        </div>
      )}
    </div>
  );
}
