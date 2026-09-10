'use client';

import React from 'react';
import { 
  Bug, 
  Cpu, 
  Sprout, 
  PhoneCall, 
  Globe, 
  Boxes 
} from 'lucide-react';

interface TickerItem {
  id: number;
  title: string;
  icon: React.ReactNode;
}

const TICKER_ITEMS: TickerItem[] = [
  { id: 1, title: 'Sustainable Apiculture Advocacy', icon: <Sprout className="w-6 h-6 text-white" /> },
  { id: 2, title: 'Smart AI Hive Solutions', icon: <Cpu className="w-6 h-6 text-white" /> },
  { id: 3, title: 'Commercial Apiary Setup', icon: <Boxes className="w-6 h-6 text-white" /> },
  { id: 4, title: 'Bee Farm & Honey Production', icon: <Bug className="w-6 h-6 text-white" /> },
  { id: 5, title: 'Expert Customer Services', icon: <PhoneCall className="w-6 h-6 text-white" /> },
  { id: 6, title: 'Global Apiculture Network', icon: <Globe className="w-6 h-6 text-white" /> },
];

export default function ServiceTicker() {
  return (
    <div className="relative w-full bg-emerald-900 border-y border-emerald-800 py-5 overflow-hidden shadow-sm text-white">
      <style jsx>{`
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-ticker {
          display: flex;
          width: max-content;
          animation: scrollRight 25s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="animate-ticker flex items-center gap-12 whitespace-nowrap">
        {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
          <div key={`${item.id}-${index}`} className="flex items-center gap-3 px-4">
            <div className="shrink-0 flex items-center justify-center">
              {item.icon}
            </div>
            <span className="text-stone-100 font-semibold text-base sm:text-lg tracking-wide">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}