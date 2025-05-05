import { FeaturedProducts } from "./_views/featured-products";
import { Hero } from "./_views/hero";
import { PopularProducts } from "./_views/popular-products";

const Page = () => {
  return (
    <>
      <Hero />
      <PopularProducts />
      <FeaturedProducts />
    </>
  );
};
export default Page;
