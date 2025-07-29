"use client";

import Loading from "@/app/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthGuardProperties {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedRoles?: string[];
  redirectTo?: string;
}

export const AuthGuard = ({
  children,
  requireAuth = true,
  allowedRoles = [],
  redirectTo = "/login",
}: AuthGuardProperties) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If authentication is required but user is not authenticated
    if (requireAuth && status === "unauthenticated") {
      router.push(redirectTo);
      return;
    }

    // If user is authenticated but doesn't have required role
    if (requireAuth && status === "authenticated" && allowedRoles.length > 0) {
      const userRole = session?.user?.role?.name || "";
      const hasRequiredRole = allowedRoles.includes(userRole);
      if (!hasRequiredRole) {
        // Redirect to appropriate dashboard based on user role
        const targetPath = getTargetPathForRole(userRole);
        router.push(targetPath);
        return;
      }
    }

    // If user is authenticated and trying to access auth pages, redirect to dashboard
    if (status === "authenticated" && redirectTo === "/login") {
      const userRole = session?.user?.role?.name || "";
      const targetPath = getTargetPathForRole(userRole);
      router.push(targetPath);
      return;
    }
  }, [status, session, requireAuth, allowedRoles, redirectTo, router]);

  // Show loading while checking authentication
  if (requireAuth && status === "loading") {
    return <Loading text="Checking authentication..." />;
  }

  // Show loading while redirecting
  if (status === "authenticated" && redirectTo === "/login") {
    return <Loading text="Redirecting..." />;
  }

  return <>{children}</>;
};

// Helper function to get target path based on user role
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
