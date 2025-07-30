# Route Guard System

This document explains the comprehensive route guard system implemented for the Ski Shop application, supporting four user roles: **ADMIN**, **SUPER_ADMIN**, **CUSTOMER**, and **VENDOR**.

## Overview

The route guard system consists of two layers:

1. **Server-side Middleware** (`src/middleware.ts`) - Handles route protection at the server level
2. **Client-side Route Guards** (`src/lib/routes/route-guard.tsx`) - Provides additional protection within components

## User Roles & Access Levels

### SUPER_ADMIN

- **Access**: Everything (all routes)
- **Dashboard**: `/super-admin/dashboard`
- **Capabilities**: Can manage other admins, view system logs, access global settings

### ADMIN

- **Access**: Admin routes + Public routes
- **Dashboard**: `/admin/home`
- **Capabilities**: Manage users, products, orders, view analytics

### VENDOR

- **Access**: Vendor routes + Public routes
- **Dashboard**: `/dashboard/home`
- **Capabilities**: Manage their products, view orders, manage profile

### CUSTOMER

- **Access**: Customer routes + Public routes
- **Dashboard**: `/shop`
- **Capabilities**: Browse products, place orders, manage profile

## Route Configuration

Routes are defined in `src/lib/routes/routes.ts`:

```typescript
export const publicRoutes: string[] = [
  "/",
  "/about",
  "/contact",
  "/shop",
  // ... more public routes
];

export const customerRoutes: string[] = [
  "/shop",
  "/shop/cart/*",
  "/shop/product/*",
  "/shop/checkout/*",
  // ... more customer routes
];

export const vendorRoutes: string[] = [
  "/dashboard/home",
  "/dashboard/products",
  "/dashboard/orders",
  // ... more vendor routes
];

export const adminRoutes: string[] = [
  "/admin/home",
  "/admin/users",
  "/admin/products",
  // ... more admin routes
];

export const superAdminRoutes: string[] = [
  ...adminRoutes,
  "/super-admin/dashboard",
  "/super-admin/admin-management",
  // ... more super admin routes
];
```

## Server-Side Middleware

The middleware automatically handles:

- Authentication checks
- Role-based route access
- Redirects to appropriate dashboards
- OAuth callback handling
- Static asset bypassing

### How it works:

1. **Public Routes**: Accessible to everyone
2. **Auth Routes**: Redirect authenticated users to their dashboard
3. **Protected Routes**: Check user role and redirect if unauthorized
4. **Unauthenticated Users**: Redirect to login page

## Client-Side Route Guards

Use these components for additional protection within your React components:

### Basic Route Guard

```tsx
import { RouteGuard } from "@/lib/routes/route-guard";

function MyProtectedComponent() {
  return (
    <RouteGuard allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
      <div>This content is only visible to admins</div>
    </RouteGuard>
  );
}
```

### Role-Specific Guards

```tsx
import {
  SuperAdminGuard,
  AdminGuard,
  VendorGuard,
  CustomerGuard,
  AuthenticatedGuard
} from "@/lib/routes/route-guard";

// Super Admin only
<SuperAdminGuard>
  <div>Super admin content</div>
</SuperAdminGuard>

// Admin or Super Admin
<AdminGuard>
  <div>Admin content</div>
</AdminGuard>

// Vendor only
<VendorGuard>
  <div>Vendor content</div>
</VendorGuard>

// Customer only
<CustomerGuard>
  <div>Customer content</div>
</CustomerGuard>

// Any authenticated user
<AuthenticatedGuard>
  <div>Authenticated user content</div>
</AuthenticatedGuard>
```

### Custom Fallback Paths

```tsx
<RouteGuard allowedRoles={["ADMIN"]} fallbackPath="/custom-redirect" showLoading={false}>
  <div>Admin content</div>
</RouteGuard>
```

## Usage Examples

### 1. Protecting Admin Pages

```tsx
// pages/admin/users.tsx
import { AdminGuard } from "@/lib/routes/route-guard";

export default function AdminUsersPage() {
  return (
    <AdminGuard>
      <div>
        <h1>User Management</h1>
        {/* Admin user management content */}
      </div>
    </AdminGuard>
  );
}
```

### 2. Conditional Content Based on Role

```tsx
import { RouteGuard } from "@/lib/routes/route-guard";
import { useSession } from "next-auth/react";

function Dashboard() {
  const { data: session } = useSession();
  const userRole = session?.user?.role?.name;

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Admin-specific content */}
      <RouteGuard allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
        <div>Admin Analytics</div>
      </RouteGuard>

      {/* Vendor-specific content */}
      <RouteGuard allowedRoles={["VENDOR"]}>
        <div>Product Management</div>
      </RouteGuard>

      {/* Customer-specific content */}
      <RouteGuard allowedRoles={["CUSTOMER"]}>
        <div>Order History</div>
      </RouteGuard>
    </div>
  );
}
```

### 3. Layout-Level Protection

```tsx
// layouts/admin-layout.tsx
import { AdminGuard } from "@/lib/routes/route-guard";

export default function AdminLayout({ children }) {
  return (
    <AdminGuard>
      <div className="admin-layout">
        <nav>Admin Navigation</nav>
        <main>{children}</main>
      </div>
    </AdminGuard>
  );
}
```

## Helper Functions

### `checkRouteAccess(pathname, role)`

Check if a user with a specific role can access a route:

```tsx
import { checkRouteAccess } from "@/lib/routes/route-guard";

const canAccess = checkRouteAccess("/admin/users", "ADMIN"); // true
const cannotAccess = checkRouteAccess("/admin/users", "CUSTOMER"); // false
```

### `getTargetPathForRole(role)`

Get the appropriate dashboard path for a role:

```tsx
import { getTargetPathForRole } from "@/lib/routes/route-guard";

const adminPath = getTargetPathForRole("ADMIN"); // "/admin/home"
const vendorPath = getTargetPathForRole("VENDOR"); // "/dashboard/home"
```

## Best Practices

1. **Always use both layers**: Server-side middleware for security, client-side guards for UX
2. **Be specific with roles**: Use the most restrictive role that fits your needs
3. **Handle loading states**: The guards automatically show loading spinners
4. **Use fallback paths**: Provide custom redirect paths when needed
5. **Test all roles**: Ensure your routes work correctly for all user types

## Security Considerations

- The server-side middleware is the primary security layer
- Client-side guards provide UX improvements but should not be relied upon for security
- Always validate permissions on the server side for API calls
- Use HTTPS in production to protect authentication tokens
- Regularly audit route permissions and user roles

## Troubleshooting

### Common Issues:

1. **Infinite redirects**: Check that your route configurations don't create loops
2. **Unauthorized access**: Verify that routes are properly configured in `routes.ts`
3. **Loading not showing**: Ensure `showLoading={true}` is set (default)
4. **Role not recognized**: Check that role names match exactly (case-sensitive)

### Debug Mode:

Enable debug logging in your auth configuration to troubleshoot authentication issues:

```typescript
// src/lib/next-auth/auth.ts
export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: process.env.NODE_ENV === "development",
  // ... other config
});
```
