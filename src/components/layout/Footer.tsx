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
                  sizes="40px"
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
                <Link href="/ai-beekeeper" className="hover:text-white transition-colors">AI App</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Contact Info</h4>
            <div className="text-sm text-stone-300 space-y-1.5">
              <p className="font-medium text-white">Get in Touch</p>
              <p>Email: chiamaka@macaneysolutions.com</p>
              <p>WhatsApp: 08101126434</p>
            </div>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="pt-8 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-5">
          <p>© 2026 Macaney Sustainable Solutions. All Rights Reserved.</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Connect With Us</h4>
            <nav aria-label="Social media" className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/chiamaka_precious_orji?stkn=djRramdocmg5MjFu&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className="group flex size-10 items-center justify-center overflow-hidden rounded-full border border-stone-400/20 bg-white/5 transition-colors hover:border-emerald-500/40 hover:bg-emerald-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <Image src="/images/instagram.jpeg" alt="" width={40} height={40} className="size-full rounded-full object-cover" />
              </a>
              <a
                href="https://www.linkedin.com/in/orji-chiamaka-precious-691b771b9?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="group flex size-10 items-center justify-center overflow-hidden rounded-full border border-stone-400/20 bg-white/5 transition-colors hover:border-emerald-500/40 hover:bg-emerald-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <Image src="/images/linkedin.png" alt="" width={40} height={40} className="size-full rounded-full object-cover" />
              </a>
              <a
                href="https://www.facebook.com/share/1Fi97P7hoE/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
                className="group flex size-10 items-center justify-center overflow-hidden rounded-full border border-stone-400/20 bg-white/5 transition-colors hover:border-emerald-500/40 hover:bg-emerald-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <Image src="/images/facebook.png" alt="" width={40} height={40} className="size-full rounded-full object-cover" />
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-stone-200 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-stone-200 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
