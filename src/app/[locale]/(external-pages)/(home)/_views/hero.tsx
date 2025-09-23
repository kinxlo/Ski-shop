"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import SkiButton from "@/components/shared/button";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const heroImages = [
  "https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1758668597/skicom/t2kc2sioj4vt4xgiesnw.svg",
  "https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1758668383/skicom/o7xtwrv8bzpcxnwi0x5b.png",
  "https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1758668382/skicom/qjk1ce1ry52i23xe2ggc.png",
];

type Slide = {
  title: string;
  subtitle: string;
  image: string;
};

const slidePositions = ["center", "left", "right"];

const HeroSlide = ({ slide, position, t }: { slide: Slide; position: string; t: (key: string) => string }) => {
  const { data: session } = useSession();

  return (
    <div className="relative min-h-[700px] w-full">
      <BlurImage
        priority
        className="absolute inset-0 h-full w-full object-cover"
        width={1440}
        height={800}
        src={slide.image}
        alt="hero-image"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      <Wrapper>
        <div
          className={cn(
            "relative z-10 flex min-h-[600px] flex-col text-white",
            position === "center"
              ? "items-center justify-center text-center"
              : position === "left"
                ? "items-center justify-center text-center lg:items-start lg:justify-center lg:text-left"
                : "items-center justify-center text-center lg:items-end lg:justify-center lg:text-right",
          )}
        >
          <div className="mt-[10rem] max-w-2xl space-y-[12px]">
            <h1 className="!text-[32px] leading-[44px] font-bold !text-white lg:!text-[48px] lg:leading-[78px]">
              {slide.title}
            </h1>
            <p className="!text-mid-grey-I mb-8 !text-sm lg:!text-base">{slide.subtitle}</p>
          </div>
          <div className="mx-auto mt-8 flex flex-col items-center gap-4 lg:mx-0 lg:flex-row">
            <SkiButton href={`/shop`} size={`xl`} className="w-[220px]" variant="primary">
              {t("shopNow")}
            </SkiButton>
            <SkiButton
              href={`/signup/vendor`}
              size={`xl`}
              className={cn("w-[220px] text-white", session?.user?.role?.name === "vendor" && "hidden")}
              variant="outline"
            >
              {t("becomeSeller")}
            </SkiButton>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const t = useTranslations("home.hero");
  const slides = t.raw("slides");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((previous) => (previous + 1) % heroImages.length);
    }, 10_000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-subtle relative overflow-hidden">
      <div
        className="flex h-full w-[300%] transition-transform duration-[2.5s] ease-in-out"
        style={{ transform: `translateX(-${currentImageIndex * (100 / 3)}%)` }}
      >
        {slides.map((slide: { title: string; subtitle: string }, index: number) => (
          <HeroSlide
            key={index}
            slide={{ ...slide, image: heroImages[index] }}
            position={slidePositions[index]}
            t={t}
          />
        ))}
      </div>

      {/* Carousel indicators */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 transform justify-center gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              currentImageIndex === index ? "bg-accent w-6" : "bg-white"
            }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};
