// Example usage of the enhanced DashboardSidebar component

import {
  TbBell,
  TbChartBar,
  TbCreditCard,
  TbHome,
  TbSettings,
  TbShield,
  TbShoppingCart,
  TbUser,
  TbUsers,
} from "react-icons/tb";

import { DashboardSidebar } from "./sidebar";
import {
  createDivider,
  createNavItem,
  createNavItemWithChildren,
  dangerBadge,
  successBadge,
  warningBadge,
  type NavItem,
} from "./types";

// Example 1: Basic sidebar with simple navigation items
const basicNavItems: NavItem[] = [
  createNavItem("dashboard", "Dashboard", "/dashboard", { icon: TbHome }),
  createNavItem("orders", "Orders", "/dashboard/orders", {
    icon: TbShoppingCart,
    badge: dangerBadge(5),
  }),
  createNavItem("users", "Users", "/dashboard/users", { icon: TbUsers }),
  createNavItem("settings", "Settings", "/dashboard/settings", { icon: TbSettings }),
];

// Example 2: Complex sidebar with nested items and various features
const complexNavItems: NavItem[] = [
  createNavItem("dashboard", "Dashboard", "/dashboard", { icon: TbHome }),

  createDivider("divider-1"),

  createNavItemWithChildren(
    "ecommerce",
    "E-commerce",
    "/dashboard/ecommerce",
    [
      createNavItem("orders", "Orders", "/dashboard/orders", {
        icon: TbShoppingCart,
        badge: dangerBadge(12),
      }),
      createNavItem("products", "Products", "/dashboard/products", {
        icon: TbShoppingCart,
      }),
      createNavItem("customers", "Customers", "/dashboard/customers", {
        icon: TbUsers,
      }),
    ],
    { icon: TbShoppingCart },
  ),

  createNavItemWithChildren(
    "analytics",
    "Analytics",
    "/dashboard/analytics",
    [
      createNavItem("overview", "Overview", "/dashboard/analytics/overview", {
        icon: TbChartBar,
      }),
      createNavItem("reports", "Reports", "/dashboard/analytics/reports", {
        icon: TbChartBar,
      }),
      createNavItem("payouts", "Payouts", "/dashboard/payouts", {
        icon: TbCreditCard,
        badge: successBadge(3),
      }),
    ],
    { icon: TbChartBar },
  ),

  createDivider("divider-2"),

  createNavItemWithChildren(
    "account",
    "Account",
    "/dashboard/account",
    [
      createNavItem("profile", "Profile", "/dashboard/profile", {
        icon: TbUser,
      }),
      createNavItem("security", "Security", "/dashboard/security", {
        icon: TbShield,
        badge: warningBadge(1),
      }),
      createNavItem("notifications", "Notifications", "/dashboard/notifications", {
        icon: TbBell,
      }),
    ],
    { icon: TbSettings },
  ),
];

// Example usage components
export function BasicSidebar() {
  return <DashboardSidebar navItems={basicNavItems} logoProperties={{ width: 100, height: 50 }} />;
}

export function ComplexSidebar() {
  return (
    <DashboardSidebar
      navItems={complexNavItems}
      defaultExpandedItems={["analytics"]} // Start with analytics expanded
      autoExpandOnActiveChild={true} // Auto-expand when child is active
      persistExpandedState={true} // Remember expanded state in localStorage
      logoProperties={{ width: 120, height: 60, className: "custom-logo" }}
      className="custom-sidebar-class"
    />
  );
}

// Helper function for role-based navigation
const getNavItemsForRole = (role: string): NavItem[] => {
  const commonItems = [createNavItem("dashboard", "Dashboard", "/dashboard", { icon: TbHome })];

  switch (role) {
    case "admin": {
      return [
        ...commonItems,
        createNavItemWithChildren(
          "management",
          "Management",
          "/admin",
          [
            createNavItem("users", "Users", "/admin/users", { icon: TbUsers }),
            createNavItem("orders", "Orders", "/admin/orders", { icon: TbShoppingCart }),
            createNavItem("analytics", "Analytics", "/admin/analytics", { icon: TbChartBar }),
          ],
          { icon: TbSettings },
        ),
      ];
    }

    case "vendor": {
      return [
        ...commonItems,
        createNavItem("orders", "My Orders", "/dashboard/orders", {
          icon: TbShoppingCart,
          badge: dangerBadge(3),
        }),
        createNavItem("products", "My Products", "/dashboard/products", { icon: TbShoppingCart }),
        createNavItem("payouts", "Payouts", "/dashboard/payouts", { icon: TbCreditCard }),
      ];
    }

    default: {
      return [
        ...commonItems,
        createNavItem("orders", "My Orders", "/dashboard/orders", { icon: TbShoppingCart }),
        createNavItem("profile", "Profile", "/dashboard/profile", { icon: TbUser }),
      ];
    }
  }
};

// Example: Dynamic sidebar based on user role
export function RoleBasedSidebar({ userRole }: { userRole: "admin" | "vendor" | "user" }) {
  return (
    <DashboardSidebar
      navItems={getNavItemsForRole(userRole)}
      autoExpandOnActiveChild={true}
      persistExpandedState={true}
    />
  );
}

export { DashboardSidebar as default } from "./sidebar";
