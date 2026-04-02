import { notFound } from "next/navigation";
import JsonUsahaPageView from "@/components/ui/json-usaha-page";
import {
  getJsonUsahaPageBySlug,
  getJsonUsahaStaticParams,
} from "@/lib/local-content/json-usaha";
import { generateBasicMetadata } from "@/sanity/lib/metadata";

export async function generateStaticParams() {
  return getJsonUsahaStaticParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = await getJsonUsahaPageBySlug(params.slug);

  if (!page) {
    notFound();
  }

  return generateBasicMetadata({
    title: page.title,
    description: page.description,
    slug: `layanan/${params.slug}`,
  });
}

export default async function LayananSlugPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = await getJsonUsahaPageBySlug(params.slug);

  if (!page) {
    notFound();
  }

  return <JsonUsahaPageView page={page} />;
}
