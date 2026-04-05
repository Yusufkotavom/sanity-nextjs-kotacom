# SEO Ops Dashboard

Standalone Next.js application for SEO operations automation, content generation, and monitoring.

## Features

- 🤖 **AI Content Generation** - Multi-provider routing (Gateway → Groq → Gemini)
- 📊 **Job Scheduling** - Cron-based task automation via Cloudflare Workers
- 🔍 **SEO Auditing** - Automated on-page SEO analysis
- 🚀 **Search Submission** - IndexNow + Google Search Console integration
- 📈 **Analytics Tracking** - Daily GSC metrics snapshots
- 📝 **Template Management** - Content template system
- 🔄 **Queue Processing** - Redis-based job queue with retry logic

## Quick Start

See [QUICKSTART.md](./QUICKSTART.md) for 5-minute setup guide.

## Architecture

```
Sanity CMS ──webhook──> Ops Dashboard ←──cron── Cloudflare Worker
                              │
                    ┌─────────┼─────────┐
                    │         │         │
                Neon DB   Redis    Frontend
```

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** shadcn/ui + Tailwind CSS + Geist font
- **Database:** PostgreSQL (Neon) + Drizzle ORM
- **Queue:** Upstash Redis
- **AI:** Vercel AI SDK Gateway + Groq + Gemini
- **Search:** Google Search Console API + IndexNow
- **Scheduler:** Cloudflare Workers (Cron Triggers)

## Project Structure

```
seo-dashboard/
├── app/
│   ├── api/                    # API routes
│   │   ├── jobs/              # Job management
│   │   ├── templates/         # Template operations
│   │   ├── ai/                # AI generation
│   │   ├── seo/               # SEO auditing
│   │   ├── search/            # Search submission
│   │   └── internal/          # Internal webhooks
│   ├── dashboard/             # Dashboard UI
│   │   ├── jobs/
│   │   ├── templates/
│   │   ├── ai/
│   │   ├── seo/
│   │   ├── search/
│   │   └── analytics/
│   └── layout.tsx
├── components/
│   ├── ui/                    # shadcn components
│   ├── app-sidebar.tsx        # Navigation
│   └── ...
├── lib/
│   └── ai-writer/             # AI writer logic
├── scripts/                   # Utility scripts
└── .env.example               # Environment template
```

## Environment Setup

### Required Variables

```bash
# Database
DATABASE_URL=postgresql://...

# Redis Queue
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...

# Sanity
SANITY_DEV=sk...
SANITY_PROJECT_ID=...
SANITY_DATASET=production

# Dashboard Auth
SEO_DASHBOARD_PASSWORD=...
SEO_SESSION_SECRET=...

# AI Provider
AI_GATEWAY_API_KEY=vck_...

# Internal Secrets
CRON_SECRET=...
INTERNAL_API_SECRET=...
```

See [.env.example](./.env.example) for complete list.

## Development

```bash
# Install dependencies
pnpm install

# Setup database
cd ../packages/db
pnpm drizzle:migrate

# Start dev server
cd ../seo-dashboard
pnpm dev
```

Dashboard: http://localhost:3001

## Deployment

### Vercel (Dashboard)

```bash
vercel
```

Add environment variables from `.env.server`.

### Cloudflare (Worker)

```bash
cd ../worker
pnpm deploy
wrangler secret put OPS_API_URL
wrangler secret put CRON_SECRET
```

## API Routes

### Jobs

- `POST /api/jobs/run-now` - Trigger job immediately
- `POST /api/jobs/retry` - Retry failed job
- `GET /api/jobs` - List jobs with filters
- `GET /api/jobs/:id` - Get job details

### Templates

- `POST /api/templates/preview` - Preview template output
- `POST /api/templates/bulk-generate` - Bulk AI generation

### AI

- `POST /api/ai/generate` - Generate AI content
- `POST /api/ai/retry-parse` - Retry parsing output
- `POST /api/ai/push-to-sanity` - Push to Sanity draft

### SEO

- `POST /api/seo/audit` - Run SEO audit
- `GET /api/seo/report` - Get audit report

### Search

- `POST /api/search/indexnow-submit` - Submit to IndexNow
- `POST /api/search/sitemap-submit` - Submit sitemap to GSC
- `POST /api/search/inspect` - Inspect URL in GSC
- `GET /api/search/status` - Get submission status

### Internal

- `POST /api/internal/cron-run` - Worker cron trigger
- `POST /api/internal/content-published-webhook` - Sanity webhook
- `POST /api/internal/revalidate` - Revalidate frontend

## AI Provider Routing

The dashboard uses a 3-tier fallback system:

1. **Gateway** (Primary) - Vercel AI SDK Gateway
   - Routes to: OpenAI → Anthropic → Google
   - Model: gpt-5.4 (default)

2. **Groq** (Fallback #1) - Fast inference
   - Model: llama-4-scout-17b-16e-instruct
   - Supports key rotation

3. **Gemini** (Fallback #2) - Google AI
   - Model: gemini-2.5-flash
   - Supports key rotation

Configure via environment:

```bash
AI_ROUTING_PROVIDER_ORDER=gateway,groq,gemini
AI_ROUTING_DEFAULT_MODEL_GATEWAY=gpt-5.4
AI_ROUTING_DEFAULT_MODEL_GROQ=meta-llama/llama-4-scout-17b-16e-instruct
AI_ROUTING_DEFAULT_MODEL_GEMINI=gemini-2.5-flash
```

## Database Schema

- `content_items` - Sanity content mirror
- `scheduled_tasks` - Cron job definitions
- `job_runs` - Job execution history
- `ai_generations` - AI generation logs
- `seo_audits` - SEO audit results
- `search_submissions` - IndexNow/GSC submissions
- `index_status_checks` - URL inspection results
- `analytics_daily` - Daily analytics snapshots

See [packages/db/src/schema.ts](../packages/db/src/schema.ts) for details.

## Cron Schedule

| Frequency | Type | Description |
|-----------|------|-------------|
| Every 15 min | drain-queues | Process Redis queues |
| Hourly | run-scheduled | Run scheduled tasks |
| Daily 2 AM | submit-sitemap | Submit sitemap to GSC |
| Daily 3 AM | pull-analytics | Pull GSC analytics |
| Daily 4 AM | run-seo-audits | Run SEO audits |
| Daily 10 AM | inspect-index | Check index status |

## Scripts

```bash
# Generate production secrets
node scripts/generate-secrets.mjs

# Export GSC priority data
pnpm gsc:export

# Inspect GSC index status
pnpm gsc:inspect

# Merge GSC migration health
pnpm gsc:merge

# Audit SEO metadata
pnpm seo:audit

# Test indexing
pnpm seo:test:indexing

# Test SEO audit
pnpm seo:test:audit

# Test revalidate
pnpm seo:test:revalidate
```

## Documentation

- [QUICKSTART.md](./QUICKSTART.md) - 5-minute setup guide
- [docs/ops-dashboard-setup.md](../docs/ops-dashboard-setup.md) - Complete setup guide
- [docs/ops-dashboard-files-summary.md](../docs/ops-dashboard-files-summary.md) - Implementation summary

## Monitoring

### Database Queries

```sql
-- Recent jobs
SELECT * FROM job_runs ORDER BY created_at DESC LIMIT 10;

-- AI generation stats
SELECT provider, model, validation_status, COUNT(*) 
FROM ai_generations 
GROUP BY provider, model, validation_status;

-- Search submission stats
SELECT provider, status, COUNT(*) 
FROM search_submissions 
GROUP BY provider, status;
```

### Redis Queue

```bash
# Check queue length
redis-cli --url $UPSTASH_REDIS_REST_URL LLEN q:ai
```

## Troubleshooting

See [docs/ops-dashboard-setup.md](../docs/ops-dashboard-setup.md#troubleshooting) for common issues.

## License

Same as parent repository.
