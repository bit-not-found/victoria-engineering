import { blogPosts } from '@/data/blogPosts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/Button';

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

    return (
        <main className="min-h-screen bg-background pt-32 pb-8">
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}


                {/* Header */}
                <header className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-bold text-sm mb-6">
                        <span>{post.category}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-secondary">
                                <Image
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <span className="font-medium text-foreground">{post.author.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime}</span>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                {/* Author Bio */}
                <div className="mt-16 p-8 bg-secondary/10 rounded-2xl flex items-center gap-6">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden bg-secondary flex-shrink-0">
                        <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-1">{post.author.name}</h3>
                        <p className="text-primary font-medium mb-2">{post.author.role}</p>
                        <p className="text-muted-foreground text-sm">
                            Writing about the latest in technology, connectivity, and digital lifestyle in South Africa.
                        </p>
                    </div>
                </div>
            </article>

            {relatedPosts.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 border-t border-border pt-8">
                    <h2 className="text-3xl font-bold mb-12">More to Read</h2>
                    <div className="flex overflow-x-auto pb-4 gap-6 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
                        {relatedPosts.map((relatedPost) => (
                            <article
                                key={relatedPost.id}
                                className="min-w-[300px] md:min-w-[350px] snap-center bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group flex flex-col h-full"
                            >
                                {/* Image Container */}
                                <Link href={`/blog/${relatedPost.slug}`} className="relative h-48 w-full overflow-hidden block">
                                    <Image
                                        src={relatedPost.image}
                                        alt={relatedPost.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-foreground border border-border">
                                        {relatedPost.category}
                                    </div>
                                </Link>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {relatedPost.date}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {relatedPost.readTime}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                        <Link href={`/blog/${relatedPost.slug}`}>
                                            {relatedPost.title}
                                        </Link>
                                    </h3>

                                    <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-grow">
                                        {relatedPost.excerpt}
                                    </p>

                                    {/* Author & Link */}
                                    <div className="flex items-center justify-between pt-6 border-t border-border mt-auto">
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-secondary">
                                                <Image
                                                    src={relatedPost.author.avatar}
                                                    alt={relatedPost.author.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold">{relatedPost.author.name}</span>
                                            </div>
                                        </div>

                                        <Link
                                            href={`/blog/${relatedPost.slug}`}
                                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                                        >
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
