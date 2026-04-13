# Implementation Plan: AI Content Scheduler

## Overview

This implementation plan breaks down the AI Content Scheduler feature into discrete, manageable tasks. The system will extend the existing seo-dashboard with scheduled content generation capabilities, integrating with the existing AI infrastructure (packages/ai), database (packages/db), and Sanity CMS (packages/sanity).

The implementation follows a bottom-up approach: database schema extensions first, then core business logic, API endpoints, and finally the UI dashboard components.

## Tasks

- [x] 1. Extend database schema for AI Content Scheduler
  - [x] 1.1 Add promptTemplates table to packages/db/src/schema.ts
    - Create pgTable definition with fields: id, name, contentType, systemPrompt, userPromptTemplate, variables (jsonb), createdAt, updatedAt
    - Add indexes for contentType and name
    - Export table definition
    - _Requirements: 3.1, 3.2, 3.9, 12.7_
  
  - [x] 1.2 Extend aiGenerations table with new fields
    - Add ogImageAssetId (text, nullable) field
    - Ensure templateId and jobRunId fields exist (already in schema)
    - _Requirements: 2.6, 4.4_
  
  - [x] 1.3 Create database migration for new schema
    - Generate migration file using drizzle-kit
    - Test migration on development database
    - _Requirements: 1.1, 3.1_

- [x] 2. Implement Prompt Template Manager
  - [x] 2.1 Create prompt template service in seo-dashboard/lib/ai-writer/prompt-templates.ts
    - Implement createTemplate function with validation
    - Implement updateTemplate function with timestamp update
    - Implement deleteTemplate function
    - Implement listTemplates with contentType filtering
    - Implement getTemplate by ID
    - Implement renderTemplate with variable interpolation
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10_
  
  - [x] 2.2 Write unit tests for prompt template service
    - Test template creation with valid and invalid inputs
    - Test variable interpolation with missing required variables
    - Test template name uniqueness per content type
    - Test max length validation for prompts
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.9, 3.10_

- [x] 3. Implement OG Image Generator
  - [x] 3.1 Create OG image service in seo-dashboard/lib/ai-writer/og-image-generator.ts
    - Implement generateImage function using Vercel OG or alternative
    - Implement uploadToSanity function for asset upload
    - Add error handling with graceful degradation
    - Implement concurrency limit (5 concurrent generations)
    - Add 30-second timeout handling
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4.10_
  
  - [x] 3.2 Write unit tests for OG image generator
    - Test image generation with title and excerpt
    - Test Sanity upload with metadata
    - Test failure isolation (content continues without image)
    - Test timeout handling
    - _Requirements: 4.1, 4.2, 4.4, 4.5, 4.10_

- [x] 4. Implement Sanity Publisher
  - [x] 4.1 Create Sanity publisher service in seo-dashboard/lib/ai-writer/sanity-publisher.ts
    - Implement publishContent function with document creation
    - Implement slug generation with URL-safe characters
    - Implement slug uniqueness with numeric suffix on conflicts
    - Implement attachOGImage function
    - Implement portable text conversion from raw body text
    - Add draft vs published status handling
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 5.10, 12.6_
  
  - [x] 4.2 Write unit tests for Sanity publisher
    - Test slug generation and URL safety
    - Test slug uniqueness with conflicts
    - Test OG image attachment
    - Test portable text conversion
    - Test draft vs published status
    - _Requirements: 5.2, 5.3, 5.4, 5.9, 5.10_

- [x] 5. Implement Content Generator orchestration
  - [x] 5.1 Create content generator service in seo-dashboard/lib/ai-writer/content-generator.ts
    - Implement generateContent function with AI provider integration
    - Implement provider fallback chain (Gateway → Gemini → Groq)
    - Implement content parsing into structured fields (title, excerpt, body)
    - Implement validation status setting based on parsing success
    - Implement generateBatch function with concurrency control (default: 3)
    - Add batch size validation (max 50 items)
    - Implement error isolation for batch processing
    - Store generation metadata (provider, model, parameters)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10, 10.1, 10.2, 12.2, 12.3, 12.4, 12.5_
  
  - [x] 5.2 Implement prompt resolution logic
    - Check for custom prompt first
    - Fall back to template rendering if template ID provided
    - Fall back to default prompts from AI Writer Settings
    - Implement template variable interpolation
    - Add prompt length validation and truncation (max 20000 chars)
    - Cache AI Writer Settings for 5 minutes
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9, 8.10, 10.4_
  
  - [x] 5.3 Write unit tests for content generator
    - Test AI provider fallback chain
    - Test content parsing and validation
    - Test batch processing with failures
    - Test prompt resolution logic
    - Test concurrency limits
    - _Requirements: 2.2, 2.3, 2.4, 2.7, 2.9, 8.1, 8.2, 8.3, 8.4, 10.1_

- [x] 6. Checkpoint - Core services complete
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Implement Schedule Manager
  - [x] 7.1 Create schedule manager service in seo-dashboard/lib/ai-writer/schedule-manager.ts
    - Implement createSchedule with cron expression validation
    - Implement timezone validation against IANA database
    - Implement next run time calculation from cron expression
    - Implement updateSchedule with next run time recalculation
    - Implement deleteSchedule with soft delete
    - Implement listSchedules with pagination
    - Implement getSchedule by ID
    - Enforce maximum 50 schedules per user
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10, 9.6, 12.1, 12.2, 12.8, 12.9_
  
  - [x] 7.2 Write unit tests for schedule manager
    - Test cron expression validation
    - Test timezone validation
    - Test next run time calculation
    - Test schedule limit enforcement (50 max)
    - Test enabled/disabled schedule behavior
    - _Requirements: 1.2, 1.3, 1.4, 1.6, 1.8, 1.9, 1.10_

- [ ] 8. Implement scheduled task execution
  - [ ] 8.1 Extend seo-dashboard/app/api/internal/cron-run/route.ts for content generation
    - Add handler for ai_content_generation task type
    - Query enabled schedules where nextRunAt has passed
    - Create job run record for tracking
    - Execute content generation with configured batch size
    - Integrate OG image generation when enabled
    - Integrate Sanity publishing when auto-publish enabled
    - Update job run status (success/failed) with counts
    - Update schedule lastRunAt and nextRunAt
    - Implement concurrency limit (3 by default)
    - Add CRON_SECRET validation
    - Add 5-minute execution timeout
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 6.10, 10.8, 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7_
  
  - [ ] 8.2 Write integration tests for cron execution
    - Test schedule query and execution
    - Test job run creation and updates
    - Test batch processing with OG images
    - Test auto-publish integration
    - Test timeout handling
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.10_

- [x] 9. Create API endpoints for schedule management
  - [x] 9.1 Create POST /api/ai/schedule/create endpoint
    - Validate request body (name, cronExpr, timezone, payload)
    - Call schedule manager createSchedule
    - Return created schedule with next run time
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 11.1, 11.5_
  
  - [x] 9.2 Create GET /api/ai/schedule/list endpoint
    - Support pagination parameters
    - Call schedule manager listSchedules
    - Return schedules with metadata
    - _Requirements: 1.5, 11.1_
  
  - [x] 9.3 Create GET /api/ai/schedule/[id] endpoint
    - Validate schedule ID
    - Call schedule manager getSchedule
    - Return schedule details with recent job runs
    - _Requirements: 1.5, 11.1_
  
  - [x] 9.4 Create PUT /api/ai/schedule/[id] endpoint
    - Validate request body
    - Call schedule manager updateSchedule
    - Return updated schedule
    - _Requirements: 1.6, 11.1_
  
  - [x] 9.5 Create DELETE /api/ai/schedule/[id] endpoint
    - Validate schedule ID
    - Call schedule manager deleteSchedule
    - Return success response
    - _Requirements: 1.7, 11.1_

- [x] 10. Create API endpoints for prompt templates
  - [x] 10.1 Create POST /api/ai/templates/create endpoint
    - Validate template data (name, contentType, prompts, variables)
    - Call prompt template manager createTemplate
    - Return created template
    - _Requirements: 3.1, 3.2, 3.9, 3.10, 11.1, 11.5_
  
  - [x] 10.2 Create GET /api/ai/templates/list endpoint
    - Support contentType filter parameter
    - Call prompt template manager listTemplates
    - Return templates
    - _Requirements: 3.6, 11.1_
  
  - [x] 10.3 Create GET /api/ai/templates/[id] endpoint
    - Validate template ID
    - Call prompt template manager getTemplate
    - Return template with metadata
    - _Requirements: 3.5, 11.1_
  
  - [x] 10.4 Create PUT /api/ai/templates/[id] endpoint
    - Validate request body
    - Call prompt template manager updateTemplate
    - Return updated template
    - _Requirements: 3.7, 11.1_
  
  - [x] 10.5 Create DELETE /api/ai/templates/[id] endpoint
    - Validate template ID
    - Call prompt template manager deleteTemplate
    - Return success response
    - _Requirements: 3.8, 11.1_

- [ ] 11. Create API endpoint for retry publish
  - [ ] 11.1 Extend POST /api/ai/push-to-sanity endpoint
    - Add support for retrying failed generations
    - Load generation record by ID
    - Call Sanity publisher with generation data
    - Update sanityWriteStatus and sanityDocumentId
    - Return result with Sanity document ID
    - _Requirements: 5.5, 5.6, 7.9, 9.4, 9.10_

- [ ] 12. Checkpoint - API layer complete
  - Ensure all tests pass, ask the user if questions arise.

- [x] 13. Create dashboard UI for schedule management
  - [x] 13.1 Create schedule list page at seo-dashboard/app/dashboard/schedules/page.tsx
    - Display table of all schedules with status indicators
    - Show name, content type, cron expression, enabled status, last run, next run
    - Add "Create Schedule" button
    - Add edit and delete actions per schedule
    - Implement pagination
    - _Requirements: 7.1, 7.5, 7.9_
  
  - [x] 13.2 Create schedule form component in seo-dashboard/components/schedule-form.tsx
    - Add fields: name, content type, cron expression, timezone, batch size
    - Add prompt selection (custom or template)
    - Add toggles for auto-publish and generate OG image
    - Add cron expression validation with helpful error messages
    - Add timezone selector with IANA timezones
    - Pre-populate form for editing existing schedules
    - _Requirements: 7.2, 7.3, 7.6, 12.1, 12.2, 12.8, 12.9_
  
  - [x] 13.3 Create schedule detail page at seo-dashboard/app/dashboard/schedules/[id]/page.tsx
    - Display full schedule configuration
    - Show recent job runs with status and results
    - Display generation statistics (total, success rate, duration)
    - Add "Edit Schedule" and "Delete Schedule" buttons
    - Show next scheduled run time
    - _Requirements: 7.5, 13.6, 13.7, 13.9_
  
  - [x] 13.4 Add schedule delete confirmation dialog
    - Show confirmation dialog before deletion
    - Call DELETE /api/ai/schedule/[id] on confirm
    - Refresh schedule list after deletion
    - _Requirements: 7.7_

- [ ] 14. Create dashboard UI for prompt templates
  - [ ] 14.1 Create templates panel component in seo-dashboard/components/templates-panel.tsx (extend existing)
    - Display list of prompt templates
    - Add "Create Template" button
    - Show template name, content type, and actions
    - Add filter by content type
    - Add edit and delete actions per template
    - _Requirements: 3.5, 3.6, 14.8_
  
  - [ ] 14.2 Create template form dialog component
    - Add fields: name, content type, system prompt, user prompt template
    - Add variable definition section (name, description, required, default)
    - Validate variable names (alphanumeric with underscores)
    - Validate prompt max lengths (system: 5000, user: 10000)
    - Pre-populate for editing
    - _Requirements: 3.1, 3.2, 3.9, 3.10, 12.7_
  
  - [ ] 14.3 Add template delete confirmation
    - Show warning that existing schedules will fall back to defaults
    - Call DELETE /api/ai/templates/[id] on confirm
    - Refresh template list
    - _Requirements: 3.8, 9.7_

- [ ] 15. Enhance generation list UI for new features
  - [ ] 15.1 Extend seo-dashboard/app/dashboard/ai/page.tsx
    - Add filter for source type (manual, scheduled, batch)
    - Add filter for content type (post, service, product)
    - Display OG image thumbnail when available
    - Show template name when generation used template
    - Add "Retry Publish" button for failed Sanity writes
    - Show validation errors for invalid content
    - _Requirements: 7.8, 7.9, 7.10, 13.8, 13.10, 14.9_
  
  - [ ] 15.2 Add generation statistics dashboard widget
    - Display total generations count
    - Show success rate percentage
    - Display average generation duration
    - Show breakdown by content type
    - Add date range filter
    - _Requirements: 13.7_

- [ ] 16. Add monitoring and observability
  - [ ] 16.1 Enhance job run logging
    - Log start time, finish time, and duration
    - Log error messages and stack traces for failures
    - Log provider, model, and token usage for generations
    - Log item counts (generated, published, failed) per batch
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.8_
  
  - [ ] 16.2 Create job runs detail view
    - Display job run history for each schedule
    - Show execution timeline with status indicators
    - Display error details for failed runs
    - Show generation results with links to content
    - _Requirements: 13.6, 13.10_

- [ ] 17. Implement error handling and recovery
  - [ ] 17.1 Add retry mechanism for failed generations
    - Implement retryGeneration function in content generator
    - Preserve original prompt and parameters
    - Update generation record with retry attempt
    - _Requirements: 9.1, 9.2, 9.10_
  
  - [ ] 17.2 Add database transaction rollback
    - Wrap critical operations in transactions
    - Implement rollback on connection loss
    - Log transaction failures
    - _Requirements: 9.3_
  
  - [ ] 17.3 Implement rate limiting and backoff
    - Add exponential backoff for AI provider retries
    - Respect provider rate limits (Gateway: 100/min, Groq: 30/min)
    - Queue excess requests
    - _Requirements: 10.2, 10.3_

- [ ] 18. Add security and validation
  - [ ] 18.1 Implement input sanitization
    - Sanitize all user inputs before database storage
    - Escape HTML in generated content before rendering
    - Validate enum values (content type, validation status)
    - _Requirements: 11.5, 11.6, 12.1_
  
  - [ ] 18.2 Add authentication checks
    - Verify SEO dashboard auth on all API endpoints
    - Validate CRON_SECRET on cron endpoint
    - Ensure Sanity auth token is configured
    - _Requirements: 11.1, 11.2, 11.3_
  
  - [ ] 18.3 Implement resource limits
    - Enforce 50 schedules per user limit
    - Enforce 50 batch size limit
    - Implement API rate limiting
    - _Requirements: 11.7, 11.8, 11.9_

- [ ] 19. Add content type support
  - [ ] 19.1 Implement content-type-specific logic
    - Add content type validation in schedule creation
    - Implement correct Sanity schema type selection per content type
    - Add content-type-specific OG image templates
    - Implement content-type-specific validation schemas
    - _Requirements: 12.1, 14.1, 14.2, 14.3, 14.4, 14.5, 14.9, 14.10_
  
  - [ ] 19.2 Add content type filtering in UI
    - Add content type filter to schedule list
    - Add content type filter to generation list
    - Add content type filter to template list
    - Show content-type-specific configuration options in forms
    - _Requirements: 14.8, 14.9_

- [ ] 20. Performance optimizations
  - [ ] 20.1 Implement caching
    - Cache AI Writer Settings for 5 minutes
    - Cache prompt templates for 10 minutes
    - Add cache invalidation on updates
    - _Requirements: 8.10, 10.4, 10.5_
  
  - [ ] 20.2 Add database query optimizations
    - Add index on scheduledTasks.nextRunAt
    - Add index on aiGenerations.createdAt
    - Implement connection pooling
    - _Requirements: 6.1, 10.7_
  
  - [ ] 20.3 Implement cleanup job
    - Create cleanup task for old job runs (30+ days)
    - Schedule cleanup to run weekly
    - Log cleanup statistics
    - _Requirements: 10.10_

- [ ] 21. Final integration and wiring
  - [x] 21.1 Wire schedule management into sidebar navigation
    - Add "Schedules" menu item in seo-dashboard/components/app-sidebar.tsx
    - Add "Templates" submenu item
    - Update navigation structure
    - _Requirements: 7.1_
  
  - [ ] 21.2 Update environment variables documentation
    - Document required variables (DATABASE_URL, SANITY_AUTH_TOKEN, CRON_SECRET)
    - Document optional variables (AI provider keys, batch concurrency)
    - Update .env.example files
    - _Requirements: 11.2, 11.3, 11.4_
  
  - [ ] 21.3 Create README documentation
    - Document feature overview and capabilities
    - Document API endpoints and usage
    - Document cron setup and configuration
    - Add troubleshooting guide
    - _Requirements: All_

- [ ] 22. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional testing tasks and can be skipped for faster MVP
- Each task references specific requirements for traceability
- The implementation uses TypeScript throughout
- All code integrates with existing seo-dashboard infrastructure
- Database schema extends existing tables where possible
- API endpoints follow existing patterns in seo-dashboard/app/api
- UI components use existing Shadcn UI components from seo-dashboard/components/ui
- Checkpoints ensure incremental validation at key milestones
