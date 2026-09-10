'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Award } from 'lucide-react';

interface LeaderSlide {
  id: number;
  image: string;
  title: string;
  description: string;
}

const LEADER_SLIDES: LeaderSlide[] = [
  {
    id: 1,
    image: '/images/ceo-minister-1.png', 
    title: 'Orji Chiamaka Precious & Sen. Abubakar Kyari',
    description: 'CEO and Founder of Macaney Sustainable Solution with the Honorable Minister of Agriculture, advancing national apiculture and sustainable agricultural frameworks.',
  },
  {
    id: 2,
    image: '/images/ceo-minister-2.png', 
    title: 'Driving Strategic Agricultural Partnerships',
    description: 'Collaborating at the highest levels of government to scale modern beekeeping technology, food security, and environmental restoration across Africa.',
  },
];

export default function LeadershipCard() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % LEADER_SLIDES.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, []);

  const activeSlide = LEADER_SLIDES[currentSlide];

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="bg-emerald-950 text-white rounded-3xl overflow-hidden shadow-2xl border border-emerald-900 grid grid-cols-1 lg:grid-cols-12 items-center">
        
        {/* Sliding Image Container (Left Column) */}
        <div className="lg:col-span-6 relative h-72 sm:h-88 lg:h-[420px] w-full overflow-hidden bg-stone-900">
          {LEADER_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              } transition-transform duration-7000`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent lg:hidden" />
            </div>
          ))}

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
            {LEADER_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlide ? 'w-6 bg-emerald-400' : 'w-2 bg-white/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Content Section (Right Column) */}
        <div className="lg:col-span-6 p-8 sm:p-10 space-y-5">
          <div className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-emerald-900/80 text-emerald-300 text-xs font-semibold uppercase tracking-wider border border-emerald-700/50">
            <Award className="w-3.5 h-3.5" /> High-Level Leadership Engagement
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight leading-snug">
            {activeSlide.title}
          </h2>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            {activeSlide.description}
          </p>

          <div className="pt-2">
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg gap-2 group"
            >
              Tap to Know More About Us
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}