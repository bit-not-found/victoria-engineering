'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import { Button } from './Button';

export function BlogSection() {
    return (
        <section className="pt-6 pb-6 bg-secondary/10 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-bold text-sm mb-6">
                            <span>Latest Updates</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Connected & Informed</h2>
                        <p className="text-muted-foreground text-lg">
                            Tips, tricks, and insights to help you get the most out of your internet connection.
                        </p>
                    </div>
                    <Link href="/blog">
                        <Button variant="outline" className="hidden md:flex gap-2">
                            View All Posts <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <article
                            key={post.id}
                            className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group flex flex-col h-full"
                        >
                            {/* Image Container */}
                            <Link href={`/blog/${post.slug}`} className="relative h-48 w-full overflow-hidden block">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-foreground border border-border">
                                    {post.category}
                                </div>
                            </Link>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {post.date}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {post.readTime}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h3>

                                <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-grow">
                                    {post.excerpt}
                                </p>

                                {/* Author & Link */}
                                <div className="flex items-center justify-between pt-6 border-t border-border mt-auto">
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-secondary">
                                            <Image
                                                src={post.author.avatar}
                                                alt={post.author.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold">{post.author.name}</span>
                                            <span className="text-[10px] text-muted-foreground">{post.author.role}</span>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                                    >
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="/blog">
                        <Button variant="outline" className="w-full gap-2">
                            View All Posts <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
