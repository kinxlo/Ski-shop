"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import SkiButton from "@/components/shared/button";
import { useEffect, useState } from "react";

const heroImages = ["/images/shop/hero.svg", "/images/shop/hero.svg", "/images/shop/hero.svg"];

export const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const transitionDuration = 2500;
    const intervalDuration = 10_000;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      const timeout = setTimeout(() => {
        setCurrentImageIndex((previousIndex) => (previousIndex + 1) % heroImages.length);
        setIsTransitioning(true);
      }, transitionDuration);

      return () => clearTimeout(timeout);
    }, intervalDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-subtle relative min-h-[600px]">
      <BlurImage
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-[2.5s] ease-in-out ${
          isTransitioning ? "blur-0 opacity-100" : "opacity-0 blur-md"
        }`}
        style={{
          transition: "opacity 2.5s ease-in-out, filter 2.5s ease-in-out",
        }}
        width={1440}
        height={800}
        src={heroImages[currentImageIndex]}
        alt="hero-image"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

      <Wrapper>
        <div className="relative z-10 flex min-h-[600px] flex-col items-center justify-center text-center text-white">
          <div className="mt-[10rem] max-w-xl space-y-[12px]">
            <h1 className="text-[32px] leading-[44px] font-bold text-white lg:text-[56px] lg:leading-[78px]">
              Shop Smart and Save More with Ski-Shop
            </h1>
            <p className="mb-8 text-lg">Your one-stop marketplace for everything you need</p>
          </div>
          <div className="mx-auto mt-8 flex flex-col items-center gap-4 lg:mx-0 lg:flex-row">
            <SkiButton href={`/`} size={`xl`} className="w-[220px]" variant="primary">
              Shop Now
            </SkiButton>
            <SkiButton href={`/`} size={`xl`} className="w-[220px] text-white" variant="outline">
              Become a Seller
            </SkiButton>
          </div>

          {/* Carousel indicators */}
          <div className="mt-8 flex justify-center gap-2">
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
        </div>
      </Wrapper>
    </section>
  );
};
