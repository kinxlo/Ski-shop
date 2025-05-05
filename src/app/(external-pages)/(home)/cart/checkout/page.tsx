"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import { useState } from "react";

import { ProductBreadcrumb } from "../../_components/product-breadcrumb";

interface BillingDetails {
  firstName: string;
  lastName: string;
  country: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
}

const CheckoutPage = () => {
  // const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "paystack">("bank");
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    firstName: "",
    lastName: "",
    country: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    email: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBillingDetails((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log("Checkout submitted", { billingDetails, paymentMethod });
  };

  return (
    <section className="pt-[10rem]">
      <ProductBreadcrumb productTitle={`checkout`} />
      <Wrapper className="px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Billing Details Form */}
          <div>
            <h2 className="mb-6 text-2xl font-semibold">Billing Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="rounded border p-2"
                  value={billingDetails.firstName}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="rounded border p-2"
                  value={billingDetails.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <input
                type="text"
                name="country"
                placeholder="Country/Region"
                className="mb-4 w-full rounded border p-2"
                value={billingDetails.country}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                className="mb-4 w-full rounded border p-2"
                value={billingDetails.address}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="city"
                placeholder="Town/City"
                className="mb-4 w-full rounded border p-2"
                value={billingDetails.city}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                className="mb-4 w-full rounded border p-2"
                value={billingDetails.state}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                className="mb-4 w-full rounded border p-2"
                value={billingDetails.phone}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="mb-4 w-full rounded border p-2"
                value={billingDetails.email}
                onChange={handleInputChange}
                required
              />

              {/* Payment Method */}
              <div className="mt-8">
                <h2 className="mb-6 text-2xl font-semibold">Payment Method</h2>
                <div className="space-y-4">
                  <label className="block cursor-pointer rounded border p-4">
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
                  <label className="block cursor-pointer rounded border p-4">
                    <input
                      type="radio"
                      name="payment"
                      value="paystack"
                      checked={paymentMethod === "paystack"}
                      onChange={() => setPaymentMethod("paystack")}
                      className="mr-2"
                    />
                    <span className="flex items-center">
                      Paystack
                      <Image src="/paystack-logo.png" alt="Paystack" width={10} height={10} className="ml-2 h-6" />
                    </span>
                  </label>
                </div>
              </div>

              <button type="submit" className="mt-8 w-full rounded bg-blue-500 py-3 text-white hover:bg-blue-600">
                Proceed to Checkout
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="h-fit rounded bg-gray-50 p-6">
            <h2 className="mb-6 text-xl font-semibold">Your order</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Product</span>
                <span>Subtotal</span>
              </div>
              <div className="flex items-start justify-between border-t pt-4">
                <span className="flex-1">Sony PlayStation VR2 Approx. 110°, Communication with PS5.</span>
                <span>₦575,000</span>
              </div>
              <div className="flex justify-between border-t pt-4">
                <span>Subtotal</span>
                <span>₦575,000</span>
              </div>
              <div className="flex justify-between border-t pt-4">
                <span>Shipping</span>
                <span className="text-right">
                  <span className="text-gray-500">(Regular Shipping)</span>
                  <br />
                  ₦5,000
                </span>
              </div>
              <div className="flex justify-between border-t pt-4 font-semibold">
                <span>Total</span>
                <span>₦580,000</span>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default CheckoutPage;
