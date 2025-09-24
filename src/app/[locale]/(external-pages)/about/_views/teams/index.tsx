"use client";

import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import { useTranslations } from "next-intl";

export const Teams = () => {
  const t = useTranslations("about.teams");

  return (
    <section className="mx-auto">
      <div className="text-center">
        <div className={`space-y-4 p-4 sm:p-6 lg:p-8`}>
          <h2 className={`!text-2xl md:!text-4xl`}>{t("title")}</h2>
          <p className="text-mid-grey-II mx-auto max-w-xl text-base sm:text-lg">{t("description")}</p>
        </div>

        <div className="relative mt-8 sm:mt-12 lg:mt-[56px]">
          <BlurImage
            src="/images/about/team.svg"
            width={100}
            height={363}
            alt="teams-img"
            className="mt-12 h-fit w-full object-cover sm:mt-16 lg:mt-20"
          />
          <BlurImage
            src="/images/about/role.png"
            width={185}
            height={90}
            alt="teams-img"
            className="absolute -top-10 left-1/2 h-[60px] w-[120px] -translate-x-1/2 transform sm:-top-12 sm:h-[70px] sm:w-[140px] lg:-top-14"
          />
        </div>
      </div>
    </section>
  );
};
