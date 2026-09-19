'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-stone-200 bg-white/95 text-stone-900 shadow-xs backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand Logo - Kept large, overflowing slightly or snug inside a compact 16-20 height navbar */}
        <Link href="/" className="flex min-w-0 items-center py-1" onClick={() => setMobileMenuOpen(false)}>
          <div className="relative flex h-12 w-[156px] items-center justify-center sm:h-16 sm:w-[210px]">
            <Image
              src="/images/logo2.png"
              alt="Macaney Logo"
              width={300}
              height={120}
              className="size-full object-contain"
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
            href="/store"
            className="text-stone-700 hover:text-emerald-600 transition-colors"
          >
            Store
          </Link>
          <Link
            href="/blog"
            className="text-stone-700 hover:text-emerald-600 transition-colors"
          >
            Blog
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
          className="flex size-11 items-center justify-center rounded-xl text-stone-800 transition-colors hover:bg-amber-50 hover:text-amber-600 focus:outline-none lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="animate-[menu-reveal_220ms_cubic-bezier(0.16,1,0.3,1)] border-t border-stone-100 bg-white px-4 pb-6 pt-2 text-stone-900 shadow-xl lg:hidden">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block border-b border-stone-100 py-3 font-medium text-stone-800 transition-colors hover:text-amber-600"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block border-b border-stone-100 py-3 font-medium text-stone-800 transition-colors hover:text-amber-600"
          >
            About
          </Link>
          <Link
            href="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="block border-b border-stone-100 py-3 font-medium text-stone-800 transition-colors hover:text-amber-600"
          >
            Services
          </Link>
          <Link
            href="/store"
            onClick={() => setMobileMenuOpen(false)}
            className="block border-b border-stone-100 py-3 font-medium text-stone-800 transition-colors hover:text-emerald-600"
          >
            Store
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block border-b border-stone-100 py-3 font-medium text-stone-800 transition-colors hover:text-emerald-600"
          >
            Blog
          </Link>
          <Link
            href="/ai-beekeeper"
            onClick={() => setMobileMenuOpen(false)}
            className="block border-b border-stone-100 py-3 font-medium text-stone-800 transition-colors hover:text-amber-600"
          >
            AI Beekeeper
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block border-b border-stone-100 py-3 font-medium text-stone-800 transition-colors hover:text-amber-600"
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
