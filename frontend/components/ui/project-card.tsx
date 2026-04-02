import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

export default function ProjectCard({
  title,
  slug,
  excerpt,
  image,
  clientName,
  industry,
  completionYear,
}: {
  title?: string;
  slug?: { current?: string };
  excerpt?: string;
  image?: any;
  clientName?: string;
  industry?: string;
  completionYear?: number;
}) {
  return (
    <Link
      href={`/projects/${slug?.current || ""}`}
      className="group flex w-full flex-col justify-between overflow-hidden rounded-3xl border p-4 transition hover:border-primary"
    >
      <div>
        {image?.asset?._id && (
          <div className="relative mb-4 h-56 overflow-hidden rounded-2xl">
            <Image
              src={urlFor(image).url()}
              alt={image?.alt || ""}
              fill
              style={{ objectFit: "cover" }}
              placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
              blurDataURL={image?.asset?.metadata?.lqip || ""}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </div>
        )}
        <h3 className="text-display-lg">{title}</h3>
        {(clientName || industry || completionYear) && (
          <p className="text-meta mt-2">
            {[clientName, industry, completionYear].filter(Boolean).join(" • ")}
          </p>
        )}
        {excerpt && <p className="text-ui-body mt-3">{excerpt}</p>}
      </div>
      <div className="mt-6 flex h-10 w-10 items-center justify-center rounded-full border group-hover:border-primary">
        <ChevronRight className="text-border group-hover:text-primary" size={24} />
      </div>
    </Link>
  );
}
