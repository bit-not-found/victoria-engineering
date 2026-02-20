'use client';

import { ChevronRight, ChevronLeft, Search, PenTool, HardHat, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const steps = [
    {
        id: 1,
        phase: 'Discovery',
        title: 'Initial Consultation & Scoping',
        description: 'We begin with a thorough consultation to understand your project objectives, constraints, and success criteria. Our engineers conduct site visits and stakeholder interviews to define the full project scope.',
        icon: <Search className="w-6 h-6" />,
        deliverables: ['Project Brief', 'Site Assessment Report', 'Scope of Work', 'Preliminary Budget'],
    },
    {
        id: 2,
        phase: 'Planning',
        title: 'Feasibility & Conceptual Design',
        description: 'Our multidisciplinary team develops conceptual designs and conducts feasibility studies to evaluate technical, financial, and environmental viability — ensuring your investment is sound before detailed design begins.',
        icon: <PenTool className="w-6 h-6" />,
        deliverables: ['Feasibility Report', 'Conceptual Drawings', 'Risk Register', 'Project Schedule'],
    },
    {
        id: 3,
        phase: 'Execution',
        title: 'Detailed Design & Construction',
        description: 'With approval in hand, we produce full engineering drawings, specifications, and tender documentation. Our team provides resident engineering and construction supervision to ensure quality and compliance throughout.',
        icon: <HardHat className="w-6 h-6" />,
        deliverables: ['Engineering Drawings', 'Specifications', 'Tender Documents', 'Construction Supervision'],
    },
    {
        id: 4,
        phase: 'Handover',
        title: 'Commissioning & Close-Out',
        description: 'We manage the commissioning process, conduct final inspections, and compile as-built documentation. Our close-out process ensures a smooth handover and that all contractual obligations are fulfilled.',
        icon: <CheckCircle2 className="w-6 h-6" />,
        deliverables: ['As-Built Drawings', 'O&M Manuals', 'Commissioning Report', 'Final Account'],
    },
];

export function Steps() {
    const [currentStep, setCurrentStep] = useState(0);

    const step = steps[currentStep];

    return (
        <section id="projects" className="py-24 bg-secondary overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="max-w-2xl mb-16">
                    <p className="text-primary text-sm font-bold uppercase tracking-widest mb-4">How We Work</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                        Our Project Process
                    </h2>
                </div>

                {/* Phase tabs */}
                <div className="flex gap-0 mb-16 border-b border-border">
                    {steps.map((s, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentStep(idx)}
                            className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 transition-all duration-300 -mb-px ${idx === currentStep
                                ? 'border-primary text-primary'
                                : 'border-transparent text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <span className={`${idx === currentStep ? 'text-primary' : 'text-muted-foreground'}`}>
                                {s.icon}
                            </span>
                            <span className="hidden sm:inline">{s.phase}</span>
                            <span className="sm:hidden">{s.id}</span>
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start" key={currentStep}>
                    {/* Left: Text */}
                    <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">
                            Phase {step.id} of {steps.length}
                        </p>
                        <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                            {step.title}
                        </h3>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                            {step.description}
                        </p>

                        {/* Nav */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
                                disabled={currentStep === 0}
                                className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setCurrentStep(s => Math.min(steps.length - 1, s + 1))}
                                disabled={currentStep === steps.length - 1}
                                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm"
                            >
                                {currentStep === steps.length - 1 ? 'Get Started' : 'Next Phase'}
                                {currentStep !== steps.length - 1 && <ChevronRight className="w-4 h-4" />}
                            </button>

                            {/* Progress dots */}
                            <div className="flex gap-1.5 ml-2">
                                {steps.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'w-6 bg-primary' : 'w-1.5 bg-border'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Deliverables + Oliver2 character */}
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-6">Key Deliverables</p>
                        <div className="space-y-0">
                            {step.deliverables.map((d, i) => (
                                <div key={i} className="flex items-center gap-4 py-4 border-t border-border last:border-b">
                                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                                    <span className="text-foreground font-medium">{d}</span>
                                </div>
                            ))}
                        </div>

                        {/* Progress */}
                        <div className="mt-8">
                            <div className="flex justify-between text-xs text-muted-foreground mb-2">
                                <span>Project Progress</span>
                                <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
                            </div>
                            <div className="h-1 bg-border rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary rounded-full transition-all duration-700"
                                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Oliver2 — engineer with tablet */}
                        <div className="mt-8 flex justify-end pointer-events-none select-none"
                            style={{ animation: 'float 5s ease-in-out infinite' }}>
                            <Image
                                src="/characters/output/Oliver2.png"
                                alt=""
                                width={220}
                                height={280}
                                className="object-contain drop-shadow-xl"
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
