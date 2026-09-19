import type { Metadata } from 'next';
import Image from 'next/image';
import { BookOpen } from 'lucide-react';
import { ArticleGrid, FeaturedStory } from '@/components/blog/ArticleGrid';
import { blogPosts } from '@/lib/blog/posts';

export const metadata: Metadata = { title: 'Insights | Macaney Sustainable Solutions', description: 'Practical beekeeping guides, field notes, and sustainable agriculture insights from Macaney.' };

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured) ?? blogPosts[0];
  const standardPosts = blogPosts.filter((post) => post.slug !== featuredPost.slug);
  return (
    <main className="bg-stone-50 pt-16 text-stone-900 sm:pt-20">
      <section className="relative isolate overflow-hidden bg-amber-300 px-4 pb-28 pt-16 sm:px-6 sm:pb-36 sm:pt-20 lg:px-8">
        <Image
          src="/images/bebebeee.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center mix-blend-multiply opacity-55"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(253,230,138,0.96)_0%,rgba(253,230,138,0.82)_48%,rgba(253,230,138,0.38)_100%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex size-11 items-center justify-center rounded-full border border-emerald-950/25 bg-amber-100/80 text-emerald-900 shadow-sm backdrop-blur-sm">
            <BookOpen className="size-5" />
          </div>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-emerald-900">Macaney insights</p>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-bold leading-[0.98] tracking-tight text-emerald-950 sm:text-6xl lg:text-7xl">Ideas for stronger hives and thriving communities.</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-emerald-950/85 sm:text-lg">Practical field knowledge, honest business advice, and fresh thinking for the future of African beekeeping.</p>
        </div>
        <div aria-hidden="true" className="absolute -bottom-px left-1/2 h-16 w-[130%] -translate-x-1/2 rounded-t-[50%] bg-stone-50 sm:h-24" />
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8"><div className="mb-7 flex items-center gap-4"><span className="h-px flex-1 bg-emerald-900/15" /><p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Latest from Macaney</p><span className="h-px flex-1 bg-emerald-900/15" /></div><FeaturedStory post={featuredPost} /></section><section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8"><div className="mb-10 flex items-end justify-between border-b border-emerald-900/15 pb-5"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">More to explore</p><h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-emerald-950 sm:text-4xl">From the field</h2></div><p className="hidden text-sm text-stone-500 sm:block">Guides for every stage of your beekeeping journey.</p></div><ArticleGrid posts={standardPosts} /></section>
    </main>
  );
}
