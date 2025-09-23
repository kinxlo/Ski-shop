import { Badge, type badgeVariants } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

function isEmpty(value: React.ReactNode | undefined | null) {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim().length === 0;
  return false;
}

export interface DetailsSectionProperties {
  title: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  children: React.ReactNode;
  bordered?: boolean;
}

export function DetailsSection({
  title,
  action,
  className,
  headerClassName,
  contentClassName,
  children,
  bordered = false,
}: DetailsSectionProperties) {
  return (
    <Card className={cn("border-none shadow-none", className)}>
      <CardHeader className={cn(bordered && "border-b", headerClassName)}>
        <CardTitle className="text-sm">{title}</CardTitle>
        {action ? <CardAction>{action}</CardAction> : null}
      </CardHeader>
      <CardContent className={cn("py-6", contentClassName)}>{children}</CardContent>
    </Card>
  );
}

export interface DetailsGridProperties {
  className?: string;
  columnsClassName?: string;
  children: React.ReactNode;
}

/**
 * Responsive default: 1 col -> 2 cols (md) -> 5 cols (xl)
 */
export function DetailsGrid({
  className,
  columnsClassName = "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5",
  children,
}: DetailsGridProperties) {
  return <div className={cn(columnsClassName, className)}>{children}</div>;
}

export interface DetailsItemProperties {
  label: React.ReactNode;
  value?: React.ReactNode;
  /**
   * When provided, value will be rendered inside a Badge for status-like presentation.
   */
  badgeVariant?: BadgeVariant;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
  /**
   * Optional fallback when value is empty (defaults to "—")
   */
  emptyFallback?: React.ReactNode;
  children?: React.ReactNode;
}

export function DetailsItem({
  label,
  value,
  badgeVariant,
  className,
  valueClassName,
  labelClassName,
  emptyFallback = "-",
  children,
}: DetailsItemProperties) {
  const content = children ?? value;

  return (
    <div className={cn("min-h-12", className)}>
      <p className={cn("text-muted-foreground text-xs", labelClassName)}>{label}</p>
      <div className="mt-1">
        {isEmpty(content) ? (
          <span className={cn("text-muted-foreground text-xs", valueClassName)}>{emptyFallback}</span>
        ) : badgeVariant ? (
          <Badge variant={badgeVariant}>{content}</Badge>
        ) : (
          <span className={cn("text-xs font-medium", valueClassName)}>{content}</span>
        )}
      </div>
    </div>
  );
}

export interface StatGridProperties {
  className?: string;
  columnsClassName?: string;
  children: React.ReactNode;
}

/**
 * Stats grid for numeric/summary KPIs. Default: 2 cols (sm) -> 6 cols (xl)
 */
export function StatGrid({
  className,
  columnsClassName = "grid grid-cols-2 gap-6 sm:grid-cols-3 xl:grid-cols-6",
  children,
}: StatGridProperties) {
  return <div className={cn(columnsClassName, className)}>{children}</div>;
}

export interface StatItemProperties {
  label: React.ReactNode;
  value?: React.ReactNode;
  emptyFallback?: React.ReactNode;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}

export function StatItem({
  label,
  value,
  emptyFallback = "—",
  className,
  valueClassName,
  labelClassName,
}: StatItemProperties) {
  const isEmptyValue = isEmpty(value);
  return (
    <div className={cn("min-h-12", className)}>
      <p className={cn("text-muted-foreground text-xs", labelClassName)}>{label}</p>
      <div className="mt-1">
        <span className={cn("text-base font-semibold tracking-tight", valueClassName)}>
          {isEmptyValue ? emptyFallback : value}
        </span>
      </div>
    </div>
  );
}

export const Details = {
  Section: DetailsSection,
  Grid: DetailsGrid,
  Item: DetailsItem,
  StatGrid,
  StatItem,
};
