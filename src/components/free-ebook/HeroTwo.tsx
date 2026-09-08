import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { LeadForm } from '@/components/free-ebook/LeadForm';

export function HeroTwo() {
  return (
    <section className="relative overflow-hidden bg-[#fdfbf7] text-stone-900 py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
      {/* Removed the top background blur element */}

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Return to Main Website Link */}
        <div className="mb-3 sm:mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-amber-600 transition-colors bg-white border border-stone-200 px-4 py-2 rounded-xl shadow-xs group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Main Website</span>
          </Link>
        </div>

        <div className="relative bg-white border border-amber-100 shadow-2xl rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-12 lg:p-16 overflow-visible">

          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-amber-100/50 rounded-full blur-2xl pointer-events-none" />

          {/* Flying Bee - anchored near the logo area */}
          <div className="absolute top-2 right-4 sm:top-4 sm:right-8 lg:right-12 w-20 h-20 sm:w-24 sm:h-24 pointer-events-none animate-bee-flight z-30 drop-shadow-2xl">
            <Image
              src="/images/bee.png"
              alt="Flying Honey Bee"
              width={96}
              height={96}
              className="object-contain"
              priority
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10">

            {/* Left Column */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">

              {/* Brand lockup */}
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-44 sm:w-56 h-auto relative pt-2 px-4 flex items-center justify-center overflow-visible">
                  <Image
                    src="/images/logo2.png"
                    alt="Macaney Logo"
                    width={260}
                    height={160}
                    className="object-contain drop-shadow-sm"
                    priority
                  />
                </div>
                <div className="flex flex-col text-center lg:text-left -mt-4 sm:-mt-5">
                  <span className="font-serif font-bold text-stone-900 text-base sm:text-lg leading-tight tracking-tight">
                    Macaney Sustainable Solutions
                  </span>
                  <span className="text-xs sm:text-sm text-stone-500 font-medium mt-0.5">
                    Building a Global Green Future For All
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-bold tracking-wider uppercase shadow-sm">
                <span>Free E-Book</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-[1.1]">
                10 Signs You May Not Be Eating Real Honey <span className="text-green-800 text-xl sm:text-2xl lg:text-3xl block sm:inline font-semibold">An Essential Guide to Apicultural Authenticity</span>
              </h1>

              {/* Reduced ebook mockup size for better visual proportion */}
              <div className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-none lg:w-[68%] aspect-[4/5] mx-auto lg:mx-0 transform drop-shadow-[0_20px_30px_rgba(0,0,0,0.2)]">
                <Image
                  src="/images/ebook-cover-2.png"
                  alt="10 Signs You May Not Be Eating Real Honey Ebook Guide"
                  fill
                  className="object-contain rounded-xl"
                  priority
                />
              </div>

              <p className="text-stone-600 text-sm sm:text-base max-w-md mx-auto lg:mx-0 leading-relaxed">
                Discover what most labels don't tell you—and what your body quietly notices. Uncover the hidden markers of adulterated blends and learn how to secure 100% pure, authentic honey.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-stone-700 font-medium pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-amber-600 font-bold">✓</span> Free Instant PDF Download
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-600 font-bold">✓</span> Exclusive WhatsApp Community
                </div>
              </div>
            </div>

            {/* Right Column: Lead Form */}
            <div className="lg:col-span-6 w-full max-w-md mx-auto lg:max-w-none lg:sticky lg:top-24">
              <div className="bg-amber-50/30 border border-amber-200/60 rounded-3xl p-6 sm:p-8 shadow-inner relative z-10 transition-all duration-300 hover:shadow-xl">
                <LeadForm />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}