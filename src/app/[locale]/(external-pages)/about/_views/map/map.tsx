/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// Required for Next.js 14 since we're using client-side features
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { useEffect } from "react";
import { FaMapMarker } from "react-icons/fa";

// Fix for default marker icons in Leaflet
const DefaultIcon = L.icon({
  iconUrl: "/images/marker-icon.png",
  iconRetinaUrl: "/images/marker-icon-2x.png",
  shadowUrl: "/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Custom marker component
export const CustomMarker = () => (
  <div className="text-2xl text-red-600">
    <FaMapMarker />
  </div>
);

export const Map = ({ location }: { location: any }) => {
  const { lat, lng, address } = location;

  useEffect(() => {
    // Ensure Leaflet's default icon is set
    L.Marker.prototype.options.icon = DefaultIcon;
  }, []);

  // Check if coordinates are valid
  if (!lat || !lng) {
    return <div className="flex h-full w-full items-center justify-center bg-gray-100">Invalid location data</div>;
  }

  return (
    <div className="leaflet-container h-full w-full">
      <MapContainer center={[lat, lng]} zoom={17} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[lat, lng]} icon={DefaultIcon}>
          {address && <Popup>{address}</Popup>}
        </Marker>
      </MapContainer>
    </div>
  );
};
