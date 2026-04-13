import { NextRequest, NextResponse } from "next/server";
import { createTemplate } from "@/lib/ai-writer/prompt-templates";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, contentType, systemPrompt, userPromptTemplate, variables } = body;

    if (!name || !contentType || !systemPrompt || !userPromptTemplate) {
      return NextResponse.json(
        { error: "Missing required fields: name, contentType, systemPrompt, userPromptTemplate" },
        { status: 400 }
      );
    }

    const template = await createTemplate({
      name,
      contentType,
      systemPrompt,
      userPromptTemplate,
      variables: variables || [],
    });

    return NextResponse.json({ success: true, data: template });
  } catch (error) {
    console.error("Template creation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create template" },
      { status: 500 }
    );
  }
}
