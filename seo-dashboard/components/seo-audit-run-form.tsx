"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function normalizeUrls(input: string) {
  return Array.from(
    new Set(
      input
        .split(/\r?\n|,/g)
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  );
}

export default function SeoAuditRunForm() {
  const router = useRouter();
  const [urlsInput, setUrlsInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const urls = normalizeUrls(urlsInput);

    if (!urls.length) {
      toast.error("Masukkan minimal 1 URL.");
      return;
    }

    const invalid = urls.filter((url) => {
      try {
        new URL(url);
        return false;
      } catch {
        return true;
      }
    });

    if (invalid.length) {
      toast.error(`URL tidak valid: ${invalid.slice(0, 3).join(", ")}`);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/seo/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ urls }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        toast.error(payload?.message || "Gagal menjalankan audit.");
        return;
      }

      toast.success(`Audit dijalankan untuk ${urls.length} URL.`);
      setUrlsInput("");
      router.refresh();
    } catch {
      toast.error("Terjadi masalah jaringan saat menjalankan audit.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-lg border p-3">
      <div className="space-y-1">
        <Label htmlFor="seo-audit-urls">Run Manual Audit (URL)</Label>
        <p className="text-xs text-muted-foreground">
          Satu URL per baris. Hasil audit akan muncul di tabel setelah job diproses.
        </p>
      </div>
      <Textarea
        id="seo-audit-urls"
        value={urlsInput}
        onChange={(e) => setUrlsInput(e.target.value)}
        placeholder={"https://www.kotacom.id/services\nhttps://www.kotacom.id/products"}
        rows={4}
      />
      <div className="flex justify-end">
        <Button type="submit" size="sm" disabled={loading}>
          <Play className="size-4 mr-2" />
          {loading ? "Running..." : "Run Audit"}
        </Button>
      </div>
    </form>
  );
}

