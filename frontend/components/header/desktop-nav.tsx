import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { NAVIGATION_QUERY_RESULT } from "@/sanity.types";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SanityLink = NonNullable<NAVIGATION_QUERY_RESULT[0]["links"]>[number];
type NavChild = {
  _key?: string;
  group?: string | null;
  icon?: string | null;
  title?: string | null;
  description?: string | null;
  badge?: string | null;
  href?: string | null;
  target?: boolean | null;
};
type NavLinkWithChildren = SanityLink & {
  children?: NavChild[] | null;
  navLocation?: "primary" | "utility" | null;
  showInFooter?: boolean | null;
};

function groupChildren(children: NavChild[]) {
  const grouped = new Map<string, NavChild[]>();
  for (const child of children) {
    const key = child.group?.trim() || "";
    const current = grouped.get(key) || [];
    current.push(child);
    grouped.set(key, current);
  }
  return Array.from(grouped.entries());
}

export default function DesktopNav({
  navigation,
}: {
  navigation: NAVIGATION_QUERY_RESULT;
}) {
  const navItems = (navigation[0]?.links || [])
    .filter((item) => item?.title)
    .map((item) => item as NavLinkWithChildren);

  const primaryItems = navItems.filter((item) => item.navLocation !== "utility");
  const utilityItems = navItems.filter((item) => item.navLocation === "utility");

  return (
    <nav className="hidden w-full items-center justify-between gap-6 lg:flex" aria-label="Primary">
      <ul className="flex min-w-0 items-center gap-1">
        {primaryItems.map((item) => {
          const children = item.children?.filter((child) => child?.title && child?.href) || [];
          const hasChildren = children.length > 0;
          const groupedChildren = groupChildren(children);

          return (
            <li key={item._key} className="group/nav relative">
              <Link
                href={item.href || "#"}
                target={item.target ? "_blank" : undefined}
                rel={item.target ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
              >
                <span>{item.title}</span>
                {hasChildren && <ChevronDown className="size-3.5 text-foreground/50" />}
              </Link>

              {hasChildren && (
                <div className="invisible absolute left-0 top-full z-50 w-[min(860px,calc(100vw-8rem))] translate-y-2 rounded-xl border border-border/60 bg-background p-6 opacity-0 shadow-xl transition-all duration-150 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100 group-focus-within/nav:visible group-focus-within/nav:translate-y-0 group-focus-within/nav:opacity-100">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {groupedChildren.map(([groupName, links]) => (
                      <div key={groupName || "default"} className="space-y-2">
                        {groupName && (
                          <p className="text-[11px] font-medium uppercase tracking-wide text-foreground/50">
                            {groupName}
                          </p>
                        )}
                        <ul className="space-y-1">
                          {links.map((child) => (
                            <li key={child._key || child.href || child.title}>
                              <Link
                                href={child.href || "#"}
                                target={child.target ? "_blank" : undefined}
                                rel={child.target ? "noopener noreferrer" : undefined}
                                className="block rounded-md px-2 py-2 transition-colors hover:bg-accent"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-foreground">
                                    {child.title}
                                  </span>
                                  {child.badge && (
                                    <span className="rounded-full border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-foreground/75">
                                      {child.badge}
                                    </span>
                                  )}
                                </div>
                                {child.description && (
                                  <p className="mt-0.5 line-clamp-2 text-xs text-foreground/65">
                                    {child.description}
                                  </p>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {!!utilityItems.length && (
        <div className="ml-auto flex items-center gap-1">
          {utilityItems.map((item) => (
            <Link
              key={item._key}
              href={item.href || "#"}
              target={item.target ? "_blank" : undefined}
              rel={item.target ? "noopener noreferrer" : undefined}
              className={cn(
                buttonVariants({
                  variant: item.buttonVariant || "ghost",
                  size: "sm",
                }),
                item.buttonVariant === "link" && "px-2",
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
