"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import { ReusableBanner } from "@/components/shared/banner";
import { BlackFridayReusableBanner } from "@/components/shared/banner/black-friday";
import { CountdownTimer } from "@/components/shared/banner/black-friday/_components/countdown-timer";
import SkiButton from "@/components/shared/button";
import PlayToWinBanner from "@/modules/play-to-win/banner";
import { useAppService } from "@/services/externals/app/use-app-service";
import { Headset, ShieldCheck, Truck } from "lucide-react";
import { useTranslations } from "next-intl";

import { MobileDownloadBanner } from "../_components/mobile-download-banner";
import { OptioinCard } from "./_components/option-card";
import { Testimonial } from "./_components/testimonial/testimonial";
import { Categories } from "./_views/categories";
import { FeaturedProducts } from "./_views/featured-products";
import { Hero } from "./_views/hero";
import { PopularProducts } from "./_views/popular-products";
import { SkicomProducts } from "./_views/skicom-products";
import { TopVendors } from "./_views/top-vendors";

const Page = () => {
  const t = useTranslations("home");
  const { useGetTopVendors } = useAppService();
  const { data: dataVendors } = useGetTopVendors();
  const skishop = dataVendors?.data?.items.find((vendor) => vendor.name.toLowerCase().includes(`ski`));
  return (
    <>
      <Hero />
      <SkicomProducts title={t("skicomProducts")} storeId={skishop?.id} />
      <PopularProducts title={t("topSellers")} hasAction={false} flag="top" />
      <Wrapper>
        <PlayToWinBanner />
      </Wrapper>
      <Categories />
      <FeaturedProducts />
      <Wrapper className={`my-[78px] mt-[10rem]`}>
        <ReusableBanner
          textClassName={`max-w-[900px] lg:pr-[40%]`}
          action={
            <SkiButton href={`/signup/vendor`} className="px-14" size="xl" variant="primary">
              {"Get Started"}
            </SkiButton>
          }
          description={
            "Invite friends and family to shop on Ski-Shop and earn exciting rewards when they sign up and place their first order."
          }
          image="https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1758641973/skicom/meog7pfhsglhvjawbc2o.svg"
          imageStyle={`!w-[524px] !h-[418px] absolute !bottom-10 !right-10`}
          tagTitle={"Refer & Earn"}
          title={"Turn Your Network to Rewards"}
          className={`relative bg-[#E2F4FF]`}
        />
      </Wrapper>
      <PopularProducts title={t("featuredProducts")} flag="featured" />
      <PopularProducts title={t("handPickedForYou")} hasAction={false} flag="handpicked" />
      <TopVendors />
      <Wrapper className={`my-[78px]`}>
        <ReusableBanner
          action={
            <SkiButton href={`/signup/vendor`} className="px-14" size="xl" variant="primary">
              {t("beAVendor.action")}
            </SkiButton>
          }
          description={t("beAVendor.description")}
          image="https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1758641969/skicom/rzixupei0jmxjjfkv6mg.png"
          tagTitle={t("beAVendor.tagTitle")}
          title={t("beAVendor.title")}
          className={`bg-[url(https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1758712177/skicom/kisfpnyvjvgoz198tu3z.svg)] bg-right bg-no-repeat dark:bg-[#E2F4FF]`}
          textClassName={`max-w-[1000px] lg:pr-[40%]`}
        />
      </Wrapper>
      <Wrapper className={`my-[78px]`}>
        <BlackFridayReusableBanner
          description={t("blackFriday.description")}
          image="/images/black-friday-tag.svg"
          // image="https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1758641969/skicom/jd4cghgscojdft8wizdj.png"
          tagTitle={t("blackFriday.tagTitle")}
          heading={
            <h1 className="mt-4 !text-2xl !text-white md:!text-3xl lg:!w-[500px] lg:!text-5xl">
              <span className={`text-accent`}>Black Friday </span> {t("blackFriday.title")}
            </h1>
          }
        />
      </Wrapper>
      <Wrapper className={`my-[78px]`}>
        <BlackFridayReusableBanner
          asChild
          showSalesTag
          description={t("blackFriday.comingSoon.description")}
          image="/images/jbl.svg"
          // image="https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1758641976/skicom/yeotmta3qswfm7iq0zes.png"
          className={`lg:py-0`}
        >
          <div className={`w-full max-w-[457px] flex-1`}>
            <p className={`!text-accent !text-lg`}>{t("blackFriday.comingSoon.tagTitle")}</p>
            <h1 className="mt-4 !text-2xl !text-white md:!text-3xl lg:!text-5xl">
              {t("blackFriday.comingSoon.title")}
            </h1>
            <div className={`mt-8`}>
              <CountdownTimer id="sales-countdown" duration="5d 0h 0m 0s" />
            </div>
          </div>
        </BlackFridayReusableBanner>
      </Wrapper>
      <PopularProducts
        headerStyle={`bg-black !text-white rounded-se-lg rounded-ss-lg p-[10px]`}
        title={t("blackFridayDeals")}
        hasAction={false}
        flag="blackFriday"
      />
      <Wrapper className={`my-[78px]`}>
        <ReusableBanner
          action={
            <SkiButton href={`/signup/vendor`} className="px-14" size="xl" variant="primary">
              {t("deliveryNetwork.action")}
            </SkiButton>
          }
          description={t("deliveryNetwork.description")}
          image="https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1758641975/skicom/qvb0ok9axlax3hjpcg5n.png"
          tagTitle={t("deliveryNetwork.tagTitle")}
          title={t("deliveryNetwork.title")}
          className={`bg-accent/10`}
          textClassName={`max-w-[1200px] lg:pr-[40%]`}
        />
      </Wrapper>
      <Wrapper className={`my-[78px]`}>
        <Testimonial />
      </Wrapper>
      <Wrapper className={`my-[78px] flex flex-col justify-evenly gap-10 lg:flex-row`}>
        <OptioinCard
          title={t("features.freeDelivery.title")}
          description={t("features.freeDelivery.description")}
          icon={<Truck className={`h-16 w-16 rounded-full bg-black p-4 text-white`} />}
        />
        <OptioinCard
          title={t("features.customerService.title")}
          description={t("features.customerService.description")}
          icon={<Headset className={`h-16 w-16 rounded-full bg-black p-4 text-white`} />}
        />
        <OptioinCard
          title={t("features.moneyBack.title")}
          description={t("features.moneyBack.description")}
          icon={<ShieldCheck className={`h-16 w-16 rounded-full bg-black p-4 text-white`} />}
        />
      </Wrapper>
      <MobileDownloadBanner />
    </>
  );
};
export default Page;
