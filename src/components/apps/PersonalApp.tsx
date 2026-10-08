import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Image, MapPin, Maximize2, X } from 'lucide-react';
import { PERSONAL_DATA } from '../../data/portfolioData';

const TRAVEL_MAPS: Record<string, { src: string; width: number; height: number }> = {
  Philippines: { src: '/images/maps/Map_of_the_Philippines.svg', width: 36070, height: 59220 },
  Nepal: { src: '/images/maps/Nepal_location_map.svg', width: 1200, height: 713.68 },
  Malaysia: { src: '/images/maps/Blank_malaysia_map.svg', width: 915, height: 400 }
};
export const PersonalApp: React.FC = () => {
  const [selectedLocationId, setSelectedLocationId] = useState(PERSONAL_DATA.travelLocations[0]?.id ?? '');
  const [fullscreenLocation, setFullscreenLocation] = useState<(typeof PERSONAL_DATA.travelLocations)[number] | null>(null);
  const selectedLocation = PERSONAL_DATA.travelLocations.find((location) => location.id === selectedLocationId);
  const selectedMap = selectedLocation ? TRAVEL_MAPS[selectedLocation.country] : undefined;
  const mapLocations = selectedLocation
    ? PERSONAL_DATA.travelLocations.filter((location) => location.country === selectedLocation.country)
    : [];
  const pinClusterRadius = selectedLocation?.country === 'Philippines' ? 4000 : 40;
  const mapPinClusters: (typeof mapLocations)[] = [];

  mapLocations.forEach((location) => {
    const cluster = mapPinClusters.find((locations) =>
      locations.some((nearby) => Math.hypot(location.mapX - nearby.mapX, location.mapY - nearby.mapY) < pinClusterRadius)
    );
    if (cluster) cluster.push(location);
    else mapPinClusters.push([location]);
  });

  const selectLocation = (id: string) => setSelectedLocationId(id);

  useEffect(() => {
    if (!fullscreenLocation) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFullscreenLocation(null);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [fullscreenLocation]);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden p-4 sm:p-6">
      <section className="personal-section flex min-h-0 flex-1 flex-col">
        <div className="mb-4 flex items-center gap-2">
          <Image className="h-4 w-4 text-rose-300" />
          <h2 className="text-sm font-semibold text-white">Travel Gallery</h2>
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1.15fr)_minmax(180px,0.85fr)] gap-4">
          <div className="grid min-h-0 grid-cols-2 content-start gap-3 overflow-y-auto pr-1 xl:grid-cols-3">
            {PERSONAL_DATA.travelLocations.map((location) => (
              <div key={location.id} className="relative min-w-0">
                <button
                  type="button"
                  onClick={() => selectLocation(location.id)}
                  aria-pressed={selectedLocationId === location.id}
                  className={`travel-photo w-full text-left ${selectedLocationId === location.id ? 'travel-photo-active' : ''}`}
                >
                  <img src={location.src} alt={location.alt} loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover" />
                  <span className="mt-2 block truncate text-xs font-medium text-white">{location.title}</span>
                  <span className="mt-0.5 block truncate text-[11px] text-slate-400">{location.city}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFullscreenLocation(location)}
                  aria-label={`View ${location.title} full screen`}
                  title="View full screen"
                  className="absolute right-3 top-3 rounded-md bg-black/65 p-1.5 text-white transition hover:bg-black/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  <Maximize2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>

          <aside className="travel-map-panel">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-teal-300" />
                <div>
                  <h3 className="text-xs font-semibold text-white">Places on the map</h3>
                  <p className="text-[10px] text-slate-400">Philippines · Nepal · Malaysia</p>
                </div>
              </div>
              {selectedLocation && <span className="max-w-24 truncate rounded-full bg-white/10 px-2 py-1 text-[10px] text-slate-300">{selectedLocation.country}</span>}
            </div>
            <div
              className="travel-map-frame"
              data-country={selectedLocation?.country}
              style={selectedMap ? { aspectRatio: `${selectedMap.width} / ${selectedMap.height}` } : undefined}
              role="group"
              aria-label={`Interactive map of ${selectedLocation?.country ?? 'travel'} locations`}
            >
              {selectedMap && (
                <>
                  <img src={selectedMap.src} alt={`${selectedLocation?.country} map`} className="travel-map-image" />
                  {mapPinClusters.map((locations) => {
                    const selectedIndex = locations.findIndex((location) => location.id === selectedLocationId);
                    const location = selectedIndex >= 0 ? locations[selectedIndex] : locations[0];
                    const isSelected = selectedIndex >= 0;
                    const nextLocation = locations[(selectedIndex + 1) % locations.length];
                    const label = locations.length > 1
                      ? `Cycle photos near ${location.city}, ${location.country}`
                      : `Show ${location.title}, ${location.city}, ${location.country}`;
                    return (
                      <button
                        key={locations.map((item) => item.id).join('-')}
                        type="button"
                        aria-label={label}
                        aria-pressed={isSelected}
                        title={locations.length > 1 ? `${label} (${locations.length})` : `${location.title} · ${location.city}`}
                        onClick={() => selectLocation(nextLocation.id)}
                        className={`travel-map-pin ${isSelected ? 'travel-map-pin-active' : ''}`}
                        style={{
                          left: `${(location.mapX / selectedMap.width) * 100}%`,
                          top: `${(location.mapY / selectedMap.height) * 100}%`
                        }}
                      >
                        {isSelected && <span className="travel-map-pin-pulse" aria-hidden="true" />}
                        <MapPin className="travel-map-pin-icon" aria-hidden="true" />
                      </button>
                    );
                  })}
                </>
              )}
            </div>
            {selectedLocation && <p className="mt-2 truncate text-[11px] text-slate-300">{selectedLocation.city}, {selectedLocation.country}</p>}
          </aside>
        </div>
      </section>

      {fullscreenLocation && createPortal(
        <div
          className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/95 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${fullscreenLocation.title} full-screen image`}
          onClick={() => setFullscreenLocation(null)}
        >
          <button
            type="button"
            onClick={() => setFullscreenLocation(null)}
            aria-label="Close full-screen image"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:right-6 sm:top-6"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <img
            src={fullscreenLocation.src}
            alt={fullscreenLocation.alt}
            className="max-h-full max-w-full object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      , document.body)}
    </div>
  );
};
