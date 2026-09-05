import React from 'react';
import Image from 'next/image';
import { LeadForm } from '@/components/free-ebook/LeadForm';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fdfbf7] text-stone-900 py-12 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="relative bg-white/80 backdrop-blur-md border border-amber-100 shadow-2xl rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-12 lg:p-16 overflow-visible">

          <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-50 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-amber-100/50 rounded-full blur-2xl pointer-events-none" />

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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start lg:items-center relative z-10">

            <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">

              <div className="flex flex-col items-center lg:items-start">
                <div className="w-40 sm:w-48 relative flex items-center justify-center">
                  <Image
                    src="/images/logo.png"
                    alt="Macaney Logo"
                    width={260}
                    height={160}
                    className="object-contain drop-shadow-sm"
                    priority
                  />
                </div>
                <div className="flex flex-col text-center lg:text-left -mt-2">
                  <span className="font-serif font-bold text-stone-900 text-base sm:text-lg leading-tight tracking-tight">
                    MACANEY SUSTAINABLE SOLUTIONS
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
                From Hive to Honey <span className="text-green-800 block sm:inline">The Beginner's Guide to Beekeeping</span>
              </h1>

              <p className="text-stone-600 text-sm sm:text-base max-w-md mx-auto lg:mx-0 leading-relaxed">
                A practical guide to help you start your beekeeping journey with confidence. Unlock the complete blueprint to successful apiculture, professional hive construction, and high-yield harvesting techniques optimized specifically for African climates.
              </p>

              {/* Ebook mockup - large, scales with column width on desktop */}
              <div className="relative w-full max-w-[400px] sm:max-w-[480px] lg:max-w-none lg:w-[85%] aspect-[4/5] mx-auto lg:mx-0 transform drop-shadow-[0_30px_40px_rgba(0,0,0,0.25)]">
                <Image
                  src="/images/ebook-cover.png"
                  alt="From Hive To Honey Ebook Guide"
                  fill
                  className="object-contain rounded-xl"
                  priority
                />
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-stone-700 font-medium">
                <div className="flex items-center gap-2">
                  <span className="text-amber-600 font-bold">✓</span> Free Instant PDF Download
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-600 font-bold">✓</span> Exclusive WhatsApp Community
                </div>
              </div>
            </div>

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