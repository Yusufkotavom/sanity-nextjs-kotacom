import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { NAVIGATION_QUERY_RESULT } from "@/sanity.types";
import SanityIcon, { type SanityIconValue } from "@/components/icons/sanity-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SanityLink = NonNullable<NAVIGATION_QUERY_RESULT[0]["links"]>[number];
type NavChild = {
  _key?: string;
  group?: string | null;
  icon?: string | null;
  uiIcon?: SanityIconValue;
  title?: string | null;
  badge?: string | null;
  href?: string | null;
  target?: boolean | null;
};
type NavLinkWithChildren = SanityLink & {
  icon?: string | null;
  uiIcon?: SanityIconValue;
  children?: NavChild[] | null;
  navLocation?: "primary" | "more" | "utility" | null;
  showInHeader?: boolean | null;
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
    .filter((item) => item?.title && (item as NavLinkWithChildren)?.showInHeader !== false)
    .map((item) => item as NavLinkWithChildren);

  const primaryItems = navItems.filter((item) => item.navLocation !== "utility");
  const mainItems = primaryItems.filter((item) => item.navLocation !== "more");
  const moreItems = navItems.filter((item) => item.navLocation === "more");

  return (
    <nav className="hidden min-w-0 flex-1 items-center lg:flex" aria-label="Primary">
      <ul className="flex min-w-0 items-center gap-1">
        {mainItems.map((item) => {
          const resolvedItemIcon = item.uiIcon || item.icon;
          const children = item.children?.filter((child) => child?.title && child?.href) || [];
          const hasChildren = children.length > 0;
          const groupedChildren = groupChildren(children);

          return (
            <li key={item._key} className="group/nav relative">
              <Link
                href={item.href || "#"}
                target={item.target ? "_blank" : undefined}
                rel={item.target ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-accent/70 hover:text-foreground dark:text-white/72 dark:hover:bg-white/[0.07] dark:hover:text-white"
              >
                <SanityIcon
                  icon={resolvedItemIcon}
                  className="size-4 text-foreground/70 dark:text-white/60"
                />
                <span>{item.title}</span>
                {hasChildren && <ChevronDown className="size-3.5 text-foreground/50 dark:text-white/45" />}
              </Link>

              {hasChildren && (
                <div className="invisible absolute left-0 top-full z-50 w-[min(920px,calc(100vw-7rem))] translate-y-2 rounded-2xl border border-border/70 bg-background/95 p-6 opacity-0 shadow-[0_24px_70px_-28px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-150 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100 group-focus-within/nav:visible group-focus-within/nav:translate-y-0 group-focus-within/nav:opacity-100 dark:border-white/12 dark:bg-black/96 dark:shadow-[0_28px_90px_-30px_rgba(0,0,0,0.85)]">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {groupedChildren.map(([groupName, links]) => (
                      <div key={groupName || "default"} className="space-y-2">
                        {groupName && (
                          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground/45 dark:text-white/45">
                            {groupName}
                          </p>
                        )}
                        <ul className="space-y-1">
                          {links.map((child) => {
                            const resolvedChildIcon = child.uiIcon || child.icon;
                            return (
                              <li key={child._key || child.href || child.title}>
                                <Link
                                  href={child.href || "#"}
                                  target={child.target ? "_blank" : undefined}
                                  rel={child.target ? "noopener noreferrer" : undefined}
                                  className="block rounded-lg border border-transparent px-2.5 py-2.5 transition-colors hover:border-border/70 hover:bg-accent/65 dark:hover:border-white/15 dark:hover:bg-white/[0.06]"
                                >
                                  <div className="flex items-center gap-2">
                                    <SanityIcon
                                      icon={resolvedChildIcon}
                                      className="size-3.5 text-foreground/60 dark:text-white/55"
                                    />
                                    <span className="text-sm font-medium text-foreground dark:text-white/92">
                                      {child.title}
                                    </span>
                                    {child.badge && (
                                      <span className="rounded-full border border-border/70 bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-foreground/75 dark:border-white/18 dark:bg-white/[0.08] dark:text-white/75">
                                        {child.badge}
                                      </span>
                                    )}
                                  </div>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
          );
        })}
        {moreItems.length > 0 && (
          <li className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-accent/70 hover:text-foreground dark:text-white/72 dark:hover:bg-white/[0.07] dark:hover:text-white"
                >
                  <span>More</span>
                  <ChevronDown className="size-3.5 text-foreground/50 dark:text-white/45" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-72 rounded-2xl border-border/70 bg-background/95 p-2 shadow-[0_24px_70px_-28px_rgba(0,0,0,0.45)] backdrop-blur-xl dark:border-white/12 dark:bg-black/96 dark:shadow-[0_28px_90px_-30px_rgba(0,0,0,0.85)]"
              >
                {moreItems.map((item) => {
                  const resolvedItemIcon = item.uiIcon || item.icon;
                  const children =
                    item.children?.filter((child) => child?.title && child?.href) || [];
                  const hasChildren = children.length > 0;

                  if (hasChildren) {
                    return (
                      <DropdownMenuSub key={item._key || item.title}>
                        <DropdownMenuSubTrigger className="rounded-xl px-3 py-2 text-sm font-medium">
                          <SanityIcon
                            icon={resolvedItemIcon}
                            className="size-4 text-foreground/60 dark:text-white/55"
                          />
                          <span>{item.title}</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="w-72 rounded-2xl border-border/70 bg-background/95 p-2 dark:border-white/12 dark:bg-black/96">
                          {children.map((child) => {
                            const resolvedChildIcon = child.uiIcon || child.icon;
                            return (
                              <DropdownMenuItem key={child._key || child.href || child.title} asChild>
                                <Link
                                  href={child.href || "#"}
                                  target={child.target ? "_blank" : undefined}
                                  rel={child.target ? "noopener noreferrer" : undefined}
                                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-foreground dark:text-white/90"
                                >
                                  <SanityIcon
                                    icon={resolvedChildIcon}
                                    className="size-4 text-foreground/60 dark:text-white/55"
                                  />
                                  <span>{child.title}</span>
                                </Link>
                              </DropdownMenuItem>
                            );
                          })}
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                    );
                  }

                  return (
                    <DropdownMenuItem key={item._key || item.title} asChild>
                      <Link
                        href={item.href || "#"}
                        target={item.target ? "_blank" : undefined}
                        rel={item.target ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-foreground dark:text-white/90"
                      >
                        <SanityIcon
                          icon={resolvedItemIcon}
                          className="size-4 text-foreground/60 dark:text-white/55"
                        />
                        <span>{item.title}</span>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        )}
      </ul>
    </nav>
  );
}
