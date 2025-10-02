"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import type { ReactNode } from "react";

import empty1 from "~/images/alert.png";
import SkiButton from "../button";

interface ImageConfig {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface EmptyStateProperties {
  images: ImageConfig[];
  title?: string;
  description: string;
  button?: {
    text: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  className?: string;
  descriptionClassName?: string;
  titleClassName?: string;
  actionButton?: React.ReactNode;
}

export const EmptyStateTemplate = ({
  images,
  title,
  description,
  button,
  actionButton,
  className = "",
  descriptionClassName = "",
  titleClassName = "",
}: EmptyStateProperties) => {
  return (
    <div
      className={cn(
        "bg-mid-grey-I flex min-h-[400px] w-full flex-col items-center justify-center space-y-0 rounded-lg px-4 py-10 text-center dark:bg-[#111111]",
        className,
      )}
    >
      {/* Images container */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width || 240}
              height={image.height || 160}
              className="object-contain"
              priority
            />
          </div>
        ))}
      </div>

      {/* Content container */}
      <div className="flex flex-col items-center">
        {title && <h3 className={cn(`text-h5 text-primary font-semibold`, titleClassName)}>{title}</h3>}
        <p
          className={cn("text-muted-foreground max-w-[500px] !text-sm font-medium md:!text-base", descriptionClassName)}
        >
          {description}
        </p>
        {button ? (
          <SkiButton onClick={button.onClick} variant="primary" size="xl" className="">
            {button.icon && <span className="mr-2">{button.icon}</span>}
            {button.text}
          </SkiButton>
        ) : (
          actionButton
        )}
      </div>
    </div>
  );
};

export const FilteredEmptyState = ({ onReset }: { onReset: () => void }) => (
  <EmptyStateTemplate
    images={[{ src: empty1.src, alt: "No filtered results", width: 30, height: 30 }]}
    title="No matching results found"
    description="Try adjusting your date range or status filter to find what you're looking for."
    className={`space-y-0 py-10`}
    titleClassName={`!text-2xl text-primary font-semibold`}
    descriptionClassName={`text-muted-foreground max-w-[500px] font-medium`}
    button={{
      text: "Reset Filters",
      onClick: onReset,
    }}
  />
);

export interface ErrorStateProperties {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryText?: string;
  imageSource?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  className?: string;
  descriptionClassName?: string;
  titleClassName?: string;
  buttonClassName?: string;
  actionButton?: ReactNode; // fully override the action area
}

export const ErrorState = ({
  title,
  description = `Something went wrong, please try again later.`,
  onRetry,
  retryText = "Retry",
  imageSource = "/images/error.svg",
  imageAlt = "Error",
  imageWidth = 50,
  imageHeight = 50,
  className = "bg-low-warning/5 space-y-0 rounded-lg",
  descriptionClassName = "text-mid-danger",
  titleClassName,
  buttonClassName = "border-mid-danger text-mid-danger hover:bg-mid-danger/10 mt-2 border",
  actionButton,
}: ErrorStateProperties) => {
  const action =
    actionButton ??
    (onRetry && (
      <SkiButton size="sm" onClick={onRetry} variant="outline" className={buttonClassName}>
        {retryText}
      </SkiButton>
    ));

  return (
    <EmptyStateTemplate
      images={[
        {
          src: imageSource,
          alt: imageAlt,
          width: imageWidth,
          height: imageHeight,
        },
      ]}
      title={title}
      description={description}
      className={className}
      titleClassName={titleClassName}
      descriptionClassName={descriptionClassName}
      actionButton={action}
    />
  );
};

export interface EmptyStateProperties_ {
  images?: ImageConfig[];
  title?: string;
  description?: string;
  imageSource?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  className?: string;
  descriptionClassName?: string;
  titleClassName?: string;
  button?: {
    text: string;
    onClick: () => void;
    icon?: ReactNode;
  };
  actionButton?: ReactNode;
}

export const EmptyState = ({
  images,
  title = "No products found",
  description = "There are no products available.",
  imageSource = "/images/empty-state.svg",
  imageAlt = "No products found",
  imageWidth = 30,
  imageHeight = 30,
  className = "bg-mid-grey-I space-y-0 rounded-lg",
  titleClassName = "!text-lg font-bold !text-mid-warning",
  descriptionClassName = "",
  button,
  actionButton,
}: EmptyStateProperties_) => {
  const finalImages =
    images && images.length > 0
      ? images
      : [
          {
            src: imageSource,
            alt: imageAlt,
            width: imageWidth,
            height: imageHeight,
          },
        ];

  const action =
    actionButton ??
    (button && (
      <SkiButton onClick={button.onClick} variant="primary" size="xl" className="">
        {button.icon && <span className="mr-2">{button.icon}</span>}
        {button.text}
      </SkiButton>
    ));

  return (
    <EmptyStateTemplate
      images={finalImages}
      title={title}
      description={description || ""}
      className={className}
      titleClassName={titleClassName}
      descriptionClassName={descriptionClassName}
      actionButton={action}
    />
  );
};
