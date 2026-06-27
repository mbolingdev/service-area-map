import { ServiceAreaExplorer } from "@/components/ServiceAreaExplorer";
import { serviceAreas } from "@/lib/serviceAreas";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Demo
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Service Area Map
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600">
          A configurable map of coverage zones. Each area is a geofenced circle
          defined by a center point and radius in meters. Hover or focus an area
          to highlight it on the map. Edit one file to map your own regions. No
          API keys, powered by OpenStreetMap tiles.
        </p>
      </header>

      <ServiceAreaExplorer areas={serviceAreas} />

      <p className="mt-6 text-sm text-slate-500">
        Tip: resize the window below 640px to see the lightweight list fallback.
      </p>
    </main>
  );
}
