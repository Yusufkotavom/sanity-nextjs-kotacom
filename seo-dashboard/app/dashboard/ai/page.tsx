import { isDatabaseConfigured, db } from "@/lib/db-safe";
import { DatabaseNotConfigured, DatabaseError } from "@/components/database-error";
import { schema } from "@repo/db";
import { desc, and, eq } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AiActions } from "@/components/ai-actions";
import { AiFilters } from "@/components/ai-filters";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

function formatDate(value: Date | string | null) {
  if (!value) return "-";
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function AiPage({
  searchParams,
}: {
  searchParams: Promise<{ provider?: string; validation?: string; sanity?: string }>;
}) {
  if (!isDatabaseConfigured()) {
    return <DatabaseNotConfigured title="AI Generations" />;
  }

  const params = await searchParams;
  let generations: any[] = [];
  
  try {
    const conditions = [];
    
    if (params.provider && params.provider !== "all") {
      conditions.push(eq(schema.aiGenerations.provider, params.provider));
    }
    
    if (params.validation && params.validation !== "all") {
      conditions.push(eq(schema.aiGenerations.validationStatus, params.validation));
    }
    
    if (params.sanity && params.sanity !== "all") {
      conditions.push(eq(schema.aiGenerations.sanityWriteStatus, params.sanity));
    }

    const query = db()
      .select()
      .from(schema.aiGenerations)
      .orderBy(desc(schema.aiGenerations.createdAt))
      .limit(50);

    generations = conditions.length > 0 
      ? await query.where(and(...conditions))
      : await query;
  } catch (error) {
    return <DatabaseError title="AI Generations" error={error} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>AI Generations</CardTitle>
              <CardDescription>Monitor AI content generation and validation</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/ai">
                <RefreshCw className="size-4 mr-2" />
                Refresh
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <AiFilters />
          
          {generations.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg font-medium">No AI generations found</p>
              <p className="text-sm mt-1">Try adjusting your filters or generate new content</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Provider</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Validation</TableHead>
                  <TableHead>Sanity</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {generations.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{item.provider}</TableCell>
                    <TableCell className="text-sm">{item.model}</TableCell>
                    <TableCell>
                      <Badge variant={item.validationStatus === "invalid" ? "destructive" : "secondary"}>
                        {item.validationStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.sanityWriteStatus === "failed" ? "destructive" : "secondary"}>
                        {item.sanityWriteStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{formatDate(item.createdAt)}</TableCell>
                    <TableCell>
                      <AiActions 
                        generationId={item.id} 
                        content={item.generatedContent}
                        validationStatus={item.validationStatus}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
