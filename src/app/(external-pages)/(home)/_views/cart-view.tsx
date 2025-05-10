"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import SkiButton from "@/components/shared/button";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export const CartView = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "ps5-vr2",
      title: "Sony PlayStation VR2 Approx. 110°",
      price: 575_000,
      quantity: 1,
      image: "/images/shop/hero.svg",
    },
    {
      id: "ps5-vr2-2",
      title: "Sony PlayStation VR2 Approx. 110°",
      price: 575_000,
      quantity: 1,
      image: "/images/shop/hero.svg",
    },
  ]);

  const handleQuantityChange = (itemId: string, action: "increase" | "decrease") => {
    setCartItems((previousItems) =>
      previousItems.map((item) => {
        if (item.id === itemId) {
          const newQuantity = action === "increase" ? item.quantity + 1 : item.quantity - 1;
          return {
            ...item,
            quantity: Math.max(1, newQuantity), // Prevent quantity from going below 1
          };
        }
        return item;
      }),
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((previousItems) => previousItems.filter((item) => item.id !== itemId));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section>
      <Wrapper className="py-4 sm:py-8">
        <h1 className="mb-4 text-xl font-semibold sm:mb-8 sm:text-2xl">Cart</h1>
        <div className="grid gap-4 sm:gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Product Table - Hidden on mobile, shown on larger screens */}
            <div className="hidden overflow-x-auto sm:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-4">Product</th>
                    <th className="pb-4">Price</th>
                    <th className="pb-4">Quantity</th>
                    <th className="pb-4">Subtotal</th>
                    <th className="pb-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative h-20 w-20 overflow-hidden rounded-lg">
                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                          </div>
                          <span className="font-medium">{item.title}</span>
                        </div>
                      </td>
                      <td className="py-4">₦{item.price.toLocaleString()}</td>
                      <td className="py-4">
                        <div className="flex w-fit items-center gap-4 rounded-full border px-4 py-2">
                          <button onClick={() => handleQuantityChange(item.id, "decrease")}>
                            <Minus size={20} className="text-gray-600" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button onClick={() => handleQuantityChange(item.id, "increase")}>
                            <Plus size={20} className="text-gray-600" />
                          </button>
                        </div>
                      </td>
                      <td className="py-4">₦{(item.price * item.quantity).toLocaleString()}</td>
                      <td className="py-4">
                        <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-600">
                          <X size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Product List */}
            <div className="space-y-4 sm:hidden">
              {cartItems.map((item) => (
                <div key={item.id} className="space-y-3 rounded-lg border p-4">
                  <div className="flex gap-3">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h6 className="font-medium">{item.title}</h6>
                      <p className="text-gray-600">₦{item.price.toLocaleString()}</p>
                    </div>
                    <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-600">
                      <X size={20} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 rounded-full border px-4 py-2">
                      <button onClick={() => handleQuantityChange(item.id, "decrease")}>
                        <Minus size={18} className="text-gray-600" />
                      </button>
                      <span className="w-6 text-center font-medium">{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, "increase")}>
                        <Plus size={18} className="text-gray-600" />
                      </button>
                    </div>
                    <p className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="rounded-lg border p-4 sm:p-6">
            <h2 className="mb-4 text-base font-semibold sm:text-lg">Cart Summary</h2>
            <div className="space-y-4 border-t pt-4 sm:space-y-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
            </div>
            <SkiButton variant="primary" size="lg" className="mt-6 w-full rounded-full sm:mt-10">
              Proceed to Checkout
            </SkiButton>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};
