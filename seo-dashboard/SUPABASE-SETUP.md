# Supabase Setup Guide

## Quick Start (5 minutes)

### Option 1: Use Fallback (No Setup Required)
The dashboard works out of the box with fallback credentials:
- Email: `admin@kotacom.id`
- Password: `admin123`

Just run `pnpm dev` and login!

### Option 2: Setup Supabase (Recommended for Production)

#### Step 1: Create Supabase Project
1. Go to https://supabase.com
2. Click "New Project"
3. Fill in:
   - Name: `kotacom-seo-dashboard`
   - Database Password: (generate strong password)
   - Region: `Southeast Asia (Singapore)`
4. Click "Create new project"
5. Wait 2-3 minutes for setup

#### Step 2: Get API Credentials
1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

#### Step 3: Add to Environment
```bash
# Edit seo-dashboard/.env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Step 4: Create User
1. In Supabase dashboard, go to **Authentication** → **Users**
2. Click "Add user" → "Create new user"
3. Fill in:
   - Email: `admin@kotacom.id`
   - Password: `admin123` (or your secure password)
   - Auto Confirm User: ✅ (check this)
4. Click "Create user"

#### Step 5: Test Login
```bash
cd seo-dashboard
pnpm dev
# Open http://localhost:3001/login
# Login with your Supabase user
```

## Advanced Setup

### Enable Email Confirmation (Optional)
1. Go to **Authentication** → **Email Templates**
2. Customize confirmation email
3. Uncheck "Auto Confirm User" when creating users

### Add More Users
```bash
# Via Supabase Dashboard
Authentication → Users → Add user

# Or via SQL
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at)
VALUES (
  'user@example.com',
  crypt('password123', gen_salt('bf')),
  NOW()
);
```

### Setup Row Level Security (Production)
```sql
-- Enable RLS on your tables
ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users
CREATE POLICY "Allow authenticated users"
ON your_table
FOR ALL
TO authenticated
USING (true);
```

### Configure Email Provider (Production)
1. Go to **Authentication** → **Email**
2. Choose provider:
   - **SendGrid** (recommended)
   - **AWS SES**
   - **Resend**
3. Add API credentials
4. Test email sending

## Environment Variables Reference

### Development (.env)
```bash
# Optional - fallback works without these
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Production (Vercel)
```bash
# Add these in Vercel dashboard → Settings → Environment Variables
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Troubleshooting

### "Invalid login credentials"
- Check email and password are correct
- Verify user exists in Supabase Auth
- Check "Auto Confirm User" was enabled

### "supabaseUrl is required"
- Verify environment variables are set
- Restart dev server after adding env vars
- Check .env file is in seo-dashboard directory

### Fallback not working
- Email must be exactly: `admin@kotacom.id`
- Password must be exactly: `admin123`
- Both are case-sensitive

### Can't access dashboard
- Clear browser cookies
- Try incognito/private window
- Check browser console for errors

## Security Best Practices

### Development
- ✅ Use fallback credentials
- ✅ Test with Supabase free tier
- ✅ Keep credentials in .env (gitignored)

### Production
- ✅ Use Supabase Auth (not fallback)
- ✅ Enable Row Level Security
- ✅ Use strong passwords
- ✅ Enable email confirmation
- ✅ Setup email provider
- ✅ Monitor auth logs
- ✅ Rotate API keys regularly

## Cost Estimate

### Supabase Free Tier
- 500MB database
- 1GB file storage
- 2GB bandwidth
- 50,000 monthly active users
- **Cost: $0/month**

### Supabase Pro (if needed)
- 8GB database
- 100GB file storage
- 250GB bandwidth
- 100,000 monthly active users
- **Cost: $25/month**

## Next Steps

1. ✅ Setup Supabase project (5 min)
2. ✅ Add environment variables
3. ✅ Create first user
4. ✅ Test login
5. ⏳ Deploy to production
6. ⏳ Add more users
7. ⏳ Enable email confirmation
8. ⏳ Setup RLS policies

## Support

- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- Dashboard Docs: `docs/seo-dashboard-auth-setup.md`

## Summary

**Current Status:**
- ✅ Fallback auth working (admin@kotacom.id/admin123)
- ⏳ Supabase optional (add when ready)

**To Enable Supabase:**
1. Create project at supabase.com
2. Copy URL and anon key
3. Add to .env
4. Create user
5. Test login

**That's it! 🚀**
