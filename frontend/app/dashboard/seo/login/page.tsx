"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SeoLoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/seo/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await response.json().catch(() => ({}));
    setLoading(false);

    if (!response.ok) {
      setError(data?.message || "Login failed");
      return;
    }

    window.location.href = "/dashboard/seo";
  }

  return (
    <div className="max-w-md mx-auto py-8">
      <h2 className="text-xl font-semibold mb-2">SEO Dashboard Login</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Enter SEO admin password to access operational tools.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="SEO dashboard password"
          autoFocus
        />
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <Button type="submit" disabled={loading || !password} className="w-full">
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
