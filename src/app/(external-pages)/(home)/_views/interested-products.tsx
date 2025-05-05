import { Wrapper } from "@/components/core/layout/wrapper";
import { products } from "@/lib/constants";

import { ShopCard } from "../_components/shop-card/shop-card";

export const InterestedProducts = () => {
  const interestedProducts = products.slice(0, 4);

  return (
    <Wrapper className="py-16">
      <h2 className="mb-8 text-3xl font-semibold">You May Be Interested In...</h2>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {interestedProducts.map((product) => (
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
    </Wrapper>
  );
};
