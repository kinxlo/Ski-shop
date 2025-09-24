"use client";

import { BreadCrumb } from "@/components/shared/breadcrumb";
import { useTranslations } from "next-intl";

export const Hero = () => {
  const t = useTranslations("about.hero");

  return (
    <div className="flex h-[300px] w-full items-center justify-center bg-[url('/images/shop/shop-hero.svg')] bg-center bg-no-repeat md:h-[400px] lg:h-[510px] xl:bg-cover">
      <div className="mt-[50px] md:mt-[80px] lg:mt-0">
        <h3 className="text-center text-2xl font-semibold !text-white md:text-4xl lg:text-[56px]">{t("title")}</h3>
        <BreadCrumb />
      </div>
    </div>
  );
};
