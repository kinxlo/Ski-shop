# Google OAuth Setup Guide

## Environment Variables

Make sure you have the following environment variables set in your `.env.local` file:

```env
# Backend API Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3001

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
AUTH_SECRET=your_auth_secret_here

# Google API Configuration (if needed)
NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key_here
```

## Troubleshooting

### Common Issues

1. **"Backend service unavailable" error**

   - Make sure your backend server is running on the correct port (default: 3001)
   - Verify `NEXT_PUBLIC_BASE_URL` is set correctly
   - Check that the backend has the Google OAuth endpoint: `/auth/oauth/google/callback`

2. **"Google authentication failed" error**

   - Check the browser console for detailed error messages
   - Verify the Google OAuth configuration on your backend
   - Ensure the redirect URI is properly configured in Google Console

3. **MSW (Mock Service Worker) interference**
   - MSW is currently enabled and might intercept API calls
   - Consider disabling MSW for auth-related requests or configure it properly

### Debug Steps

1. Check the browser console for detailed error logs
2. Verify environment variables are loaded correctly
3. Test the backend endpoint directly: `http://localhost:3001/auth/oauth/google/callback?code=test`
4. Check network tab for failed requests

### Backend Requirements

Your backend should have the following endpoint:

- `GET /auth/oauth/google/callback?code={code}`
- Should return a response with `success: true` and user data
