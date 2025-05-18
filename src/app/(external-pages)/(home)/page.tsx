import { Wrapper } from "@/components/core/layout/wrapper";
import { ReusableBanner } from "@/components/shared/banner";
import { BlackFridayReusableBanner } from "@/components/shared/banner/black-friday";
import { CountdownTimer } from "@/components/shared/banner/black-friday/_components/countdown-timer";
import SkiButton from "@/components/shared/button";
import PlayToWinBanner from "@/modules/play-to-win/banner";
import { Headset, ShieldCheck, Truck } from "lucide-react";

import { MobileDownloadBanner } from "../_components/mobile-download-banner";
import { OptioinCard } from "./_components/option-card";
import { Testimonial } from "./_components/testimonial/testimonial";
import { Categories } from "./_views/categories";
import { FeaturedProducts } from "./_views/featured-products";
import { Hero } from "./_views/hero";
import { PopularProducts } from "./_views/popular-products";
import { TopVendors } from "./_views/top-vendors";

const Page = () => {
  return (
    <>
      <Hero />
      <PopularProducts title={"Skicom Products"} />
      <PopularProducts title={"Top Sellers"} hasAction={false} />
      <Wrapper>
        <PlayToWinBanner />
      </Wrapper>
      <Categories />
      <FeaturedProducts />
      <PopularProducts title={"Featured Products"} />
      <PopularProducts title={"Hand Picked For you"} hasAction={false} />
      <TopVendors />
      <Wrapper className={`my-[78px]`}>
        <ReusableBanner
          action={
            <SkiButton className="px-14" size="xl" variant="primary">
              Explore
            </SkiButton>
          }
          description="Join thousands of vendors already growing their business with Ski-Shop. List your products, reach more customers, and manage orders easily—all in one place."
          image="/images/woman.svg"
          tagTitle="Be A Vendor"
          title="Start Selling on Ski-Shop"
        />
      </Wrapper>
      <Wrapper className={`my-[78px]`}>
        <BlackFridayReusableBanner
          description="Every October, we roll out exclusive deals across gadgets, fashion, home essentials, and more. It’s our annual tradition—don’t miss it!💃"
          image="/images/black-friday-tag.svg"
          tagTitle="Massive Discounts. Limited Time."
          heading={
            <h1 className="mt-4 text-2xl md:text-3xl lg:text-5xl">
              <span className={`text-accent`}>Black Friday </span> Hits Ski-Shop Every Year
            </h1>
          }
        />
      </Wrapper>
      <Wrapper className={`my-[78px]`}>
        <BlackFridayReusableBanner
          asChild
          showSalesTag
          description="Every October, we roll out exclusive deals across gadgets, fashion, home essentials, and more. It’s our annual tradition—don’t miss it!💃"
          image="/images/jbl.svg"
          className={`lg:py-0`}
        >
          <div className={`w-full max-w-[457px] flex-1`}>
            <p className={`text-accent text-lg`}>Black Friday Is Coming...</p>
            <h1 className="mt-4 text-2xl md:text-3xl lg:text-5xl">Coupons, Freebies & Fire Deals Await!</h1>
            <div className={`mt-8`}>
              <CountdownTimer id="sales-countdown" duration="5d 0h 0m 0s" />
            </div>
          </div>
        </BlackFridayReusableBanner>
      </Wrapper>
      <PopularProducts
        headerStyle={`bg-black text-white rounded-se-lg rounded-ss-lg p-[10px]`}
        title={"Black Friday Deals - Up to 70% Off"}
        hasAction={false}
      />
      <Wrapper className={`my-[78px]`}>
        <ReusableBanner
          action={
            <SkiButton className="px-14" size="xl" variant="primary">
              Explore
            </SkiButton>
          }
          description="Help power e-commerce by becoming a logistics partner on Ski-Shop. Whether you ride, drive, or run your own delivery business, we have a place for you. Fast, flexible payouts."
          image="/images/smiling-young-man-.svg"
          tagTitle="Deliver with Us"
          title="Join Our Delivery Network"
          className={`bg-accent/10`}
        />
      </Wrapper>
      <Wrapper className={`my-[78px]`}>
        <Testimonial />
      </Wrapper>
      <Wrapper className={`my-[78px] flex flex-col justify-evenly gap-10 lg:flex-row`}>
        <OptioinCard
          title={"FREE AND FAST DELIVERY"}
          description={"Free delivery for all orders over $140"}
          icon={<Truck className={`h-16 w-16 rounded-full bg-black p-4 text-white`} />}
        />
        <OptioinCard
          title={"24/7 CUSTOMER SERVICE"}
          description={"Friendly 24/7 customer support"}
          icon={<Headset className={`h-16 w-16 rounded-full bg-black p-4 text-white`} />}
        />
        <OptioinCard
          title={"MONEY BACK GUARANTEE"}
          description={"We return money within 30 days"}
          icon={<ShieldCheck className={`h-16 w-16 rounded-full bg-black p-4 text-white`} />}
        />
      </Wrapper>
      <MobileDownloadBanner />
    </>
  );
};
export default Page;
