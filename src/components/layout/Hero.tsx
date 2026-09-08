'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Pause, 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight 
} from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
}

const MACANEY_HERO_SLIDES: Slide[] = [
  {
    id: 1,
    title: 'Building a Future Where Africa and Bees Thrive Together.',
    subtitle: 'Macaney helps people become great beekeepers, establish commercial bee farms, and build a sustainable future through beekeeping and technology.',
    buttonText: 'Start Your Journey',
    buttonLink: '/free-ebook',
    mediaType: 'video',
    mediaUrl: '/images/vide.mp4', 
  },
  {
    id: 2,
    title: 'Commercial Apiary Setup & Expert Consultation',
    subtitle: 'From farm planning to hive setup and ongoing technical guidance, we help you build profitable, sustainable bee farms with expert support.',
    buttonText: 'Explore Services',
    buttonLink: '/services',
    mediaType: 'image',
    mediaUrl: '/images/beeess.png',
  },
  {
    id: 3,
    title: 'Discover 100% Pure, Authentic Honey',
    subtitle: 'Uncover the hidden markers of adulterated blends and learn how to secure genuine apiary products straight from trusted hives.',
    buttonText: 'Get Free E-Book',
    buttonLink: '/free-ebook',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Modern Technology Meets Sustainable Beekeeping',
    subtitle: 'Leverage smart hive monitoring and data-driven insights to maximize honey yields and ensure colony health all year round.',
    buttonText: 'Discover Technology',
    buttonLink: '/technology',
    mediaType: 'image',
    mediaUrl: '/images/beeai.png',
  },
  {
    id: 5,
    title: 'Join the Vanguard of African Apiculture',
    subtitle: 'Connect with a thriving ecosystem of innovators, investors, and apiarists transforming agriculture across the continent.',
    buttonText: 'Join the Network',
    buttonLink: '/community',
    mediaType: 'image',
    mediaUrl: '/images/beeimage.png',
  },
];

const SLIDE_DURATION = 6000;

export default function MacaneyHeroSlider() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % MACANEY_HERO_SLIDES.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + MACANEY_HERO_SLIDES.length) % MACANEY_HERO_SLIDES.length);
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  const activeSlide = MACANEY_HERO_SLIDES[currentSlide];

  return (
    <section className="relative w-full h-[95vh] min-h-[660px] max-h-[1020px] overflow-hidden bg-stone-950 text-white pt-10 sm:pt-14">
      {/* Background Media Slideshow */}
      {MACANEY_HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105'
            } transition-transform duration-7000`}
          >
            {slide.mediaType === 'video' ? (
              <video
                src={slide.mediaUrl}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            ) : (
              <Image
                src={slide.mediaUrl}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover object-center"
              />
            )}
            {/* Centered vignette overlay for desktop balance */}
            <div className="absolute inset-0 bg-stone-950/75 md:bg-stone-950/65" />
            <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/40 to-stone-900/30" />
          </div>
        );
      })}

      {/* Custom CSS Keyframe Animations injected directly */}
      <style jsx>{`
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.97) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        .animate-content {
          animation: fadeInScale 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Main Hero Container */}
      <div className="relative z-20 h-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between pt-6 sm:pt-10 pb-20">
        
        {/* Top Spacer */}
        <div className="pt-2" />

        {/* Center Content Section - Fully Centered for both mobile and desktop */}
        <div key={currentSlide} className="max-w-3xl mx-auto text-center my-auto space-y-6 animate-content">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white leading-[1.15]">
            {activeSlide.title}
          </h1>

          <p className="text-sm sm:text-base text-stone-200 font-normal leading-relaxed max-w-2xl mx-auto">
            {activeSlide.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={activeSlide.buttonLink}
              className="inline-flex items-center justify-center px-7 py-3.5 bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-all shadow-lg rounded-xl active:scale-95 gap-2 group"
            >
              {activeSlide.buttonText}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-all backdrop-blur-md rounded-xl"
            >
              Explore Services
            </Link>
          </div>
        </div>

        {/* Bottom Controls & Community Proof Bar */}
        <div className="space-y-4 mb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5">
            
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2 overflow-hidden">
                <div className="h-8 w-8 rounded-full ring-2 ring-stone-950 bg-amber-500 flex items-center justify-center font-bold text-[10px] text-stone-950">SM</div>
                <div className="h-8 w-8 rounded-full ring-2 ring-stone-950 bg-green-600 flex items-center justify-center font-bold text-[10px] text-white">AO</div>
                <div className="h-8 w-8 rounded-full ring-2 ring-stone-950 bg-amber-300 flex items-center justify-center font-bold text-[10px] text-stone-950">KA</div>
              </div>
              <div className="text-xs text-stone-300">
                <span className="font-bold text-white block">10K+ Beekeepers Trained</span>
                <span className="text-amber-400 font-medium">Join Africa’s leading apiary network</span>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-1.5 w-36 sm:w-48">
                {MACANEY_HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden transition-all"
                    aria-label={`Go to slide ${idx + 1}`}
                  >
                    <div
                      className={`h-full bg-amber-400 transition-all ${
                        idx === currentSlide
                          ? isPlaying
                            ? 'w-full duration-6000 linear'
                            : 'w-full'
                          : 'w-0 duration-300'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all"
                  aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={prevSlide}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Deeply Curved Arch Shape Transition Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-28 bg-stone-50 z-30 pointer-events-none rounded-t-[50%_100%] scale-x-125 translate-y-6 border-0 outline-none ring-0 shadow-none" />
    </section>
  );
}