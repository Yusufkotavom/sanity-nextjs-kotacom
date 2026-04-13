# Schedule Types Documentation

## Overview

The scheduling system supports two distinct schedule types:

1. **AI Generation + Auto-Publish** (`ai_generation`) - Generates new content using AI and optionally publishes it automatically
2. **Publishing Queue** (`publishing_queue`) - Publishes manually-created content that has been marked as ready to publish

## Schedule Type: `ai_generation`

This is the default schedule type for backward compatibility. It generates new content using AI providers and can automatically publish the generated content to Sanity.

### Payload Structure

```typescript
{
  aiGenerationConfig: {
    templateId: string;           // ID of the prompt template to use
    autoPublish: boolean;          // Whether to automatically publish generated content
    generateOgImage?: boolean;     // Whether to generate OG images for content
    // Additional configuration fields as needed
  }
}
```

### Example

```typescript
const aiGenerationSchedule = {
  taskType: "ai_content_generation",
  scheduleType: "ai_generation",
  name: "Daily Blog Post Generation",
  cronExpr: "0 9 * * *",
  timezone: "Asia/Jakarta",
  enabled: true,
  payload: {
    aiGenerationConfig: {
      templateId: "uuid-of-template",
      autoPublish: true,
      generateOgImage: true
    }
  }
};
```

## Schedule Type: `publishing_queue`

This schedule type publishes manually-created content that has been marked as "ready to publish". It uses FIFO (First-In-First-Out) ordering based on the `createdAt` timestamp.

### Payload Structure

```typescript
{
  publishingQueueConfig: {
    contentType?: "post" | "service" | "product";  // Optional filter by content type
    batchSize: number;                              // Number of items to publish per run
  }
}
```

### Selection Logic

The publishing queue selects content based on the following criteria:

1. `readyToPublish = true` - Content must be marked as ready
2. `sanityWriteStatus != 'success'` - Content must not already be published
3. Optional: Filter by `contentType` if specified in config
4. Order by `createdAt ASC` (oldest first - FIFO)
5. Limit by `batchSize`

### Example

```typescript
const publishingQueueSchedule = {
  taskType: "publishing_queue",
  scheduleType: "publishing_queue",
  name: "Hourly Blog Post Publishing",
  cronExpr: "0 * * * *",
  timezone: "Asia/Jakarta",
  enabled: true,
  payload: {
    publishingQueueConfig: {
      contentType: "post",  // Only publish blog posts
      batchSize: 5          // Publish up to 5 posts per hour
    }
  }
};
```

## Database Schema

### `scheduled_tasks` Table

- `scheduleType`: ENUM('ai_generation', 'publishing_queue') - Required field with default 'ai_generation'

### `ai_generations` Table

- `readyToPublish`: BOOLEAN - Default false, indexed for efficient querying
- Used by publishing queue to identify content ready for publishing

## Migration Notes

- All existing schedules are automatically set to `scheduleType = 'ai_generation'` for backward compatibility
- The `readyToPublish` field defaults to `false` for all existing content
- An index on `readyToPublish` enables efficient querying for the publishing queue
