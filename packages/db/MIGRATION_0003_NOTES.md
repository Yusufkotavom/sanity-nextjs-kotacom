# Migration 0003: Schedule System Clarity Fix - Database Schema Changes

## Overview

This migration adds database schema changes to support two distinct schedule types and enable publishing queue functionality for manually-created content.

## Changes Made

### 1. Schedule Type Enum

Created a new PostgreSQL enum type `schedule_type` with two values:
- `ai_generation` - For AI content generation + auto-publish schedules
- `publishing_queue` - For publishing manually-created content

### 2. scheduledTasks Table

**Added Field:**
- `scheduleType` (schedule_type enum) - Required field with default value `'ai_generation'`
  - Distinguishes between AI generation and publishing queue schedules
  - Default ensures backward compatibility with existing schedules
  - All existing schedules are automatically set to `'ai_generation'`

### 3. aiGenerations Table

**Added Index:**
- `ai_generations_ready_to_publish_idx` on `readyToPublish` field
  - Enables efficient querying for content ready to be published
  - Critical for publishing queue performance

**Note:** The `readyToPublish` boolean field already exists in the table (added in a previous migration), so this migration only adds the index.

### 4. TypeScript Types

Added type definitions for schedule payload configurations:

```typescript
export type PublishingQueueConfig = {
  contentType?: "post" | "service" | "product";
  batchSize: number;
};

export type AIGenerationConfig = {
  templateId: string;
  autoPublish: boolean;
  generateOgImage?: boolean;
  [key: string]: any;
};

export type SchedulePayload = {
  publishingQueueConfig?: PublishingQueueConfig;
  aiGenerationConfig?: AIGenerationConfig;
  [key: string]: any;
};
```

## Backward Compatibility

✅ **Fully backward compatible:**
- All existing schedules default to `scheduleType = 'ai_generation'`
- Existing schedule execution logic remains unchanged
- No breaking changes to existing APIs or workflows

## Migration Execution

To apply this migration:

```bash
cd packages/db
npm run drizzle:migrate
```

## Related Documentation

- See `SCHEDULE_TYPES.md` for detailed documentation on schedule types and payload structures
- See `.kiro/specs/schedule-system-clarity-fix/` for the complete bugfix specification

## Requirements Addressed

This migration addresses the following requirements from the bugfix spec:
- 2.1: Schedule type selection required
- 2.2: Visual type indicators (schema support)
- 2.3: Ready to publish flag (index added)
- 2.4: Publishing queue content selection (index enables efficient queries)
- 2.5: FIFO ordering support (createdAt index already exists)
- 2.6: Content type filtering (schema supports via payload)
- 2.7: Batch size configuration (schema supports via payload)
