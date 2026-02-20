'use client';

import { Award, Users, Clock, ShieldCheck, TrendingUp, Wrench } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const values = [
    {
        icon: <Award className="w-6 h-6" />,
        title: 'Registered & Accredited',
        description: 'Our engineers are registered with ECSA and relevant professional bodies, ensuring every project meets South African regulatory standards.',
    },
    {
        icon: <Users className="w-6 h-6" />,
        title: 'Multidisciplinary Team',
        description: 'Civil, industrial, electrical, and project engineers working together to deliver integrated, holistic engineering solutions.',
    },
    {
        icon: <Clock className="w-6 h-6" />,
        title: 'Deadline Committed',
        description: 'Structured project management keeps milestones on track. We communicate proactively — no surprises, no excuses.',
    },
    {
        icon: <ShieldCheck className="w-6 h-6" />,
        title: 'Quality Focused',
        description: 'Rigorous quality checks are embedded at every project phase — from initial design through to final commissioning and handover.',
    },
    {
        icon: <TrendingUp className="w-6 h-6" />,
        title: 'Value Engineering',
        description: 'We actively identify cost-saving opportunities without compromising on quality, helping clients get the most from their investment.',
    },
    {
        icon: <Wrench className="w-6 h-6" />,
        title: 'End-to-End Service',
        description: 'From concept and feasibility through detailed design, construction supervision, and commissioning — one team, full accountability.',
    },
];

export function PricingSection() {
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
        <section id="about" ref={sectionRef} className="py-24 bg-secondary relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className={`max-w-2xl mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <p className="text-primary text-sm font-bold uppercase tracking-widest mb-4">Why Victoria Engineering</p>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
                        Engineering Excellence You Can Trust
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Victoria Engineering was founded to bring focused, professional engineering services to clients who demand quality and accountability.
                        We are building our reputation one well-executed project at a time.
                    </p>
                </div>

                {/* Values — 2-col list rows */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className={`group py-8 border-t border-border flex items-start gap-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: `${index * 80}ms` }}
                        >
                            {/* Icon */}
                            <div className="text-primary flex-shrink-0 mt-0.5">
                                {value.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-foreground mb-2">{value.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className={`mt-16 pt-10 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div>
                        <h3 className="text-2xl font-bold text-foreground mb-1">Ready to start your project?</h3>
                        <p className="text-muted-foreground">Our team is ready to assess your requirements and provide a detailed proposal.</p>
                    </div>
                    <a
                        href="/contact"
                        className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-all duration-300 whitespace-nowrap"
                    >
                        Start a Conversation
                    </a>
                </div>
            </div>
        </section>
    );
}
