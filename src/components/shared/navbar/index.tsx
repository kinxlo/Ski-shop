"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import { SearchInput } from "@/components/core/miscellaneous/search-input";
import { ThemeSwitchers } from "@/components/core/miscellaneous/theme-variant-switcher";
import { UserAvatarProfile } from "@/components/core/miscellaneous/user-avatar-profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAppService } from "@/services/externals/app/use-app-service";
import { Menu, ShoppingCartIcon, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import React, { forwardRef, useEffect, useState } from "react";

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

// Custom hook for scroll behavior
const useScrollBehavior = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;

      setIsScrolled(currentScrollY > 500);
      setScrollDirection(isScrollingDown ? "down" : "up");
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return { isScrolled, scrollDirection };
};

export const Navbar = forwardRef<HTMLElement, NavbarProperties>(
  (
    {
      logo = <Logo width={40} logo="/images/skicom-mini.svg" />,
      links = NAV_LINKS,
      className,
      navbarStyle,
      sticky = true,
    },
    reference,
  ) => {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isScrolled, scrollDirection } = useScrollBehavior();
    const { useGetCart } = useAppService();
    const t = useTranslations("navbar");
    const locale = useLocale();
    // Fetch cart data
    const { data: cartResponse } = useGetCart();
    const cartItemCount = cartResponse?.data?.metadata?.total || 0;

    useEffect(() => {
      setIsMobileMenuOpen(false);
    }, [pathname]);

    // Prevent background scrolling when mobile menu is open
    useEffect(() => {
      document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";

      return () => {
        document.body.style.overflow = "unset";
      };
    }, [isMobileMenuOpen]);

    return (
      <nav
        ref={reference}
        className={cn(
          "w-full transition-all duration-500 ease-in-out",
          sticky && "fixed top-0 z-50",
          isScrolled && "bg-background shadow-lg backdrop-blur-md",
          scrollDirection === "down" && isScrolled && "-translate-y-full transform",
          scrollDirection === "up" && isScrolled && "translate-y-0 transform",
          navbarStyle,
        )}
      >
        {/* Full-width background when scrolled */}
        {isScrolled && <div className="bg-background absolute inset-0 -z-10 backdrop-blur-md" />}

        <Wrapper className={cn("p-0")}>
          <div
            className={cn(
              "bg-background flex items-center justify-between rounded-none px-4 transition-all duration-300 lg:mt-7 lg:rounded-full lg:px-7",
              "h-16 md:h-20",
              isScrolled && `!mt-0 rounded-none lg:px-0`,
              className,
            )}
          >
            {/* Logo Section */}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">{logo}</div>
            </div>

            {/* Desktop Navigation */}
            <NavItems
              links={links}
              pathname={pathname}
              className={cn("hidden transition-all duration-300 lg:flex", isScrolled && "scale-95")}
            />

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Search - Hidden on very small screens */}
              <div className="hidden sm:block">
                <SearchDialog />
              </div>

              {/* Enhanced Cart Button with Badge */}
              <div className="relative">
                <SkiButton
                  href="/shop/cart"
                  variant="ghost"
                  size="icon"
                  isIconOnly
                  icon={<ShoppingCartIcon size={isScrolled ? 18 : 20} />}
                  aria-label={t("cart.ariaLabel", { count: cartItemCount })}
                  className="transition-all duration-300"
                />
                {cartItemCount > 0 && (
                  <span className="bg-primary absolute -top-1 -right-1 flex h-5 w-5 animate-pulse items-center justify-center rounded-full text-xs font-medium text-white">
                    {cartItemCount > 9 ? "9+" : cartItemCount}
                  </span>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <SkiButton
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={t("menu.toggleMenu")}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </SkiButton>

              {/* User Actions */}
              {session?.user ? (
                <div className="hidden lg:block">
                  <UserAvatarProfile showInfo />
                </div>
              ) : (
                <div className="hidden gap-2 lg:flex">
                  <SkiButton
                    href="/login"
                    variant="outline"
                    size={isScrolled ? "lg" : "xl"}
                    className="transition-all duration-300"
                  >
                    {t("auth.signIn")}
                  </SkiButton>
                  <SkiButton
                    className="bg-accent transition-all duration-300"
                    variant="primary"
                    href="/signup"
                    size={isScrolled ? "lg" : "xl"}
                  >
                    {t("auth.signUp")}
                  </SkiButton>
                </div>
              )}

              {/* Language Toggle */}
              <div className="hidden lg:block">
                <LanguageToggle />
              </div>
            </div>
          </div>
        </Wrapper>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className={cn(
              "bg-background fixed z-40 w-full backdrop-blur-xl lg:hidden",
              sticky ? "top-16 md:top-20" : "top-0",
              "right-0 bottom-0 left-0",
              "overflow-y-auto",
              "animate-in slide-in-from-top-3 duration-500 ease-out",
            )}
          >
            {/* Header with close button */}
            <div className="bg-background sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4 backdrop-blur-sm">
              <h2 className="!text-primary text-lg font-semibold">Menu</h2>
              <SkiButton
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
                className="h-8 w-8"
              >
                <X className="h-5 w-5" />
              </SkiButton>
            </div>

            <div className="space-y-6 px-6 py-6 pb-8">
              {/* User Profile Header - Mobile-friendly design */}
              {session?.user && (
                <div className="dark:bg-border bg-high-grey-I flex items-center gap-3 rounded-lg p-4">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-accent text-foreground text-[10px]">
                      {session.user.name?.slice(0, 2)?.toUpperCase() || "SK"}
                    </AvatarFallback>
                    {session.user.image && <AvatarImage src={session.user.image} alt={session.user.name || "User"} />}
                  </Avatar>
                  <div className="flex-1">
                    <h6 className="!mb-0 truncate text-sm font-medium">{session.user.name || "User"}</h6>
                    <p className="!mb-0 truncate text-[10px] text-gray-600">{session.user.email}</p>
                  </div>
                </div>
              )}
              {/* Mobile Search - Prominent placement */}
              <div className="space-y-3">
                <SearchInput onSearch={() => {}} className="!w-full" />
              </div>

              {/* Main Navigation Section - Direct mobile-friendly links */}
              <div className="space-y-3">
                <h3 className="!text-primary text-sm font-medium">Navigation</h3>
                <div className="space-y-2">
                  <SkiButton href="/" variant="ghost" className="w-full justify-start" size="sm">
                    Explore
                  </SkiButton>
                  <SkiButton href="/about" variant="ghost" className="w-full justify-start" size="sm">
                    About Us
                  </SkiButton>
                  <SkiButton href="/shop" variant="ghost" className="w-full justify-start" size="sm">
                    Shop
                  </SkiButton>
                  <SkiButton href="/contact" variant="ghost" className="w-full justify-start" size="sm">
                    Contact Us
                  </SkiButton>
                </div>
              </div>

              {/* Quick Actions Section */}
              <div className="space-y-3">
                <h3 className="!text-primary text-sm font-medium">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <SkiButton href={`/${locale}/shop`} variant="outline" className="w-full justify-center" size="sm">
                    Browse Shop
                  </SkiButton>
                  <SkiButton
                    href={`/${locale}/shop/cart`}
                    variant="outline"
                    className="w-full justify-center"
                    size="sm"
                  >
                    View Cart ({cartItemCount})
                  </SkiButton>
                </div>
              </div>

              {/* User Section */}
              <div className="border-t pt-6">
                {session?.user ? (
                  <div className="space-y-4">
                    {/* User Role-Based Navigation */}
                    <div className="space-y-3">
                      <h3 className="!text-primary text-sm font-medium">Dashboard</h3>
                      {session.user.role?.name === "admin" || session.user.role?.name === "super_admin" ? (
                        <div className="space-y-2">
                          <SkiButton href="/admin/home" variant="ghost" className="w-full justify-start" size="sm">
                            Admin Dashboard
                          </SkiButton>
                          <SkiButton href="/admin/users" variant="ghost" className="w-full justify-start" size="sm">
                            Manage Users
                          </SkiButton>
                          <SkiButton href="/admin/products" variant="ghost" className="w-full justify-start" size="sm">
                            Manage Products
                          </SkiButton>
                        </div>
                      ) : session.user.role?.name === "vendor" ? (
                        <div className="space-y-2">
                          <SkiButton
                            href={`/${locale}/dashboard/home`}
                            variant="ghost"
                            className="w-full justify-start"
                            size="sm"
                          >
                            Vendor Dashboard
                          </SkiButton>
                          <SkiButton
                            href={`/${locale}/dashboard/products`}
                            variant="ghost"
                            className="w-full justify-start"
                            size="sm"
                          >
                            My Products
                          </SkiButton>
                          <SkiButton
                            href={`/${locale}/dashboard/orders`}
                            variant="ghost"
                            className="w-full justify-start"
                            size="sm"
                          >
                            Orders
                          </SkiButton>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <SkiButton
                            href={`/${locale}/dashboard/home`}
                            variant="ghost"
                            className="w-full justify-start"
                            size="sm"
                          >
                            My Account
                          </SkiButton>
                          <SkiButton
                            href={`/${locale}/dashboard/orders`}
                            variant="ghost"
                            className="w-full justify-start"
                            size="sm"
                          >
                            My Orders
                          </SkiButton>
                        </div>
                      )}
                    </div>

                    {/* Account Actions */}
                    <div className="space-y-3">
                      <h3 className="!text-primary text-sm font-medium">Account</h3>
                      <div className="space-y-2">
                        <SkiButton
                          href={`/${locale}/dashboard/profile`}
                          variant="ghost"
                          className="w-full justify-start"
                          size="sm"
                        >
                          Profile Settings
                        </SkiButton>
                        <SkiButton
                          href={`/${locale}/dashboard/settings`}
                          variant="ghost"
                          className="w-full justify-start"
                          size="sm"
                        >
                          Account Settings
                        </SkiButton>
                        <SkiButton
                          href={`/${locale}/api/auth/signout`}
                          variant="ghost"
                          className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
                          size="sm"
                        >
                          Sign Out
                        </SkiButton>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="!text-primary text-sm font-medium">Account</h3>
                    <div className="space-y-3">
                      <SkiButton href={`/${locale}/login`} variant="outline" className="w-full">
                        {t("auth.signIn")}
                      </SkiButton>
                      <SkiButton variant="primary" href={`/${locale}/register`} className="w-full">
                        {t("auth.createAccount")}
                      </SkiButton>
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Features Section */}
              <div className="border-t pt-6">
                <div className="space-y-3">
                  <h3 className="!text-primary text-sm font-medium">More</h3>
                  <div className="space-y-2">
                    <SkiButton href={`/${locale}/about`} variant="ghost" className="w-full justify-start" size="sm">
                      About Us
                    </SkiButton>
                    <SkiButton href={`/${locale}/contact`} variant="ghost" className="w-full justify-start" size="sm">
                      Contact Support
                    </SkiButton>
                    <SkiButton href={`/${locale}/help`} variant="ghost" className="w-full justify-start" size="sm">
                      Help Center
                    </SkiButton>
                  </div>
                </div>
              </div>

              {/* Language Toggle - Bottom placement */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between px-2 py-1.5">
                  <ThemeSwitchers className={`flex-col`} />
                </div>
                <div className="space-y-3">
                  <h3 className="!text-primary text-sm font-medium">Language</h3>
                  <LanguageToggle />
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    );
  },
);

Navbar.displayName = "Navbar";
