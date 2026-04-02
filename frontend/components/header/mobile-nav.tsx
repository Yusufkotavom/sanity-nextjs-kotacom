"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Logo from "@/components/logo";
import SocialLinks from "@/components/header/social-links";
import { NAVIGATION_ICON_MAP } from "@/components/icons/navigation-icons";
import { useMemo, useState } from "react";
import { AlignRight, ChevronDown, Moon, Sun, Monitor } from "lucide-react";
import { SETTINGS_QUERY_RESULT, NAVIGATION_QUERY_RESULT } from "@/sanity.types";
import { useTheme } from "next-themes";

type SanityLink = NonNullable<NAVIGATION_QUERY_RESULT[0]["links"]>[number];
type NavChild = {
  _key?: string;
  icon?: string | null;
  title?: string | null;
  description?: string | null;
  badge?: string | null;
  href?: string | null;
  target?: boolean | null;
};
type NavLinkWithChildren = SanityLink & {
  icon?: string | null;
  children?: NavChild[] | null;
  navLocation?: "primary" | "utility" | null;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null;
};

export default function MobileNav({
  navigation,
  settings,
}: {
  navigation: NAVIGATION_QUERY_RESULT;
  settings: SETTINGS_QUERY_RESULT;
}) {
  const [open, setOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const { setTheme, theme } = useTheme();
  const navItems = useMemo(
    () =>
      (navigation[0]?.links || [])
        .filter((item) => item?.title)
        .map((item) => item as NavLinkWithChildren),
    [navigation],
  );
  const navDoc = (navigation[0] as { headerCta?: NavLinkWithChildren | null } | undefined) || {};
  const primaryItems = useMemo(
    () => navItems.filter((item) => item.navLocation !== "utility"),
    [navItems],
  );
  const utilityItems = useMemo(
    () => navItems.filter((item) => item.navLocation === "utility"),
    [navItems],
  );
  const fallbackCta =
    utilityItems.find(
      (item) =>
        item.buttonVariant &&
        item.buttonVariant !== "ghost" &&
        item.buttonVariant !== "link",
    ) || null;
  const headerCta = navDoc.headerCta || fallbackCta;
  const utilityLinks = utilityItems.filter((item) => item._key !== headerCta?._key);
  const defaultOpenGroupKeys = useMemo(
    () =>
      primaryItems
        .filter((item) => (item.children?.filter((child) => child?.title && child?.href).length || 0) > 0)
        .map((item) => item._key || item.title || "menu-item"),
    [primaryItems],
  );

  return (
    <Sheet
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        setOpenGroups(nextOpen ? defaultOpenGroupKeys : []);
      }}
    >
      <SheetTrigger asChild>
        <Button
          aria-label="Open Menu"
          variant="ghost"
          className="h-9 w-9 rounded-full border border-transparent p-0 text-foreground/85 hover:border-border/70 hover:bg-accent/70 focus-visible:ring-1 focus-visible:ring-offset-1 dark:border-white/10 dark:bg-white/[0.02] dark:text-white dark:hover:bg-white/[0.08]"
        >
          <AlignRight className="dark:text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="h-dvh w-screen border-r-0 bg-background p-0 backdrop-blur-2xl sm:max-w-none dark:bg-black"
      >
        <SheetHeader className="section-divider px-6 py-5">
          <div>
            <Logo settings={settings} />
          </div>
          <div className="sr-only">
            <SheetTitle>Main Navigation</SheetTitle>
            <SheetDescription>Navigate to the website pages</SheetDescription>
          </div>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <ul className="list-none space-y-2">
            {primaryItems.map((item) => {
              const ItemIcon = item.icon ? NAVIGATION_ICON_MAP[item.icon] : null;
              const children = item.children?.filter((child) => child?.title && child?.href) || [];
              const hasChildren = children.length > 0;
              const key = item._key || item.title || "menu-item";
              const groupOpen = openGroups.includes(key);

              return (
                <li key={key} className="rounded-lg">
                  {!hasChildren ? (
                    <Link
                      onClick={() => setOpen(false)}
                      href={item.href || "#"}
                      target={item.target ? "_blank" : undefined}
                      rel={item.target ? "noopener noreferrer" : undefined}
                      className={cn(
                        buttonVariants({
                          variant: item.buttonVariant || "ghost",
                        }),
                        "h-10 w-full justify-between rounded-lg border border-transparent px-3 text-left text-sm font-medium dark:text-white/84 dark:hover:border-white/15 dark:hover:bg-white/[0.07] dark:hover:text-white",
                        item.buttonVariant === "ghost" &&
                          "text-foreground/82 hover:border-border/80 hover:bg-accent/80 hover:text-foreground",
                      )}
                    >
                      <span>{item.title}</span>
                      {ItemIcon && <ItemIcon className="size-4 text-foreground/65 dark:text-white/60" />}
                    </Link>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenGroups((current) =>
                            current.includes(key)
                              ? current.filter((itemKey) => itemKey !== key)
                              : [...current, key],
                          )
                        }
                        className="inline-flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-transparent px-3 text-left text-sm font-medium text-foreground/82 hover:border-border/80 hover:bg-accent/80 dark:text-white/84 dark:hover:border-white/15 dark:hover:bg-white/[0.07] dark:hover:text-white"
                      >
                        <span className="inline-flex items-center gap-2">
                          {ItemIcon && <ItemIcon className="size-4" />}
                          {item.title}
                        </span>
                        <ChevronDown
                          className={cn(
                            "size-4 transition-transform",
                            groupOpen && "rotate-180",
                          )}
                        />
                      </button>
                      {groupOpen && (
                        <ul className="ml-3 mt-1 space-y-1 border-l border-border/70 pl-3 dark:border-white/12">
                          {children.map((child) => {
                            const ChildIcon = child.icon ? NAVIGATION_ICON_MAP[child.icon] : null;
                            return (
                              <li key={child._key || child.href || child.title}>
                                <Link
                                  onClick={() => setOpen(false)}
                                  href={child.href || "#"}
                                  target={child.target ? "_blank" : undefined}
                                  rel={child.target ? "noopener noreferrer" : undefined}
                                  className="inline-flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm text-foreground/75 hover:bg-accent/70 hover:text-foreground dark:text-white/74 dark:hover:bg-white/[0.07] dark:hover:text-white"
                                >
                                  <span className="flex flex-col items-start">
                                    <span className="inline-flex items-center gap-1.5">
                                      <span>{child.title}</span>
                                      {child.badge && (
                                        <span className="rounded-full border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-foreground/75 dark:border-white/18 dark:bg-white/[0.08] dark:text-white/75">
                                          {child.badge}
                                        </span>
                                      )}
                                    </span>
                                    {child.description && (
                                      <span className="text-xs text-foreground/55 dark:text-white/55">
                                        {child.description}
                                      </span>
                                    )}
                                  </span>
                                  {ChildIcon && <ChildIcon className="size-4 text-foreground/65 dark:text-white/58" />}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </>
                  )}
                </li>
              );
            })}
          </ul>
          {!!headerCta?.title && (
            <div className="section-divider mt-6 pt-4">
              <Link
                key={headerCta._key || "header-cta"}
                onClick={() => setOpen(false)}
                href={headerCta.href || "#"}
                target={headerCta.target ? "_blank" : undefined}
                rel={headerCta.target ? "noopener noreferrer" : undefined}
                className={cn(
                  buttonVariants({
                    variant: headerCta.buttonVariant || "default",
                  }),
                  "h-10 w-full justify-center rounded-lg",
                )}
              >
                {headerCta.title}
              </Link>
            </div>
          )}
          {!!utilityLinks.length && (
            <div className="section-divider mt-6 pt-4">
              <p className="mb-2 px-3 text-left text-xs uppercase tracking-wide text-foreground/50">
                Utility
              </p>
              <div className="space-y-2">
                {utilityLinks.map((item) => {
                  const ItemIcon = item.icon ? NAVIGATION_ICON_MAP[item.icon] : null;
                  return (
                    <Link
                      key={item._key}
                      onClick={() => setOpen(false)}
                      href={item.href || "#"}
                      target={item.target ? "_blank" : undefined}
                      rel={item.target ? "noopener noreferrer" : undefined}
                      className={cn(
                        buttonVariants({
                          variant: item.buttonVariant || "outline",
                        }),
                        "h-10 w-full justify-center rounded-lg",
                      )}
                    >
                      {ItemIcon && <ItemIcon className="size-4" />}
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
          <div className="section-divider mt-6 pt-4">
            <p className="mb-2 px-3 text-left text-xs uppercase tracking-wide text-foreground/50">
              Appearance
            </p>
            <div className="grid grid-cols-3 gap-2 px-1">
              <Button
                type="button"
                variant={theme === "light" ? "default" : "outline"}
                className="h-9"
                onClick={() => setTheme("light")}
                aria-label="Use light mode"
                title="Light"
              >
                <Sun className="size-4" />
              </Button>
              <Button
                type="button"
                variant={theme === "dark" ? "default" : "outline"}
                className="h-9"
                onClick={() => setTheme("dark")}
                aria-label="Use dark mode"
                title="Dark"
              >
                <Moon className="size-4" />
              </Button>
              <Button
                type="button"
                variant={theme === "system" ? "default" : "outline"}
                className="h-9"
                onClick={() => setTheme("system")}
                aria-label="Use system mode"
                title="System"
              >
                <Monitor className="size-4" />
              </Button>
            </div>
          </div>
          <div className="section-divider mt-6 pt-4">
            <p className="mb-2 px-3 text-left text-xs uppercase tracking-wide text-foreground/50">
              Social
            </p>
            <SocialLinks
              links={(settings as any)?.socialLinks}
              iconOnly
              size="sm"
              align="start"
              className="flex-wrap"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
