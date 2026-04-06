import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, template, variables, temperature, maxTokens } = body;

    if (!name || !template) {
      return NextResponse.json(
        { ok: false, message: "Name and template are required" },
        { status: 400 }
      );
    }

    // In a real implementation, you would:
    // 1. Store this in a database table (aiPromptTemplates)
    // 2. Or save to a configuration file
    // 3. Or integrate with your AI provider's prompt management

    // For now, return success with the template data
    const promptTemplate = {
      id: crypto.randomUUID(),
      name,
      template,
      variables: variables || [],
      temperature: temperature || 0.7,
      maxTokens: maxTokens || 1000,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        ok: true,
        template: promptTemplate,
        message: "Prompt template saved successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Save prompt error:", error);
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Failed to save prompt",
      },
      { status: 500 }
    );
  }
}
