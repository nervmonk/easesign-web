"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top Notification Bar like JetBrains */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-medium py-3 px-4 text-center flex justify-center items-center gap-4 relative">
        <span className="hidden sm:inline">Upcoming Livestream: <span className="font-bold">Scaling AI Without Losing Control</span></span>
        <span className="sm:hidden font-bold">Scaling AI Livestream</span>
        <span className="text-white/80 hidden md:inline ml-2 text-xs">Tuesday, April 7, 2026 22.00 - 22.45 local time</span>
        <button className="font-bold hover:underline ml-4">Register</button>
        <button className="absolute right-4 text-white/80 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav className="bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between p-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-12">
          <Link href="/">
            <Image
              src="/easesign-logo.png"
              alt="EaseSign Logo"
              width={140}
              height={36}
              priority
              className="brightness-0 invert"
            />
          </Link>

          {/* Desktop Navigation moved to left next to logo */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors text-sm font-semibold"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-white transition-colors text-sm font-semibold"
            >
              About
            </Link>
            <Link
              href="/products"
              className="text-gray-300 hover:text-white transition-colors text-sm font-semibold"
            >
              Products
            </Link>
            <Link
              href="/contact-us"
              className="text-gray-300 hover:text-white transition-colors text-sm font-semibold"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center space-x-6">
          <button className="text-gray-300 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="text-gray-300 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </button>
          <button className="text-gray-300 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
           <button className="text-gray-300 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
           </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#0d0d1a] border-b border-white/10 shadow-lg px-6 pb-6 pt-4 space-y-5">
          <Link
            href="/"
            className="block text-gray-300 hover:text-white transition-colors font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block text-gray-300 hover:text-white transition-colors font-semibold"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            href="/products"
            className="block text-gray-300 hover:text-white transition-colors font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Products
          </Link>
          <Link
            href="/contact-us"
            className="block text-gray-300 hover:text-white transition-colors font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
