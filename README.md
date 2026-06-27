# Service Area Map

**Live demo: https://service-area-map-nu.vercel.app**

An interactive, configurable map of service areas: geofenced coverage circles with a responsive selector, built on Leaflet and OpenStreetMap.

## What it does

Renders a set of service areas as color-coded circles on a map. Each area is a center point plus a radius in meters. The map auto-fits to show every circle, and a selector lets visitors highlight an area. On desktop the selector and map stay in sync (hover or focus an area to light it up); on small screens it falls back to a lightweight badge list so phones skip the map cost.

## Notable engineering

- **Geofenced coverage circles.** Areas are modeled as a center and a radius in meters, drawn as Leaflet `Circle`s rather than pins, so coverage reads as real area instead of points.
- **Bounds-fitting that accounts for radius.** The initial view expands each center by its radius before computing bounds, so the outermost circles are never clipped at the edges.
- **SSR-safe Leaflet.** Leaflet reaches for browser globals at import time, so the map is loaded with `next/dynamic` and `ssr: false` from inside a Client Component. It only ever renders in the browser, so the Next.js build and server render stay clean.
- **Responsive map/list fallback.** A media query gates the map: the interactive Leaflet view above 640px, a static badge list below it.
- **No API keys.** Tiles come from OpenStreetMap with proper attribution, so there is nothing to sign up for and nothing to leak. Deploys to Vercel with zero config.

## Configure your own areas

Edit `src/lib/serviceAreas.ts`. Each entry matches this type:

```ts
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
```

Add, remove, or move entries and the map refits itself automatically. The sample data covers a few neutral zones around the Kansas City metro.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # lint
```

## Origin

Extracted from lawnandordermo.com (Lawn & Order), a production lawn-care site I built.
