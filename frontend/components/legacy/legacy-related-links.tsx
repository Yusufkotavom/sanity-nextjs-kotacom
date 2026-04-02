import Link from "next/link";
import type { LegacyAstroPage } from "@/lib/legacy-pages/astro-static";

type LegacyRelatedLinksProps = {
  page: LegacyAstroPage;
  related: LegacyAstroPage[];
};

export default function LegacyRelatedLinks({
  page,
  related,
}: LegacyRelatedLinksProps) {
  return (
    <section className="container py-10">
      <div className="rounded-xl border border-border/70 bg-background p-5 md:p-6">
        <p className="text-meta">
          Legacy route: <code>{page.route}</code>
        </p>
        {related.length > 0 ? (
          <div className="mt-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/70">
              Halaman Terkait
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {related.map((item) => (
                <li key={item.route}>
                  <Link
                    href={item.route}
                    className="inline-flex rounded-md border border-border/70 px-3 py-1.5 text-xs text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
