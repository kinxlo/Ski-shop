# Vercel Deployment Checklist for NextAuth Authentication

## Environment Variables in Vercel

Make sure you have set the following environment variables in your Vercel project settings:

### Required Variables:

1. **AUTH_SECRET** (or NEXTAUTH_SECRET)

   - Generate a secure random string (at least 32 characters)
   - You can generate one using: `openssl rand -base64 32`
   - **IMPORTANT**: This MUST be the same in both development and production
   - In Vercel: Settings → Environment Variables → Add `AUTH_SECRET`

2. **NEXTAUTH_URL** (for NextAuth v5, this is optional but recommended)

   - Set to your production URL: `https://your-domain.vercel.app`
   - Do NOT include trailing slash
   - In Vercel: Settings → Environment Variables → Add `NEXTAUTH_URL`

3. **NEXT_PUBLIC_BASE_URL**
   - Your backend API URL
   - Make sure this points to your production API

## Vercel Configuration Steps:

1. **Go to your Vercel Dashboard**
2. **Select your project**
3. **Navigate to Settings → Environment Variables**
4. **Add the following variables:**

```
AUTH_SECRET=your-generated-secret-here
NEXTAUTH_URL=https://your-domain.vercel.app
NEXT_PUBLIC_BASE_URL=https://your-api-domain.com
NODE_ENV=production
```

## Testing After Deployment:

1. **Clear your browser cookies** for the production domain
2. **Try logging in** with your credentials
3. **Check the Vercel Function Logs** for any errors:
   - Vercel Dashboard → Functions → View logs
4. **Check browser console** for any client-side errors

## Common Issues and Solutions:

### Issue 1: "No token found in production"

- **Cause**: AUTH_SECRET mismatch or not set
- **Solution**: Ensure AUTH_SECRET is set in Vercel environment variables

### Issue 2: Cookie not being set

- **Cause**: Secure cookie issues or domain mismatch
- **Solution**: The code changes handle this, but ensure your domain uses HTTPS

### Issue 3: Redirect loop

- **Cause**: Token not being read correctly
- **Solution**: Clear cookies and ensure AUTH_SECRET matches

## Debugging Steps:

1. **Enable debug mode temporarily** by uncommenting line 17 in `src/lib/next-auth/auth.ts`:

   ```typescript
   debug: process.env.NODE_ENV === "development",
   ```

   Change to:

   ```typescript
   debug: true,
   ```

2. **Check Vercel Function Logs** for middleware execution

3. **Verify cookie presence** in browser DevTools:
   - Application → Cookies → Look for `__Secure-authjs.session-token`

## After Successful Fix:

1. **Remove debug logs** from middleware (lines 106-110 in middleware.ts)
2. **Set debug back to false** in auth.ts if you enabled it
3. **Test with different user roles** to ensure role-based routing works

## Additional Notes:

- NextAuth v5 (beta) uses different cookie names in production vs development
- The `__Secure-` prefix is added automatically for secure cookies in production
- The middleware now properly handles these different cookie names
- Ensure your backend API supports CORS for your Vercel domain
