import { ProductBreadcrumb } from "../../(home)/_components/product-breadcrumb";
import { CartView } from "../../(home)/_views/cart-view";
import { InterestedProducts } from "../../(home)/_views/interested-products";

const CartPage = () => {
  return (
    <section className="pt-18 lg:pt-[10rem]">
      <ProductBreadcrumb productTitle="Cart" />
      <CartView />
      <InterestedProducts />
    </section>
  );
};

export default CartPage;
