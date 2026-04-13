# AI Content Scheduler - Testing Guide

This guide explains how to test the AI Content Scheduler implementation.

## Prerequisites

1. **Database Migration**: Run the database migration to create the new tables
   ```bash
   cd packages/db
   npx drizzle-kit push
   ```

2. **Environment Variables**: Ensure these are set in your `.env.local`:
   ```bash
   # Database
   DATABASE_URL=your_postgres_connection_string
   
   # Sanity
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_AUTH_TOKEN=your_write_token  # or SANITY_DEV for dev environment
   
   # AI Providers (at least one required)
   AI_GATEWAY_API_KEY=your_gateway_key
   # OR
   AI_WRITER_GEMINI_KEYS=your_gemini_key
   # OR
   AI_WRITER_GROQ_KEYS=your_groq_key
   ```

3. **Start the Development Server**:
   ```bash
   cd seo-dashboard
   npm run dev
   ```

## Testing Methods

### Method 1: Automated Test Script

Run the comprehensive test script:

```bash
cd seo-dashboard
node scripts/test-ai-content-scheduler.mjs
```

This script will:
1. Create a test prompt template
2. List and retrieve templates
3. Render a template with variables
4. Generate content with a custom prompt
5. Generate content using the template
6. Clean up the test template

### Method 2: Manual API Testing

#### Test Prompt Templates

**Create a template:**
```bash
curl -X POST http://localhost:3000/api/ai/templates/test \
  -H "Content-Type: application/json" \
  -d '{
    "action": "create",
    "name": "SEO Blog Template",
    "contentType": "post",
    "systemPrompt": "You are an SEO expert writing for Indonesian audience",
    "userPromptTemplate": "Write a blog post about {{topic}} targeting {{keyword}}. Include title, excerpt, and body.",
    "variables": [
      {"name": "topic", "description": "Main topic", "required": true},
      {"name": "keyword", "description": "SEO keyword", "required": true}
    ]
  }'
```

**List templates:**
```bash
curl "http://localhost:3000/api/ai/templates/test?action=list&contentType=post"
```

**Get a specific template:**
```bash
curl "http://localhost:3000/api/ai/templates/test?action=get&id=<template-id>"
```

**Render a template:**
```bash
curl -X POST http://localhost:3000/api/ai/templates/test \
  -H "Content-Type: application/json" \
  -d '{
    "action": "render",
    "templateId": "<template-id>",
    "variables": {
      "topic": "Web Development",
      "keyword": "modern web frameworks"
    }
  }'
```

#### Test Content Generation

**Generate with custom prompt:**
```bash
curl -X POST http://localhost:3000/api/ai/test-generate \
  -H "Content-Type: application/json" \
  -d '{
    "contentType": "post",
    "prompt": "Write a blog post about TypeScript benefits. Include title, excerpt, and body.",
    "generateOgImage": false,
    "autoPublish": false
  }'
```

**Generate with template:**
```bash
curl -X POST http://localhost:3000/api/ai/test-generate \
  -H "Content-Type: application/json" \
  -d '{
    "contentType": "post",
    "templateId": "<template-id>",
    "variables": {
      "topic": "Next.js",
      "keyword": "server components"
    },
    "generateOgImage": false,
    "autoPublish": false
  }'
```

### Method 3: Database Verification

Check that data is being stored correctly:

```sql
-- Check prompt templates
SELECT * FROM prompt_templates;

-- Check AI generations
SELECT 
  id, 
  source_type, 
  content_type,
  validation_status,
  sanity_write_status,
  created_at
FROM ai_generations
ORDER BY created_at DESC
LIMIT 10;

-- Check if template references work
SELECT 
  g.id,
  g.validation_status,
  t.name as template_name
FROM ai_generations g
LEFT JOIN prompt_templates t ON g.template_id = t.id
WHERE g.template_id IS NOT NULL;
```

## What's Been Implemented

### ✅ Completed Components

1. **Database Schema**
   - `prompt_templates` table with indexes
   - Extended `ai_generations` table with `og_image_asset_id` field
   - Foreign key relationships

2. **Prompt Template Manager** (`lib/ai-writer/prompt-templates.ts`)
   - Create, read, update, delete templates
   - Variable interpolation with validation
   - Template name uniqueness per content type
   - Max length validation

3. **OG Image Generator** (`lib/ai-writer/og-image-generator.ts`)
   - Image generation with Vercel OG
   - Upload to Sanity asset storage
   - Concurrency control (max 5 concurrent)
   - Timeout handling (30 seconds)
   - Graceful error handling

4. **Sanity Publisher** (`lib/ai-writer/sanity-publisher.ts`)
   - Document creation in Sanity
   - Slug generation with uniqueness
   - Portable text conversion
   - OG image attachment
   - Draft/published status management

5. **Content Generator** (`lib/ai-writer/content-generator.ts`)
   - AI provider integration with fallback
   - Content parsing and validation
   - Batch generation with concurrency control
   - Prompt resolution (custom → template → default)
   - Settings caching (5 minutes)

6. **Test API Endpoints**
   - `/api/ai/test-generate` - Test content generation
   - `/api/ai/templates/test` - Test template operations

## Expected Test Results

### Successful Template Creation
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Test Template",
    "contentType": "post",
    "systemPrompt": "...",
    "userPromptTemplate": "...",
    "variables": [...],
    "createdAt": "2024-...",
    "updatedAt": "2024-..."
  }
}
```

### Successful Content Generation
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "contentType": "post",
    "title": "Generated Title",
    "excerpt": "Generated excerpt...",
    "body": "Generated body content...",
    "provider": "gateway",
    "model": "gpt-4",
    "validationStatus": "valid",
    "sanityWriteStatus": "pending",
    "ogImageAssetId": null
  }
}
```

## Troubleshooting

### Database Migration Issues
```bash
# Check current schema
cd packages/db
npx drizzle-kit introspect

# Force push schema
npx drizzle-kit push --force
```

### AI Provider Errors
- Verify at least one AI provider key is configured
- Check Sanity AI Writer Settings are enabled
- Ensure default prompts are configured in Sanity

### Sanity Connection Issues
- Verify `SANITY_AUTH_TOKEN` or `SANITY_DEV` has write permissions
- Check project ID and dataset are correct
- Ensure Sanity project is accessible

### Template Variable Errors
- Variable names must be alphanumeric with underscores only
- Required variables must be provided when rendering
- Check template syntax uses `{{variable}}` format

## Next Steps

After successful testing, you can proceed with:

1. **Schedule Manager** (Task 7) - Create and manage scheduled tasks
2. **Cron Execution** (Task 8) - Automated scheduled content generation
3. **API Endpoints** (Tasks 9-11) - Full REST API for schedules and templates
4. **Dashboard UI** (Tasks 13-15) - User interface for managing schedules

## Support

If you encounter issues:
1. Check the console logs for detailed error messages
2. Verify all environment variables are set correctly
3. Ensure database migration completed successfully
4. Check that at least one AI provider is configured and working
