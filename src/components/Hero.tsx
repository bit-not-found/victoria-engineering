'use client';

import { Button } from './Button';
import { useState, useEffect } from 'react';
import { ArrowRight, HardHat, Zap, Building2, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { HeroVisual } from './HeroVisual';

const heroSlides = [
    {
        tagline: 'Civil & Infrastructure Development',
        headline: 'Building the',
        highlight: 'Infrastructure\nof Tomorrow',
        description: 'From roads and bridges to water systems and urban development — we engineer solutions that stand the test of time.',
        icon: <Building2 className="w-8 h-8" />,
        accent: '#1B3A6B',
    },
    {
        tagline: 'Process & Industrial Engineering',
        headline: 'Optimising',
        highlight: 'Industrial\nProcesses',
        description: 'We design and implement efficient process systems that maximise productivity and minimise operational costs.',
        icon: <HardHat className="w-8 h-8" />,
        accent: '#1B3A6B',
    },
    {
        tagline: 'Electrical & Power Reticulation',
        headline: 'Powering',
        highlight: 'Communities\n& Industry',
        description: 'Comprehensive electrical engineering and power distribution solutions for residential, commercial, and industrial clients.',
        icon: <Zap className="w-8 h-8" />,
        accent: '#1B3A6B',
    },
    {
        tagline: 'Project Planning & Feasibility Studies',
        headline: 'Turning Vision',
        highlight: 'Into Viable\nReality',
        description: 'Rigorous feasibility studies and project planning that de-risk your investment and set the foundation for success.',
        icon: <BarChart3 className="w-8 h-8" />,
        accent: '#1B3A6B',
    },
];



export function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
                setIsAnimating(false);
            }, 300);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    const slide = heroSlides[currentIndex];

    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background">
            {/* Engineering Grid Background */}
            <div className="absolute inset-0 engineering-grid opacity-100" />

            {/* Animated gradient orbs */}
            <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-[#1B3A6B]/8 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[100px] pointer-events-none" />

            {/* SVG Bridge Illustration */}
            <div className="absolute inset-0 flex items-end justify-end pointer-events-none overflow-hidden opacity-10">
                <svg viewBox="0 0 800 400" className="w-full max-w-4xl h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Bridge structure */}
                    <path d="M0 350 L800 350" stroke="#1B3A6B" strokeWidth="4" />
                    <path d="M100 350 Q400 80 700 350" stroke="#1B3A6B" strokeWidth="3" fill="none" />
                    {/* Vertical cables */}
                    {[150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650].map((x, i) => {
                        const archY = 350 - (Math.sin(((x - 100) / 600) * Math.PI) * 270);
                        return (
                            <line key={i} x1={x} y1="350" x2={x} y2={archY} stroke="#1B3A6B" strokeWidth="1.5" opacity="0.8" />
                        );
                    })}
                    {/* Towers */}
                    <rect x="390" y="80" width="20" height="270" fill="#1B3A6B" opacity="0.9" />
                    <rect x="385" y="75" width="30" height="15" fill="#1B3A6B" />
                </svg>
            </div>

            {/* Diagonal accent line */}
            <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#1B3A6B]/30 to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">

                    {/* Left: Text Content */}
                    <div className="space-y-8">
                        {/* Service indicator tabs */}
                        <div className="flex flex-wrap gap-0 border-b border-border">
                            {heroSlides.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentIndex(i)}
                                    className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all duration-300 -mb-px ${i === currentIndex
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    {s.icon}
                                    <span className="hidden sm:inline">{s.tagline.split(' ')[0]}</span>
                                </button>
                            ))}
                        </div>

                        {/* Tagline — plain text */}
                        <p className={`text-primary text-sm font-bold uppercase tracking-widest transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                            {slide.tagline}
                        </p>

                        {/* Headline */}
                        <div className="min-h-[180px] sm:min-h-[200px] flex items-start">
                            <h1
                                className={`text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                                    }`}
                            >
                                {slide.headline}{' '}
                                <span className="text-[#1B3A6B] dark:text-[#2E6ACF] whitespace-pre-line">
                                    {slide.highlight}
                                </span>
                            </h1>
                        </div>

                        {/* Description */}
                        <p
                            className={`text-lg text-muted-foreground max-w-lg leading-relaxed transition-all duration-300 delay-75 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                                }`}
                        >
                            {slide.description}
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/contact">
                                <Button
                                    size="lg"
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold border-none shadow-xl shadow-primary/20 group"
                                >
                                    Get a Free Quote
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/services">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-border text-foreground hover:bg-secondary hover:border-primary/50 font-medium"
                                >
                                    Our Services
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right: Interactive engineering visual */}
                    <div className="hidden lg:flex flex-col items-center justify-center relative" style={{ minHeight: '480px' }}>
                        {/* Subtle ambient glow */}
                        <div className="absolute inset-0 bg-primary/4 rounded-3xl blur-3xl pointer-events-none" />
                        {/* Bordered panel */}
                        <div className={`relative z-10 w-full h-full border border-border rounded-2xl bg-card/50 backdrop-blur-sm p-4 transition-all duration-500 ${isAnimating ? 'opacity-60' : 'opacity-100'}`}
                            style={{ minHeight: 380 }}>
                            <HeroVisual index={currentIndex} isAnimating={isAnimating} />
                        </div>
                    </div>
                </div>

            </div>


        </section>
    );
}
