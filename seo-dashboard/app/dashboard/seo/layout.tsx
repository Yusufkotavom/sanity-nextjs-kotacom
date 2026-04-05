"use client";

import { usePathname } from "next/navigation";
import { AppSidebar, seoNavGroups } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function SeoDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const activeItem =
    seoNavGroups
      .flatMap((group) => group.items)
      .find((item) => pathname === item.url || pathname.startsWith(`${item.url}/`)) ||
    seoNavGroups[0]?.items[0];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-3 border-b bg-background px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>{activeItem?.title || "Overview"}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto">
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
        <main className="flex flex-1 flex-col gap-4 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
