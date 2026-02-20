'use client';

import { Building2, Zap, BarChart3, HardHat, ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const services = [
    {
        icon: <Building2 className="w-10 h-10" />,
        title: 'Civil & Infrastructure Development',
        description: 'We plan, design, and oversee the construction of roads, bridges, stormwater systems, bulk earthworks, and urban infrastructure projects that serve communities for generations.',
        highlights: ['Roads & Bridges', 'Stormwater Systems', 'Bulk Earthworks', 'Urban Development'],
        iconColor: 'text-foreground',
        accentColor: 'text-primary',
        number: '01',
        href: '/services#civil',
    },
    {
        icon: <HardHat className="w-10 h-10" />,
        title: 'Process & Industrial Engineering',
        description: 'Optimising manufacturing and industrial operations through process design, plant layout, equipment selection, and systems integration to maximise efficiency and output.',
        highlights: ['Process Design', 'Plant Layout', 'Equipment Selection', 'Systems Integration'],
        iconColor: 'text-foreground',
        accentColor: 'text-primary',
        number: '02',
        href: '/services#process',
    },
    {
        icon: <Zap className="w-10 h-10" />,
        title: 'Electrical & Power Reticulation',
        description: 'Full-spectrum electrical engineering from HV/MV/LV distribution networks and substation design to renewable energy integration and power quality solutions.',
        highlights: ['HV/MV/LV Networks', 'Substation Design', 'Renewable Energy', 'Power Quality'],
        iconColor: 'text-foreground',
        accentColor: 'text-primary',
        number: '03',
        href: '/services#electrical',
    },
    {
        icon: <BarChart3 className="w-10 h-10" />,
        title: 'Project Planning & Feasibility Studies',
        description: 'Comprehensive feasibility assessments, risk analysis, cost estimation, and project scheduling that give stakeholders the confidence to make informed investment decisions.',
        highlights: ['Feasibility Studies', 'Risk Analysis', 'Cost Estimation', 'Project Scheduling'],
        iconColor: 'text-foreground',
        accentColor: 'text-primary',
        number: '04',
        href: '/services#planning',
    },
];

export function HowItWorks() {
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

    return (
        <section id="services" ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
            {/* Worker character — decorative, bottom-right */}
            <div className="absolute bottom-0 right-0 w-64 xl:w-80 pointer-events-none select-none z-0 opacity-90"
                style={{ animation: 'float 7s ease-in-out infinite' }}>
                <Image
                    src="/characters/output/Worker.png"
                    alt=""
                    width={320}
                    height={400}
                    className="object-contain w-full h-auto"
                    aria-hidden="true"
                />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className={`max-w-2xl mb-20 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <p className="text-primary text-sm font-bold uppercase tracking-widest mb-4">What We Do</p>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
                        Our Core Engineering Disciplines
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Victoria Engineering delivers integrated engineering solutions across four specialist disciplines,
                        bringing technical excellence and practical experience to every project.
                    </p>
                </div>

                {/* Services — full-width rows */}
                <div className="space-y-0">
                    {services.map((service, index) => (
                        <Link
                            key={index}
                            href={service.href}
                            className={`group py-10 border-t border-border last:border-b flex flex-col md:flex-row md:items-start gap-8 transition-all duration-700 cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: `${index * 120}ms` }}
                        >
                            {/* Number */}
                            <div className="text-5xl font-bold text-border group-hover:text-primary transition-colors duration-300 w-16 flex-shrink-0 leading-none">
                                {service.number}
                            </div>

                            {/* Icon */}
                            <div className={`${service.iconColor} flex-shrink-0 mt-1 group-hover:text-primary transition-colors duration-300`}>
                                {service.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                                <p className="text-muted-foreground leading-relaxed mb-5 text-sm max-w-2xl">{service.description}</p>
                                <div className="flex flex-wrap gap-x-6 gap-y-1">
                                    {service.highlights.map((h, i) => (
                                        <span key={i} className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                            — {h}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Arrow */}
                            <div className="flex-shrink-0 self-center">
                                <ArrowRight className="w-5 h-5 text-border group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className={`mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <Link href="/services">
                        <button className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest hover:gap-4 transition-all duration-300 group">
                            View All Services
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
