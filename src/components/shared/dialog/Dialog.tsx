"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { HTMLAttributes, ReactNode } from "react";

interface ReusableDialogProperties extends HTMLAttributes<HTMLDivElement> {
  trigger?: ReactNode;
  title?: string;
  img?: string;
  description?: string;
  children?: ReactNode;
  headerClassName?: string;
  wrapperClassName?: string;
  descriptionClassName?: string;
  open?: boolean;
  hideClose?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ReusableDialog({
  trigger,
  hideClose,
  title,
  description,
  children,
  descriptionClassName,
  headerClassName,
  wrapperClassName,
  className,
  open,
  img,
  onOpenChange,
}: ReusableDialogProperties) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent
        hideClose={hideClose}
        className={cn("border-default h-full items-center sm:max-w-[425px] md:h-fit", className)}
      >
        <DialogHeader className={cn("h-fit", wrapperClassName)}>
          {img && <Image width={100} height={100} src={img || ""} alt="dangerous" className="h-[100px] w-[100px]" />}
          {title && <DialogTitle className={cn("text-2xl", headerClassName)}>{title}</DialogTitle>}
          {description && (
            <DialogDescription className={cn("text-center", descriptionClassName)}>{description}</DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
