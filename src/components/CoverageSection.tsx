'use client';

import { MapPin, CheckCircle2, Building2, HardHat, Zap, BarChart3 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const projectHighlights = [
    {
        category: 'Civil & Infrastructure',
        icon: <Building2 className="w-4 h-4" />,
        color: 'text-foreground',
        projects: [
            { name: 'Road Rehabilitation Study', location: 'West Rand, Gauteng', value: 'Feasibility' },
            { name: 'Stormwater Drainage Design', location: 'Tshwane, Gauteng', value: 'Design' },
            { name: 'Bulk Water Reticulation', location: 'Ekurhuleni, Gauteng', value: 'Construction' },
        ],
    },
    {
        category: 'Process & Industrial',
        icon: <HardHat className="w-4 h-4" />,
        color: 'text-foreground',
        projects: [
            { name: 'Process Flow Optimisation', location: 'Rustenburg, NW', value: 'Consulting' },
            { name: 'Wastewater Treatment Design', location: 'Emfuleni, Gauteng', value: 'Design' },
            { name: 'Conveyor System Layout', location: 'Witbank, Mpumalanga', value: 'Design' },
        ],
    },
    {
        category: 'Electrical & Power',
        icon: <Zap className="w-4 h-4" />,
        color: 'text-foreground',
        projects: [
            { name: 'MV Substation Design', location: 'Midrand, Gauteng', value: 'Design' },
            { name: 'Solar PV Feasibility', location: 'Limpopo Province', value: 'Feasibility' },
            { name: 'LV Distribution Network', location: 'Soweto, Gauteng', value: 'Construction' },
        ],
    },
    {
        category: 'Feasibility & Planning',
        icon: <BarChart3 className="w-4 h-4" />,
        color: 'text-foreground',
        projects: [
            { name: 'Industrial Site Assessment', location: 'Dube TradePort, KZN', value: 'Feasibility' },
            { name: 'Township Infrastructure Study', location: 'Polokwane, Limpopo', value: 'Study' },
            { name: 'Logistics Hub Planning', location: 'Kempton Park, Gauteng', value: 'Planning' },
        ],
    },
];

const stats = [
    { value: '4', label: 'Core Disciplines' },
    { value: 'Gauteng', label: 'Home Base' },
    { value: 'Growing', label: 'Project Portfolio' },
    { value: 'ECSA', label: 'Registered Engineers' },
];

export function CoverageSection() {
    const [activeCategory, setActiveCategory] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
    }, []);

    const active = projectHighlights[activeCategory];

    return (
        <section id="coverage" ref={sectionRef} className="py-24 bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className={`max-w-2xl mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <p className="text-primary text-sm font-bold uppercase tracking-widest mb-4">Our Project Portfolio</p>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
                        Delivering Excellence Across South Africa
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Based in Gauteng and expanding our footprint, Victoria Engineering takes on projects where technical rigour and clear communication matter.
                        Every project we complete strengthens the foundation we are building.
                    </p>
                </div>

                {/* Group1 — team + truck + excavator scene */}
                <div className={`mb-16 flex justify-center pointer-events-none select-none transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <Image
                        src="/characters/output/Group1.png"
                        alt="Victoria Engineering team with equipment on site"
                        width={900}
                        height={480}
                        className="object-contain w-full max-w-3xl"
                    />
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mb-16 border-t border-b border-border">
                    {stats.map((stat, i) => (
                        <div key={i} className={`py-8 px-6 ${i !== 0 ? 'border-l border-border' : ''}`}>
                            <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Category tabs */}
                <div className="flex gap-0 mb-12 border-b border-border">
                    {projectHighlights.map((cat, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveCategory(i)}
                            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all duration-300 -mb-px ${i === activeCategory
                                ? 'border-primary text-primary'
                                : 'border-transparent text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {cat.icon}
                            <span className="hidden sm:inline">{cat.category}</span>
                        </button>
                    ))}
                </div>

                {/* Projects list */}
                <div className="space-y-0" key={activeCategory}>
                    {active.projects.map((project, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between py-6 border-t border-border last:border-b group"
                        >
                            <div className="flex items-center gap-6">
                                <span className="text-2xl font-bold text-border group-hover:text-primary transition-colors duration-300 w-8 flex-shrink-0">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <div>
                                    <h4 className="font-bold text-foreground group-hover:text-primary transition-colors duration-300">{project.name}</h4>
                                    <div className="flex items-center gap-1 text-muted-foreground text-sm mt-0.5">
                                        <MapPin className="w-3 h-3" />
                                        <span>{project.location}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <div className="text-lg font-bold text-primary">{project.value}</div>
                                <div className="text-xs text-muted-foreground">Project Value</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-12 flex items-center justify-between pt-8 border-t border-border">
                    <p className="text-muted-foreground">Ready to discuss your next project?</p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest hover:gap-4 transition-all duration-300"
                    >
                        <CheckCircle2 className="w-4 h-4" />
                        Contact Our Team
                    </a>
                </div>
            </div>
        </section>
    );
}
