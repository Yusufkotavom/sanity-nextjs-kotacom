# Design Document: AI Content Scheduler

## Overview

The AI Content Scheduler is a comprehensive system that enables automated content generation for blog posts, services, and products with scheduling capabilities. The system integrates with the existing AI Writer infrastructure (Vercel AI Gateway, Gemini, Groq) and leverages the current scheduled tasks framework to provide batch content generation, OG image generation, and automated publishing to Sanity CMS.

The system addresses three core requirements:
1. Batch content generation for multiple content types (posts, services, products) with configurable prompts
2. OG image generation using Vercel OG or free alternatives
3. Scheduled publishing with prompt management and auto-publish to Sanity

This design builds upon existing infrastructure including the `scheduledTasks` database table, Cloudflare Worker cron triggers, AI generation pipeline, and Sanity CMS integration.

## Architecture

```mermaid
graph TB
    subgraph "User Interface Layer"
        UI[Dashboard UI]
        ScheduleForm[Schedule Creation Form]
        PromptManager[Prompt Template Manager]
        TaskMonitor[Task Monitor & Logs]
    end
    
    subgraph "API Layer"
        ScheduleAPI[/api/ai/schedule/*]
        GenerateAPI[/api/ai/generate]
        OGImageAPI[/api/ai/og-image]
        CronAPI[/api/internal/cron-run]
    end
    
    subgraph "Business Logic Layer"
        ContentGen[Content Generator]
        ImageGen[OG Image Generator]
        PromptEngine[Prompt Engine]
        Scheduler[Task Scheduler]
        Publisher[Sanity Publisher]
    end
    
    subgraph "Data Layer"
        DB[(PostgreSQL)]
        Redis[(Redis Queue)]
        Sanity[(Sanity CMS)]
    end
    
    subgraph "External Services"
        AIGateway[Vercel AI Gateway]
        VercelOG[Vercel OG Image]
        CloudflareWorker[Cloudflare Worker]
    end
    
    UI --> ScheduleAPI
    ScheduleForm --> ScheduleAPI
    PromptManager --> ScheduleAPI
    TaskMonitor --> ScheduleAPI
    
    ScheduleAPI --> Scheduler
    ScheduleAPI --> PromptEngine
    GenerateAPI --> ContentGen
    OGImageAPI --> ImageGen
    CronAPI --> Scheduler
    
    ContentGen --> AIGateway
    ContentGen --> DB
    ImageGen --> VercelOG
    Scheduler --> DB
    Scheduler --> Redis
    Publisher --> Sanity
    
    CloudflareWorker --> CronAPI
    
    ContentGen --> Publisher
    ImageGen --> Publisher


## Main Algorithm/Workflow

```mermaid
sequenceDiagram
    participant User
    participant Dashboard
    participant ScheduleAPI
    participant CronWorker
    participant ContentGen
    participant AIProvider
    participant OGImageGen
    participant SanityPublisher
    participant Database
    
    User->>Dashboard: Create scheduled task
    Dashboard->>ScheduleAPI: POST /api/ai/schedule/create
    ScheduleAPI->>Database: Insert scheduledTasks record
    ScheduleAPI-->>Dashboard: Task created
    
    Note over CronWorker: Cron trigger fires (hourly)
    CronWorker->>ScheduleAPI: POST /api/internal/cron-run
    ScheduleAPI->>Database: Query due tasks
    Database-->>ScheduleAPI: Return tasks
    
    loop For each due task
        ScheduleAPI->>ContentGen: Generate content
        ContentGen->>AIProvider: Generate text
        AIProvider-->>ContentGen: Return generated text
        ContentGen->>Database: Store aiGenerations record
        
        ContentGen->>OGImageGen: Generate OG image
        OGImageGen->>VercelOG: Create image
        VercelOG-->>OGImageGen: Return image URL
        
        ContentGen->>SanityPublisher: Publish to Sanity
        SanityPublisher->>Sanity: Create/update document
        Sanity-->>SanityPublisher: Document ID
        
        SanityPublisher->>Database: Update generation status
    end
    
    ScheduleAPI-->>CronWorker: Execution complete


## Components and Interfaces

### Component 1: Schedule Manager

**Purpose**: Manages creation, updating, and deletion of scheduled content generation tasks

**Interface**:
```typescript
interface ScheduleManager {
  createSchedule(params: CreateScheduleParams): Promise<ScheduledTask>
  updateSchedule(id: string, params: UpdateScheduleParams): Promise<ScheduledTask>
  deleteSchedule(id: string): Promise<void>
  listSchedules(filters: ScheduleFilters): Promise<ScheduledTask[]>
  getSchedule(id: string): Promise<ScheduledTask | null>
}

interface CreateScheduleParams {
  name: string
  taskType: "ai_content_generation"
  cronExpr: string
  timezone: string
  enabled: boolean
  payload: ContentGenerationPayload
}

interface ContentGenerationPayload {
  contentType: "post" | "service" | "product"
  promptTemplateId?: string
  customPrompt?: string
  batchSize: number
  autoPublish: boolean
  generateOgImage: boolean
  tags?: string[]
}
```

**Responsibilities**:
- Validate cron expressions and timezone
- Store schedule configuration in database
- Calculate next run time based on cron expression
- Provide CRUD operations for schedules

### Component 2: Content Generator

**Purpose**: Orchestrates AI content generation using existing AI infrastructure

**Interface**:
```typescript
interface ContentGenerator {
  generateContent(params: GenerateContentParams): Promise<GeneratedContent>
  generateBatch(params: BatchGenerateParams): Promise<GeneratedContent[]>
  retryGeneration(generationId: string): Promise<GeneratedContent>
}

interface GenerateContentParams {
  contentType: "post" | "service" | "product"
  prompt: string
  system?: string
  model?: string
  provider?: "gateway" | "groq" | "gemini"
  metadata?: Record<string, any>
}

interface GeneratedContent {
  id: string
  contentType: string
  title: string
  excerpt: string
  body: string
  provider: string
  model: string
  rawOutput: string
  validationStatus: "valid" | "invalid" | "pending"
  sanityDocumentId?: string
}
```

**Responsibilities**:
- Interface with existing AI generation infrastructure
- Parse and validate generated content structure
- Store generation results in aiGenerations table
- Handle generation errors and retries

### Component 3: OG Image Generator

**Purpose**: Generates Open Graph images for generated content

**Interface**:
```typescript
interface OGImageGenerator {
  generateImage(params: OGImageParams): Promise<OGImageResult>
  uploadToSanity(imageUrl: string, metadata: ImageMetadata): Promise<SanityAsset>
}

interface OGImageParams {
  title: string
  excerpt?: string
  contentType: "post" | "service" | "product"
  template?: "default" | "minimal" | "branded"
  dimensions?: { width: number; height: number }
}

interface OGImageResult {
  imageUrl: string
  width: number
  height: number
  format: string
}

interface SanityAsset {
  _id: string
  url: string
  metadata: {
    dimensions: { width: number; height: number }
    lqip: string
  }
}
```

**Responsibilities**:
- Generate OG images using Vercel OG or alternative
- Upload generated images to Sanity asset storage
- Return asset references for document linking
- Handle image generation failures gracefully

### Component 4: Prompt Template Manager

**Purpose**: Manages reusable prompt templates for content generation

**Interface**:
```typescript
interface PromptTemplateManager {
  createTemplate(params: CreateTemplateParams): Promise<PromptTemplate>
  updateTemplate(id: string, params: UpdateTemplateParams): Promise<PromptTemplate>
  deleteTemplate(id: string): Promise<void>
  listTemplates(contentType?: string): Promise<PromptTemplate[]>
  getTemplate(id: string): Promise<PromptTemplate | null>
  renderTemplate(templateId: string, variables: Record<string, string>): Promise<string>
}

interface PromptTemplate {
  id: string
  name: string
  contentType: "post" | "service" | "product" | "all"
  systemPrompt: string
  userPromptTemplate: string
  variables: TemplateVariable[]
  createdAt: Date
  updatedAt: Date
}

interface TemplateVariable {
  name: string
  description: string
  required: boolean
  defaultValue?: string
}
```

**Responsibilities**:
- Store and retrieve prompt templates
- Support template variables and interpolation
- Validate template syntax
- Provide template versioning

### Component 5: Sanity Publisher

**Purpose**: Publishes generated content to Sanity CMS

**Interface**:
```typescript
interface SanityPublisher {
  publishContent(params: PublishParams): Promise<PublishResult>
  updateContent(documentId: string, params: UpdateParams): Promise<PublishResult>
  attachOGImage(documentId: string, assetId: string): Promise<void>
  setPublishStatus(documentId: string, status: "draft" | "published"): Promise<void>
}

interface PublishParams {
  contentType: "post" | "service" | "project"
  title: string
  slug: string
  excerpt: string
  body: any[]
  ogImageAssetId?: string
  publishedAt?: Date
  metadata?: Record<string, any>
}

interface PublishResult {
  documentId: string
  status: "draft" | "published"
  url: string
}
```

**Responsibilities**:
- Create Sanity documents from generated content
- Handle slug generation and uniqueness
- Attach OG images to documents
- Manage draft vs published status
- Update existing documents if needed

## Data Models

### Model 1: ScheduledTask (Extended)

```typescript
interface ScheduledTask {
  id: string
  taskType: "ai_content_generation"
  name: string
  cronExpr: string
  timezone: string
  enabled: boolean
  payload: {
    contentType: "post" | "service" | "product"
    promptTemplateId?: string
    customPrompt?: string
    batchSize: number
    autoPublish: boolean
    generateOgImage: boolean
    tags?: string[]
  }
  lastRunAt?: Date
  nextRunAt?: Date
  createdAt: Date
}
```

**Validation Rules**:
- `cronExpr` must be valid cron expression
- `timezone` must be valid IANA timezone
- `batchSize` must be between 1 and 50
- `contentType` must be one of allowed values

### Model 2: PromptTemplate

```typescript
interface PromptTemplate {
  id: string
  name: string
  contentType: "post" | "service" | "product" | "all"
  systemPrompt: string
  userPromptTemplate: string
  variables: {
    name: string
    description: string
    required: boolean
    defaultValue?: string
  }[]
  createdAt: Date
  updatedAt: Date
}
```

**Validation Rules**:
- `name` must be unique per contentType
- `systemPrompt` max length 5000 characters
- `userPromptTemplate` max length 10000 characters
- Variable names must be alphanumeric with underscores

### Model 3: AiGeneration (Extended)

```typescript
interface AiGeneration {
  id: string
  sourceType: "manual" | "scheduled" | "batch"
  templateId?: string
  jobRunId?: string
  inputJson: {
    prompt: string
    system: string
    contentType: string
    metadata?: Record<string, any>
  }
  promptVersion?: string
  provider: "gateway" | "groq" | "gemini"
  model: string
  rawOutput: string
  parsedOutput?: {
    title: string
    excerpt: string
    body: string
    slug?: string
  }
  validationStatus: "valid" | "invalid" | "pending"
  validationErrors?: any[]
  sanityWriteStatus: "pending" | "success" | "failed"
  sanityDocumentId?: string
  ogImageAssetId?: string
  createdAt: Date
}
```

**Validation Rules**:
- `parsedOutput.title` max 200 characters
- `parsedOutput.excerpt` max 300 characters
- `parsedOutput.body` required when validationStatus is "valid"
- `sanityDocumentId` required when sanityWriteStatus is "success"

## Algorithmic Pseudocode

### Main Processing Algorithm

```pascal
ALGORITHM processScheduledContentGeneration(task)
INPUT: task of type ScheduledTask
OUTPUT: result of type ProcessingResult

BEGIN
  ASSERT task.enabled = true
  ASSERT task.taskType = "ai_content_generation"
  
  // Step 1: Initialize job tracking
  jobRun ← createJobRun({
    taskId: task.id,
    jobType: "ai_content_generation",
    payload: task.payload
  })
  
  updateJobRun(jobRun.id, {
    status: "processing",
    startedAt: currentTime()
  })
  
  // Step 2: Resolve prompt template
  prompt ← resolvePrompt(task.payload)
  
  // Step 3: Generate content batch
  generatedItems ← []
  FOR i FROM 1 TO task.payload.batchSize DO
    ASSERT i <= 50  // Safety limit
    
    TRY
      content ← generateContent({
        contentType: task.payload.contentType,
        prompt: prompt,
        provider: task.payload.provider,
        tags: task.payload.tags
      })
      
      // Step 4: Generate OG image if enabled
      IF task.payload.generateOgImage = true THEN
        ogImage ← generateOGImage({
          title: content.title,
          excerpt: content.excerpt,
          contentType: task.payload.contentType
        })
        content.ogImageAssetId ← ogImage.assetId
      END IF
      
      // Step 5: Publish to Sanity if auto-publish enabled
      IF task.payload.autoPublish = true THEN
        publishResult ← publishToSanity({
          contentType: task.payload.contentType,
          title: content.title,
          excerpt: content.excerpt,
          body: content.body,
          ogImageAssetId: content.ogImageAssetId
        })
        content.sanityDocumentId ← publishResult.documentId
      END IF
      
      generatedItems.add(content)
      
    CATCH error
      logError(error, {
        taskId: task.id,
        iteration: i
      })
      // Continue with next item
    END TRY
  END FOR
  
  // Step 6: Update job status
  updateJobRun(jobRun.id, {
    status: "success",
    result: {
      generated: generatedItems.length,
      published: countPublished(generatedItems)
    },
    finishedAt: currentTime()
  })
  
  // Step 7: Update task next run time
  updateScheduledTask(task.id, {
    lastRunAt: currentTime(),
    nextRunAt: calculateNextRun(task.cronExpr, task.timezone)
  })
  
  RETURN {
    success: true,
    generated: generatedItems.length,
    published: countPublished(generatedItems)
  }
END
```

**Preconditions:**
- task is a valid ScheduledTask record
- task.enabled is true
- task.payload contains valid configuration
- Database connection is available
- AI provider credentials are configured

**Postconditions:**
- Job run record is created and updated
- Content items are generated and stored
- OG images are generated if enabled
- Content is published to Sanity if auto-publish enabled
- Task lastRunAt and nextRunAt are updated
- All database transactions are committed

**Loop Invariants:**
- generatedItems contains only valid content items
- Each iteration processes exactly one content item
- Failed items do not block subsequent iterations
- Job run status remains "processing" until loop completes

### Prompt Resolution Algorithm

```pascal
ALGORITHM resolvePrompt(payload)
INPUT: payload of type ContentGenerationPayload
OUTPUT: prompt of type string

BEGIN
  // Check if custom prompt provided
  IF payload.customPrompt IS NOT NULL AND payload.customPrompt ≠ "" THEN
    RETURN payload.customPrompt
  END IF
  
  // Check if template ID provided
  IF payload.promptTemplateId IS NOT NULL THEN
    template ← getPromptTemplate(payload.promptTemplateId)
    
    IF template IS NULL THEN
      THROW Error("Template not found")
    END IF
    
    // Render template with variables
    prompt ← renderTemplate(template, payload.metadata)
    RETURN prompt
  END IF
  
  // Fallback to default prompts from AI Writer Settings
  settings ← getAiWriterSettings()
  
  IF payload.contentType = "post" THEN
    RETURN settings.prompts.postRewrite
  ELSE IF payload.contentType = "service" THEN
    RETURN settings.prompts.serviceRewrite
  ELSE IF payload.contentType = "product" THEN
    RETURN settings.prompts.projectRewrite
  END IF
  
  THROW Error("No prompt available for content type")
END
```

**Preconditions:**
- payload is non-null and well-formed
- payload.contentType is valid
- Database connection is available

**Postconditions:**
- Returns non-empty prompt string
- Throws error if no prompt can be resolved
- No side effects on input payload

**Loop Invariants:** N/A (no loops)

### OG Image Generation Algorithm

```pascal
ALGORITHM generateOGImage(params)
INPUT: params of type OGImageParams
OUTPUT: result of type OGImageResult

BEGIN
  ASSERT params.title ≠ ""
  ASSERT params.contentType IN ["post", "service", "product"]
  
  // Step 1: Prepare image generation request
  template ← params.template OR "default"
  dimensions ← params.dimensions OR {width: 1200, height: 630}
  
  // Step 2: Generate image via Vercel OG
  imageUrl ← callVercelOG({
    title: truncate(params.title, 60),
    description: truncate(params.excerpt, 120),
    template: template,
    width: dimensions.width,
    height: dimensions.height
  })
  
  // Step 3: Upload to Sanity
  sanityAsset ← uploadImageToSanity(imageUrl, {
    title: params.title,
    contentType: params.contentType,
    source: "ai-generated-og"
  })
  
  RETURN {
    imageUrl: sanityAsset.url,
    assetId: sanityAsset._id,
    width: dimensions.width,
    height: dimensions.height,
    format: "png"
  }
END
```

**Preconditions:**
- params.title is non-empty string
- params.contentType is valid enum value
- Vercel OG endpoint is accessible
- Sanity write token is configured

**Postconditions:**
- Returns valid OGImageResult with asset ID
- Image is uploaded to Sanity asset storage
- Asset is properly tagged with metadata
- No temporary files remain on disk

**Loop Invariants:** N/A (no loops)

## Key Functions with Formal Specifications

### Function 1: createScheduledTask()

```typescript
function createScheduledTask(params: CreateScheduleParams): Promise<ScheduledTask>
```

**Preconditions:**
- `params.name` is non-empty string (max 200 chars)
- `params.cronExpr` is valid cron expression
- `params.timezone` is valid IANA timezone
- `params.payload.batchSize` is between 1 and 50
- `params.payload.contentType` is valid enum value
- Database connection is available

**Postconditions:**
- Returns ScheduledTask with generated UUID
- Task is persisted in scheduledTasks table
- `nextRunAt` is calculated from cronExpr and timezone
- `createdAt` is set to current timestamp
- If autoPublish is true, validates Sanity credentials exist

**Loop Invariants:** N/A

### Function 2: generateContent()

```typescript
function generateContent(params: GenerateContentParams): Promise<GeneratedContent>
```

**Preconditions:**
- `params.prompt` is non-empty string (max 20000 chars)
- `params.contentType` is valid enum value
- AI provider credentials are configured
- Database connection is available

**Postconditions:**
- Returns GeneratedContent with parsed structure
- Content is stored in aiGenerations table
- `validationStatus` is set based on parsing success
- `provider` and `model` reflect actual AI service used
- If parsing fails, `validationErrors` contains error details

**Loop Invariants:** N/A

### Function 3: publishToSanity()

```typescript
function publishToSanity(params: PublishParams): Promise<PublishResult>
```

**Preconditions:**
- `params.title` is non-empty string
- `params.slug` is valid URL-safe string or will be generated
- `params.body` is valid portable text array
- `SANITY_AUTH_TOKEN` environment variable is set
- Sanity project is accessible

**Postconditions:**
- Returns PublishResult with Sanity document ID
- Document is created in Sanity with status "draft" or "published"
- If slug conflicts, generates unique slug with suffix
- If ogImageAssetId provided, image is attached to document
- Document URL is constructed and returned

**Loop Invariants:** N/A

### Function 4: calculateNextRun()

```typescript
function calculateNextRun(cronExpr: string, timezone: string): Date
```

**Preconditions:**
- `cronExpr` is valid cron expression (5 or 6 fields)
- `timezone` is valid IANA timezone string
- Current time is available

**Postconditions:**
- Returns Date object representing next execution time
- Returned date is always in the future
- Date respects timezone offset
- If cron expression is invalid, throws error

**Loop Invariants:** N/A

## Example Usage

```typescript
// Example 1: Create scheduled blog post generation
const schedule = await createScheduledTask({
  name: "Daily Blog Posts",
  taskType: "ai_content_generation",
  cronExpr: "0 9 * * *",  // Every day at 9 AM
  timezone: "Asia/Jakarta",
  enabled: true,
  payload: {
    contentType: "post",
    promptTemplateId: "blog-seo-template-001",
    batchSize: 5,
    autoPublish: false,  // Review before publishing
    generateOgImage: true,
    tags: ["scheduled", "blog", "seo"]
  }
})

// Example 2: Generate content with custom prompt
const content = await generateContent({
  contentType: "service",
  prompt: "Write about web development services for small businesses in Surabaya",
  system: "You are an expert copywriter for Kotacom",
  provider: "gateway",
  metadata: {
    location: "Surabaya",
    targetAudience: "small businesses"
  }
})

// Example 3: Publish generated content to Sanity
const publishResult = await publishToSanity({
  contentType: "post",
  title: content.title,
  slug: generateSlug(content.title),
  excerpt: content.excerpt,
  body: parsePortableText(content.body),
  ogImageAssetId: content.ogImageAssetId,
  publishedAt: new Date()
})

// Example 4: Create prompt template
const template = await createPromptTemplate({
  name: "SEO Blog Post Template",
  contentType: "post",
  systemPrompt: "You are an SEO expert writing for Indonesian audience",
  userPromptTemplate: `Write a blog post about {{topic}} targeting {{keyword}}.
    Include:
    - Engaging title with keyword
    - Meta description (150 chars)
    - 3-5 paragraphs with natural keyword placement
    - Call to action at the end`,
  variables: [
    { name: "topic", description: "Main topic", required: true },
    { name: "keyword", description: "Target SEO keyword", required: true }
  ]
})

// Example 5: Process scheduled tasks (called by cron)
const result = await processScheduledContentGeneration(task)
console.log(`Generated ${result.generated} items, published ${result.published}`)
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Schedule Persistence and Uniqueness

For any valid schedule parameters, creating a schedule results in a persisted database record with a unique ID.

**Validates: Requirements 1.1**

### Property 2: Cron Expression Validation

For any cron expression string, the Schedule Manager accepts valid cron syntax and rejects invalid syntax before persisting.

**Validates: Requirements 1.2, 9.6, 12.8**

### Property 3: Timezone Validation

For any timezone string, the Schedule Manager accepts valid IANA timezones and rejects invalid ones before persisting.

**Validates: Requirements 1.3, 12.9**

### Property 4: Next Run Time Calculation

For any valid cron expression and timezone, the calculated next run time is in the future and respects the cron pattern.

**Validates: Requirements 1.4, 1.6, 6.7**

### Property 5: Schedule Listing Completeness

For any set of N created schedules, listing schedules returns all N schedules with pagination support.

**Validates: Requirements 1.5**

### Property 6: Schedule Deletion Prevention

For any deleted schedule, it is marked as deleted and does not appear in the execution queue.

**Validates: Requirements 1.7**

### Property 7: Enabled Schedule Execution

For any enabled schedule with nextRunAt in the past, it appears in the due schedules query.

**Validates: Requirements 1.9, 6.1**

### Property 8: Disabled Schedule Prevention

For any disabled schedule, it does not appear in the due schedules query regardless of nextRunAt value.

**Validates: Requirements 1.10**

### Property 9: AI Provider Fallback

For any AI provider failure, the Content Generator attempts the next provider in the fallback chain.

**Validates: Requirements 2.2, 9.1**

### Property 10: Content Parsing Structure

For any valid AI output, parsing extracts all required structured fields (title, excerpt, body).

**Validates: Requirements 2.3**

### Property 11: Validation Status Consistency

For any content generation, validation status is "valid" with complete fields or "invalid" with error details.

**Validates: Requirements 2.4, 2.5**

### Property 12: Generation Persistence

For any content generation (successful or failed), the result is persisted to the aiGenerations table.

**Validates: Requirements 2.6**

### Property 13: Batch Size Bounds

For any batch generation request with size N, the generated count is less than or equal to N and less than or equal to 50.

**Validates: Requirements 2.7, 2.8, 12.2, 15.1**

### Property 14: Batch Failure Isolation

For any batch with one item failure, the remaining items in the batch are still processed.

**Validates: Requirements 2.9, 15.3**

### Property 15: Generation Metadata Completeness

For any content generation, metadata fields (provider, model, parameters) are populated.

**Validates: Requirements 2.10**

### Property 16: Template Syntax Validation

For any prompt template, the Prompt Template Manager validates syntax before persisting.

**Validates: Requirements 3.1**

### Property 17: Template Variable Name Validation

For any template variable name, validation accepts alphanumeric characters with underscores and rejects other characters.

**Validates: Requirements 3.2, 12.7**

### Property 18: Template Variable Interpolation

For any template with variables and provided values, rendering interpolates all variables into the template.

**Validates: Requirements 3.3, 8.6**

### Property 19: Required Variable Enforcement

For any template with required variables, rendering without those variables returns an error.

**Validates: Requirements 3.4, 8.7**

### Property 20: Template Retrieval Completeness

For any stored template, retrieval returns the complete template object with all metadata.

**Validates: Requirements 3.5**

### Property 21: Template Content Type Filtering

For any content type filter, listing templates returns only templates matching that content type.

**Validates: Requirements 3.6**

### Property 22: Template Update Timestamp

For any template update, the updatedAt timestamp is greater than the previous value.

**Validates: Requirements 3.7**

### Property 23: Deleted Template Prevention

For any deleted template, it cannot be used in new schedule creation.

**Validates: Requirements 3.8**

### Property 24: Template Name Uniqueness

For any content type, template names are unique within that content type.

**Validates: Requirements 3.9**

### Property 25: OG Image Generation Per Item

For any content with OG image generation enabled, an image is generated for each content item.

**Validates: Requirements 4.1, 15.6**

### Property 26: OG Image Content Inclusion

For any generated OG image, it includes the content title and excerpt.

**Validates: Requirements 4.2**

### Property 27: OG Image Asset ID Return

For any successful OG image upload, a Sanity asset ID is returned.

**Validates: Requirements 4.4**

### Property 28: OG Image Failure Isolation

For any OG image generation failure, content generation continues without the image.

**Validates: Requirements 4.5, 9.5**

### Property 29: OG Image Default Dimensions

For any OG image without custom dimensions, default dimensions (1200x630) are used.

**Validates: Requirements 4.6**

### Property 30: OG Image Template Selection

For any specified OG image template, that template is used for image generation.

**Validates: Requirements 4.7**

### Property 31: OG Image Metadata Inclusion

For any uploaded OG image, metadata (title, content type, source) is included.

**Validates: Requirements 4.8**

### Property 32: Auto-Publish Document Creation

For any valid content with auto-publish enabled, a Sanity document is created.

**Validates: Requirements 5.1, 15.7**

### Property 33: Slug URL Safety

For any title, the generated slug contains only URL-safe characters.

**Validates: Requirements 5.2, 12.6**

### Property 34: Slug Uniqueness with Suffix

For any duplicate slug, a numeric suffix is appended to ensure uniqueness.

**Validates: Requirements 5.3**

### Property 35: OG Image Attachment

For any content with an OG image asset ID, the image is attached to the Sanity document.

**Validates: Requirements 5.4**

### Property 36: Publish Success Document ID

For any successful Sanity publish, the generation record is updated with the Sanity document ID.

**Validates: Requirements 5.5, 12.10**

### Property 37: Publish Failure Status

For any Sanity publish failure, sanityWriteStatus is marked "failed" with error message stored.

**Validates: Requirements 5.6, 9.4**

### Property 38: Auto-Publish Disabled Prevention

For any content with auto-publish disabled, no Sanity document is created automatically.

**Validates: Requirements 5.7**

### Property 39: Default Draft Status

For any published document without publishedAt date, the status is "draft".

**Validates: Requirements 5.8**

### Property 40: Published Status with Date

For any content with publishedAt date, the Sanity document status is "published".

**Validates: Requirements 5.9**

### Property 41: Portable Text Conversion

For any body text, conversion to Sanity portable text format produces valid portable text.

**Validates: Requirements 5.10**

### Property 42: Job Run Creation

For any due schedule, a job run record is created to track execution.

**Validates: Requirements 6.2**

### Property 43: Batch Size Execution

For any schedule with batch size N, N content items are generated during execution.

**Validates: Requirements 6.3**

### Property 44: Job Run Success Status

For any completed batch without errors, the job run status is "success".

**Validates: Requirements 6.4**

### Property 45: Job Run Failure Status

For any execution with errors, the job run is marked "failed" with error logged.

**Validates: Requirements 6.5**

### Property 46: Last Run Time Update

For any completed execution, the schedule's lastRunAt is updated to current time.

**Validates: Requirements 6.6**

### Property 47: Cron Secret Validation

For any cron endpoint request, processing only occurs with valid CRON_SECRET header.

**Validates: Requirements 6.9**

### Property 48: Custom Prompt Usage

For any schedule with custom prompt, that prompt is used directly for generation.

**Validates: Requirements 8.1**

### Property 49: Template Loading and Rendering

For any schedule with template ID, the template is loaded and rendered for generation.

**Validates: Requirements 8.2**

### Property 50: Template Not Found Error

For any non-existent template ID, an error is returned.

**Validates: Requirements 8.3**

### Property 51: Default Prompt Fallback

For any schedule without custom prompt or template ID, default prompts from AI Writer Settings are used.

**Validates: Requirements 8.4, 9.7**

### Property 52: Content Type Prompt Selection

For any content type, the appropriate default prompt is selected based on content type.

**Validates: Requirements 8.5, 14.1, 14.2, 14.3**

### Property 53: Prompt Length Truncation

For any prompt exceeding 20000 characters, it is truncated with a warning logged.

**Validates: Requirements 8.9**

### Property 54: All Provider Failure Handling

For any scenario where all AI providers fail, the generation is marked failed with all error messages logged.

**Validates: Requirements 9.2**

### Property 55: Retry Parameter Preservation

For any retry of a failed generation, the same prompt and parameters are used as the original attempt.

**Validates: Requirements 9.10**

### Property 56: Content Type Validation

For any schedule creation, content type must be one of: post, service, product.

**Validates: Requirements 12.1**

### Property 57: Title Validation

For any parsed content, title is present and under 200 characters.

**Validates: Requirements 12.3**

### Property 58: Excerpt Validation

For any parsed content, excerpt is present and under 300 characters.

**Validates: Requirements 12.4**

### Property 59: Body Presence for Valid Content

For any content marked as valid, body is present.

**Validates: Requirements 12.5**

### Property 60: Sanity Schema Type Correctness

For any content type, the Sanity Publisher creates documents with the correct Sanity schema type.

**Validates: Requirements 14.4**

### Property 61: Content Type OG Template Selection

For any content type, the OG Image Generator uses the content-type-specific template.

**Validates: Requirements 14.5**

### Property 62: Universal Template Support

For any template marked "all", it works with any content type.

**Validates: Requirements 14.6**

### Property 63: Type-Specific Template Restriction

For any content-type-specific template, it only works with that content type.

**Validates: Requirements 14.7**

### Property 64: Content Type Schema Validation

For any content type, generated content is validated against the content-type-specific schema.

**Validates: Requirements 14.10**

### Property 65: Batch Prompt Consistency

For any batch generation, all items use the same prompt.

**Validates: Requirements 15.5**

### Property 66: Batch Completion Counts

For any completed batch, the counts of successful and failed items are recorded.

**Validates: Requirements 15.4**

## Error Handling

### Error Scenario 1: AI Provider Failure

**Condition**: AI provider (Gateway/Groq/Gemini) returns error or timeout
**Response**: 
- Log error with provider details and error message
- Attempt fallback to next provider in rotation
- If all providers fail, mark generation as failed
- Store error details in jobRuns.errorMessage
**Recovery**: 
- User can retry generation from dashboard
- System automatically retries on next scheduled run
- Failed generations remain in database for debugging

### Error Scenario 2: Invalid Cron Expression

**Condition**: User provides invalid cron expression when creating schedule
**Response**:
- Validate cron expression before saving to database
- Return 400 error with specific validation message
- Suggest correct cron format in error response
**Recovery**:
- User corrects cron expression and resubmits
- No database record is created for invalid schedules

### Error Scenario 3: Sanity Publish Failure

**Condition**: Sanity API returns error during document creation
**Response**:
- Mark sanityWriteStatus as "failed"
- Store error message in aiGenerations record
- Keep generated content in database for manual review
- Send notification to dashboard
**Recovery**:
- User can manually retry publish from dashboard
- User can edit content before republishing
- System provides "Push to Sanity" button for failed items

### Error Scenario 4: OG Image Generation Failure

**Condition**: Vercel OG service fails or returns invalid image
**Response**:
- Log error with image parameters
- Continue content generation without OG image
- Set ogImageAssetId to null
- Mark generation as successful but note missing image
**Recovery**:
- User can manually generate OG image later
- System provides "Regenerate OG Image" button
- Content can be published without OG image

### Error Scenario 5: Database Connection Loss

**Condition**: Database becomes unavailable during processing
**Response**:
- Catch database errors at transaction level
- Roll back any partial transactions
- Mark job run as failed with connection error
- Queue retry attempt
**Recovery**:
- System automatically retries on next cron run
- Manual retry available from dashboard
- No data corruption due to transaction rollback

### Error Scenario 6: Prompt Template Not Found

**Condition**: Scheduled task references deleted prompt template
**Response**:
- Check template existence before generation
- Fall back to default prompts from AI Writer Settings
- Log warning about missing template
- Continue with fallback prompt
**Recovery**:
- User updates schedule to use valid template
- System continues using fallback until fixed
- No generation failure due to missing template

## Testing Strategy

### Unit Testing Approach

Test individual functions and components in isolation:

- **Schedule Manager**: Test CRUD operations, cron validation, timezone handling
- **Content Generator**: Test prompt resolution, AI provider integration, error handling
- **OG Image Generator**: Test image generation, Sanity upload, error scenarios
- **Prompt Template Manager**: Test template rendering, variable interpolation, validation
- **Sanity Publisher**: Test document creation, slug generation, image attachment

Key test cases:
- Valid input produces expected output
- Invalid input throws appropriate errors
- Edge cases (empty strings, null values, max lengths)
- Database transaction rollback on errors
- Provider fallback logic

### Property-Based Testing Approach

Use property-based testing to verify system invariants:

**Property Test Library**: fast-check (for TypeScript/JavaScript)

**Test Properties**:
1. **Idempotency**: Calling createScheduledTask with same params twice should not create duplicates
2. **Monotonicity**: nextRunAt is always greater than lastRunAt
3. **Batch Size Bounds**: Generated content count never exceeds batchSize
4. **Slug Uniqueness**: Generated slugs are always unique within content type
5. **Content Structure**: All valid generations have title, excerpt, and body
6. **Provider Rotation**: Failed provider is not retried in same generation attempt

Example property test:
```typescript
import fc from 'fast-check'

test('batch size is always respected', () => {
  fc.assert(
    fc.property(
      fc.integer({ min: 1, max: 50 }),
      async (batchSize) => {
        const result = await generateBatch({ batchSize })
        expect(result.length).toBeLessThanOrEqual(batchSize)
      }
    )
  )
})
```

### Integration Testing Approach

Test component interactions and end-to-end workflows:

- **Schedule Creation to Execution**: Create schedule, trigger cron, verify content generated
- **Content Generation to Publishing**: Generate content, verify Sanity document created
- **OG Image Pipeline**: Generate content with OG image, verify image uploaded and attached
- **Error Recovery**: Simulate failures, verify retry mechanisms work
- **Provider Fallback**: Disable primary provider, verify fallback to secondary

Test environment setup:
- Use test database with isolated schema
- Mock external services (Vercel OG, AI providers)
- Use Sanity test dataset
- Simulate cron triggers programmatically

## Performance Considerations

### Batch Processing Optimization

- Process content generation in parallel up to concurrency limit (default: 3)
- Use connection pooling for database operations
- Implement request queuing to avoid overwhelming AI providers
- Cache prompt templates in memory to reduce database queries

### Database Query Optimization

- Index scheduledTasks.nextRunAt for efficient due task queries
- Index aiGenerations.createdAt for dashboard pagination
- Use database transactions for atomic operations
- Implement soft deletes to preserve audit trail

### Rate Limiting

- Respect AI provider rate limits (Gateway: 100 req/min, Groq: 30 req/min)
- Implement exponential backoff for retries
- Queue excess requests in Redis for later processing
- Monitor provider usage and adjust batch sizes dynamically

### Caching Strategy

- Cache AI Writer Settings for 5 minutes
- Cache prompt templates for 10 minutes
- Cache Sanity schema for 1 hour
- Invalidate caches on updates

### Resource Management

- Limit concurrent OG image generations to 5
- Set timeout for AI generation (60 seconds)
- Set timeout for Sanity operations (30 seconds)
- Clean up old job runs after 30 days

## Security Considerations

### Authentication & Authorization

- All API endpoints require SEO dashboard authentication
- Cron endpoints require CRON_SECRET header validation
- Sanity operations require SANITY_AUTH_TOKEN
- AI provider keys stored in environment variables, never in database

### Input Validation

- Sanitize all user inputs before database storage
- Validate cron expressions against whitelist patterns
- Limit prompt length to prevent abuse (max 20000 chars)
- Validate content type against allowed enum values
- Escape HTML in generated content before rendering

### Rate Limiting & Abuse Prevention

- Limit schedule creation to 50 per user
- Limit batch size to 50 items per execution
- Implement IP-based rate limiting on API endpoints
- Monitor for suspicious patterns (rapid schedule creation)

### Data Privacy

- Do not log sensitive data (API keys, tokens)
- Redact prompts containing PII in logs
- Implement data retention policy (delete old generations after 90 days)
- Provide user data export functionality

### Secure Communication

- Use HTTPS for all external API calls
- Validate SSL certificates for AI providers
- Use secure headers (CORS, CSP) on API endpoints
- Implement request signing for Sanity operations

## Dependencies

### External Services

- **Vercel AI Gateway**: AI model routing and fallback
- **Google Gemini API**: Direct AI generation (fallback)
- **Groq API**: Direct AI generation (fallback)
- **Vercel OG Image**: OG image generation
- **Sanity CMS**: Content storage and management
- **Cloudflare Workers**: Cron trigger execution

### NPM Packages

- `@ai-sdk/gateway`: Vercel AI Gateway SDK
- `ai`: Vercel AI SDK core
- `drizzle-orm`: Database ORM
- `@upstash/redis`: Redis queue management
- `cron-parser`: Cron expression parsing
- `date-fns-tz`: Timezone handling
- `slugify`: URL-safe slug generation
- `zod`: Runtime type validation
- `next-sanity`: Sanity client for Next.js

### Environment Variables

Required:
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `SANITY_AUTH_TOKEN`: Sanity write token
- `CRON_SECRET`: Cron endpoint authentication
- `AI_GATEWAY_API_KEY`: Vercel AI Gateway key (or OIDC)

Optional:
- `AI_WRITER_GEMINI_KEYS`: Gemini API keys (newline-separated)
- `AI_WRITER_GROQ_KEYS`: Groq API keys (newline-separated)
- `VERCEL_OG_ENDPOINT`: Custom OG image endpoint
- `BATCH_CONCURRENCY`: Parallel generation limit (default: 3)

### Database Schema Extensions

New tables required:
- `prompt_templates`: Store reusable prompt templates

Schema modifications:
- `scheduledTasks.payload`: Add support for ai_content_generation type
- `aiGenerations`: Add templateId, ogImageAssetId fields

### Infrastructure Requirements

- PostgreSQL 14+ with JSONB support
- Redis 6+ for queue management
- Node.js 18+ runtime
- Cloudflare Workers for cron triggers
- Sanity project with write access
