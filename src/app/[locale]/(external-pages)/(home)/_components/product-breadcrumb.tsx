"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
// import { usePathname } from "next/navigation";
import { PiHouse } from "react-icons/pi";

interface ProductBreadcrumbProperties {
  productTitle: string;
}

export const ProductBreadcrumb = ({ productTitle }: ProductBreadcrumbProperties) => {
  //   const pathName = usePathname();
  //   const paths = pathName.split("/").filter(Boolean);

  return (
    <div className="bg-high-grey-I dark:bg-[#111111]">
      <main className="mx-auto max-w-7xl px-4 py-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="flex items-center gap-1 text-xs md:text-sm">
                <PiHouse size={16} />
                <span>Home</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className={`text-xs md:text-sm`} href="/shop">
                Shop
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className={`text-xs md:text-sm`}>{productTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </main>
    </div>
  );
};
