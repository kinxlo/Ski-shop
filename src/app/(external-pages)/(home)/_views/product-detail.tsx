"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import SkiButton from "@/components/shared/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

import { ProductBreadcrumb } from "../_components/product-breadcrumb";
import { SimilarProducts } from "./similar-products";

interface ProductDetailProperties {
  product: {
    weight: number;
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage?: number;
    rating: number;
    stock: number;
    brand: string;
    thumbnail: string;
    images: string[];
    reviews: {
      rating: number;
      comment: string;
      date: string;
      reviewerName: string;
      reviewerEmail: string;
    }[];
    availabilityStatus: string;
    // Add other properties as needed
  };
}

type Tab = "description" | "reviews";

export const ProductDetail = ({ product }: ProductDetailProperties) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("description");

  // Calculate discounted price if discountPercentage exists
  const oldPrice = product.discountPercentage ? product.price / (1 - product.discountPercentage / 100) : null;

  // Use images array as gallery if it exists
  const gallery = product.images?.length ? product.images : [product.thumbnail];

  // Calculate average rating from reviews
  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
      : product.rating;

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === "increase" && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  // Sample specifications - you should replace with actual product specs
  const specs = [
    { label: "Brand", value: product.brand },
    { label: "Category", value: product.category },
    { label: "Stock", value: product.stock },
    { label: "Weight", value: `${product.weight}g` },
  ];

  return (
    <section className="pt-[10rem]">
      <ProductBreadcrumb productTitle={product.title} />
      <Wrapper className="py-8">
        <div className="space-y-12">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square max-h-[482px] w-full overflow-hidden rounded-lg border p-4 sm:p-[2rem]">
                <BlurImage src={gallery[selectedImage]} alt={product.title} fill className="object-cover" />
              </div>
              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {gallery.map((image, index) => (
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
                        className={
                          index < Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }
                      />
                    ))}
                    <span className="text-low-grey-II text-sm">({averageRating.toFixed(1)})</span>
                    <span className="ml-2 text-sm text-gray-600">({product.reviews.length} Reviews)</span>
                  </div>
                  <Badge
                    className={
                      product.availabilityStatus === "In Stock"
                        ? "bg-green-100 text-green-800"
                        : "text-destructive bg-red-100"
                    }
                  >
                    {product.availabilityStatus}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-primary text-3xl font-semibold">₦{product.price.toLocaleString()}</span>
                {oldPrice && (
                  <span className="text-destructive text-xl line-through">₦{oldPrice.toFixed(2).toLocaleString()}</span>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Specifications:</h3>
                <div className="grid grid-cols-2 gap-4">
                  {specs.map((spec, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="font-medium">{spec.label}:</span>
                      <span className="text-mid-grey-II capitalize">{spec.value}</span>
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
                <SkiButton
                  variant="primary"
                  size="lg"
                  className="flex items-center gap-2 rounded-full px-8"
                  isDisabled={product.availabilityStatus !== "In Stock"}
                  href={`/shop/cart`}
                >
                  <ShoppingCart size={20} />
                  {product.availabilityStatus === "In Stock" ? "Add to Cart" : "Out of Stock"}
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
                  Reviews ({product.reviews.length})
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
                  {product.reviews.length > 0 ? (
                    <>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              size={20}
                              className={
                                index < Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">Based on {product.reviews.length} reviews</span>
                      </div>
                      <div className="space-y-4">
                        {product.reviews.map((review, index) => (
                          <div key={index} className="rounded-lg border p-4">
                            <div className="flex items-center gap-2">
                              {Array.from({ length: 5 }).map((_, index_) => (
                                <Star
                                  key={index_}
                                  size={16}
                                  className={
                                    index_ < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }
                                />
                              ))}
                            </div>
                            <p className="mt-2 font-medium">{review.reviewerName}</p>
                            <p className="text-gray-600">{review.comment}</p>
                            <p className="text-low-grey-II mt-2 text-sm">
                              {new Date(review.date).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-600">No reviews yet.</p>
                  )}
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
