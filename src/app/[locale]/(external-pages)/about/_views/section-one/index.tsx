"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export const SectionOne = () => {
  const t = useTranslations("about.sectionOne");

  return (
    <section
      className={`my-[78px] flex max-w-[1240px] flex-col-reverse items-center justify-between gap-20 rounded-lg bg-[#FFF9F2] p-8 lg:flex-row lg:px-[62px] lg:py-[64px] dark:bg-[#111111]`}
    >
      <div className={`flex-1`}>
        <span className={`text-primary font-semibold`}>{t("tagTitle")}</span>
        <h2 className={`pt-4`}>{t("title")}</h2>
        <p className={`text-mid-grey-II my-[22px] text-lg`}>{t("description")}</p>
      </div>
      <div className={``}>
        <Image src="/images/about/woman.svg" alt="wheel" height={440} width={455} />
      </div>
    </section>
  );
};
