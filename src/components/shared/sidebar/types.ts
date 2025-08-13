// Re-export the main types for easy import
export interface BadgeConfig {
  variant: "danger" | "success" | "warning" | "info";
  count: number;
}

export interface BaseNavItem {
  id: string;
  route: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  badge?: BadgeConfig;
  divider?: boolean;
  link: string;
  /** Optional action type to trigger custom behaviors instead of navigation */
  actionType?: string;
}

export interface NavItemWithChildren extends BaseNavItem {
  children: NavItem[];
  collapsible: true;
}

export interface NavItemWithoutChildren extends BaseNavItem {
  children?: never;
  collapsible?: false;
}

export type NavItem = NavItemWithChildren | NavItemWithoutChildren;

export interface DashboardSidebarProperties {
  navItems: NavItem[];
  className?: string;
  logoProperties?: {
    width?: number;
    height?: number;
    className?: string;
  };
  defaultExpandedItems?: string[];
  autoExpandOnActiveChild?: boolean;
  persistExpandedState?: boolean;
}

// Utility functions for creating navigation items
export const createNavItem = (
  id: string,
  route: string,
  link: string,
  options?: {
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    badge?: BadgeConfig;
    divider?: boolean;
    actionType?: string;
  },
): NavItemWithoutChildren => ({
  id,
  route,
  link,
  actionType: options?.actionType,
  ...options,
});

export const createNavItemWithChildren = (
  id: string,
  route: string,
  link: string,
  children: NavItem[],
  options?: {
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    badge?: BadgeConfig;
    divider?: boolean;
    actionType?: string;
  },
): NavItemWithChildren => ({
  id,
  route,
  link,
  children,
  collapsible: true,
  actionType: options?.actionType,
  ...options,
});

export const createDivider = (id: string): NavItemWithoutChildren => ({
  id,
  route: "",
  link: "",
  divider: true,
});

// Badge utility functions
export const createBadge = (variant: BadgeConfig["variant"], count: number): BadgeConfig => ({
  variant,
  count,
});

export const dangerBadge = (count: number) => createBadge("danger", count);
export const successBadge = (count: number) => createBadge("success", count);
export const warningBadge = (count: number) => createBadge("warning", count);
export const infoBadge = (count: number) => createBadge("info", count);
