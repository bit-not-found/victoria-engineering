'use client';

import { useState, useRef } from 'react';
import {
    Building2, Zap, Cog, ClipboardList, ChevronRight, ChevronLeft,
    CheckCircle2, Download, Save, RotateCcw, Calendar, DollarSign,
    MapPin, Users, AlertTriangle, FileText, Plus, Trash2, Printer
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type EngineeringDiscipline = 'civil' | 'electrical' | 'process' | 'project' | '';

interface TeamMember {
    id: string;
    name: string;
    role: string;
}

interface Milestone {
    id: string;
    name: string;
    duration: string;
    deliverable: string;
}

interface ProjectConfig {
    // Step 1 – Project Identity
    projectName: string;
    projectRef: string;
    clientName: string;
    discipline: EngineeringDiscipline;
    location: string;
    phone: string;
    startDate: string;
    endDate: string;

    // Step 2 – Scope & Objectives
    description: string;
    objectives: string[];
    exclusions: string;
    constraints: string;

    // Step 3 – Technical Details
    budget: string;
    currency: string;
    riskLevel: 'Low' | 'Medium' | 'High' | 'Critical' | '';
    standards: string[];
    deliverables: string[];

    // Step 4 – Team & Milestones
    team: TeamMember[];
    milestones: Milestone[];
    notes: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const disciplines: { id: EngineeringDiscipline; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'civil', label: 'Civil & Infrastructure', icon: <Building2 className="w-6 h-6" />, color: 'from-blue-500/20 to-blue-600/5' },
    { id: 'electrical', label: 'Electrical & Power', icon: <Zap className="w-6 h-6" />, color: 'from-yellow-500/20 to-yellow-600/5' },
    { id: 'process', label: 'Process & Industrial', icon: <Cog className="w-6 h-6" />, color: 'from-orange-500/20 to-orange-600/5' },
    { id: 'project', label: 'Project Planning & Feasibility', icon: <ClipboardList className="w-6 h-6" />, color: 'from-green-500/20 to-green-600/5' },
];

const engStandards: Record<EngineeringDiscipline, string[]> = {
    civil: ['SANS 10160', 'TMH7', 'COLTO', 'SANS 1200', 'NHBRC Guidelines'],
    electrical: ['SANS 10142', 'IEC 60364', 'NRS 048', 'SAIEE Guidelines', 'NERSA Regulations'],
    process: ['ASME B31.3', 'API 650', 'ISO 9001', 'OHSAS 18001', 'SANS 347'],
    project: ['PMBOK Guide', 'PRINCE2', 'ISO 21500', 'SACPCMP Guidelines'],
    '': [],
};

const riskColors: Record<string, string> = {
    Low: 'text-green-500 bg-green-500/10 border-green-500/30',
    Medium: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30',
    High: 'text-orange-500 bg-orange-500/10 border-orange-500/30',
    Critical: 'text-red-500 bg-red-500/10 border-red-500/30',
};

function makeDefaultConfig(): ProjectConfig {
    return {
        projectName: '',
        projectRef: '',
        clientName: '',
        discipline: '',
        location: '',
        phone: '',
        startDate: '',
        endDate: '',
        description: '',
        objectives: [''],
        exclusions: '',
        constraints: '',
        budget: '',
        currency: 'ZAR',
        riskLevel: '',
        standards: [],
        deliverables: [''],
        team: [{ id: uid(), name: '', role: '' }],
        milestones: [{ id: uid(), name: '', duration: '', deliverable: '' }],
        notes: '',
    };
}

const steps = [
    { id: 1, label: 'Project Identity', icon: <FileText className="w-4 h-4" /> },
    { id: 2, label: 'Scope & Objectives', icon: <ClipboardList className="w-4 h-4" /> },
    { id: 3, label: 'Technical Details', icon: <Cog className="w-4 h-4" /> },
    { id: 4, label: 'Team & Milestones', icon: <Users className="w-4 h-4" /> },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function uid() { return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2); }

function formatCurrency(val: string, cur: string) {
    const n = parseFloat(val.replace(/,/g, ''));
    if (isNaN(n)) return `${cur} 0`;
    return `${cur} ${n.toLocaleString('en-ZA')}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FormLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
    return (
        <label className="block text-sm font-semibold text-foreground mb-1.5">
            {children}
            {required && <span className="text-primary ml-1">*</span>}
        </label>
    );
}

function FormInput({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={`w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm ${className}`}
        />
    );
}

function FormTextarea({ className = '', ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            {...props}
            className={`w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm resize-none ${className}`}
        />
    );
}

function FormSelect({ className = '', children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <select
            {...props}
            className={`w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm ${className}`}
        >
            {children}
        </select>
    );
}

// ─── Step Components ──────────────────────────────────────────────────────────

function Step1({ config, onChange }: { config: ProjectConfig; onChange: (f: Partial<ProjectConfig>) => void }) {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Project Identity</h2>
                <p className="text-muted-foreground text-sm">Define the core identification details of your engineering project.</p>
            </div>

            {/* Discipline Selection */}
            <div>
                <FormLabel required>Engineering Discipline</FormLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    {disciplines.map((d) => (
                        <button
                            key={d.id}
                            type="button"
                            onClick={() => onChange({ discipline: d.id, standards: [] })}
                            className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left group ${config.discipline === d.id
                                ? 'border-primary bg-gradient-to-br ' + d.color + ' shadow-lg shadow-primary/10'
                                : 'border-border bg-card hover:border-primary/40 hover:shadow-md'
                                }`}
                        >
                            <div className={`p-2 rounded-lg ${config.discipline === d.id ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground group-hover:text-primary'}`}>
                                {d.icon}
                            </div>
                            <span className={`font-semibold text-sm ${config.discipline === d.id ? 'text-foreground' : 'text-muted-foreground'}`}>{d.label}</span>
                            {config.discipline === d.id && <CheckCircle2 className="w-5 h-5 text-primary ml-auto flex-shrink-0" />}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <FormLabel required>Project Name</FormLabel>
                    <FormInput
                        placeholder="e.g. N1 Interchange Upgrade Phase 2"
                        value={config.projectName}
                        onChange={e => onChange({ projectName: e.target.value })}
                    />
                </div>
                <div>
                    <FormLabel>Project Reference No.</FormLabel>
                    <FormInput
                        placeholder="e.g. VE-2026-001"
                        value={config.projectRef}
                        onChange={e => onChange({ projectRef: e.target.value })}
                    />
                </div>
                <div>
                    <FormLabel required>Client Name</FormLabel>
                    <FormInput
                        placeholder="e.g. City of Tshwane"
                        value={config.clientName}
                        onChange={e => onChange({ clientName: e.target.value })}
                    />
                </div>
                <div>
                    <FormLabel required>Project Location</FormLabel>
                    <FormInput
                        placeholder="e.g. Pretoria, Gauteng"
                        value={config.location}
                        onChange={e => onChange({ location: e.target.value })}
                    />
                </div>
                <div>
                    <FormLabel required>Contact Phone Number</FormLabel>
                    <FormInput
                        type="tel"
                        placeholder="+27 (0)00 000 0000"
                        value={config.phone}
                        onChange={e => onChange({ phone: e.target.value })}
                    />
                </div>
                <div>
                    <FormLabel required>Start Date</FormLabel>
                    <FormInput
                        type="date"
                        value={config.startDate}
                        onChange={e => onChange({ startDate: e.target.value })}
                    />
                </div>
                <div>
                    <FormLabel required>Estimated Completion Date</FormLabel>
                    <FormInput
                        type="date"
                        value={config.endDate}
                        onChange={e => onChange({ endDate: e.target.value })}
                    />
                </div>
            </div>
        </div>
    );
}

function Step2({ config, onChange }: { config: ProjectConfig; onChange: (f: Partial<ProjectConfig>) => void }) {
    const addObjective = () => onChange({ objectives: [...config.objectives, ''] });
    const removeObjective = (i: number) => onChange({ objectives: config.objectives.filter((_, idx) => idx !== i) });
    const updateObjective = (i: number, val: string) => {
        const arr = [...config.objectives];
        arr[i] = val;
        onChange({ objectives: arr });
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Scope & Objectives</h2>
                <p className="text-muted-foreground text-sm">Clearly define what this project will achieve and its boundaries.</p>
            </div>

            <div>
                <FormLabel required>Project Description</FormLabel>
                <FormTextarea
                    rows={4}
                    placeholder="Provide a comprehensive description of the project, including background context, purpose, and overall approach..."
                    value={config.description}
                    onChange={e => onChange({ description: e.target.value })}
                />
            </div>

            <div>
                <div className="flex items-center justify-between mb-2">
                    <FormLabel required>Project Objectives</FormLabel>
                    <button
                        type="button"
                        onClick={addObjective}
                        className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-semibold transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" /> Add Objective
                    </button>
                </div>
                <div className="space-y-2.5">
                    {config.objectives.map((obj, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{i + 1}</span>
                            <FormInput
                                placeholder={`Objective ${i + 1}...`}
                                value={obj}
                                onChange={e => updateObjective(i, e.target.value)}
                                className="flex-1"
                            />
                            {config.objectives.length > 1 && (
                                <button type="button" onClick={() => removeObjective(i)} className="text-muted-foreground hover:text-red-500 transition-colors p-1">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <FormLabel>Exclusions / Out of Scope</FormLabel>
                    <FormTextarea
                        rows={3}
                        placeholder="List what is explicitly excluded from this project scope..."
                        value={config.exclusions}
                        onChange={e => onChange({ exclusions: e.target.value })}
                    />
                </div>
                <div>
                    <FormLabel>Assumptions & Constraints</FormLabel>
                    <FormTextarea
                        rows={3}
                        placeholder="List any assumptions made or constraints that may affect project delivery..."
                        value={config.constraints}
                        onChange={e => onChange({ constraints: e.target.value })}
                    />
                </div>
            </div>
        </div>
    );
}

function Step3({ config, onChange }: { config: ProjectConfig; onChange: (f: Partial<ProjectConfig>) => void }) {
    const availableStandards = engStandards[config.discipline] || [];
    const addDeliverable = () => onChange({ deliverables: [...config.deliverables, ''] });
    const removeDeliverable = (i: number) => onChange({ deliverables: config.deliverables.filter((_, idx) => idx !== i) });
    const updateDeliverable = (i: number, val: string) => {
        const arr = [...config.deliverables];
        arr[i] = val;
        onChange({ deliverables: arr });
    };
    const toggleStandard = (std: string) => {
        const next = config.standards.includes(std)
            ? config.standards.filter(s => s !== std)
            : [...config.standards, std];
        onChange({ standards: next });
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Technical Details</h2>
                <p className="text-muted-foreground text-sm">Specify budget, risk, applicable standards, and key deliverables.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="sm:col-span-2">
                    <FormLabel required>Project Budget</FormLabel>
                    <FormInput
                        type="number"
                        placeholder="0.00"
                        value={config.budget}
                        onChange={e => onChange({ budget: e.target.value })}
                    />
                </div>
                <div>
                    <FormLabel>Currency</FormLabel>
                    <FormSelect value={config.currency} onChange={e => onChange({ currency: e.target.value })}>
                        <option value="ZAR">ZAR (R)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                    </FormSelect>
                </div>
            </div>

            <div>
                <FormLabel required>Risk Level</FormLabel>
                <div className="flex flex-wrap gap-3 mt-1">
                    {(['Low', 'Medium', 'High', 'Critical'] as const).map(r => (
                        <button
                            key={r}
                            type="button"
                            onClick={() => onChange({ riskLevel: r })}
                            className={`px-5 py-2 rounded-full border-2 font-semibold text-sm transition-all ${config.riskLevel === r
                                ? riskColors[r] + ' border-current'
                                : 'border-border text-muted-foreground hover:border-primary/40'
                                }`}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </div>

            {availableStandards.length > 0 && (
                <div>
                    <FormLabel>Applicable Standards & Codes</FormLabel>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {availableStandards.map(std => (
                            <button
                                key={std}
                                type="button"
                                onClick={() => toggleStandard(std)}
                                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${config.standards.includes(std)
                                    ? 'border-primary bg-primary/10 text-primary'
                                    : 'border-border text-muted-foreground hover:border-primary/40'
                                    }`}
                            >
                                {std}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div>
                <div className="flex items-center justify-between mb-2">
                    <FormLabel required>Key Deliverables</FormLabel>
                    <button
                        type="button"
                        onClick={addDeliverable}
                        className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-semibold transition-colors"
                    >
                        <Plus className="w-3.5 h-3.5" /> Add Deliverable
                    </button>
                </div>
                <div className="space-y-2.5">
                    {config.deliverables.map((d, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="flex-shrink-0 w-4 h-4 text-primary" />
                            <FormInput
                                placeholder={`Deliverable ${i + 1}...`}
                                value={d}
                                onChange={e => updateDeliverable(i, e.target.value)}
                                className="flex-1"
                            />
                            {config.deliverables.length > 1 && (
                                <button type="button" onClick={() => removeDeliverable(i)} className="text-muted-foreground hover:text-red-500 transition-colors p-1">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function Step4({ config, onChange }: { config: ProjectConfig; onChange: (f: Partial<ProjectConfig>) => void }) {
    const addTeam = () => onChange({ team: [...config.team, { id: uid(), name: '', role: '' }] });
    const removeTeam = (id: string) => onChange({ team: config.team.filter(m => m.id !== id) });
    const updateTeam = (id: string, field: keyof TeamMember, val: string) => {
        onChange({ team: config.team.map(m => m.id === id ? { ...m, [field]: val } : m) });
    };

    const addMilestone = () => onChange({ milestones: [...config.milestones, { id: uid(), name: '', duration: '', deliverable: '' }] });
    const removeMilestone = (id: string) => onChange({ milestones: config.milestones.filter(m => m.id !== id) });
    const updateMilestone = (id: string, field: keyof Milestone, val: string) => {
        onChange({ milestones: config.milestones.map(m => m.id === id ? { ...m, [field]: val } : m) });
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Team & Milestones</h2>
                <p className="text-muted-foreground text-sm">Assign your project team and define key project milestones.</p>
            </div>

            {/* Team */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <FormLabel>Project Team</FormLabel>
                    <button type="button" onClick={addTeam} className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-semibold transition-colors">
                        <Plus className="w-3.5 h-3.5" /> Add Member
                    </button>
                </div>
                <div className="space-y-3">
                    {config.team.map((m) => (
                        <div key={m.id} className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-secondary/50 border border-border">
                            <FormInput
                                placeholder="Full Name"
                                value={m.name}
                                onChange={e => updateTeam(m.id, 'name', e.target.value)}
                            />
                            <div className="flex gap-2">
                                <FormInput
                                    placeholder="Role / Designation"
                                    value={m.role}
                                    onChange={e => updateTeam(m.id, 'role', e.target.value)}
                                    className="flex-1"
                                />
                                {config.team.length > 1 && (
                                    <button type="button" onClick={() => removeTeam(m.id)} className="text-muted-foreground hover:text-red-500 transition-colors p-1 flex-shrink-0">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Milestones */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <FormLabel>Project Milestones</FormLabel>
                    <button type="button" onClick={addMilestone} className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-semibold transition-colors">
                        <Plus className="w-3.5 h-3.5" /> Add Milestone
                    </button>
                </div>
                <div className="space-y-3">
                    {config.milestones.map((ms, i) => (
                        <div key={ms.id} className="p-3 rounded-xl bg-secondary/50 border border-border space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                                <FormInput
                                    placeholder="Milestone Name"
                                    value={ms.name}
                                    onChange={e => updateMilestone(ms.id, 'name', e.target.value)}
                                    className="flex-1"
                                />
                                {config.milestones.length > 1 && (
                                    <button type="button" onClick={() => removeMilestone(ms.id)} className="text-muted-foreground hover:text-red-500 transition-colors p-1 flex-shrink-0">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                            <div className="flex gap-3 ml-8">
                                <FormInput
                                    placeholder="Duration (e.g. 4 weeks)"
                                    value={ms.duration}
                                    onChange={e => updateMilestone(ms.id, 'duration', e.target.value)}
                                    className="flex-1"
                                />
                                <FormInput
                                    placeholder="Key Deliverable"
                                    value={ms.deliverable}
                                    onChange={e => updateMilestone(ms.id, 'deliverable', e.target.value)}
                                    className="flex-1"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Notes */}
            <div>
                <FormLabel>Additional Notes</FormLabel>
                <FormTextarea
                    rows={3}
                    placeholder="Any additional remarks, special requirements, or important context..."
                    value={config.notes}
                    onChange={e => onChange({ notes: e.target.value })}
                />
            </div>
        </div>
    );
}

// ─── Project Overview (generated output) ─────────────────────────────────────

function ProjectOverview({ config, onBack }: { config: ProjectConfig; onBack: () => void }) {
    const overviewRef = useRef<HTMLDivElement>(null);
    const disc = disciplines.find(d => d.id === config.discipline);
    const generatedDate = new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' });

    const handlePrint = () => window.print();

    const handleSaveJSON = () => {
        const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${config.projectRef || 'project'}-overview.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-card border border-border">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                    <ChevronLeft className="w-4 h-4" /> Back to Form
                </button>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleSaveJSON}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-secondary transition-all"
                    >
                        <Save className="w-4 h-4 text-primary" /> Save JSON
                    </button>
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                        <Printer className="w-4 h-4" /> Print / Export PDF
                    </button>
                </div>
            </div>

            {/* Document */}
            <div ref={overviewRef} className="bg-card border border-border rounded-2xl overflow-hidden print:shadow-none print:border-0" id="project-overview-doc">

                {/* Header Banner */}
                <div className="bg-foreground text-background p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                            backgroundSize: '30px 30px'
                        }}
                    />
                    <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-primary text-xs font-bold uppercase tracking-widest">Victoria Engineering</span>
                                <span className="text-primary/40">·</span>
                                <span className="text-primary/70 text-xs font-medium">Project Overview</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">{config.projectName || 'Untitled Project'}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm opacity-60 font-mono">
                                {config.projectRef && <span>Ref: {config.projectRef}</span>}
                                {config.phone && <span>· Tel: {config.phone}</span>}
                            </div>
                        </div>
                        <div className="flex flex-col items-start md:items-end gap-2 text-sm opacity-70">
                            {disc && (
                                <span className="flex items-center gap-1.5 text-primary font-semibold">
                                    {disc.icon} {disc.label}
                                </span>
                            )}
                            <span>Generated: {generatedDate}</span>
                            {config.riskLevel && (
                                <span className={`px-3 py-1 rounded-full border text-xs font-bold ${riskColors[config.riskLevel]}`}>
                                    <AlertTriangle className="w-3 h-3 inline mr-1" />
                                    {config.riskLevel} Risk
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-8 md:p-12 space-y-10">

                    {/* Key Info Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: <Users className="w-4 h-4" />, label: 'Client', value: config.clientName || '—' },
                            { icon: <MapPin className="w-4 h-4" />, label: 'Location', value: config.location || '—' },
                            { icon: <Calendar className="w-4 h-4" />, label: 'Duration', value: config.startDate && config.endDate ? `${config.startDate} → ${config.endDate}` : config.startDate || '—' },
                            { icon: <DollarSign className="w-4 h-4" />, label: 'Budget', value: config.budget ? formatCurrency(config.budget, config.currency) : '—' },
                        ].map((item) => (
                            <div key={item.label} className="p-4 rounded-xl bg-secondary/60 border border-border">
                                <div className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider mb-1">
                                    {item.icon} {item.label}
                                </div>
                                <p className="text-foreground font-semibold text-sm leading-snug">{item.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Description */}
                    {config.description && (
                        <Section title="Project Description">
                            <p className="text-muted-foreground leading-relaxed">{config.description}</p>
                        </Section>
                    )}

                    {/* Objectives */}
                    {config.objectives.filter(Boolean).length > 0 && (
                        <Section title="Project Objectives">
                            <ul className="space-y-2">
                                {config.objectives.filter(Boolean).map((obj, i) => (
                                    <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm">
                                        <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                                        {obj}
                                    </li>
                                ))}
                            </ul>
                        </Section>
                    )}

                    {/* Scope Details */}
                    {(config.exclusions || config.constraints) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {config.exclusions && (
                                <Section title="Exclusions / Out of Scope">
                                    <p className="text-muted-foreground text-sm leading-relaxed">{config.exclusions}</p>
                                </Section>
                            )}
                            {config.constraints && (
                                <Section title="Assumptions & Constraints">
                                    <p className="text-muted-foreground text-sm leading-relaxed">{config.constraints}</p>
                                </Section>
                            )}
                        </div>
                    )}

                    {/* Standards */}
                    {config.standards.length > 0 && (
                        <Section title="Applicable Standards & Codes">
                            <div className="flex flex-wrap gap-2">
                                {config.standards.map(std => (
                                    <span key={std} className="px-3 py-1 rounded-lg border border-primary/30 bg-primary/5 text-primary text-xs font-semibold">{std}</span>
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* Deliverables */}
                    {config.deliverables.filter(Boolean).length > 0 && (
                        <Section title="Key Deliverables">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {config.deliverables.filter(Boolean).map((d, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                                        {d}
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* Team */}
                    {config.team.filter(m => m.name).length > 0 && (
                        <Section title="Project Team">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {config.team.filter(m => m.name).map((m) => (
                                    <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/60 border border-border">
                                        <div className="w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">
                                            {m.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-semibold text-foreground text-sm truncate">{m.name}</p>
                                            <p className="text-muted-foreground text-xs truncate">{m.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* Milestones */}
                    {config.milestones.filter(m => m.name).length > 0 && (
                        <Section title="Project Milestones">
                            <div className="space-y-0">
                                {config.milestones.filter(m => m.name).map((ms, i) => (
                                    <div key={ms.id} className="relative flex gap-4 pb-6 last:pb-0">
                                        <div className="flex flex-col items-center">
                                            <div className="w-8 h-8 rounded-full bg-primary/15 border-2 border-primary/40 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                                                {i + 1}
                                            </div>
                                            {i < config.milestones.filter(m => m.name).length - 1 && (
                                                <div className="w-px flex-1 bg-border mt-2" />
                                            )}
                                        </div>
                                        <div className="flex-1 pt-1">
                                            <p className="font-semibold text-foreground text-sm">{ms.name}</p>
                                            <div className="flex flex-wrap gap-3 mt-1">
                                                {ms.duration && <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-md">{ms.duration}</span>}
                                                {ms.deliverable && <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-md">{ms.deliverable}</span>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* Notes */}
                    {config.notes && (
                        <Section title="Additional Notes">
                            <p className="text-muted-foreground text-sm leading-relaxed">{config.notes}</p>
                        </Section>
                    )}

                    {/* Footer */}
                    <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted-foreground">
                        <span>Prepared by <span className="text-primary font-semibold">Victoria Engineering</span></span>
                        <span className="font-mono">{config.projectRef || 'VE-PROJECT'} · {generatedDate}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-primary/40 inline-block" />
                {title}
                <span className="flex-1 h-px bg-border inline-block" />
            </h3>
            {children}
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
    const [step, setStep] = useState(1);
    const [config, setConfig] = useState<ProjectConfig>(makeDefaultConfig);
    const [showOverview, setShowOverview] = useState(false);

    const onChange = (fields: Partial<ProjectConfig>) => {
        setConfig(prev => ({ ...prev, ...fields }));
    };

    const canAdvance = () => {
        if (step === 1) return config.discipline && config.projectName && config.clientName && config.location && config.phone && config.startDate;
        if (step === 2) return config.description && config.objectives.some(Boolean);
        if (step === 3) return config.budget && config.riskLevel && config.deliverables.some(Boolean);
        return true;
    };

    const handleGenerate = () => setShowOverview(true);
    const handleReset = () => { setConfig(makeDefaultConfig()); setStep(1); setShowOverview(false); };

    if (showOverview) {
        return (
            <div className="min-h-screen bg-background pt-28 pb-20">
                <div className="max-w-4xl mx-auto px-4">
                    <ProjectOverview config={config} onBack={() => setShowOverview(false)} />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background engineering-grid">
            {/* Form Container */}
            <section className="pt-28 px-4 pb-24">
                <div className="max-w-3xl mx-auto">

                    {/* Step Progress */}
                    <div className="flex items-center justify-between mb-10 relative">
                        <div className="absolute top-4 left-0 right-0 h-px bg-border -z-0" />
                        {steps.map((s, i) => (
                            <div key={s.id} className="flex flex-col items-center gap-2 z-10">
                                <button
                                    type="button"
                                    onClick={() => s.id < step ? setStep(s.id) : undefined}
                                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all ${step === s.id
                                        ? 'border-primary bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/30'
                                        : step > s.id
                                            ? 'border-primary bg-primary/15 text-primary cursor-pointer hover:bg-primary/25'
                                            : 'border-border bg-background text-muted-foreground'
                                        }`}
                                >
                                    {step > s.id ? <CheckCircle2 className="w-4 h-4" /> : s.id}
                                </button>
                                <span className={`text-xs font-medium hidden sm:block ${step >= s.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                                    {s.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Form Card */}
                    <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-8 md:p-10">
                            {step === 1 && <Step1 config={config} onChange={onChange} />}
                            {step === 2 && <Step2 config={config} onChange={onChange} />}
                            {step === 3 && <Step3 config={config} onChange={onChange} />}
                            {step === 4 && <Step4 config={config} onChange={onChange} />}
                        </div>

                        {/* Navigation */}
                        <div className="px-8 md:px-10 py-5 border-t border-border bg-secondary/30 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <RotateCcw className="w-3.5 h-3.5" /> Reset
                                </button>
                            </div>
                            <div className="flex items-center gap-3">
                                {step > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => setStep(s => s - 1)}
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-secondary transition-all"
                                    >
                                        <ChevronLeft className="w-4 h-4" /> Back
                                    </button>
                                )}
                                {step < 4 ? (
                                    <button
                                        type="button"
                                        onClick={() => setStep(s => s + 1)}
                                        disabled={!canAdvance()}
                                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                                    >
                                        Continue <ChevronRight className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleGenerate}
                                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 animate-pulse-glow"
                                    >
                                        <FileText className="w-4 h-4" /> Generate Overview
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Print styles */}
            <style>{`
                @media print {
                    nav, footer, .no-print { display: none !important; }
                    body { background: white !important; }
                    #project-overview-doc { border: none !important; box-shadow: none !important; }
                }
            `}</style>
        </div>
    );
}
