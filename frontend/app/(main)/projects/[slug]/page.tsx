import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/sanity/lib/image";
import InlineMetaList from "@/components/ui/inline-meta-list";
import GlobalWhatsAppButton from "@/components/global-whatsapp-button";
import GlobalWhatsAppPanel from "@/components/global-whatsapp-panel";
import {
  fetchSanityProjectBySlug,
  fetchSanityProjectsStaticParams,
} from "@/sanity/lib/fetch";
import { generatePageMetadata } from "@/sanity/lib/metadata";
import JsonLd from "@/components/seo/json-ld";
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo-jsonld";

type BreadcrumbLink = {
  label: string;
  href: string;
};

export async function generateStaticParams() {
  const projects = await fetchSanityProjectsStaticParams();

  return projects.map((project) => ({
    slug: project.slug?.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const project = await fetchSanityProjectBySlug({ slug: params.slug });

  if (!project) notFound();
  return await generatePageMetadata({ page: project, slug: `projects/${params.slug}` });
}

export default async function ProjectPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const project = await fetchSanityProjectBySlug({ slug: params.slug });

  if (!project) notFound();

  const links: BreadcrumbLink[] = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: project.title as string, href: "#" },
  ];
  const projectPath = `/projects/${params.slug}`;
  const articleJsonLd = buildArticleJsonLd({
    title: project.title || "",
    description: project.meta?.description || project.excerpt,
    path: projectPath,
    image: project.meta?.image || project.image,
    datePublished: project._createdAt || undefined,
    dateModified: project._updatedAt || undefined,
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: project.title || "Project", path: projectPath },
  ]);

  return (
    <section>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <div className="container py-16 xl:py-20">
        <article className="mx-auto max-w-4xl">
          <Breadcrumbs links={links} />
          <h1 className="mb-4 text-3xl lg:text-5xl">{project.title}</h1>
          {project.excerpt && (
            <p className="mb-6 text-lg text-foreground/75">{project.excerpt}</p>
          )}
          {project.image?.asset?._id && (
            <div className="mb-6 overflow-hidden rounded-2xl">
              <Image
                src={urlFor(project.image).url()}
                alt={project.image.alt || ""}
                width={project.image.asset?.metadata?.dimensions?.width || 1200}
                height={project.image.asset?.metadata?.dimensions?.height || 720}
                quality={100}
              />
            </div>
          )}
          <InlineMetaList
            className="mb-6"
            items={[
              project.clientName ? `Client: ${project.clientName}` : undefined,
              project.industry ? `Industry: ${project.industry}` : undefined,
              project.completionYear ? `Year: ${project.completionYear}` : undefined,
            ]}
          />
          {project.body && <PortableTextRenderer value={project.body} />}
          {project.projectUrl && (
            <div className="mt-8">
              <Button asChild variant="outline">
                <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                  Visit Project
                </Link>
              </Button>
            </div>
          )}
          <GlobalWhatsAppPanel
            title={`Ingin proyek seperti ${project.title}?`}
            description="Kirim konteks bisnis Anda lewat WhatsApp. Kami bisa bantu memetakan kebutuhan, fitur prioritas, dan estimasi implementasi yang relevan dari studi kasus ini."
            secondaryHref={project.projectUrl || undefined}
            secondaryLabel={project.projectUrl ? "Visit Project" : undefined}
          />
          {project.cta?.href ? (
            <div className="mt-4">
              <GlobalWhatsAppButton
                fallbackHref={project.cta.href}
                fallbackLabel={project.cta.title || "Konsultasi via WhatsApp"}
              />
            </div>
          ) : null}
        </article>
      </div>
    </section>
  );
}
