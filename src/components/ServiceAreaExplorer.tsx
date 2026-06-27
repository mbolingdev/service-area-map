"use client";

import { useEffect, useState } from "react";
import { ServiceAreaMap } from "@/components/ServiceAreaMap";
import { DEFAULT_AREA_COLOR, type ServiceArea } from "@/lib/serviceAreas";

type ServiceAreaExplorerProps = {
  areas: ServiceArea[];
};

const desktopMapQuery = "(min-width: 640px)";

export function ServiceAreaExplorer({ areas }: ServiceAreaExplorerProps) {
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);

  // The interactive map only renders at >=640px. Below that we fall back to a
  // lightweight badge list, so small screens skip the map cost entirely.
  useEffect(() => {
    const mediaQuery = window.matchMedia(desktopMapQuery);
    const syncMapVisibility = () => setShowMap(mediaQuery.matches);

    syncMapVisibility();
    mediaQuery.addEventListener("change", syncMapVisibility);

    return () => {
      mediaQuery.removeEventListener("change", syncMapVisibility);
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
      {showMap ? (
        <div className="hidden h-[560px] overflow-hidden sm:block sm:h-[600px]">
          <ServiceAreaMap
            areas={areas}
            activeArea={activeArea}
            onAreaHover={setActiveArea}
          />
        </div>
      ) : (
        <div className="p-5 sm:hidden">
          <p className="text-sm leading-6 text-slate-600">
            Coverage zones in this region:
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {areas.map((area) => (
              <span
                key={area.id}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: area.color ?? DEFAULT_AREA_COLOR }}
                />
                {area.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="hidden flex-wrap gap-2 border-t border-slate-200 p-5 sm:flex">
        {areas.map((area) => {
          const isActive = activeArea === area.id;
          const color = area.color ?? DEFAULT_AREA_COLOR;

          return (
            <button
              key={area.id}
              type="button"
              onMouseEnter={() => setActiveArea(area.id)}
              onMouseLeave={() => setActiveArea(null)}
              onFocus={() => setActiveArea(area.id)}
              onBlur={() => setActiveArea(null)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition ${
                isActive
                  ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: color }}
              />
              {area.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
