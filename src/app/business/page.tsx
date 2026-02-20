'use client';

import Link from 'next/link';

import { Button } from '@/components/Button';
import { Check, Building2, ShieldCheck, Zap, Server, Phone, ArrowDown, ArrowRight } from 'lucide-react';

const businessPackages = [
    {
        name: 'Business Basic',
        speed: '10Mbps',
        price: 299,
        features: ['Uncapped Data', '1:1 Contention Ratio', '1 Static IP', 'Business Hours Support'],
        recommended: false,
    },
    {
        name: 'Business Pro',
        speed: '30Mbps',
        price: 399,
        features: ['Uncapped Data', '1:1 Contention Ratio', '5 Static IPs', '24/7 Priority Support', '99.9% Uptime SLA'],
        recommended: true,
    },
    {
        name: 'Enterprise',
        speed: '60Mbps',
        price: 699,
        features: ['Uncapped Data', '1:1 Contention Ratio', 'Range of Static IPs', 'Dedicated Account Manager', '99.9% Uptime SLA'],
        recommended: false,
    },
];

const features = [
    {
        icon: ShieldCheck,
        title: 'Uncompromised Security',
        description: 'Enterprise-grade security features to keep your business data safe and secure.',
    },
    {
        icon: Zap,
        title: 'Blazing Fast Speed',
        description: 'Symmetric upload and download speeds to ensure smooth video conferencing and large file transfers.',
    },
    {
        icon: Server,
        title: 'Reliable Uptime',
        description: 'Guaranteed 99.9% uptime Service Level Agreements (SLA) for peace of mind.',
    },
    {
        icon: Phone,
        title: 'Priority Support',
        description: 'Direct access to our expert technical support team 24/7/365.',
    },
];

export default function BusinessPage() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-12">
            {/* Hero Section */}
            <section className="px-4 mb-20">
                <div className="max-w-7xl mx-auto text-center space-y-6">

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Business <span className="text-primary">Fibre</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Power your business with ultra-reliable, high-speed fibre connectivity.
                        Tailored solutions for businesses of all sizes.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
                        <Button
                            className="px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 gap-2"
                            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            View Packages
                            <ArrowDown className="h-5 w-5" />
                        </Button>
                        <Link href="/contact">
                            <Button
                                variant="outline"
                                className="px-8 py-6 text-lg rounded-full border-2 hover:bg-secondary/50 transition-all hover:-translate-y-1 gap-2"
                            >
                                Contact Sales
                                <ArrowRight className="h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="px-4 mb-24">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature) => (
                            <div key={feature.title} className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                    <feature.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="px-4 mb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground">Business Packages</h2>
                        <p className="text-muted-foreground mt-2">Choose the perfect speed for your team</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {businessPackages.map((pkg) => (
                            <div
                                key={pkg.name}
                                className={`relative rounded-3xl p-8 border flex flex-col ${pkg.recommended
                                    ? 'border-primary bg-primary/5 shadow-2xl scale-105 z-10'
                                    : 'border-border bg-card shadow-xl hover:shadow-2xl transition-shadow'
                                    }`}
                            >
                                {pkg.recommended && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                                        Best Value
                                    </div>
                                )}
                                <div className="text-center mb-8">
                                    <h3 className="text-xl font-medium text-muted-foreground mb-2">{pkg.name}</h3>
                                    <div className="text-4xl font-bold text-foreground mb-4">{pkg.speed}</div>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-sm text-muted-foreground">R</span>
                                        <span className="text-5xl font-bold text-primary">{pkg.price}</span>
                                        <span className="text-sm text-muted-foreground">/pm</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">Excl. VAT</p>
                                </div>

                                <ul className="space-y-4 mb-8 flex-1">
                                    {pkg.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3 text-muted-foreground text-sm">
                                            <Check className="h-5 w-5 text-primary flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    variant={pkg.recommended ? 'primary' : 'outline'}
                                    className="w-full justify-center py-6 text-lg"
                                >
                                    Get Started
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Custom Solution CTA */}
            <section className="px-4 mb-16">
                <div className="max-w-5xl mx-auto bg-card border border-border rounded-3xl p-8 md:p-12 shadow-xl text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-4">Need a Custom Solution?</h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        We offer tailored connectivity solutions for large enterprises, including dedicated fibre lines,
                        redundant links, and multi-site networking.
                    </p>
                    <Link href="/contact">
                        <Button size="lg" className="px-8 rounded-full">
                            Contact Enterprise Sales
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
