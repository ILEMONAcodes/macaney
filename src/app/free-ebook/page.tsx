'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import { Hero } from '@/components/free-ebook/Hero';

export default function FreeEbookPage() {
  return (
    <main className="min-h-screen bg-stone-50 flex flex-col">
      <Hero />
    </main>
  );
}