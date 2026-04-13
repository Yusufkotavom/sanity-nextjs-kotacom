# Requirements Document: AI Content Scheduler

## Introduction

The AI Content Scheduler is a system that automates content generation for blog posts, services, and products with scheduling capabilities. It integrates with existing AI Writer infrastructure (Vercel AI Gateway, Gemini, Groq) and leverages the scheduled tasks framework to provide batch content generation, OG image generation, and automated publishing to Sanity CMS.

The system enables content creators to schedule recurring content generation tasks, manage prompt templates, monitor generation status, and automatically publish content to Sanity CMS with optional OG image generation.

## Glossary

- **Schedule**: A configured task that defines when and how content should be generated
- **Content_Generator**: The system component that orchestrates AI content generation
- **Prompt_Template**: A reusable template for AI prompts with variable interpolation
- **OG_Image_Generator**: The component that creates Open Graph images for content
- **Sanity_Publisher**: The component that publishes generated content to Sanity CMS
- **Batch_Generation**: The process of generating multiple content items in a single execution
- **Cron_Worker**: The Cloudflare Worker that triggers scheduled task execution
- **AI_Provider**: External AI service (Gateway, Gemini, or Groq)
- **Job_Run**: A single execution instance of a scheduled task
- **Validation_Status**: The state of content validation (valid, invalid, pending)
- **Auto_Publish**: Automatic publishing of generated content to Sanity without manual review

## Requirements

### Requirement 1: Schedule Management

**User Story:** As a content creator, I want to create and manage scheduled content generation tasks, so that I can automate recurring content production.

#### Acceptance Criteria

1. WHEN a user creates a schedule with valid parameters, THE Schedule_Manager SHALL persist the schedule to the database with a unique ID
2. WHEN a user provides a cron expression, THE Schedule_Manager SHALL validate it against standard cron syntax before saving
3. WHEN a user provides a timezone, THE Schedule_Manager SHALL validate it against IANA timezone database
4. WHEN a schedule is created, THE Schedule_Manager SHALL calculate the next run time based on cron expression and timezone
5. WHEN a user requests schedule list, THE Schedule_Manager SHALL return all schedules with pagination support
6. WHEN a user updates a schedule, THE Schedule_Manager SHALL recalculate the next run time if cron expression or timezone changed
7. WHEN a user deletes a schedule, THE Schedule_Manager SHALL mark it as deleted and prevent future executions
8. THE Schedule_Manager SHALL enforce a maximum of 50 schedules per user
9. WHEN a schedule is enabled, THE Schedule_Manager SHALL ensure it will be picked up by the next cron execution
10. WHEN a schedule is disabled, THE Schedule_Manager SHALL prevent it from executing even if next run time has passed

### Requirement 2: Content Generation

**User Story:** As a content creator, I want to generate content using AI providers, so that I can produce blog posts, services, and products automatically.

#### Acceptance Criteria

1. WHEN content generation is requested, THE Content_Generator SHALL use the configured AI provider (Gateway, Gemini, or Groq)
2. WHEN the primary AI provider fails, THE Content_Generator SHALL attempt fallback to the next available provider
3. WHEN content is generated, THE Content_Generator SHALL parse the raw output into structured fields (title, excerpt, body)
4. WHEN parsing succeeds, THE Content_Generator SHALL set validation status to "valid"
5. WHEN parsing fails, THE Content_Generator SHALL set validation status to "invalid" and store error details
6. WHEN content generation completes, THE Content_Generator SHALL store the result in the aiGenerations table
7. WHEN batch generation is requested, THE Content_Generator SHALL generate up to the specified batch size
8. THE Content_Generator SHALL enforce a maximum batch size of 50 items per execution
9. WHEN a generation fails, THE Content_Generator SHALL log the error and continue with remaining items in the batch
10. WHEN content is generated, THE Content_Generator SHALL include metadata about provider, model, and generation parameters

### Requirement 3: Prompt Template Management

**User Story:** As a content creator, I want to create and manage reusable prompt templates, so that I can standardize content generation across schedules.

#### Acceptance Criteria

1. WHEN a user creates a prompt template, THE Prompt_Template_Manager SHALL validate template syntax before saving
2. WHEN a template includes variables, THE Prompt_Template_Manager SHALL validate variable names are alphanumeric with underscores
3. WHEN a template is rendered, THE Prompt_Template_Manager SHALL interpolate all provided variables into the template
4. WHEN a required variable is missing during rendering, THE Prompt_Template_Manager SHALL return an error
5. WHEN a template is requested, THE Prompt_Template_Manager SHALL return the template with all metadata
6. WHEN templates are listed, THE Prompt_Template_Manager SHALL support filtering by content type
7. WHEN a template is updated, THE Prompt_Template_Manager SHALL update the updatedAt timestamp
8. WHEN a template is deleted, THE Prompt_Template_Manager SHALL prevent it from being used in new schedules
9. THE Prompt_Template_Manager SHALL enforce unique template names per content type
10. THE Prompt_Template_Manager SHALL enforce maximum lengths (system prompt: 5000 chars, user prompt: 10000 chars)

### Requirement 4: OG Image Generation

**User Story:** As a content creator, I want to automatically generate Open Graph images for my content, so that social media shares look professional.

#### Acceptance Criteria

1. WHEN OG image generation is enabled for a schedule, THE OG_Image_Generator SHALL create an image for each generated content item
2. WHEN generating an image, THE OG_Image_Generator SHALL use the content title and excerpt
3. WHEN an image is generated, THE OG_Image_Generator SHALL upload it to Sanity asset storage
4. WHEN upload succeeds, THE OG_Image_Generator SHALL return the Sanity asset ID
5. WHEN image generation fails, THE OG_Image_Generator SHALL log the error and allow content generation to continue
6. THE OG_Image_Generator SHALL generate images with dimensions 1200x630 pixels by default
7. WHEN a template is specified, THE OG_Image_Generator SHALL use the specified template for image generation
8. WHEN an image is uploaded to Sanity, THE OG_Image_Generator SHALL include metadata (title, content type, source)
9. THE OG_Image_Generator SHALL limit concurrent image generations to 5
10. WHEN image generation times out after 30 seconds, THE OG_Image_Generator SHALL fail gracefully

### Requirement 5: Sanity Publishing

**User Story:** As a content creator, I want to automatically publish generated content to Sanity CMS, so that it appears on my website without manual intervention.

#### Acceptance Criteria

1. WHEN auto-publish is enabled and content is valid, THE Sanity_Publisher SHALL create a document in Sanity
2. WHEN creating a document, THE Sanity_Publisher SHALL generate a unique URL-safe slug from the title
3. WHEN a slug conflicts with an existing document, THE Sanity_Publisher SHALL append a numeric suffix to ensure uniqueness
4. WHEN an OG image asset ID is provided, THE Sanity_Publisher SHALL attach the image to the document
5. WHEN publishing succeeds, THE Sanity_Publisher SHALL update the generation record with the Sanity document ID
6. WHEN publishing fails, THE Sanity_Publisher SHALL mark sanityWriteStatus as "failed" and store the error message
7. WHEN auto-publish is disabled, THE Sanity_Publisher SHALL not create documents automatically
8. THE Sanity_Publisher SHALL create documents in "draft" status by default
9. WHEN a publishedAt date is provided, THE Sanity_Publisher SHALL set the document status to "published"
10. WHEN publishing to Sanity, THE Sanity_Publisher SHALL convert generated body text to Sanity portable text format

### Requirement 6: Scheduled Task Execution

**User Story:** As a system operator, I want scheduled tasks to execute automatically at their configured times, so that content generation happens without manual intervention.

#### Acceptance Criteria

1. WHEN the cron worker runs, THE Cron_Worker SHALL query all enabled schedules where next run time has passed
2. WHEN a schedule is due, THE Cron_Worker SHALL create a job run record to track execution
3. WHEN processing a schedule, THE Cron_Worker SHALL execute content generation for the configured batch size
4. WHEN all items in a batch are processed, THE Cron_Worker SHALL update the job run status to "success"
5. WHEN any error occurs during execution, THE Cron_Worker SHALL log the error and mark the job run as "failed"
6. WHEN execution completes, THE Cron_Worker SHALL update the schedule's last run time to current time
7. WHEN execution completes, THE Cron_Worker SHALL calculate and set the next run time based on cron expression
8. THE Cron_Worker SHALL process batch items with a concurrency limit of 3 by default
9. WHEN the cron endpoint is called, THE Cron_Worker SHALL validate the CRON_SECRET header before processing
10. WHEN a schedule execution times out after 5 minutes, THE Cron_Worker SHALL mark it as failed and continue with other schedules

### Requirement 7: Dashboard UI

**User Story:** As a content creator, I want a dashboard to manage schedules and monitor generations, so that I can control and observe the content generation system.

#### Acceptance Criteria

1. WHEN a user visits the dashboard, THE Dashboard_UI SHALL display a list of all schedules with their status
2. WHEN a user clicks create schedule, THE Dashboard_UI SHALL show a form with all required fields
3. WHEN a user submits the schedule form, THE Dashboard_UI SHALL validate all inputs before sending to the API
4. WHEN a schedule is created successfully, THE Dashboard_UI SHALL show a success message and refresh the list
5. WHEN a user views a schedule, THE Dashboard_UI SHALL display all configuration details and recent job runs
6. WHEN a user edits a schedule, THE Dashboard_UI SHALL pre-populate the form with current values
7. WHEN a user deletes a schedule, THE Dashboard_UI SHALL show a confirmation dialog before deletion
8. WHEN a user views generations, THE Dashboard_UI SHALL display a paginated list with filtering options
9. WHEN a generation failed to publish, THE Dashboard_UI SHALL show a "Retry Publish" button
10. WHEN a user clicks retry publish, THE Dashboard_UI SHALL attempt to publish the content to Sanity again

### Requirement 8: Prompt Resolution

**User Story:** As a content creator, I want the system to resolve prompts from templates or custom inputs, so that I have flexibility in how content is generated.

#### Acceptance Criteria

1. WHEN a schedule has a custom prompt, THE Content_Generator SHALL use the custom prompt directly
2. WHEN a schedule has a template ID, THE Content_Generator SHALL load and render the template
3. WHEN a template is not found, THE Content_Generator SHALL return an error
4. WHEN neither custom prompt nor template ID is provided, THE Content_Generator SHALL use default prompts from AI Writer Settings
5. WHEN using default prompts, THE Content_Generator SHALL select the appropriate prompt based on content type
6. WHEN rendering a template, THE Content_Generator SHALL interpolate variables from schedule metadata
7. WHEN a required template variable is missing, THE Content_Generator SHALL fail with a descriptive error
8. THE Content_Generator SHALL enforce a maximum prompt length of 20000 characters
9. WHEN a prompt exceeds maximum length, THE Content_Generator SHALL truncate it and log a warning
10. WHEN resolving prompts, THE Content_Generator SHALL cache AI Writer Settings for 5 minutes

### Requirement 9: Error Handling and Recovery

**User Story:** As a content creator, I want the system to handle errors gracefully and provide recovery options, so that temporary failures don't block content generation.

#### Acceptance Criteria

1. WHEN an AI provider fails, THE Content_Generator SHALL attempt the next provider in the fallback chain
2. WHEN all AI providers fail, THE Content_Generator SHALL mark the generation as failed and log all error messages
3. WHEN a database connection is lost, THE Content_Generator SHALL roll back any partial transactions
4. WHEN Sanity publishing fails, THE Content_Generator SHALL keep the generated content for manual retry
5. WHEN OG image generation fails, THE Content_Generator SHALL continue with content generation without the image
6. WHEN a cron expression is invalid, THE Schedule_Manager SHALL return a validation error before saving
7. WHEN a template is deleted, THE Schedule_Manager SHALL allow existing schedules to fall back to default prompts
8. WHEN a generation times out after 60 seconds, THE Content_Generator SHALL cancel the request and mark it as failed
9. WHEN a Sanity operation times out after 30 seconds, THE Sanity_Publisher SHALL mark the publish as failed
10. WHEN a user retries a failed generation, THE Content_Generator SHALL use the same prompt and parameters as the original attempt

### Requirement 10: Performance and Resource Management

**User Story:** As a system operator, I want the system to manage resources efficiently, so that it scales well and doesn't overwhelm external services.

#### Acceptance Criteria

1. THE Content_Generator SHALL process batch items with a maximum concurrency of 3 by default
2. THE Content_Generator SHALL respect AI provider rate limits (Gateway: 100 req/min, Groq: 30 req/min)
3. WHEN rate limits are approached, THE Content_Generator SHALL implement exponential backoff
4. THE Schedule_Manager SHALL cache AI Writer Settings for 5 minutes to reduce database queries
5. THE Prompt_Template_Manager SHALL cache templates for 10 minutes to reduce database queries
6. THE OG_Image_Generator SHALL limit concurrent image generations to 5
7. THE Content_Generator SHALL use database connection pooling for all operations
8. THE Cron_Worker SHALL process schedules in batches to avoid memory issues with large schedule counts
9. THE Dashboard_UI SHALL paginate generation lists with a default page size of 50 items
10. THE Content_Generator SHALL clean up job runs older than 30 days to manage database size

### Requirement 11: Security and Authentication

**User Story:** As a system administrator, I want the system to be secure and properly authenticated, so that only authorized users can access and modify content generation.

#### Acceptance Criteria

1. THE Schedule_Manager SHALL require SEO dashboard authentication for all API endpoints
2. THE Cron_Worker SHALL validate the CRON_SECRET header before processing any requests
3. THE Sanity_Publisher SHALL use SANITY_AUTH_TOKEN for all Sanity operations
4. THE Content_Generator SHALL store AI provider keys in environment variables, never in the database
5. THE Schedule_Manager SHALL sanitize all user inputs before storing in the database
6. THE Dashboard_UI SHALL escape HTML in generated content before rendering
7. THE Schedule_Manager SHALL enforce a maximum of 50 schedules per user to prevent abuse
8. THE Content_Generator SHALL enforce a maximum batch size of 50 items per execution
9. THE Schedule_Manager SHALL implement IP-based rate limiting on API endpoints
10. THE Content_Generator SHALL not log sensitive data (API keys, tokens) in any logs

### Requirement 12: Data Validation and Integrity

**User Story:** As a content creator, I want the system to validate data at all stages, so that I can trust the quality and consistency of generated content.

#### Acceptance Criteria

1. WHEN a schedule is created, THE Schedule_Manager SHALL validate that content type is one of: post, service, product
2. WHEN a schedule is created, THE Schedule_Manager SHALL validate that batch size is between 1 and 50
3. WHEN content is parsed, THE Content_Generator SHALL validate that title is present and under 200 characters
4. WHEN content is parsed, THE Content_Generator SHALL validate that excerpt is present and under 300 characters
5. WHEN content is parsed, THE Content_Generator SHALL validate that body is present for valid content
6. WHEN a slug is generated, THE Sanity_Publisher SHALL ensure it contains only URL-safe characters
7. WHEN a template variable name is provided, THE Prompt_Template_Manager SHALL validate it contains only alphanumeric characters and underscores
8. WHEN a cron expression is provided, THE Schedule_Manager SHALL validate it matches standard cron syntax
9. WHEN a timezone is provided, THE Schedule_Manager SHALL validate it exists in the IANA timezone database
10. WHEN content is marked as valid, THE Content_Generator SHALL ensure sanityDocumentId is set if auto-publish is enabled

### Requirement 13: Monitoring and Observability

**User Story:** As a system operator, I want to monitor system health and track generation metrics, so that I can identify and resolve issues quickly.

#### Acceptance Criteria

1. WHEN a job run starts, THE Cron_Worker SHALL record the start time in the job run record
2. WHEN a job run completes, THE Cron_Worker SHALL record the finish time and execution duration
3. WHEN a job run fails, THE Cron_Worker SHALL record the error message and stack trace
4. WHEN content is generated, THE Content_Generator SHALL log the provider, model, and token usage
5. WHEN a schedule executes, THE Cron_Worker SHALL log the number of items generated and published
6. THE Dashboard_UI SHALL display recent job runs with status indicators (success, failed, processing)
7. THE Dashboard_UI SHALL show generation statistics (total generated, success rate, average duration)
8. WHEN an error occurs, THE Content_Generator SHALL log it with sufficient context for debugging
9. THE Dashboard_UI SHALL display the last run time and next run time for each schedule
10. THE Dashboard_UI SHALL show validation errors for failed content generations

### Requirement 14: Content Type Support

**User Story:** As a content creator, I want to generate different types of content (posts, services, products), so that I can automate content creation across my entire website.

#### Acceptance Criteria

1. WHEN content type is "post", THE Content_Generator SHALL use post-specific prompts and schemas
2. WHEN content type is "service", THE Content_Generator SHALL use service-specific prompts and schemas
3. WHEN content type is "product", THE Content_Generator SHALL use product-specific prompts and schemas
4. WHEN publishing to Sanity, THE Sanity_Publisher SHALL create documents with the correct Sanity schema type
5. WHEN generating OG images, THE OG_Image_Generator SHALL use content-type-specific templates
6. THE Prompt_Template_Manager SHALL support templates that work across all content types
7. THE Prompt_Template_Manager SHALL support templates specific to one content type
8. WHEN listing templates, THE Dashboard_UI SHALL allow filtering by content type
9. WHEN creating a schedule, THE Dashboard_UI SHALL show content-type-specific configuration options
10. THE Content_Generator SHALL validate generated content against content-type-specific schemas

### Requirement 15: Batch Processing

**User Story:** As a content creator, I want to generate multiple content items in a single execution, so that I can efficiently produce large amounts of content.

#### Acceptance Criteria

1. WHEN a schedule specifies batch size N, THE Content_Generator SHALL generate exactly N items or fail gracefully
2. WHEN processing a batch, THE Content_Generator SHALL process items with a concurrency limit
3. WHEN one item in a batch fails, THE Content_Generator SHALL continue processing remaining items
4. WHEN a batch completes, THE Cron_Worker SHALL record the count of successful and failed items
5. WHEN batch processing, THE Content_Generator SHALL use the same prompt for all items in the batch
6. WHEN batch processing with OG images enabled, THE OG_Image_Generator SHALL generate an image for each item
7. WHEN batch processing with auto-publish enabled, THE Sanity_Publisher SHALL publish each valid item
8. THE Content_Generator SHALL enforce a maximum batch size of 50 items
9. WHEN a batch is processing, THE Dashboard_UI SHALL show progress indicators
10. WHEN a batch completes, THE Dashboard_UI SHALL show a summary of results (generated, published, failed)
