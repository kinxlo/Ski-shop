import SkiButton from "@/components/shared/button";
import { useAppService } from "@/services/externals/app/use-app-service";
import Image from "next/image";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { AlertModal } from "../dialog/alert-modal";
import { Modal } from "../dialog/content-modal";
import { FormField } from "../inputs/FormFields";
import { Ratings } from "../ratings";

interface RatingModalProperties {
  product: {
    id: string;
    name: string;
    images: string[];
    description?: string;
  };
  onRatingSubmit?: (rating: number, review: string) => void;
  triggerStructure: React.ReactNode;
}

interface FormData {
  review: string;
}

export const RatingModal = ({ product, onRatingSubmit, triggerStructure }: RatingModalProperties) => {
  const [rating, setRating] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { useReviewProduct } = useAppService();

  const reviewProductMutation = useReviewProduct({
    onSuccess: () => {
      setIsSuccess(true);
      setError(null);
      // Auto close after 2 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setRating(0);
        reset();
      }, 2000);
    },
    onError: (error: Error) => {
      setError(error?.message || "Failed to submit review. Please try again.");
    },
  });

  const methods = useForm<FormData>({
    defaultValues: {
      review: "",
    },
  });

  const { handleSubmit, reset } = methods;

  const handleRatingSubmit = (data: FormData) => {
    if (rating > 0) {
      setError(null);
      reviewProductMutation.mutate({
        productId: product.id,
        rating,
        comment: data.review,
      });

      // Also call the optional callback if provided
      onRatingSubmit?.(rating, data.review);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setRating(0);
    setError(null);
    reset();
  };

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  if (isSuccess) {
    return (
      <AlertModal
        isOpen={isSuccess}
        onClose={handleClose}
        type="success"
        title="Success!"
        description="Your action has been completed successfully."
        confirmText="Great!"
        showCancelButton={false}
      />
    );
  }

  return (
    <Modal title="" description="" triggerStructure={triggerStructure} width="max-w-2xl">
      <div className="flex flex-col items-center justify-between space-y-6">
        <div className="flex flex-col items-center justify-center gap-2">
          <h5 className="text-high-grey-II text-sm font-black lg:text-3xl">Rate This Product</h5>
          <p className="text-mid-grey-II text-sm">How would you rate this product?</p>
        </div>
        {/* Product Display */}
        <div className="border-border flex gap-4 rounded-lg border p-2">
          <div className="border-border relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border">
            <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
          </div>
          <div className="flex-1">
            <p className="text-xl font-medium text-gray-900">{product.name}</p>
            {product.description && <p className="mt-1 text-sm text-gray-600">{product.description}</p>}
          </div>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleRatingSubmit)} className="w-full space-y-6">
            {/* Star Rating */}
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-sm text-gray-600">Tap the stars to choose</p>
              <div className="flex gap-1">
                <Ratings readonly={false} rating={rating} size={32} onChange={handleStarClick} />
              </div>
            </div>
            {/* Review Input */}
            <div className="space-y-2">
              <FormField
                type="textarea"
                name="review"
                label="Write a review (Optional)"
                placeholder="Write a review (Optional)"
                className="h-32 w-full resize-none rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Error Display */}
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-center">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Save Button */}
            <SkiButton
              variant="primary"
              size="lg"
              type="submit"
              isDisabled={rating === 0 || reviewProductMutation.isPending}
              className="w-full"
            >
              {reviewProductMutation.isPending ? "Submitting..." : "Save"}
            </SkiButton>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
};
