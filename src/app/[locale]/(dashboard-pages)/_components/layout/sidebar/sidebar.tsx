/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { LocaleLink } from "@/components/shared/locale-link";
import { Logo } from "@/components/shared/logo";
import { sideItems } from "@/lib/constants";
import { LucideProps } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { FC, ForwardRefExoticComponent, RefAttributes } from "react";

interface Iproperties {
  sideNavitems?: {
    route: string;
    link: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    id: string;
  }[];
}

const Sidebar: FC<Iproperties> = ({ sideNavitems = sideItems }) => {
  const pathname = usePathname();
  const tNav = useTranslations("navigation");

  return (
    <>
      {/* Sidebar for large screens */}
      <div className="sticky top-0 hidden h-screen items-center justify-start space-y-[142px] overflow-y-auto border-r bg-white py-[14px] md:block md:w-[100px] md:px-4 lg:w-[252px]">
        <div className="m-auto hidden h-[60px] w-[90px] lg:block">
          <Logo logo={`/images/skicom.svg`} />
        </div>
        <section className="flex flex-col items-center gap-[35px] md:items-stretch">
          {sideNavitems.map((item: any) => (
            <LocaleLink
              key={item.id}
              href={item.link}
              data-testid={item.id}
              className={`${
                pathname.includes(item.id)
                  ? "border-primary bg-accent text-primary border-0 border-l-4"
                  : "text-neutral-dark-2 bg-transparent hover:bg-gray-200"
              } flex items-center justify-center gap-2.5 rounded-full px-2.5 py-3 text-sm transition-all duration-300 ease-in md:h-auto md:w-auto md:justify-start md:rounded-sm`}
            >
              <item.icon className="h-5 w-5" role="sidebar-icon" />
              <span className="hidden lg:block">{tNav(item.id as any) || item.route}</span>
            </LocaleLink>
          ))}
        </section>
      </div>

      {/* Bottom navigation for small-to-medium screens */}
      <div className="fixed right-0 bottom-0 left-0 z-50 flex items-center justify-around border-t bg-white p-2 md:hidden">
        {sideNavitems.map((item: any) => (
          <LocaleLink
            key={item.id}
            href={item.link}
            data-testid={item.id}
            className={`${
              pathname.includes(item.id) ? "text-primary" : "text-neutral-dark-2 hover:text-primary"
            } flex flex-col items-center justify-center transition-all duration-300 ease-in`}
          >
            <item.icon size="16px" role="bottom-nav-icon" />
            <span className="hidden text-xs sm:block">{tNav(item.id as any) || item.route}</span>
          </LocaleLink>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
