'use client';

import { useState } from 'react';
import { Search, Loader2, MapPin, ArrowDown, CheckCircle2, XCircle, Check } from 'lucide-react';
import { Button } from '@/components/Button';
import { coverageZones, isPointInPolygon } from '@/data/coverageZones';

const packages = [
    {
        speed: '10Mbps',
        price: 299,
        features: ['Uncapped Data', 'Free Installation', 'Best for Browsing', 'Connect multiple devices'],
        recommended: false,
    },
    {
        speed: '30Mbps',
        price: 399,
        features: ['Uncapped Data', 'Free Installation', 'Best for Streaming', 'Connect multiple devices', 'Low Latency'],
        recommended: true,
    },
    {
        speed: '40Mbps',
        price: 699,
        features: ['Uncapped Data', 'Free Installation', 'Best for Gaming', 'Connect multiple devices', 'Ultra Low Latency', 'Priority Support'],
        recommended: false,
    },
];

export default function ResidentialPage() {
    const [address, setAddress] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResult, setSearchResult] = useState<'covered' | 'not-covered' | null>(null);

    const handleSearch = async () => {
        if (!address.trim()) return;

        setIsSearching(true);
        setSearchResult(null);

        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&countrycodes=za`);
            const data = await response.json();

            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                const point: [number, number] = [parseFloat(lat), parseFloat(lon)];
                let isCovered = false;

                for (const zone of coverageZones) {
                    if (isPointInPolygon(point, zone.coordinates)) {
                        isCovered = true;
                        break;
                    }
                }
                setSearchResult(isCovered ? 'covered' : 'not-covered');
            } else {
                alert('Address not found. Please try being more specific.');
            }
        } catch (error) {
            console.error('Search error:', error);
            alert('An error occurred while searching. Please try again.');
        } finally {
            setIsSearching(false);
        }
    };

    const scrollToPricing = () => {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-background pt-32 pb-12">
            {/* Hero Section */}
            <section className="px-4 mb-20">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                            Residential <span className="text-primary">Fibre</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Experience lightning-fast internet speeds with our reliable residential fibre packages.
                            Check if you're covered and get connected today.
                        </p>
                    </div>

                    {/* Coverage Check Input */}
                    <div className="max-w-lg mx-auto relative">
                        <div className="relative flex items-center">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                placeholder="Enter your street address to check coverage..."
                                className="w-full h-14 pl-12 pr-12 rounded-full bg-card border border-border shadow-lg focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground outline-none transition-all"
                            />
                        </div>

                        <div className={`flex justify-center overflow-hidden transition-all duration-500 ease-in-out ${address.trim() ? 'max-h-20 opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'
                            }`}>
                            <Button
                                onClick={handleSearch}
                                disabled={isSearching || !address.trim()}
                                className="h-12 px-8 rounded-full shadow-lg text-lg font-medium"
                            >
                                {isSearching ? <Loader2 className="animate-spin h-5 w-5" /> : 'Check Coverage'}
                            </Button>
                        </div>

                        {/* Search Result Message */}
                        {searchResult && (
                            <div className={`mt-4 p-4 rounded-2xl border flex items-center justify-center gap-3 animate-in fade-in slide-in-from-top-2 ${searchResult === 'covered'
                                ? 'bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400'
                                : 'bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400'
                                }`}>
                                {searchResult === 'covered' ? (
                                    <>
                                        <CheckCircle2 className="h-5 w-5" />
                                        <span className="font-medium">Great news! You are covered.</span>
                                    </>
                                ) : (
                                    <>
                                        <XCircle className="h-5 w-5" />
                                        <span className="font-medium">Sorry, we haven't reached this area yet.</span>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* View Packages Button */}
                    <div className="pt-4">
                        <button
                            onClick={scrollToPricing}
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium group"
                        >
                            View Packages
                            <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="px-4 mb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {packages.map((pkg) => (
                            <div
                                key={pkg.speed}
                                className={`relative rounded-3xl p-8 border ${pkg.recommended
                                    ? 'border-primary bg-primary/5 shadow-2xl scale-105 z-10'
                                    : 'border-border bg-card shadow-xl hover:shadow-2xl transition-shadow'
                                    }`}
                            >
                                {pkg.recommended && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                                        Most Popular
                                    </div>
                                )}
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold text-foreground mb-2">{pkg.speed}</h3>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-sm text-muted-foreground">R</span>
                                        <span className="text-5xl font-bold text-primary">{pkg.price}</span>
                                        <span className="text-sm text-muted-foreground">/pm</span>
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {pkg.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-muted-foreground">
                                            <Check className="h-5 w-5 text-primary flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    variant={pkg.recommended ? 'primary' : 'outline'}
                                    className="w-full justify-center py-6 text-lg"
                                >
                                    Choose {pkg.speed}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
