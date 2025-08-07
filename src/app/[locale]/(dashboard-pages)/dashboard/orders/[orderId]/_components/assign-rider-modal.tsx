"use client";

import { SearchInput } from "@/components/core/miscellaneous/search-input";
import SkiButton from "@/components/shared/button";
import { ReusableDialog } from "@/components/shared/dialog/Dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { RiderInfo } from "@/modules/tracking/types";
import { Check, MapPin, Phone, Star, X } from "lucide-react";
import { useState } from "react";

interface Rider {
  id: string;
  name: string;
  phone: string;
  location: string;
  rating: number;
  reviews: number;
  isAvailable: boolean;
  image: string;
}

interface AssignRiderModalProperties {
  isOpen: boolean;
  onClose: () => void;
  onAssignRider: (riderId: string, riderInfo?: RiderInfo) => void;
  orderId: string;
}

type ModalState = "select" | "confirm" | "loading";

// Mock data - replace with actual API call
const mockRiders: Rider[] = [
  {
    id: "1",
    name: "Bola Xpress",
    phone: "0803 123 4567",
    location: "Lagos, Nigeria",
    rating: 4.7,
    reviews: 63,
    isAvailable: true,
    image: "/images/riders/bola-xpress.jpg",
  },
  {
    id: "2",
    name: "Tunde Jay",
    phone: "0803 123 4567",
    location: "Lagos, Nigeria",
    rating: 4.7,
    reviews: 63,
    isAvailable: true,
    image: "/images/riders/tunde-jay.jpg",
  },
  {
    id: "3",
    name: "Jibola Jagz",
    phone: "0803 123 4567",
    location: "Lagos, Nigeria",
    rating: 4.7,
    reviews: 63,
    isAvailable: true,
    image: "/images/riders/jibola-jagz.jpg",
  },
];

export const AssignRiderModal = ({ isOpen, onClose, onAssignRider }: AssignRiderModalProperties) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRider, setSelectedRider] = useState<string | null>(null);
  const [modalState, setModalState] = useState<ModalState>("select");
  const [confirmingRider, setConfirmingRider] = useState<Rider | null>(null);

  const filteredRiders = mockRiders.filter((rider) => rider.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleAssignRider = () => {
    if (selectedRider) {
      const rider = mockRiders.find((r) => r.id === selectedRider);
      if (rider) {
        setConfirmingRider(rider);
        setModalState("confirm");
      }
    }
  };

  const handleConfirmAssignment = () => {
    setModalState("loading");
    // Simulate API call
    setTimeout(() => {
      if (confirmingRider) {
        // Convert rider data to the format expected by tracking system
        const riderInfo: RiderInfo = {
          id: confirmingRider.id,
          name: confirmingRider.name,
          phone: confirmingRider.phone,
          rating: confirmingRider.rating,
          reviews: confirmingRider.reviews,
          location: {
            lat: 6.5244, // Default Lagos coordinates
            lng: 3.3792,
            address: confirmingRider.location,
          },
        };

        onAssignRider(confirmingRider.id, riderInfo);
      }
      onClose();
      // Reset state
      setModalState("select");
      setSelectedRider(null);
      setConfirmingRider(null);
    }, 3000);
  };

  const handleBackToSelect = () => {
    setModalState("select");
    setConfirmingRider(null);
  };

  const getModalContent = () => {
    switch (modalState) {
      case "confirm": {
        return (
          <div className="space-y-6">
            {/* Rider Info */}
            <div className="flex items-center space-x-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                <span className="text-2xl font-bold text-gray-600">
                  {confirmingRider?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <h3 className="!text-xl font-semibold">{confirmingRider?.name}</h3>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{confirmingRider?.rating}</span>
                  <span className="text-xs text-gray-500">({confirmingRider?.reviews} reviews)</span>
                </div>
              </div>
            </div>
            <hr className={`border-border border-b`} />
            {/* Confirmation Text */}
            <div className="text-center">
              <p className="text-lg font-medium">Assign {confirmingRider?.name} to this order?</p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <SkiButton variant="outline" onClick={handleBackToSelect} size="xl" className="flex-1">
                Cancel
              </SkiButton>
              <SkiButton variant="primary" onClick={handleConfirmAssignment} size="xl" className="flex-1">
                Confirm Assignment
              </SkiButton>
            </div>
          </div>
        );
      }

      case "loading": {
        return (
          <div className="space-y-6 text-center">
            {/* Loading Spinner */}
            <div className="flex justify-center">
              <div className="relative h-16 w-16">
                <div className="border-primary/10 absolute inset-0 rounded-full border-10"></div>
                <div className="border-primary absolute inset-0 animate-spin rounded-full border-10 border-t-transparent"></div>
              </div>
            </div>

            {/* Loading Text */}
            <div className="space-y-2">
              <h3 className="!text-xl font-semibold">Waiting for Rider to Accept...</h3>
              <p className="text-high-grey-II mx-auto max-w-sm text-center">
                We&apos;ve sent your delivery request to {confirmingRider?.name}. Please hold on while they confirm.
              </p>
            </div>
          </div>
        );
      }

      default: {
        return (
          <div className="space-y-4">
            {/* Search and Filter Section */}
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <SearchInput
                  placeholder="Search for riders..."
                  onSearch={setSearchQuery}
                  initialValue={searchQuery}
                  delay={300}
                  className="w-full"
                />
              </div>
              <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50">
                <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Riders List */}
            <div className="hide-scrollbar max-h-96 space-y-3 overflow-y-auto p-1">
              {filteredRiders.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-gray-500">No riders found matching your search.</p>
                </div>
              ) : (
                filteredRiders.map((rider) => (
                  <Card
                    key={rider.id}
                    className={cn(
                      "cursor-pointer shadow-none transition-all hover:shadow-md",
                      selectedRider === rider.id && "ring-primary bg-blue-50 ring-2",
                    )}
                    onClick={() => setSelectedRider(rider.id)}
                  >
                    <CardContent className="p-4">
                      <div className="relative flex items-start justify-between">
                        {/* Rider Info */}
                        <div className="flex items-start space-x-3">
                          {/* Profile Picture */}
                          <div className="relative">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                              <span className="text-lg font-semibold text-gray-600">
                                {rider.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            {rider.isAvailable && (
                              <div className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white bg-green-500" />
                            )}
                          </div>

                          {/* Rider Details */}
                          <div className="min-w-0 flex-1">
                            <div className="mb-1 flex items-center justify-between">
                              <p className="font-semibold">{rider.name}</p>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Phone className="h-3 w-3" />
                                <span>{rider.phone}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <MapPin className="h-3 w-3" />
                                <span>{rider.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Availability Status */}
                        <div className="flex h-full flex-col items-end space-y-6">
                          {rider.isAvailable ? (
                            <Badge className="border-green-200 bg-green-100 text-green-800">
                              <Check className="mr-1 h-3 w-3" />
                              Available
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                              <X className="mr-1 h-3 w-3" />
                              Busy
                            </Badge>
                          )}
                          {/* Rating */}
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{rider.rating}</span>
                            <span className="text-xs text-gray-500">({rider.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-3 border-t pt-4">
              <SkiButton variant="outline" onClick={onClose} size="xl" className="w-full">
                Cancel
              </SkiButton>
              <SkiButton
                variant="primary"
                size="xl"
                onClick={handleAssignRider}
                isDisabled={!selectedRider}
                className="w-full"
              >
                Assign Rider
              </SkiButton>
            </div>
          </div>
        );
      }
    }
  };

  const getModalTitle = () => {
    switch (modalState) {
      case "confirm": {
        return "Confirm Assignment";
      }
      case "loading": {
        return "";
      }
      default: {
        return "Riders Near You";
      }
    }
  };

  const getModalDescription = () => {
    switch (modalState) {
      case "confirm": {
        return "Please confirm the rider assignment";
      }
      case "loading": {
        return "";
      }
      default: {
        return "Select a rider to assign to this order";
      }
    }
  };

  return (
    <ReusableDialog
      open={isOpen}
      onOpenChange={onClose}
      title={getModalTitle()}
      description={getModalDescription()}
      className="min-w-xl overflow-hidden"
      headerClassName={`!text-2xl`}
      hideClose={modalState === "loading"}
      trigger={<div />} // Hidden trigger since we control open state
    >
      {getModalContent()}
    </ReusableDialog>
  );
};
