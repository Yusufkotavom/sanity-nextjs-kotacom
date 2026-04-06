# @repo/db

Shared database package for the SEO Dashboard and Worker.

## Features

- PostgreSQL database with Drizzle ORM
- Type-safe schema definitions
- Migration management
- Automated setup and seed scripts

## Database Schema

### Tables

1. **content_items** - Tracks all content from Sanity CMS
   - id, url, content_type, sanity_id, sanity_type, title, published_at, etc.

2. **job_runs** - Queue and execution tracking
   - id, job_type, status, attempt, payload, scheduled_for, etc.

3. **scheduled_tasks** - Cron job definitions
   - id, task_type, schedule_cron, enabled, last_run_at, etc.

4. **ai_generations** - AI content generation history
   - id, content_item_id, provider, model, prompt, output, etc.

5. **seo_audits** - SEO audit results
   - id, content_item_id, status, score, issues, checked_at

6. **search_submissions** - IndexNow and sitemap submissions
   - id, content_item_id, submission_type, status, submitted_at, etc.

7. **index_status_checks** - Google Search Console index status
   - id, content_item_id, coverage_state, crawled_as, etc.

8. **analytics_daily** - Daily analytics snapshots
   - id, content_item_id, date, impressions, clicks, ctr, position

## Setup

### Prerequisites

- PostgreSQL database (Neon, Supabase, or local)
- DATABASE_URL environment variable

### Environment Variables

```bash
# Required
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"

# Optional (for Redis queue)
UPSTASH_REDIS_REST_URL="https://your-redis.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-token"
```

### Initial Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Set DATABASE_URL
export DATABASE_URL="postgresql://..."

# 3. Run complete setup (validates, generates, migrates, verifies)
pnpm db:setup

# 4. (Optional) Seed with test data
pnpm db:seed
```

## Scripts

### Database Management

```bash
# Complete setup (recommended for first time)
pnpm db:setup

# Setup with force regenerate migrations
pnpm db:setup --force

# Seed database with test data
pnpm db:seed

# Clear and seed
pnpm db:seed --clear

# Reset database (drop all tables and re-migrate)
pnpm db:reset

# Reset and seed in one command
pnpm db:reset:seed
```

### Drizzle Commands

```bash
# Generate migrations from schema changes
pnpm drizzle:generate

# Run migrations
pnpm drizzle:migrate

# Open Drizzle Studio (database GUI)
pnpm drizzle:studio

# Type check
pnpm typecheck
```

## Development Workflow

### Making Schema Changes

1. Edit `src/schema.ts`
2. Generate migration: `pnpm drizzle:generate`
3. Review generated SQL in `migrations/`
4. Run migration: `pnpm drizzle:migrate`
5. Verify: `pnpm db:setup` (will verify tables)

### Testing Locally

```bash
# Use local PostgreSQL
export DATABASE_URL="postgresql://localhost:5432/mydb"

# Or use Neon/Supabase dev database
export DATABASE_URL="postgresql://..."

# Setup and seed
pnpm db:setup
pnpm db:seed
```

## Production Deployment

### Vercel (SEO Dashboard)

Add environment variables in Vercel dashboard:

```
DATABASE_URL=postgresql://...
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

Migrations run automatically during build via GitHub Actions.

### Cloudflare Workers (Worker)

```bash
# Set secrets
wrangler secret put DATABASE_URL
wrangler secret put UPSTASH_REDIS_REST_URL
wrangler secret put UPSTASH_REDIS_REST_TOKEN

# Deploy
pnpm deploy
```

## Troubleshooting

### Connection Issues

```bash
# Test connection
psql $DATABASE_URL -c "SELECT version();"

# Check SSL mode
# Neon requires: sslmode=require
# Local dev: sslmode=disable
```

### Migration Issues

```bash
# Reset and start fresh (WARNING: deletes all data)
pnpm db:reset

# Force regenerate migrations
pnpm db:setup --force
```

### Table Verification

```bash
# List all tables
psql $DATABASE_URL -c "\dt"

# Check specific table
psql $DATABASE_URL -c "SELECT * FROM content_items LIMIT 5;"
```

## CI/CD Integration

GitHub Actions automatically:
1. Validates DATABASE_URL is set
2. Runs migrations during build
3. Verifies tables exist

See `.github/workflows/ci.yml` for configuration.

## Database Providers

### Neon (Recommended)

- Free tier: 0.5 GB storage
- Serverless PostgreSQL
- Auto-scaling
- Built-in connection pooling

```bash
# Connection string format
DATABASE_URL="postgresql://user:pass@ep-xxx.region.aws.neon.tech/db?sslmode=require&channel_binding=require"
```

### Supabase

- Free tier: 500 MB storage
- PostgreSQL + extras (auth, storage, realtime)

```bash
DATABASE_URL="postgresql://postgres:pass@db.xxx.supabase.co:5432/postgres"
```

### Local PostgreSQL

```bash
# Install PostgreSQL
brew install postgresql  # macOS
sudo apt install postgresql  # Ubuntu

# Start server
brew services start postgresql  # macOS
sudo systemctl start postgresql  # Ubuntu

# Create database
createdb mydb

# Connection string
DATABASE_URL="postgresql://localhost:5432/mydb"
```

## Schema Design Principles

1. **Normalized** - Avoid data duplication
2. **Indexed** - Key columns have indexes for performance
3. **Foreign Keys** - Maintain referential integrity
4. **Timestamps** - Track created_at, updated_at
5. **JSONB** - Flexible data in payload/issues columns
6. **Type-safe** - Drizzle generates TypeScript types

## Performance Tips

1. Use connection pooling (Neon Pooler, PgBouncer)
2. Add indexes for frequently queried columns
3. Use JSONB for flexible data, not TEXT
4. Limit query results with `.limit()`
5. Use `.select()` to fetch only needed columns

## Security

1. Never commit DATABASE_URL to git
2. Use environment variables
3. Enable SSL in production (`sslmode=require`)
4. Use read-only tokens where possible
5. Rotate credentials regularly

## Support

For issues or questions:
- Check logs: `pnpm db:setup` shows detailed output
- Verify schema: `pnpm drizzle:studio`
- Reset if needed: `pnpm db:reset`
