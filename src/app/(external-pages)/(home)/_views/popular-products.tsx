"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import { Paginations } from "@/components/shared/pagination/pagination";
import { products } from "@/lib/constants";
import { useState } from "react";

import { ShopCard } from "../_components/shop-card/shop-card";

const ITEMS_PER_PAGE = 8;

export const PopularProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <Wrapper className="py-16">
      <div className={`mb-8 flex items-baseline justify-between`}>
        <h4 className="text-mid-grey-I text-sm font-semibold lg:text-3xl">Popular Products</h4>
        <span className={`text-primary font-medium lg:text-2xl`}>See All</span>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {currentProducts.slice(0, 4).map((product) => (
          <ShopCard
            key={product.id}
            id={product.id}
            category={product.category}
            title={product.title}
            rating={product.rating}
            price={product.price}
            oldPrice={product.oldPrice}
            image={product.image}
          />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Paginations currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </Wrapper>
  );
};
