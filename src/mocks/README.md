# Mock Service Worker Configuration

This directory contains the Mock Service Worker (MSW) setup for the Ski Shop application.

## Configuration

The mock behavior is controlled by environment variables and the `mock.config.ts` file.

### Environment Variables

Add these to your `.env.local` file:

```bash
# Enable/disable all mocks
NEXT_PUBLIC_ENABLE_MOCK=true

# Fallback to mock when backend fails (only works when enableMock is false)
NEXT_PUBLIC_FALLBACK_TO_MOCK=false

# Enable specific endpoint mocks
NEXT_PUBLIC_MOCK_PRODUCTS=true
NEXT_PUBLIC_MOCK_USERS=true
NEXT_PUBLIC_MOCK_CARTS=true
NEXT_PUBLIC_MOCK_DASHBOARD=true

# Enable detailed logging
NEXT_PUBLIC_LOG_MOCK_REQUESTS=true
```

### Usage Examples

#### 1. Using the Mock Provider

The `MockServiceWorkerProvider` is already configured in the root layout. You can override the configuration:

```tsx
import { MockServiceWorkerProvider } from "@/mocks/mock-provider";

// Use default configuration from mock.config.ts
<MockServiceWorkerProvider>
  {children}
</MockServiceWorkerProvider>

// Override configuration
<MockServiceWorkerProvider isEnabled={true}>
  {children}
</MockServiceWorkerProvider>
```

#### 2. Checking Mock Status

Use the `useMockStatus` hook to check mock status in your components:

```tsx
import { isEndpointMocked, useMockStatus } from "@/mocks/use-mock-status";

function MyComponent() {
  const { enabled, config } = useMockStatus();

  // Check if specific endpoint is mocked
  const isProductsMocked = isEndpointMocked("products");

  return (
    <div>
      <p>Mock enabled: {enabled ? "Yes" : "No"}</p>
      <p>Products mocked: {isProductsMocked ? "Yes" : "No"}</p>
    </div>
  );
}
```

#### 3. Conditional Mocking

You can conditionally enable mocks based on your needs:

```tsx
// In your component
const shouldUseMocks = process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_ENABLE_MOCK === "true";

<MockServiceWorkerProvider isEnabled={shouldUseMocks}>{children}</MockServiceWorkerProvider>;
```

## File Structure

```
src/mocks/
├── mock.config.ts          # Configuration file
├── mock-provider.tsx       # React provider component
├── use-mock-status.ts      # Hook for checking mock status
├── browser.ts              # Browser-side MSW setup
├── server.ts               # Server-side MSW setup
├── handlers/               # Mock request handlers
│   ├── products.ts
│   ├── cart.ts
│   └── dashboard/
│       └── analytics.ts
└── README.md              # This file
```

## Adding New Mock Handlers

1. Create a new handler file in the `handlers/` directory
2. Export your handlers
3. Import and add them to the handlers array in `browser.ts` and `server.ts`
4. Add the corresponding environment variable to `mock.config.ts`

Example:

```tsx
// handlers/auth.ts
import { http, HttpResponse } from "msw";

export const authHandlers = [
  http.post("/api/auth/login", () => {
    return HttpResponse.json({
      user: { id: 1, name: "Test User" },
      token: "mock-token",
    });
  }),
];
```

Then add to `browser.ts` and `server.ts`:

```tsx
import { authHandlers } from "./handlers/auth";

const handlers = [...productHandlers, ...dashboardHandler, ...authHandlers];
```

## Troubleshooting

1. **Mocks not working**: Check that `NEXT_PUBLIC_ENABLE_MOCK=true` is set
2. **Service worker not found**: Ensure `mockServiceWorker.js` is in the `public/` directory
3. **Console errors**: Check the browser console for MSW-related errors
4. **Specific endpoint not mocked**: Verify the corresponding environment variable is set to `true`

## Development Tips

- Use `NEXT_PUBLIC_LOG_MOCK_REQUESTS=true` to see detailed request/response logs
- The mock status is logged to the console in development mode
- You can toggle mocks on/off without restarting the development server
