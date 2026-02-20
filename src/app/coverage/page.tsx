'use client';

import dynamic from 'next/dynamic';
import { MapPin, CheckCircle2, Search, Loader2, Navigation, XCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/Button';
import { coverageZones, mapCenter, defaultZoom, isPointInPolygon } from '@/data/coverageZones';

export default function CoveragePage() {
    const Map = useMemo(() => dynamic(
        () => import('@/components/LeafletMap'),
        {
            loading: () => <div className="h-full w-full bg-secondary/20 animate-pulse rounded-xl flex items-center justify-center text-muted-foreground">Loading Map...</div>,
            ssr: false
        }
    ), []);

    const [address, setAddress] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResult, setSearchResult] = useState<'covered' | 'not-covered' | null>(null);
    const [mapView, setMapView] = useState<{
        center: [number, number];
        zoom: number;
        markerPosition: [number, number] | null;
    }>({
        center: mapCenter,
        zoom: defaultZoom,
        markerPosition: null
    });

    const checkCoverage = (lat: number, lng: number) => {
        const point: [number, number] = [lat, lng];
        let isCovered = false;

        for (const zone of coverageZones) {
            if (isPointInPolygon(point, zone.coordinates)) {
                isCovered = true;
                break;
            }
        }

        setSearchResult(isCovered ? 'covered' : 'not-covered');
        setMapView({
            center: point,
            zoom: 15,
            markerPosition: point
        });
    };

    const handleSearch = async () => {
        if (!address.trim()) return;

        setIsSearching(true);
        setSearchResult(null);

        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&countrycodes=za`);
            const data = await response.json();

            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                checkCoverage(parseFloat(lat), parseFloat(lon));
            } else {
                alert('Address not found. Please try being more specific (e.g., include suburb or city).');
            }
        } catch (error) {
            console.error('Search error:', error);
            alert('An error occurred while searching. Please try again.');
        } finally {
            setIsSearching(false);
        }
    };

    const handleCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by this browser.");
            return;
        }

        setIsSearching(true);
        setSearchResult(null);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                checkCoverage(position.coords.latitude, position.coords.longitude);
                setIsSearching(false);
            },
            (error) => {
                console.error("Error getting location", error);
                setIsSearching(false);
                let msg = "Could not get your location.";
                if (error.code === 1) msg = "Location permission denied.";
                else if (error.code === 2) msg = "Location unavailable.";
                else if (error.code === 3) msg = "Location request timed out.";
                alert(msg);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="min-h-screen bg-background pt-32 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-180px)] min-h-[600px] flex flex-col">
                <div className="mb-12 text-center space-y-4">

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Coverage <span className="text-primary">Map</span>
                    </h1>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-grow">
                    {/* Search Panel */}
                    <div className="lg:col-span-1 bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col h-full overflow-y-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-primary/10 rounded-full">
                                <Search className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold">Find Location</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Enter street address..."
                                        className="w-full h-12 pl-4 pr-12 rounded-xl bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary border border-border text-sm"
                                        disabled={isSearching}
                                    />
                                    <button
                                        onClick={handleSearch}
                                        disabled={isSearching || !address.trim()}
                                        className="absolute right-1 top-1 h-10 w-10 flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {isSearching ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
                                    </button>
                                </div>

                                <Button
                                    className="w-full gap-2"
                                    size="lg"
                                    variant="outline"
                                    onClick={handleCurrentLocation}
                                    disabled={isSearching}
                                >
                                    <Navigation size={18} />
                                    Use Current Location
                                </Button>
                            </div>

                            {/* Results Display */}
                            {searchResult ? (
                                <div className={`rounded-xl p-4 border ${searchResult === 'covered'
                                    ? 'bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400'
                                    : 'bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400'
                                    } animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                                    <div className="flex items-start gap-3">
                                        {searchResult === 'covered' ? (
                                            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                                        ) : (
                                            <XCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                        )}
                                        <div>
                                            <h4 className="font-bold text-sm mb-1">
                                                {searchResult === 'covered' ? 'You\'re Covered!' : 'Out of Range'}
                                            </h4>
                                            <p className="text-xs opacity-90 leading-relaxed">
                                                {searchResult === 'covered'
                                                    ? 'Great news! You can get connected today.'
                                                    : 'We haven\'t reached this area yet.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="pt-4 border-t border-border">
                                    <p className="text-sm font-medium mb-3 text-muted-foreground">Active Zones</p>
                                    <div className="flex items-start gap-3 mb-4">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-sm">Springs Central</h4>
                                            <p className="text-xs text-muted-foreground">Full coverage available.</p>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-secondary/50 rounded-xl border border-border/50">
                                        <p className="text-xs text-muted-foreground">
                                            Expanding rapidly! Contact us to request coverage.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Map Container */}
                    <div className="lg:col-span-3 bg-card border border-border rounded-2xl shadow-sm p-2 relative z-0 h-full min-h-[500px]">
                        <Map
                            center={mapView.center}
                            zoom={mapView.zoom}
                            markerPosition={mapView.markerPosition}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
