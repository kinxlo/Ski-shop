import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

import { ADMIN_ROUTES, PUBLIC_ROUTES, SUPER_ADMIN_ROUTES, VENDOR_ROUTES } from "./lib/routes/routes";

// Helper function to check if path matches any route pattern
const matchesRoute = (path: string, routePatterns: string[]): boolean => {
  return routePatterns.some((pattern) => {
    if (pattern.endsWith("*")) {
      const basePattern = pattern.slice(0, -1);
      return path.startsWith(basePattern);
    }
    // Exact match or path starts with pattern followed by a slash
    return path === pattern || path.startsWith(pattern + "/");
  });
};

// Supported locales
const SUPPORTED_LOCALES = ["en", "fr", "es", "ar"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Extract locale from pathname
  const pathnameHasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  // If no locale in pathname, redirect to default locale (en)
  if (!pathnameHasLocale) {
    const locale = "en";
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  // Extract locale and path without locale
  const segments = pathname.split("/");
  const locale = segments[1];
  const pathWithoutLocale = `/${segments.slice(2).join("/")}`;

  // Remove query parameters from path for route matching
  const pathWithoutQuery = pathWithoutLocale.split("?")[0];

  // Check if locale is supported
  if (!SUPPORTED_LOCALES.includes(locale)) {
    const url = new URL(request.url);
    url.pathname = `/en${pathWithoutLocale}`;
    return NextResponse.redirect(url);
  }

  // Get user token to check authentication and role
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  const isAuthenticated = !!token;
  // Handle role as object or string
  const userRole =
    typeof token?.role === "object" && (token?.role as { id: string })?.id
      ? (token?.role as { id: string }).id
      : (token?.role as string) || "customer";

  // Check if user is trying to access a protected route
  const isVendorRoute = matchesRoute(pathWithoutQuery, VENDOR_ROUTES);
  const isAdminRoute = matchesRoute(pathWithoutQuery, ADMIN_ROUTES);
  const isSuperAdminRoute = matchesRoute(pathWithoutQuery, SUPER_ADMIN_ROUTES);
  const isPublicRoute = matchesRoute(pathWithoutQuery, PUBLIC_ROUTES);

  // Role-based access control
  if (isAuthenticated) {
    // Authenticated users - check role-based access
    switch (userRole) {
      case "customer": {
        // Customers can only access public routes
        if (isVendorRoute || isAdminRoute || isSuperAdminRoute) {
          const url = new URL(request.url);
          url.pathname = `/${locale}/shop`;
          return NextResponse.redirect(url);
        }
        break;
      }

      case "vendor": {
        // Vendors can access public routes and vendor routes
        if (isAdminRoute || isSuperAdminRoute) {
          const url = new URL(request.url);
          url.pathname = `/${locale}/dashboard/home`;
          return NextResponse.redirect(url);
        }
        break;
      }

      case "admin": {
        // Admins can access public routes, vendor routes, and admin routes
        if (isSuperAdminRoute) {
          const url = new URL(request.url);
          url.pathname = `/${locale}/admin/home`;
          return NextResponse.redirect(url);
        }
        break;
      }

      case "super-admin": {
        // Super admins can access all routes
        break;
      }

      default: {
        // Unknown role - redirect to login
        const url = new URL(request.url);
        url.pathname = `/${locale}/login`;
        return NextResponse.redirect(url);
      }
    }
  } else {
    // Unauthenticated users can only access public routes
    if (!isPublicRoute) {
      const url = new URL(request.url);
      url.pathname = `/${locale}/login`;
      return NextResponse.redirect(url);
    }
  }

  // Continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api|_next|static|images|favicon.ico|public|mockServiceWorker).*)",
  ],
};
