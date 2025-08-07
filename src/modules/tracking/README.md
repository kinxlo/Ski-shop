# Order Tracking Module

This module provides a complete order tracking system with Google Maps integration, real-time status updates, and rider rating functionality.

## Features

- **Real-time Tracking**: Live map with rider location and route visualization
- **Status Timeline**: Visual progress tracking with timestamps
- **Rider Information**: Display rider details with contact options
- **Rating System**: Rate and review delivery riders
- **Google Maps Integration**: Uses existing Google Maps API implementation

## Components

### OrderTracking

Main component that combines all tracking features.

```tsx
import { OrderTracking } from "@/modules/tracking";

<OrderTracking
  trackingData={trackingData}
  apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
  onStatusUpdate={handleStatusUpdate}
  onRateRider={handleRateRider}
/>;
```

### TrackingMap

Google Maps component for route visualization.

```tsx
import { TrackingMap } from "@/modules/tracking";

<TrackingMap trackingData={trackingData} apiKey={apiKey} showRoute={true} />;
```

### TrackingTimeline

Visual timeline showing delivery progress.

```tsx
import { TrackingTimeline } from "@/modules/tracking";

<TrackingTimeline steps={trackingData.steps} />;
```

### RiderRating

Rating modal for riders.

```tsx
import { RiderRating } from "@/modules/tracking";

<RiderRating rider={riderInfo} onSubmit={handleRatingSubmit} onCancel={handleCancel} />;
```

## Types

### OrderTrackingData

```tsx
interface OrderTrackingData {
  orderId: string;
  productName: string;
  rider: RiderInfo;
  currentStatus: TrackingStatus;
  steps: TrackingStep[];
  estimatedDelivery?: string;
  startLocation: Location;
  destinationLocation: Location;
}
```

### TrackingStatus

```tsx
type TrackingStatus =
  | "order_confirmed"
  | "package_ready"
  | "rider_accepted"
  | "rider_at_vendor"
  | "package_picked_up"
  | "rider_on_way"
  | "package_delivered";
```

## Utilities

### createTrackingData

Creates tracking data from order and rider information.

```tsx
import { createTrackingData } from "@/modules/tracking/utils/tracking-utils";

const trackingData = createTrackingData(orderId, productName, riderInfo, "rider_accepted");
```

### updateTrackingStatus

Updates tracking status and regenerates timeline.

```tsx
import { updateTrackingStatus } from "@/modules/tracking/utils/tracking-utils";

const updatedData = updateTrackingStatus(trackingData, "package_picked_up");
```

## Integration Example

```tsx
import { createTrackingData, OrderTracking } from "@/modules/tracking";

// In your order detail component
const [trackingData, setTrackingData] = useState(null);
const [showTracking, setShowTracking] = useState(false);

const handleAssignRider = (riderId: string, riderInfo) => {
  const newTrackingData = createTrackingData(orderId, productName, riderInfo, "rider_accepted");

  setTrackingData(newTrackingData);
  setShowTracking(true);
};

// Render tracking modal
{
  showTracking && trackingData && (
    <ReusableDialog open={showTracking} onOpenChange={setShowTracking}>
      <OrderTracking
        trackingData={trackingData}
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        onStatusUpdate={handleStatusUpdate}
        onRateRider={handleRateRider}
      />
    </ReusableDialog>
  );
}
```

## Environment Variables

Make sure to set your Google Maps API key:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

## Dependencies

- `@googlemaps/js-api-loader`: Google Maps JavaScript API loader
- `lucide-react`: Icons
- Existing UI components from the project
