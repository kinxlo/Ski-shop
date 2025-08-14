import { OrderTrackingData, RiderInfo, TrackingStatus, TrackingStep } from "../types";

export const createTrackingSteps = (currentStatus: TrackingStatus): TrackingStep[] => {
  const allSteps: TrackingStep[] = [
    {
      status: "order_confirmed",
      title: "Order confirmed",
      description: "Your order has been confirmed and is being processed",
      completed: true,
      timestamp: new Date().toISOString(),
    },
    {
      status: "package_ready",
      title: "Package ready to be shipped",
      description: "Your package is ready and waiting for pickup",
      completed: [
        "package_ready",
        "rider_accepted",
        "rider_at_vendor",
        "package_picked_up",
        "rider_on_way",
        "package_delivered",
      ].includes(currentStatus),
      timestamp: currentStatus === "order_confirmed" ? undefined : new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
    {
      status: "rider_accepted",
      title: "Rider accepted the order",
      description: "A rider has accepted your delivery request",
      completed: [
        "rider_accepted",
        "rider_at_vendor",
        "package_picked_up",
        "rider_on_way",
        "package_delivered",
      ].includes(currentStatus),
      timestamp: [
        "rider_accepted",
        "rider_at_vendor",
        "package_picked_up",
        "rider_on_way",
        "package_delivered",
      ].includes(currentStatus)
        ? new Date(Date.now() - 25 * 60 * 1000).toISOString()
        : undefined,
    },
    {
      status: "rider_at_vendor",
      title: "Rider is at the Vendor",
      description: "The rider has arrived at the pickup location",
      completed: ["rider_at_vendor", "package_picked_up", "rider_on_way", "package_delivered"].includes(currentStatus),
      timestamp: ["rider_at_vendor", "package_picked_up", "rider_on_way", "package_delivered"].includes(currentStatus)
        ? new Date(Date.now() - 20 * 60 * 1000).toISOString()
        : undefined,
    },
    {
      status: "package_picked_up",
      title: "Package Picked Up",
      description: "The rider has picked up your package",
      completed: ["package_picked_up", "rider_on_way", "package_delivered"].includes(currentStatus),
      timestamp: ["package_picked_up", "rider_on_way", "package_delivered"].includes(currentStatus)
        ? new Date(Date.now() - 15 * 60 * 1000).toISOString()
        : undefined,
    },
    {
      status: "rider_on_way",
      title: "Rider is on the way to the buyer",
      description: "The rider is on the way to deliver your package",
      completed: ["rider_on_way", "package_delivered"].includes(currentStatus),
      timestamp: ["rider_on_way", "package_delivered"].includes(currentStatus)
        ? new Date(Date.now() - 10 * 60 * 1000).toISOString()
        : undefined,
    },
    {
      status: "package_delivered",
      title: "Package Delivered",
      description: "Your package has been delivered successfully",
      completed: currentStatus === "package_delivered",
      timestamp: currentStatus === "package_delivered" ? new Date().toISOString() : undefined,
    },
  ];

  return allSteps;
};

export const createTrackingData = (
  orderId: string,
  productName: string,
  rider: RiderInfo,
  currentStatus: TrackingStatus = "order_confirmed",
  startLocation?: { lat: number; lng: number; address: string },
  destinationLocation?: { lat: number; lng: number; address: string },
): OrderTrackingData => {
  return {
    orderId,
    productName,
    rider,
    currentStatus,
    steps: createTrackingSteps(currentStatus),
    estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes from now
    startLocation: startLocation || {
      lat: 6.5244, // Lagos coordinates
      lng: 3.3792,
      address: "Vendor Location, Lagos, Nigeria",
    },
    destinationLocation: destinationLocation || {
      lat: 6.6018, // Different location in Lagos
      lng: 3.3515,
      address: "Delivery Address, Lagos, Nigeria",
    },
  };
};

export const updateTrackingStatus = (trackingData: OrderTrackingData, newStatus: TrackingStatus): OrderTrackingData => {
  return {
    ...trackingData,
    currentStatus: newStatus,
    steps: createTrackingSteps(newStatus),
  };
};

export const getNextStatus = (currentStatus: TrackingStatus): TrackingStatus | null => {
  const statusFlow: TrackingStatus[] = [
    "order_confirmed",
    "package_ready",
    "rider_accepted",
    "rider_at_vendor",
    "package_picked_up",
    "rider_on_way",
    "package_delivered",
  ];

  const currentIndex = statusFlow.indexOf(currentStatus);
  return currentIndex < statusFlow.length - 1 ? statusFlow[currentIndex + 1] : null;
};
