"use client";

import { LanguageToggle } from "@/components/shared/language-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Users } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { PiCaretDown, PiHeart, PiList } from "react-icons/pi";
import { toast } from "sonner";

interface UserAvatarProfileProperties {
  className?: string;
  showInfo?: boolean;
}

const handleLogout = async () => {
  try {
    await signOut({
      redirect: true,
      callbackUrl: "/login",
    });
    toast.success("Logged out successfully");
  } catch {
    toast.error("Failed to log out");
  }
};

export function UserAvatarProfile({ className, showInfo = false }: UserAvatarProfileProperties) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
        <Avatar className={className}>
          <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User avatar"} />
          <AvatarFallback className="bg-muted">
            {session?.user?.name?.slice(0, 2)?.toUpperCase() || "US"}
          </AvatarFallback>
        </Avatar>

        {showInfo && (
          <div className="grid text-left">
            <span className="truncate font-medium">{session?.user?.name || "User"}</span>
            <span className="text-muted-foreground truncate text-xs">{session?.user?.email}</span>
          </div>
        )}
        <PiCaretDown className={`mr-2 h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <Link href={`/shop/cart/saved-items`}>
          <DropdownMenuItem className="cursor-pointer">
            <PiHeart className="mr-2 h-4 w-4" />
            <span>Save Items</span>
          </DropdownMenuItem>
        </Link>
        <Link href={`/shop/cart/orders`}>
          <DropdownMenuItem className="cursor-pointer">
            <PiList className="mr-2 h-4 w-4" />
            <span>My Orders</span>
          </DropdownMenuItem>
        </Link>
        <Link href={`/earn`}>
          <DropdownMenuItem className="cursor-pointer">
            <Users className="mr-2 h-4 w-4" />
            <span>Invest & Earn</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5">
          <LanguageToggle />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer" onClick={handleLogout}>
          <LogOut className="text-destructive mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
