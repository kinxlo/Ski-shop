import { Modal } from "@/app/(dashboard-pages)/admin/_components/modals/content-modal";
import SkiButton from "@/components/shared/button";
import { Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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

export const RatingModal = ({ product, onRatingSubmit, triggerStructure }: RatingModalProperties) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [, setIsOpen] = useState(false);

  const handleRatingSubmit = () => {
    if (rating > 0) {
      onRatingSubmit?.(rating, review);
      setIsSuccess(true);
      // Auto close after 2 seconds
      setTimeout(() => {
        setIsOpen(false);
        setIsSuccess(false);
        setRating(0);
        setReview("");
      }, 2000);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsSuccess(false);
    setRating(0);
    setReview("");
  };

  if (isSuccess) {
    return (
      <Modal title="" triggerStructure={<div style={{ display: "none" }} />} width="max-w-md">
        <div className="flex flex-col items-center gap-6 py-8">
          {/* Success Icon */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-green-500 bg-green-100">
            <Check className="h-8 w-8 text-green-600" />
          </div>

          {/* Success Message */}
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-bold text-gray-900">Thank you for rating!</h3>
            <p className="text-sm text-gray-600">Your rating on our product has been added successfully.</p>
          </div>

          {/* Continue Button */}
          <SkiButton variant="outline" size="lg" onClick={handleClose} className="w-full">
            Continue
          </SkiButton>
        </div>
      </Modal>
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
            {/* <h4 className="font-medium text-gray-900">{product.name}</h4> */}
            {product.description && <p className="mt-1 text-sm text-gray-600">{product.description}</p>}
          </div>
        </div>

        {/* Star Rating */}
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-sm text-gray-600">Tap the stars to choose</p>
          <div className="flex gap-1">
            <Ratings rating={3} size={32} />
          </div>
        </div>

        {/* Review Input */}
        <div className="space-y-2">
          <label htmlFor="review" className="text-sm font-medium text-gray-700">
            Write a review (Optional)
          </label>
          <textarea
            id="review"
            value={review}
            onChange={(event) => setReview(event.target.value)}
            placeholder="Write a review (Optional)"
            className="h-32 w-full resize-none rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Save Button */}
        <SkiButton
          variant="primary"
          size="lg"
          onClick={handleRatingSubmit}
          isDisabled={rating === 0}
          className="w-full"
        >
          Save
        </SkiButton>
      </div>
    </Modal>
  );
};
