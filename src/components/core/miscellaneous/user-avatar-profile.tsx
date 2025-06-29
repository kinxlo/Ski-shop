"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface UserAvatarProfileProperties {
  className?: string;
  showInfo?: boolean;
}

export function UserAvatarProfile({ className, showInfo = false }: UserAvatarProfileProperties) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session } = useSession();
  return (
    <>
      <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2">
        <Avatar className={className}>
          <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
          <AvatarFallback className="rounded-lg">
            {session?.user?.name?.slice(0, 2)?.toUpperCase() || "SC"}
          </AvatarFallback>
        </Avatar>
        {showInfo && (
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{session?.user?.name || ""}</span>
          </div>
        )}
        <ChevronDown
          size="16"
          className={`text-gray-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
        />
      </div>
      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-gray-200 focus:outline-none">
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            My Profile
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            Account Settings
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            Logout
          </a>
        </div>
      )}
    </>
  );
}
