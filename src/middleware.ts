import { defaultLocale } from "@/lib/i18n/config";
import { isValidLocale } from "@/lib/i18n/utils";
import {
  ADMIN_ROUTES,
  PUBLIC_ROUTES,
  SUPER_ADMIN_ROUTES,
  VENDOR_FORBIDDEN_ROUTES,
  VENDOR_ROUTES,
} from "@/lib/routes/routes";
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

function stripLocalePrefix(pathname: string): { basePath: string; localePrefix: string | null } {
  const segments = pathname.split("/");
  const maybeLocale = segments[1];
  if (maybeLocale && isValidLocale(maybeLocale)) {
    const rest = segments.slice(2).join("/");
    return { basePath: `/${rest}`, localePrefix: maybeLocale };
  }
  return { basePath: pathname, localePrefix: null };
}

function pathMatchesAny(pathname: string, patterns: string[]): boolean {
  for (const pattern of patterns) {
    if (pattern === "/") {
      if (pathname === "/") return true;
      continue;
    }
    if (pathname === pattern) return true;
    if (pathname.startsWith(`${pattern}/`)) return true;
  }
  return false;
}

function getUserRoleFromToken(token: unknown): string {
  if (!token || typeof token !== "object") return "customer";
  const maybeRole = (token as Record<string, unknown>).role as unknown;
  if (!maybeRole) return "customer";
  if (typeof maybeRole === "string") return maybeRole.toLowerCase();
  const id = String((maybeRole as Record<string, unknown>)?.id ?? "");
  const name = String((maybeRole as Record<string, unknown>)?.name ?? "");
  return (name || id || "customer").toLowerCase();
}

function getDefaultHomeForRole(role: string): string {
  switch (role) {
    case "vendor": {
      return "/dashboard/home";
    }
    case "admin": {
      return "/admin/home";
    }
    case "super-admin":
    case "super_admin":
    case "superadmin": {
      return "/super-admin";
    }
    default: {
      return "/shop";
    }
  }
}

function withLocalePrefix(path: string, localePrefix: string | null): string {
  if (!localePrefix) return path;
  if (path === "/") return `/${localePrefix}`;
  return `/${localePrefix}${path.startsWith("/") ? "" : "/"}${path}`;
}

export default async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;

  // Skip static files, internal Next.js paths, and API routes entirely
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/_vercel") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/api/")
  ) {
    return NextResponse.next();
  }

  const { basePath, localePrefix } = stripLocalePrefix(pathname);

  // Enforce locale prefix: redirect to default locale if missing
  if (!localePrefix) {
    const localized = `/${defaultLocale}${pathname === "/" ? "" : pathname}${nextUrl.search}`;
    return NextResponse.redirect(new URL(localized, request.url));
  }

  // Always allow NextAuth built-in endpoints
  if (basePath.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Auth state from JWT cookie (compatible with middleware)
  // Fix for production: ensure proper cookie reading and secret handling
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? process.env.NEXT_AUTH_SECRET,
    // Add cookie configuration for production
    cookieName: process.env.NODE_ENV === "production" ? "__Secure-authjs.session-token" : "authjs.session-token",
    // Ensure secure cookies are handled correctly
    secureCookie: process.env.NODE_ENV === "production",
  });

  const isAuthenticated = Boolean(token);
  const role = getUserRoleFromToken(token);

  // Public routes are accessible to everyone
  const isPublic = pathMatchesAny(basePath, PUBLIC_ROUTES);
  if (isPublic) {
    // If authenticated and on an auth page, redirect to role home
    if (isAuthenticated && (basePath === "/login" || basePath === "/signup" || basePath === "/auth")) {
      const destination = withLocalePrefix(getDefaultHomeForRole(role), localePrefix);
      return NextResponse.redirect(new URL(destination, request.url));
    }

    // Restrict certain public routes for specific roles
    const isVendorForbidden = pathMatchesAny(basePath, VENDOR_FORBIDDEN_ROUTES);
    if (isVendorForbidden && role === "vendor") {
      const destination = withLocalePrefix(getDefaultHomeForRole(role), localePrefix);
      return NextResponse.redirect(new URL(destination, request.url));
    }

    return NextResponse.next();
  }

  // Protected routes by role
  const isVendorArea = pathMatchesAny(basePath, VENDOR_ROUTES);
  const isAdminArea = pathMatchesAny(basePath, ADMIN_ROUTES);
  const isSuperAdminArea = pathMatchesAny(basePath, SUPER_ADMIN_ROUTES);

  // If not authenticated and trying to access any protected area, go to login with callback
  if (!isAuthenticated && (isVendorArea || isAdminArea || isSuperAdminArea)) {
    const callbackUrl = encodeURIComponent(nextUrl.pathname + nextUrl.search);
    const loginPath = withLocalePrefix(`/login?callbackUrl=${callbackUrl}`, localePrefix);
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  // If authenticated but wrong role, redirect to their default home
  if (isAuthenticated) {
    if (isVendorArea && role !== "vendor") {
      const destination = withLocalePrefix(getDefaultHomeForRole(role), localePrefix);
      return NextResponse.redirect(new URL(destination, request.url));
    }
    if (isAdminArea && role !== "admin") {
      const destination = withLocalePrefix(getDefaultHomeForRole(role), localePrefix);
      return NextResponse.redirect(new URL(destination, request.url));
    }
    if (isSuperAdminArea && role !== "super-admin") {
      const destination = withLocalePrefix(getDefaultHomeForRole(role), localePrefix);
      return NextResponse.redirect(new URL(destination, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except for static files, image assets and API routes
    "/((?!api|_next|_vercel|.*[.].*).*)",
  ],
};
