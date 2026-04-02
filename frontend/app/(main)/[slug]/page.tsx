import Blocks from "@/components/blocks";
import JasaCetakBukuCityShell from "@/components/legacy/jasa-cetak-buku-city-shell";
import {
  getJasaCetakBukuCityBySlug,
  getJasaCetakBukuCityStaticParams,
} from "@/lib/local-content/jasa-cetak-buku-kota";
import {
  fetchSanityPageBySlug,
  fetchSanityPagesStaticParams,
} from "@/sanity/lib/fetch";
import { notFound } from "next/navigation";
import { generateBasicMetadata, generatePageMetadata } from "@/sanity/lib/metadata";

export async function generateStaticParams() {
  const pages = await fetchSanityPagesStaticParams();
  const cityPages = getJasaCetakBukuCityStaticParams();

  const sanityParams = pages.map((page) => ({
    slug: page.slug?.current,
  }));

  const dedup = new Map<string, { slug: string }>();
  for (const item of [...sanityParams, ...cityPages]) {
    if (!item?.slug) continue;
    if (!dedup.has(item.slug)) dedup.set(item.slug, { slug: item.slug });
  }

  return Array.from(dedup.values());
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const cityPage = getJasaCetakBukuCityBySlug(params.slug);
  if (cityPage) {
    return await generateBasicMetadata({
      title: cityPage.title || `Jasa cetak buku ${cityPage.city}`,
      description: cityPage.excerpt,
      slug: params.slug,
    });
  }

  const page = await fetchSanityPageBySlug({ slug: params.slug });

  if (!page) {
    notFound();
  }

  return await generatePageMetadata({ page, slug: params.slug });
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const cityPage = getJasaCetakBukuCityBySlug(params.slug);
  if (cityPage) {
    return <JasaCetakBukuCityShell item={cityPage} />;
  }

  const page = await fetchSanityPageBySlug({ slug: params.slug });

  if (!page) {
    notFound();
  }

  return <Blocks blocks={page?.blocks ?? []} />;
}
