# SEO Dashboard Login Credentials

## Quick Access

### Login URL
- **Development**: http://localhost:3001/login
- **Production**: https://your-ops-dashboard.vercel.app/login

### Default Credentials (Fallback)
```
Email: admin@kotacom.id
Password: admin123
```

### Supabase Auth (Primary)
```
Status: ✅ Configured
Project: pfrpatonrtizyszbzwbl
URL: https://pfrpatonrtizyszbzwbl.supabase.co
```

## How to Login

### Method 1: Supabase User (Recommended)
1. Go to login page
2. Enter your Supabase user email
3. Enter your Supabase user password
4. Click "Login"

### Method 2: Fallback Credentials (Development)
1. Go to login page
2. Enter: `admin@kotacom.id`
3. Enter: `admin123`
4. Click "Login"

## Create New Users

### Via Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Select project: `pfrpatonrtizyszbzwbl`
3. Navigate to **Authentication** → **Users**
4. Click "Add user" → "Create new user"
5. Fill in:
   - Email: user@example.com
   - Password: (secure password)
   - Auto Confirm User: ✅ (check this)
6. Click "Create user"

### Via SQL (Advanced)
```sql
-- In Supabase SQL Editor
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'user@example.com',
  crypt('password123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW()
);
```

## Logout

1. Click "Logout" button in sidebar (bottom)
2. You'll be redirected to login page
3. Session cookie will be cleared

## Troubleshooting

### Can't Login with Supabase
**Check:**
- User exists in Supabase Auth
- Email is confirmed (Auto Confirm enabled)
- Password is correct
- Supabase project is active

**Solution:**
- Use fallback credentials temporarily
- Check Supabase dashboard for user status
- Verify environment variables are set

### Can't Login with Fallback
**Check:**
- Email is exactly: `admin@kotacom.id`
- Password is exactly: `admin123`
- Both are case-sensitive

**Solution:**
- Copy-paste credentials from this file
- Clear browser cache and cookies
- Try incognito/private window

### Redirected to Login After Login
**Check:**
- Browser cookies enabled
- No cookie blockers active
- Correct domain/port

**Solution:**
- Enable cookies in browser
- Disable cookie blockers
- Clear all cookies and try again

### "Unauthorized" Error
**Check:**
- Auth cookie exists
- Cookie not expired (24 hours)
- Correct session

**Solution:**
- Login again
- Check browser console for errors
- Verify proxy.ts is working

## Security Notes

### Development
- ✅ Fallback credentials are safe for local dev
- ✅ Supabase free tier is sufficient
- ✅ .env file is gitignored

### Production
- ⚠️ Disable fallback in production
- ⚠️ Use only Supabase Auth
- ⚠️ Enable Row Level Security
- ⚠️ Use strong passwords
- ⚠️ Enable email confirmation
- ⚠️ Monitor auth logs

## Environment Variables

### Current Configuration
```bash
# Supabase (Primary Auth)
NEXT_PUBLIC_SUPABASE_URL=https://pfrpatonrtizyszbzwbl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Fallback (Development)
# Hardcoded in code: admin@kotacom.id / admin123
```

### To Update
1. Edit `seo-dashboard/.env`
2. Restart dev server
3. Test login

## Quick Commands

### Start Dev Server
```bash
cd seo-dashboard
pnpm dev
# Open http://localhost:3001/login
```

### Build for Production
```bash
cd seo-dashboard
pnpm build
```

### Deploy to Vercel
```bash
cd seo-dashboard
vercel
# Add environment variables in Vercel dashboard
```

## Support

- **Supabase Dashboard**: https://supabase.com/dashboard/project/pfrpatonrtizyszbzwbl
- **Auth Setup Guide**: `SUPABASE-SETUP.md`
- **Full Documentation**: `docs/seo-dashboard-auth-setup.md`

## Summary

**Current Status:**
- ✅ Supabase configured and working
- ✅ Fallback credentials available
- ✅ Login page at /login
- ✅ Logout in sidebar
- ✅ Protected routes working

**Quick Login:**
1. Go to http://localhost:3001/login
2. Use admin@kotacom.id / admin123
3. Or create Supabase user and use that

**That's it! 🚀**
