'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './Button';
import { ModeToggle } from './ModeToggle';

const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-border'
                : 'bg-transparent'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="relative h-10 w-10 overflow-hidden">
                                    <Image
                                        src="/ve-logo.svg"
                                        alt="Victoria Engineering Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div className="hidden sm:block">
                                    <span className="text-foreground font-bold text-lg leading-tight block">Victoria</span>
                                    <span className="text-primary font-bold text-lg leading-tight block tracking-widest uppercase text-xs">Engineering</span>
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                                </Link>
                            ))}
                        </div>

                        {/* Desktop Buttons */}
                        <div className="hidden md:flex items-center space-x-3">
                            <ModeToggle />
                            <Link href="/contact">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold border-none shadow-lg shadow-primary/20"
                                >
                                    Get a Quote
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center gap-3">
                            <ModeToggle />
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-muted-foreground hover:text-primary p-2 transition-colors"
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="absolute top-20 left-4 right-4 bg-background border border-border rounded-2xl p-6 shadow-2xl space-y-2 animate-in slide-in-from-top-10 fade-in duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="block px-4 py-3 text-base font-medium text-muted-foreground hover:text-primary hover:bg-secondary rounded-xl transition-all"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-border">
                            <Link href="/contact" onClick={() => setIsOpen(false)}>
                                <Button
                                    variant="primary"
                                    className="w-full justify-center bg-primary text-primary-foreground font-bold hover:bg-primary/90"
                                >
                                    Get a Quote
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
