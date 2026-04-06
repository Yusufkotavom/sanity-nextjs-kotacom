import { isDatabaseConfigured, DatabaseNotConfigured, DatabaseError, db } from "@/lib/db-safe";
import { schema } from "@repo/db";
import { desc } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AiActions } from "@/components/ai-actions";

export const dynamic = 'force-dynamic';

function formatDate(value: Date | string | null) {
  if (!value) return "-";
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function AiPage() {
  if (!isDatabaseConfigured()) {
    return <DatabaseNotConfigured title="AI Generations" />;
  }

  let generations: any[] = [];
  
  try {
    generations = await db()
      .select()
      .from(schema.aiGenerations)
      .orderBy(desc(schema.aiGenerations.createdAt))
      .limit(25);
  } catch (error) {
    return <DatabaseError title="AI Generations" error={error} />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Generations</CardTitle>
        <CardDescription>Provider routing, validation, and publish status.</CardDescription>
      </CardHeader>
      <CardContent>
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
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.provider}</TableCell>
                <TableCell>{item.model}</TableCell>
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
                <TableCell>{formatDate(item.createdAt)}</TableCell>
                <TableCell>
                  <AiActions generationId={item.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
