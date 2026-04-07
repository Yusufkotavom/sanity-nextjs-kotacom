import ProjectGrid from "@/components/projects/project-grid";
import { fetchSanityProjects } from "@/sanity/lib/fetch";
import { generateBasicMetadata } from "@/sanity/lib/metadata";
import { Suspense } from "react";

export async function generateMetadata() {
  return await generateBasicMetadata({
    title: "Projects",
    description: "Explore selected client projects and delivery outcomes.",
    slug: "projects",
  });
}

export default async function ProjectsPage() {
  const projects = await fetchSanityProjects();

  return (
    <section>
      <div className="container py-16 xl:py-20">
        <div className="mb-10">
          <h1 className="text-4xl font-bold md:text-5xl">Projects</h1>
          <p className="mt-3 max-w-2xl text-foreground/70">
            Explore our case-driven portfolio, web templates, and open-source software delivery.
          </p>
        </div>
        <Suspense fallback={<div className="h-40 flex items-center justify-center">Loading...</div>}>
          <ProjectGrid projects={projects as any[]} />
        </Suspense>
      </div>
    </section>
  );
}
