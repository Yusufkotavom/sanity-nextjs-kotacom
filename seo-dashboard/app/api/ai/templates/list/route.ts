import { NextRequest, NextResponse } from "next/server";
import { listTemplates } from "@/lib/ai-writer/prompt-templates";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const contentType = searchParams.get("contentType");

    const templates = await listTemplates(contentType || undefined);

    return NextResponse.json({ success: true, data: templates });
  } catch (error) {
    console.error("Template list error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to list templates" },
      { status: 500 }
    );
  }
}
