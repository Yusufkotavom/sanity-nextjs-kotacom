"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { supabase, isSupabaseConfigured, FALLBACK_CREDENTIALS } from "@/lib/supabase";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const supabaseEnabled = isSupabaseConfigured();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (supabaseEnabled) {
        // Try Supabase auth first
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          // Fallback to default credentials
          if (
            email === FALLBACK_CREDENTIALS.email &&
            password === FALLBACK_CREDENTIALS.password
          ) {
            // Set auth cookie for fallback
            document.cookie = `seo-dashboard-auth=fallback-token; path=/; max-age=86400`;
            toast.success("Logged in with fallback credentials");
            router.push("/dashboard");
            return;
          }
          throw error;
        }

        if (data.session) {
          // Set auth cookie
          document.cookie = `seo-dashboard-auth=${data.session.access_token}; path=/; max-age=86400`;
          toast.success("Logged in successfully");
          router.push("/dashboard");
        }
      } else {
        // Supabase not configured, use fallback only
        if (
          email === FALLBACK_CREDENTIALS.email &&
          password === FALLBACK_CREDENTIALS.password
        ) {
          // Set auth cookie for fallback
          document.cookie = `seo-dashboard-auth=fallback-token; path=/; max-age=86400`;
          toast.success("Logged in with fallback credentials");
          router.push("/dashboard");
        } else {
          toast.error("Invalid credentials");
        }
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">SEO Dashboard</CardTitle>
          <CardDescription>
            Login to access your SEO operations dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@kotacom.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </Field>
              <Field>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
                {!supabaseEnabled && (
                  <FieldDescription className="text-center text-xs text-muted-foreground">
                    Using fallback authentication (Supabase not configured)
                  </FieldDescription>
                )}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center text-xs text-muted-foreground">
        Default credentials: {FALLBACK_CREDENTIALS.email} / {FALLBACK_CREDENTIALS.password}
      </FieldDescription>
    </div>
  );
}
