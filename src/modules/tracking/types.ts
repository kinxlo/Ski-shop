export type TrackingStatus =
  | "order_confirmed"
  | "package_ready"
  | "rider_accepted"
  | "rider_at_vendor"
  | "package_picked_up"
  | "rider_on_way"
  | "package_delivered";

export interface RiderInfo {
  id: string;
  name: string;
  phone: string;
  image?: string;
  rating: number;
  reviews: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

export interface TrackingStep {
  status: TrackingStatus;
  title: string;
  description: string;
  completed: boolean;
  timestamp?: string;
}

export interface OrderTrackingData {
  orderId: string;
  productName: string;
  rider: RiderInfo;
  currentStatus: TrackingStatus;
  steps: TrackingStep[];
  estimatedDelivery?: string;
  startLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  destinationLocation: {
    lat: number;
    lng: number;
    address: string;
  };
}
