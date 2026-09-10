'use client';

import React, { useState } from 'react';
import { MessageCircle, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export default function CommunitySection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Block A: WhatsApp Community */}
        <FadeIn delay={0.1} direction="left">
          <div className="bg-emerald-950 text-white border border-emerald-900 rounded-3xl p-8 sm:p-12 flex flex-col justify-between shadow-xl h-full">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-widest">
                <MessageCircle className="w-4 h-4" /> Official Community
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
                Connect with Africa’s Fastest-Growing Beekeeping Network
              </h3>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Get real-time updates, field tips, and direct access to expert guidance inside our official WhatsApp group.
              </p>
            </div>

            <div className="pt-8">
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto px-7 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg gap-2 group"
              >
                Join Our WhatsApp Community
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </FadeIn>

        {/* Block B: Newsletter Subscription */}
        <FadeIn delay={0.3} direction="right">
          <div className="bg-emerald-950 text-white border border-emerald-900 rounded-3xl p-8 sm:p-12 flex flex-col justify-between shadow-xl h-full">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-widest">
                <Mail className="w-4 h-4" /> Stay Informed
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
                Stay Ahead in Agribusiness & AgTech
              </h3>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Receive exclusive industry insights, grant announcements, and early updates on our AI tools delivered straight to your inbox.
              </p>
            </div>

            <div className="pt-8">
              {subscribed ? (
                <div className="flex items-center gap-3 p-4 bg-emerald-900/80 border border-emerald-700 rounded-xl text-emerald-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <p className="text-sm font-medium">Thank you! You have successfully subscribed to our newsletter.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email Address"
                    required
                    className="flex-grow px-4 py-3.5 rounded-xl bg-stone-900 border border-emerald-800 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}