# SEO Dashboard - Quick Start Guide

## 🚀 Start Development Server

```bash
cd seo-dashboard
pnpm dev
```

**Dashboard will be available at:**
- Local: http://localhost:3000
- Network: http://10.0.0.88:3000

## 🔐 Login

### Option 1: Fallback Credentials (Instant)
```
URL: http://localhost:3000/login
Email: admin@kotacom.id
Password: admin123
```

### Option 2: Supabase User
1. Create user in Supabase dashboard
2. Login with your Supabase credentials

## 📋 Available Pages

After login, you can access:

### Overview
- **Dashboard**: http://localhost:3000/dashboard
  - Today's metrics
  - Success rates
  - Quick actions

### Content Operations
- **Jobs**: http://localhost:3000/dashboard/jobs
  - Job queue monitoring
  - Bulk retry failed jobs
  - Export to CSV
  - Sortable columns
  
- **AI Generations**: http://localhost:3000/dashboard/ai
  - AI content preview
  - Retry/Push actions
  - Filters by provider/status
  
- **Templates**: http://localhost:3000/dashboard/templates
  - Template management
  - Bulk generation
  
- **AI Settings**: http://localhost:3000/dashboard/ai-settings
  - Custom prompt editor
  - Variable insertion
  - Temperature/token controls

### SEO & Search
- **SEO Audits**: http://localhost:3000/dashboard/seo
  - SEO health monitoring
  - Export to CSV
  - Score-based filtering
  
- **Search Console**: http://localhost:3000/dashboard/search
  - Manual URL submission
  - IndexNow integration
  - Submission history
  
- **Analytics**: http://localhost:3000/dashboard/analytics
  - Date range picker
  - Performance trends
  - Sortable metrics
  - CSV export

## 🛠️ Common Tasks

### Manual URL Submission
1. Go to Search Console page
2. Paste URLs (one per line)
3. Select provider (IndexNow/Google/Bing)
4. Click "Submit URLs"

### Retry Failed Jobs
1. Go to Jobs page
2. Click "Retry All Failed (N)" button
3. Confirm in dialog
4. Jobs will be retried

### Export Data
1. Go to any page (Jobs/Analytics/SEO)
2. Click "Export CSV" button
3. File downloads automatically

### Preview AI Content
1. Go to AI Generations page
2. Click "Preview" on any generation
3. View formatted or raw JSON
4. Copy content if needed

### Create Custom Prompt
1. Go to AI Settings page
2. Enter prompt name
3. Write template with variables
4. Click variable buttons to insert
5. Adjust temperature/tokens
6. Click "Test Prompt" to preview
7. Click "Save Prompt" to store

### Filter by Date Range
1. Go to Analytics page
2. Click preset button (Today, 7d, 14d, etc.)
3. Or open calendar picker
4. Select custom date range
5. Data updates automatically

### Sort Table Columns
1. Go to any page with tables
2. Click column header to sort
3. Click again to reverse order
4. Visual indicators show sort state

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 pnpm dev
```

### Lock File Error
```bash
# Remove lock file
rm -rf .next/dev/lock

# Restart dev server
pnpm dev
```

### Can't Login
```bash
# Check credentials
Email: admin@kotacom.id (exact)
Password: admin123 (exact)

# Clear browser cookies
# Try incognito window
```

### Database Not Configured
```bash
# Check .env file has DATABASE_URL
# Verify Neon PostgreSQL is running
# Run migrations if needed
cd ../packages/db
pnpm drizzle:migrate
```

### Supabase Not Working
```bash
# Check .env has Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# Use fallback credentials instead
Email: admin@kotacom.id
Password: admin123
```

## 📚 Documentation

- **Auth Setup**: `SUPABASE-SETUP.md`
- **Login Guide**: `LOGIN-CREDENTIALS.md`
- **Full Docs**: `docs/seo-dashboard-auth-setup.md`
- **Improvement Plan**: `docs/seo-dashboard-improvement-plan.md`

## 🎯 Quick Commands

```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Run linter
pnpm lint

# Type check
pnpm type-check

# Clean build
rm -rf .next && pnpm build
```

## 🌐 Network Access

If you need to access from other devices:

```bash
# Dashboard is available on network
http://10.0.0.88:3000

# Make sure firewall allows port 3000
sudo ufw allow 3000
```

## 🔄 Restart Services

```bash
# Stop all dev servers
pkill -f "next dev"

# Start fresh
cd seo-dashboard
pnpm dev
```

## ✅ Health Check

Dashboard is working if you see:
- ✅ Login page loads
- ✅ Can login with credentials
- ✅ Dashboard shows metrics
- ✅ All pages accessible
- ✅ No console errors

## 🚨 Emergency Reset

If everything breaks:

```bash
# 1. Stop all processes
pkill -f "next dev"

# 2. Clean everything
cd seo-dashboard
rm -rf .next node_modules

# 3. Reinstall
pnpm install

# 4. Rebuild
pnpm build

# 5. Start fresh
pnpm dev
```

## 📞 Support

- Check browser console for errors
- Check terminal for server errors
- Review documentation files
- Verify environment variables

## 🎉 You're Ready!

1. ✅ Dev server running
2. ✅ Login page accessible
3. ✅ Credentials working
4. ✅ Dashboard functional

**Start building! 🚀**
