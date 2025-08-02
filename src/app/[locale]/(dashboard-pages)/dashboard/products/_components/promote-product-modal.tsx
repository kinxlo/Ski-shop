"use client";

import SkiButton from "@/components/shared/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Locale } from "@/lib/i18n/config";
import { formatCurrency } from "@/lib/i18n/utils";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { useLocale } from "next-intl";
import { useState } from "react";

interface PromoteProductModalProperties {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
  };
}

const promotionTypes = [
  { value: "featured", label: "Featured Product", description: "Highlight your product at the top of search results" },
  { value: "sponsored", label: "Sponsored Ad", description: "Promote your product across the platform" },
  { value: "flash_sale", label: "Flash Sale", description: "Create urgency with limited-time offers" },
  { value: "bundle", label: "Bundle Deal", description: "Offer multiple products at a discount" },
];

export function PromoteProductModal({ isOpen, onClose, product }: PromoteProductModalProperties) {
  const locale = useLocale();
  const [promotionType, setPromotionType] = useState("");
  const [promotionPrice, setPromotionPrice] = useState("0.00");

  const handleConfirm = () => {
    // Handle promotion confirmation
    // console.log("Promoting product:", {
    //   productId: product.id,
    //   promotionType,
    //   promotionPrice: Number.parseFloat(promotionPrice),
    // });
    onClose();
  };

  const selectedPromotion = promotionTypes.find((type) => type.value === promotionType);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <button onClick={onClose} className="rounded-lg p-1 transition-colors hover:bg-gray-100">
              <ArrowLeft className="h-4 w-4 text-gray-600" />
            </button>
            <div>
              <DialogTitle className="!text-2xl font-semibold">Promote Product</DialogTitle>
              <p className="truncate text-sm text-gray-500">{product.name}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Promotion Type */}
          <div className="space-y-2">
            <Label htmlFor="promotion-type">Promotion Type</Label>
            <Select value={promotionType} onValueChange={setPromotionType}>
              <SelectTrigger>
                <SelectValue placeholder="Select promotion type" />
              </SelectTrigger>
              <SelectContent>
                {promotionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex flex-col">
                      <span className="font-medium">{type.label}</span>
                      <span className="text-xs text-gray-500">{type.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Promotion Price */}
          <div className="space-y-2">
            <Label htmlFor="promotion-price">Price</Label>
            <div className="relative">
              <span className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-500">
                {locale === "en" ? "₦" : "$"}
              </span>
              <Input
                id="promotion-price"
                type="number"
                value={promotionPrice}
                onChange={(event) => setPromotionPrice(event.target.value)}
                className="pl-8"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Warning Message */}
          <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-500" />
              <div className="text-sm text-orange-800">
                <p className="font-medium">Limited Promotion Reach</p>
                <p className="mt-1">
                  Promotion reach is limited for Basic Vendors. Upgrade to Star Seller for wider visibility and reduced
                  cost.
                </p>
              </div>
            </div>
          </div>

          {/* Promotion Details */}
          {selectedPromotion && (
            <div className="rounded-lg bg-gray-50 p-4">
              <h4 className="mb-2 font-medium text-gray-900">Promotion Details</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="font-medium">{selectedPromotion.label}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cost:</span>
                  <span className="font-medium">
                    {formatCurrency(Number.parseFloat(promotionPrice) || 0, locale as Locale)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-medium">7 days</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Button */}
          <SkiButton
            onClick={handleConfirm}
            isDisabled={!promotionType || Number.parseFloat(promotionPrice) <= 0}
            className="bg-primary hover:bg-primary/70 w-full px-6 py-3 font-medium text-white"
          >
            Confirm & Promote
          </SkiButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
