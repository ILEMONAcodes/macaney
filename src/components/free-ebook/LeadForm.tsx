'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { siteConfig } from '@/config/site';

function LeadFormInner() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    fullName: '',
    country: '',
    state: '',
    email: '',
    whatsapp: '',
    hives: '0',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasJoinedWhatsApp, setHasJoinedWhatsApp] = useState(false);

  // UTM tracking state capture for attribution reporting
  const [utmData, setUtmData] = useState({
    source: 'direct',
    medium: 'none',
    campaign: 'none',
  });

  // Extract marketing UTM tags when the component initializes on the client
  useEffect(() => {
    if (searchParams) {
      setUtmData({
        source: searchParams.get('utm_source') || 'direct',
        medium: searchParams.get('utm_medium') || 'none',
        campaign: searchParams.get('utm_campaign') || 'none',
      });
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.fullName,
          country: formData.country,
          state: formData.state,
          email: formData.email,
          phone_number: formData.whatsapp,
          hives_count: formData.hives,
          source: utmData.source,
          medium: utmData.medium,
          campaign: utmData.campaign,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form. Please check your details.');
      }

      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  const handleWhatsAppClick = () => {
    window.open(siteConfig.links.whatsappGroup, '_blank');
    setHasJoinedWhatsApp(true);
  };

  // Render success state view with sequential gating (WhatsApp first, then PDF unlock)
  if (status === 'success') {
    return (
      <div className="bg-white border-2 border-honey-200 rounded-3xl p-8 sm:p-12 shadow-xl text-center">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
          You're in!
        </h3>

        {!hasJoinedWhatsApp ? (
          <>
            <p className="text-stone-700 mb-8 max-w-md mx-auto text-base">
              Your details have been received. Join our WhatsApp community below to get your free beekeeping guide and connect with fellow apiary owners.
            </p>
            <div className="space-y-4">
              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="w-full inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all text-base cursor-pointer"
              >
                <span>JOIN WHATSAPP GROUP</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-emerald-700 font-medium mb-6 text-sm bg-emerald-50 p-3 rounded-lg border border-emerald-200">
              ✓ You can now download your guide below.
            </p>
            <div className="space-y-4">
              <a
                href={siteConfig.links.whatsappGroup}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all text-base cursor-pointer"
              >
                <span>JOIN WHATSAPP GROUP</span>
              </a>
              <a
                href={siteConfig.links.ebookDownload}
                download
                className="w-full inline-flex items-center justify-center gap-2 bg-honey-100 hover:bg-honey-200 text-stone-900 font-semibold py-3 px-8 rounded-xl transition-all text-sm cursor-pointer"
              >
                <span>Download PDF Direct Link</span>
              </a>
            </div>
          </>
        )}
      </div>
    );
  }

  // Render default input form with mobile-first layout and accessible labeling
  return (
    <div id="lead-form" className="bg-white border-2 border-amber-200 rounded-3xl p-6 sm:p-10 shadow-xl relative">
      <div className="text-center mb-6">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
          Get Your Free Guide
        </h3>
        <p className="text-stone-600 text-sm">
          Enter your details to join our WhatsApp group and get your free beekeeping guide.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            required
            placeholder="Example: Sarah Johnson"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white text-stone-900 text-sm transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="country" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              Country
            </label>
            <input
              type="text"
              id="country"
              required
              placeholder="Example: Nigeria"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white text-stone-900 text-sm transition-all"
            />
          </div>

          <div>
            <label htmlFor="state" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
              State
            </label>
            <input
              type="text"
              id="state"
              required
              placeholder="Example: Lagos"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white text-stone-900 text-sm transition-all"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder="Example: sarah.j@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white text-stone-900 text-sm transition-all"
          />
        </div>

        <div>
          <label htmlFor="whatsapp" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
            WhatsApp Number
          </label>
          <input
            type="tel"
            id="whatsapp"
            required
            placeholder="+234 800 000 0000"
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white text-stone-900 text-sm transition-all"
          />
        </div>

        <div>
          <label htmlFor="hives" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
            How many hives do you have?
          </label>
          <select
            id="hives"
            value={formData.hives}
            onChange={(e) => setFormData({ ...formData, hives: e.target.value })}
            className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white text-stone-900 text-sm transition-all cursor-pointer"
          >
            <option value="0">0</option>
            <option value="5+">5+</option>
            <option value="10+">10+</option>
            <option value="20+">20+</option>
            <option value="50+">50+</option>
            <option value="100+">100+</option>
          </select>
        </div>

        {status === 'error' && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-4 px-6 bg-green-700 hover:bg-green-800 disabled:bg-green-300 text-white font-extrabold rounded-xl shadow-lg shadow-green-500/20 transition-all flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
        >
          {status === 'loading' ? (
            <span>Submitting...</span>
          ) : (
            <span>Join WhatsApp Group To Get E-Book</span>
          )}
        </button>
      </form>
    </div>
  );
}

export function LeadForm() {
  return (
    <Suspense fallback={<div className="animate-pulse h-96 bg-stone-100 rounded-2xl" />}>
      <LeadFormInner />
    </Suspense>
  );
}
