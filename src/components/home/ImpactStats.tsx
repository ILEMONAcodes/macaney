'use client';

import { useEffect, useRef, useState } from 'react';

interface ImpactCounterProps {
  value: number;
  label: string;
}

function ImpactCounter({ value, label }: ImpactCounterProps) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;

    let animationFrame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          setCount(value);
          return;
        }

        const startTime = performance.now();
        const duration = 1600;
        const animate = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(value * easedProgress));
          if (progress < 1) animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  return (
    <div ref={counterRef} className="px-6 py-10 text-center sm:py-14">
      <p className="font-serif text-5xl font-bold tracking-tight text-emerald-950 sm:text-6xl" aria-label={`${value.toLocaleString()}+ ${label}`}>
        <span aria-hidden="true">{count.toLocaleString()}+</span>
      </p>
      <p className="mt-2 text-sm font-medium text-stone-500 sm:text-base">{label}</p>
    </div>
  );
}

export default function ImpactStats() {
  return (
    <section aria-label="Our impact" className="border-y border-stone-200 bg-white px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-stone-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <ImpactCounter value={500} label="Youth Empowered" />
        <ImpactCounter value={2000} label="New Sustainable Hives" />
      </div>
    </section>
  );
}
