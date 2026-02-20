'use client';

import { useState } from 'react';
import { Search, HelpCircle, Wifi, CreditCard, User, Settings, Mail, Phone, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './Button';

const categories = [
    {
        id: 'connectivity',
        icon: <Wifi className="w-6 h-6" />,
        title: 'Connectivity',
        description: 'Troubleshoot connection issues and speed problems.'
    },
    {
        id: 'billing',
        icon: <CreditCard className="w-6 h-6" />,
        title: 'Billing & Payments',
        description: 'Manage your subscription, invoices, and payment methods.'
    },
    {
        id: 'account',
        icon: <User className="w-6 h-6" />,
        title: 'Account Management',
        description: 'Update your profile, password, and account settings.'
    },
    {
        id: 'technical',
        icon: <Settings className="w-6 h-6" />,
        title: 'Technical Support',
        description: 'Advanced configuration and device setup guides.'
    }
];

const faqs = [
    {
        categoryId: 'connectivity',
        question: 'How do I connect to a hotspot?',
        answer: 'To connect to a hotspot, simply open your device\'s Wi-Fi settings, select the "Simple Connectivity" network, and follow the on-screen instructions to log in or create an account.'
    },
    {
        categoryId: 'billing',
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit and debit cards, as well as various mobile payment options. You can manage your payment methods in your account settings.'
    },
    {
        categoryId: 'account',
        question: 'How can I check my data usage?',
        answer: 'You can check your current data usage by logging into your account dashboard. Your usage statistics are updated in real-time.'
    },
    {
        categoryId: 'technical',
        question: 'Is my connection secure?',
        answer: 'Yes, we use industry-standard encryption to ensure your data is secure while connected to our network.'
    },
    {
        categoryId: 'account',
        question: 'Can I use my account on multiple devices?',
        answer: 'Yes, your account supports multiple concurrent connections depending on your subscription plan. Check your plan details for the specific limit.'
    }
];

export function HelpCenter() {
    const [searchQuery, setSearchQuery] = useState('');
    const [openFaqQuestion, setOpenFaqQuestion] = useState<string | null>(null);

    const toggleFaq = (question: string) => {
        setOpenFaqQuestion(openFaqQuestion === question ? null : question);
    };

    const filteredFaqs = faqs.filter(faq =>
        searchQuery === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <div className="bg-primary/5 pt-20 pb-10 px-4">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary">How can we help you?</h1>
                    <p className="text-xl text-muted-foreground">Search our knowledge base or browse categories below.</p>

                    <div className="relative max-w-2xl mx-auto">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search for answers..."
                            className="w-full pl-11 pr-4 py-4 rounded-xl border border-border bg-card shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 pt-10 pb-16 space-y-20">
                {/* Search Results */}
                {searchQuery && (
                    <section className="max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6">Search Results</h2>
                        <div className="space-y-4">
                            {filteredFaqs.map((faq, index) => (
                                <div key={index} className="bg-card border border-border rounded-xl overflow-hidden">
                                    <button
                                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-secondary/50 transition-colors"
                                        onClick={() => toggleFaq(faq.question)}
                                    >
                                        <span className="font-medium">{faq.question}</span>
                                        {openFaqQuestion === faq.question ? (
                                            <ChevronUp className="w-5 h-5 text-muted-foreground" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                        )}
                                    </button>
                                    {openFaqQuestion === faq.question && (
                                        <div className="px-6 pb-4 pt-0 text-muted-foreground animate-in slide-in-from-top-2 fade-in duration-200">
                                            <p className="pt-2 border-t border-border/50">{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {filteredFaqs.length === 0 && (
                                <p className="text-muted-foreground text-center py-8">No results found for "{searchQuery}"</p>
                            )}
                        </div>
                    </section>
                )}

                {/* Categories Grid */}
                <section>
                    <h2 className="text-2xl font-bold mb-8 text-center">Browse by Category</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <a
                                key={category.id}
                                href={`#${category.id}`}
                                className="bg-card p-6 rounded-2xl border border-border hover:shadow-lg transition-all cursor-pointer group block"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                                    {category.icon}
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                                <p className="text-muted-foreground text-sm">{category.description}</p>
                            </a>
                        ))}
                    </div>
                </section>

                {/* FAQ Section */}
                {/* FAQ Section */}
                {!searchQuery && (
                    <div className="max-w-3xl mx-auto space-y-16">
                        {categories.map((category) => (
                            <section key={category.id} id={category.id} className="scroll-mt-24">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        {category.icon}
                                    </div>
                                    {category.title}
                                </h2>
                                <div className="space-y-4">
                                    {faqs.filter(f => f.categoryId === category.id).map((faq, index) => (
                                        <div key={index} className="bg-card border border-border rounded-xl overflow-hidden">
                                            <button
                                                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-secondary/50 transition-colors"
                                                onClick={() => toggleFaq(faq.question)}
                                            >
                                                <span className="font-medium">{faq.question}</span>
                                                {openFaqQuestion === faq.question ? (
                                                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                                                ) : (
                                                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                                )}
                                            </button>
                                            {openFaqQuestion === faq.question && (
                                                <div className="px-6 pb-4 pt-0 text-muted-foreground animate-in slide-in-from-top-2 fade-in duration-200">
                                                    <p className="pt-2 border-t border-border/50">{faq.answer}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                )}

                {/* Contact Support */}
                <section className="bg-primary/5 rounded-3xl p-8 md:p-12 text-center">
                    <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
                    <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Our support team is available 24/7 to assist you with any issues you might encounter.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Button variant="primary" className="flex items-center gap-2 min-w-[200px] justify-center">
                            <MessageSquare className="w-4 h-4" />
                            Start Live Chat
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2 min-w-[200px] justify-center bg-background">
                            <Mail className="w-4 h-4" />
                            Email Support
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2 min-w-[200px] justify-center bg-background">
                            <Phone className="w-4 h-4" />
                            Call Us
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    );
}
