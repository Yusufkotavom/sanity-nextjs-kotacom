# Schedule System Clarity Fix - Bugfix Design

## Overview

The AI Content Scheduler currently suffers from a fundamental usability issue: it only supports one type of schedule (AI Generation + Auto-Publish) but this is not explicitly communicated to users. Additionally, there is no mechanism to schedule publishing of manually-created content, preventing users from building a publishing queue workflow for content created through manual generation flows.

This bugfix introduces two distinct schedule types with clear purposes, adds a publishing queue mechanism with FIFO selection, and enables manual content to be marked as "Ready to Publish" so it can enter the publishing queue. The fix maintains backward compatibility with existing "AI Generation + Auto-Publish" schedules while adding the new "Publishing Queue" functionality.

## Glossary

- **Bug_Condition (C)**: The condition that triggers the bug - when users cannot distinguish schedule purposes or schedule publishing of manually-created content
- **Property (P)**: The desired behavior - schedules have explicit types, manual content can be queued for publishing, and publishing queue uses FIFO ordering
- **Preservation**: Existing "AI Generation + Auto-Publish" behavior and all schedule execution logic that must remain unchanged
- **scheduleType**: A new field in the scheduledTasks table that distinguishes between "ai_generation" and "publishing_queue"
- **readyToPublish**: A new boolean field in the aiGenerations table that marks content as eligible for the publishing queue
- **publishingQueueConfig**: Configuration in schedule payload that defines content type filtering and batch size for publishing queue schedules
- **FIFO Selection**: First-In-First-Out ordering based on `createdAt` timestamp to determine which content gets published first

## Bug Details

### Bug Condition

The bug manifests when users interact with the schedule system in any of these scenarios: creating schedules, viewing schedule lists, creating manual content, or when schedules execute. The system fails to provide clarity about schedule purposes and lacks the ability to schedule publishing of manually-created content.

**Formal Specification:**
```
FUNCTION isBugCondition(input)
  INPUT: input of type UserInteraction
  OUTPUT: boolean
  
  RETURN (input.action = "create_schedule" AND scheduleTypeNotRequired(input))
         OR (input.action = "view_schedule_list" AND noVisualTypeDistinction(input))
         OR (input.action = "create_manual_content" AND noReadyToPublishFlag(input))
         OR (input.action = "schedule_execution" AND scheduleType = "publishing_queue" AND noFIFOSelection(input))
         OR (input.action = "schedule_execution" AND scheduleType = "publishing_queue" AND noContentTypeFiltering(input))
END FUNCTION
```

### Examples

- **Example 1**: User creates a schedule but cannot specify whether it's for AI generation or for publishing existing content → Expected: Schedule creation form requires selecting a schedule type
- **Example 2**: User views schedule list and all schedules look identical → Expected: Each schedule displays a badge or icon indicating its type ("AI Generation + Auto-Publish" or "Publishing Queue")
- **Example 3**: User generates content manually via `/dashboard/ai/generate` and wants to schedule it for future publishing → Expected: Content has a "Ready to Publish" toggle that marks it as queue-eligible
- **Example 4**: Publishing Queue schedule runs and selects content randomly → Expected: Schedule selects oldest content first (FIFO ordering by `createdAt`)
- **Edge case**: User creates Publishing Queue schedule with batch size 5, but only 3 items are ready to publish → Expected: Schedule publishes 3 items successfully without error

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- Existing "AI Generation + Auto-Publish" schedules must continue to generate content using AI providers and publish automatically
- Schedule enable/disable functionality must continue to work exactly as before
- Cron expression calculation and timezone handling must remain unchanged
- Content generation error logging and validation status marking must remain unchanged
- OG image generation for content items must continue to work
- Schedule soft-delete behavior (setting enabled to false) must remain unchanged
- Cron worker CRON_SECRET validation must remain unchanged
- Content storage without publishing (when auto-publish is disabled) must remain unchanged

**Scope:**
All inputs that do NOT involve the new schedule type selection, readyToPublish flag, or publishing queue execution should be completely unaffected by this fix. This includes:
- All existing AI generation workflows
- All existing schedule execution for "AI Generation + Auto-Publish" type
- All existing Sanity publishing logic for auto-generated content
- All existing dashboard UI for viewing and managing schedules (except for the new type indicators)

## Hypothesized Root Cause

Based on the bug description, the most likely issues are:

1. **Missing Schedule Type Field**: The `scheduledTasks` table does not have a `scheduleType` field to distinguish between different schedule purposes
   - Current schema only supports one implicit type
   - No validation or UI to enforce type selection

2. **Missing Ready-to-Publish Flag**: The `aiGenerations` table does not have a `readyToPublish` boolean field
   - Manual content cannot be marked as eligible for publishing queue
   - No way to distinguish between "draft" and "ready" manual content

3. **No Publishing Queue Selection Logic**: The cron worker does not have logic to select content for publishing queue schedules
   - No FIFO ordering implementation
   - No content type filtering based on schedule configuration
   - No batch size limiting for publishing queue

4. **Missing UI Components**: The dashboard UI does not have components to:
   - Select schedule type during creation
   - Display schedule type badges/icons in list view
   - Toggle "Ready to Publish" flag on manual content
   - Show publishing queue configuration options

## Correctness Properties

Property 1: Bug Condition - Schedule Type Clarity and Publishing Queue

_For any_ user interaction where a schedule is created, viewed, or executed, OR where manual content is created, the fixed system SHALL provide explicit schedule type selection, visual type indicators, a "Ready to Publish" flag for manual content, and FIFO-based publishing queue execution with content type filtering.

**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.9, 2.10**

Property 2: Preservation - Existing Schedule Behavior

_For any_ schedule execution, content generation, or publishing operation that does NOT involve the new "Publishing Queue" type or "Ready to Publish" flag, the fixed system SHALL produce exactly the same behavior as the original system, preserving all existing "AI Generation + Auto-Publish" functionality, schedule management, error handling, and Sanity publishing logic.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8**

## Fix Implementation

### Changes Required

Assuming our root cause analysis is correct:

**File**: `seo-dashboard/prisma/schema.prisma` (or equivalent database schema)

**Model**: `scheduledTasks`

**Specific Changes**:
1. **Add scheduleType Field**: Add `scheduleType` enum field with values "ai_generation" and "publishing_queue"
   - Default value: "ai_generation" for backward compatibility
   - Required field for new schedules
   - Migration: Set all existing schedules to "ai_generation"

2. **Extend Payload Schema**: Update payload JSON schema to support publishing queue configuration
   - Add `publishingQueueConfig` object with `contentType` filter and `batchSize`
   - Maintain backward compatibility with existing payload structure

**Model**: `aiGenerations`

**Specific Changes**:
3. **Add readyToPublish Field**: Add `readyToPublish` boolean field
   - Default value: false
   - Indexed for efficient querying
   - Migration: Set all existing records to false

**File**: `seo-dashboard/app/api/internal/cron-run/route.ts` (or equivalent cron handler)

**Function**: `processScheduledTasks` or equivalent

**Specific Changes**:
4. **Add Schedule Type Routing**: Add conditional logic to route schedule execution based on `scheduleType`
   - If "ai_generation": Execute existing AI generation + auto-publish flow
   - If "publishing_queue": Execute new publishing queue flow

5. **Implement Publishing Queue Selection**: Add function `selectContentForPublishing`
   - Query: `WHERE readyToPublish = true AND sanityWriteStatus != 'success'`
   - Apply content type filter from `publishingQueueConfig.contentType` if specified
   - Order by `createdAt ASC` (FIFO)
   - Limit by `publishingQueueConfig.batchSize`

6. **Implement Publishing Queue Execution**: Add function `executePublishingQueue`
   - For each selected content item, call existing Sanity publishing logic
   - Update `sanityWriteStatus` to 'success' and set `sanityDocumentId` on success
   - Log errors but continue with remaining items on failure

**File**: `seo-dashboard/app/api/ai/schedule/create/route.ts` (or equivalent schedule creation API)

**Function**: Schedule creation handler

**Specific Changes**:
7. **Add scheduleType Validation**: Validate that `scheduleType` is provided and is one of the allowed values
   - Reject requests without valid `scheduleType`
   - Validate payload structure matches schedule type (e.g., publishing queue requires `publishingQueueConfig`)

**File**: `seo-dashboard/app/dashboard/ai/schedule/page.tsx` (or equivalent schedule list UI)

**Component**: Schedule list component

**Specific Changes**:
8. **Add Schedule Type Badges**: Display visual indicators for schedule type
   - "AI Generation + Auto-Publish" badge with distinct color/icon
   - "Publishing Queue" badge with distinct color/icon
   - Position badges prominently in schedule list items

**File**: `seo-dashboard/app/dashboard/ai/schedule/create/page.tsx` (or equivalent schedule creation form)

**Component**: Schedule creation form

**Specific Changes**:
9. **Add Schedule Type Selection**: Add radio button or select input for schedule type
   - Required field
   - Show/hide relevant configuration fields based on selected type
   - For "publishing_queue": Show content type filter and batch size inputs

**File**: `seo-dashboard/app/dashboard/ai/generate/page.tsx` (or equivalent AI generations list)

**Component**: AI generations list component

**Specific Changes**:
10. **Add Ready to Publish Toggle**: Add toggle switch or checkbox for `readyToPublish` flag
    - Display current status for each content item
    - Allow toggling on/off
    - Only show for content where `sanityWriteStatus != 'success'`

**File**: `seo-dashboard/app/api/ai/generations/[id]/route.ts` (or equivalent generation update API)

**Function**: Generation update handler

**Specific Changes**:
11. **Add readyToPublish Update Endpoint**: Add PATCH endpoint to update `readyToPublish` flag
    - Validate that content exists and is not already published
    - Update `readyToPublish` field in database
    - Return updated generation record

## Testing Strategy

### Validation Approach

The testing strategy follows a two-phase approach: first, surface counterexamples that demonstrate the bug on unfixed code, then verify the fix works correctly and preserves existing behavior.

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples that demonstrate the bug BEFORE implementing the fix. Confirm or refute the root cause analysis. If we refute, we will need to re-hypothesize.

**Test Plan**: Write tests that attempt to create schedules without type selection, view schedule lists expecting type indicators, mark manual content as ready to publish, and execute publishing queue schedules. Run these tests on the UNFIXED code to observe failures and understand the root cause.

**Test Cases**:
1. **Schedule Creation Without Type Test**: Attempt to create a schedule without specifying `scheduleType` (will succeed on unfixed code, should fail on fixed code)
2. **Schedule List Type Display Test**: Query schedule list and check for type indicators in response (will be missing on unfixed code)
3. **Manual Content Ready Flag Test**: Attempt to set `readyToPublish` flag on manual content (will fail on unfixed code due to missing field)
4. **Publishing Queue FIFO Test**: Create multiple manual content items with different timestamps, execute publishing queue schedule, verify oldest is selected first (will fail on unfixed code due to missing logic)

**Expected Counterexamples**:
- Schedule creation succeeds without type selection (no validation)
- Schedule list returns no type information
- Database error when trying to set `readyToPublish` (field doesn't exist)
- Publishing queue schedule fails or selects content randomly (no FIFO logic)

### Fix Checking

**Goal**: Verify that for all inputs where the bug condition holds, the fixed function produces the expected behavior.

**Pseudocode:**
```
FOR ALL input WHERE isBugCondition(input) DO
  result := handleScheduleInteraction_fixed(input)
  ASSERT expectedBehavior(result)
END FOR
```

**Test Cases**:
1. **Schedule Type Required Test**: Create schedule without `scheduleType` → Expect validation error
2. **Schedule Type Badge Test**: Create schedules of both types, query list → Expect type badges in response
3. **Ready to Publish Toggle Test**: Create manual content, set `readyToPublish` to true → Expect field updated successfully
4. **Publishing Queue FIFO Test**: Create 5 manual content items with staggered timestamps, all marked ready, execute publishing queue with batch size 3 → Expect oldest 3 items published
5. **Publishing Queue Content Type Filter Test**: Create manual content of types "post" and "service", execute publishing queue with filter "post" → Expect only posts published
6. **Publishing Queue Batch Size Test**: Create 10 ready items, execute publishing queue with batch size 5 → Expect exactly 5 items published
7. **Ready to Publish Status Display Test**: View AI generations list → Expect "Ready to Publish" status displayed for each item

### Preservation Checking

**Goal**: Verify that for all inputs where the bug condition does NOT hold, the fixed function produces the same result as the original function.

**Pseudocode:**
```
FOR ALL input WHERE NOT isBugCondition(input) DO
  ASSERT handleScheduleInteraction_original(input) = handleScheduleInteraction_fixed(input)
END FOR
```

**Testing Approach**: Property-based testing is recommended for preservation checking because:
- It generates many test cases automatically across the input domain
- It catches edge cases that manual unit tests might miss
- It provides strong guarantees that behavior is unchanged for all non-buggy inputs

**Test Plan**: Observe behavior on UNFIXED code first for existing schedule operations, then write property-based tests capturing that behavior.

**Test Cases**:
1. **AI Generation Schedule Execution Preservation**: Create "ai_generation" schedule, execute → Verify content generated and published exactly as before
2. **Schedule Enable/Disable Preservation**: Enable/disable schedules → Verify execution behavior unchanged
3. **Cron Expression Calculation Preservation**: Create schedules with various cron expressions → Verify next run time calculated identically
4. **Content Generation Error Handling Preservation**: Trigger AI provider failures → Verify error logging and status marking unchanged
5. **OG Image Generation Preservation**: Execute schedule with OG image enabled → Verify images generated as before
6. **Schedule Soft-Delete Preservation**: Delete schedule → Verify soft-delete behavior (enabled = false) unchanged
7. **Cron Worker Authentication Preservation**: Call cron endpoint with/without CRON_SECRET → Verify authentication behavior unchanged
8. **Auto-Publish Disabled Preservation**: Execute schedule with auto-publish disabled → Verify content stored without publishing as before

### Unit Tests

- Test schedule type validation during creation (reject invalid types, require type field)
- Test `readyToPublish` flag update API (success cases, validation errors)
- Test publishing queue content selection logic (FIFO ordering, content type filtering, batch size limiting)
- Test schedule type badge rendering in UI (correct badges for each type)
- Test schedule creation form type selection (show/hide relevant fields based on type)
- Test ready to publish toggle in AI generations list (display, update functionality)

### Property-Based Tests

- Generate random schedules of both types and verify execution routes correctly
- Generate random sets of manual content with varying timestamps and verify FIFO selection
- Generate random content type distributions and verify filtering works correctly
- Generate random batch sizes and content counts and verify correct number published
- Test that all existing schedule operations produce identical results regardless of new fields

### Integration Tests

- Test full flow: Create "Publishing Queue" schedule → Create manual content → Mark ready → Execute schedule → Verify published to Sanity
- Test full flow: Create "AI Generation" schedule → Execute → Verify content generated and published (existing behavior)
- Test mixed scenario: Multiple schedules of both types executing concurrently
- Test UI flow: Create schedule with type selection → View in list with badge → Edit schedule → Verify type preserved
- Test UI flow: Generate manual content → Toggle ready to publish → Execute publishing queue → Verify content published
