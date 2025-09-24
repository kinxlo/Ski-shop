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
      image:
        "https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1758741932/skicom/g47kya9mvfyw1cohpbfl.svg",
    },
    {
      title: t("strengths.fastDelivery.title"),
      description: t("strengths.fastDelivery.description"),
      image:
        "https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1758741932/skicom/tprfymnt515vpyvqhyjz.svg",
    },
    {
      title: t("strengths.verifiedVendors.title"),
      description: t("strengths.verifiedVendors.description"),
      image:
        "https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1758741932/skicom/run6ucgrrghlzudanzrz.svg",
    },
    {
      title: t("strengths.seamlessExperience.title"),
      description: t("strengths.seamlessExperience.description"),
      image:
        "https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1758741931/skicom/izsollt1ar7qmlfh04zv.svg",
    },
  ];

  return (
    <section>
      <div className={`space-y-4 text-center`}>
        <h2 className={`text-2xl md:!text-4xl`}>{t("title")}</h2>
        <p className={`mx-auto max-w-2xl sm:!text-lg`}>{t("description")}</p>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-8 sm:mt-8 sm:gap-10 md:grid-cols-2 md:gap-13">
        {OUR_STRENGTH.map((strength) => (
          <AboutCard strength={strength} key={strength.title} />
        ))}
      </div>
    </section>
  );
};
