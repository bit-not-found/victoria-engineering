'use client';

import { ShieldAlert, Ban, ServerCrash, MailWarning, Copyright, Lock } from 'lucide-react';

export default function AcceptableUsePolicyPage() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
                        <ShieldAlert className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Acceptable Use Policy</h1>
                    <p className="text-xl text-muted-foreground">
                        Last updated: {new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none space-y-12">
                    <section>
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-foreground mb-4">
                            <Lock className="w-6 h-6 text-primary" />
                            1. General Policy
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            This Acceptable Use Policy ("Policy") outlines the acceptable use of the internet services provided by Simple Connectivity. All users of our services must comply with this Policy. Violation of this Policy may result in the suspension or termination of your service.
                        </p>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-foreground mb-4">
                            <Ban className="w-6 h-6 text-primary" />
                            2. Illegal Activity
                        </h2>
                        <p className="text-muted-foreground mb-4">
                            You may not use our services for any illegal purpose or in violation of any local, state, national, or international law. This includes, but is not limited to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>Transmission or distribution of child pornography or any content that is obscene or indecent.</li>
                            <li>Fraudulent activities, such as pyramid schemes, impersonating another person or entity, or phishing.</li>
                            <li>Accessing or attempting to access accounts or systems without authorization (hacking).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-foreground mb-4">
                            <ServerCrash className="w-6 h-6 text-primary" />
                            3. Network Abuse
                        </h2>
                        <p className="text-muted-foreground mb-4">
                            You may not engage in activities that interfere with or disrupt the integrity or performance of our network or the data contained therein. Prohibited activities include:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>Denial of Service (DoS) or Distributed Denial of Service (DDoS) attacks.</li>
                            <li>Port scanning or vulnerability probing of other networks or systems.</li>
                            <li>Distributing viruses, worms, trojan horses, or other malicious code.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-foreground mb-4">
                            <MailWarning className="w-6 h-6 text-primary" />
                            4. Spam and Unsolicited Communications
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            You may not use our services to send unsolicited bulk email (spam) or other forms of unsolicited commercial communications. This includes sending emails to people who have not explicitly requested them or harvesting email addresses from the internet.
                        </p>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-foreground mb-4">
                            <Copyright className="w-6 h-6 text-primary" />
                            5. Copyright Infringement
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            You may not use our services to download, upload, or distribute copyrighted material without the permission of the copyright holder. We respect the intellectual property rights of others and will respond to notices of alleged copyright infringement.
                        </p>
                    </section>

                    <section className="bg-secondary/20 p-8 rounded-2xl border border-border">
                        <h2 className="text-xl font-bold text-foreground mb-4">Reporting Violations</h2>
                        <p className="text-muted-foreground mb-4">
                            If you become aware of any violation of this Policy, please report it to us immediately.
                        </p>
                        <div className="space-y-2 text-sm">
                            <p><strong className="text-foreground">Email:</strong> abuse@simpleconnectivity.co.za</p>
                            <p><strong className="text-foreground">Phone:</strong> +27 12 345 6789</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
