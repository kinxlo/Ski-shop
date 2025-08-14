"use client";

import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import { useTranslations } from "next-intl";

export const Teams = () => {
  const t = useTranslations("about.teams");

  return (
    <section className="mx-auto mt-3">
      <div className="text-center">
        <div className={`px-4`}>
          <h2 className="text-mid-grey-II mb-2 text-[28px] xl:text-[44px]">{t("title")}</h2>
          <p className="mx-auto max-w-xl text-[16px] text-[#292929] xl:text-xl">{t("description")}</p>
        </div>

        <div className="relative mt-[56px]">
          <BlurImage
            src="/images/about/team.svg"
            width={100}
            height={363}
            alt="teams-img"
            className="mt-20 h-fit w-full object-cover"
          />
          <BlurImage
            src="/images/about/role.png"
            width={185}
            height={90}
            alt="teams-img"
            className="absolute -top-14 left-1/2 h-[70px] w-[140px] -translate-x-1/2 transform"
          />
        </div>
      </div>
    </section>
  );
};
