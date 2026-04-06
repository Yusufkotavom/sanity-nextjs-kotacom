import { db } from "./db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function DatabaseNotConfigured({ title = "Dashboard" }: { title?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Database not configured</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Please configure DATABASE_URL environment variable to enable this feature.
        </p>
      </CardContent>
    </Card>
  );
}

export function DatabaseError({ title = "Dashboard", error }: { title?: string; error?: any }) {
  console.error("Database error:", error);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Error loading data</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Failed to connect to database. Please check your configuration.
        </p>
        {process.env.NODE_ENV === "development" && error && (
          <pre className="mt-4 text-xs text-red-500 overflow-auto">
            {error.message || String(error)}
          </pre>
        )}
      </CardContent>
    </Card>
  );
}

export async function safeDbQuery<T>(
  queryFn: () => Promise<T>,
  fallback: T
): Promise<T> {
  if (!isDatabaseConfigured()) {
    return fallback;
  }
  
  try {
    return await queryFn();
  } catch (error) {
    console.error("Database query failed:", error);
    return fallback;
  }
}

export { db };
