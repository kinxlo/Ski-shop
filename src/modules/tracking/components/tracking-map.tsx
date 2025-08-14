"use client";

import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";

import { OrderTrackingData } from "../types";

interface TrackingMapProperties {
  trackingData: OrderTrackingData;
  apiKey: string;
  showRoute?: boolean;
}

export const TrackingMap = ({ trackingData, apiKey, showRoute = true }: TrackingMapProperties) => {
  const mapReference = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: apiKey,
        version: "weekly",
        libraries: ["places", "geometry"],
      });

      try {
        const google = await loader.load();

        if (mapReference.current) {
          const { startLocation, destinationLocation, rider } = trackingData;

          // Calculate center point between start and destination
          const centerLat = (startLocation.lat + destinationLocation.lat) / 2;
          const centerLng = (startLocation.lng + destinationLocation.lng) / 2;

          const map = new google.maps.Map(mapReference.current, {
            center: { lat: centerLat, lng: centerLng },
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ],
          });

          // Create markers
          const startMarker = new google.maps.Marker({
            position: { lat: startLocation.lat, lng: startLocation.lng },
            map: map,
            title: "Pickup Location",
            icon: {
              url:
                "data:image/svg+xml;charset=UTF-8," +
                encodeURIComponent(`
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 0C12.268 0 6 6.268 6 14c0 10.5 14 26 14 26s14-15.5 14-26c0-7.732-6.268-14-14-14z" fill="#4F46E5"/>
                  <circle cx="20" cy="14" r="6" fill="white"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(40, 40),
              anchor: new google.maps.Point(20, 40),
            },
          });

          const destinationMarker = new google.maps.Marker({
            position: { lat: destinationLocation.lat, lng: destinationLocation.lng },
            map: map,
            title: "Delivery Location",
            icon: {
              url:
                "data:image/svg+xml;charset=UTF-8," +
                encodeURIComponent(`
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 0C12.268 0 6 6.268 6 14c0 10.5 14 26 14 26s14-15.5 14-26c0-7.732-6.268-14-14-14z" fill="#6B7280"/>
                  <circle cx="20" cy="14" r="6" fill="white"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(40, 40),
              anchor: new google.maps.Point(20, 40),
            },
          });

          // Rider marker (if rider is on the way)
          // let riderMarker: google.maps.Marker | null = null;
          if (trackingData.currentStatus === "rider_on_way" || trackingData.currentStatus === "package_picked_up") {
            // riderMarker = new google.maps.Marker({
            //   position: { lat: rider.location.lat, lng: rider.location.lng },
            //   map: map,
            //   title: `${rider.name} - Current Location`,
            //   icon: {
            //     url:
            //       "data:image/svg+xml;charset=UTF-8," +
            //       encodeURIComponent(`
            //       <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            //         <path d="M20 0C12.268 0 6 6.268 6 14c0 10.5 14 26 14 26s14-15.5 14-26c0-7.732-6.268-14-14-14z" fill="#EF4444"/>
            //         <circle cx="20" cy="14" r="6" fill="white"/>
            //       </svg>
            //     `),
            //     scaledSize: new google.maps.Size(40, 40),
            //     anchor: new google.maps.Point(20, 40),
            //   },
            // });
          }

          // Draw route if showRoute is true and rider is on the way
          if (
            showRoute &&
            (trackingData.currentStatus === "rider_on_way" || trackingData.currentStatus === "package_picked_up")
          ) {
            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer({
              map: map,
              suppressMarkers: true, // We'll add our own markers
              polylineOptions: {
                strokeColor: "#4F46E5",
                strokeWeight: 4,
                strokeOpacity: 0.8,
              },
            });

            const request = {
              origin: { lat: rider.location.lat, lng: rider.location.lng },
              destination: { lat: destinationLocation.lat, lng: destinationLocation.lng },
              travelMode: google.maps.TravelMode.DRIVING,
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            directionsService.route(request, (result: any, status: any) => {
              if (status === "OK") {
                directionsRenderer.setDirections(result);
              }
            });
          }

          // Info windows
          const startInfoWindow = new google.maps.InfoWindow({
            content: `
              <div style="max-width: 200px; padding: 8px;">
                <h3 style="margin: 0 0 5px 0; font-weight: 600; color: #333;">Pickup Location</h3>
                <p style="margin: 0; color: #666; font-size: 14px;">${startLocation.address}</p>
              </div>
            `,
          });

          const destinationInfoWindow = new google.maps.InfoWindow({
            content: `
              <div style="max-width: 200px; padding: 8px;">
                <h3 style="margin: 0 0 5px 0; font-weight: 600; color: #333;">Delivery Location</h3>
                <p style="margin: 0; color: #666; font-size: 14px;">${destinationLocation.address}</p>
              </div>
            `,
          });

          // Add click listeners
          startMarker.addListener("click", () => {
            startInfoWindow.open(map, startMarker);
          });

          destinationMarker.addListener("click", () => {
            destinationInfoWindow.open(map, destinationMarker);
          });

          // if (riderMarker) {
          //   const riderInfoWindow = new google.maps.InfoWindow({
          //     content: `
          //       <div style="max-width: 200px; padding: 8px;">
          //         <h3 style="margin: 0 0 5px 0; font-weight: 600; color: #333;">${rider.name}</h3>
          //         <p style="margin: 0; color: #666; font-size: 14px;">Current Location</p>
          //       </div>
          //     `,
          //   });

          //   riderMarker.addListener("click", () => {
          //     riderInfoWindow.open(map, riderMarker);
          //   });
          // }

          setMapLoaded(true);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error loading Google Maps:", error);
      }
    };

    if (trackingData.startLocation.lat && trackingData.startLocation.lng) {
      initMap();
    }
  }, [trackingData, apiKey, showRoute]);

  if (!trackingData.startLocation.lat || !trackingData.startLocation.lng) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-100">
        <p className="text-gray-500">Invalid location data</p>
      </div>
    );
  }

  if (
    !mapLoaded &&
    showRoute &&
    (trackingData.currentStatus === "rider_on_way" || trackingData.currentStatus === "package_picked_up")
  ) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-100">
        <p className="text-gray-500">Map navigation will appear here once Rider is on his way.</p>
      </div>
    );
  }

  return (
    <div
      ref={mapReference}
      className="h-[400px] w-full rounded-lg shadow-lg lg:h-[500px]"
      style={{ minHeight: "400px" }}
    />
  );
};
