'use client';

import { Mail, Phone, MapPin, Send, Building2, HardHat, Zap, BarChart3 } from 'lucide-react';

const contactInfo = [
    {
        icon: <Mail className="w-5 h-5" />,
        title: 'Email Us',
        subtitle: 'For project inquiries & proposals',
        value: 'info@victoriaengineering.co.za',
        href: 'mailto:info@victoriaengineering.co.za',
    },
    {
        icon: <Phone className="w-5 h-5" />,
        title: 'Call Us',
        subtitle: 'Mon–Fri, 7:30am to 5:00pm',
        value: '+27 (0)11 000 0000',
        href: 'tel:+27110000000',
    },
    {
        icon: <MapPin className="w-5 h-5" />,
        title: 'Head Office',
        subtitle: 'Johannesburg, Gauteng',
        value: '1 Engineering Drive, Sandton, 2196',
        href: '#',
    },
];

const disciplines = [
    { label: 'Civil & Infrastructure', icon: <Building2 className="w-4 h-4" /> },
    { label: 'Process & Industrial', icon: <HardHat className="w-4 h-4" /> },
    { label: 'Electrical & Power', icon: <Zap className="w-4 h-4" /> },
    { label: 'Project Planning & Feasibility', icon: <BarChart3 className="w-4 h-4" /> },
    { label: 'Multi-Discipline', icon: <Building2 className="w-4 h-4" /> },
    { label: 'Other', icon: <Mail className="w-4 h-4" /> },
];

const expectations = [
    'Response within 1 business day',
    'Free initial consultation',
    'Detailed proposal within 5 business days',
    'No obligation to proceed',
];

export function ContactSection() {
    return (
        <section className="py-24 bg-secondary" id="contact">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="max-w-2xl mb-16">
                    <p className="text-primary text-sm font-bold uppercase tracking-widest mb-4">Get In Touch</p>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
                        Let's Engineer Your Next Project
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Whether you have a fully scoped project or just an idea, our team is ready to listen, advise, and deliver. Reach out today for a no-obligation consultation.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left: Contact info + expectations */}
                    <div>
                        {/* Contact rows */}
                        <div className="space-y-0 mb-12">
                            {contactInfo.map((info, index) => (
                                <a
                                    key={index}
                                    href={info.href}
                                    className="flex items-center gap-5 py-6 border-t border-border last:border-b group"
                                >
                                    <div className="text-primary flex-shrink-0">
                                        {info.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-muted-foreground mb-0.5">{info.subtitle}</p>
                                        <p className="font-bold text-foreground group-hover:text-primary transition-colors duration-300">{info.value}</p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* What to expect */}
                        <div>
                            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-6">What to Expect</p>
                            <div className="space-y-0">
                                {expectations.map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 py-3 border-t border-border last:border-b">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                        <span className="text-sm text-muted-foreground">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Form — flat, no container */}
                    <div>
                        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-8">Request a Proposal</p>
                        <form
                            action="https://formsubmit.co/info@victoriaengineering.co.za"
                            method="POST"
                            className="space-y-6"
                        >
                            <input type="hidden" name="_subject" value="New Project Inquiry - Victoria Engineering" />
                            <input type="hidden" name="_template" value="table" />
                            <input type="hidden" name="_captcha" value="false" />
                            <input type="hidden" name="_autoresponse" value="Thank you for contacting Victoria Engineering. We have received your inquiry and one of our engineers will be in touch within 1 business day." />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="firstName" className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">First Name *</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        required
                                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary outline-none transition-all text-sm text-foreground placeholder:text-muted-foreground/50"
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">Last Name *</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        required
                                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary outline-none transition-all text-sm text-foreground placeholder:text-muted-foreground/50"
                                        placeholder="Smith"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">Email Address *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary outline-none transition-all text-sm text-foreground placeholder:text-muted-foreground/50"
                                    placeholder="john@company.co.za"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">Phone Number *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    required
                                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary outline-none transition-all text-sm text-foreground placeholder:text-muted-foreground/50"
                                    placeholder="+27 (0)00 000 0000"
                                />
                            </div>

                            <div>
                                <label htmlFor="company" className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">Company / Organisation</label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary outline-none transition-all text-sm text-foreground placeholder:text-muted-foreground/50"
                                    placeholder="Your company name"
                                />
                            </div>

                            <div>
                                <label htmlFor="discipline" className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">Engineering Discipline *</label>
                                <select
                                    id="discipline"
                                    name="discipline"
                                    required
                                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary outline-none transition-all text-sm text-foreground"
                                >
                                    <option value="">Select a discipline</option>
                                    {disciplines.map((d, i) => (
                                        <option key={i} value={d.label}>{d.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">Project Description *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={4}
                                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-primary outline-none transition-all resize-none text-sm text-foreground placeholder:text-muted-foreground/50"
                                    placeholder="Briefly describe your project, location, and timeline..."
                                />
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full transition-all duration-300 text-sm"
                                >
                                    Submit Inquiry
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
