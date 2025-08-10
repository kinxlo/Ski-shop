// Barrel export for sidebar components

export { DashboardSidebar } from "./sidebar";
export type {
  NavItem,
  DashboardSidebarProperties,
  BadgeConfig,
  BaseNavItem,
  NavItemWithChildren,
  NavItemWithoutChildren,
} from "./types";
export {
  createNavItem,
  createNavItemWithChildren,
  createDivider,
  createBadge,
  dangerBadge,
  successBadge,
  warningBadge,
  infoBadge,
} from "./types";
