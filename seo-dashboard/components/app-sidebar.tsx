"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

export const seoNavGroups = [
  {
    title: "Operations",
    items: [
      { title: "Overview", url: "/dashboard/seo" },
      { title: "Indexing", url: "/dashboard/seo/indexing" },
      { title: "Migration Priority", url: "/dashboard/seo/migration-priority" },
      { title: "SEO Audit", url: "/dashboard/seo/audit" },
    ],
  },
  {
    title: "AI Ops",
    items: [{ title: "AI Writer", url: "/dashboard/seo/ai-writer" }],
  },
  {
    title: "Admin",
    items: [{ title: "Settings", url: "/dashboard/seo/settings" }],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard/seo">
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">SEO Ops Dashboard</span>
                  <span className="text-xs text-muted-foreground">Operations Console</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {seoNavGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <span>{group.title}</span>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  {group.items.map((item) => {
                    const isActive = pathname === item.url || pathname.startsWith(`${item.url}/`);
                    return (
                      <SidebarMenuSubItem key={item.url}>
                        <SidebarMenuSubButton asChild isActive={isActive}>
                          <Link href={item.url}>{item.title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
