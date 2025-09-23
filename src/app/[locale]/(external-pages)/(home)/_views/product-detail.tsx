/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import SkiButton from "@/components/shared/button";
import { DangerConfirmationDialog } from "@/components/shared/dialog/confirmation-dialog";
import { Ratings } from "@/components/shared/ratings";
import { Skeleton } from "@/components/ui/skeleton";
import { Locale } from "@/lib/i18n/config";
import { formatCurrency, formatDate } from "@/lib/i18n/utils";
import { cn } from "@/lib/utils";
import { useSaveProduct } from "@/mocks/handlers/products/use-save-product";
import { useAppService } from "@/services/externals/app/use-app-service";
import { useQueryClient } from "@tanstack/react-query";
import { Heart, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdStarBorderPurple500 } from "react-icons/md";
import { toast } from "sonner";

import { ProductBreadcrumb } from "../_components/product-breadcrumb";
import { ShopCardSkeleton } from "./popular-products";
import { SimilarProducts } from "./similar-products";

type Tab = "description" | "reviews";

export const ProductDetail = ({ product, isLoading = false }: any) => {
  const router = useRouter();
  const locale = useLocale();
  const { data: session } = useSession();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { useAddToCart, useGetAllReviews, useDeleteReview } = useAppService();
  const {
    data: reviews,
    isLoading: isReviewsLoading,
    isError: isReviewsError,
  } = useGetAllReviews({ productId: product?.id });
  const { isSaved, isPending: isSaving, toggleSave } = useSaveProduct(product?.id || "");
  const [activeTab, setActiveTab] = useState<Tab>("description");
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutate: deleteReview } = useDeleteReview({
    onMutate: async (reviewId: string) => {
      setDeletingReviewId(reviewId);
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["review", "list"] });
      // Snapshot the previous value
      const previousReviews = queryClient.getQueryData(["review", "list"]);

      // Optimistically remove the review
      queryClient.setQueryData(["review", "list"], (old: any) => {
        if (!old?.data?.items) return old;
        return {
          ...old,
          data: {
            ...old.data,
            items: old.data.items.filter((review: any) => review.id !== reviewId),
          },
        };
      });

      return { previousReviews };
    },
    onError: (error: any, reviewId: string, context: any) => {
      // Revert the optimistic update on error
      queryClient.setQueryData(["review", "list"], context?.previousReviews);
      toast.error("Failed to delete review", {
        description: "Please try again later.",
      });
    },
    onSuccess: () => {
      toast.success("Review deleted successfully");
    },
    onSettled: () => {
      setDeletingReviewId(null);
      queryClient.invalidateQueries({ queryKey: ["review", "list"] });
    },
  });
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

  const reviewsData = reviews?.data?.items || [];

  // Use images array as gallery if it exists
  const gallery = product.images?.length ? product.images : [product.thumbnail];

  // Calculate average rating from reviews
  const averageRating =
    reviewsData?.length > 0
      ? reviewsData.reduce((sum: any, review: any) => sum + review.rating, 0) / reviewsData.length
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

  const handleDeleteReview = (reviewId: string) => {
    deleteReview(reviewId);
  };

  const isReviewOwner = (review: any) => {
    return session?.user?.id === review.reviewer?.id || session?.user?.email === review.reviewer?.email;
  };

  return (
    <section className="pt-[10rem]">
      <ProductBreadcrumb productTitle={product.name} />
      <Wrapper className="py-8">
        <div className="space-y-12">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Image Gallery */}
            {isLoading ? (
              <ImageGallerySkeleton />
            ) : (
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
            )}

            {/* Product Info */}
            {isLoading ? (
              <ProductInfoSkeleton />
            ) : (
              <div className="space-y-6">
                <h4 className="mb-4 text-3xl leading-7 font-semibold">{product.name}</h4>
                <div className="flex items-center gap-4">
                  <Ratings size={`!size-8`} rating={product.rating || 0} />
                  <p className={`text-high-grey-II text-2xl font-medium`}>
                    ({averageRating?.toFixed(1) || "4.5"}) {reviewsData?.length || 0} Reviews
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className={`text-high-grey-II text-[22px] underline`}>By {product.store.name}</p>
                  <p className={`text-primary flex items-end font-medium`}>
                    <MdStarBorderPurple500 className={`text-2xl`} size={24} />
                    <span className={`text-xl leading-4.5 font-semibold`}>Star Seller</span>
                  </p>
                </div>
                <div className="mt-8 flex items-baseline gap-4">
                  <span className="text-primary text-4xl font-semibold">
                    {formatCurrency(product.price, locale as Locale)}
                  </span>
                  {product.discountPrice && (
                    <span className="text-destructive text-xl line-through">
                      {formatCurrency(product.discountPrice, locale as Locale)}
                    </span>
                  )}
                </div>
                {/* <div>{product.description}</div> */}
                <div className="flex flex-col items-start gap-6">
                  <section className="flex w-full flex-row items-center justify-between gap-4">
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
            )}
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
                  Reviews ({isReviewsLoading ? "..." : reviewsData?.length || 0})
                </button>
              </div>
            </div>

            <div className="min-h-[200px]">
              {activeTab === "description" ? (
                isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ) : (
                  <div className="prose max-w-none">
                    <p>{product.description}</p>
                  </div>
                )
              ) : (
                // Reviews Tab Content
                <>
                  {isReviewsLoading ? (
                    <ReviewsSkeleton />
                  ) : isReviewsError ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <p className="mb-2 text-red-600">Failed to load reviews</p>
                      <button onClick={() => window.location.reload()} className="text-primary hover:underline">
                        Try again
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {reviewsData?.length > 0 ? (
                        <>
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center">
                              <Ratings size={`size-10`} rating={averageRating} readonly />
                            </div>
                            <span className="text-sm text-gray-600">Based on {reviewsData?.length} reviews</span>
                          </div>
                          <div className="space-y-4">
                            {reviewsData?.map((review: any, index: any) => (
                              <div key={index} className="rounded-lg border p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <Ratings size={`size-10`} rating={review.rating} readonly />
                                    </div>
                                    <h6 className="mt-2 !text-lg font-medium capitalize">
                                      {review.reviewer.firstName} {review.reviewer.lastName}
                                    </h6>
                                    <p className="text-gray-600">{review.comment}</p>
                                    <p className="text-low-grey-II mt-2 text-sm">
                                      {formatDate(review.createdAt, locale as Locale)}
                                    </p>
                                  </div>
                                  {isReviewOwner(review) && (
                                    <DangerConfirmationDialog
                                      action={{
                                        title: "Delete Review",
                                        description:
                                          "Are you sure you want to delete this review? This action cannot be undone.",
                                        onConfirm: () => handleDeleteReview(review.id),
                                        buttonName: "Delete Review",
                                        cancelButtonName: "Cancel",
                                        pending: deletingReviewId === review.id,
                                        headerClassName: "text-center !text-2xl",
                                      }}
                                    >
                                      <SkiButton
                                        variant="outline"
                                        size="icon"
                                        isDisabled={deletingReviewId === review.id}
                                        className="hover:bg-red-50 hover:text-red-600"
                                        icon={<Trash2 className="h-4 w-4" />}
                                        aria-label="Delete review"
                                        isIconOnly
                                      />
                                    </DangerConfirmationDialog>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <p className="text-gray-600">No reviews yet.</p>
                      )}
                    </div>
                  )}
                </>
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

// Individual skeleton components for each section
export const ImageGallerySkeleton = () => (
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
);

export const ProductInfoSkeleton = () => (
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
);

export const ReviewsSkeleton = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-6 w-6" />
        ))}
      </div>
      <Skeleton className="h-4 w-32" />
    </div>
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="space-y-3 rounded-lg border p-4">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, starIndex) => (
              <Skeleton key={starIndex} className="h-6 w-6" />
            ))}
          </div>
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-24" />
        </div>
      ))}
    </div>
  </div>
);

export const TabsSkeleton = () => (
  <div className="space-y-6">
    <div className="border-b">
      <div className="flex gap-8">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-32" />
      </div>
    </div>
    <div className="min-h-[200px] space-y-4">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  </div>
);

export const ProductDetailSkeleton = () => {
  return (
    <section className="pt-[10rem]">
      <ProductBreadcrumb productTitle={`...loading product details`} />
      <Wrapper className="py-8">
        <div className="space-y-12">
          <div className="grid gap-8 md:grid-cols-2">
            <ImageGallerySkeleton />
            <ProductInfoSkeleton />
          </div>
          <TabsSkeleton />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <ShopCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </Wrapper>
    </section>
  );
};
