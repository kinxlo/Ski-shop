"use client";

import { ProductBreadcrumb } from "@/app/(external-pages)/(home)/_components/product-breadcrumb";
import { Wrapper } from "@/components/core/layout/wrapper";
import SkiButton from "@/components/shared/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "paystack">("bank");
  const [deliveryMethod, setDeliveryMethod] = useState<"station" | "door">("station");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log("Checkout submitted", { paymentMethod });
  };

  return (
    <section className="pt-[10rem]">
      <ProductBreadcrumb productTitle={`checkout`} />
      <Wrapper className="px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Billing Details Form */}
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
                  <label className="flex cursor-pointer p-4">
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

              <SkiButton variant={`primary`} className={`mt-8 w-full`}>
                Proceed to Checkout
              </SkiButton>
            </form>
          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-lg border p-6">
            <h5 className="mb-6 text-xl font-semibold">Your order</h5>
            <hr />
            <div className="mt-4 space-y-4">
              <div className="flex justify-between">
                <span>Product</span>
                <span>Subtotal</span>
              </div>
              <div className="flex items-start justify-between pt-4">
                <span className="flex-1">Sony PlayStation VR2 Approx. 110°, Communication with PS5.</span>
                <span>₦575,000</span>
              </div>
              <div className="flex justify-between border-t pt-4">
                <span>Subtotal</span>
                <span>₦575,000</span>
              </div>
              <div className="flex justify-between pt-4">
                <span>Shipping</span>
                <span className="text-right">
                  <span className="text-gray-500">(Regular Shipping)</span>
                  <br />
                  ₦5,000
                </span>
              </div>
              <div className="flex justify-between border-t pt-4 font-semibold">
                <span>Total</span>
                <span className={`text-primary font-semibold`}>₦580,000</span>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default CheckoutPage;
