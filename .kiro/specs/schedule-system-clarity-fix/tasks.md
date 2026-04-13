# Implementation Plan

- [x] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - Schedule Type Clarity and Publishing Queue
  - **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior - it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate the bug exists
  - **Scoped PBT Approach**: Test concrete failing cases: schedule creation without type, missing type badges, missing readyToPublish flag, and non-FIFO publishing queue execution
  - Test that schedule creation succeeds without `scheduleType` field (should fail after fix)
  - Test that schedule list returns no type indicators (should have badges after fix)
  - Test that setting `readyToPublish` flag fails due to missing database field (should succeed after fix)
  - Test that publishing queue schedule fails or selects content randomly instead of FIFO (should use FIFO after fix)
  - Run test on UNFIXED code
  - **EXPECTED OUTCOME**: Test FAILS (this is correct - it proves the bug exists)
  - Document counterexamples found to understand root cause
  - Mark task complete when test is written, run, and failure is documented
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.9, 2.10_

- [x] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Existing Schedule Behavior
  - **IMPORTANT**: Follow observation-first methodology
  - Observe behavior on UNFIXED code for existing "AI Generation + Auto-Publish" schedules
  - Observe that AI generation schedules continue to generate content and publish automatically
  - Observe that schedule enable/disable functionality works correctly
  - Observe that cron expression calculation and timezone handling work correctly
  - Observe that content generation error logging and validation status marking work correctly
  - Observe that OG image generation for content items works correctly
  - Observe that schedule soft-delete behavior (setting enabled to false) works correctly
  - Observe that cron worker CRON_SECRET validation works correctly
  - Observe that content storage without publishing (when auto-publish is disabled) works correctly
  - Write property-based tests capturing observed behavior patterns from Preservation Requirements
  - Property-based testing generates many test cases for stronger guarantees
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (this confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8_

- [x] 3. Fix for Schedule System Clarity and Publishing Queue

  - [x] 3.1 Add database schema changes
    - Add `scheduleType` enum field to `scheduledTasks` table with values "ai_generation" and "publishing_queue"
    - Set default value to "ai_generation" for backward compatibility
    - Create migration to set all existing schedules to "ai_generation"
    - Add `readyToPublish` boolean field to `aiGenerations` table with default value false
    - Add index on `readyToPublish` field for efficient querying
    - Create migration to set all existing records to false
    - Extend payload JSON schema to support `publishingQueueConfig` object with `contentType` filter and `batchSize`
    - _Bug_Condition: isBugCondition(input) where input.action = "create_schedule" AND scheduleTypeNotRequired(input) OR input.action = "view_schedule_list" AND noVisualTypeDistinction(input) OR input.action = "create_manual_content" AND noReadyToPublishFlag(input) OR input.action = "schedule_execution" AND scheduleType = "publishing_queue" AND noFIFOSelection(input)_
    - _Expected_Behavior: Schedules have explicit type selection, visual type indicators, readyToPublish flag for manual content, and FIFO-based publishing queue execution_
    - _Preservation: Existing "AI Generation + Auto-Publish" behavior and all schedule execution logic unchanged_
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

  - [x] 3.2 Implement publishing queue selection and execution logic
    - Add schedule type routing in cron handler to route execution based on `scheduleType`
    - If "ai_generation": Execute existing AI generation + auto-publish flow
    - If "publishing_queue": Execute new publishing queue flow
    - Implement `selectContentForPublishing` function with query: WHERE readyToPublish = true AND sanityWriteStatus != 'success'
    - Apply content type filter from `publishingQueueConfig.contentType` if specified
    - Order by `createdAt ASC` (FIFO)
    - Limit by `publishingQueueConfig.batchSize`
    - Implement `executePublishingQueue` function to publish selected content items
    - For each selected content item, call existing Sanity publishing logic
    - Update `sanityWriteStatus` to 'success' and set `sanityDocumentId` on success
    - Log errors but continue with remaining items on failure
    - _Bug_Condition: isBugCondition(input) where input.action = "schedule_execution" AND scheduleType = "publishing_queue" AND (noFIFOSelection(input) OR noContentTypeFiltering(input))_
    - _Expected_Behavior: Publishing queue schedules select content using FIFO ordering with content type filtering and batch size limiting_
    - _Preservation: Existing AI generation + auto-publish flow unchanged_
    - _Requirements: 2.4, 2.5, 2.6, 2.7, 2.9_

  - [x] 3.3 Add schedule type validation in schedule creation API
    - Validate that `scheduleType` is provided and is one of the allowed values ("ai_generation" or "publishing_queue")
    - Reject requests without valid `scheduleType`
    - Validate payload structure matches schedule type (e.g., publishing queue requires `publishingQueueConfig`)
    - _Bug_Condition: isBugCondition(input) where input.action = "create_schedule" AND scheduleTypeNotRequired(input)_
    - _Expected_Behavior: Schedule creation requires valid scheduleType selection_
    - _Preservation: Existing schedule creation logic unchanged except for new validation_
    - _Requirements: 2.1, 2.6, 2.7_

  - [x] 3.4 Add schedule type badges in schedule list UI
    - Display visual indicators for schedule type in schedule list component
    - Show "AI Generation + Auto-Publish" badge with distinct color/icon
    - Show "Publishing Queue" badge with distinct color/icon
    - Position badges prominently in schedule list items
    - _Bug_Condition: isBugCondition(input) where input.action = "view_schedule_list" AND noVisualTypeDistinction(input)_
    - _Expected_Behavior: Schedule list displays clear type indicators for each schedule_
    - _Preservation: Existing schedule list display unchanged except for new badges_
    - _Requirements: 2.2_

  - [x] 3.5 Add schedule type selection in schedule creation form
    - Add radio button or select input for schedule type in creation form
    - Make schedule type a required field
    - Show/hide relevant configuration fields based on selected type
    - For "publishing_queue": Show content type filter and batch size inputs
    - For "ai_generation": Show existing AI generation configuration fields
    - _Bug_Condition: isBugCondition(input) where input.action = "create_schedule" AND scheduleTypeNotRequired(input)_
    - _Expected_Behavior: Schedule creation form requires type selection and shows relevant configuration_
    - _Preservation: Existing schedule creation form unchanged except for new type selection_
    - _Requirements: 2.1, 2.6, 2.7_

  - [x] 3.6 Add ready to publish toggle in AI generations list
    - Add toggle switch or checkbox for `readyToPublish` flag in AI generations list component
    - Display current status for each content item
    - Allow toggling on/off
    - Only show for content where `sanityWriteStatus != 'success'`
    - _Bug_Condition: isBugCondition(input) where input.action = "create_manual_content" AND noReadyToPublishFlag(input)_
    - _Expected_Behavior: AI generations list displays and allows toggling readyToPublish status_
    - _Preservation: Existing AI generations list display unchanged except for new toggle_
    - _Requirements: 2.3, 2.10_

  - [x] 3.7 Add readyToPublish update endpoint
    - Add PATCH endpoint to update `readyToPublish` flag in generation update API
    - Validate that content exists and is not already published
    - Update `readyToPublish` field in database
    - Return updated generation record
    - _Bug_Condition: isBugCondition(input) where input.action = "create_manual_content" AND noReadyToPublishFlag(input)_
    - _Expected_Behavior: API endpoint allows updating readyToPublish flag for manual content_
    - _Preservation: Existing generation update API unchanged except for new endpoint_
    - _Requirements: 2.3_

  - [x] 3.8 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - Schedule Type Clarity and Publishing Queue
    - **IMPORTANT**: Re-run the SAME test from task 1 - do NOT write a new test
    - The test from task 1 encodes the expected behavior
    - When this test passes, it confirms the expected behavior is satisfied
    - Run bug condition exploration test from step 1
    - **EXPECTED OUTCOME**: Test PASSES (confirms bug is fixed)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.9, 2.10_

  - [x] 3.9 Verify preservation tests still pass
    - **Property 2: Preservation** - Existing Schedule Behavior
    - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
    - Run preservation property tests from step 2
    - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions)
    - Confirm all tests still pass after fix (no regressions)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8_

- [x] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
