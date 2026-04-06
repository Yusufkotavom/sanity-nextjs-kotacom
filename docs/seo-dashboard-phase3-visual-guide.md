# SEO Dashboard Phase 3 - Visual Guide

## Overview
Phase 3 adds manual operations and custom features to give users full control over the dashboard.

---

## 1. Manual Index Submission

**Location:** Search page (top section)

**Features:**
- Single URL input field
- Bulk paste textarea (one URL per line)
- Provider dropdown (IndexNow, Google Search Console, Bing)
- Submit button with loading state
- Toast notifications

**Usage:**
```
1. Enter URL or paste multiple URLs
2. Select provider
3. Click "Submit URLs"
4. See success toast
5. Check submissions table below
```

**API:** `POST /api/search/manual-submit`

---

## 2. Delete Job

**Location:** Jobs page → Expand row → Actions column

**Features:**
- Trash icon button
- Confirmation dialog ("Are you sure?")
- Shows job type in confirmation
- Toast notification on success
- Auto-refresh after deletion

**Usage:**
```
1. Expand job row (click chevron)
2. Click trash icon in Actions column
3. Confirm deletion in dialog
4. Job removed from list
```

**API:** `DELETE /api/jobs/[id]`

---

## 3. AI Content Preview

**Location:** AI Generations page → Actions column

**Features:**
- Eye icon "Preview" button
- Modal dialog with two tabs:
  - **Formatted View:**
    - Title (large, bold)
    - Description
    - Word count
    - Content body (scrollable)
    - Metadata grid
  - **Raw JSON View:**
    - Complete JSON with syntax
    - Copy button
    - Scrollable
- Validation status badge
- Close button

**Usage:**
```
1. Click "Preview" button on any AI generation
2. Review formatted content
3. Switch to Raw JSON tab if needed
4. Click Copy to copy JSON
5. Close dialog
```

---

## 4. Custom Prompt Editor

**Location:** AI Settings page (new navigation item)

**Features:**
- Prompt name input
- Template textarea (large)
- Variable insertion buttons:
  - {{title}}
  - {{description}}
  - {{keywords}}
  - {{tone}}
  - {{length}}
- Temperature slider (0-1, step 0.1)
- Max tokens input (number)
- Test button (shows preview)
- Save button (stores template)
- Toast notifications

**Usage:**
```
1. Navigate to AI Settings
2. Enter prompt name
3. Write template with variables
4. Click variable buttons to insert
5. Adjust temperature and tokens
6. Click "Test Prompt" to preview
7. Click "Save Prompt" to store
```

**API:** 
- `POST /api/ai/save-prompt` - Save template
- `POST /api/ai/test-prompt` - Test with variables

---

## 5. AI Settings Page

**Location:** Sidebar → AI Settings (new item)

**Features:**
- Custom Prompt Editor (main component)
- Future: AI provider configuration
- Future: Model selection
- Future: API key management

**Navigation:**
```
Dashboard
├── Overview
├── Content Operations
│   ├── Jobs
│   ├── AI Generations
│   └── Templates
└── SEO & Search
    ├── Search Submissions
    ├── Analytics
    ├── SEO Audits
    └── AI Settings ← NEW
```

---

## Component Architecture

### New Components
```
components/
├── manual-index-form.tsx          # Manual URL submission
├── delete-job-button.tsx          # Delete with confirmation
├── ai-preview-dialog.tsx          # Content preview modal
├── custom-prompt-editor.tsx       # Prompt customization
└── ui/
    ├── dialog.tsx                 # shadcn dialog
    └── tabs.tsx                   # shadcn tabs
```

### Updated Components
```
components/
├── job-details-row.tsx            # Added delete button
├── ai-actions.tsx                 # Added preview dialog
└── app-sidebar.tsx                # Added AI Settings link
```

### New Pages
```
app/dashboard/
└── ai-settings/
    └── page.tsx                   # AI Settings page
```

### New API Routes
```
app/api/
├── search/
│   └── manual-submit/
│       └── route.ts               # POST - Submit URLs
├── jobs/
│   └── [id]/
│       └── route.ts               # DELETE - Delete job
└── ai/
    ├── save-prompt/
    │   └── route.ts               # POST - Save template
    └── test-prompt/
        └── route.ts               # POST - Test template
```

---

## User Workflows

### Workflow 1: Manual URL Submission
```
Problem: Need to submit specific URLs immediately
Solution:
1. Go to Search page
2. Paste URLs in bulk textarea
3. Select provider
4. Click Submit
5. URLs submitted instantly
```

### Workflow 2: Clean Up Failed Jobs
```
Problem: Failed jobs cluttering the queue
Solution:
1. Go to Jobs page
2. Filter by status: Failed
3. Expand job to see details
4. Click delete button
5. Confirm deletion
6. Job removed
```

### Workflow 3: Review AI Content
```
Problem: Need to verify AI-generated content
Solution:
1. Go to AI Generations page
2. Click Preview on any generation
3. Review formatted content
4. Check word count and metadata
5. Switch to Raw JSON if needed
6. Copy JSON if needed
```

### Workflow 4: Create Custom Prompt
```
Problem: Need specialized prompt for blog posts
Solution:
1. Go to AI Settings
2. Name prompt "Blog Post Generator"
3. Write template with {{title}}, {{keywords}}
4. Set temperature to 0.7
5. Set max tokens to 2000
6. Click Test to preview
7. Click Save to store
8. Use in AI generation later
```

---

## Technical Implementation

### Database Schema Usage
```typescript
// Manual submission
searchSubmissions {
  provider: string
  submissionType: "manual"
  requestPayload: { urls: string[] }
  responsePayload: { submitted: number }
  status: "pending" | "success" | "failed"
}

// Job deletion
jobRuns {
  id: string (UUID)
  // DELETE removes entire row
}

// AI preview
aiGenerations {
  generatedContent: JSON
  validationStatus: string
}
```

### Error Handling
```typescript
// All API routes follow pattern:
try {
  // Validate input
  if (!required) {
    return NextResponse.json(
      { ok: false, message: "..." },
      { status: 400 }
    );
  }
  
  // Perform operation
  const result = await operation();
  
  // Return success
  return NextResponse.json(
    { ok: true, data: result },
    { status: 200 }
  );
} catch (error) {
  console.error("Error:", error);
  return NextResponse.json(
    { ok: false, message: error.message },
    { status: 500 }
  );
}
```

### Toast Notifications
```typescript
// Success
toast.success("Operation completed successfully");

// Error
toast.error("Operation failed: " + error.message);

// Loading
const loading = toast.loading("Processing...");
// ... operation ...
toast.dismiss(loading);
toast.success("Done!");
```

---

## Build Verification

```bash
cd seo-dashboard
npm run build
```

**Result:**
```
✓ Compiled successfully in 13.2s
✓ Finished TypeScript in 16.5s
✓ Collecting page data using 1 worker in 1273.3ms
✓ Generating static pages using 1 worker (42/42) in 349.8ms
✓ Collecting build traces in 229.8ms
✓ Finalizing page optimization in 231.2ms
```

**New Routes:**
- `/dashboard/ai-settings` (static)
- `/api/search/manual-submit` (dynamic)
- `/api/jobs/[id]` (dynamic)
- `/api/ai/save-prompt` (dynamic)
- `/api/ai/test-prompt` (dynamic)

---

## Next Steps

### Phase 4: Advanced Features
- Date range selectors for filtering
- Sortable table columns
- Advanced export options (PDF, Excel)
- Comparison views (vs previous period)

### Phase 5: User Experience
- User preferences and saved filters
- Activity log and audit trail
- Scheduled tasks UI
- Mobile responsive design

### Future Enhancements
- Webhook management UI
- Team collaboration features
- Role-based access control
- Email notifications
- Slack/Discord integrations

---

## Summary

Phase 3 successfully adds manual control to all major dashboard features:
- ✅ Manual URL submission (bypass automation)
- ✅ Job deletion (clean up failures)
- ✅ Content preview (verify before publish)
- ✅ Custom prompts (specialized AI generation)
- ✅ All features tested and working
- ✅ Build successful
- ✅ Documentation complete

**Dashboard is now production-ready with full manual operations support.**
