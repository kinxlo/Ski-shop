"use client";

import { Wrapper } from "@/components/core/layout/wrapper";
import { BackButton } from "@/components/shared/back-button";
import SkiButton from "@/components/shared/button";
import { EmptyState } from "@/components/shared/empty-state";

import { DashboardHeader } from "../../../_components/dashboard-header";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        title="Order Details"
        subtitle="Track all orders from customers and their status"
        showSubscriptionBanner={false}
        icon={<BackButton />}
      />
      <Wrapper className="mx-auto px-0 py-4">
        <EmptyState
          title="Order not found"
          description="The order you're looking for doesn't exist or has been removed."
          descriptionClassName="mb-4"
          actionButton={
            <SkiButton href="/dashboard/orders" variant="primary" size="lg">
              Back to Orders
            </SkiButton>
          }
        />
      </Wrapper>
    </div>
  );
}
