"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import { Ratings } from "@/components/shared/ratings";
import { Badge } from "@/components/ui/badge";
import { useAppService } from "@/services/app/use-app-service";
import { toast } from "sonner";

// Skeleton Loader Component
const FeaturedProductsSkeleton = () => {
  return (
    <Wrapper className="mx-auto my-[98px] grid gap-4 px-4 md:grid-cols-2">
      {/* Large Earbuds Banner Skeleton */}
      <div className="row-span-2 flex h-[300px] animate-pulse items-center justify-center rounded-2xl bg-gray-200 sm:min-h-[630px]">
        <div className="h-10 w-3/4 rounded bg-gray-300"></div>
      </div>

      {/* Smartwatch and Tablet Grid Skeletons */}
      <div className="flex h-[200px] animate-pulse items-center justify-center rounded-2xl bg-gray-200 md:h-full">
        <div className="space-y-4">
          <div className="h-4 w-20 rounded bg-gray-300"></div>
          <div className="h-6 w-32 rounded bg-gray-300"></div>
          <div className="h-4 w-24 rounded bg-gray-300"></div>
        </div>
      </div>

      <div className="flex h-[200px] animate-pulse items-center justify-center rounded-2xl bg-gray-200 md:h-full">
        <div className="space-y-4">
          <div className="h-4 w-20 rounded bg-gray-300"></div>
          <div className="h-6 w-32 rounded bg-gray-300"></div>
          <div className="h-4 w-24 rounded bg-gray-300"></div>
        </div>
      </div>
    </Wrapper>
  );
};

export const FeaturedProducts = () => {
  const { useGetAllProducts } = useAppService();
  const { isLoading, isError, error, data } = useGetAllProducts();

  // Handle loading state
  if (isLoading) {
    return <FeaturedProductsSkeleton />;
  }

  // Handle error state
  if (isError) {
    toast.error("Something went wrong", {
      description: error?.message,
    });
    return <FeaturedProductsSkeleton />; // Show skeleton even on error if preferred
  }

  // Extract featured products from data or use fallbacks
  const featuredProducts = data?.products?.slice(0, 4);

  return (
    <Wrapper className="mx-auto my-[98px] grid gap-2 px-4 md:grid-cols-2 lg:gap-8">
      {/* Large Earbuds Banner */}
      <section className="group relative row-span-2 overflow-hidden rounded-md sm:min-h-[630px]">
        <div
          style={{
            backgroundImage: `url(${featuredProducts?.[0].images[0]})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="absolute inset-0 z-[1] h-full w-full bg-black transition-all duration-300 group-hover:scale-105 group-hover:blur-sm"
        />
        <div className="backdrop-blur-0 relative z-[2] flex h-full transform flex-col justify-between gap-10 p-6 text-white transition-all duration-300 group-hover:backdrop-blur-[2px]">
          <Badge variant={`default`} className={`bg-accent rounded-md px-[12px] py-[6px]`}>
            Sponsored Ad
          </Badge>
          <div className={`space-y-2`}>
            <p className="line-clamp-2 text-xs font-medium lg:text-xl">{featuredProducts?.[0].title}</p>
            <p className="text-mid-grey-II line-clamp-2 max-w-[300px] text-xs font-light lg:text-sm">
              {featuredProducts?.[0].description}
            </p>
            <Ratings rating={featuredProducts?.[0].rating || 0} />
            <p className={`text-mid-grey-II text-[10px] underline lg:text-sm`}>By Skicom</p>
            <div className="flex items-baseline gap-2">
              <p className="text-accent text-xs font-medium lg:text-2xl">
                ₦{featuredProducts?.[0].price.toLocaleString()}
              </p>
              {featuredProducts?.[0].price && (
                <p className="text-mid-danger text-sm line-through lg:text-xl">
                  ₦{featuredProducts?.[0].price.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Smartwatch Card */}
      <section className="group relative overflow-hidden rounded-md">
        <div
          style={{
            backgroundImage: `url(${featuredProducts?.[1].thumbnail})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
            backgroundSize: "contain",
          }}
          className="absolute inset-0 z-[1] h-full w-full bg-black transition-all duration-300 group-hover:scale-105 group-hover:blur-sm"
        />
        <div className="backdrop-blur-0 relative z-[2] flex h-full transform flex-col justify-between gap-10 p-6 text-white transition-all duration-300 group-hover:backdrop-blur-[2px]">
          <Badge variant={`default`} className={`bg-accent rounded-md px-[12px] py-[6px]`}>
            Sponsored Ad
          </Badge>
          <div className={`space-y-2`}>
            <p className="line-clamp-2 text-xs font-medium lg:text-xl">{featuredProducts?.[1].title}</p>
            <p className="text-mid-grey-II line-clamp-2 max-w-[300px] text-xs font-light lg:text-sm">
              {featuredProducts?.[1].description}
            </p>
            <Ratings rating={featuredProducts?.[1].rating || 0} />
            <p className={`text-mid-grey-II text-[10px] underline lg:text-sm`}>By Skicom</p>
            <div className="flex items-baseline gap-2">
              <p className="text-accent text-xs font-medium lg:text-2xl">
                ₦{featuredProducts?.[1].price.toLocaleString()}
              </p>
              {featuredProducts?.[0].price && (
                <p className="text-mid-danger text-sm line-through lg:text-xl">
                  ₦{featuredProducts?.[0].price.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Grid of two smaller cards */}
      <section className={`grid grid-cols-2 gap-2 lg:gap-8`}>
        {[featuredProducts?.[2], featuredProducts?.[3]].map((product, index) => (
          <section key={index} className="group relative overflow-hidden rounded-md">
            <div
              style={{
                backgroundImage: `url(${product?.images[0]})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right",
                backgroundSize: "cover",
              }}
              className="absolute inset-0 z-[1] h-full w-full bg-black transition-all duration-300 group-hover:scale-105 group-hover:blur-sm"
            />
            <div className="backdrop-blur-0 relative z-[2] flex h-full transform flex-col justify-between gap-10 p-6 text-white transition-all duration-300 group-hover:backdrop-blur-[2px]">
              <Badge variant={`default`} className={`bg-accent rounded-md px-[12px] py-[6px]`}>
                Sponsored Ad
              </Badge>
              <div className={`space-y-2`}>
                <p className="line-clamp-2 text-xs font-medium lg:text-xl">{product?.title}</p>
                <p className="text-mid-grey-II line-clamp-2 max-w-[300px] text-xs font-light lg:text-sm">
                  {product?.description}
                </p>
                <Ratings rating={product?.rating || 0} />
                <p className={`text-mid-grey-II text-[10px] underline lg:text-sm`}>By Skicom</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-accent text-xs font-medium lg:text-2xl">₦{product?.price.toLocaleString()}</p>
                  {product?.price && (
                    <p className="text-mid-danger text-sm line-through lg:text-xl">
                      ₦{product?.price.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}
      </section>
    </Wrapper>
  );
};
