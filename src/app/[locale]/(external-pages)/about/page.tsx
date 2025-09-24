"use client";

import { Wrapper } from "@/components/core/layout/wrapper";

import { MobileDownloadBanner } from "../_components/mobile-download-banner";
import { Testimonial } from "../(home)/_components/testimonial/testimonial";
import { Hero } from "./_views/Hero";
import { SectionOne } from "./_views/section-one";
import { SectionThree } from "./_views/section-three";
import { SectionTwo } from "./_views/section-two";
import { Teams } from "./_views/teams";

const Page = () => {
  return (
    <main>
      <Hero />
      <Wrapper className={`space-y-8 pb-20 sm:space-y-12 lg:space-y-[48px]`}>
        <SectionOne />
        <SectionTwo />
      </Wrapper>
      <section className={`bg-mid-grey-I`}>
        <Wrapper className={`py-8 sm:py-12 lg:py-16`}>
          <SectionThree />
        </Wrapper>
      </section>
      <Teams />
      <Wrapper className={`space-y-8 p-0 sm:space-y-12 lg:space-y-[48px]`}>
        <section className={`px-4 sm:px-6 lg:px-8`}>
          <Testimonial />
        </section>
        <MobileDownloadBanner />
      </Wrapper>
    </main>
  );
};

export default Page;
