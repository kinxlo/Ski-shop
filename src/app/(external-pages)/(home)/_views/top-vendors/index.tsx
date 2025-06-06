"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import { UniversalSwiper } from "@/components/shared/carousel";
import { EmptyState } from "@/components/shared/empty-state";
import { Ratings } from "@/components/shared/ratings";
import { useAppService } from "@/services/app/use-app-service";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

export const TopVendors = () => {
  const { useGetAllProducts } = useAppService();
  const { isLoading, isError, error, data } = useGetAllProducts();

  const products: Product[] = data?.products || [];

  if (isError) {
    toast.error("Something went wrong", {
      description: error?.message,
    });
    return (
      <>
        <EmptyState
          title="No trending products at the moment."
          description="There are no best selling products yet."
          images={[]}
        />
      </>
    );
  }

  return (
    <Wrapper className={`my-[78px] min-h-[308px]`}>
      <section className={`mb-6`}>
        <h1 className="text-h3 sm:text-h3-sm md:text-h3-md text-high-grey-II">Top Vendors</h1>
      </section>
      {isLoading ? (
        <TopVendorsSkeleton />
      ) : (
        <UniversalSwiper
          className={`mb-20`}
          items={products}
          renderItem={(product: Product) => (
            <section className={`flex flex-col items-center gap-2 text-center`}>
              <div className={`bg-mid-grey-I rounded-full p-4`}>
                <BlurImage width={120} height={120} src={product.thumbnail} alt={product.title} />
              </div>
              <p>{product.title}</p>
              <div className={`flex items-center gap-4`}>
                <Ratings rating={product.rating} />
                <p>({`${product.reviews.length}`})</p>
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
