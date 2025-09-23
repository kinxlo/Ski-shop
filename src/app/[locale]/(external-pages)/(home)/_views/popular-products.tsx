"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import SkiButton from "@/components/shared/button";
import { EmptyState } from "@/components/shared/empty-state";
import { LocaleLink } from "@/components/shared/locale-link";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useAppService } from "@/services/externals/app/use-app-service";
import { useTranslations } from "next-intl";

import { ShopCard } from "../_components/shop-card/shop-card";

export const PopularProducts = ({
  title,
  headerStyle,
  hasAction = true,
  flag,
  // storeId,
}: {
  title: string;
  fullList?: string;
  headerStyle?: string;
  hasAction?: boolean;
  flag?: string;
  // storeId?: string;
}) => {
  const { useGetAllProducts } = useAppService();
  const { isLoading, isError, data, refetch } = useGetAllProducts({
    // ...(storeId && { storeId }),
    flag,
    limit: 4,
  });
  const t = useTranslations("home.popularProducts");

  const products = data?.data?.items || [];

  const renderLoadingSkeletons = () => (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <ShopCardSkeleton key={index} />
      ))}
    </div>
  );

  const renderProductCards = () => (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product: Product) => (
        <ShopCard
          key={product.id.toString()}
          id={product.id.toString()}
          category={product.category}
          title={product.name}
          rating={product.rating}
          price={product.price}
          discount={product.discountPrice || 0}
          image={product.images[0]}
          name={product.store.name || "Skicom"}
        />
      ))}
    </div>
  );

  const renderEmptyState = () => (
    <div className="flex min-h-[360px] items-center justify-center">
      <EmptyState
        images={[
          {
            src: "/images/empty-state.svg",
            alt: "No products found",
            width: 80,
            height: 80,
          },
        ]}
        title="No products found"
        titleClassName="!text-lg font-bold !text-mid-warning"
        description="There are no products in the database. Please add a product to get started."
        descriptionClassName="text-mid-grey-II"
        className="bg-mid-grey-I space-y-0 rounded-lg py-10 dark:bg-[#111111]"
      />
    </div>
  );

  const renderErrorState = () => (
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
  );

  const renderProductsGrid = () => {
    if (isLoading) {
      return renderLoadingSkeletons();
    }
    if (isError) {
      return renderErrorState();
    }
    if (products.length === 0) {
      return renderEmptyState();
    }
    return renderProductCards();
  };

  return (
    <Wrapper className="min-h-[480px] pt-16">
      <div className={cn(`mb-8 flex items-baseline justify-between`, headerStyle)}>
        <h2 className={cn("", headerStyle)}>{title}</h2>
        {hasAction && (
          <LocaleLink href={`/shop`} className="text-primary font-medium lg:text-2xl">
            {t("seeAll")}
          </LocaleLink>
        )}
      </div>
      {renderProductsGrid()}
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
