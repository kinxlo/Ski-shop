"use client";

import { SearchInput } from "@/components/core/miscellaneous/search-input";
import { UserAvatarProfile } from "@/components/core/miscellaneous/user-avatar-profile";
import { LanguageToggle } from "@/components/shared/language-toggle";
import { BellDot } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

type TopBarProperties = {
  notificationsCount?: number;
  className?: string;
};

// onSearch,
export default function TopBar({ notificationsCount = 0, className = "" }: TopBarProperties) {
  const { data: session } = useSession();
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(session);
  }, [session]);
  return (
    <header className={`bg-background flex h-16 items-center justify-between ${className}`}>
      <div className="relative hidden w-full max-w-[240px] md:block">
        <SearchInput className={`bg-muted min-w-md border-none`} onSearch={() => {}} />
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="focus:ring-primary-500 relative rounded-full p-1 text-gray-500 hover:text-gray-700 focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          <span className="sr-only">View notifications</span>
          <BellDot size="24" className="text-gray-500" />
          {notificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
              {notificationsCount > 9 ? "9+" : notificationsCount}
            </span>
          )}
        </button>
        <div className="relative border-l border-black/20 pl-4">
          <UserAvatarProfile showInfo />
        </div>
        <LanguageToggle />
      </div>
    </header>
  );
}
