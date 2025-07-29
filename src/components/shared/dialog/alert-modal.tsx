"use client";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

export type AlertType = "success" | "error" | "warning" | "info";

interface AlertModalProperties {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  loading?: boolean;
  type: AlertType;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  showCancelButton?: boolean;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

const alertConfig = {
  success: {
    icon: CheckCircle,
    iconColor: "text-green-600",
    bgColor: "bg-green-100",
    borderColor: "border-green-500",
    buttonVariant: "default" as const,
  },
  error: {
    icon: XCircle,
    iconColor: "text-red-600",
    bgColor: "bg-red-100",
    borderColor: "border-red-500",
    buttonVariant: "destructive" as const,
  },
  warning: {
    icon: AlertTriangle,
    iconColor: "text-yellow-600",
    bgColor: "bg-yellow-100",
    borderColor: "border-yellow-500",
    buttonVariant: "outline" as const,
  },
  info: {
    icon: Info,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-100",
    borderColor: "border-blue-500",
    buttonVariant: "default" as const,
  },
};

export const AlertModal: React.FC<AlertModalProperties> = ({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
  type,
  title,
  description,
  confirmText = "Continue",
  cancelText = "Cancel",
  showCancelButton = true,
  autoClose = false,
  autoCloseDelay = 3000,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && autoClose && !loading) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDelay, loading, onClose]);

  if (!isMounted) {
    return null;
  }

  const config = alertConfig[type];
  const IconComponent = config.icon;

  return (
    <Modal title="" description="" isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-6 py-8">
        {/* Icon */}
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-full border-2 ${config.borderColor} ${config.bgColor}`}
        >
          <IconComponent className={`h-8 w-8 ${config.iconColor}`} />
        </div>

        {/* Content */}
        <div className="space-y-2 text-center">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>

        {/* Buttons */}
        <div className="flex w-full gap-3">
          {showCancelButton && (
            <Button disabled={loading} variant="outline" onClick={onClose} className="flex-1">
              {cancelText}
            </Button>
          )}
          {onConfirm && (
            <Button disabled={loading} variant={config.buttonVariant} onClick={onConfirm} className="flex-1">
              {loading ? "Loading..." : confirmText}
            </Button>
          )}
          {!onConfirm && (
            <Button disabled={loading} variant={config.buttonVariant} onClick={onClose} className="flex-1">
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
