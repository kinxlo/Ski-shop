import { ProductBreadcrumb } from "../_components/product-breadcrumb";
import { CartView } from "../_views/cart-view";
import { InterestedProducts } from "../_views/interested-products";

const CartPage = () => {
  return (
    <section className="pt-[10rem]">
      <ProductBreadcrumb productTitle="Cart" />
      <CartView />
      <InterestedProducts />
    </section>
  );
};

export default CartPage;
