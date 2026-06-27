"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import { Circle, MapContainer, TileLayer, Tooltip, useMap } from "react-leaflet";
import { DEFAULT_AREA_COLOR, type ServiceArea } from "@/lib/serviceAreas";

// OpenStreetMap standard tiles. Free, no API key required.
const TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// Fallback center used only until the map fits itself to the areas.
const FALLBACK_CENTER: [number, number] = [39.0997, -94.5786];

// Fits the map to every service-area circle once on mount, expanding each
// center by its radius so the outer circles are never clipped.
function FitToAreas({ areas }: { areas: ServiceArea[] }) {
  const map = useMap();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || areas.length === 0) return;
    initialized.current = true;

    const bounds = L.latLngBounds(
      areas.flatMap((area) => {
        const center = L.latLng(area.center[0], area.center[1]);
        // toBounds() takes the full side length, so pass radius * 2.
        const box = center.toBounds(area.radiusMeters * 2);
        return [box.getNorthEast(), box.getSouthWest()];
      }),
    );

    map.fitBounds(bounds, { padding: [24, 24], animate: false });
  }, [areas, map]);

  return null;
}

type ServiceAreaMapInnerProps = {
  areas: ServiceArea[];
  activeArea?: string | null;
  onAreaHover?: (areaId: string | null) => void;
};

export default function ServiceAreaMapInner({
  areas,
  activeArea = null,
  onAreaHover,
}: ServiceAreaMapInnerProps) {
  return (
    <MapContainer
      className="service-area-map"
      center={FALLBACK_CENTER}
      zoom={10}
      zoomSnap={0.25}
      zoomDelta={0.5}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} maxZoom={19} />
      <FitToAreas areas={areas} />
      {areas.map((area) => {
        const isActive = activeArea === area.id;
        const color = area.color ?? DEFAULT_AREA_COLOR;

        return (
          <Circle
            key={area.id}
            center={area.center}
            radius={area.radiusMeters}
            eventHandlers={{
              mouseover: () => onAreaHover?.(area.id),
              mouseout: () => onAreaHover?.(null),
            }}
            pathOptions={{
              className: isActive ? "area-circle-active" : "area-circle",
              color,
              weight: isActive ? 4 : 2,
              fillColor: color,
              fillOpacity: isActive ? 0.34 : 0.15,
            }}
          >
            <Tooltip permanent direction="center" className="service-area-label">
              {area.name}
            </Tooltip>
          </Circle>
        );
      })}
    </MapContainer>
  );
}
