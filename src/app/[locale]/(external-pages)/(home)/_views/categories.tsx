"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import SkiButton from "@/components/shared/button";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCategory } from "@/lib/utils";
import { useAppService } from "@/services/externals/app/use-app-service";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProperties {
  title: string;
  image: string;
  href: string;
}

const CategoryItem = ({ title, image, href }: CategoryItemProperties) => {
  return (
    <Link href={href} className="group relative aspect-[3/4] overflow-hidden rounded-lg">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center px-10">
        <span className="text-center text-sm font-medium text-white lg:text-xl">{title}</span>
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
  const t = useTranslations("home.categories");
  const { useGetAllProductCategory } = useAppService();
  const { data: categoriesResponse, isLoading, isError, refetch } = useGetAllProductCategory();

  const categories =
    categoriesResponse?.data?.map((category) => {
      const formattedTitle = formatCategory(category);
      return {
        title: formattedTitle,
        image: "/images/shop/hero.svg",
        href: `/shop?category=${encodeURIComponent(category)}`,
      };
    }) || [];

  const renderLoadingSkeletons = () => (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <CategorySkeleton key={index} />
      ))}
    </div>
  );

  const renderCategoryItems = () => (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {categories.map((category) => (
        <CategoryItem key={category.title} title={category.title} image={category.image} href={category.href} />
      ))}
    </div>
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
          {t("retry")}
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
    <Wrapper className="min-h-[480px] py-16">
      <div className="mb-8 flex items-baseline justify-center">
        <h2 className="text-high-grey-II text-center text-3xl font-semibold">{t("title")}</h2>
      </div>

      {renderCategoriesGrid()}
    </Wrapper>
  );
};
