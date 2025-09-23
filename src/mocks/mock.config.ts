// Mock Service Worker Configuration
// This file controls the behavior of MSW (Mock Service Worker) in your application

export const mockConfig = {
  // Enable mock for all requests
  enableMock: process.env.NEXT_PUBLIC_ENABLE_MOCK === "true",

  // Fallback to mock when backend fails (only works when enableMock is false)
  fallbackToMock: process.env.NEXT_PUBLIC_FALLBACK_TO_MOCK === "true",

  // Mock specific endpoints (useful for partial mocking)
  mockEndpoints: {
    products: process.env.NEXT_PUBLIC_MOCK_PRODUCTS === "true",
    users: process.env.NEXT_PUBLIC_MOCK_USERS === "true",
    carts: process.env.NEXT_PUBLIC_MOCK_CARTS === "true",
    dashboard: process.env.NEXT_PUBLIC_MOCK_DASHBOARD === "true",
  },

  // MSW configuration options
  mswOptions: {
    // How to handle unhandled requests
    onUnhandledRequest: "bypass" as "bypass" | "warn" | "error",

    // Suppress MSW logs in console
    quiet: false,

    // Service worker script path (relative to public directory)
    serviceWorker: {
      url: "/mockServiceWorker.js",
    },
  },

  // Development-specific settings
  development: {
    // Show mock status in console
    logStatus: process.env.NODE_ENV === "development",

    // Show detailed request/response logs
    logRequests: process.env.NEXT_PUBLIC_LOG_MOCK_REQUESTS === "true",
  },
};

// Environment variables reference:
// NEXT_PUBLIC_ENABLE_MOCK=true|false
// NEXT_PUBLIC_FALLBACK_TO_MOCK=true|false
// NEXT_PUBLIC_MOCK_PRODUCTS=true|false
// NEXT_PUBLIC_MOCK_USERS=true|false
// NEXT_PUBLIC_MOCK_CARTS=true|false
// NEXT_PUBLIC_MOCK_DASHBOARD=true|false
// NEXT_PUBLIC_LOG_MOCK_REQUESTS=true|false
