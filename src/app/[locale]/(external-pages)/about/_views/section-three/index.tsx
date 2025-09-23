"use client";

import { useTranslations } from "next-intl";

import { ServiceCard } from "../../_components/service-card";

export const SectionThree = () => {
  const t = useTranslations("about.sectionThree");

  // Define services using translations
  const OUR_SERVICE = [
    {
      title: t("services.vendors.title"),
      description: t("services.vendors.description"),
      image: "/images/about/vendor.svg",
    },
    {
      title: t("services.buyers.title"),
      description: t("services.buyers.description"),
      image: "/images/about/buyer.svg",
    },
    {
      title: t("services.deliveryPartners.title"),
      description: t("services.deliveryPartners.description"),
      image: "/images/about/partner.svg",
    },
  ];

  return (
    <section className={`my-30`}>
      <div className={`space-y-4 pt-6 text-center`}>
        <h2 className={``}>{t("title")}</h2>
        <p className={`text-mid-grey-II mx-auto max-w-2xl text-lg`}>{t("description")}</p>
      </div>
      <div className="mt-8 flex flex-col items-center justify-between gap-4 pb-10 lg:flex-row">
        {OUR_SERVICE.map((service) => (
          <ServiceCard strength={service} key={service.title} />
        ))}
      </div>
    </section>
  );
};
