import { products } from "@/lib/constants";

import { ShopCard } from "../_components/shop-card/shop-card";

interface SimilarProductsProperties {
  currentProductId: string;
  category: string;
}

export const SimilarProducts = ({ currentProductId, category }: SimilarProductsProperties) => {
  const similarProducts = products
    .filter((product) => product.category === category && product.id !== currentProductId)
    .slice(0, 4);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Similar Products</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {similarProducts.map((product) => (
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
    </div>
  );
};
