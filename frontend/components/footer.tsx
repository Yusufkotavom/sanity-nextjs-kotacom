import Logo from "@/components/logo";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { fetchSanitySettings, fetchSanityNavigation } from "@/sanity/lib/fetch";
import { NAVIGATION_QUERY_RESULT, SETTINGS_QUERY_RESULT } from "@/sanity.types";
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
type NavLinkWithChildren = SanityLink & {
  icon?: string | null;
  navLocation?: "primary" | "utility" | null;
  showInFooter?: boolean | null;
  children?: NavChild[] | null;
};
type SettingsWithSocial = SETTINGS_QUERY_RESULT & {
  socialLinks?: Array<{
    _key?: string;
    platform?: string | null;
    url?: string | null;
    target?: boolean | null;
  }> | null;
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

export default async function Footer() {
  const settings = await fetchSanitySettings();
  const settingsWithSocial = settings as SettingsWithSocial;
  const navigation = await fetchSanityNavigation();
  const navItems = (navigation[0]?.links || [])
    .filter((item) => item?.title)
    .map((item) => item as NavLinkWithChildren)
    .filter((item) => item.showInFooter !== false);
  const footerPrimaryLinks = navItems.filter((item) => item.navLocation !== "utility");
  const footerUtilityLinks = navItems.filter((item) => item.navLocation === "utility");
  const footerColumns = navItems.filter(
    (item) =>
      (item.children?.filter((child) => child?.title && child?.href).length || 0) >
      0,
  );

  return (
    <footer>
      <div className="dark:bg-background dark:text-gray-300 border-t">
        <div className="container py-12 xl:py-14">
          <Link href="/" className="inline-block" aria-label="Home page">
            <Logo settings={settings} />
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-7 text-primary">
            {footerPrimaryLinks.map((navItem: SanityLink) => (
              <Link
                key={navItem._key}
                href={navItem.href || "#"}
                target={navItem.target ? "_blank" : undefined}
                rel={navItem.target ? "noopener noreferrer" : undefined}
                className={cn(
                  buttonVariants({
                    variant: navItem.buttonVariant || "default",
                  }),
                  navItem.buttonVariant === "ghost" &&
                    "transition-colors hover:text-foreground/80 text-foreground/60 text-sm p-0 h-auto hover:bg-transparent",
                )}
              >
                {navItem.title}
              </Link>
            ))}
          </div>
          {!!footerUtilityLinks.length && (
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {footerUtilityLinks.map((navItem: SanityLink) => (
                <Link
                  key={navItem._key}
                  href={navItem.href || "#"}
                  target={navItem.target ? "_blank" : undefined}
                  rel={navItem.target ? "noopener noreferrer" : undefined}
                  className={cn(
                    buttonVariants({
                      variant: navItem.buttonVariant || "outline",
                    }),
                    "h-8 px-3 text-xs",
                  )}
                >
                  {navItem.title}
                </Link>
              ))}
            </div>
          )}

          {!!footerColumns.length && (
            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 xl:grid-cols-5">
              {footerColumns.map((item) => {
                const children =
                  item.children?.filter((child) => child?.title && child?.href) || [];
                const groupedChildren = groupChildren(children);

                return (
                  <div key={item._key} className="min-w-0">
                    <Link
                      href={item.href || "#"}
                      target={item.target ? "_blank" : undefined}
                      rel={item.target ? "noopener noreferrer" : undefined}
                      className="text-sm font-semibold text-foreground"
                    >
                      {item.title}
                    </Link>

                    <div className="mt-4 space-y-4">
                      {groupedChildren.map(([groupName, links]) => (
                        <div key={groupName || "default"}>
                          {groupName && (
                            <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-foreground/45">
                              {groupName}
                            </p>
                          )}
                          <ul className="space-y-2">
                            {links.map((child) => (
                              <li key={child._key || child.href || child.title}>
                                <Link
                                  href={child.href || "#"}
                                  target={child.target ? "_blank" : undefined}
                                  rel={child.target ? "noopener noreferrer" : undefined}
                                  className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                                >
                                  {child.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!!settingsWithSocial?.socialLinks?.length && (
            <ul className="mt-10 flex flex-wrap items-center gap-4 border-t pt-8">
              {settingsWithSocial.socialLinks.map((item) => {
                const Icon = item?.platform
                  ? SOCIAL_ICON_MAP[item.platform]
                  : undefined;

                if (!item?.url) return null;

                return (
                  <li key={item._key || item.url}>
                    <Link
                      href={item.url}
                      target={item.target ? "_blank" : undefined}
                      rel={item.target ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-foreground"
                    >
                      {Icon && <Icon className="size-4" />}
                      <span className="capitalize">{item.platform || "Link"}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="mt-8 flex flex-row gap-6 border-t pt-8 text-xs lg:mt-10">
            <div className="flex items-center gap-2 text-foreground/60">
              <span>&copy; {new Date().getFullYear()}</span>
              {settings?.copyright && (
                <span className="[&>p]:!m-0">
                  <PortableTextRenderer value={settings.copyright} />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
