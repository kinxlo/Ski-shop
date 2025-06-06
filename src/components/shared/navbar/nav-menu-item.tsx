"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import * as React from "react";

interface NavItemProperties extends React.HTMLAttributes<HTMLElement> {
  links: NavLink[];
  isMobile?: boolean;
  pathname: string;
}

interface ListItemProperties extends LinkProps {
  title: string;
  className?: string;
  children?: React.ReactNode;
}

export const NavItems: React.FC<NavItemProperties> = ({ links, isMobile, className, pathname }) => {
  return (
    <NavigationMenu className={cn(isMobile && "block max-w-full", className)}>
      <NavigationMenuList className={cn(isMobile && "block")}>
        {links.map((link, index) => {
          const isActive = pathname === link.href;

          if (link.type === "dropdown" && link.subLinks) {
            const isDropdownActive = link.subLinks.some((subLink) => pathname === subLink.href);

            return (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger className={cn("w-full", isDropdownActive && "text-accent")}>
                  {link.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[600px] md:grid-cols-2">
                    {link.subLinks.map((subLink) => (
                      <ListItem
                        key={subLink.id}
                        href={subLink.href}
                        title={subLink.title}
                        className={cn(pathname === subLink.href && "bg-accent text-accent-foreground")}
                      >
                        {subLink.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem key={index}>
              <NavigationMenuLink
                className={`transition-all hover:bg-transparent hover:text-black hover:underline focus:bg-transparent focus:text-black`}
                asChild
              >
                <Link
                  href={link.href}
                  className={cn(navigationMenuTriggerStyle(), "w-full", isActive && "text-primary underline")}
                >
                  {link.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProperties>(
  ({ className, title, children, href, ...properties }, reference) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={reference}
            href={href}
            className={cn(
              "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
              className,
            )}
            {...properties}
          >
            <div className="text-sm leading-none font-medium">{title}</div>
            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";
