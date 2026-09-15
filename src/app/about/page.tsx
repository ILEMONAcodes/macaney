'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

const CEO_STORIES = [
  { image: '/Abtimages/cha.jpeg', alt: 'Orji Chiamaka in beekeeping protective clothing' },
  { image: '/Abtimages/WhatsApp-Image-2025-11-13-at-4.11.38-PM.jpeg', alt: 'Orji Chiamaka at an agricultural development event' },
];

const ABOUT_IMAGES = [
  '/Abtimages/20240516_131820-e1763943642627-768x576.jpg',
  '/Abtimages/cha.jpeg',
  '/Abtimages/WhatsApp-Image-2025-11-13-at-4.11.37-PM.jpeg',
  '/Abtimages/chhh.jpg',
  '/Abtimages/chib.jpg',
  '/Abtimages/chaa.jpeg',
  '/Abtimages/WhatsApp-Image-2025-11-13-at-4.25.36-PM.jpeg',
  '/Abtimages/IMG-20241120-WA0180.jpg',
  '/Abtimages/WhatsApp-Image-2025-11-13-at-4.11.38-PM.jpeg',
  '/Abtimages/WhatsApp-Image-2025-11-13-at-4.11.39-PM.jpeg',
];

export default function AboutPage() {
  const [storyIndex, setStoryIndex] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const activeStory = CEO_STORIES[storyIndex];

  useEffect(() => {
    const timer = window.setInterval(() => setStoryIndex((current) => (current + 1) % CEO_STORIES.length), 8_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setHeroIndex((current) => (current + 1) % ABOUT_IMAGES.length), 7_000);
    return () => window.clearInterval(timer);
  }, []);

  function moveStory(direction: number) {
    setStoryIndex((current) => (current + direction + CEO_STORIES.length) % CEO_STORIES.length);
  }

  return (
    <main className="overflow-hidden bg-stone-50 pt-16 text-stone-900 sm:pt-20">
      <section className="relative isolate overflow-hidden bg-emerald-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(251,191,36,0.22),transparent_25%),linear-gradient(120deg,rgba(2,44,34,0.72),rgba(2,44,34,0.12))]" />
        <div className="relative mx-auto max-w-[100rem] px-4 pt-7 sm:px-6 sm:pt-10 lg:px-8">
          <div className="relative h-[23rem] overflow-hidden rounded-t-[2rem] sm:h-[31rem] lg:h-[38rem]">
            <Image key={'backdrop-' + ABOUT_IMAGES[heroIndex]} src={ABOUT_IMAGES[heroIndex]} alt="" fill priority aria-hidden="true" className="scale-110 object-cover opacity-35 blur-2xl" />
            <Image key={ABOUT_IMAGES[heroIndex]} src={ABOUT_IMAGES[heroIndex]} alt="Macaney beekeeping community and field work" fill priority className="animate-[store-display_700ms_cubic-bezier(0.16,1,0.3,1)] object-contain object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent" />
            <div className="absolute bottom-16 left-5 z-10 max-w-xl sm:bottom-20 sm:left-10 lg:left-14"><h1 className="font-serif text-4xl font-bold leading-[1.05] drop-shadow-lg sm:text-6xl lg:text-7xl">Growing stronger<br className="hidden sm:block" /> apiaries, together.</h1><div className="mt-6 flex items-center gap-2">{ABOUT_IMAGES.map((image, index) => <button key={image} type="button" onClick={() => setHeroIndex(index)} className={'h-2.5 rounded-full border border-amber-100/50 transition-all ' + (index === heroIndex ? 'w-9 bg-amber-300' : 'w-2.5 bg-amber-100/70 hover:bg-amber-200')} aria-label={'Show image ' + (index + 1)} />)}</div></div>
          </div>
        </div>
        <div className="relative -mt-10 h-14 rounded-t-[50%] bg-stone-50 sm:-mt-14 sm:h-20" />
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 pt-8 sm:px-6 sm:pb-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
        <FadeIn><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-600">Our way</p><h2 className="mt-4 font-serif text-4xl font-bold leading-tight tracking-tight text-emerald-950 sm:text-5xl">Nature, knowledge, and meaningful progress.</h2></div></FadeIn>
        <FadeIn delay={0.12} direction="right"><div className="space-y-5 text-base leading-8 text-stone-600 sm:text-lg"><p>Macaney Sustainable Solutions exists to make beekeeping a more practical, profitable, and regenerative path for people across Africa. We support the full journey, from learning the craft and caring for colonies to producing honey with confidence.</p><p>Our work blends time-tested field knowledge with modern tools, building stronger apiaries while protecting the landscapes and communities that make them possible.</p></div></FadeIn>
      </section>

      <section className="border-y border-emerald-900/10 bg-white px-4 py-14 sm:px-6 sm:py-20 lg:px-8"><div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-3">{[['Mission', 'To equip African beekeepers with practical knowledge, trusted products, and support that helps apiaries flourish.'], ['Vision', 'A thriving Africa where sustainable beekeeping strengthens food security, livelihoods, and the natural world.'], ['Core values', 'Stewardship, practical innovation, integrity, community, and a deep respect for bees and the people who care for them.']].map(([title, description], index) => <FadeIn key={title} delay={index * 0.08}><article className="h-full border border-emerald-900/10 bg-stone-50 p-6 transition duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-lg sm:p-8"><span className="text-sm font-bold text-amber-600">0{index + 1}</span><h3 className="mt-8 text-xl font-bold text-emerald-950">{title}</h3><p className="mt-3 text-sm leading-6 text-stone-600">{description}</p></article></FadeIn>)}</div></section>

      <section className="bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8"><div className="mx-auto max-w-7xl">
        <FadeIn><div className="border-b border-emerald-900/10 pb-7"><p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-600">Meet the founder</p><h2 className="mt-3 font-serif text-4xl font-bold leading-tight text-emerald-950 sm:text-5xl">Orji Chiamaka&apos;s green vision.</h2></div></FadeIn>
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[minmax(18rem,26rem)_minmax(0,1fr)] lg:gap-20">
          <FadeIn direction="left"><div className="relative mx-auto w-full max-w-md"><div className="absolute -bottom-5 -left-4 h-[86%] w-full bg-amber-400 sm:-bottom-7 sm:-left-7" /><div className="relative aspect-[3/4] overflow-hidden bg-emerald-950 shadow-xl"><Image key={'founder-backdrop-' + activeStory.image} src={activeStory.image} alt="" fill aria-hidden="true" className="scale-110 object-cover opacity-30 blur-2xl" /><Image key={activeStory.image} src={activeStory.image} alt={activeStory.alt} fill className="animate-[store-display_700ms_cubic-bezier(0.16,1,0.3,1)] object-contain object-center" /><div className="absolute bottom-5 left-5 right-5 flex items-center justify-between"><div className="flex gap-2">{CEO_STORIES.map((story, index) => <button key={story.image} type="button" onClick={() => setStoryIndex(index)} className={'h-2.5 rounded-full border border-amber-100/50 transition-all ' + (index === storyIndex ? 'w-8 bg-amber-300' : 'w-2.5 bg-amber-100/75 hover:bg-amber-200')} aria-label={'Show founder image ' + (index + 1)} />)}</div><div className="flex gap-2"><button type="button" onClick={() => moveStory(-1)} className="flex size-9 items-center justify-center rounded-full border border-white/50 bg-emerald-950/75 text-white backdrop-blur transition hover:border-amber-300 hover:text-amber-300" aria-label="Previous founder image"><ChevronLeft className="size-4" /></button><button type="button" onClick={() => moveStory(1)} className="flex size-9 items-center justify-center rounded-full border border-white/50 bg-emerald-950/75 text-white backdrop-blur transition hover:border-amber-300 hover:text-amber-300" aria-label="Next founder image"><ChevronRight className="size-4" /></button></div></div></div></div></FadeIn>
          <FadeIn delay={0.12} direction="right"><article><p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-600">Founder &amp; Chief Executive Officer</p><h3 className="mt-5 text-4xl font-bold tracking-tight text-emerald-950 sm:text-5xl">Orji Chiamaka</h3><div className="mt-7 max-w-3xl space-y-5 text-base leading-8 text-stone-600 sm:text-lg"><p>Orji Chiamaka is a young agricultural leader and the Founder of Macaney Sustainable Solutions, driven by a deep passion for green development. She believes that sustainable beekeeping can create practical opportunities for people while restoring the relationship between communities and nature.</p><p>Through Macaney, Orji works to make trusted beekeeping knowledge, quality products, and field support more accessible to farmers across Africa. Her approach connects healthy colonies with food security, stronger rural livelihoods, and responsible value chains from hive to market.</p><p>Her work is guided by a simple conviction: when people are equipped to care for the environment and earn from it responsibly, entire communities can grow stronger.</p></div></article></FadeIn>
        </div>
      </div></section>
    </main>
  );
}
