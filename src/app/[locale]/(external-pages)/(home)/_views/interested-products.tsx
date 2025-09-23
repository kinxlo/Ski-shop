"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import SkiButton from "@/components/shared/button";
import { EmptyState } from "@/components/shared/empty-state";
import { useAppService } from "@/services/externals/app/use-app-service";
import { useTranslations } from "next-intl";

import { ShopCard } from "../_components/shop-card/shop-card";
import { ShopCardSkeleton } from "./popular-products";

export const InterestedProducts = () => {
  const { useGetAllProducts } = useAppService();
  const {
    data: productData,
    isLoading,
    isError,
    refetch,
  } = useGetAllProducts({
    page: 1,
    limit: 4,
    flag: "interested",
  });
  const t = useTranslations("home.interestedProducts");

  const products = productData?.data?.items || [];

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
          category={product.category || "Uncategorized"}
          title={product.name}
          rating={3}
          price={product.price}
          discount={product.discountPrice || 0}
          image={product.images?.[0] || "/placeholder-product.jpg"}
          name={product.user?.name || product.store?.name || "Skicom"}
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
            alt: "No interested products found",
            width: 80,
            height: 80,
          },
        ]}
        title="No products found"
        titleClassName="!text-lg font-bold !text-mid-warning"
        description="There are no products that match your interests. Check back later for new recommendations."
        descriptionClassName="text-mid-grey-II"
        className="bg-mid-grey-I space-y-0 rounded-lg py-10"
      />
    </div>
  );

  const renderErrorState = () => (
    <EmptyState
      images={[
        {
          src: "/images/empty-state.svg",
          alt: "Failed to load products",
          width: 80,
          height: 80,
        },
      ]}
      description="Failed to load interested products"
      descriptionClassName="text-mid-danger"
      className="bg-low-warning/5 space-y-0 rounded-lg"
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

    if (products.length === 0) {
      return renderEmptyState();
    }

    if (isError) {
      return renderErrorState();
    }

    return renderProductCards();
  };

  return (
    <Wrapper className="min-h-[480px] py-16">
      <div className="mb-8 flex items-baseline justify-between">
        <h2 className="text-high-grey-II text-lg font-semibold sm:text-2xl">{t("title")}</h2>
      </div>

      {renderProductsGrid()}
    </Wrapper>
  );
};
