"use client";

import { cn } from "@/lib/utils";
import { Edit, EyeOff, MoreVertical, Package, Trash2, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ProductActionsDropdownProperties {
  onEdit: () => void;
  onPromote: () => void;
  onUnpublish: () => void;
  onMarkOutOfStock: () => void;
  onDelete: () => void;
}

export function ProductActionsDropdown({
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

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  const actions = [
    {
      label: "Edit",
      icon: Edit,
      onClick: onEdit,
      className: "text-gray-700 hover:bg-gray-50",
    },
    {
      label: "Promote Product",
      icon: TrendingUp,
      onClick: onPromote,
      className: "text-blue-600 hover:bg-blue-50",
    },
    {
      label: "Unpublish Product",
      icon: EyeOff,
      onClick: onUnpublish,
      className: "text-orange-600 hover:bg-orange-50",
    },
    {
      label: "Mark as Out of Stock",
      icon: Package,
      onClick: onMarkOutOfStock,
      className: "text-yellow-600 hover:bg-yellow-50",
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: onDelete,
      className: "text-red-600 hover:bg-red-50",
    },
  ];

  return (
    <div className="relative" ref={dropdownReference}>
      <button onClick={() => setIsOpen(!isOpen)} className="rounded-lg p-2 transition-colors hover:bg-gray-100">
        <MoreVertical className="h-5 w-5 text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 z-50 mt-2 w-56 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={() => handleAction(action.onClick)}
                className={cn(
                  "flex w-full items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors",
                  action.className,
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
