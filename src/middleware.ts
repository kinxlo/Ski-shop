import { NextResponse } from "next/server";

import { auth } from "./lib/next-auth/auth";
import { adminRoutes, authRoutes, publicRoutes, superAdminRoutes, vendorRoutes } from "./lib/routes/routes";

export default auth(async (request) => {
  const { nextUrl } = request;
  const { pathname } = nextUrl;
  const isLoggedIn = !!request.auth;
  const userRole = request.auth?.user?.role?.name || "";

  // Skip middleware for all OAuth callback related routes
  if (
    pathname.startsWith("/auth/callback") ||
    pathname.startsWith("/auth/fetching-data") ||
    pathname.startsWith("/auth/oauth") ||
    pathname.includes("oauth")
  ) {
    return NextResponse.next();
  }

  // Allow public routes and any route under /explore
  if (publicRoutes.includes(pathname)) {
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
     */
    "/((?!api|_next|static|images|favicon.ico|public).*)",
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
