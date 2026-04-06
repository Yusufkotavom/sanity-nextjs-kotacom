"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Sparkles,
  Search,
  BarChart3,
  CheckCircle2,
  Globe,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const dashboardNavGroups = [
  {
    title: "Overview",
    items: [
      { 
        title: "Dashboard", 
        url: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Content Operations",
    items: [
      { 
        title: "Job Queue", 
        url: "/dashboard/jobs",
        icon: Briefcase,
      },
      { 
        title: "AI Generations", 
        url: "/dashboard/ai",
        icon: Sparkles,
      },
      { 
        title: "Templates", 
        url: "/dashboard/templates",
        icon: FileText,
      },
      { 
        title: "AI Settings", 
        url: "/dashboard/ai-settings",
        icon: Sparkles,
      },
    ],
  },
  {
    title: "SEO & Search",
    items: [
      { 
        title: "SEO Audits", 
        url: "/dashboard/seo",
        icon: CheckCircle2,
      },
      { 
        title: "Search Console", 
        url: "/dashboard/search",
        icon: Globe,
      },
      { 
        title: "Analytics", 
        url: "/dashboard/analytics",
        icon: BarChart3,
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Clear auth cookie
    document.cookie = "seo-dashboard-auth=; path=/; max-age=0";
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Search className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">SEO Ops Dashboard</span>
                  <span className="text-xs text-muted-foreground">Operations Console</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {dashboardNavGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(`${item.url}/`);
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.url}>
                        <Icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut className="size-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
