"use client";

import SkiButton from "@/components/shared/button";
import { AlertModal } from "@/components/shared/dialog/alert-modal";
import { ReusableDialog } from "@/components/shared/dialog/Dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Phone, Star } from "lucide-react";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";

import { OrderTrackingData, TrackingStatus } from "../types";
import { RiderRating } from "./rider-rating";
import { TrackingMap } from "./tracking-map";
import { TrackingTimeline } from "./tracking-timeline";

interface OrderTrackingProperties {
  trackingData: OrderTrackingData;
  apiKey: string;
  onStatusUpdate?: (status: TrackingStatus) => void;
  onRateRider?: (rating: number, review?: string) => Promise<void>;
}

export const OrderTracking = ({ trackingData, apiKey, onRateRider }: OrderTrackingProperties) => {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleRateRider = async (rating: number, review?: string) => {
    if (onRateRider) {
      await onRateRider(rating, review);
      setSuccessMessage("Thank you for rating! Your rating on your rider has been submitted successfully.");
      setShowSuccessModal(true);
    }
    setShowRatingModal(false);
  };

  const handleDeliverySuccess = () => {
    setSuccessMessage(
      "Successful Order! Your Order has been delivered successfully and the sum of ₦57,000 is credited into your wallet.",
    );
    setShowSuccessModal(true);
  };

  const canShowMap =
    trackingData.currentStatus === "rider_on_way" ||
    trackingData.currentStatus === "package_picked_up" ||
    trackingData.currentStatus === "package_delivered";

  const canRateRider = trackingData.currentStatus === "package_delivered";

  return (
    <div className="space-y-6 px-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="!text-lg font-bold md:!text-2xl">Live Tracking</h2>
          <p className="text-sm md:text-base">Order ID: {trackingData.orderId}</p>
        </div>
        {/* <Badge className="rounded-full px-6 py-2 text-base">
          {trackingData.currentStatus.replaceAll("_", " ").replaceAll(/\b\w/g, (l) => l.toUpperCase())}
        </Badge> */}
      </div>

      {/* Map Section */}
      <section>
        <p className="!text-foreground mt-10 text-lg !font-semibold md:!text-2xl">{trackingData.productName}</p>
        <Card className="p-0 shadow-none">
          {/* <CardHeader>
          <CardTitle>Live Tracking</CardTitle>
          </CardHeader> */}
          <CardContent className="p-0">
            <TrackingMap trackingData={trackingData} apiKey={apiKey} showRoute={canShowMap} />
          </CardContent>
        </Card>
      </section>

      {/* Rider Information */}
      <Card className="shadow-none">
        <CardHeader>
          <h3 className="!text-lg font-semibold md:!text-2xl">Assigned Rider</h3>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 md:h-16 md:w-16">
                <span className="text-lg font-bold text-gray-600 md:text-2xl">
                  {trackingData.rider.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <h6 className="!text-foreground !text-base !font-medium md:!text-xl">{trackingData.rider.name}</h6>
                <p className="text-xs text-gray-500 md:text-sm">ID: {trackingData.rider.id}</p>
                <div className="mt-1 flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 md:h-4 md:w-4" />
                  <span className="text-xs font-medium md:text-sm">{trackingData.rider.rating}</span>
                  <span className="text-xs text-gray-500 md:text-sm">({trackingData.rider.reviews} reviews)</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row">
              <SkiButton
                variant="outline"
                isLeftIconVisible
                icon={<Phone className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" />}
                className="text-sm md:text-base"
              >
                Call
              </SkiButton>
              <SkiButton
                variant="outline"
                isLeftIconVisible
                icon={<FaEnvelope className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" />}
                className="text-sm md:text-base"
              >
                Message
              </SkiButton>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tracking Timeline */}
      <Card className="shadow-none">
        <CardContent className="pt-6">
          <TrackingTimeline steps={trackingData.steps} />
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3">
        {canRateRider && (
          <SkiButton variant="primary" onClick={() => setShowRatingModal(true)} className="flex-1 text-sm md:text-base">
            Rate Rider
          </SkiButton>
        )}
        {trackingData.currentStatus === "rider_on_way" && (
          <SkiButton variant="primary" onClick={handleDeliverySuccess} className="flex-1 text-sm md:text-base">
            Mark as Delivered
          </SkiButton>
        )}
      </div>

      {/* Rating Modal */}
      <ReusableDialog
        open={showRatingModal}
        onOpenChange={setShowRatingModal}
        title="Rate Rider"
        description="Share your experience with this rider"
        className="min-w-xl"
        trigger={<div />}
      >
        <RiderRating rider={trackingData.rider} onSubmit={handleRateRider} onCancel={() => setShowRatingModal(false)} />
      </ReusableDialog>

      {/* Success Modal */}
      <AlertModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onConfirm={() => setShowSuccessModal(false)}
        type="success"
        title="Success!"
        description={successMessage}
        confirmText="Continue"
        showCancelButton={false}
      />
    </div>
  );
};
