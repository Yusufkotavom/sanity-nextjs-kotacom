import { NextRequest, NextResponse } from "next/server";
import { ensureSeoApiAccess } from "@/lib/seo-ops/api-auth";
import { retryGeneration } from "@/lib/ai-writer/content-generator";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await ensureSeoApiAccess(request);
  if (!auth.ok) return auth.response;

  try {
    const { id } = await params;
    const generation = await retryGeneration(id);
    return NextResponse.json({ success: true, data: generation });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Retry generation failed" },
      { status: 500 },
    );
  }
}

