"use client";

import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import { UniversalSwiper } from "@/components/shared/carousel";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper/types";

type TeamMember = { src: string; alt: string; name: string; role: string };

const TEAM_MEMBERS: TeamMember[] = [
  { src: "/images/auth/woman.svg", alt: "team-member", name: "Alice Johnson", role: "CEO" },
  { src: "/images/smiling-young-man.svg", alt: "team-member", name: "Bob Smith", role: "CTO" },
  { src: "/images/auth/man.svg", alt: "team-member", name: "Charlie Brown", role: "Lead Developer" },
  { src: "/images/woman.svg", alt: "team-member", name: "Diana Prince", role: "Designer" },
  { src: "/images/smiling-young-man-.svg", alt: "team-member", name: "Eve Wilson", role: "Product Manager" },
  { src: "/images/smiling-young-man-.svg", alt: "team-member", name: "Frank Miller", role: "QA Engineer" },
  { src: "/images/smiling-young-man-.svg", alt: "team-member", name: "Grace Lee", role: "Marketing Lead" },
  { src: "/images/smiling-young-man-.svg", alt: "team-member", name: "Henry Davis", role: "Operations Manager" },
];

export const Teams = () => {
  const t = useTranslations("about.teams");
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMember = TEAM_MEMBERS[activeIndex];

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
                ? "h-[220px] w-[220px] sm:h-[240px] sm:w-[240px] lg:h-[350px] lg:w-[350px] relative top-15"
                : "h-[140px] w-[140px] sm:h-[160px] sm:w-[160px] lg:h-[300px] lg:w-[300px] scale-[0.8] relative top-35";

              const ringWidth = isActive ? "ring-[10px]" : "ring-[10px]";
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
                      className="relative rounded-full object-cover object-bottom"
                    />
                  </div>
                </div>
              );
            }}
            swiperOptions={{
              loop: true,
              centeredSlides: true,
              centeredSlidesBounds: true,
              slidesPerView: "auto",
              spaceBetween: "-60",
              speed: 1000,
              slideToClickedSlide: true,
              onSlideChange: (swiper: SwiperType) => setActiveIndex(swiper.realIndex ?? 0),
              breakpoints: {
                640: {
                  slidesPerView: 3,
                  spaceBetween: "-60",
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: "-60",
                },
                1280: {
                  slidesPerView: "auto",
                  spaceBetween: "-60",
                },
              },
            }}
            onSwiperInit={(swiper: SwiperType) => setActiveIndex(swiper.realIndex ?? 0)}
            swiperClassName="overflow-hidden py-8 sm:py-10 h-[220px] lg:h-[350px]"
            slideClassName="!w-auto"
            className="relative mx-auto max-w-[1240p]"
          />

          <div
            className="absolute -top-10 left-1/2 -translate-x-1/2 transform flex-col items-center justify-center rounded-full bg-white/90 p-5 px-10 shadow-sm sm:-top-12 lg:-top-14"
            aria-label="team-detail"
          >
            <p className="!text-primary text-xs !font-bold sm:text-sm">{activeMember.name}</p>
            <p className="text-xs font-semibold text-black sm:text-sm">{activeMember.role}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
