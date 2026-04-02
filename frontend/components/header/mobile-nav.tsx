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
import { useState } from "react";
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
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const { setTheme, theme } = useTheme();
  const navItems = (navigation[0]?.links || [])
    .filter((item) => item?.title)
    .map((item) => item as NavLinkWithChildren);
  const navDoc = (navigation[0] as { headerCta?: NavLinkWithChildren | null } | undefined) || {};
  const primaryItems = navItems.filter((item) => item.navLocation !== "utility");
  const utilityItems = navItems.filter((item) => item.navLocation === "utility");
  const fallbackCta =
    utilityItems.find(
      (item) =>
        item.buttonVariant &&
        item.buttonVariant !== "ghost" &&
        item.buttonVariant !== "link",
    ) || null;
  const headerCta = navDoc.headerCta || fallbackCta;
  const utilityLinks = utilityItems.filter((item) => item._key !== headerCta?._key);

  return (
    <Sheet
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) setOpenGroup(null);
      }}
    >
      <SheetTrigger asChild>
        <Button
          aria-label="Open Menu"
          variant="ghost"
          className="w-10 p-5 focus-visible:ring-1 focus-visible:ring-offset-1"
        >
          <AlignRight className="dark:text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="h-full w-[86vw] border-r p-0 sm:max-w-sm">
        <SheetHeader className="border-b px-6 py-5">
          <div>
            <Logo settings={settings} />
          </div>
          <div className="sr-only">
            <SheetTitle>Main Navigation</SheetTitle>
            <SheetDescription>Navigate to the website pages</SheetDescription>
          </div>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="list-none space-y-1">
            {primaryItems.map((item) => {
              const ItemIcon = item.icon ? NAVIGATION_ICON_MAP[item.icon] : null;
              const children =
                item.children?.filter((child) => child?.title && child?.href) || [];
              const hasChildren = children.length > 0;
              const key = item._key || item.title || "menu-item";
              const groupOpen = openGroup === key;

              if (!hasChildren) {
                return (
                  <li key={key}>
                    <Link
                      onClick={() => setOpen(false)}
                      href={item.href || "#"}
                      target={item.target ? "_blank" : undefined}
                      rel={item.target ? "noopener noreferrer" : undefined}
                      className={cn(
                        buttonVariants({
                          variant: item.buttonVariant || "default",
                        }),
                        "h-11 w-full justify-start rounded-md px-3 text-left text-base",
                        item.buttonVariant === "ghost" &&
                          "text-foreground/85 hover:bg-accent hover:text-foreground",
                      )}
                    >
                      {ItemIcon && <ItemIcon className="size-4" />}
                      {item.title}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={key} className="rounded-md">
                  <button
                    type="button"
                    onClick={() => setOpenGroup(groupOpen ? null : key)}
                    className="inline-flex h-11 w-full items-center justify-between gap-2 rounded-md px-3 text-left text-base text-foreground/85 hover:bg-accent"
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
                    <ul className="ml-3 space-y-1 border-l pl-3">
                      {children.map((child) => {
                        const ChildIcon = child.icon ? NAVIGATION_ICON_MAP[child.icon] : null;
                        return (
                          <li key={child._key || child.href || child.title}>
                            <Link
                              onClick={() => setOpen(false)}
                              href={child.href || "#"}
                              target={child.target ? "_blank" : undefined}
                              rel={child.target ? "noopener noreferrer" : undefined}
                              className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-foreground/75 hover:bg-accent hover:text-foreground"
                            >
                              {ChildIcon && <ChildIcon className="size-4" />}
                              <span className="flex flex-col items-start">
                                <span className="inline-flex items-center gap-1.5">
                                  <span>{child.title}</span>
                                  {child.badge && (
                                    <span className="rounded-full border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-foreground/75">
                                      {child.badge}
                                    </span>
                                  )}
                                </span>
                                {child.description && (
                                  <span className="text-xs text-foreground/55">
                                    {child.description}
                                  </span>
                                )}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
          {!!headerCta?.title && (
            <div className="mt-6 border-t pt-4">
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
                  "h-11 w-full justify-center rounded-md",
                )}
              >
                {headerCta.title}
              </Link>
            </div>
          )}
          {!!utilityLinks.length && (
            <div className="mt-6 border-t pt-4">
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
                        "h-10 w-full justify-center rounded-md",
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
          <div className="mt-6 border-t pt-4">
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
          <div className="mt-6 border-t pt-4">
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
