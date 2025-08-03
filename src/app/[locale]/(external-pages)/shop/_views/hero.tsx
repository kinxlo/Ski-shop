"use client";

import { BreadCrumb } from "@/components/shared/breadcrumb";
import { useTranslations } from "next-intl";

export const Hero = () => {
  const t = useTranslations("shopPage.hero");

  return (
    <div className="bg-primary flex h-[350px] w-full items-center justify-center bg-[url('/images/about/hero.svg')] bg-center bg-no-repeat lg:h-[510px] xl:bg-cover">
      <div className="mt-[100px] lg:mt-0">
        <h3 className="text-center text-[32px] font-semibold !text-white lg:text-[56px]">{t("title")}</h3>
        <BreadCrumb />
      </div>
    </div>
  );
};
