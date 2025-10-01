"use client";

import SkiButton from "@/components/shared/button";
import { ReusableDialog } from "@/components/shared/dialog/Dialog";

type FeedbackDialogProperties = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  variant?: "success" | "info";
};

export const FeedbackDialog = ({
  isOpen,
  onOpenChange,
  title,
  description,
  variant = "success",
}: FeedbackDialogProperties) => {
  const img = variant === "success" ? "/images/success.svg" : "/images/info.svg";

  return (
    <ReusableDialog
      open={isOpen}
      onOpenChange={onOpenChange}
      trigger={<div />}
      title={title}
      description={description}
      img={img}
      headerClassName="!text-xl font-semibold text-center"
      className="items-center sm:max-w-md"
      wrapperClassName={`items-center`}
    >
      <div className="flex w-full items-center justify-center pb-2">
        <SkiButton onClick={() => onOpenChange(false)} variant="primary" size="lg" className="min-w-[120px]">
          Close
        </SkiButton>
      </div>
    </ReusableDialog>
  );
};
