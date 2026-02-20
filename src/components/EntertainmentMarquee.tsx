'use client';

import {
    Building2, Factory, Zap, Droplets, Truck, Home, TreePine, Landmark,
    Hospital, GraduationCap, ShoppingBag, Fuel, Wind, Sun, Wifi, Server,
    Warehouse, Ship, Train, Plane, Construction, FlaskConical, Microscope,
    Hammer, Wrench, Settings, BarChart3, Globe, Shield
} from 'lucide-react';

const sectors = [
    { name: 'Government', icon: <Landmark className="w-8 h-8" />, color: 'text-blue-400' },
    { name: 'Mining', icon: <Hammer className="w-8 h-8" />, color: 'text-amber-500' },
    { name: 'Manufacturing', icon: <Factory className="w-8 h-8" />, color: 'text-orange-400' },
    { name: 'Energy', icon: <Zap className="w-8 h-8" />, color: 'text-yellow-400' },
    { name: 'Water & Sanitation', icon: <Droplets className="w-8 h-8" />, color: 'text-cyan-400' },
    { name: 'Transport', icon: <Truck className="w-8 h-8" />, color: 'text-green-400' },
    { name: 'Residential', icon: <Home className="w-8 h-8" />, color: 'text-purple-400' },
    { name: 'Environmental', icon: <TreePine className="w-8 h-8" />, color: 'text-emerald-400' },
    { name: 'Healthcare', icon: <Hospital className="w-8 h-8" />, color: 'text-red-400' },
    { name: 'Education', icon: <GraduationCap className="w-8 h-8" />, color: 'text-indigo-400' },
    { name: 'Retail & Commercial', icon: <ShoppingBag className="w-8 h-8" />, color: 'text-pink-400' },
    { name: 'Oil & Gas', icon: <Fuel className="w-8 h-8" />, color: 'text-orange-500' },
    { name: 'Renewable Energy', icon: <Wind className="w-8 h-8" />, color: 'text-teal-400' },
    { name: 'Solar Power', icon: <Sun className="w-8 h-8" />, color: 'text-yellow-500' },
    { name: 'Telecommunications', icon: <Wifi className="w-8 h-8" />, color: 'text-blue-500' },
    { name: 'Data Centres', icon: <Server className="w-8 h-8" />, color: 'text-slate-400' },
    { name: 'Logistics', icon: <Warehouse className="w-8 h-8" />, color: 'text-amber-400' },
    { name: 'Maritime', icon: <Ship className="w-8 h-8" />, color: 'text-blue-600' },
    { name: 'Rail', icon: <Train className="w-8 h-8" />, color: 'text-gray-400' },
    { name: 'Aviation', icon: <Plane className="w-8 h-8" />, color: 'text-sky-400' },
    { name: 'Construction', icon: <Construction className="w-8 h-8" />, color: 'text-orange-300' },
    { name: 'Chemical', icon: <FlaskConical className="w-8 h-8" />, color: 'text-violet-400' },
    { name: 'Research', icon: <Microscope className="w-8 h-8" />, color: 'text-fuchsia-400' },
    { name: 'Maintenance', icon: <Wrench className="w-8 h-8" />, color: 'text-stone-400' },
    { name: 'Automation', icon: <Settings className="w-8 h-8" />, color: 'text-cyan-500' },
    { name: 'Analytics', icon: <BarChart3 className="w-8 h-8" />, color: 'text-lime-400' },
    { name: 'International', icon: <Globe className="w-8 h-8" />, color: 'text-blue-300' },
    { name: 'Defence', icon: <Shield className="w-8 h-8" />, color: 'text-red-500' },
];

export function EntertainmentMarquee() {
    return (
        <section className="py-20 bg-background relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 engineering-grid opacity-20" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
                <div className="max-w-2xl">
                    <p className="text-primary text-sm font-bold uppercase tracking-widest mb-4">Sectors We Serve</p>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground leading-tight">
                        Engineering Across Every Industry
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        From government infrastructure to private industrial facilities — our engineering expertise spans the full spectrum of South African industry.
                    </p>
                </div>
            </div>

            <div className="relative w-full overflow-hidden">
                {/* Gradient Masks */}
                <div className="absolute top-0 left-0 z-10 w-20 md:w-40 h-full bg-gradient-to-r from-background to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 z-10 w-20 md:w-40 h-full bg-gradient-to-l from-background to-transparent pointer-events-none" />

                <div className="flex w-max animate-scroll" style={{ animationDuration: '60s' }}>
                    {/* First set */}
                    <div className="flex gap-10 mx-6 items-center">
                        {sectors.map((sector, index) => (
                            <div key={`sector-1-${index}`} className="flex flex-col items-center gap-2 group cursor-default">
                                <div className={`transition-all duration-300 group-hover:scale-110 group-hover:text-primary ${sector.color}`}>
                                    {sector.icon}
                                </div>
                                <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">{sector.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* Duplicate for seamless scroll */}
                    <div className="flex gap-10 mx-6 items-center">
                        {sectors.map((sector, index) => (
                            <div key={`sector-2-${index}`} className="flex flex-col items-center gap-2 group cursor-default">
                                <div className={`transition-all duration-300 group-hover:scale-110 group-hover:text-primary ${sector.color}`}>
                                    {sector.icon}
                                </div>
                                <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">{sector.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
