'use client';

import { MapContainer, TileLayer, Polygon, Popup, Tooltip, useMap, Marker } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { coverageZones, mapCenter, defaultZoom } from '@/data/coverageZones';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function LeafletMap({
    center = mapCenter,
    zoom = defaultZoom,
    markerPosition = null
}: {
    center?: [number, number],
    zoom?: number,
    markerPosition?: [number, number] | null
}) {
    return (
        <MapContainer
            center={center}
            zoom={zoom}
            scrollWheelZoom={false}
            className="h-full w-full rounded-xl z-0"
            style={{ height: '100%', width: '100%' }}
        >
            <MapController center={center} zoom={zoom} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {coverageZones.map((zone) => (
                <Polygon
                    key={zone.id}
                    positions={zone.coordinates}
                    pathOptions={{
                        color: zone.color,
                        fillColor: zone.color,
                        fillOpacity: 0.2,
                        weight: 2
                    }}
                >
                    <Tooltip sticky>{zone.name}</Tooltip>
                    <Popup>
                        <div className="p-2">
                            <h3 className="font-bold text-lg">{zone.name}</h3>
                            <p className="text-sm">This area is fully covered by Simple Connectivity.</p>
                        </div>
                    </Popup>
                </Polygon>
            ))}
            {markerPosition && <Marker position={markerPosition} />}
        </MapContainer>
    );
}

function MapController({ center, zoom }: { center: [number, number], zoom: number }) {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, zoom, { duration: 1.5 });
    }, [center, zoom, map]);
    return null;
}
