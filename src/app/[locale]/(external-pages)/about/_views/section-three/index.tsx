"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import { useTranslations } from "next-intl";

import { ServiceCard } from "../../_components/service-card";

export const SectionThree = () => {
  const t = useTranslations("about.sectionThree");

  // Define services using translations
  const OUR_SERVICE = [
    {
      title: t("services.vendors.title"),
      description: t("services.vendors.description"),
      image:
        "https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1758742974/skicom/jhg2r7dedvmhmdhs6dfl.svg",
    },
    {
      title: t("services.buyers.title"),
      description: t("services.buyers.description"),
      image:
        "https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1758742972/skicom/kpwfclns0c9wroe6efy8.svg",
    },
    {
      title: t("services.deliveryPartners.title"),
      description: t("services.deliveryPartners.description"),
      image:
        "https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1758742972/skicom/dxzetakqsdxpyftskqzw.svg",
    },
  ];

  return (
    <Wrapper className={`my-8 py-8`}>
      <div className={`space-y-4 pt-4 text-center sm:pt-6`}>
        <h2 className={`!text-2xl md:!text-4xl`}>{t("title")}</h2>
        <p className={`mx-auto max-w-2xl sm:!text-lg`}>{t("description")}</p>
      </div>
      <div className="mt-6 flex flex-col items-center justify-between gap-4 pb-8 sm:mt-8 sm:pb-10 lg:flex-row lg:pb-10">
        {OUR_SERVICE.map((service) => (
          <ServiceCard strength={service} key={service.title} />
        ))}
      </div>
    </Wrapper>
  );
};
