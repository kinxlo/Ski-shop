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
      <Wrapper className={`space-y-[48px]`}>
        <SectionOne />
        <SectionTwo />
      </Wrapper>
      <section className={`bg-mid-grey-I dark:bg-[#111111]`}>
        <Wrapper className={``}>
          <SectionThree />
        </Wrapper>
      </section>
      <Teams />
      <Wrapper className={`space-y-[48px] p-0`}>
        <section className={`px-4`}>
          <Testimonial />
        </section>
        <MobileDownloadBanner />
      </Wrapper>
    </main>
  );
};

export default Page;
