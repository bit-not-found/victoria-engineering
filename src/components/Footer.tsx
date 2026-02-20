import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
    Services: [
        { name: 'Civil & Infrastructure', href: '/services#civil' },
        { name: 'Process & Industrial', href: '/services#process' },
        { name: 'Electrical & Power', href: '/services#electrical' },
        { name: 'Project Planning', href: '/services#planning' },
    ],
    Company: [
        { name: 'Services', href: '/services' },
        { name: 'Projects', href: '/projects' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
    ],
    Legal: [
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms of Service', href: '/terms-of-service' },
        { name: 'POPIA Compliance', href: '/privacy-policy' },
    ],
};

const socialLinks = [
    { icon: <Facebook className="w-4 h-4" />, href: '#', label: 'Facebook' },
    { icon: <Twitter className="w-4 h-4" />, href: '#', label: 'Twitter' },
    { icon: <Instagram className="w-4 h-4" />, href: '#', label: 'Instagram' },
    { icon: <Linkedin className="w-4 h-4" />, href: '#', label: 'LinkedIn' },
];

export function Footer() {
    return (
        <footer className="bg-background border-t border-border pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-2 space-y-6">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative h-10 w-10 overflow-hidden">
                                <Image
                                    src="/ve-logo.svg"
                                    alt="Victoria Engineering Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <span className="text-foreground font-bold text-lg leading-tight block">Victoria</span>
                                <span className="text-primary font-bold text-xs leading-tight block tracking-widest uppercase">Engineering</span>
                            </div>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                            Delivering engineering excellence across Civil & Infrastructure, Process & Industrial, Electrical & Power, and Project Planning disciplines throughout South Africa.
                        </p>

                        {/* Contact info — plain links, no icon boxes */}
                        <div className="space-y-2">
                            <a href="tel:+27110000000" className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm transition-colors">
                                <Phone className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                                +27 (0)11 000 0000
                            </a>
                            <a href="mailto:info@victoriaengineering.co.za" className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm transition-colors">
                                <Mail className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                                info@victoriaengineering.co.za
                            </a>
                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                                Johannesburg, Gauteng, South Africa
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h3 className="text-foreground font-bold mb-5 text-xs uppercase tracking-widest">{category}</h3>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <p className="text-muted-foreground text-sm">
                            © {new Date().getFullYear()} Victoria Engineering (Pty) Ltd. All rights reserved.
                        </p>
                        <p className="text-muted-foreground/60 text-xs mt-1">
                            ECSA Registered Engineers | Gauteng, South Africa
                        </p>
                    </div>

                    {/* Social Links — plain icon buttons, no box */}
                    <div className="flex gap-4">
                        {socialLinks.map((social, index) => (
                            <Link
                                key={index}
                                href={social.href}
                                aria-label={social.label}
                                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                            >
                                {social.icon}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
