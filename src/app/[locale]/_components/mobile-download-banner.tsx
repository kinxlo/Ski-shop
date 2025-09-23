import { Wrapper } from "@/components/core/layout/wrapper";
import { ReusableBanner } from "@/components/shared/banner";
import SkiButton from "@/components/shared/button";
import { FaApple, FaGooglePlay } from "react-icons/fa";

export const MobileDownloadBanner = () => {
  return (
    <Wrapper className={`my-[78px]`}>
      <ReusableBanner
        asChild
        image="/images/phone.svg"
        imageStyle={`lg:right-[5rem] bottom-[-3rem] lg:bottom-[-1rem] block`}
        className={`min-h-[493px] flex-col overflow-hidden rounded-[25px] bg-black text-white`}
      >
        <div className={`w-full max-w-[457px] flex-1`}>
          <h3 className="mt-4 text-xl !text-white md:text-2xl lg:text-3xl">
            Shop Smarter and Faster Anywhere You Are.
          </h3>
          <p className={`text-mid-grey-II my-[22px] text-lg font-[300] lg:text-lg`}>
            Get the Ski-Shop app and unlock seamless shopping, faster deliveries, wallet access, and exclusive deals all
            in your pocket.
          </p>
          <div className={`mt-8 flex flex-col gap-4 lg:flex-row`}>
            <SkiButton className={`h-[50px] w-full rounded-md px-4`}>
              <section className={`flex items-center gap-2`}>
                <FaApple size={`2rem`} />
                <div className={`flex flex-col items-start space-y-[-0.2rem]`}>
                  <span className={`text-xs`}>Download on the</span>
                  <span className={`text-lg`}>App Store</span>
                </div>
              </section>
            </SkiButton>
            <SkiButton className={`h-[50px] w-full rounded-md px-4`}>
              <section className={`flex items-center gap-2`}>
                <FaGooglePlay size={`2rem`} />
                <div className={`flex flex-col items-start space-y-[-0.2rem]`}>
                  <span className={`text-xs`}>Download on the</span>
                  <span className={`text-lg`}>Gogle Play</span>
                </div>
              </section>
            </SkiButton>
          </div>
        </div>
      </ReusableBanner>
    </Wrapper>
  );
};
