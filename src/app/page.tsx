import React from 'react';
import Link from 'next/link';
import MacaneyHeroSlider from '@/components/layout/Hero';
import ServiceTicker from '@/components/layout/ServiceTicker';
import MediaTicker from '@/components/layout/MediaTicker';
import LeadershipCard from '@/components/home/LeadershipCard';
import TestimonialsSlider from '@/components/home/TestimonialsSlider';
import ImpactStats from '@/components/home/ImpactStats';
import CommunitySection from '@/components/home/CommunitySection';
import FadeIn from '@/components/animations/FadeIn';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-50">
      {/* 1. Hero Slideshow */}
      <MacaneyHeroSlider />

      {/* 2. Rolling Ticker - Services & Tech */}
      <ServiceTicker />

      {/* 3. Rolling Ticker - Media Features */}
      <MediaTicker />

      {/* 4. CEO & Minister Leadership Sliding Card */}
      <LeadershipCard />

      {/* 5. Testimonials & Social Proof Section */}
      <TestimonialsSlider />

      <section className="bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <FadeIn direction="right" className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-6 py-5 sm:flex-row sm:items-center sm:gap-10 sm:py-6">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">Visit the Macaney store</p>
              <h2 className="mt-2 text-2xl font-bold leading-tight text-emerald-950 sm:text-3xl">Ready to dive into beekeeping or taste pure honey?</h2>
              <p className="mt-3 text-base leading-7 text-stone-600">Visit our store to shop 100% raw honey, premium hives, and expert-led beekeeping courses.</p>
            </div>
            <Link
              href="/store"
              className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-4 rounded-full border border-emerald-800 bg-emerald-950 py-2 pl-6 pr-2 text-sm font-bold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-900 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
            >
              Explore Our Store
              <span className="flex size-10 items-center justify-center rounded-full border border-amber-300/70 bg-amber-400 text-emerald-950 transition-transform group-hover:translate-x-0.5" aria-hidden="true"><ArrowRight className="size-4" /></span>
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* 6. Impact numbers */}
      <ImpactStats />

      <section className="bg-stone-50 px-4 pb-4 pt-10 sm:px-6 sm:pb-6 sm:pt-14 lg:px-8">
        <FadeIn direction="left" className="mx-auto max-w-7xl">
          <div className="relative flex flex-col items-start justify-between gap-7 overflow-hidden rounded-2xl border-l-4 border-amber-400 bg-emerald-950 px-6 py-8 text-white shadow-xl shadow-emerald-950/10 sm:flex-row sm:items-center sm:gap-10 sm:px-10 sm:py-10 lg:px-12">
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.045))] sm:block" aria-hidden="true" />
            <div className="relative max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-300">Commercial apiary development</p>
              <h2 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">Looking to start a profitable bee farm?</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-emerald-100">We help farmers and landowners build and manage successful commercial apiaries.</p>
            </div>
            <a
              href="https://wa.link/cypnzk"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full border border-amber-300/70 bg-amber-400 py-2 pl-6 pr-2 text-sm font-bold text-emerald-950 shadow-md shadow-black/10 transition duration-200 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950"
            >
              Click here to get started
              <span className="flex size-9 items-center justify-center rounded-full bg-emerald-950 text-amber-300 transition-transform group-hover:translate-x-0.5" aria-hidden="true"><ArrowUpRight className="size-4" /></span>
            </a>
          </div>
        </FadeIn>
      </section>

      {/* 7. Community & Newsletter Capture Section */}
      <CommunitySection />
    </main>
  );
}
