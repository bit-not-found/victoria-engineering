'use client';

import { Shield, Lock, Eye, FileText, Server } from 'lucide-react';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
                        <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
                    <p className="text-xl text-muted-foreground">
                        Last updated: {new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none space-y-12">
                    <section>
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-foreground mb-4">
                            <FileText className="w-6 h-6 text-primary" />
                            1. Introduction
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Simple Connectivity ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our internet services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                        </p>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-foreground mb-4">
                            <Eye className="w-6 h-6 text-primary" />
                            2. Information We Collect
                        </h2>
                        <p className="text-muted-foreground mb-4">
                            We may collect information about you in a variety of ways. The information we may collect includes:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>
                                <strong className="text-foreground">Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.
                            </li>
                            <li>
                                <strong className="text-foreground">Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
                            </li>
                            <li>
                                <strong className="text-foreground">Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-foreground mb-4">
                            <Server className="w-6 h-6 text-primary" />
                            3. Use of Your Information
                        </h2>
                        <p className="text-muted-foreground mb-4">
                            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                'Create and manage your account.',
                                'Process your payments and refunds.',
                                'Email you regarding your account or order.',
                                'Enable user-to-user communications.',
                                'Monitor and analyze usage and trends.',
                                'Notify you of updates to the Site.',
                                'Offer new products, services, and recommendations.',
                                'Perform other business activities as needed.',
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-2 text-muted-foreground bg-secondary/30 p-3 rounded-lg">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-foreground mb-4">
                            <Lock className="w-6 h-6 text-primary" />
                            4. Security of Your Information
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                        </p>
                    </section>

                    <section className="bg-secondary/20 p-8 rounded-2xl border border-border">
                        <h2 className="text-xl font-bold text-foreground mb-4">Contact Us</h2>
                        <p className="text-muted-foreground mb-4">
                            If you have questions or comments about this Privacy Policy, please contact us at:
                        </p>
                        <div className="space-y-2 text-sm">
                            <p><strong className="text-foreground">Email:</strong> info@simpleconnectivity.co.za</p>
                            <p><strong className="text-foreground">Phone:</strong> +27 12 345 6789</p>
                            <p><strong className="text-foreground">Address:</strong> 123 Connectivity Street, Tech Park, Johannesburg</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
