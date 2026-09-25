import React from 'react';
import MacaneyHeroSlider from '@/components/layout/Hero';
import ServiceTicker from '@/components/layout/ServiceTicker';
import MediaTicker from '@/components/layout/MediaTicker';
import LeadershipCard from '@/components/home/LeadershipCard';
import TestimonialsSlider from '@/components/home/TestimonialsSlider';
import ImpactStats from '@/components/home/ImpactStats';
import CommunitySection from '@/components/home/CommunitySection';

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

      {/* 6. Impact numbers */}
      <ImpactStats />

      {/* 7. Community & Newsletter Capture Section */}
      <CommunitySection />
    </main>
  );
}
