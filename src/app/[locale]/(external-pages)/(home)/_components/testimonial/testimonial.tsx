"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import { Ratings } from "@/components/shared/ratings";
import { testimonialImages } from "@/lib/constants";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export const Testimonial = () => {
  const [selectedTestimonialIndex, setSelectedTestimonialIndex] = useState(1);
  const [fade, setFade] = useState(true);
  const t = useTranslations("home.testimonial");

  const handleImageClick = (index: number) => {
    setSelectedTestimonialIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade-out transition

      setTimeout(() => {
        setSelectedTestimonialIndex((previousIndex) => {
          return previousIndex === testimonialImages.length - 1 ? 1 : previousIndex + 1;
        });
        setFade(true); // Start fade-in transition
      }, 500); // Adjust delay time as needed for the fade effect
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const selectedTestimonial = testimonialImages[selectedTestimonialIndex];

  return (
    <Wrapper>
      <section className="flex flex-col gap-6">
        <section className="flex flex-col gap-6">
          <section className="items-center gap-3 md:flex">
            <div className="flex-1 space-y-[6px] lg:space-y-[12px]">
              <h6 className="!text-primary !text-sm !font-semibold md:!text-2xl">{t("tagTitle")}</h6>
              <h2 className="text-base font-medium md:!text-4xl">{t("title")}</h2>
            </div>
            <div className="mt-[22px] flex justify-end gap-[15px] lg:mt-0 xl:gap-[35px]">
              {testimonialImages.map((t, index) =>
                t.image ? (
                  <section key={t.id}>
                    <div className="">
                      <BlurImage
                        priority
                        width={100}
                        height={100}
                        src={t.image}
                        className={`h-10 w-10 cursor-pointer rounded-full object-cover transition-all duration-200 xl:h-20 xl:w-20 ${
                          selectedTestimonialIndex === index
                            ? "border-primary border-2 opacity-100 xl:border-4" // Active state: Double border and full opacity
                            : "border-2 border-gray-300 opacity-50" // Inactive state: Thinner border and faded appearance
                        }`}
                        alt={t.name}
                        onClick={() => handleImageClick(index)}
                      />
                    </div>
                  </section>
                ) : undefined,
              )}
            </div>
          </section>

          <section className="relative">
            <div className="h-[1px] w-full bg-[#CECECE]" />

            <div className="mt-10 gap-10 xl:flex">
              <BlurImage
                priority
                src={
                  "https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1758641970/skicom/l1m07sgrrnuocb7wbpe7.svg"
                }
                className="hidden h-[200px] w-[270px] object-cover xl:block"
                alt={"msg"}
                width={280}
                height={214}
              />

              {/* Fade-in/out container */}
              <section
                key={selectedTestimonialIndex}
                className={`transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}
              >
                <div className="relative space-y-[12px]">
                  <div className="flex items-start justify-between">
                    <div className="">
                      <h5 className="text-base md:!text-2xl">{selectedTestimonial.name}</h5>
                      <p className={`!text-primary !text-xs !font-medium md:!text-xl`}>
                        {selectedTestimonial.position}
                      </p>
                    </div>
                    <Ratings rating={selectedTestimonial?.rating || 0} />
                  </div>
                  <p className="max-w-7xl text-justify text-[14px] lg:!text-xl">{selectedTestimonial.message}</p>
                </div>
              </section>
            </div>
          </section>
        </section>
      </section>
    </Wrapper>
  );
};
