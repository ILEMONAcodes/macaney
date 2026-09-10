'use client';

import React from 'react';
import Image from 'next/image';
import { Tv } from 'lucide-react';

interface MediaFeature {
  id: number;
  name: string;
  logoUrl?: string;
}

const MEDIA_FEATURES: MediaFeature[] = [
  { id: 1, name: 'Channels TV', logoUrl: '/images/channels.png' },
  { id: 2, name: 'NTA', logoUrl: '/images/nta.png' },
  { id: 3, name: 'Kaftan TV', logoUrl: '/images/kaftan.png' },
];

export default function MediaTicker() {
  return (
    <div className="relative w-full bg-white text-stone-900 border-b border-stone-200 py-3 overflow-hidden shadow-sm">
      <style jsx>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker-left {
          display: flex;
          width: max-content;
          animation: scrollLeft 25s linear infinite;
        }
        .animate-ticker-left:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative flex items-center overflow-hidden">
        
        {/* Fixed "Featured On" Label */}
        <div className="absolute left-0 z-20 h-full flex items-center pl-6 pr-8 bg-white/95 backdrop-blur-sm border-r border-stone-100 shadow-[4px_0_12px_rgba(0,0,0,0.03)]">
          <span className="font-extrabold text-xs uppercase tracking-widest text-emerald-800">
            Featured On:
          </span>
        </div>

        {/* Scrolling Ticker Track */}
        <div className="animate-ticker-left flex items-center gap-12 whitespace-nowrap pl-40 sm:pl-48">
          {[...MEDIA_FEATURES, ...MEDIA_FEATURES, ...MEDIA_FEATURES].map((item, index) => (
            <div key={`${item.id}-${index}`} className="inline-flex items-center gap-2 px-3">
              {item.logoUrl ? (
                <div className="relative h-8 w-16 shrink-0 flex items-center justify-center opacity-95 hover:opacity-100 transition-opacity">
                  <Image 
                    src={item.logoUrl} 
                    alt={item.name} 
                    fill 
                    className="object-contain object-center" 
                  />
                </div>
              ) : (
                <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                  <Tv className="w-4 h-4" />
                </div>
              )}
              <span className="text-stone-800 font-bold text-sm tracking-wide uppercase">
                {item.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}