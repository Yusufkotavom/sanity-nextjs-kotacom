"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const nav = [
  { href: "/dashboard/seo", label: "Overview" },
  { href: "/dashboard/seo/indexing", label: "Indexing" },
  { href: "/dashboard/seo/migration-priority", label: "Migration Priority" },
  { href: "/dashboard/seo/audit", label: "SEO Audit" },
  { href: "/dashboard/seo/ai-writer", label: "AI Writer" },
  { href: "/dashboard/seo/settings", label: "Settings" },
];

export default function SeoDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container py-4 flex flex-wrap items-center gap-3 justify-between">
          <div>
            <h1 className="text-xl font-semibold">SEO Ops Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Indexing, migration priority, and technical SEO controls
            </p>
          </div>
          <form
            action="/api/seo/auth/logout"
            method="post"
            onSubmit={(event) => {
              event.preventDefault();
              fetch("/api/seo/auth/logout", { method: "POST" }).then(() => {
                window.location.href = "/dashboard/seo/login";
              });
            }}
          >
            <Button variant="outline" size="sm" type="submit">
              Logout
            </Button>
          </form>
        </div>
      </header>

      <div className="container py-6 grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-lg border bg-background p-3 h-fit">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="rounded-lg border bg-background p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
