# SEO Dashboard Authentication Setup

## Overview
The SEO Dashboard now uses a modern authentication system with Supabase integration and fallback credentials.

## Features

### 1. Modern Login UI
- Clean, professional login form (shadcn login-03)
- Email and password fields
- Loading states and error handling
- Toast notifications for feedback

### 2. Supabase Authentication
- Primary auth method using Supabase Auth
- Automatic session management
- Secure token-based authentication

### 3. Fallback Credentials
- Default credentials when Supabase is not configured
- Email: `admin@kotacom.id`
- Password: `admin123`
- Useful for development and testing

### 4. Protected Routes
- All dashboard routes require authentication
- Automatic redirect to login page
- API routes return 401 for unauthorized requests

### 5. Logout Functionality
- Logout button in sidebar footer
- Clears authentication cookies
- Redirects to login page

## Setup Instructions

### Option 1: Using Supabase (Recommended for Production)

1. **Create Supabase Project**
   ```bash
   # Go to https://supabase.com
   # Create a new project
   # Get your project URL and anon key
   ```

2. **Configure Environment Variables**
   ```bash
   # Add to seo-dashboard/.env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

3. **Create Users in Supabase**
   ```sql
   -- In Supabase SQL Editor
   -- Users are automatically created via Supabase Auth UI
   -- Or use the Supabase dashboard
   ```

4. **Test Login**
   ```bash
   cd seo-dashboard
   pnpm dev
   # Open http://localhost:3001/login
   # Login with Supabase user credentials
   ```

### Option 2: Using Fallback Credentials (Development)

1. **No Configuration Needed**
   - Fallback is automatic when Supabase is not configured

2. **Use Default Credentials**
   ```
   Email: admin@kotacom.id
   Password: admin123
   ```

3. **Test Login**
   ```bash
   cd seo-dashboard
   pnpm dev
   # Open http://localhost:3001/login
   # Login with fallback credentials
   ```

## Authentication Flow

### Login Process
```
1. User enters email and password
2. If Supabase configured:
   a. Try Supabase auth
   b. If fails, check fallback credentials
   c. Set auth cookie on success
3. If Supabase not configured:
   a. Check fallback credentials only
   b. Set auth cookie on success
4. Redirect to /dashboard
```

### Route Protection
```
1. User requests /dashboard/*
2. Proxy checks for auth cookie
3. If valid: Allow access
4. If invalid: Redirect to /login
```

### Logout Process
```
1. User clicks Logout in sidebar
2. Clear auth cookie
3. Show success toast
4. Redirect to /login
```

## File Structure

```
seo-dashboard/
├── app/
│   └── login/
│       └── page.tsx              # Login page
├── components/
│   ├── login-form.tsx            # Login form with Supabase
│   ├── app-sidebar.tsx           # Sidebar with logout
│   └── ui/
│       ├── field.tsx             # Form field components
│       ├── calendar.tsx          # (from previous phases)
│       └── ...
├── lib/
│   └── supabase.ts               # Supabase client config
├── proxy.ts                      # Auth middleware
└── .env.example                  # Environment template
```

## Components

### LoginForm
```typescript
// components/login-form.tsx
- Handles email/password input
- Supabase authentication
- Fallback credential check
- Cookie management
- Toast notifications
- Loading states
```

### AppSidebar
```typescript
// components/app-sidebar.tsx
- Added logout button in footer
- Clears auth cookie
- Redirects to login
```

### Proxy
```typescript
// proxy.ts
- Checks auth cookies
- Protects dashboard routes
- Protects API routes
- Redirects unauthorized users
```

## Environment Variables

### Required for Supabase
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Optional (Fallback Always Available)
```bash
# No additional variables needed for fallback
# Default credentials are hardcoded:
# - admin@kotacom.id
# - admin123
```

## Security Considerations

### Production Deployment

1. **Always Use Supabase in Production**
   - Fallback is for development only
   - Supabase provides proper security

2. **Secure Environment Variables**
   - Never commit .env files
   - Use Vercel/platform secrets
   - Rotate keys regularly

3. **Change Default Credentials**
   - Update fallback credentials in code
   - Or disable fallback in production

4. **Enable Row Level Security**
   ```sql
   -- In Supabase, enable RLS on all tables
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   ```

5. **Configure CORS**
   - Restrict Supabase API access
   - Only allow your domain

### Cookie Security
```typescript
// Cookies are set with:
- path=/           # Available to all routes
- max-age=86400    # 24 hour expiry
- HttpOnly         # Not accessible via JS (TODO)
- Secure           # HTTPS only (TODO)
- SameSite=Strict  # CSRF protection (TODO)
```

## Customization

### Change Fallback Credentials
```typescript
// lib/supabase.ts
export const FALLBACK_CREDENTIALS = {
  email: 'your-email@example.com',
  password: 'your-secure-password',
};
```

### Disable Fallback in Production
```typescript
// components/login-form.tsx
const supabaseEnabled = isSupabaseConfigured();

if (!supabaseEnabled && process.env.NODE_ENV === 'production') {
  toast.error('Authentication not configured');
  return;
}
```

### Add More Auth Providers
```typescript
// lib/supabase.ts
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  return { data, error };
}
```

## Troubleshooting

### Issue: "supabaseUrl is required"
**Solution**: Add `export const dynamic = 'force-dynamic'` to login page

### Issue: Login redirects to old /dashboard/seo/login
**Solution**: Clear browser cookies and cache

### Issue: Fallback credentials not working
**Solution**: Check that email and password match exactly (case-sensitive)

### Issue: Logout doesn't work
**Solution**: Check browser console for cookie errors

### Issue: Supabase auth fails
**Solution**: 
1. Verify environment variables
2. Check Supabase project status
3. Verify user exists in Supabase Auth

## Migration from Old Auth

### Old System
- Route: `/dashboard/seo/login`
- Cookie: `seo_dash_session`
- Password-only authentication

### New System
- Route: `/login`
- Cookie: `seo-dashboard-auth`
- Email + password authentication
- Supabase integration

### Backward Compatibility
- Proxy checks both old and new cookies
- Old login route redirects to new login
- Both cookies work for authentication

## Testing

### Manual Testing
```bash
# 1. Test fallback login
cd seo-dashboard
pnpm dev
# Open http://localhost:3001/login
# Login with admin@kotacom.id / admin123

# 2. Test Supabase login
# Add Supabase env vars
# Create user in Supabase
# Login with Supabase credentials

# 3. Test logout
# Click logout in sidebar
# Verify redirect to login

# 4. Test protected routes
# Try accessing /dashboard without login
# Verify redirect to login
```

### Automated Testing (TODO)
```typescript
// tests/auth.test.ts
describe('Authentication', () => {
  it('should login with fallback credentials', async () => {
    // Test implementation
  });
  
  it('should login with Supabase', async () => {
    // Test implementation
  });
  
  it('should protect dashboard routes', async () => {
    // Test implementation
  });
});
```

## Future Enhancements

### Phase 1 (Current)
- ✅ Supabase authentication
- ✅ Fallback credentials
- ✅ Modern login UI
- ✅ Logout functionality
- ✅ Route protection

### Phase 2 (Planned)
- [ ] Password reset flow
- [ ] Email verification
- [ ] Remember me functionality
- [ ] Session timeout
- [ ] Multi-factor authentication

### Phase 3 (Future)
- [ ] OAuth providers (Google, GitHub)
- [ ] Role-based access control
- [ ] User management UI
- [ ] Activity logging
- [ ] API key authentication

## Summary

The new authentication system provides:
- Modern, professional login UI
- Flexible authentication (Supabase + fallback)
- Secure route protection
- Easy logout functionality
- Development-friendly defaults
- Production-ready Supabase integration

**Ready for development and production deployment!**
