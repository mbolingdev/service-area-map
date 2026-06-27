// A service area is a coverage zone drawn on the map as a circle: a center
// point plus a radius in meters. Radii are visual coverage blobs, not exact
// municipal boundaries, and may overlap so a region reads as one footprint.
export type ServiceArea = {
  id: string;
  name: string;
  /** [latitude, longitude] of the circle center. */
  center: [number, number];
  /** Coverage radius in meters. */
  radiusMeters: number;
  /** Optional circle color (hex). Falls back to a default accent. */
  color?: string;
};

// Sample dataset: neutral coverage zones around the Kansas City metro.
// Swap these out for your own areas.
export const serviceAreas: ServiceArea[] = [
  {
    id: "downtown",
    name: "Downtown",
    center: [39.0997, -94.5786],
    radiusMeters: 8000,
    color: "#2563eb",
  },
  {
    id: "overland-park",
    name: "Overland Park",
    center: [38.9822, -94.6708],
    radiusMeters: 6000,
    color: "#0d9488",
  },
  {
    id: "independence",
    name: "Independence",
    center: [39.0911, -94.4155],
    radiusMeters: 5500,
    color: "#9333ea",
  },
  {
    id: "lees-summit",
    name: "Lee's Summit",
    center: [38.9108, -94.3822],
    radiusMeters: 5000,
    color: "#ea580c",
  },
  {
    id: "liberty",
    name: "Liberty",
    center: [39.2461, -94.4191],
    radiusMeters: 4500,
    color: "#0284c7",
  },
];

// Default circle color when an area does not specify one.
export const DEFAULT_AREA_COLOR = "#2563eb";
