# SEO Dashboard - Quick Start Guide

Get the SEO Dashboard running locally in 5 minutes.

## Prerequisites

- Node.js 22+
- pnpm 10+
- PostgreSQL database (Neon recommended for free tier)

## Step 1: Database Setup

### Option A: Use Neon (Recommended - Free Tier)

1. Sign up at https://neon.tech
2. Create a new project
3. Copy the connection string

### Option B: Local PostgreSQL

```bash
# Install PostgreSQL
brew install postgresql  # macOS
sudo apt install postgresql  # Ubuntu

# Start server
brew services start postgresql  # macOS
sudo systemctl start postgresql  # Ubuntu

# Create database
createdb seo_dashboard
```

## Step 2: Environment Configuration

```bash
# Copy environment template
cd seo-dashboard
cp .env.local .env

# Edit .env and set your DATABASE_URL
# For Neon:
DATABASE_URL='postgresql://user:pass@ep-xxx.region.aws.neon.tech/db?sslmode=require&channel_binding=require'

# For local:
DATABASE_URL='postgresql://localhost:5432/seo_dashboard'
```

## Step 3: Install Dependencies

```bash
# From project root
pnpm install
```

## Step 4: Setup Database

```bash
# Run complete database setup
cd packages/db
export DATABASE_URL="your-connection-string"
pnpm db:setup

# (Optional) Seed with test data
pnpm db:seed
```

## Step 5: Start Dashboard

```bash
cd seo-dashboard
pnpm dev
```

Open http://localhost:3001

**Default Login:**
- Password: `kotacom`

## Verify Setup

1. Login at http://localhost:3001
2. Check Dashboard page shows stats (0 rows if not seeded)
3. Check Jobs, AI, SEO, Search, Analytics pages load without errors

## Troubleshooting

### Database Connection Error

```bash
# Test connection
psql $DATABASE_URL -c "SELECT version();"

# Check tables exist
psql $DATABASE_URL -c "\dt"
```

### Missing Tables

```bash
cd packages/db
export DATABASE_URL="your-connection-string"
pnpm db:reset  # Drops all tables and re-migrates
pnpm db:seed   # Add test data
```

### Port Already in Use

```bash
# Change port in seo-dashboard/.env
NEXT_PUBLIC_APP_URL=http://localhost:3002

# Start with custom port
pnpm dev -- -p 3002
```

## Next Steps

### Configure AI Providers

Add to `seo-dashboard/.env`:

```bash
# AI Gateway (Vercel AI SDK)
AI_GATEWAY_API_KEY=your-key

# Groq (optional fallback)
AI_WRITER_GROQ_KEYS=key1,key2,key3

# Gemini (optional fallback)
AI_WRITER_GEMINI_KEYS=key1,key2,key3
```

### Configure Google Search Console

1. Create service account at https://console.cloud.google.com
2. Download JSON key
3. Add to `.env`:

```bash
GSC_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GSC_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GSC_SITE_URL=https://your-site.com
```

### Configure IndexNow

```bash
# Generate key at https://www.bing.com/indexnow
INDEXNOW_KEY=your-key
INDEXNOW_KEY_LOCATION=https://your-site.com/your-key.txt
```

### Configure Redis Queue

Sign up at https://upstash.com (free tier):

```bash
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token
```

## Production Deployment

### Deploy to Vercel

```bash
cd seo-dashboard
vercel

# Add environment variables in Vercel dashboard:
# - DATABASE_URL
# - UPSTASH_REDIS_REST_URL
# - UPSTASH_REDIS_REST_TOKEN
# - All AI provider keys
# - GSC credentials
# - IndexNow key
```

### Deploy Worker to Cloudflare

```bash
cd worker
pnpm deploy

# Set secrets
wrangler secret put CRON_SECRET
wrangler secret put OPS_API_URL
```

## Available Scripts

```bash
# Development
pnpm dev              # Start dev server (port 3001)
pnpm build            # Build for production
pnpm start            # Start production server

# Database
pnpm --filter @repo/db db:setup    # Complete DB setup
pnpm --filter @repo/db db:seed     # Seed test data
pnpm --filter @repo/db db:reset    # Reset database
pnpm --filter @repo/db drizzle:studio  # Open DB GUI

# Type checking
pnpm typecheck        # Check TypeScript types
```

## Dashboard Features

### Jobs Page
- View all queued and completed jobs
- Retry failed jobs
- Monitor job execution status

### AI Page
- View AI generation history
- Retry failed generations
- Push generated content to Sanity

### SEO Page
- View SEO audit results
- Check audit scores and issues
- Monitor content quality

### Search Page
- Submit URLs to IndexNow
- Submit sitemaps to Google
- Check URL inspection status

### Analytics Page
- View daily analytics snapshots
- Track impressions, clicks, CTR
- Monitor search performance

## Support

For detailed documentation, see:
- Database: `packages/db/README.md`
- Worker: `worker/README.md`
- Setup Guide: `docs/ops-dashboard-setup.md`

For issues:
1. Check logs in terminal
2. Verify DATABASE_URL is set
3. Run `pnpm db:setup` to verify tables
4. Check Vercel logs for production issues
