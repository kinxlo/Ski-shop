"use client";

import { ProductBreadcrumb } from "@/app/(external-pages)/(home)/_components/product-breadcrumb";
import { Wrapper } from "@/components/core/layout/wrapper";
import SkiButton from "@/components/shared/button";
import { formatCurrency } from "@/lib/utils";
import { useAppService } from "@/services/app/use-app-service";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "paystack">("bank");
  const [deliveryMethod, setDeliveryMethod] = useState<"station" | "door">("station");

  const { useCheckoutCart, useGetCart } = useAppService();
  const { mutateAsync: checkout, isPending: isCheckingOut } = useCheckoutCart();
  const { data: cartData, isLoading: isCartLoading, error: cartError } = useGetCart();

  // Calculate shipping fee based on delivery method
  const shippingFee = deliveryMethod === "door" ? 5000 : 2000;

  // Calculate totals
  const subtotal =
    cartData?.data?.items?.reduce((sum: number, item: CartItem) => sum + item.product.price * item.quantity, 0) || 0;

  const total = subtotal + shippingFee;

  const handleCheckout = () => {
    const checkoutData = {
      deliveryMethod,
      paymentMethod,
    };

    if (!deliveryMethod || !paymentMethod) {
      toast.error("Please select both delivery and payment methods");
      return;
    } else if (paymentMethod === "paystack") {
      checkout(checkoutData, {
        onSuccess: (response) => {
          if (response?.data?.checkoutUrl) {
            toast.success("Checkout successful");
            window.open(response.data.checkoutUrl as string, "_blank", "noopener,noreferrer");
          }
        },
        onError: (error) => {
          toast.error("Checkout failed", {
            description: error.message,
          });
        },
      });
    } else if (paymentMethod === "bank") {
      toast.success("Bank transfer selected. Please follow the instructions to complete your payment.");
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!deliveryMethod || !paymentMethod) {
      toast.error("Please select both delivery and payment methods");
      return;
    }
    handleCheckout();
  };

  return (
    <section className="pt-[10rem]">
      <ProductBreadcrumb productTitle={`checkout`} />
      <Wrapper className="px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Delivery and Payment Section */}
          <div>
            <h5 className="mb-6 text-2xl font-semibold">Delivery Method</h5>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <label className="block cursor-pointer p-4">
                  <div className={`flex items-start space-y-2`}>
                    <input
                      type="radio"
                      name="delivery-method"
                      value="station"
                      checked={deliveryMethod === "station"}
                      onChange={() => setDeliveryMethod("station")}
                      className="mt-1 mr-2"
                    />
                    <p className={`text-xl font-semibold`}>Pick-up Station</p>
                  </div>
                  <p className={`my-4`}>
                    Delivery Between <strong>10 May</strong> and <strong>12 May</strong>
                  </p>
                  <div className={`overflow-hidden rounded-lg border`}>
                    <div className={`bg-low-blue text-mid-blue flex items-center justify-between p-4`}>
                      <p className={`text-lg font-semibold`}>Select Pick-up Station</p>
                      <ChevronRight />
                    </div>
                    {deliveryMethod === "station" && (
                      <p className="mt-2 p-4 text-sm text-gray-600">
                        Make sure you select the pick-up station close to your billing address for convenience purposes.
                      </p>
                    )}
                  </div>
                </label>
                <label className="cursor-pointer p-4">
                  <div className={`flex items-start space-y-2`}>
                    <input
                      type="radio"
                      name="delivery-method"
                      value="door"
                      checked={deliveryMethod === "door"}
                      onChange={() => setDeliveryMethod("door")}
                      className="mt-1 mr-2 p-0"
                    />
                    <p className={`text-xl font-semibold`}>Door Delivery</p>
                  </div>
                  <p className={`my-4`}>
                    Delivery Between <strong>10 May</strong> and <strong>12 May</strong>
                  </p>
                </label>
              </div>

              {/* Payment Method */}
              <div className="mt-8">
                <h5 className="mb-6 text-2xl font-semibold">Payment Method</h5>
                <div className="space-y-4">
                  <label className="block cursor-pointer p-4">
                    <input
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={paymentMethod === "bank"}
                      onChange={() => setPaymentMethod("bank")}
                      className="mr-2"
                    />
                    Direct Bank Transfer
                    {paymentMethod === "bank" && (
                      <p className="mt-2 text-sm text-gray-600">
                        Make your payment directly into our bank account. Please use your Order ID as the payment
                        reference. Your order will not be shipped until the funds have cleared in our account.
                      </p>
                    )}
                  </label>
                  <label className="flex cursor-pointer items-center p-4">
                    <input
                      type="radio"
                      name="payment"
                      value="paystack"
                      checked={paymentMethod === "paystack"}
                      onChange={() => setPaymentMethod("paystack")}
                      className="mr-2 p-0"
                    />
                    <Image
                      src="/images/paystack-logo.svg"
                      alt="Paystack"
                      width={100}
                      height={10}
                      className="ml-2 h-6"
                    />
                  </label>
                </div>
              </div>

              <SkiButton
                type="submit"
                isLoading={isCheckingOut}
                isDisabled={!deliveryMethod || !paymentMethod || isCheckingOut || isCartLoading}
                variant={`primary`}
                className={`mt-8 w-full`}
              >
                Proceed to Checkout
              </SkiButton>
            </form>
          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-lg border p-6">
            <h5 className="mb-6 text-xl font-semibold">Your order</h5>
            <hr />

            {isCartLoading ? (
              <div className="mt-4 flex justify-center py-8">
                <p>Loading cart items...</p>
              </div>
            ) : cartError ? (
              <div className="mt-4 rounded-lg bg-red-50 p-4 text-red-600">Error loading cart items</div>
            ) : (
              <div className="mt-4 space-y-4">
                <div className="flex justify-between font-medium">
                  <span>Product</span>
                  <span>Subtotal</span>
                </div>

                {cartData?.data?.items?.length ? (
                  <>
                    {cartData.data.items.map((item: CartItem) => (
                      <div key={item.id} className="flex items-start justify-between pt-4">
                        <div className="flex flex-1 items-start gap-3">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.product.name}
                              width={50}
                              height={50}
                              className="h-12 w-12 rounded object-cover"
                            />
                          )}
                          <span>
                            {item.product.name} × {item.quantity}
                          </span>
                        </div>
                        <span>{formatCurrency(item.product.price * item.quantity)}</span>
                      </div>
                    ))}

                    <div className="flex justify-between border-t pt-4">
                      <span>Subtotal</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>

                    <div className="flex justify-between pt-4">
                      <span>Shipping</span>
                      <span className="text-right">
                        <span className="text-gray-500">
                          ({deliveryMethod === "door" ? "Door Delivery" : "Pick-up Station"})
                        </span>
                        <br />
                        {formatCurrency(shippingFee)}
                      </span>
                    </div>

                    <div className="flex justify-between border-t pt-4 font-semibold">
                      <span>Total</span>
                      <span className="text-primary">{formatCurrency(total)}</span>
                    </div>
                  </>
                ) : (
                  <div className="py-8 text-center text-gray-500">Your cart is empty</div>
                )}
              </div>
            )}
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default CheckoutPage;
