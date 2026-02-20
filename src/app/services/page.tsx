'use client';

import {
    Building2, Zap, Cog, ClipboardList, ArrowRight, CheckCircle2,
    Search, PenTool, HardHat, ChevronDown,
    MapPin, ShieldCheck, Award, Clock, TrendingUp, Users,
    Droplets, Truck, Landmark, Hammer, Factory, Sun, Wind,
    Home, Hospital, GraduationCap, Fuel, Phone
} from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

// ─── Data ──────────────────────────────────────────────────────────────────────

const disciplines = [
    {
        id: 'civil',
        number: '01',
        icon: <Building2 className="w-8 h-8" />,
        title: 'Civil & Infrastructure Development',
        tagline: 'Building lasting infrastructure for communities',
        description:
            'We plan, design, and oversee the construction of roads, bridges, stormwater systems, bulk earthworks, and urban infrastructure projects that serve communities for generations. Our civil engineers combine technical rigour with practical site experience to deliver projects on time and within budget.',
        subServices: [
            {
                title: 'Roads & Transportation',
                desc: 'Design and construction supervision of surfaced and unsurfaced roads, interchanges, intersections, and pedestrian infrastructure.',
            },
            {
                title: 'Bridges & Structures',
                desc: 'Structural design, load analysis, and inspection of bridges, culverts, retaining walls, and elevated walkways.',
            },
            {
                title: 'Stormwater & Drainage',
                desc: 'Hydrological studies, stormwater master plans, pipe reticulation, and flood mitigation design.',
            },
            {
                title: 'Bulk Earthworks',
                desc: 'Cut-and-fill design, compaction specifications, geotechnical assessments, and rehabilitation of disturbed land.',
            },
            {
                title: 'Urban Development',
                desc: 'Township establishment, subdivision layouts, bulk services design, and greenfield development coordination.',
            },
            {
                title: 'Water & Sanitation',
                desc: 'Bulk water supply pipelines, reservoir design, sewer reticulation, and wastewater network planning.',
            },
        ],
        standards: ['SANS 10160', 'TMH7', 'COLTO', 'SANS 1200', 'NHBRC Guidelines'],
        sectors: ['Government & Municipalities', 'Property Developers', 'Transport Authorities', 'Mining'],
        color: 'from-blue-500/10 to-blue-500/0',
        borderColor: 'border-blue-500/30',
        iconBg: 'bg-blue-500/10 text-blue-400',
    },
    {
        id: 'process',
        number: '02',
        icon: <Cog className="w-8 h-8" />,
        title: 'Process & Industrial Engineering',
        tagline: 'Optimising industrial operations for maximum efficiency',
        description:
            'Optimising manufacturing and industrial operations through process design, plant layout, equipment selection, and systems integration to maximise efficiency and output. We help clients reduce operational costs, improve throughput, and meet regulatory compliance across complex industrial environments.',
        subServices: [
            {
                title: 'Process Design & Optimisation',
                desc: 'Process flow diagrams (PFDs), piping & instrumentation diagrams (P&IDs), and HAZOP studies for safe, efficient plant operation.',
            },
            {
                title: 'Plant Layout & Material Handling',
                desc: 'Optimal facility layout, conveyor systems, bulk material handling, and logistics flow planning.',
            },
            {
                title: 'Equipment Selection & Procurement',
                desc: 'Technical specification, vendor evaluation, and procurement support for process equipment and machinery.',
            },
            {
                title: 'Systems Integration',
                desc: 'Integration of control systems, instrumentation, and automation platforms into existing process infrastructure.',
            },
            {
                title: 'Compliance & Safety',
                desc: 'Process safety management, regulatory compliance assessments, and risk-based inspection programmes.',
            },
            {
                title: 'Plant Commissioning',
                desc: 'Commissioning plans, pre-start-up safety reviews, and operational readiness evaluations for new and modified plants.',
            },
        ],
        standards: ['ASME B31.3', 'API 650', 'ISO 9001', 'OHSAS 18001', 'SANS 347'],
        sectors: ['Manufacturing', 'Mining & Minerals', 'Chemical & Petrochemical', 'Food & Beverage'],
        color: 'from-orange-500/10 to-orange-500/0',
        borderColor: 'border-orange-500/30',
        iconBg: 'bg-orange-500/10 text-orange-400',
    },
    {
        id: 'electrical',
        number: '03',
        icon: <Zap className="w-8 h-8" />,
        title: 'Electrical & Power Reticulation',
        tagline: 'Full-spectrum power solutions from source to end-user',
        description:
            'Full-spectrum electrical engineering from HV/MV/LV distribution networks and substation design to renewable energy integration and power quality solutions. We design reliable, efficient electrical systems that meet South African utility standards and international best practice.',
        subServices: [
            {
                title: 'HV/MV/LV Distribution Networks',
                desc: 'Design of overhead and underground power distribution networks from 11kV to 132kV, including cable sizing and protection coordination.',
            },
            {
                title: 'Substation Design',
                desc: 'Mini-substation, distribution substation, and MV ring-main unit design, including transformer sizing and protection relay schemes.',
            },
            {
                title: 'Renewable Energy Integration',
                desc: 'Grid-tied and off-grid solar PV systems, battery energy storage, and hybrid power solutions for commercial and industrial clients.',
            },
            {
                title: 'Power Quality Solutions',
                desc: 'Power factor correction, harmonic filtering, voltage regulation, and power quality audits to reduce utility penalties.',
            },
            {
                title: 'Load Studies & Network Analysis',
                desc: 'Load flow analysis, fault level studies, arc flash assessments, and protection grading studies.',
            },
            {
                title: 'Electrical Compliance',
                desc: 'Certificate of Compliance (CoC) support, NERSA licensing input, and regulatory submission documentation.',
            },
        ],
        standards: ['SANS 10142', 'IEC 60364', 'NRS 048', 'SAIEE Guidelines', 'NERSA Regulations'],
        sectors: ['Municipalities', 'Renewable Energy', 'Commercial & Industrial', 'Residential Estates'],
        color: 'from-yellow-500/10 to-yellow-500/0',
        borderColor: 'border-yellow-500/30',
        iconBg: 'bg-yellow-500/10 text-yellow-400',
    },
    {
        id: 'planning',
        number: '04',
        icon: <ClipboardList className="w-8 h-8" />,
        title: 'Project Planning & Feasibility Studies',
        tagline: 'De-risking investment through rigorous analysis',
        description:
            'Comprehensive feasibility assessments, risk analysis, cost estimation, and project scheduling that give stakeholders the confidence to make informed investment decisions. We translate complex technical requirements into clear, actionable project strategies.',
        subServices: [
            {
                title: 'Feasibility Studies',
                desc: 'Pre-feasibility and full feasibility reports covering technical, financial, environmental, and social aspects of proposed projects.',
            },
            {
                title: 'Risk Analysis & Management',
                desc: 'Qualitative and quantitative risk assessments, risk registers, and mitigation strategies aligned to PMBOK and ISO 31000.',
            },
            {
                title: 'Cost Estimation',
                desc: 'Order-of-magnitude, budget, and definitive cost estimates using first-principles and parametric methodologies.',
            },
            {
                title: 'Project Scheduling',
                desc: 'Critical path method (CPM) scheduling, programme baselines, earned value tracking, and progress reporting.',
            },
            {
                title: 'Tender & Procurement Support',
                desc: 'Bill of quantities compilation, tender documentation, bid evaluation support, and contract administration.',
            },
            {
                title: 'Construction Project Management',
                desc: 'Site supervision, quality management plans, contractor management, and close-out documentation.',
            },
        ],
        standards: ['PMBOK Guide', 'PRINCE2', 'ISO 21500', 'SACPCMP Guidelines'],
        sectors: ['All Sectors', 'Government Infrastructure', 'Private Developers', 'NGOs & Aid Agencies'],
        color: 'from-green-500/10 to-green-500/0',
        borderColor: 'border-green-500/30',
        iconBg: 'bg-green-500/10 text-green-400',
    },
];

const process = [
    {
        id: 1,
        phase: 'Discovery',
        icon: <Search className="w-5 h-5" />,
        title: 'Initial Consultation & Scoping',
        desc: 'Thorough consultation, site visits, and stakeholder interviews to define the full project scope, objectives, and constraints.',
    },
    {
        id: 2,
        phase: 'Planning',
        icon: <PenTool className="w-5 h-5" />,
        title: 'Feasibility & Conceptual Design',
        desc: 'Conceptual designs and feasibility studies evaluating technical, financial, and environmental viability before detailed design.',
    },
    {
        id: 3,
        phase: 'Execution',
        icon: <HardHat className="w-5 h-5" />,
        title: 'Detailed Design & Construction',
        desc: 'Full engineering drawings, specifications, and tender documentation with resident engineering and construction supervision.',
    },
    {
        id: 4,
        phase: 'Handover',
        icon: <CheckCircle2 className="w-5 h-5" />,
        title: 'Commissioning & Close-Out',
        desc: 'Commissioning management, final inspections, as-built documentation, and smooth handover with all contractual obligations fulfilled.',
    },
];

const credentials = [
    { icon: <Award className="w-5 h-5" />, title: 'ECSA Registered', desc: 'Professional engineers registered with the Engineering Council of South Africa.' },
    { icon: <ShieldCheck className="w-5 h-5" />, title: 'Quality Focused', desc: 'Rigorous QA/QC embedded at every project phase from design through commissioning.' },
    { icon: <Clock className="w-5 h-5" />, title: 'Deadline Committed', desc: 'Structured project management keeps milestones on track — no surprises.' },
    { icon: <TrendingUp className="w-5 h-5" />, title: 'Value Engineering', desc: 'We actively identify cost-saving opportunities without compromising on quality.' },
    { icon: <Users className="w-5 h-5" />, title: 'Multidisciplinary', desc: 'Civil, industrial, electrical, and project engineers working as one integrated team.' },
    { icon: <MapPin className="w-5 h-5" />, title: 'South Africa Based', desc: 'Headquartered in Gauteng with project delivery across South Africa.' },
];

const sectors = [
    { icon: <Landmark className="w-5 h-5" />, name: 'Government & Municipalities' },
    { icon: <Hammer className="w-5 h-5" />, name: 'Mining & Resources' },
    { icon: <Factory className="w-5 h-5" />, name: 'Manufacturing & Industrial' },
    { icon: <Sun className="w-5 h-5" />, name: 'Renewable Energy' },
    { icon: <Droplets className="w-5 h-5" />, name: 'Water & Sanitation' },
    { icon: <Truck className="w-5 h-5" />, name: 'Transport & Logistics' },
    { icon: <Home className="w-5 h-5" />, name: 'Residential Development' },
    { icon: <Wind className="w-5 h-5" />, name: 'Energy & Power' },
    { icon: <Hospital className="w-5 h-5" />, name: 'Healthcare Facilities' },
    { icon: <GraduationCap className="w-5 h-5" />, name: 'Education Infrastructure' },
    { icon: <Fuel className="w-5 h-5" />, name: 'Oil & Gas' },
    { icon: <HardHat className="w-5 h-5" />, name: 'Construction' },
];

// ─── Animate on scroll ───────────────────────────────────────────────────────
function useInView() {
    const ref = useRef<HTMLElement>(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return { ref, inView };
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
    return <p className="text-primary text-sm font-bold uppercase tracking-widest mb-4">{children}</p>;
}

function DisciplineCard({ d, index }: { d: typeof disciplines[0]; index: number }) {
    const [open, setOpen] = useState(false);
    const { ref, inView } = useInView();

    return (
        <section
            ref={ref}
            id={d.id}
            className={`py-16 border-t border-border transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${index * 80}ms` }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left: Identity */}
                <div className="lg:col-span-4 space-y-6">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${d.iconBg}`}>
                        {d.icon}
                    </div>
                    <div>
                        <span className="text-5xl font-bold text-border">{d.number}</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2 leading-tight">{d.title}</h2>
                        <p className="text-primary text-sm font-semibold mt-2">{d.tagline}</p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">{d.description}</p>

                    {/* Standards */}
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Standards & Codes</p>
                        <div className="flex flex-wrap gap-1.5">
                            {d.standards.map(s => (
                                <span key={s} className="text-xs px-2.5 py-1 rounded-lg border border-border bg-secondary text-muted-foreground font-medium">{s}</span>
                            ))}
                        </div>
                    </div>

                    {/* Sectors */}
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Key Sectors</p>
                        <div className="space-y-1">
                            {d.sectors.map(s => (
                                <div key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                                    {s}
                                </div>
                            ))}
                        </div>
                    </div>

                    <Link href="/contact">
                        <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 mt-2">
                            Enquire About This Service <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                </div>

                {/* Right: Sub-services */}
                <div className="lg:col-span-8">
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Service Areas</p>
                        <button
                            onClick={() => setOpen(v => !v)}
                            className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline md:hidden"
                        >
                            {open ? 'Show less' : 'Show all'} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-0 ${!open ? 'max-h-[340px] overflow-hidden md:max-h-none' : ''}`}>
                        {d.subServices.map((sub, i) => (
                            <div
                                key={i}
                                className="group flex gap-4 py-5 px-3 border-t border-border first:border-t-0 sm:first:border-t sm:[&:nth-child(2)]:border-t-0 hover:bg-secondary/40 rounded-xl transition-colors"
                            >
                                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-bold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">{sub.title}</h3>
                                    <p className="text-xs text-muted-foreground leading-relaxed">{sub.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Show more on mobile */}
                    {!open && (
                        <button
                            onClick={() => setOpen(true)}
                            className="mt-3 text-xs text-primary font-semibold flex items-center gap-1 md:hidden"
                        >
                            See all {d.subServices.length} service areas <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
    const processRef = useRef<HTMLElement>(null);
    const [processInView, setProcessInView] = useState(false);
    const credRef = useRef<HTMLElement>(null);
    const [credInView, setCredInView] = useState(false);
    const sectorRef = useRef<HTMLElement>(null);
    const [sectorInView, setSectorInView] = useState(false);

    useEffect(() => {
        const observe = (el: HTMLElement | null, set: (v: boolean) => void) => {
            if (!el) return;
            const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) set(true); }, { threshold: 0.1 });
            obs.observe(el);
            return () => obs.disconnect();
        };
        observe(processRef.current, setProcessInView);
        observe(credRef.current, setCredInView);
        observe(sectorRef.current, setSectorInView);
    }, []);

    return (
        <div className="min-h-screen bg-background">

            {/* ── Hero ─────────────────────────────────────────────────────── */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-background engineering-grid">
                <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-primary/6 rounded-full blur-[120px] pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <SectionLabel>Engineering Services</SectionLabel>
                        <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-[1.1] mb-6">
                            Four Disciplines.<br />
                            <span className="text-primary">One Integrated Team.</span>
                        </h1>
                        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mb-10">
                            Victoria Engineering delivers specialist engineering services across civil infrastructure, process & industrial, electrical power, and project planning — under one roof, with full accountability from brief to handover.
                        </p>
                        {/* Discipline quick-nav */}
                        <div className="flex flex-wrap gap-3">
                            {disciplines.map(d => (
                                <a
                                    key={d.id}
                                    href={`#${d.id}`}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-sm font-semibold text-muted-foreground hover:border-primary/50 hover:text-primary transition-all"
                                >
                                    <span className={`${d.iconBg} p-1.5 rounded-lg`}>{d.icon}</span>
                                    <span className="hidden sm:inline">{d.title.split(' ')[0]} & {d.title.split('&')[1]?.trim().split(' ')[0]}</span>
                                    <span className="sm:hidden">{d.number}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Disciplines ──────────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                {disciplines.map((d, i) => (
                    <DisciplineCard key={d.id} d={d} index={i} />
                ))}
            </div>

            {/* ── Our Process ──────────────────────────────────────────────── */}
            <section
                ref={processRef}
                className="py-24 bg-secondary"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`max-w-2xl mb-16 transition-all duration-1000 ${processInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <SectionLabel>How We Work</SectionLabel>
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">Our Project Process</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            A structured four-phase methodology that keeps every project on scope, on time, and within budget — no matter the discipline.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                        {process.map((p, i) => (
                            <div
                                key={p.id}
                                className={`relative p-8 border-t border-border lg:border-t-0 lg:border-l first:lg:border-l-0 transition-all duration-700 ${processInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{ transitionDelay: `${i * 120}ms` }}
                            >
                                {/* Phase number */}
                                <div className="text-5xl font-bold text-border mb-4 leading-none">0{p.id}</div>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="text-primary">{p.icon}</div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-primary">{p.phase}</span>
                                </div>
                                <h3 className="font-bold text-foreground mb-3">{p.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                                {/* Connector arrow on desktop */}
                                {i < process.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-3 z-10 -translate-y-1/2">
                                        <ArrowRight className="w-5 h-5 text-primary/40" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className={`mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-10 border-t border-border transition-all duration-1000 delay-500 ${processInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div>
                            <h3 className="text-2xl font-bold text-foreground mb-1">Ready to start your project?</h3>
                            <p className="text-muted-foreground">Our team will assess your requirements and provide a detailed proposal within 48 hours.</p>
                        </div>
                        <div className="flex gap-3 flex-shrink-0">
                            <Link href="/projects">
                                <button className="flex items-center gap-2 px-6 py-3 border border-border rounded-xl text-sm font-bold text-foreground hover:bg-background transition-all">
                                    Configure a Project
                                </button>
                            </Link>
                            <Link href="/contact">
                                <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                                    Get a Quote <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Why Victoria Engineering ─────────────────────────────────── */}
            <section
                ref={credRef}
                className="py-24 bg-background"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`max-w-2xl mb-16 transition-all duration-1000 ${credInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <SectionLabel>Why Choose Us</SectionLabel>
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                            Engineering Excellence You Can Trust
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
                        {credentials.map((c, i) => (
                            <div
                                key={i}
                                className={`group py-8 border-t border-border flex items-start gap-5 transition-all duration-700 ${credInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{ transitionDelay: `${i * 80}ms` }}
                            >
                                <div className="text-primary flex-shrink-0 mt-0.5">{c.icon}</div>
                                <div>
                                    <h3 className="font-bold text-foreground mb-1">{c.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Sectors We Serve ─────────────────────────────────────────── */}
            <section
                ref={sectorRef}
                className="py-24 bg-secondary"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`max-w-2xl mb-16 transition-all duration-1000 ${sectorInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <SectionLabel>Sectors We Serve</SectionLabel>
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
                            Engineering Across Every Industry
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            From government infrastructure to private industrial facilities — our engineering expertise spans the full spectrum of South African industry.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {sectors.map((s, i) => (
                            <div
                                key={i}
                                className={`flex items-center gap-3 p-4 rounded-xl border border-border bg-background hover:border-primary/40 hover:shadow-sm transition-all duration-700 ${sectorInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                                style={{ transitionDelay: `${i * 50}ms` }}
                            >
                                <div className="text-primary flex-shrink-0">{s.icon}</div>
                                <span className="text-sm font-semibold text-muted-foreground">{s.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Final CTA ────────────────────────────────────────────────── */}
            <section className="py-24 bg-background">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <SectionLabel>Let's Work Together</SectionLabel>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                        Have a Project in Mind?
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                        Whether you have a fully scoped brief or just an idea — our engineers are ready to listen, assess, and propose a solution that works for your budget and timeline.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact">
                            <button className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl text-base hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                                <Phone className="w-5 h-5" /> Start a Conversation
                            </button>
                        </Link>
                        <Link href="/projects">
                            <button className="flex items-center gap-2 px-8 py-4 border-2 border-border rounded-xl text-base font-bold text-foreground hover:border-primary/50 hover:bg-secondary transition-all">
                                Configure Your Project <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
