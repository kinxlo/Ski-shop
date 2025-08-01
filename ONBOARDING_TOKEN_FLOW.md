# Token-Based Onboarding Flow Implementation

This document explains how the token-based onboarding flow works in the Ski-Shop application.

## Overview

The onboarding process uses short-lived tokens that are passed through URL parameters and returned by each API endpoint. These tokens are used to authenticate users during the onboarding process without requiring full authentication.

## Architecture

### 1. Token Management

**Context Provider**: `src/context/onboarding-token-provider.tsx`

- Manages the onboarding token state
- Persists token in sessionStorage
- Provides token to all onboarding components

**Hook**: `src/hooks/use-onboarding-token-from-url.ts`

- Extracts token from URL parameters
- Automatically sets token in context when found in URL

### 2. HTTP Layer

**Onboarding HTTP Adapter**: `src/lib/http/onboarding-http-adapter.ts`

- Extends the base HTTP adapter
- Automatically includes onboarding token in headers
- Supports token updates from API responses

### 3. Service Layer

**Onboarding User Service**: `src/services/user/onboarding-user.service.ts`

- Uses the onboarding HTTP adapter
- Handles ShortTokenResponse from all endpoints
- Updates token automatically when new tokens are received

**Hook**: `src/hooks/use-onboarding-user-service.ts`

- Provides access to the onboarding service
- Requires token to be present in context

## Flow Sequence

### 1. Email Verification

```
User clicks email link → /onboarding/verify-email?token=abc123&email=user@example.com
```

### 2. Token Extraction

```typescript
// In onboarding layout
const token = useSearchParameters("token");
<OnboardingTokenProvider initialToken={token}>
  {children}
</OnboardingTokenProvider>
```

### 3. Email Verification Process

```typescript
// In verify-email component
const { setToken } = useOnboardingToken();

const onSubmit = async (data) => {
  const response = await verifyOTP({ code: data.code });
  if (response?.success && response.data?.token) {
    setToken(response.data.token); // Store new token
    // Continue to next step
  }
};
```

### 4. Onboarding Forms

```typescript
// In any onboarding form
const onboardingService = useOnboardingUserService();

const handleSubmit = async (formData) => {
  const response = await onboardingService.updateBusinessInfo(formData);
  if (response?.success) {
    // Token is automatically updated in service
    // Continue to next step
  }
};
```

## API Endpoints

All onboarding endpoints return `ShortTokenResponse`:

```typescript
interface ShortTokenResponse {
  success: boolean;
  data: {
    token: string;
  };
}
```

### Endpoints:

- `POST /auth/verifyemail` - Email verification
- `POST /auth/business` - Business info update
- `POST /auth/bank` - Bank details setup
- `POST /auth/store` - Store creation

## Usage Examples

### 1. Setting up the Layout

```typescript
// src/app/[locale]/onboarding/layout.tsx
export default function OnboardingLayout({ children }) {
  const token = useSearchParameters("token");

  return (
    <OnboardingTokenProvider initialToken={token}>
      {children}
    </OnboardingTokenProvider>
  );
}
```

### 2. Using in Components

```typescript
// In any onboarding component
import { useOnboardingUserService } from "@/hooks/use-onboarding-user-service";

export const MyOnboardingForm = () => {
  const onboardingService = useOnboardingUserService();

  const handleSubmit = async (data) => {
    try {
      const response = await onboardingService.updateBusinessInfo(data);
      if (response?.success) {
        // Success - token automatically updated
        router.push("/next-step");
      }
    } catch (error) {
      // Handle error
    }
  };
};
```

### 3. Token Validation

```typescript
// Check if token exists before rendering forms
const { token } = useOnboardingToken();

if (!token) {
  return <div>Invalid or missing token</div>;
}
```

## Security Considerations

1. **Token Expiration**: Tokens are short-lived and should expire quickly
2. **HTTPS Only**: All token transmission should be over HTTPS
3. **Session Storage**: Tokens are stored in sessionStorage (cleared on tab close)
4. **No Persistence**: Tokens are not stored in localStorage for security

## Error Handling

```typescript
// Handle token expiration
const handleTokenError = () => {
  const { clearToken } = useOnboardingToken();
  clearToken();
  router.push("/onboarding/verify-email");
};

// In service calls
try {
  const response = await onboardingService.updateBusinessInfo(data);
  // Handle success
} catch (error) {
  if (error.message.includes("token")) {
    handleTokenError();
  }
}
```

## Testing

### URL Examples:

```
/onboarding/verify-email?token=abc123&email=user@example.com
/onboarding/vendor?token=def456
/onboarding/dispatch?token=ghi789
```

### Token Flow:

1. User receives email with token
2. Clicks link → token extracted from URL
3. Token stored in context
4. All API calls include token in headers
5. New tokens from responses update the context
6. Process continues until onboarding complete
