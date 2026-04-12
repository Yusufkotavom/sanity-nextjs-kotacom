import ArchiveCategoryFilter from "@/components/ui/archive-category-filter";
import ServiceGrid from "@/components/services/service-grid";
import {
  fetchSanityServiceCategories,
  fetchSanityServices,
} from "@/sanity/lib/fetch";
import { generateBasicMetadata } from "@/sanity/lib/metadata";
import { getLegacySinglePage } from "@/lib/legacy-pages/astro-static";
import { buildLegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";
import { normalizeSeoDescription, normalizeSeoTitle } from "@/lib/seo-normalize";
import RewritePageShell from "@/components/ui/rewrite/page-shell";
import { SectionShell, SectionIntro } from "@/components/ui/section-shell";
import { getJsonUsahaPages } from "@/lib/local-content/json-usaha";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import GlobalWhatsAppButton from "@/components/global-whatsapp-button";
import JsonLd from "@/components/seo/json-ld";
import { buildBreadcrumbJsonLd, buildCollectionPageJsonLd } from "@/lib/seo-jsonld";

export async function generateMetadata() {
  const legacyPage = getLegacySinglePage("layanan");
  if (!legacyPage) {
    return await generateBasicMetadata({
      title: "Layanan IT & Percetakan Kotacom",
      description: "Jelajahi layanan IT, website, software, dan percetakan profesional dari Kotacom Surabaya.",
      slug: "services",
    });
  }

  const copy = buildLegacyRewriteCopy(legacyPage);
  return await generateBasicMetadata({
    title: normalizeSeoTitle(copy.primaryKeyword),
    description: normalizeSeoDescription(copy.description),
    slug: "services",
  });
}

export default async function ServicesPage() {
  const legacyPage = getLegacySinglePage("layanan");
  const [services, categories, usahaPages] = await Promise.all([
    fetchSanityServices(),
    fetchSanityServiceCategories(),
    getJsonUsahaPages(),
  ]);

  const serviceCatalogSection = (
    <SectionShell id="service-catalog" className="pt-0" divider={false}>
      <SectionIntro
        eyebrow="Katalog Layanan"
        title="Pilih layanan yang paling sesuai dengan kebutuhan bisnis Anda."
        description="Semua layanan kami dikelola dari Sanity agar detail teknis, harga, dan kategorinya tetap terupdate."
      />
      <div className="mt-4">
        <ArchiveCategoryFilter
          currentValue="/services"
          allValue="/services"
          options={categories.map((category: any) => ({
            label: category.title,
            value: `/services/${category.slug?.current}`,
          }))}
        />
      </div>
      <div className="mt-8">
        <ServiceGrid services={services as any[]} />
      </div>
    </SectionShell>
  );

  const usahaSection =
    usahaPages.length > 0 ? (
      <SectionShell id="layanan-bisnis">
        <SectionIntro
          eyebrow="Ringkasan Layanan Bisnis"
          title="Rangkuman layanan dari arsip JSON yang sebelumnya di /layanan."
          description="Konten ini kini disatukan agar pengunjung mendapatkan gambaran menyeluruh tanpa berpindah halaman."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {usahaPages.map((page) => {
            const bullets =
              page.features?.length > 0
                ? page.features
                : page.services?.length > 0
                  ? page.services
                  : [];
            const trimmed = bullets.slice(0, 3);

            return (
              <article
                key={page.slug}
                id={page.slug}
                className="surface-card flex h-full flex-col rounded-2xl border border-border/60 p-5"
              >
                {page.badge ? (
                  <p className="text-ui-label text-primary/80">{page.badge}</p>
                ) : null}
                <h3 className="mt-2 text-lg font-semibold">{page.title}</h3>
                <p className="mt-2 text-sm text-foreground/70">
                  {page.description}
                </p>
                {trimmed.length > 0 ? (
                  <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                    {trimmed.map((item) => (
                      <li key={item.title} className="flex gap-2">
                        <span className="mt-1 inline-block size-2 rounded-full bg-primary/70" />
                        <span>{item.title}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/contact">Diskusikan Kebutuhan</Link>
                  </Button>
                  <GlobalWhatsAppButton
                    fallbackHref="/contact"
                    fallbackLabel="Konsultasi via WhatsApp"
                    size="sm"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </SectionShell>
    ) : null;

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Layanan", path: "/services" },
  ]);

  const allServiceItems = [
    ...(services as any[]).filter((s: any) => s.title && s.slug?.current).map((s: any) => ({
      name: s.title,
      url: `/services/${s.slug.current}`,
    })),
    ...usahaPages.filter((p) => p.slug && p.title).map((p) => ({
      name: p.title,
      url: `/services/${p.slug}`,
    })),
  ];

  const collectionJsonLd = buildCollectionPageJsonLd({
    name: "Layanan IT & Percetakan – Kotacom",
    description: "Katalog lengkap layanan website, software, IT service, dan percetakan dari Kotacom Surabaya.",
    url: "/services",
    items: allServiceItems,
  });

  if (!legacyPage) {
    return (
      <section>
        <JsonLd data={breadcrumbJsonLd} />
        <JsonLd data={collectionJsonLd} />
        <div className="container py-16 xl:py-20">
          <div className="mb-10">
            <h1 className="text-4xl font-bold md:text-5xl">Layanan</h1>
            <p className="mt-3 max-w-2xl text-foreground/70">
              Jelajahi layanan IT, website, software, dan percetakan kami serta pilih yang paling sesuai untuk bisnis Anda.
            </p>
            <div className="mt-4">
              <ArchiveCategoryFilter
                currentValue="/services"
                allValue="/services"
                options={categories.map((category: any) => ({
                  label: category.title,
                  value: `/services/${category.slug?.current}`,
                }))}
              />
            </div>
          </div>
          <ServiceGrid services={services as any[]} />
        </div>
      </section>
    );
  }

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={collectionJsonLd} />
      <RewritePageShell
        page={legacyPage}
        routeOverride="/services"
        sectionHrefOverride="/services"
        sectionLabelOverride="Layanan"
      >
        {serviceCatalogSection}
        {usahaSection}
      </RewritePageShell>
    </>
  );
}
