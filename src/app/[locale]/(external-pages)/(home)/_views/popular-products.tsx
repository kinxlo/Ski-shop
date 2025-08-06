"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import SkiButton from "@/components/shared/button";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useAppService } from "@/services/externals/app/use-app-service";
import { useTranslations } from "next-intl";

import { ShopCard } from "../_components/shop-card/shop-card";

export const PopularProducts = ({
  title,
  headerStyle,
  fullList,
  hasAction = true,
  flag = "popular",
}: {
  title: string;
  fullList?: string;
  headerStyle?: string;
  hasAction?: boolean;
  flag?: string;
}) => {
  const { useGetAllProducts } = useAppService();
  const { isLoading, isError, data, refetch } = useGetAllProducts({ flag });
  const t = useTranslations("home.popularProducts");

  // Handle error state
  if (isError) {
    return (
      <Wrapper className="min-h-[480px] pt-16">
        <h2 className={cn("text-high-grey-II text-sm font-black lg:text-3xl", headerStyle)}>{title}</h2>
        <EmptyState
          images={[
            {
              src: "/images/empty-state.svg",
              alt: "Empty Cart",
              width: 80,
              height: 80,
            },
          ]}
          description={t("failedToLoad")}
          descriptionClassName={`text-mid-danger`}
          className={`bg-low-warning/5 space-y-0 rounded-lg`}
          actionButton={
            <SkiButton
              onClick={() => refetch()}
              variant="outline"
              className="border-mid-danger text-mid-danger hover:bg-mid-danger/10 mt-4 border"
            >
              {t("retry")}
            </SkiButton>
          }
        />
      </Wrapper>
    );
  }

  if (data?.data?.items?.length === 0) {
    return (
      <Wrapper className="min-h-[480px] pt-16">
        <h2 className={cn("text-high-grey-II text-sm font-black lg:text-3xl", headerStyle)}>{title}</h2>
        <EmptyState
          images={[
            {
              src: "/images/empty-state.svg",
              alt: "Empty Cart",
              width: 80,
              height: 80,
            },
          ]}
          description={t("noProductsFound")}
          descriptionClassName={`text-primary`}
          className="bg-mid-grey-I space-y-0 rounded-lg py-10"
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper className="min-h-[480px] pt-16">
      <div className={cn(`mb-8 flex items-baseline justify-between`, headerStyle)}>
        <h2 className={cn("text-high-grey-II text-sm font-black lg:text-3xl", headerStyle)}>{title}</h2>
        {hasAction && (
          <SkiButton href={fullList} variant="link" className="text-primary font-medium lg:text-2xl">
            {t("seeAll")}
          </SkiButton>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {isLoading &&
          Array.from({ length: 4 }).map((_, index: number) => {
            return <ShopCardSkeleton key={index} />;
          })}

        {!isLoading &&
          data?.data?.items?.slice(0, 4).map((product: Product) => {
            return (
              <ShopCard
                key={product.id.toString()}
                id={product.id.toString()}
                category={product.category}
                title={product.name}
                rating={3}
                price={product.price}
                discount={product.discountPrice || 0}
                image={product.images[0]}
                name={product.user.name || "Skicom"}
              />
            );
          })}
      </div>
    </Wrapper>
  );
};

export const ShopCardSkeleton = () => (
  <div className="border-border animate-pulse space-y-3 rounded-lg border p-4">
    <Skeleton className="h-72 rounded-md"></Skeleton>
    <Skeleton className="h-4 rounded" />
    <Skeleton className="h-4 w-3/4 rounded"></Skeleton>
    <Skeleton className="h-4 w-1/2 rounded"></Skeleton>
  </div>
);
