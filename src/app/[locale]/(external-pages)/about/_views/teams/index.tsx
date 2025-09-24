"use client";

import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import { UniversalSwiper } from "@/components/shared/carousel";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper/types";

type TeamMember = { src: string; alt: string };

const TEAM_MEMBERS: TeamMember[] = [
  { src: "/images/auth/woman.svg", alt: "team-member" },
  { src: "/images/smiling-young-man.svg", alt: "team-member" },
  { src: "/images/auth/man.svg", alt: "team-member" },
  { src: "/images/woman.svg", alt: "team-member" },
  { src: "/images/smiling-young-man-.svg", alt: "team-member" },
  { src: "/images/smiling-young-man-.svg", alt: "team-member" },
  { src: "/images/smiling-young-man-.svg", alt: "team-member" },
  { src: "/images/smiling-young-man-.svg", alt: "team-member" },
];

export const Teams = () => {
  const t = useTranslations("about.teams");
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="mx-auto">
      <div className="text-center">
        <div className="space-y-4 p-4 sm:p-6 lg:p-8">
          <h2 className="!text-2xl md:!text-4xl">{t("title")}</h2>
          <p className="mx-auto max-w-xl md:!text-lg">{t("description")}</p>
        </div>

        <div className="relative mt-8 sm:mt-12 lg:mt-[56px]">
          <UniversalSwiper
            items={TEAM_MEMBERS}
            renderItem={(member, index) => {
              const isActive = index === activeIndex;

              const sizeClasses = isActive
                ? "h-[220px] w-[220px] sm:h-[240px] sm:w-[240px] lg:h-[350px] lg:w-[350px] relative top-10 z-[999]"
                : "h-[140px] w-[140px] sm:h-[160px] sm:w-[160px] lg:h-[300px] lg:w-[300px] scale-[0.8] relative top-30 z-[-999]";

              const ringWidth = isActive ? "ring-[8px]" : "ring-[6px]";
              const bgColor = isActive ? "bg-primary" : "bg-low-blue";

              return (
                <div className="">
                  <div className={` ${sizeClasses} bg-primary shrink-0 rounded-full transition-all duration-500`}>
                    <div
                      className={`absolute inset-0 overflow-hidden rounded-full ${bgColor} ring-white ${ringWidth} shadow-md`}
                    />
                    <BlurImage
                      priority
                      src={member.src}
                      alt={member.alt}
                      fill
                      className="rounded-full object-cover object-bottom"
                    />
                  </div>
                </div>
              );
            }}
            swiperOptions={{
              loop: true,
              centeredSlides: true,
              slidesPerView: "6",
              spaceBetween: "-100",
              speed: 1000,
              onSwiper: (swiper: SwiperType) => setActiveIndex(swiper.realIndex ?? 0),
              onSlideChange: (swiper: SwiperType) => setActiveIndex(swiper.realIndex ?? 0),
            }}
            swiperClassName="overflow-hidden py-8 sm:py-10"
            slideClassName="!w-auto"
            className="relative mx-auto max-w-[1240px]"
          />

          <BlurImage
            priority
            src="/images/about/role.png"
            width={185}
            height={90}
            alt="teams-role"
            className="absolute -top-10 left-1/2 h-[60px] w-[120px] -translate-x-1/2 transform sm:-top-12 sm:h-[70px] sm:w-[140px] lg:-top-14"
          />
        </div>
      </div>
    </section>
  );
};
