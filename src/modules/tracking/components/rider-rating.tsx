"use client";

import SkiButton from "@/components/shared/button";
import { Star } from "lucide-react";
import { useState } from "react";

import { RiderInfo } from "../types";

interface RiderRatingProperties {
  rider: RiderInfo;
  onSubmit: (rating: number, review?: string) => void;
  onCancel: () => void;
}

export const RiderRating = ({ rider, onSubmit, onCancel }: RiderRatingProperties) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return;

    setIsSubmitting(true);
    try {
      await onSubmit(rating, review);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900">Rate Rider</h3>
        <p className="text-gray-600">How would you rate this rider?</p>
      </div>

      {/* Rider Info */}
      <div className="flex items-center justify-center space-x-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
          <span className="text-lg font-semibold text-gray-600">
            {rider.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{rider.name}</h4>
          <p className="text-sm text-gray-500">ID: {rider.id}</p>
        </div>
      </div>

      {/* Rating Stars */}
      <div className="flex justify-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
            <Star
              className={`h-8 w-8 transition-colors ${
                star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-400"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Review Input */}
      <div className="space-y-2">
        <label htmlFor="review" className="block text-sm font-medium text-gray-700">
          Add a review (Optional)
        </label>
        <textarea
          id="review"
          value={review}
          onChange={(event) => setReview(event.target.value)}
          placeholder="Share your experience with this rider..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          rows={3}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <SkiButton variant="outline" onClick={onCancel} size="xl" className="flex-1" isDisabled={isSubmitting}>
          Cancel
        </SkiButton>
        <SkiButton
          variant="primary"
          onClick={handleSubmit}
          size="xl"
          className="flex-1"
          isDisabled={rating === 0 || isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Rating"}
        </SkiButton>
      </div>
    </div>
  );
};
