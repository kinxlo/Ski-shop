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
    headerClassName = "text-center font-semibold",
    wrapperClassName = "flex flex-col items-center justify-center text-center",
    content,
    icon,
    iconClassName = "mx-auto mb-4",
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
    >
      <div className="space-y-4">
        {/* Custom Icon */}
        {icon && <div className={iconClassName}>{icon}</div>}

        {/* Custom Content */}
        {content && <div className="py-2">{content}</div>}

        {/* Custom Image (if ReactNode) */}
        {typeof action.img === "object" && action.img && <div className="flex justify-center py-2">{action.img}</div>}

        {/* Action Buttons */}
        <div className="flex justify-center gap-3 pt-4">
          {showCancelButton && (
            <SkiButton variant={finalCancelButtonVariant} onClick={handleCancel} size={size} isDisabled={pending}>
              {cancelButtonName}
            </SkiButton>
          )}
          {showConfirmButton && (
            <SkiButton
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
