"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export const SectionOne = () => {
  const t = useTranslations("about.sectionOne");

  return (
    <section
      className={`my-[78px] flex max-w-[1240px] flex-col-reverse items-center justify-between gap-20 rounded-lg bg-[#FFF9F2] p-8 lg:flex-row lg:px-[62px] lg:py-[64px]`}
    >
      <div className={`flex-1`}>
        <span className={`text-primary font-semibold`}>{t("tagTitle")}</span>
        <h1 className={`text-high-grey-II`}>{t("title")}</h1>
        <p className={`my-[22px] text-2xl`}>{t("description")}</p>
      </div>
      <div className={``}>
        <Image src="/images/about/woman.svg" alt="wheel" height={440} width={455} />
      </div>
    </section>
  );
};
