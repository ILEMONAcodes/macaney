'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-stone-100 py-16 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Brand & Tagline with Logo Reference */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white/10 p-1 flex items-center justify-center border border-emerald-800">
                <Image 
                  src="/images/logo.png" 
                  alt="Macaney Logo" 
                  fill
                  className="object-contain p-1"
                />
              </div>
              <span className="font-serif font-bold text-xl tracking-tight text-white">
                Macaney Sustainable Solutions
              </span>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed max-w-sm">
              The Home of Successful Beekeeping in Africa. Empowering commercial apiaries through advanced AI technology and sustainable practices.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-2 text-sm text-stone-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link href="/free-ebook" className="hover:text-white transition-colors">Free Guide</Link>
              </li>
              <li>
                <Link href="/manual" className="hover:text-white transition-colors">The Manual</Link>
              </li>
              <li>
                <Link href="/ai-app" className="hover:text-white transition-colors">AI App</Link>
              </li>
              <li>
                <Link href="/commercial-setup" className="hover:text-white transition-colors">Commercial Setup</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Contact Info</h4>
            <div className="text-sm text-stone-300 space-y-1.5">
              <p className="font-medium text-white">Get in Touch</p>
              <p>Email: info@macaneysolutions.com</p>
              <p>WhatsApp: +234 (0) 800 000 0000</p>
            </div>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="pt-8 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© 2026 Macaney Sustainable Solutions. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-stone-200 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-stone-200 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}