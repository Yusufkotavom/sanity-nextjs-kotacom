import { CustomPromptEditor } from "@/components/custom-prompt-editor";

export default function AiSettingsPage() {
  // In a real app, fetch the current prompt from database
  const defaultPrompt = `You are an expert SEO content writer. Create a comprehensive, SEO-optimized article about {service} in {city}.

Requirements:
- Title: Engaging and includes primary keyword
- Meta Description: 150-160 characters, compelling
- Content: 1500-2000 words, well-structured with H2 and H3 headings
- Keywords: Naturally integrate {keywords} throughout
- Tone: {tone}
- Target Audience: {target_audience}

Structure:
1. Introduction (hook + problem statement)
2. Main Content (detailed information with examples)
3. Benefits/Features
4. FAQ Section (5 questions)
5. Conclusion with CTA

SEO Guidelines:
- Use semantic HTML structure
- Include internal linking opportunities
- Add schema markup suggestions
- Optimize for featured snippets
- Include local SEO elements for {city}`;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">AI Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure AI prompts and generation parameters
        </p>
      </div>

      <CustomPromptEditor 
        initialPrompt={defaultPrompt}
        initialVariables={{
          city: "Jakarta",
          service: "Website Development",
          keywords: "web development, custom website, responsive design",
          tone: "professional yet approachable",
          target_audience: "small to medium businesses",
        }}
      />
    </div>
  );
}
