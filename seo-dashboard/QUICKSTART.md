# SEO Dashboard Quick Start

Get the ops dashboard running locally in 5 minutes.

## Prerequisites

- Node.js 22+
- pnpm 10.19.0+
- Neon PostgreSQL database (free tier: https://neon.tech)
- Upstash Redis (free tier: https://upstash.com)

## Step 1: Install Dependencies

From repo root:

```bash
pnpm install
```

## Step 2: Setup Database

### Create Neon Database

1. Go to https://neon.tech and create account
2. Create new project
3. Copy connection string (looks like: `postgresql://user:pass@host/db?sslmode=require`)

### Run Migrations

```bash
cd packages/db

# Add your DATABASE_URL temporarily
export DATABASE_URL="postgresql://..."

# Generate and run migrations
pnpm drizzle:generate
pnpm drizzle:migrate
```

## Step 3: Setup Redis

1. Go to https://upstash.com and create account
2. Create new Redis database
3. Copy REST URL and Token from dashboard

## Step 4: Configure Environment

```bash
cd seo-dashboard
cp .env.local .env
```

Edit `.env` and update these required variables:

```bash
# Database (from Step 2)
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require

# Redis (from Step 3)
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXn1...your-token
```

All other variables are pre-configured with real Sanity credentials.

## Step 5: Start Dashboard

```bash
pnpm dev
```

Dashboard will be available at: http://localhost:3001

## Step 6: Login

1. Open http://localhost:3001
2. Enter password: `kotacom`
3. You should see the dashboard home

## What's Working Now

✅ Dashboard UI with navigation
✅ Jobs monitoring (empty until you create jobs)
✅ Templates management
✅ AI generation (using Vercel AI Gateway)
✅ SEO audit tools
✅ Search submission tools
✅ Analytics views

## What Needs Additional Setup

### Optional: Google Search Console (for sitemap/analytics/inspection)

1. Create service account: https://console.cloud.google.com
2. Enable "Google Search Console API"
3. Download JSON key
4. Add to `.env`:
```bash
GSC_CLIENT_EMAIL=your-account@project.iam.gserviceaccount.com
GSC_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GSC_SITE_URL=https://your-site.com
```

### Optional: IndexNow (for fast indexing)

1. Generate key: `openssl rand -hex 32`
2. Create `frontend/public/indexnow-key.txt` with the key
3. Add to `.env`:
```bash
INDEXNOW_KEY=your-generated-key
INDEXNOW_KEY_LOCATION=https://your-site.com/indexnow-key.txt
```

### Optional: AI Fallback Providers

Add Groq and/or Gemini keys for fallback when Gateway fails:

```bash
# Groq (https://console.groq.com)
AI_WRITER_GROQ_KEYS=key1,key2,key3

# Gemini (https://aistudio.google.com/apikey)
AI_WRITER_GEMINI_KEYS=key1,key2,key3
```

## Testing

### Test AI Generation

1. Go to http://localhost:3001/dashboard/ai
2. Click "Generate Content"
3. Enter a prompt
4. Should see result using Gateway provider

### Test Job Creation

1. Go to http://localhost:3001/dashboard/jobs
2. Click "Run Now"
3. Select job type
4. Should see job in list

### Test API Endpoints

```bash
# Test internal webhook (simulates Sanity publish)
curl -X POST http://localhost:3001/api/internal/content-published-webhook \
  -H "Content-Type: application/json" \
  -H "x-internal-secret: dbf637ca11029cbb31110fda38e2154c12bb144a-internal" \
  -d '{
    "_id": "test-123",
    "_type": "page",
    "slug": {"current": "test"},
    "title": "Test Page"
  }'

# Check database
psql $DATABASE_URL -c "SELECT * FROM content_items WHERE sanity_id = 'test-123'"
```

## Troubleshooting

### "DATABASE_URL is not configured"

Make sure you added `DATABASE_URL` to `.env` file.

### "Cannot connect to database"

1. Check connection string format
2. Verify database is running in Neon dashboard
3. Test connection: `psql $DATABASE_URL -c "SELECT 1"`

### "Redis connection failed"

1. Verify `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
2. Test connection:
```bash
curl -H "Authorization: Bearer $UPSTASH_REDIS_REST_TOKEN" \
  "$UPSTASH_REDIS_REST_URL/ping"
```

### "AI generation failed"

1. Check `AI_GATEWAY_API_KEY` is set
2. Verify key is valid in Vercel dashboard
3. Check logs in terminal for error details

## Next Steps

1. ✅ Dashboard running locally
2. ⏳ Deploy to Vercel (see `docs/ops-dashboard-setup.md`)
3. ⏳ Deploy worker to Cloudflare
4. ⏳ Configure Sanity webhook
5. ⏳ Test end-to-end flow

## Need Help?

See full documentation: `docs/ops-dashboard-setup.md`
