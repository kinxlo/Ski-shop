import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

import { auth } from "../src/lib/next-auth/auth";
import { adminRoutes, authRoutes, publicRoutes, superAdminRoutes, vendorRoutes } from "../src/lib/routes/routes";
import { defaultLocale, locales } from "./lib/i18n/config";

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export default auth(async (request) => {
  const { nextUrl } = request;
  const { pathname } = nextUrl;
  const isLoggedIn = !!request.auth;
  const userRole = request.auth?.user?.role?.name || "";

  // Handle locale routing first
  const intlResponse = intlMiddleware(request);
  if (intlResponse) return intlResponse;

  // Skip middleware for all OAuth callback related routes
  if (
    pathname.startsWith("/auth/callback") ||
    pathname.startsWith("/auth/fetching-data") ||
    pathname.startsWith("/auth/oauth") ||
    pathname.includes("oauth")
  ) {
    return NextResponse.next();
  }

  // Skip middleware for mock service worker and related files
  if (
    pathname.startsWith("/mockServiceWorker.js") ||
    pathname.includes("mockServiceWorker") ||
    pathname.startsWith("/_next/static") ||
    pathname.startsWith("/api/") // Allow all API routes to pass through for mocking
  ) {
    return NextResponse.next();
  }

  // Allow public routes and any route under /explore
  // The following block checks if the current request's pathname matches any of the public routes.
  // It does this by iterating over each route in the publicRoutes array and removing any "*" wildcard from the route string using route.replace("*", "").
  // Then, it checks if the pathname starts with the resulting route string.
  // This is a simple way to support wildcard routes (like "/fetching-data/*") by matching any path that starts with the base route.
  // However, not all routes in publicRoutes use the "*" wildcard, and some (like "/shop/product/:id") use parameterized segments (":id"), which this logic does not handle.
  // So, while route.replace("*", "") works for wildcard routes, it does not properly match parameterized routes (e.g., "/shop/product/:id" or with regex).
  // As a result, only exact prefix matches will work, and parameterized or regex routes may not be matched as intended.
  if (publicRoutes.some((route) => pathname.startsWith(route.replace("*", "")))) {
    return NextResponse.next();
  }

  // Skip Paystack return URLs (downloads after payment)
  if (/^\/dashboard\/[^/]+\/downloads$/.test(pathname)) {
    return NextResponse.next();
  }

  // Handle auth routes (login, register, etc.)
  if (authRoutes.some((route) => pathname.startsWith(route.replace("*", "")))) {
    if (isLoggedIn) {
      // If user is already logged in, redirect based on their role
      const targetPath = getTargetPathForRole(userRole);
      return NextResponse.redirect(new URL(targetPath, nextUrl.origin));
    }
    return NextResponse.next();
  }

  // Check if user is authenticated
  if (!isLoggedIn) {
    // Only redirect to login if not already on an auth page
    if (!authRoutes.some((route) => pathname.startsWith(route.replace("*", "")))) {
      const loginUrl = new URL("/login", nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Handle routes based on user role
  const hasAccess = checkRouteAccess(pathname, userRole);

  if (hasAccess) {
    return NextResponse.next();
  }

  // If user doesn't have access, redirect to their appropriate homepage
  const targetPath = getTargetPathForRole(userRole);
  return NextResponse.redirect(new URL(targetPath, nextUrl.origin));
});

// Helper function to check if user has access to a route
function checkRouteAccess(pathname: string, role: string): boolean {
  switch (role.toUpperCase()) {
    case "SUPER_ADMIN": {
      // Super admin can access everything
      return [...superAdminRoutes, ...adminRoutes, ...vendorRoutes].some((route) => pathname.startsWith(route));
    }

    case "ADMIN": {
      // Admin can access admin routes only
      return adminRoutes.some((route) => pathname.startsWith(route));
    }

    case "VENDOR": {
      // Vendors can only access vendor routes
      return vendorRoutes.some((route) => pathname.startsWith(route));
    }

    default: {
      return false;
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next (Next.js internals)
     * - static (static files)
     * - images (image files)
     * - favicon.ico (favicon file)
     * - public (public assets)
     * - mockServiceWorker (mock service worker)
     */
    "/((?!api|_next|static|images|favicon.ico|public|mockServiceWorker).*)",
  ],
};

export function getTargetPathForRole(role: string): string {
  switch (role.toUpperCase()) {
    case "SUPER_ADMIN": {
      return "/super-admin/dashboard";
    }
    case "ADMIN": {
      return "/admin/home";
    }
    case "VENDOR": {
      return `/dashboard/home`;
    }
    default: {
      return "/login";
    }
  }
}
