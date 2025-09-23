/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { withDependency } from "@/HOC/withDependencies";
import { dependencies } from "@/lib/tools/dependencies";
import { AuthService } from "@/services/auth/auth.service";
import { useTranslations } from "next-intl";
import { LuChevronDown } from "react-icons/lu";

export const BaseProfile = ({ authService }: { authService: AuthService }) => {
  const t = useTranslations();
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleLogOut = async () => {
    // eslint-disable-next-line no-console
    console.log(`logout`);
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!session) {
  //   return <div>No session found</div>;
  // }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-[5px] focus:outline-none active:outline-none">
        <Avatar>
          <AvatarImage src={"https://github.com/shadcn.png"} />
          <AvatarFallback>{"U"}</AvatarFallback>
        </Avatar>
        <p className="hidden lg:block">{"Skicom Admin"}</p>
        <LuChevronDown className="hidden lg:block" size="20px" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="relative z-[999999]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogOut} className="text-mid-danger">
          {t("profile.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Profile = withDependency(BaseProfile, {
  authService: dependencies.AUTH_SERVICE,
});

export default Profile;
