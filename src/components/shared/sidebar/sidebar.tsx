"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import { LocaleLink } from "../locale-link";
import { Logo } from "../logo";

// Enhanced types for sidebar navigation
interface BadgeConfig {
  variant: "danger" | "success" | "warning" | "info";
  count: number;
}

interface BaseNavItem {
  id: string;
  route: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  badge?: BadgeConfig;
  divider?: boolean;
  link: string;
}

interface NavItemWithChildren extends BaseNavItem {
  children: NavItem[];
  collapsible: true;
}

interface NavItemWithoutChildren extends BaseNavItem {
  children?: never;
  collapsible?: false;
}

export type NavItem = NavItemWithChildren | NavItemWithoutChildren;

interface DashboardSidebarProperties {
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

export function DashboardSidebar({
  navItems,
  className,
  logoProperties = { width: 80, height: 47 },
  defaultExpandedItems = [],
  autoExpandOnActiveChild = true,
  persistExpandedState = false,
}: DashboardSidebarProperties) {
  const pathname = usePathname();
  const userID = pathname.split("/")[2];
  const { setOpenMobile } = useSidebar();
  // Initialize expanded items state
  const getInitialExpandedItems = (): Set<string> => {
    const initialItems = new Set<string>();

    // Add default expanded items
    for (const item of defaultExpandedItems) {
      initialItems.add(item);
    }

    // Auto-expand items with active children
    if (autoExpandOnActiveChild) {
      for (const item of navItems) {
        if (item.children) {
          const hasActiveChild = item.children.some((child) => pathname.includes(child.id));
          if (hasActiveChild) {
            initialItems.add(item.id);
          }
        }
      }
    }

    // Load from localStorage if persistence is enabled
    if (persistExpandedState && typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("sidebar-expanded-items");
        if (stored) {
          const storedItems = JSON.parse(stored);
          for (const item of storedItems) {
            initialItems.add(item);
          }
        }
      } catch {
        // Silently fail if localStorage is not available
      }
    }

    return initialItems;
  };

  // State for managing expanded menu items
  const [expandedItems, setExpandedItems] = useState<Set<string>>(getInitialExpandedItems);

  const renderIcon = (item: NavItem) => {
    if (item.icon) {
      const Icon = item.icon;
      return <Icon className="h-5 w-5" />;
    }
    return null;
  };

  const handleCloseOnMobile = () => {
    setOpenMobile(false);
  };

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((previous) => {
      const newSet = new Set(previous);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }

      // Persist to localStorage if enabled
      if (persistExpandedState && typeof window !== "undefined") {
        try {
          localStorage.setItem("sidebar-expanded-items", JSON.stringify([...newSet]));
        } catch {
          // Silently fail if localStorage is not available
        }
      }

      return newSet;
    });
  };

  const isItemActive = (item: NavItem): boolean => {
    // Check if current item is active
    if (pathname.includes(item.id)) return true;

    // Check if any child is active (for parent items)
    if (item.children) {
      return item.children.some((child) => pathname.includes(child.id));
    }

    return false;
  };

  const isChildActive = (parentId: string, childId: string): boolean => {
    return pathname.includes(childId);
  };

  // Auto-expand parent when child becomes active
  useEffect(() => {
    if (autoExpandOnActiveChild) {
      for (const item of navItems) {
        if (item.children) {
          const hasActiveChild = item.children.some((child) => pathname.includes(child.id));
          if (hasActiveChild && !expandedItems.has(item.id)) {
            setExpandedItems((previous) => {
              const newSet = new Set(previous);
              newSet.add(item.id);

              // Persist to localStorage if enabled
              if (persistExpandedState && typeof window !== "undefined") {
                try {
                  localStorage.setItem("sidebar-expanded-items", JSON.stringify([...newSet]));
                } catch {
                  // Silently fail if localStorage is not available
                }
              }

              return newSet;
            });
          }
        }
      }
    }
  }, [pathname, navItems, autoExpandOnActiveChild, expandedItems, persistExpandedState]);

  const renderMenuItem = (item: NavItem) => {
    if (item.divider) {
      return <div key={item.id} className="border-border my-4 border-t" />;
    }

    const link = item.link.replace(":userID", userID || "");
    const isActive = isItemActive(item);
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <SidebarMenuItem key={item.id}>
        {hasChildren ? (
          // Parent item with children
          <>
            <SidebarMenuButton
              onClick={() => toggleExpanded(item.id)}
              className={cn(
                "flex h-[48px] w-full items-center gap-3 rounded-lg text-[16px] font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary shadow-active border-primary rounded-none border-l-4"
                  : "text-mid-grey-II hover:bg-low-grey-I",
              )}
            >
              {renderIcon(item)}
              <span className="flex-1 font-light dark:text-white">{item.route}</span>
              {item.badge && (
                <SidebarMenuBadge
                  className={cn(
                    "mr-4 flex h-5 w-5 items-center justify-center rounded-full text-xs",
                    item.badge.variant === "danger"
                      ? "bg-mid-danger text-white"
                      : item.badge.variant === "success"
                        ? "bg-green-500 text-white"
                        : item.badge.variant === "warning"
                          ? "bg-accent text-white"
                          : item.badge.variant === "info"
                            ? "bg-primary text-white"
                            : "bg-gray-200",
                    item.badge.count === 0 && "hidden",
                  )}
                >
                  {item.badge.count}
                </SidebarMenuBadge>
              )}
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 transition-transform duration-200" />
              ) : (
                <ChevronRight className="h-4 w-4 transition-transform duration-200" />
              )}
            </SidebarMenuButton>
            {/* Submenu */}
            {isExpanded && (
              <SidebarMenuSub className="border-border ml-4 border-l pl-4">
                {item.children.map((child) => {
                  const childLink = child.link.replace(":userID", userID || "");
                  const isChildActiveState = isChildActive(item.id, child.id);

                  return (
                    <SidebarMenuSubItem key={child.id}>
                      <SidebarMenuSubButton
                        asChild
                        className={cn(
                          "flex h-[40px] items-center gap-3 rounded-lg text-[14px] font-medium transition-all duration-200",
                          isChildActiveState
                            ? "bg-primary/10 text-primary shadow-active border-primary rounded-none border-l-2"
                            : "text-mid-grey-II hover:bg-low-grey-I",
                        )}
                      >
                        <LocaleLink onClick={handleCloseOnMobile} href={childLink} data-testid={child.id}>
                          {renderIcon(child)}
                          <span className="font-light dark:text-white">{child.route}</span>
                          {child.badge && (
                            <SidebarMenuBadge
                              className={cn(
                                "mr-4 ml-auto flex h-4 w-4 items-center justify-center rounded-full text-xs",
                                child.badge.variant === "danger"
                                  ? "bg-mid-danger text-white"
                                  : child.badge.variant === "success"
                                    ? "bg-green-500 text-white"
                                    : child.badge.variant === "warning"
                                      ? "bg-accent text-white"
                                      : child.badge.variant === "info"
                                        ? "bg-primary text-white"
                                        : "bg-gray-200",
                                child.badge.count === 0 && "hidden",
                              )}
                            >
                              {child.badge.count}
                            </SidebarMenuBadge>
                          )}
                        </LocaleLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  );
                })}
              </SidebarMenuSub>
            )}
          </>
        ) : (
          // Regular menu item without children
          <SidebarMenuButton
            asChild
            className={cn(
              "flex h-[48px] items-center gap-3 rounded-lg text-[16px] font-medium transition-all duration-200",
              isActive
                ? "bg-primary/10 text-primary shadow-active border-primary rounded-none border-l-4"
                : "text-mid-grey-II hover:bg-low-grey-I",
            )}
          >
            <LocaleLink onClick={handleCloseOnMobile} href={link} data-testid={item.id}>
              {renderIcon(item)}
              <span className="font-light dark:text-white">{item.route}</span>
              {item.badge && (
                <SidebarMenuBadge
                  className={cn(
                    "mr-4 ml-auto flex h-5 w-5 items-center justify-center rounded-full text-xs",
                    item.badge.variant === "danger"
                      ? "bg-mid-danger text-white"
                      : item.badge.variant === "success"
                        ? "bg-green-500 text-white"
                        : item.badge.variant === "warning"
                          ? "bg-accent text-white"
                          : item.badge.variant === "info"
                            ? "bg-primary text-white"
                            : "bg-gray-200",
                    item.badge.count === 0 && "hidden",
                  )}
                >
                  {item.badge.count}
                </SidebarMenuBadge>
              )}
            </LocaleLink>
          </SidebarMenuButton>
        )}
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar className={cn("border-border border-r-[0.5px] shadow-none", className)}>
      <SidebarHeader className="h-28 items-center justify-center">
        <Logo width={logoProperties.width} height={logoProperties.height} className={logoProperties.className} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="space-y-2 p-4">{navItems.map((item) => renderMenuItem(item))}</SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
