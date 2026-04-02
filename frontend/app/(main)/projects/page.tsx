import ProjectCard from "@/components/ui/project-card";
import { fetchSanityProjects } from "@/sanity/lib/fetch";
import { generateBasicMetadata } from "@/sanity/lib/metadata";

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
            Case-driven portfolio of product, service, and software delivery work.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project: any) => (
            <ProjectCard key={project.slug?.current || project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
