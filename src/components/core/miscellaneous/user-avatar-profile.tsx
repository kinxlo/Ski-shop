"use client";

import { LocaleLink } from "@/components/shared/locale-link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ComponentGuard } from "@/lib/routes/component-guard";
import { useAppService } from "@/services/externals/app/use-app-service";
import { Box, ListOrdered, LogOut, Users } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { PiCaretDown, PiHeart } from "react-icons/pi";
import { toast } from "sonner";

import { ThemeSwitchers } from "./theme-variant-switcher";

interface UserAvatarProfileProperties {
  className?: string;
  showInfo?: boolean;
}

export function UserAvatarProfile({ className, showInfo = false }: UserAvatarProfileProperties) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const { useGetSavedProducts, useGetOrders } = useAppService();
  const t = useTranslations("userProfile");

  // Fetch saved products and orders data
  const { data: savedProductsResponse } = useGetSavedProducts();
  const { data: ordersResponse } = useGetOrders();

  // Get counts
  const savedItemsCount = savedProductsResponse?.data?.metadata?.total || 0;
  const ordersCount = ordersResponse?.data?.metadata?.total || 0;

  const handleLogout = async () => {
    try {
      await signOut({
        redirect: true,
        callbackUrl: "/login",
      });
      toast.success(t("logoutSuccess"));
    } catch {
      toast.error(t("logoutFailed"));
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
        <Avatar className={className}>
          <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || t("userAvatar")} />
          <AvatarFallback className="bg-muted">
            {session?.user?.name?.slice(0, 2)?.toUpperCase() || "US"}
          </AvatarFallback>
        </Avatar>

        {showInfo && (
          <div className="grid text-left">
            <span className="truncate font-medium">{session?.user?.name || t("user")}</span>
            <span className="text-muted-foreground truncate text-xs">{session?.user?.email}</span>
          </div>
        )}
        <PiCaretDown className={`mr-2 h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <LocaleLink href={`/shop/cart/saved-items`}>
          <DropdownMenuItem className="cursor-pointer">
            <PiHeart className="mr-2 h-4 w-4" />
            <span>{t("saveItems")}</span>
            {savedItemsCount > 0 && (
              <span className="bg-primary text-primary-foreground ml-auto flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium">
                {savedItemsCount > 9 ? "9+" : savedItemsCount}
              </span>
            )}
          </DropdownMenuItem>
        </LocaleLink>
        <LocaleLink href={`/shop/cart/orders`}>
          <DropdownMenuItem className="cursor-pointer">
            <ListOrdered className="mr-2 h-4 w-4" />
            <span>{t("myOrders")}</span>
            {ordersCount > 0 && (
              <span className="bg-primary text-primary-foreground ml-auto flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium">
                {ordersCount > 9 ? "9+" : ordersCount}
              </span>
            )}
          </DropdownMenuItem>
        </LocaleLink>
        <LocaleLink href={`/earn`}>
          <DropdownMenuItem className="cursor-pointer">
            <Users className="mr-2 h-4 w-4" />
            <span>{t("investEarn")}</span>
          </DropdownMenuItem>
        </LocaleLink>
        <ComponentGuard requireAuth allowedRoles={["VENDOR"]}>
          <LocaleLink href={`/dashboard/home`}>
            <DropdownMenuItem className="cursor-pointer">
              <Box className="mr-2 h-4 w-4" />
              <span>{t("dashboard")}</span>
            </DropdownMenuItem>
          </LocaleLink>
        </ComponentGuard>
        <DropdownMenuSeparator />
        <div className="flex items-center justify-between px-2 py-1.5">
          <ThemeSwitchers className={`flex-col`} />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer" onClick={handleLogout}>
          <LogOut className="text-destructive mr-2 h-4 w-4" />
          <span>{t("logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
