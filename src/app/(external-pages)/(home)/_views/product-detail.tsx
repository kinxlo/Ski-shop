/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import SkiButton from "@/components/shared/button";
import { Ratings } from "@/components/shared/ratings";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatCurrency } from "@/lib/utils";
import { useSaveProduct } from "@/mocks/handlers/products/use-save-product";
import { useAppService } from "@/services/app/use-app-service";
import { useQueryClient } from "@tanstack/react-query";
import { Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdStarBorderPurple500 } from "react-icons/md";
import { toast } from "sonner";

import { ProductBreadcrumb } from "../_components/product-breadcrumb";
import { ShopCardSkeleton } from "./popular-products";
import { SimilarProducts } from "./similar-products";

type Tab = "description" | "reviews";

export const ProductDetail = ({ product }: any) => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { useAddToCart } = useAppService();
  const { isSaved, isPending: isSaving, toggleSave } = useSaveProduct(product?.id || "");
  const [activeTab, setActiveTab] = useState<Tab>("description");
  const queryClient = useQueryClient();
  const { mutate: addToCart, isPending } = useAddToCart({
    onMutate: async (newItem: any) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      // Snapshot the previous value
      const previousCart = queryClient.getQueryData(["cart"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["cart"], (old: any) => {
        const existingItem = old?.items?.find((item: any) => item.productId === newItem.productId);
        if (existingItem) {
          return {
            ...old,
            items: old.items.map((item: any) =>
              item.productId === newItem.productId ? { ...item, quantity: item.quantity + newItem.quantity } : item,
            ),
          };
        }
        return {
          ...old,
          items: [...(old?.items || []), { ...newItem, id: Date.now().toString() }],
        };
      });

      return { previousCart };
    },
    onError: (error: any, newItem: any, context: any) => {
      queryClient.setQueryData(["cart"], context?.previousCart);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  // Use images array as gallery if it exists
  const gallery = product.images?.length ? product.images : [product.thumbnail];

  // Calculate average rating from reviews
  const averageRating =
    product?.reviews?.length > 0
      ? product.reviews.reduce((sum: any, review: any) => sum + review.rating, 0) / product.reviews.length
      : product.rating;

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === "increase") {
      if (quantity < product.stockCount) {
        setQuantity(quantity + 1);
      } else {
        toast.info(`Maximum available quantity is ${product.stockCount}`);
      }
    }
  };

  const handleAddToCart = () => {
    addToCart(
      { productId: product.id, quantity },
      {
        onSuccess: () => {
          toast.success(`Added to cart successfully`);
          router.push(`/shop/cart`);
        },
      },
    );
  };

  return (
    <section className="pt-[10rem]">
      <ProductBreadcrumb productTitle={product.name} />
      <Wrapper className="py-8">
        <div className="space-y-12">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square max-h-[482px] w-full overflow-hidden rounded-lg border p-4 sm:p-[2rem]">
                <BlurImage src={gallery[selectedImage]} alt={product.name} fill className="object-cover" />
                {/* Heart button positioned absolutely over the image */}
                <button
                  role="button"
                  tabIndex={0}
                  aria-label={isSaved ? "Remove from favorites" : "Save product"}
                  className={cn(
                    "absolute top-4 right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/80 p-2 backdrop-blur-sm transition-all hover:bg-white",
                    isSaved ? "text-red-500 hover:bg-red-50" : "text-gray-500 hover:text-red-500",
                    isSaving && "pointer-events-none opacity-60",
                  )}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    if (!isSaving) toggleSave();
                  }}
                  onKeyDown={(event) => {
                    if ((event.key === "Enter" || event.key === " ") && !isSaving) {
                      event.preventDefault();
                      event.stopPropagation();
                      toggleSave();
                    }
                  }}
                >
                  {isSaved ? <Heart className="h-6 w-6 fill-red-500 text-red-500" /> : <Heart className="h-6 w-6" />}
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {gallery.map((image: any, index: any) => (
                  <button
                    key={index}
                    className={`relative aspect-square overflow-hidden rounded-lg border-2 p-1 sm:p-0 ${
                      selectedImage === index ? "border-primary" : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <BlurImage src={image} alt={product.name} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <h4 className="mb-4 text-3xl leading-7 font-semibold">{product.name}</h4>
              <div className="flex items-center gap-4">
                <Ratings size={24} rating={3} />
                <p className={`text-high-grey-II text-2xl font-medium`}>(4.5) 10 Reviews</p>
              </div>
              <div className="flex items-center gap-4">
                <p className={`text-high-grey-II text-[22px] underline`}>By {product.user.name}</p>
                <p className={`text-primary flex items-end font-medium`}>
                  <MdStarBorderPurple500 className={`text-2xl`} size={24} />
                  <span className={`text-xl leading-4.5 font-semibold`}>Star Seller</span>
                </p>
              </div>
              <div className="mt-8 flex items-baseline gap-4">
                <span className="text-primary text-4xl font-semibold">{formatCurrency(product.price)}</span>
                {product.discountPrice && (
                  <span className="text-destructive text-xl line-through">{formatCurrency(product.discountPrice)}</span>
                )}
              </div>
              <div>{product.description}</div>
              <div className="flex flex-col items-start gap-6">
                <section className="flex w-full flex-row-reverse items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange("decrease")}
                      className="flex h-8 w-8 items-center justify-center rounded-full border bg-gray-50 hover:bg-gray-100 disabled:opacity-50"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange("increase")}
                      className="flex h-8 w-8 items-center justify-center rounded-full border bg-gray-50 hover:bg-gray-100 disabled:opacity-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </section>
                <div className="flex w-full gap-4">
                  <SkiButton
                    variant="primary"
                    size="xl"
                    className="flex flex-1 items-center gap-2 rounded-full px-8 py-8"
                    isDisabled={product.stockCount === 0 || isPending}
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart size={20} />
                    {isPending ? "Adding..." : product.stockCount === 0 ? "Out of Stock" : "Add to Cart"}
                  </SkiButton>
                </div>
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
                  Reviews ({product?.reviews?.length})
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
                        <span className="text-sm text-gray-600">Based on {product?.reviews?.length} reviews</span>
                      </div>
                      <div className="space-y-4">
                        {product?.reviews?.map((review: any, index: any) => (
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
          <SimilarProducts currentProductId={product?.id} category={product?.category} />
        </div>
      </Wrapper>
    </section>
  );
};

export const ProductDetailSkeleton = () => {
  return (
    <section className="pt-[10rem]">
      <ProductBreadcrumb productTitle={`...loading product details`} />
      <div className="py-8">
        <div className="space-y-12">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Image Gallery Skeleton */}
            <div className="space-y-4">
              <div className="relative aspect-square max-h-[482px] w-full overflow-hidden rounded-lg border p-4 sm:p-[2rem]">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="grid grid-cols-4 gap-2 sm:gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="aspect-square rounded-lg" />
                ))}
              </div>
            </div>

            {/* Product Info Skeleton */}
            <div className="space-y-6">
              <Skeleton className="mb-4 h-8 w-3/4 text-3xl" />
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} className="h-6 w-6" />
                  ))}
                </div>
                <Skeleton className="h-6 w-32" />
              </div>
              <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-6 w-24" />
              </div>
              <div className="mt-8 flex items-baseline gap-4">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-6 w-24" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="flex flex-col items-start gap-6">
                <div className="flex w-fit items-center gap-4 rounded-full border p-4">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-6 w-8" />
                  <Skeleton className="h-5 w-5" />
                </div>
                <Skeleton className="h-14 w-full rounded-full" />
              </div>
            </div>
          </div>

          {/* Description & Reviews Tabs Skeleton */}
          <div className="space-y-6">
            <div className="border-muted min-h-[200px] space-y-4 rounded-lg border p-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>

          {/* Similar Products Skeleton */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <ShopCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
