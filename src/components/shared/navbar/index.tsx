"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { forwardRef, useEffect, useState } from "react";

import SkiButton from "../button";
import { Logo } from "../logo";
import { SearchDialog } from "./_components/search-modal";
import { NavItems } from "./nav-menu-item";

export const Navbar = forwardRef<HTMLElement, NavbarProperties>(
  (
    { logo = <Logo logo="/images/skicom.svg" />, links = NAV_LINKS, cta, user, className, navbarStyle, sticky = true },
    reference,
  ) => {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
      setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
      <nav
        ref={reference}
        className={cn("w-full transition-all duration-300", sticky && "fixed top-0 z-50", navbarStyle)}
      >
        <Wrapper className={`p-0`}>
          <div className={cn("flex h-16 items-center justify-between md:h-24", className)}>
            <div className="flex-shrink-0">{logo}</div>
            <NavItems links={links} pathname={pathname} className="hidden lg:block" />
            <div className="flex items-center gap-4">
              <SearchDialog />
              {user || cta || (
                <div className="hidden gap-4 lg:flex">
                  <SkiButton href="/login">Sign in</SkiButton>
                  <SkiButton variant="accent" href="/register">
                    Sign up
                  </SkiButton>
                </div>
              )}

              <SkiButton
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </SkiButton>
            </div>
          </div>
        </Wrapper>

        {isMobileMenuOpen && (
          <div
            className={cn(
              "fixed inset-x-0 z-40 w-full bg-white shadow-md lg:hidden",
              sticky ? "top-16 md:top-20" : "top-0",
            )}
          >
            <div className="space-y-2 px-4 py-3">
              <NavItems pathname={pathname} links={links} isMobile />
              {!user && (
                <div className="flex flex-col space-y-2 pt-2">
                  <SkiButton href="/login" className="w-full">
                    Sign in
                  </SkiButton>
                  <SkiButton variant="primary" href="/signup" className="w-full">
                    Sign up
                  </SkiButton>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    );
  },
);

Navbar.displayName = "Navbar";
