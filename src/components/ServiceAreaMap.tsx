"use client";

import dynamic from "next/dynamic";
import type { ServiceArea } from "@/lib/serviceAreas";

// Leaflet touches browser globals on load, so the actual map is loaded
// client-only. `ssr: false` is only allowed inside a Client Component, which
// is why this wrapper carries the "use client" directive.
const ServiceAreaMapInner = dynamic(() => import("./ServiceAreaMapInner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[320px] items-center justify-center bg-slate-100 text-sm font-medium text-slate-500">
      Loading map…
    </div>
  ),
});

type ServiceAreaMapProps = {
  areas: ServiceArea[];
  activeArea?: string | null;
  onAreaHover?: (areaId: string | null) => void;
};

export function ServiceAreaMap({
  areas,
  activeArea = null,
  onAreaHover,
}: ServiceAreaMapProps) {
  return (
    <ServiceAreaMapInner
      areas={areas}
      activeArea={activeArea}
      onAreaHover={onAreaHover}
    />
  );
}
