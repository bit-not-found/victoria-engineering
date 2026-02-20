'use client';

import { Button } from '@/components/Button';
import { Wifi, Smartphone, CreditCard, Clock, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { CoverageSection } from '@/components/CoverageSection';

const voucherOptions = [
    {
        duration: 'Daily',
        data: 'Unlimited',
        price: 5,
        popular: false,
    },
    {
        duration: 'Weekly',
        data: 'Unlimited',
        price: 99,
        popular: true,
    },
    {
        duration: 'Monthly',
        data: 'Unlimited',
        price: 149,
        popular: false,
    },
];

const steps = [
    {
        icon: Wifi,
        title: 'Connect to Wi-Fi',
        description: 'Find "Simple Connectivity Hotspot" in your Wi-Fi settings and connect.',
    },
    {
        icon: Smartphone,
        title: 'Login or Register',
        description: 'A pop-up will appear. Enter your details to login or create a new account.',
    },
    {
        icon: CreditCard,
        title: 'Purchase Voucher',
        description: 'Choose a data bundle that suits your needs and pay securely online.',
    },
    {
        icon: Clock,
        title: 'Start Browsing',
        description: 'Enjoy high-speed, affordable internet access instantly.',
    },
];

export default function HotspotPage() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-12">
            {/* Hero Section */}
            <section className="px-4 mb-20">
                <div className="max-w-7xl mx-auto text-center space-y-6">

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Wi-Fi <span className="text-primary">Hotspots</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Affordable, high-speed internet on the go. Connect to one of our many hotspots
                        and stay online without breaking the bank.
                    </p>
                    <div className="flex justify-center gap-4 pt-4">
                        <Button
                            className="px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 gap-2"
                            onClick={() => document.getElementById('locations')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Find a Hotspot
                            <MapPin className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="px-4 mb-24">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
                        <p className="text-muted-foreground mt-2">Get connected in 4 easy steps</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div key={step.title} className="relative p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow text-center">
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                                    {index + 1}
                                </div>
                                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 mt-2">
                                    <step.icon className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                                <p className="text-sm text-muted-foreground">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="px-4 mb-24 bg-secondary/30 py-20 rounded-3xl mx-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground">Voucher Pricing</h2>
                        <p className="text-muted-foreground mt-2">Flexible options for every need</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {voucherOptions.map((option) => (
                            <div
                                key={option.duration}
                                className={`relative rounded-2xl p-6 border bg-card text-center transition-transform hover:scale-105 ${option.popular
                                    ? 'border-primary shadow-xl ring-2 ring-primary/20'
                                    : 'border-border shadow-sm'
                                    }`}
                            >
                                {option.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className="text-lg font-medium text-muted-foreground mb-4">{option.duration}</h3>
                                <div className="flex items-baseline justify-center gap-1 mb-4">
                                    <span className="text-sm text-muted-foreground">R</span>
                                    <span className="text-4xl font-bold text-foreground">{option.price}</span>
                                </div>
                                <div className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
                                    {option.data} Data
                                </div>
                                <Button className="w-full rounded-xl" variant={option.popular ? 'primary' : 'outline'}>
                                    Buy Now
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Coverage Map Section */}
            <div id="locations">
                <CoverageSection />
            </div>
        </div>
    );
}
