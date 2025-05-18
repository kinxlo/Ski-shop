"use client";

import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import { Ratings } from "@/components/shared/ratings";
import { testimonialImages } from "@/lib/constants";
import { useEffect, useState } from "react";

export const Testimonial = () => {
  const [selectedTestimonialIndex, setSelectedTestimonialIndex] = useState(1);
  const [fade, setFade] = useState(true);

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
    <section>
      <section className="my-9 xl:my-14">
        <section className="items-center gap-3 md:flex">
          <div className="flex-1">
            <h6 className="text-primary">Our Testimonials</h6>
            <h1 className="text-high-grey-II mt-2 font-medium">What People Say About Us</h1>
          </div>
          <div className="flex justify-end gap-[15px] xl:gap-[35px]">
            {testimonialImages.map((t, index) =>
              t.image ? (
                <section key={t.id}>
                  <div className="">
                    <BlurImage
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
          <div className="my-7 h-[1px] w-full bg-[#CECECE]" />

          <div className="gap-10 xl:flex">
            <BlurImage
              src={"/images/testimonials/msg.svg"}
              className="hidden h-[200px] w-[270px] object-cover xl:block"
              alt={"msg"}
              width={280}
              height={214}
            />

            <div className="absolute right-0">{<Ratings rating={selectedTestimonial?.rating || 0} />}</div>

            {/* Fade-in/out container */}
            <section
              key={selectedTestimonialIndex}
              className={`transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}
            >
              <div className="relative">
                <div className="flex items-center justify-between">
                  <h3 className="text-[16px] font-semibold text-[#292929] xl:text-[22px]">
                    {selectedTestimonial.name}
                  </h3>
                </div>

                <p className="absolute left-0 mt-1 text-[14px] font-medium text-gray-500 xl:text-[16px]">
                  {selectedTestimonial.position}
                </p>
                <p className="mt-14 max-w-7xl text-justify text-[14px] leading-[23px] lg:text-xl">
                  {selectedTestimonial.message}
                </p>
              </div>
            </section>
          </div>
        </section>
      </section>
    </section>
  );
};
