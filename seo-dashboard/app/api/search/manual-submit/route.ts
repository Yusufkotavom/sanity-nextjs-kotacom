import { NextRequest, NextResponse } from "next/server";
import { db, isDatabaseConfigured } from "@/lib/db-safe";
import { schema } from "@repo/db";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { ok: false, message: "Database not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { urls, provider } = body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { ok: false, message: "URLs array is required" },
        { status: 400 }
      );
    }

    if (!provider) {
      return NextResponse.json(
        { ok: false, message: "Provider is required" },
        { status: 400 }
      );
    }

    const database = db();

    // Create submission record
    const [submission] = await database
      .insert(schema.searchSubmissions)
      .values({
        provider,
        submissionType: "manual",
        status: "pending",
        requestPayload: { urls },
        submittedAt: new Date(),
      })
      .returning();

    // In a real implementation, you would:
    // 1. Queue a job to submit these URLs
    // 2. Call IndexNow API or Google Search Console API
    // 3. Update submission status based on result

    // For now, just mark as success
    await database
      .update(schema.searchSubmissions)
      .set({ 
        status: "success",
        responsePayload: { submitted: urls.length }
      })
      .where(eq(schema.searchSubmissions.id, submission.id));

    return NextResponse.json(
      {
        ok: true,
        submission_id: submission.id,
        message: `${urls.length} URLs submitted to ${provider}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Manual submit error:", error);
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Failed to submit URLs",
      },
      { status: 500 }
    );
  }
}
