import Link from "next/link";
import type { LegacyAstroPage } from "@/lib/legacy-pages/astro-static";
import type { StrategicLink } from "@/lib/legacy-pages/internal-links";
import { SectionPanel, SectionShell } from "@/components/ui/section-shell";

type RewriteRelatedLinksProps = {
  page: LegacyAstroPage;
  related: LegacyAstroPage[];
  strategicLinks?: StrategicLink[];
};

export default function RewriteRelatedLinks({
  page: _page,
  related,
  strategicLinks = [],
}: RewriteRelatedLinksProps) {
  return (
    <SectionShell className="py-12">
      <SectionPanel tone="amber" className="rounded-[1.75rem] p-5 md:p-6">
        {strategicLinks.length > 0 ? (
          <div className="mt-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/70">
              Lanjutkan Ke Halaman Strategis
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {strategicLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex rounded-md border border-amber-300/30 bg-background px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-amber-100/70 dark:hover:bg-amber-900/30"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
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
                    className="inline-flex rounded-md border border-border/70 bg-background px-3 py-1.5 text-xs text-foreground/85 transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </SectionPanel>
    </SectionShell>
  );
}
