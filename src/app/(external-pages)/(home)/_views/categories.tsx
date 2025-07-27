"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import { formatCategory } from "@/lib/utils";
import { useAppService } from "@/services/app/use-app-service";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

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

export const Categories = () => {
  const { useGetAllProductCategory } = useAppService();
  const { data: categoriesResponse, isLoading, isError, error } = useGetAllProductCategory();

  // Show error toast if there's an error
  if (isError) {
    toast.error("Failed to load categories", {
      description: error?.message || "Please try again later",
    });
  }

  const categories = categoriesResponse?.data.map((category) => {
    const formattedTitle = formatCategory(category);
    return {
      title: formattedTitle,
      image: "/images/shop/hero.svg", // You can make this dynamic based on category
      href: `/shop?category=${encodeURIComponent(category)}`,
    };
  });

  // Loading state
  if (isLoading) {
    return (
      <Wrapper className="">
        <h2 className="text-high-grey-II mb-8 text-center text-3xl font-semibold">Categories</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="aspect-[3/4] animate-pulse rounded-lg bg-gray-200" />
          ))}
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="">
      <h2 className="text-high-grey-II mb-8 text-center text-3xl font-semibold">Categories</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
        {categories?.map((category) => (
          <CategoryItem key={category.title} title={category.title} image={category.image} href={category.href} />
        ))}
      </div>
    </Wrapper>
  );
};
