'use client';

import Link from 'next/link';
import { CheckCircle2, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/Button';

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-12 flex items-center justify-center">
            <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="bg-card border border-border rounded-[2.5rem] p-8 md:p-12 shadow-xl text-center space-y-8 relative overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
                            <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
                        </div>

                        <h1 className="text-3xl font-bold text-foreground mb-3">Message Sent!</h1>

                        <p className="text-muted-foreground leading-relaxed mb-8">
                            Thank you for reaching out to Simple Connectivity. We have received your message and will get back to you shortly.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                            <Link href="/" className="w-full">
                                <Button variant="outline" className="w-full justify-center gap-2">
                                    <Home className="w-4 h-4" />
                                    Home
                                </Button>
                            </Link>
                            <Link href="/contact" className="w-full">
                                <Button className="w-full justify-center gap-2 shadow-lg shadow-primary/25">
                                    <ArrowLeft className="w-4 h-4" />
                                    Back
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
