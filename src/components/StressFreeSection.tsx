'use client';

import { ShieldCheck, TrendingUp, Users, Clock } from 'lucide-react';


const benefits = [
    {
        title: 'ECSA Registered Engineers',
        description: 'Our professional engineers are registered with the Engineering Council of South Africa, ensuring compliance with national standards on every project.',
        icon: <ShieldCheck className="w-5 h-5" />,
    },
    {
        title: 'Building Our Track Record',
        description: 'We are an emerging firm with a growing portfolio of completed projects across government, private sector, and industrial clients.',
        icon: <TrendingUp className="w-5 h-5" />,
    },
    {
        title: 'Collaborative Approach',
        description: 'We work as an extension of your team — transparent communication, regular reporting, and no surprises from brief to handover.',
        icon: <Users className="w-5 h-5" />,
    },
    {
        title: 'Deadline Committed',
        description: 'Structured project management keeps milestones on track. We flag risks early and keep clients informed at every stage.',
        icon: <Clock className="w-5 h-5" />,
    },
];

export function StressFreeSection() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="max-w-2xl mb-16">
                    <p className="text-primary text-sm font-bold uppercase tracking-widest mb-4">Our Commitment</p>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-foreground">
                        Engineering You Can Rely On
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Every engagement is underpinned by our commitment to technical rigour, clear communication, and accountability from start to finish.
                    </p>
                </div>

                {/* Benefits — full-width rows */}
                <div className="space-y-0">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="group py-6 border-t border-border last:border-b flex items-start gap-5">
                            <div className="text-primary flex-shrink-0 mt-0.5">
                                {benefit.icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground mb-1">{benefit.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
}
