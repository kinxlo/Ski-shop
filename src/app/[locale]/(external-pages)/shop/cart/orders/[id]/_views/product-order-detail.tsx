import { ProductBreadcrumb } from "@/app/[locale]/(external-pages)/(home)/_components/product-breadcrumb";
import { Wrapper } from "@/components/core/layout/wrapper";
import SkiButton from "@/components/shared/button";
import { RatingModal } from "@/components/shared/rating-modal";
import { Ratings } from "@/components/shared/ratings";
import { Badge } from "@/components/ui/badge";
// import { Locale } from "@/lib/i18n/config";
// import { formatCurrency } from "@/lib/i18n/utils";
import { cn } from "@/lib/utils";
// import { useLocale } from "next-intl";
import Image from "next/image";

interface ProductOrderDetailProperties {
  order: {
    id: string;
    status: "paid" | "pending" | "cancelled" | "delivered";
    buyer: {
      id: string;
      name: string;
    };
    products: {
      id: string;
      name: string;
      images: string[];
      price: number;
      quantity: number;
      rating: number;
      vendor: {
        id: string;
        name: string;
      };
    }[];
    createdAt: string;
  };
}

const handleRatingSubmit = (rating: number, review: string, productId: string) => {
  // Here you would typically send the rating and review to your API
  // Example API call:
  // await submitRating({ productId, rating, review });
  // For now, we'll just handle the success state in the modal
  // You can add your actual API call here
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ = { rating, review, productId };
};

export const ProductOrderDetail = ({ order }: ProductOrderDetailProperties) => {
  // const locale = useLocale();
  // Get the first product from the order (assuming single product orders for now)
  const product = order.products[0];
  const orderDate = new Date(order.createdAt).toLocaleDateString("en-GB");
  const deliveryDate = new Date(order.createdAt);
  deliveryDate.setDate(deliveryDate.getDate() + 5); // Add 5 days for delivery

  return (
    <section className={`mt-[10rem]`}>
      <ProductBreadcrumb productTitle={`Order Details`} />
      <Wrapper className={`py-16`}>
        <div className={cn(`mb-8 flex items-baseline justify-between`)}>
          <h3 className={cn("")}>Order Details</h3>
        </div>
        <div
          className={cn(
            "flex flex-col items-center gap-8 rounded-lg border bg-no-repeat p-4 lg:flex-row",
            "bg-[url('/images/star-seller.svg')]",
          )}
        >
          <div className="relative z-[-1] aspect-square flex-1 overflow-hidden rounded-lg">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={600}
              height={600}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-mid-grey-II text-[10px] capitalize lg:text-xl">Order #{order.id}</p>
            <p className="line-clamp-2 text-xs font-medium lg:text-2xl">{product.name}</p>
            <Ratings rating={product.rating} />
            <p>QTY: {product.quantity}</p>
            {/* <div className="flex items-baseline gap-2">
              <p className="text-primary text-xs font-medium lg:text-xl">
                {formatCurrency(product.price, locale as Locale)}
              </p>
            </div> */}
            <p className={`text-mid-grey-II text-[10px] underline lg:text-sm`}>By {product.vendor.name}</p>
            <div className="mt-8 space-y-2 text-xl">
              <p className={`text-mid-grey-II text-sm`}>Placed On {orderDate}</p>
              <Badge
                className={cn(
                  `text-[10px] capitalize lg:text-sm`,
                  order.status === "pending" && "bg-[#C5A83C]",
                  order.status === "paid" && "bg-[#008000]",
                  order.status === "delivered" && "bg-mid-success",
                  order.status === "cancelled" && "bg-mid-danger",
                )}
              >
                {order.status}
              </Badge>
              {order.status === "paid" && <p>Delivered on {deliveryDate.toLocaleDateString("en-GB")}</p>}
              {order.status === "pending" && <p>To be delivered {deliveryDate.toLocaleDateString("en-GB")}</p>}
            </div>
            {order.status === "pending" && (
              <SkiButton variant="primary" size="xl" className="flex w-full items-center gap-2 rounded-full px-8">
                Track Order
              </SkiButton>
            )}
            {order.status === "paid" && (
              <RatingModal
                product={{
                  id: product.id,
                  name: product.name,
                  images: product.images,
                  description: "Sony PlayStation VR2 Approx. 110°, Communication with PS5",
                }}
                onRatingSubmit={(rating, review) => handleRatingSubmit(rating, review, product.id)}
                triggerStructure={
                  <SkiButton variant="primary" size="xl" className="flex w-full items-center gap-2 rounded-full px-8">
                    Rate Product
                  </SkiButton>
                }
              />
            )}
          </div>
        </div>
      </Wrapper>
    </section>
  );
};
