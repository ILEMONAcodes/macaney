'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import type { BlogPost } from '@/lib/blog/posts';

function PostMeta({ post }: { post: BlogPost }) {
  return <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-emerald-100/75"><span className="inline-flex items-center gap-1.5"><Calendar className="size-3.5 text-amber-300" />{post.publishedAt}</span><span className="inline-flex items-center gap-1.5"><Clock className="size-3.5 text-amber-300" />{post.readingTime}</span></div>;
}

function CategoryTag({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex w-fit rounded-full border border-emerald-300/30 bg-emerald-800/90 px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.13em] text-emerald-50 shadow-sm backdrop-blur-sm">{children}</span>;
}

export function FeaturedStory({ post }: { post: BlogPost }) {
  return <motion.article initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -7 }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }} className="group overflow-hidden rounded-[2rem] border border-emerald-950/10 bg-emerald-950 shadow-[0_25px_55px_-30px_rgba(6,78,59,0.7)] transition-shadow duration-500 hover:shadow-[0_35px_70px_-30px_rgba(6,78,59,0.85)] lg:grid lg:grid-cols-[1.1fr_0.9fr]">
    <Link href={`/blog/${post.slug}`} className="relative block min-h-80 overflow-hidden bg-emerald-900 sm:min-h-[28rem] lg:min-h-full" aria-label={`Read ${post.title}`}><Image src={post.image} alt={post.imageAlt} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover transition duration-700 ease-out group-hover:scale-110" /><div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-emerald-950/70 to-transparent" /><div className="absolute bottom-6 left-6"><CategoryTag>{post.category}</CategoryTag></div></Link>
    <div className="relative flex flex-col justify-center overflow-hidden p-7 sm:p-10 lg:p-12"><div aria-hidden="true" className="absolute -right-16 -top-16 size-48 rounded-full border border-emerald-700/50" /><p className="relative text-xs font-bold uppercase tracking-[0.18em] text-amber-300">Featured story</p><h2 className="relative mt-4 font-serif text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl"><Link href={`/blog/${post.slug}`} className="transition-colors hover:text-amber-200">{post.title}</Link></h2><p className="relative mt-5 max-w-xl text-base leading-7 text-emerald-50/85">{post.excerpt}</p><div className="relative mt-7"><PostMeta post={post} /></div><Link href={`/blog/${post.slug}`} className="relative mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-bold text-white transition duration-300 hover:gap-3 hover:bg-emerald-400">Read the story <ArrowRight className="size-4" /></Link></div>
  </motion.article>;
}

export function ArticleGrid({ posts }: { posts: BlogPost[] }) {
  return <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">{posts.map((post, index) => <motion.article key={post.slug} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -8 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }} className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-emerald-950/10 bg-emerald-950 shadow-[0_18px_42px_-27px_rgba(6,78,59,0.65)] transition-shadow duration-500 hover:shadow-[0_28px_55px_-25px_rgba(6,78,59,0.8)]"><Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-emerald-900" aria-label={`Read ${post.title}`}><Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition duration-700 ease-out group-hover:scale-110" /><div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-emerald-950/70 to-transparent" /><div className="absolute bottom-4 left-5"><CategoryTag>{post.category}</CategoryTag></div></Link><div className="flex flex-1 flex-col p-6 sm:p-7"><h3 className="font-serif text-2xl font-bold leading-tight tracking-tight text-white"><Link href={`/blog/${post.slug}`} className="transition-colors hover:text-amber-200">{post.title}</Link></h3><p className="mt-4 text-sm leading-6 text-emerald-50/80">{post.excerpt}</p><div className="mt-6"><PostMeta post={post} /></div><Link href={`/blog/${post.slug}`} className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/45 px-4 py-2.5 text-sm font-bold text-emerald-50 transition duration-300 hover:gap-3 hover:border-emerald-300 hover:bg-emerald-800">Read article <ArrowRight className="size-4 text-amber-300" /></Link></div></motion.article>)}</div>;
}
