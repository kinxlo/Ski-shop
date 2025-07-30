export const publicRoutes: string[] = [
  "/",
  "/pricing",
  "/terms-and-conditions",
  "/privacy-policy",
  "/about",
  "/contact",
  "/shop",
  "/shop/cart/*",
  "/shop/product/*",
  "/home",
  "/earn",
];

export const authRoutes: string[] = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/fetching-data/*",
  "/auth/*",
];

export const customerRoutes: string[] = [
  "/shop",
  "/shop/cart/*",
  "/shop/product/*",
  "/shop/checkout/*",
  "/shop/orders/*",
];

export const vendorRoutes: string[] = [
  "/dashboard/home",
  "/dashboard/profile",
  "/dashboard/settings",
  "/dashboard/downloads",
  "/dashboard/orders",
  "/dashboard/products",
  "/dashboard/users",
];

export const adminRoutes: string[] = [
  "/admin/home",
  "/admin/users",
  "/admin/settings",
  "/admin/reports",
  "/admin/products",
  "/admin/orders",
  "/admin/analytics",
];

export const superAdminRoutes: string[] = [
  ...adminRoutes, // Has access to all admin routes
  "/super-admin/dashboard",
  "/super-admin/admin-management", // Can manage other admins
  "/super-admin/system-settings", // Global system settings
  "/super-admin/audit-logs", // View all system logs
  "/super-admin/users",
  "/super-admin/analytics",
];
