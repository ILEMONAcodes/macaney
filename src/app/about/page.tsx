import React from 'react';
import MacaneyHeroSlider from '@/components/layout/Hero';
import ServiceTicker from '@/components/layout/ServiceTicker';
import MediaTicker from '@/components/layout/MediaTicker';
import LeadershipCard from '@/components/home/LeadershipCard';
import TestimonialsSlider from '@/components/home/TestimonialsSlider';
import CommunitySection from '@/components/home/CommunitySection';
import FadeIn from '@/components/animations/FadeIn';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-50 overflow-hidden">
      {/* 1. Hero Slideshow (Loads instantly) */}
      <MacaneyHeroSlider />

      {/* 2. Rolling Ticker - Services & Tech */}
      <FadeIn delay={0.1}>
        <ServiceTicker />
      </FadeIn>

      {/* 3. Rolling Ticker - Media Features */}
      <FadeIn delay={0.1}>
        <MediaTicker />
      </FadeIn>

      {/* 4. CEO & Minister Leadership Sliding Card */}
      <FadeIn delay={0.2} direction="up">
        <LeadershipCard />
      </FadeIn>

      {/* 5. Testimonials & Social Proof Section */}
      <FadeIn delay={0.2} direction="up">
        <TestimonialsSlider />
      </FadeIn>

      {/* 6. Community & Newsletter Capture Section */}
      <FadeIn delay={0.2} direction="up">
        <CommunitySection />
      </FadeIn>
    </main>
  );
}