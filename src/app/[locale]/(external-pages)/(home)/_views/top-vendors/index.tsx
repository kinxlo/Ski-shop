"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import { UniversalSwiper } from "@/components/shared/carousel";
import { EmptyState } from "@/components/shared/empty-state";
import { Ratings } from "@/components/shared/ratings";
import { cn } from "@/lib/utils";
import { useAppService } from "@/services/externals/app/use-app-service";
import { StarFilledIcon } from "@radix-ui/react-icons";

export const TopVendors = () => {
  const { useGetAllProducts } = useAppService();
  const { isLoading, isError, data } = useGetAllProducts({ flag: "top" });

  const products: Product[] = data?.data?.items || [];

  if (isError) {
    return (
      <>
        <EmptyState
          className={`space-y-0`}
          title="Failed to load products"
          description="There was an error fetching the products. Please try again later."
          images={[]}
        />
      </>
    );
  }

  if (!products?.length) {
    return (
      <Wrapper className={`my-[78px] min-h-[308px]`}>
        <h2 className={cn("!text-lg lg:!text-4xl lg:!leading-[41.62px] lg:!tracking-[1px]")}>Top Vendors</h2>
        <EmptyState
          images={[
            {
              src: "/images/empty-state.svg",
              alt: "Empty Cart",
              width: 80,
              height: 80,
            },
          ]}
          title="No top vendors found"
          titleClassName={`!text-lg font-bold !text-mid-warning`}
          description={"There are no top vendors available at the moment. Please check back later."}
          descriptionClassName={`text-mid-grey-II`}
          className="bg-mid-grey-I space-y-0 rounded-lg py-10"
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper className={`my-[78px] min-h-[308px]`}>
      <section className={`mb-6`}>
        <h2 className={cn("!text-lg lg:!text-4xl lg:!leading-[41.62px] lg:!tracking-[1px]")}>Top Vendors</h2>
      </section>
      {isLoading ? (
        <TopVendorsSkeleton />
      ) : (
        <UniversalSwiper
          className={`mb-20`}
          items={products}
          renderItem={(product: Product) => (
            <section className={`flex flex-col items-center gap-2 text-center`}>
              <div className={`bg-mid-grey-I size-[120px] overflow-hidden rounded-full p-4`}>
                <BlurImage
                  width={120}
                  height={120}
                  className={`scale-150 object-cover`}
                  src={product.images[0]}
                  alt={product.name}
                />
              </div>
              <p>{product.name}</p>
              <div className={`flex items-center gap-4`}>
                <Ratings rating={3} />
                <p>({`${product?.stockCount}` || 0})</p>
              </div>
            </section>
          )}
          swiperOptions={{
            spaceBetween: 24,
          }}
          showPagination
          showNavigation
          breakpoints={{
            0: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 6 },
          }}
        />
      )}
    </Wrapper>
  );
};

export const TopVendorsSkeleton = () => {
  return (
    <Wrapper className="mb-[78px]">
      <div className="flex justify-between gap-6 overflow-hidden">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex min-w-[150px] flex-col items-center gap-4">
            {/* Image placeholder */}
            <div className="h-[120px] w-[120px] animate-pulse rounded-full bg-gray-200" />

            {/* Title placeholder */}
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

            {/* Rating placeholder */}
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, index_) => (
                  <StarFilledIcon key={index_} className={`text-gray-200`} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};
