import ServiceCard from "@/components/ui/service-card";
import ArchiveCategoryFilter from "@/components/ui/archive-category-filter";
import {
  fetchSanityServiceCategories,
  fetchSanityServices,
} from "@/sanity/lib/fetch";

export const metadata = {
  title: "Services",
  description: "Browse our services.",
};

export default async function ServicesPage() {
  const services = await fetchSanityServices();
  const categories = await fetchSanityServiceCategories();

  return (
    <section>
      <div className="container py-16 xl:py-20">
        <div className="mb-10">
          <h1 className="text-4xl font-bold md:text-5xl">Services</h1>
          <p className="mt-3 max-w-2xl text-foreground/70">
            Explore our service offerings and choose what fits your needs.
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service: any) => (
            <ServiceCard key={service.slug?.current || service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
