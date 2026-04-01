"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { SchemauiDocPage } from "@/lib/schemaui-docs";

type Group = {
  name: string;
  pages: SchemauiDocPage[];
};

function SidebarContent({
  groups,
  activePath,
  onNavigate,
}: {
  groups: Group[];
  activePath: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b px-4 py-3">
        <h2 className="text-sm font-semibold tracking-wide uppercase text-foreground/80">
          Schema UI Docs
        </h2>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
        {groups.map((group) => (
          <div key={group.name} className="mb-5">
            <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {group.name}
            </p>
            <div className="space-y-1">
              {group.pages.map((page) => (
                <Link
                  key={page.pathname}
                  href={page.pathname}
                  onClick={onNavigate}
                  className={cn(
                    "block rounded-md px-2 py-1.5 text-sm transition-colors",
                    activePath === page.pathname
                      ? "bg-secondary text-foreground font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {page.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DocsSidebar({
  groups,
  activePath,
}: {
  groups: Group[];
  activePath: string;
}) {
  return (
    <aside className="hidden lg:block lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] lg:w-72 lg:shrink-0">
      <div className="h-full overflow-hidden rounded-xl border bg-card">
        <SidebarContent groups={groups} activePath={activePath} />
      </div>
    </aside>
  );
}
