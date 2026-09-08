'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs text-stone-900 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand Logo - Kept large, overflowing slightly or snug inside a compact 16-20 height navbar */}
        <Link href="/" className="flex items-center group py-1">
          <div className="h-12 sm:h-16 w-auto relative flex items-center justify-center">
            <Image
              src="/images/logo2.png"
              alt="Macaney Logo"
              width={300}
              height={120}
              className="object-contain h-14 sm:h-20 w-auto"
              style={{ maxHeight: 'none' }}
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
          <Link
            href="/"
            className="text-stone-700 hover:text-amber-600 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-stone-700 hover:text-amber-600 transition-colors"
          >
            About
          </Link>
          <Link
            href="/services"
            className="text-stone-700 hover:text-amber-600 transition-colors"
          >
            Services
          </Link>
          <Link
            href="/ai-beekeeper"
            className="text-stone-700 hover:text-amber-600 transition-colors"
          >
            AI Beekeeper
          </Link>
          <Link
            href="/contact"
            className="text-stone-700 hover:text-amber-600 transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Action Button */}
        <div className="hidden lg:flex items-center">
          <Link
            href="/free-ebook"
            className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-2 px-4 rounded-xl shadow-sm transition-all text-sm active:scale-95"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 text-stone-800 hover:text-amber-600 transition-colors focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-3 shadow-xl text-stone-900">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-800 font-medium hover:text-amber-600 border-b border-stone-100"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-800 font-medium hover:text-amber-600 border-b border-stone-100"
          >
            About
          </Link>
          <Link
            href="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-800 font-medium hover:text-amber-600 border-b border-stone-100"
          >
            Services
          </Link>
          <Link
            href="/ai-beekeeper"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-800 font-medium hover:text-amber-600 border-b border-stone-100"
          >
            AI Beekeeper
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-800 font-medium hover:text-amber-600 border-b border-stone-100"
          >
            Contact
          </Link>
          <div className="pt-2">
            <Link
              href="/free-ebook"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-2.5 rounded-xl shadow-sm text-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}