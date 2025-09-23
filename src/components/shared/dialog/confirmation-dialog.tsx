import { cn } from "@/lib/utils";
import React, { useState } from "react";

import SkiButton from "../button";
import { ReusableDialog } from "./Dialog";

interface ConfirmationDialogAction {
  pending?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  buttonName?: string;
  cancelButtonName?: string;
  img?: string | React.ReactNode;
  buttonVariant?: "primary" | "outline" | "destructive" | "secondary";
  cancelButtonVariant?: "primary" | "outline" | "destructive" | "secondary";
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  size?: any;
  headerClassName?: string;
  wrapperClassName?: string;
  content?: React.ReactNode;
  icon?: React.ReactNode;
  iconClassName?: string;
  danger?: boolean;
}

interface ConfirmationDialogProperties {
  children: React.ReactNode;
  action: ConfirmationDialogAction;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  controlled?: boolean;
}

export const ConfirmationDialog = ({
  children,
  action,
  onOpenChange,
  defaultOpen = false,
  controlled = false,
}: ConfirmationDialogProperties) => {
  const [isDialogOpen, setIsDialogOpen] = useState(defaultOpen);

  const handleOpenChange = (open: boolean) => {
    if (controlled) {
      onOpenChange?.(open);
    } else {
      setIsDialogOpen(open);
    }
  };

  const handleConfirm = () => {
    action.onConfirm();
    if (!controlled) {
      setIsDialogOpen(false);
    }
    action.onOpenChange?.(false);
  };

  const handleCancel = () => {
    action.onCancel?.();
    if (!controlled) {
      setIsDialogOpen(false);
    }
    action.onOpenChange?.(false);
  };

  const isOpen = controlled ? action.onOpenChange !== undefined : isDialogOpen;

  // Default values
  const {
    pending = false,
    title,
    description,
    buttonName = "Confirm",
    cancelButtonName = "Cancel",
    buttonVariant = "primary",
    cancelButtonVariant = "outline",
    showCancelButton = true,
    showConfirmButton = true,
    size = "lg",
    headerClassName,
    wrapperClassName = "flex flex-col items-center justify-center text-center space-y-2 sm:space-y-4",
    content,
    icon,
    iconClassName = "mx-auto",
    danger = false,
  } = action;

  // Determine button variants based on danger prop
  const finalButtonVariant = danger ? "destructive" : buttonVariant;
  const finalCancelButtonVariant = cancelButtonVariant;

  return (
    <ReusableDialog
      open={isOpen}
      onOpenChange={handleOpenChange}
      trigger={children}
      title={title}
      description={description}
      img={typeof action.img === "string" ? action.img : undefined}
      headerClassName={headerClassName}
      wrapperClassName={wrapperClassName}
      className="h-fit w-[95vw] max-w-md sm:max-w-[425px]"
    >
      <div className="space-y-4 px-1 sm:px-0">
        {/* Custom Icon */}
        {icon && (
          <div className={cn("flex justify-center py-2 sm:py-4", iconClassName)}>
            <div className="scale-75 sm:scale-100">{icon}</div>
          </div>
        )}

        {/* Custom Content */}
        {content && <div className="px-2 py-2 text-sm sm:px-0 sm:text-base">{content}</div>}

        {/* Custom Image (if ReactNode) */}
        {typeof action.img === "object" && action.img && (
          <div className="flex justify-center py-2 sm:py-4">
            <div className="scale-75 sm:scale-100">{action.img}</div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-center sm:pt-6">
          {showCancelButton && (
            <SkiButton
              className="w-full touch-manipulation"
              variant={finalCancelButtonVariant}
              onClick={handleCancel}
              size={size}
              isDisabled={pending}
            >
              {cancelButtonName}
            </SkiButton>
          )}
          {showConfirmButton && (
            <SkiButton
              className="w-full touch-manipulation"
              isDisabled={pending}
              isLoading={pending}
              variant={finalButtonVariant}
              onClick={handleConfirm}
              size={size}
            >
              {buttonName}
            </SkiButton>
          )}
        </div>
      </div>
    </ReusableDialog>
  );
};

// Convenience components for common use cases
export const DangerConfirmationDialog = (properties: ConfirmationDialogProperties) => (
  <ConfirmationDialog
    {...properties}
    action={{
      ...properties.action,
      danger: true,
      buttonVariant: "destructive",
      buttonName: properties.action.buttonName || "Delete",
      wrapperClassName: "text-center space-y-2 sm:space-y-4",
    }}
  />
);

export const InfoConfirmationDialog = (properties: ConfirmationDialogProperties) => (
  <ConfirmationDialog
    {...properties}
    action={{
      ...properties.action,
      buttonVariant: "primary",
      buttonName: properties.action.buttonName || "Continue",
    }}
  />
);

export const WarningConfirmationDialog = (properties: ConfirmationDialogProperties) => (
  <ConfirmationDialog
    {...properties}
    action={{
      ...properties.action,
      buttonVariant: "destructive",
      buttonName: properties.action.buttonName || "Proceed",
    }}
  />
);
