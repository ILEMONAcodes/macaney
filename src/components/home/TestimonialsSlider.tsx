'use client';

import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  initials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "You are highly appreciated for the ebook. In fact it showcase you as epitome of professionalism in beekeeping that you are noted for.",
    author: "Olusunbare O.",
    role: "Commercial Beekeeper",
    initials: "OO",
  },
  {
    id: 2,
    quote: "I have received the E-book and it's very helpful. Thanks a lot for your time to gather all the information. Thanks for being our Messiah in Beekeeping.",
    author: "Gbenga O.",
    role: "Apiary Partner",
    initials: "GO",
  },
  {
    id: 3,
    quote: "Macaney's smart hive insights completely transformed how we monitor colony health. The level of operational support and precision is unmatched.",
    author: "Dr. Aminu Bello",
    role: "AgTech Researcher",
    initials: "AB",
  },
  {
    id: 4,
    quote: "The training programs and sustainable advocacy frameworks provided gave our cooperative the exact blueprint we needed to scale honey production.",
    author: "Ngozi E.",
    role: "Cooperative Lead",
    initials: "NE",
  },
];

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
          Trusted by Leading Beekeepers
        </h2>
        <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto">
          Here is what our community and professional partners have to say about our apiculture solutions.
        </p>
      </div>

      <div className="relative bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-stone-200 overflow-hidden">
        {/* Background decorative watermark icon */}
        <Quote className="absolute -right-6 -bottom-6 w-40 h-40 text-emerald-50 pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between min-h-[200px]">
          <blockquote className="text-lg sm:text-xl lg:text-2xl font-serif text-stone-800 leading-relaxed mb-8 italic">
            &ldquo;{current.quote}&rdquo;
          </blockquote>

          <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-stone-100">
            <div className="flex items-center gap-3.5">
              {/* Circular Initials Badge */}
              <div className="w-12 h-12 rounded-full bg-emerald-900 text-emerald-100 font-bold text-sm sm:text-base flex items-center justify-center shrink-0 shadow-inner">
                {current.initials}
              </div>
              <div>
                <h4 className="font-bold text-stone-900 text-base sm:text-lg">{current.author}</h4>
                <p className="text-emerald-700 text-xs sm:text-sm font-medium">{current.role}</p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full bg-stone-100 hover:bg-emerald-900 hover:text-white text-stone-700 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full bg-stone-100 hover:bg-emerald-900 hover:text-white text-stone-700 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Indicator dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? 'w-6 bg-emerald-700' : 'w-2 bg-stone-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}