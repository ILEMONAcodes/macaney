'use client';

import React, { useState } from 'react';
import { MessageCircle, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export default function CommunitySection() {
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [consent, setConsent] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !whatsapp || !consent) return;
    setSubscribed(true);
    setEmail('');
    setWhatsapp('');
    setConsent(false);
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
                Stay Ahead of Modern Apiculture
              </h3>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Receive expert beekeeping insights, grant opportunities, industry updates, and early access to AI-powered hive management tools.
              </p>
            </div>

            <div className="pt-8">
              {subscribed ? (
                <div className="flex items-center gap-3 p-4 bg-emerald-900/80 border border-emerald-700 rounded-xl text-emerald-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <p className="text-sm font-medium">Thank you! You’ll receive beekeeping updates and opportunities by email and WhatsApp.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    aria-label="Email address"
                    required
                    className="flex-grow px-4 py-3.5 rounded-xl bg-stone-900 border border-emerald-800 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="Enter your WhatsApp number"
                    aria-label="WhatsApp phone number"
                    required
                    className="flex-grow px-4 py-3.5 rounded-xl bg-stone-900 border border-emerald-800 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                  <label className="flex items-start gap-2 text-xs leading-relaxed text-stone-300 sm:col-span-2">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      required
                      className="mt-0.5 size-4 shrink-0 accent-emerald-500"
                    />
                    <span>I agree to receive beekeeping updates and opportunities via WhatsApp and email.</span>
                  </label>
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shrink-0 sm:col-span-2 sm:justify-self-end"
                  >
                    Get Updates
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
