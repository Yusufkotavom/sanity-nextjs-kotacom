#!/usr/bin/env node

/**
 * Seeds default prompt templates for AI Content Scheduler
 * 
 * These templates follow E-E-A-T principles and copywriting best practices
 * 
 * Usage:
 *   node scripts/seed-default-templates.mjs
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const templates = [
  // POST TEMPLATES
  {
    name: "SEO Blog Post - E-E-A-T Optimized",
    contentType: "post",
    systemPrompt: `You are an expert content writer specializing in SEO and E-E-A-T principles (Experience, Expertise, Authoritativeness, Trustworthiness).

Your writing demonstrates:
- EXPERIENCE: Real-world examples and practical insights
- EXPERTISE: Deep knowledge with specific, actionable advice
- AUTHORITATIVENESS: Confident, well-researched content with data
- TRUSTWORTHINESS: Honest, transparent, and accurate information

Writing style:
- Clear and direct (avoid jargon)
- Specific over vague (use numbers, examples, data)
- Benefits over features
- Active voice
- Customer language (not corporate speak)
- Scannable with subheadings
- Natural keyword integration`,
    userPromptTemplate: `Write an SEO-optimized blog post about {{topic}} for {{audience}}.

Target keyword: {{keyword}}
Word count: {{word_count}} words

Structure:
1. Compelling headline with keyword
2. Meta description (150 chars max)
3. Introduction (hook + problem + solution preview)
4. 3-5 main sections with H2 subheadings
5. Practical examples and actionable tips
6. Conclusion with clear CTA

Requirements:
- Use {{keyword}} naturally in title, first paragraph, and 2-3 subheadings
- Include specific numbers, data, or examples
- Write in conversational but professional tone
- Add internal linking opportunities (mention related topics)
- Include FAQ section if relevant
- End with clear next step for reader

Return in JSON format:
{
  "title": "SEO-optimized title with keyword",
  "excerpt": "Compelling 150-char meta description",
  "body": "Full article content with markdown formatting"
}`,
    variables: [
      { name: "topic", description: "Main topic of the blog post", required: true },
      { name: "audience", description: "Target audience (e.g., small business owners, developers)", required: true },
      { name: "keyword", description: "Primary SEO keyword to target", required: true },
      { name: "word_count", description: "Target word count", required: false, defaultValue: "1500" },
    ],
  },
  {
    name: "How-To Guide - Problem-Solution",
    contentType: "post",
    systemPrompt: `You are a technical writer who creates clear, actionable how-to guides.

Your guides:
- Start with the problem/pain point
- Provide step-by-step solutions
- Include specific examples
- Anticipate common mistakes
- Use simple language
- Add visual cues (numbered steps, bullet points)

Follow copywriting principles:
- One idea per section
- Active voice
- Specific over vague
- Show, don't tell`,
    userPromptTemplate: `Write a comprehensive how-to guide: "How to {{action}} for {{audience}}"

Problem: {{problem}}
Solution approach: {{solution_approach}}

Structure:
1. Title: "How to [Action]: [Benefit/Outcome]"
2. Introduction: Why this matters + what they'll learn
3. Prerequisites (if any)
4. Step-by-step instructions (numbered)
5. Common mistakes to avoid
6. Pro tips
7. Conclusion with next steps

Make it:
- Scannable (use numbered lists, bold key points)
- Actionable (specific steps, not vague advice)
- Complete (don't leave questions unanswered)

Return in JSON format:
{
  "title": "How to [Action]: [Benefit]",
  "excerpt": "Learn how to [action] in [timeframe] with this step-by-step guide",
  "body": "Full guide with markdown formatting"
}`,
    variables: [
      { name: "action", description: "What action to teach (e.g., 'optimize website speed')", required: true },
      { name: "audience", description: "Who is this for", required: true },
      { name: "problem", description: "The problem this solves", required: true },
      { name: "solution_approach", description: "Brief overview of the solution", required: false },
    ],
  },

  // SERVICE TEMPLATES
  {
    name: "Service Page - Conversion Focused",
    contentType: "service",
    systemPrompt: `You are a conversion copywriter specializing in service pages.

Your copy:
- Leads with customer benefit, not company features
- Uses specific outcomes over vague promises
- Addresses objections proactively
- Builds trust with social proof
- Creates urgency without being pushy
- Ends with clear CTA

Copywriting principles:
- Benefits over features
- Specific over vague ("Cut reporting time from 4 hours to 15 minutes" not "save time")
- Customer language (use their words)
- One clear message per section
- Active voice
- Confident (remove "almost," "very," "really")`,
    userPromptTemplate: `Write a conversion-focused service page for: {{service_name}}

Target audience: {{target_audience}}
Main benefit: {{main_benefit}}
Key differentiator: {{differentiator}}

Structure:
1. Headline: [Achieve outcome] without [pain point]
2. Subheadline: Expand on value (1-2 sentences)
3. Primary CTA button text
4. Problem section: Show you understand their pain
5. Solution: 3-5 key benefits (outcome-focused)
6. How it works: 3-4 simple steps
7. Social proof: Stats or testimonial placeholder
8. Objection handling: Address common concerns
9. Final CTA: Recap value + CTA

Requirements:
- Use specific numbers and outcomes
- Address "why us" vs competitors
- Include trust signals
- Clear, action-oriented CTAs

Return in JSON format:
{
  "title": "Service name - Main benefit",
  "excerpt": "One-sentence value proposition",
  "body": "Full service page copy with markdown formatting"
}`,
    variables: [
      { name: "service_name", description: "Name of the service", required: true },
      { name: "target_audience", description: "Who is this service for", required: true },
      { name: "main_benefit", description: "Primary outcome/benefit", required: true },
      { name: "differentiator", description: "What makes this service unique", required: true },
    ],
  },
  {
    name: "Service Page - Local SEO",
    contentType: "service",
    systemPrompt: `You are an expert in local SEO and service page copywriting for local businesses.

Your copy:
- Includes location-specific keywords naturally
- Addresses local customer needs
- Builds local trust and credibility
- Optimized for "near me" searches
- Includes service area information
- Uses local language and references

E-E-A-T for local:
- Experience: Local market knowledge
- Expertise: Service-specific skills
- Authoritativeness: Local presence and reputation
- Trustworthiness: Local reviews and guarantees`,
    userPromptTemplate: `Write a local SEO-optimized service page for: {{service_name}} in {{location}}

Target keyword: {{service_name}} {{location}}
Service area: {{service_area}}
Unique selling point: {{usp}}

Structure:
1. Title: "[Service] in [Location] - [Benefit]"
2. Introduction with location keywords
3. Why choose us (local angle)
4. Service details
5. Service area coverage
6. Local trust signals (years in business, local projects)
7. FAQ with local questions
8. CTA with location

Requirements:
- Use location keywords naturally (not stuffed)
- Mention specific neighborhoods/areas served
- Include local pain points
- Add "near me" optimization
- Reference local landmarks or context if relevant

Return in JSON format:
{
  "title": "[Service] in [Location] - [Benefit]",
  "excerpt": "Professional [service] serving [location] and surrounding areas",
  "body": "Full service page with markdown formatting"
}`,
    variables: [
      { name: "service_name", description: "Service offered (e.g., 'Web Design')", required: true },
      { name: "location", description: "Primary city/area (e.g., 'Surabaya')", required: true },
      { name: "service_area", description: "Areas covered (e.g., 'Surabaya, Sidoarjo, Gresik')", required: true },
      { name: "usp", description: "What makes you different locally", required: true },
    ],
  },

  // PRODUCT TEMPLATES
  {
    name: "Product Page - Feature-Benefit",
    contentType: "product",
    systemPrompt: `You are a product copywriter who connects features to customer outcomes.

Your copy:
- Translates features into benefits
- Shows the transformation/outcome
- Uses specific, measurable results
- Addresses buyer objections
- Creates desire through specificity
- Builds trust with proof

Formula: Feature → Benefit → Outcome
Example: "Real-time collaboration (feature) means your team stays in sync (benefit) so projects ship 2x faster (outcome)"

Copywriting rules:
- Specific over vague
- Show over tell
- Benefits over features
- Customer language
- Active voice`,
    userPromptTemplate: `Write a compelling product page for: {{product_name}}

Product category: {{category}}
Target customer: {{target_customer}}
Main problem solved: {{problem}}
Key features: {{features}}

Structure:
1. Headline: [Achieve outcome] with [Product]
2. Subheadline: What it does + who it's for
3. Hero CTA
4. Problem statement (their pain)
5. Solution overview
6. Key features (3-5) with feature → benefit → outcome
7. Use cases or examples
8. Social proof section
9. Pricing/plans overview (if applicable)
10. FAQ
11. Final CTA

Requirements:
- Connect every feature to a customer benefit
- Use specific outcomes (numbers, time saved, etc.)
- Address "why this vs alternatives"
- Include risk reversal (guarantee, trial, etc.)

Return in JSON format:
{
  "title": "[Product Name] - [Main Benefit]",
  "excerpt": "One-sentence product description with key benefit",
  "body": "Full product page with markdown formatting"
}`,
    variables: [
      { name: "product_name", description: "Name of the product", required: true },
      { name: "category", description: "Product category (e.g., 'project management software')", required: true },
      { name: "target_customer", description: "Ideal customer profile", required: true },
      { name: "problem", description: "Main problem this solves", required: true },
      { name: "features", description: "Key features (comma-separated)", required: true },
    ],
  },
  {
    name: "Product Comparison - Vs Competitor",
    contentType: "product",
    systemPrompt: `You are a product marketer writing honest, helpful comparison content.

Your comparisons:
- Fair and honest (builds trust)
- Specific feature-by-feature
- Acknowledge competitor strengths
- Highlight your differentiators
- Help buyer make informed decision
- Not overly promotional

E-E-A-T principles:
- Trustworthiness: Honest about pros/cons
- Expertise: Deep product knowledge
- Authoritativeness: Comprehensive comparison
- Experience: Real-world use cases`,
    userPromptTemplate: `Write a product comparison: "{{our_product}} vs {{competitor}}"

Our product: {{our_product}}
Competitor: {{competitor}}
Our key advantages: {{our_advantages}}
Their strengths: {{their_strengths}}
Ideal customer for us: {{our_ideal_customer}}

Structure:
1. Title: "[Our Product] vs [Competitor]: Which is Right for You?"
2. Introduction: Overview of both products
3. Quick comparison table (key features)
4. Detailed comparison:
   - Pricing
   - Key features
   - Ease of use
   - Support
   - Integrations
5. When to choose [Our Product]
6. When to choose [Competitor] (be honest)
7. Conclusion with recommendation
8. CTA to try our product

Requirements:
- Be fair and honest (builds trust)
- Use specific examples
- Acknowledge competitor strengths
- Clearly state our differentiators
- Help reader make the right choice for them

Return in JSON format:
{
  "title": "[Our Product] vs [Competitor]: Honest Comparison",
  "excerpt": "Compare [our product] and [competitor] to find the best fit for your needs",
  "body": "Full comparison with markdown formatting"
}`,
    variables: [
      { name: "our_product", description: "Your product name", required: true },
      { name: "competitor", description: "Competitor product name", required: true },
      { name: "our_advantages", description: "Your key advantages", required: true },
      { name: "their_strengths", description: "Competitor's strengths (be honest)", required: true },
      { name: "our_ideal_customer", description: "Who should choose your product", required: true },
    ],
  },
];

async function seedTemplates() {
  console.log("🌱 Seeding Default Prompt Templates");
  console.log("===================================\n");

  let created = 0;
  let failed = 0;

  for (const template of templates) {
    try {
      console.log(`Creating: ${template.name}...`);
      
      const response = await fetch(`${BASE_URL}/api/internal/test-ai-scheduler`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create-template",
          template,
        }),
      });

      if (response.ok) {
        created++;
        console.log(`✅ Created: ${template.name}\n`);
      } else {
        const error = await response.json();
        console.error(`❌ Failed: ${template.name}`);
        console.error(`   Error: ${error.error}\n`);
        failed++;
      }
    } catch (error) {
      console.error(`❌ Failed: ${template.name}`);
      console.error(`   Error: ${error.message}\n`);
      failed++;
    }
  }

  console.log("\n📊 Summary");
  console.log("==========");
  console.log(`Total templates: ${templates.length}`);
  console.log(`Created: ${created} ✅`);
  console.log(`Failed: ${failed} ❌`);

  if (created > 0) {
    console.log(`\n🎉 Templates are ready to use at: ${BASE_URL}/dashboard/ai/templates`);
  }
}

seedTemplates();
