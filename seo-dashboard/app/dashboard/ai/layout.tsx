"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AILayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-4">
      <Tabs value={pathname} className="w-full">
        <TabsList className="grid h-auto w-full grid-cols-2 gap-1 sm:grid-cols-4">
          <TabsTrigger value="/dashboard/ai" asChild>
            <Link href="/dashboard/ai">History</Link>
          </TabsTrigger>
          <TabsTrigger value="/dashboard/ai/ideas" asChild>
            <Link href="/dashboard/ai/ideas">Content Ideas</Link>
          </TabsTrigger>
          <TabsTrigger value="/dashboard/ai/generate" asChild>
            <Link href="/dashboard/ai/generate">Generate</Link>
          </TabsTrigger>
          <TabsTrigger value="/dashboard/ai/templates" asChild>
            <Link href="/dashboard/ai/templates">Templates</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      {children}
    </div>
  );
}
