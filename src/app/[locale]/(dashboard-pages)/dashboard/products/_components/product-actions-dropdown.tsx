"use client";

import SkiButton from "@/components/shared/button";
import { cn } from "@/lib/utils";
import { Edit, EyeOff, MoreVertical, Package, Trash2, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Product {
  id: string;
  status: "published" | "draft";
  stockCount: number;
}

interface ProductActionsDropdownProperties {
  product: Product;
  onEdit: () => void;
  onPromote: () => void;
  onUnpublish: () => void;
  onMarkOutOfStock: () => void;
  onDelete: () => void;
}

export function ProductActionsDropdown({
  product,
  onEdit,
  onPromote,
  onUnpublish,
  onMarkOutOfStock,
  onDelete,
}: ProductActionsDropdownProperties) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownReference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownReference.current && !dropdownReference.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAction = (action: () => void, disabled: boolean) => {
    if (!disabled) {
      action();
      setIsOpen(false);
    }
  };

  const isUnpublished = product.status === "draft";
  const isOutOfStock = product.stockCount === 0;

  const actions = [
    {
      label: "Edit",
      icon: Edit,
      onClick: onEdit,
      className: "hover:bg-gray-50",
      disabled: false,
    },
    {
      label: "Promote Product",
      icon: TrendingUp,
      onClick: onPromote,
      className: "text-primary hover:bg-blue-50",
      disabled: isUnpublished || isOutOfStock,
    },
    {
      label: "Unpublish Product",
      icon: EyeOff,
      onClick: onUnpublish,
      className: "hover:bg-orange-50",
      disabled: isUnpublished,
    },
    {
      label: "Mark as Out of Stock",
      icon: Package,
      onClick: onMarkOutOfStock,
      className: "hover:bg-yellow-50",
      disabled: isOutOfStock,
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: onDelete,
      className: "text-mid-danger hover:bg-red-50",
      disabled: false,
    },
  ];

  return (
    <div className="relative" ref={dropdownReference}>
      <SkiButton
        isIconOnly
        size={`icon`}
        icon={<MoreVertical className="h-5 w-5 text-gray-600" />}
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="bg-background border-border absolute top-full right-0 z-50 mt-2 w-56 rounded-lg border py-2 shadow-lg">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={() => handleAction(action.onClick, action.disabled)}
                disabled={action.disabled}
                className={cn(
                  "flex w-full items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors",
                  action.className,
                  action.disabled && "cursor-not-allowed opacity-50 hover:bg-transparent",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{action.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
