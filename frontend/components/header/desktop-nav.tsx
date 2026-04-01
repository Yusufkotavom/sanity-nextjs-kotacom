import Link from "next/link";
import { NAVIGATION_QUERY_RESULT } from "@/sanity.types";
import { SOCIAL_ICON_MAP } from "@/components/icons/social-icons";

type SanityLink = NonNullable<NAVIGATION_QUERY_RESULT[0]["links"]>[number];
type NavChild = {
  _key?: string;
  group?: string | null;
  icon?: string | null;
  title?: string | null;
  href?: string | null;
  target?: boolean | null;
};
type NavLinkWithChildren = SanityLink & { icon?: string | null; children?: NavChild[] | null };

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
  const navItems = (navigation[0]?.links || []).filter((item) => item?.title);

  return (
    <nav className="hidden w-full lg:block" aria-label="Primary">
      <div className="grid auto-cols-fr grid-flow-col items-start gap-2">
        {navItems.map((rawItem) => {
          const item = rawItem as NavLinkWithChildren;
          const ItemIcon = item.icon ? SOCIAL_ICON_MAP[item.icon] : null;
          const children = item.children?.filter((child) => child?.title && child?.href) || [];
          const groupedChildren = groupChildren(children);

          return (
            <div key={item._key} className="min-w-[140px] rounded-md px-2 py-1">
              <Link
                href={item.href || "#"}
                target={item.target ? "_blank" : undefined}
                rel={item.target ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
              >
                {ItemIcon && <ItemIcon className="size-4" />}
                {item.title}
              </Link>

              {!!children.length && (
                <div className="mt-2 space-y-2">
                  {groupedChildren.map(([groupName, links]) => (
                    <div key={groupName || "default"}>
                      {groupName && (
                        <p className="px-2 text-[11px] uppercase tracking-wide text-foreground/45">
                          {groupName}
                        </p>
                      )}
                      <ul className="mt-1 space-y-0.5">
                        {links.map((child) => {
                          const ChildIcon = child.icon ? SOCIAL_ICON_MAP[child.icon] : null;
                          return (
                            <li key={child._key || child.href || child.title}>
                              <Link
                                href={child.href || "#"}
                                target={child.target ? "_blank" : undefined}
                                rel={child.target ? "noopener noreferrer" : undefined}
                                className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm text-foreground/65 transition-colors hover:bg-accent hover:text-foreground"
                              >
                                {ChildIcon && <ChildIcon className="size-4" />}
                                {child.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
