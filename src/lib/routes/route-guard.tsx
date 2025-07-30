"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { adminRoutes, customerRoutes, publicRoutes, superAdminRoutes, vendorRoutes } from "./routes";

interface RouteGuardProperties {
  children: ReactNode;
  allowedRoles?: string[];
  fallbackPath?: string;
  showLoading?: boolean;
}

export function RouteGuard({ children, allowedRoles = [], fallbackPath, showLoading = true }: RouteGuardProperties) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      // User is not authenticated, redirect to login
      const loginUrl = "/shop";
      router.push(loginUrl);
      return;
    }

    const userRole = session.user?.role?.name || "";

    // If no specific roles are required, allow access
    if (allowedRoles.length === 0) {
      return;
    }

    // Check if user has the required role
    if (!allowedRoles.includes(userRole)) {
      // User doesn't have the required role, redirect to appropriate dashboard
      const targetPath = fallbackPath || getTargetPathForRole(userRole);
      router.push(targetPath);
      return;
    }
  }, [session, status, allowedRoles, fallbackPath, router]);

  // Show loading state while checking authentication
  if (status === "loading" && showLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
      </div>
    );
  }

  // If not authenticated, don't render children
  if (!session) {
    return null;
  }

  // If specific roles are required, check if user has access
  if (allowedRoles.length > 0) {
    const userRole = session.user?.role?.name || "";
    if (!allowedRoles.includes(userRole)) {
      return null;
    }
  }

  return <>{children}</>;
}

// Helper function to strip locale prefix from pathname
function stripLocalePrefix(pathname: string): string {
  // Remove locale prefix like /en/, /es/, /ar/, etc.
  const localeMatch = pathname.match(/^\/[a-z]{2}(-[A-Z]{2})?\//);
  if (localeMatch) {
    return pathname.replace(localeMatch[0], "/");
  }
  return pathname;
}

// Helper function to check if user has access to a route based on their role
export function checkRouteAccess(pathname: string, role: string): boolean {
  const cleanPathname = stripLocalePrefix(pathname);

  switch (role) {
    case "super_admin": {
      // Super admin can access everything
      return (
        superAdminRoutes.some((route) => cleanPathname.startsWith(route.replace("*", ""))) ||
        adminRoutes.some((route) => cleanPathname.startsWith(route.replace("*", ""))) ||
        vendorRoutes.some((route) => cleanPathname.startsWith(route.replace("*", ""))) ||
        customerRoutes.some((route) => cleanPathname.startsWith(route.replace("*", "")))
      );
    }

    case "admin": {
      // Admin can access admin routes and public routes
      return (
        adminRoutes.some((route) => cleanPathname.startsWith(route.replace("*", ""))) ||
        publicRoutes.some((route) => cleanPathname.startsWith(route.replace("*", "")))
      );
    }

    case "vendor": {
      // Vendors can access vendor routes and public routes
      return (
        vendorRoutes.some((route) => cleanPathname.startsWith(route.replace("*", ""))) ||
        publicRoutes.some((route) => cleanPathname.startsWith(route.replace("*", "")))
      );
    }

    case "customer": {
      // Customers can access customer routes and public routes
      return (
        customerRoutes.some((route) => cleanPathname.startsWith(route.replace("*", ""))) ||
        publicRoutes.some((route) => cleanPathname.startsWith(route.replace("*", "")))
      );
    }

    default: {
      // Unknown role - only allow public routes
      return publicRoutes.some((route) => cleanPathname.startsWith(route.replace("*", "")));
    }
  }
}

// Helper function to get the appropriate dashboard path for each role
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

// Role-specific guard components for convenience
export function SuperAdminGuard({ children, fallbackPath }: Omit<RouteGuardProperties, "allowedRoles">) {
  return (
    <RouteGuard allowedRoles={["super_admin"]} fallbackPath={fallbackPath}>
      {children}
    </RouteGuard>
  );
}

export function AdminGuard({ children, fallbackPath }: Omit<RouteGuardProperties, "allowedRoles">) {
  return (
    <RouteGuard allowedRoles={["admin", "super_admin"]} fallbackPath={fallbackPath}>
      {children}
    </RouteGuard>
  );
}

export function VendorGuard({ children, fallbackPath }: Omit<RouteGuardProperties, "allowedRoles">) {
  return (
    <RouteGuard allowedRoles={["vendor"]} fallbackPath={fallbackPath}>
      {children}
    </RouteGuard>
  );
}

export function CustomerGuard({ children, fallbackPath }: Omit<RouteGuardProperties, "allowedRoles">) {
  return (
    <RouteGuard allowedRoles={["customer"]} fallbackPath={fallbackPath}>
      {children}
    </RouteGuard>
  );
}

export function AuthenticatedGuard({ children, fallbackPath }: Omit<RouteGuardProperties, "allowedRoles">) {
  return <RouteGuard fallbackPath={fallbackPath}>{children}</RouteGuard>;
}
