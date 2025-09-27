"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import SkiButton from "@/components/shared/button";
import { UniversalSwiper } from "@/components/shared/carousel";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatCategory } from "@/lib/utils";
import { useAppService } from "@/services/externals/app/use-app-service";
import Link from "next/link";

interface CategoryItemProperties {
  title: string;
  image: string;
  href: string;
}

const CategoryItem = ({ title, href }: CategoryItemProperties) => {
  return (
    <Link href={href}>
      <div className="flex h-[200px] items-center justify-center overflow-hidden rounded-lg bg-[url(https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1758668597/skicom/t2kc2sioj4vt4xgiesnw.svg)] bg-[50%] px-10 md:h-[400px]">
        <span className="text-center !text-xs font-semibold tracking-[1px] text-white lg:!text-xl lg:tracking-normal">
          {title}
        </span>
      </div>
    </Link>
  );
};

const CategorySkeleton = () => (
  <div className="aspect-[3/4] space-y-3 rounded-lg">
    <Skeleton className="h-full w-full rounded-lg" />
  </div>
);

export const Categories = () => {
  const { useGetAllProductCategory } = useAppService();
  const { data: categoriesResponse, isLoading, isError, refetch } = useGetAllProductCategory();

  const categories =
    categoriesResponse?.data?.map((category) => {
      const formattedTitle = formatCategory(category);
      return {
        title: formattedTitle,
        image:
          "https://res.cloudinary.com/kingsleysolomon/image/upload/f_auto,q_auto/v1758668597/skicom/t2kc2sioj4vt4xgiesnw.svg",
        href: `/shop?category=${encodeURIComponent(category)}`,
      };
    }) || [];

  const renderLoadingSkeletons = () => (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <CategorySkeleton key={index} />
      ))}
    </div>
  );

  const renderCategoryItems = () => (
    <UniversalSwiper
      className={``}
      swiperClassName={``}
      items={categories}
      renderItem={(category) => <CategoryItem title={category.title} image={category.image} href={category.href} />}
      swiperOptions={{
        spaceBetween: 24,
      }}
      showPagination
      breakpoints={{
        0: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
        1280: { slidesPerView: 5 },
      }}
    />
  );

  const renderEmptyState = () => (
    <div className="flex min-h-[360px] items-center justify-center">
      <EmptyState
        images={[
          {
            src: "/images/empty-state.svg",
            alt: "No categories found",
            width: 80,
            height: 80,
          },
        ]}
        title="No categories found"
        titleClassName="!text-lg font-bold !text-mid-warning"
        description="There are no product categories available at the moment. Please check back later."
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
          alt: "Failed to load categories",
          width: 80,
          height: 80,
        },
      ]}
      description="Failed to load product categories"
      descriptionClassName="text-mid-danger"
      className="bg-low-warning/5 space-y-0 rounded-lg"
      actionButton={
        <SkiButton
          onClick={() => refetch()}
          variant="outline"
          className="border-mid-danger text-mid-danger hover:bg-mid-danger/10 mt-4 border"
        >
          {`Retry`}
        </SkiButton>
      }
    />
  );

  const renderCategoriesGrid = () => {
    if (isLoading) {
      return renderLoadingSkeletons();
    }

    if (categories.length === 0) {
      return renderEmptyState();
    }

    if (isError) {
      return renderErrorState();
    }

    return renderCategoryItems();
  };

  return (
    <Wrapper className="pt-16">
      <div className="mb-8 flex items-baseline justify-center">
        <h2 className={cn("!text-xl lg:!text-4xl lg:!leading-[41.62px] lg:!tracking-[1px]")}>{`Categories`}</h2>
      </div>

      {renderCategoriesGrid()}
    </Wrapper>
  );
};
