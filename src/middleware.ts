import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

import { auth } from "../src/lib/next-auth/auth";
import {
  adminRoutes,
  authRoutes,
  customerRoutes,
  publicRoutes,
  superAdminRoutes,
  vendorRoutes,
} from "../src/lib/routes/routes";
import { defaultLocale, locales } from "./lib/i18n/config";

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

// Helper function to match routes with wildcards and parameters
function matchRoute(pathname: string, routePattern: string): boolean {
  // Remove wildcards for matching
  const cleanRoute = routePattern.replace("*", "");

  // If route ends with *, check if pathname starts with the base route
  if (routePattern.endsWith("*")) {
    return pathname.startsWith(cleanRoute);
  }

  // For exact matches
  return pathname === routePattern;
}

// Helper function to check if pathname matches any route in the array
function matchesAnyRoute(pathname: string, routes: string[]): boolean {
  return routes.some((route) => matchRoute(pathname, route));
}

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

  // Allow public routes
  if (matchesAnyRoute(pathname, publicRoutes)) {
    return NextResponse.next();
  }

  // Skip Paystack return URLs (downloads after payment)
  if (/^\/dashboard\/[^/]+\/downloads$/.test(pathname)) {
    return NextResponse.next();
  }

  // Handle auth routes (login, register, etc.)
  if (matchesAnyRoute(pathname, authRoutes)) {
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
    if (!matchesAnyRoute(pathname, authRoutes)) {
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
  switch (role) {
    case "super_admin": {
      // Super admin can access everything
      return matchesAnyRoute(pathname, [...superAdminRoutes, ...adminRoutes, ...vendorRoutes, ...customerRoutes]);
    }

    case "admin": {
      // Admin can access admin routes only
      return matchesAnyRoute(pathname, adminRoutes);
    }

    case "vendor": {
      // Vendors can only access vendor routes
      return matchesAnyRoute(pathname, vendorRoutes);
    }

    case "customer": {
      // Customers can only access customer routes
      return matchesAnyRoute(pathname, customerRoutes);
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
  switch (role) {
    case "super_admin": {
      return "/super-admin/dashboard";
    }
    case "admin": {
      return "/admin/home";
    }
    case "vendor": {
      return "/dashboard/home";
    }
    case "customer": {
      return "/shop";
    }
    default: {
      return "/login";
    }
  }
}
