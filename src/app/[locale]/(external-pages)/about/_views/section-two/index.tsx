"use client";

import { useTranslations } from "next-intl";

import { AboutCard } from "../../_components/about-card";

export const SectionTwo = () => {
  const t = useTranslations("about.sectionTwo");

  // Define strengths using translations
  const OUR_STRENGTH = [
    {
      title: t("strengths.securedPayment.title"),
      description: t("strengths.securedPayment.description"),
      image: "/images/about/illustration-1.svg",
    },
    {
      title: t("strengths.fastDelivery.title"),
      description: t("strengths.fastDelivery.description"),
      image: "/images/about/illustration-2.svg",
    },
    {
      title: t("strengths.verifiedVendors.title"),
      description: t("strengths.verifiedVendors.description"),
      image: "/images/about/illustration-3.svg",
    },
    {
      title: t("strengths.seamlessExperience.title"),
      description: t("strengths.seamlessExperience.description"),
      image: "/images/about/illustration-4.svg",
    },
  ];

  return (
    <section>
      <div className={`space-y-4 text-center`}>
        <h2 className={``}>{t("title")}</h2>
        <p className={`text-mid-grey-II mx-auto max-w-2xl text-lg`}>{t("description")}</p>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-13 md:grid-cols-2">
        {OUR_STRENGTH.map((strength) => (
          <AboutCard strength={strength} key={strength.title} />
        ))}
      </div>
    </section>
  );
};
