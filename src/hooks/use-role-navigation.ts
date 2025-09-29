"use client";

import {
  createDivider,
  createNavItem,
  createNavItemWithChildren,
  dangerBadge,
  type NavItem,
} from "@/components/shared/sidebar";
import { useDashboardOrderService } from "@/services/dashboard/vendor/orders/use-order-service";
import { usePayoutService } from "@/services/dashboard/vendor/payouts";
import { ThumbsUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { FaGamepad } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { IoRibbonOutline } from "react-icons/io5";
import { MdDashboard, MdOutlineAddCard, MdOutlinePrivacyTip, MdOutlineVerifiedUser } from "react-icons/md";
import { PiUsersThreeLight } from "react-icons/pi";
import { RiAdvertisementLine, RiShoppingCartLine, RiUserLine } from "react-icons/ri";
import { TbBell, TbCreditCard, TbHelp, TbSettings2, TbShield, TbShoppingBag, TbUserCog, TbUsers } from "react-icons/tb";

export const useRoleNavigation = (): NavItem[] => {
  const { data: session } = useSession();
  const user = session?.user as SessionUser;
  const userRole = user?.role?.name.toUpperCase();

  // Get order and payout data for dynamic badges
  const { useGetAllOrders } = useDashboardOrderService();
  const { useGetWithdrawalsHistory } = usePayoutService();

  // Fetch data with minimal queries for badge counts
  const { data: ordersData } = useGetAllOrders({ page: 1, limit: 1 }, { staleTime: 30_000 });
  const { data: withdrawalsData } = useGetWithdrawalsHistory(undefined, { staleTime: 30_000 });

  // Calculate badge counts
  const orderCount = ordersData?.success ? ordersData.data?.metadata?.total || 0 : 0;
  const pendingWithdrawals = withdrawalsData?.success
    ? withdrawalsData.data?.filter((w: WithdrawalHistoryItem) => w.status === "pending")?.length || 0
    : 0;

  const createSettingsMenu = (role: string): NavItem => {
    const allCommonSettings = [
      createNavItem("notifications", "Notifications", "/dashboard/settings/notifications", {
        icon: TbBell,
      }),
      createNavItem("security-privacy", "Security & Privacy", "/dashboard/settings/security-privacy", {
        icon: TbShield,
      }),
      createNavItem("help-support", "Help & Support", "/dashboard/settings/help-support", {
        icon: TbHelp,
      }),
      createNavItem("account-preferences", "Account & Preferences", "/dashboard/settings/account-preferences", {
        icon: RiUserLine,
      }),
      createNavItem("supscription", "Supscription", "/dashboard/settings/supscription", {
        icon: IoRibbonOutline,
      }),
      createNavItem("rate-this-app", "Rate This App", "", {
        icon: ThumbsUp,
        actionType: "open-rate-app-modal",
      }),
      createNavItem("legal", "Legal", "/dashboard/settings/legal", {
        icon: MdOutlinePrivacyTip,
      }),
    ];

    const adminSpecificSettings = [
      createNavItem("user-management", "User Management", "/admin/settings/users", {
        icon: TbUsers,
      }),
      createNavItem("system-settings", "System Settings", "/admin/settings/system", {
        icon: TbSettings2,
      }),
    ];

    const superAdminSpecificSettings = [
      createNavItem("admin-management", "Admin Management", "/super-admin/settings/admins", {
        icon: TbUserCog,
      }),
      createNavItem("platform-settings", "Platform Configuration", "/super-admin/settings/platform", {
        icon: MdOutlineVerifiedUser,
      }),
    ];

    const finalSettings: NavItem[] = [...allCommonSettings];

    if (role === "ADMIN") {
      finalSettings.push(...adminSpecificSettings);
    } else if (role === "SUPER_ADMIN") {
      finalSettings.push(...adminSpecificSettings, ...superAdminSpecificSettings);
    }

    const baseRoute =
      role === "SUPER_ADMIN" ? "/super-admin/settings" : role === "ADMIN" ? "/admin/settings" : "/dashboard/settings";

    return createNavItemWithChildren("settings", "Settings", baseRoute, finalSettings, {
      icon: TbSettings2,
    });
  };

  switch (userRole) {
    case "SUPER_ADMIN": {
      return [
        createNavItem("dashboard", "Dashboard", "/super-admin/home", { icon: MdDashboard }),
        createDivider("admin-section"),
        createNavItemWithChildren(
          "user-management",
          "User Management",
          "/super-admin/users",
          [
            createNavItem("admins", "Admins", "/super-admin/users/admins", { icon: TbUserCog }),
            createNavItem("vendors", "Vendors", "/super-admin/users/vendors", { icon: RiUserLine }),
            createNavItem("customers", "Customers", "/super-admin/users/customers", { icon: TbUsers }),
          ],
          { icon: PiUsersThreeLight },
        ),
        createNavItem("orders", "All Orders", "/super-admin/orders", {
          icon: RiShoppingCartLine,
          badge: orderCount > 0 ? dangerBadge(orderCount) : undefined,
        }),
        createNavItem("products", "Platform Products", "/super-admin/products", { icon: TbShoppingBag }),
        createNavItem("payouts", "Platform Payouts", "/super-admin/payouts", { icon: MdOutlineAddCard }),
        createNavItem("revenues", "Platform Revenue", "/super-admin/revenues", { icon: GiWallet }),
        createDivider("platform-section"),
        createNavItem("subscriptions", "Subscriptions", "/super-admin/subscriptions", { icon: IoRibbonOutline }),
        createNavItem("promotions", "Promotions & Ads", "/super-admin/promotions", { icon: RiAdvertisementLine }),
        createNavItem("play-to-win", "Play 2 Win", "/super-admin/play-to-win", { icon: FaGamepad }),
        createDivider("settings-section"),
        createSettingsMenu("SUPER_ADMIN"),
      ];
    }

    case "ADMIN": {
      return [
        createNavItem("admin", "Dashboard", "/admin/home", { icon: MdDashboard }),
        createDivider("management-section"),
        createNavItem("users", "Users", "/admin/users", { icon: PiUsersThreeLight }),
        createNavItem("orders", "Orders", "/admin/orders", {
          icon: RiShoppingCartLine,
          badge: orderCount > 0 ? dangerBadge(orderCount) : undefined,
        }),
        createNavItem("payouts", "Payouts", "/admin/payouts", { icon: MdOutlineAddCard }),
        createNavItem("products", "Skicom Products", "/admin/products", { icon: TbShoppingBag }),
        createNavItem("revenues", "Revenues", "/admin/revenues", { icon: GiWallet }),
        createDivider("platform-section"),
        createNavItem("subscriptions", "Subscriptions", "/admin/subscriptions", { icon: IoRibbonOutline }),
        createNavItem("promotions", "Promotions & Ads", "/admin/promotions", { icon: RiAdvertisementLine }),
        createNavItem("play-to-win", "Play 2 Win", "/admin/play-to-win", { icon: FaGamepad }),
        createDivider("settings-section"),
        createSettingsMenu("ADMIN"),
      ];
    }
    default: {
      return [
        createNavItem("home", "Dashboard", "/dashboard/home", { icon: MdDashboard }),
        // createDivider("business-section"),
        createNavItem("products", "My Products", "/dashboard/products", { icon: TbShoppingBag }),
        createNavItem("orders", "Orders", "/dashboard/orders", {
          icon: RiShoppingCartLine,
          badge: orderCount > 0 ? dangerBadge(orderCount) : undefined,
        }),
        // createDivider("finance-section"),
        createNavItem("payouts", "Payouts", "/dashboard/payouts", {
          icon: TbCreditCard,
          badge: pendingWithdrawals > 0 ? dangerBadge(pendingWithdrawals) : undefined,
        }),
        createNavItem("promotions", "Promotions", "/dashboard/promotions", {
          icon: RiAdvertisementLine,
        }),
        // createDivider("account-section"),
        createNavItem("profile", "Profile", "/dashboard/profile", { icon: RiUserLine }),
        createSettingsMenu("VENDOR"),
      ];
    }
  }
};
