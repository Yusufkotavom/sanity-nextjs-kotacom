"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SortableHeaderProps {
  column: string;
  label: string;
  align?: "left" | "right";
}

export function SortableHeader({ column, label, align = "left" }: SortableHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentSort = searchParams.get("sort");
  const currentOrder = searchParams.get("order") || "desc";
  
  const isActive = currentSort === column;
  const isAsc = isActive && currentOrder === "asc";
  const isDesc = isActive && currentOrder === "desc";

  const handleSort = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (isActive) {
      // Toggle order
      params.set("order", currentOrder === "asc" ? "desc" : "asc");
    } else {
      // Set new column
      params.set("sort", column);
      params.set("order", "desc");
    }
    
    router.push(`?${params.toString()}`);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`-ml-3 h-8 data-[state=open]:bg-accent ${
        align === "right" ? "ml-auto" : ""
      }`}
      onClick={handleSort}
    >
      <span>{label}</span>
      {isAsc && <ArrowUp className="ml-2 h-4 w-4" />}
      {isDesc && <ArrowDown className="ml-2 h-4 w-4" />}
      {!isActive && <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />}
    </Button>
  );
}
