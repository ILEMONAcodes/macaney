import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Calendar, Clock } from 'lucide-react';
import { notFound } from 'next/navigation';
import ShareButton from '@/components/blog/ShareButton';
import { blogPosts, getPostBySlug } from '@/lib/blog/posts';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return blogPosts.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug((await params).slug);
  if (!post) return {};
  return { title: `${post.title} | Macaney Insights`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPostBySlug((await params).slug);
  if (!post) notFound();
  return (
    <main className="bg-stone-50 pt-16 text-stone-900 sm:pt-20">
      <article>
        <header className="relative isolate overflow-hidden bg-emerald-950 px-4 pb-28 pt-10 text-white sm:px-6 sm:pb-36 sm:pt-14 lg:px-8">
          <Image src="/images/imagesbeee.jpeg" alt="" fill priority sizes="100vw" className="pointer-events-none scale-[1.28] object-cover object-[78%_48%] opacity-55 sm:scale-[1.18] sm:object-[85%_45%] sm:opacity-60 lg:scale-125" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_35%,rgba(251,191,36,0.2),transparent_28%),linear-gradient(90deg,rgba(2,44,34,0.98)_8%,rgba(2,44,34,0.88)_47%,rgba(2,44,34,0.2)_100%)]" />
          <div className="relative mx-auto max-w-5xl">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-100 transition hover:text-amber-300"><ArrowLeft className="size-4" />All insights</Link>
            <p className="mt-14 text-xs font-bold uppercase tracking-[0.2em] text-amber-300">{post.category}</p>
            <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">{post.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-50/90">{post.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-emerald-100"><span className="inline-flex items-center gap-2"><Calendar className="size-4 text-amber-300" />{post.publishedAt}</span><span className="inline-flex items-center gap-2"><Clock className="size-4 text-amber-300" />{post.readingTime}</span></div>
          </div>
          <div aria-hidden="true" className="absolute -bottom-px left-1/2 h-16 w-[130%] -translate-x-1/2 rounded-t-[50%] bg-stone-50 sm:h-24" />
        </header>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><div className="relative -mt-8 aspect-[16/10] overflow-hidden rounded-[1.75rem] border-4 border-stone-50 bg-emerald-900 shadow-[0_25px_55px_-28px_rgba(6,78,59,0.7)] sm:-mt-12 sm:rounded-[2.5rem]"><Image src={post.image} alt={post.imageAlt} fill priority sizes="(max-width: 1152px) 100vw, 1152px" className="object-cover object-top" /><div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 to-transparent" /></div></div>
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[10rem_minmax(0,42rem)] lg:gap-16 lg:px-8"><aside className="lg:pt-2"><div className="flex items-center gap-3 lg:flex-col lg:items-start"><span className="flex size-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-800"><BookOpen className="size-5" /></span><ShareButton title={post.title} /></div></aside><div className="text-[1.06rem] leading-8 text-stone-700 sm:text-lg sm:leading-9">{post.content.map((block, index) => { if (block.type === 'heading') return <h2 key={index} className="mt-12 font-serif text-3xl font-bold leading-tight tracking-tight text-emerald-950 sm:text-4xl">{block.text}</h2>; if (block.type === 'list') return <ul key={index} className="my-7 space-y-3 border-l-2 border-amber-400 pl-6 text-stone-700">{block.items.map((item) => <li key={item} className="pl-1">{item}</li>)}</ul>; if (block.type === 'quote') return <blockquote key={index} className="my-10 border-l-4 border-emerald-700 pl-6 font-serif text-2xl font-semibold leading-snug text-emerald-900 sm:text-3xl">“{block.text}”</blockquote>; return <p key={index} className="mt-6 first:mt-0">{block.text}</p>; })}</div></div>
      </article>
      <section className="border-t border-emerald-900/10 bg-white px-4 py-14 sm:px-6 lg:px-8"><div className="mx-auto max-w-5xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Keep learning</p><h2 className="mt-3 font-serif text-3xl font-bold text-emerald-950 sm:text-4xl">Explore more field notes and guides.</h2><Link href="/blog" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-800 transition hover:gap-3">Browse all insights <ArrowLeft className="size-4 rotate-180" /></Link></div></section>
    </main>
  );
}
