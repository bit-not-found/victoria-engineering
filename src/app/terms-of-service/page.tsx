'use client';

import { FileCheck, Scale, AlertTriangle, CreditCard, Ban, Gavel } from 'lucide-react';

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
                        <FileCheck className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Terms of Service</h1>
                    <p className="text-xl text-muted-foreground">
                        Last updated: {new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none space-y-12">
                    <section>
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-foreground mb-4">
                            <Scale className="w-6 h-6 text-primary" />
                            1. Acceptance of Terms
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            By accessing or using the services provided by Simple Connectivity ("we," "our," or "us"), you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services.
                        </p>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-foreground mb-4">
                            <AlertTriangle className="w-6 h-6 text-primary" />
                            2. Use of Services
                        </h2>
                        <p className="text-muted-foreground mb-4">
                            You agree to use our services only for lawful purposes and in accordance with our Acceptable Use Policy. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device.
                        </p>
                        <p className="text-muted-foreground">
                            We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders in our sole discretion if we believe a user's conduct violates applicable law or is harmful to our interests.
                        </p>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-foreground mb-4">
                            <CreditCard className="w-6 h-6 text-primary" />
                            3. Billing and Payment
                        </h2>
                        <p className="text-muted-foreground mb-4">
                            Services are billed on a recurring basis as specified in your plan. You agree to provide current, complete, and accurate purchase and account information.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>Payments are due in advance of the service period.</li>
                            <li>Failure to pay may result in suspension or termination of services.</li>
                            <li>All fees are exclusive of taxes unless otherwise stated.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-foreground mb-4">
                            <Ban className="w-6 h-6 text-primary" />
                            4. Termination
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
                        </p>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-foreground mb-4">
                            <Gavel className="w-6 h-6 text-primary" />
                            5. Limitation of Liability
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            In no event shall Simple Connectivity, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                        </p>
                    </section>

                    <section className="bg-secondary/20 p-8 rounded-2xl border border-border">
                        <h2 className="text-xl font-bold text-foreground mb-4">Contact Us</h2>
                        <p className="text-muted-foreground mb-4">
                            If you have any questions about these Terms, please contact us.
                        </p>
                        <div className="space-y-2 text-sm">
                            <p><strong className="text-foreground">Email:</strong> info@simpleconnectivity.co.za</p>
                            <p><strong className="text-foreground">Phone:</strong> +27 12 345 6789</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
