"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import SkiButton from "@/components/shared/button/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

import { ProductBreadcrumb } from "../_components/product-breadcrumb";
import { SimilarProducts } from "./similar-products";

interface ProductDetailProperties {
  product: {
    id: string;
    category: string;
    title: string;
    price: number;
    oldPrice?: number;
    rating: number;
    reviews: number;
    description: string;
    specs: Array<{ label: string; value: string }>;
    gallery: string[];
    stock: number;
  };
}

type Tab = "description" | "reviews";

export const ProductDetail = ({ product }: ProductDetailProperties) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("description");

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === "increase" && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <section className="pt-[10rem]">
      <ProductBreadcrumb productTitle={product.title} />
      <Wrapper className="py-8">
        <div className="space-y-12">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square max-h-[482px] w-full overflow-hidden rounded-lg border p-4 sm:p-[2rem]">
                <BlurImage src={product.gallery[selectedImage]} alt={product.title} fill className="object-cover" />
              </div>
              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {product.gallery.map((image, index) => (
                  <button
                    key={index}
                    className={`relative aspect-square overflow-hidden rounded-lg border-2 p-1 sm:p-0 ${
                      selectedImage === index ? "border-primary" : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <BlurImage src={image} alt={product.title} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="mb-4 text-3xl font-semibold">{product.title}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        className={index < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                    <span className="text-low-grey-II text-sm">(4.5)</span>
                    <span className="ml-2 text-sm text-gray-600">({product.reviews} Reviews)</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">In Stock</Badge>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-primary text-3xl font-semibold">₦{product.price.toLocaleString()}</span>
                {product.oldPrice && (
                  <span className="text-xl text-gray-500 line-through">₦{product.oldPrice.toLocaleString()}</span>
                )}
              </div>

              {/* <p className="text-gray-600">{product.description}</p> */}

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Specifications:</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="flex items-center gap-2">
                      <span className="font-medium">{spec.label}:</span>
                      <span className="text-gray-600">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4 rounded-full border px-4 py-2">
                  <button onClick={() => handleQuantityChange("decrease")}>
                    <Minus size={20} className="text-gray-600" />
                  </button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button onClick={() => handleQuantityChange("increase")}>
                    <Plus size={20} className="text-gray-600" />
                  </button>
                </div>
                <SkiButton variant="primary" size="lg" className="flex items-center gap-2 rounded-full px-8">
                  <ShoppingCart size={20} />
                  Add to Cart
                </SkiButton>
              </div>
            </div>
          </div>

          {/* Description & Reviews Tabs */}
          <div className="space-y-6">
            <div className="border-b">
              <div className="flex gap-8">
                <button
                  className={`border-b-2 pb-4 font-medium ${
                    activeTab === "description" ? "border-primary text-primary" : "border-transparent text-gray-600"
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  Description
                </button>
                <button
                  className={`border-b-2 pb-4 font-medium ${
                    activeTab === "reviews" ? "border-primary text-primary" : "border-transparent text-gray-600"
                  }`}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews
                </button>
              </div>
            </div>

            <div className="min-h-[200px]">
              {activeTab === "description" ? (
                <div className="prose max-w-none">
                  <p>{product.description}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          size={20}
                          className={index < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">Based on {product.reviews} reviews</span>
                  </div>
                  <p className="text-gray-600">No reviews yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Similar Products */}
          <SimilarProducts currentProductId={product.id} category={product.category} />
        </div>
      </Wrapper>
    </section>
  );
};
