import { Wrapper } from "@/components/core/layout/wrapper";
import SkiButton from "@/components/shared/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export const FeaturedProducts = () => {
  return (
    <Wrapper className="mx-auto mb-[98px] grid gap-4 px-4 md:grid-cols-2">
      {/* Large Earbuds Banner */}

      <div className="bg-low-blue overflow-hidden rounded-2xl bg-[url('/images/shop/fi-1.svg')] bg-cover bg-center bg-no-repeat sm:min-h-[400px]">
        <div className="mt-[33px] transform space-y-4 text-center">
          <h1 className="font-semibold">Minimal Earbuds</h1>
          <SkiButton
            isRightIconVisible
            icon={<ArrowRight />}
            variant="primary"
            size="lg"
            className="rounded-full bg-[#112BB1] transition duration-200 hover:bg-[#0E1A8D]"
          >
            Shop Now
          </SkiButton>
        </div>
      </div>

      {/* Smartwatch and Tablet Grid */}
      <div className="space-y-4">
        <div className="bg-low-success overflow-hidden rounded-2xl bg-[url('/images/shop/fi-2.svg')] bg-cover bg-center bg-no-repeat">
          {/* Content wrapper */}
          <div className="w-full p-4 sm:p-6 lg:p-8">
            <Badge className="bg-mid-success mb-4 rounded-sm text-white sm:mb-6 lg:mb-8">Best Offer!</Badge>

            <h4 className="mb-3 text-xl font-semibold sm:text-2xl lg:text-3xl">
              Apple Smart <br /> Watch Pro
            </h4>

            <div className="mb-4 flex items-center gap-2 sm:mb-6 lg:mb-8">
              <p className="text-mid-success text-lg font-medium sm:text-xl">₦{`250,000`}</p>
              <p className="text-sm text-gray-500 line-through sm:text-base">₦{`350,000`}</p>
            </div>

            <SkiButton
              isRightIconVisible
              icon={<ArrowRight />}
              variant="primary"
              size="lg"
              className="w-full rounded-full bg-black transition duration-200 hover:bg-[#0E1A8D] sm:w-auto"
            >
              Shop Now
            </SkiButton>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl bg-[url('/images/shop/fi-2.svg')] bg-cover bg-center bg-no-repeat">
          {/* Content wrapper */}
          <div className="w-full p-4 sm:p-6 lg:p-8">
            <p className="mb-4 text-sm font-medium text-[#112BB1] sm:mb-6 lg:mb-8">Starting At Only ₦200,000</p>
            <h4 className="mb-3 text-xl font-semibold sm:text-2xl lg:text-3xl">
              Samsung Galaxy
              <br /> Tab A8
            </h4>

            <div className="mb-4 flex items-center gap-2 sm:mb-6 lg:mb-8">
              <p className="text-mid-grey-II text-sm font-medium">
                The Samsung Galaxy Tab A8 64GB <br /> WiFi Gray is a mid-range tablet
              </p>
            </div>

            <SkiButton
              isRightIconVisible
              icon={<ArrowRight />}
              variant="primary"
              size="lg"
              className="w-full rounded-full bg-black transition duration-200 hover:bg-[#0E1A8D] sm:w-auto"
            >
              Shop Now
            </SkiButton>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
