"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import { UserAvatarProfile } from "@/components/core/miscellaneous/user-avatar-profile";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAppService } from "@/services/externals/app/use-app-service";
import { Menu, ShoppingCartIcon, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { forwardRef, useEffect, useState } from "react";

import SkiButton from "../button";
import { LanguageToggle } from "../language-toggle";
import { Logo } from "../logo";
import { SearchDialog } from "./_components/search-modal";
import { NavItems } from "./nav-menu-item";

interface NavbarProperties {
  logo?: React.ReactNode;
  links?: typeof NAV_LINKS;
  className?: string;
  navbarStyle?: string;
  sticky?: boolean;
}

export const Navbar = forwardRef<HTMLElement, NavbarProperties>(
  (
    { logo = <Logo width={50} logo="/images/skicom.svg" />, links = NAV_LINKS, className, navbarStyle, sticky = true },
    reference,
  ) => {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [, setIsScrolled] = useState(false);
    const { useGetCart } = useAppService();

    // Fetch cart data
    const { data: cartResponse } = useGetCart();
    const cartItemCount = cartResponse?.data?.metadata?.total || 0;

    useEffect(() => {
      setIsMobileMenuOpen(false);
      // eslint-disable-next-line no-console
      console.log(session);
    }, [pathname, session]);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
      <nav
        ref={reference}
        className={cn(
          "w-full transition-all duration-300",
          sticky && "fixed top-0 z-50",
          // isScrolled && "shadow-sm",
          navbarStyle,
        )}
      >
        <Wrapper className="p-0">
          <div className={cn("flex h-16 items-center justify-between md:h-20", className)}>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">{logo}</div>
            </div>

            <NavItems links={links} pathname={pathname} className="hidden lg:block" />

            <div className="flex items-center gap-3">
              <SearchDialog />

              {/* Enhanced Cart Button with Badge */}
              <div className="relative">
                <SkiButton
                  href="/shop/cart"
                  variant="ghost"
                  size="icon"
                  isIconOnly
                  icon={<ShoppingCartIcon size={20} />}
                  aria-label={`Shopping cart (${cartItemCount} items)`}
                />
                {cartItemCount > 0 && (
                  <span className="bg-primary absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium text-white">
                    {cartItemCount > 9 ? "9+" : cartItemCount}
                  </span>
                )}
              </div>
              <SkiButton
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </SkiButton>
              {session?.user ? (
                <div className="hidden lg:block">
                  <UserAvatarProfile showInfo />
                </div>
              ) : (
                <div className="hidden gap-3 lg:flex">
                  <SkiButton href="/login" variant="outline" size="xl">
                    Sign in
                  </SkiButton>
                  <SkiButton className={`bg-accent`} variant="primary" href="/signup" size="xl">
                    Sign up
                  </SkiButton>
                </div>
              )}
              <LanguageToggle />
            </div>
          </div>
        </Wrapper>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className={cn(
              "bg-background/95 fixed inset-0 z-40 h-screen w-full backdrop-blur-lg lg:hidden",
              sticky ? "top-16 md:top-20" : "top-0",
              "overflow-y-auto px-4 pt-6",
            )}
          >
            <div className="space-y-6">
              <NavItems pathname={pathname} links={links} isMobile className="flex flex-col gap-2" />

              <div className="border-t pt-4">
                {session?.user ? (
                  <div className="flex flex-col gap-4">
                    <UserAvatarProfile showInfo className="w-full" />
                    <SkiButton href="/account" variant="outline" className="w-full">
                      My Account
                    </SkiButton>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <SkiButton href="/login" className="w-full">
                      Sign in
                    </SkiButton>
                    <SkiButton variant="primary" href="/register" className="w-full">
                      Create account
                    </SkiButton>
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
                <SearchDialog />
              </div>
            </div>
          </div>
        )}
      </nav>
    );
  },
);

Navbar.displayName = "Navbar";
