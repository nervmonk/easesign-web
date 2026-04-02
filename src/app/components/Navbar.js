"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = ({ lang = 'id', dict = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const redirectedPathName = (locale) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between p-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-12">
          <Link href={`/${lang}`}>
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
              href={`/${lang}`}
              className="text-gray-300 hover:text-white transition-colors text-sm font-semibold"
            >
              {dict?.home || 'Home'}
            </Link>
            <Link
              href={`/${lang}/sign-pdf`}
              className="text-gray-300 hover:text-white transition-colors text-sm font-semibold"
            >
              {dict?.signPdf || 'Sign PDF'}
            </Link>
            <Link
              href={`/${lang}/about`}
              className="text-gray-300 hover:text-white transition-colors text-sm font-semibold"
            >
              {dict?.about || 'About'}
            </Link>
            <Link
              href={`/${lang}/contact-us`}
              className="text-gray-300 hover:text-white transition-colors text-sm font-semibold"
            >
              {dict?.contact || 'Contact Us'}
            </Link>
          </div>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="text-sm font-semibold flex items-center gap-2">
            <Link href={redirectedPathName('id')} className={`transition-all ${lang === 'id' ? 'text-white underline decoration-2 underline-offset-4 decoration-purple-500' : 'text-gray-500 hover:text-gray-300'}`}>ID</Link>
            <span className="text-gray-600">|</span>
            <Link href={redirectedPathName('en')} className={`transition-all ${lang === 'en' ? 'text-white underline decoration-2 underline-offset-4 decoration-purple-500' : 'text-gray-500 hover:text-gray-300'}`}>EN</Link>
          </div>
          <a
            href="https://dev-console.easesign.site"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black hover:bg-gray-200 transition-colors px-4 py-2 rounded-full text-sm font-bold"
          >
            {dict?.consoleLogin || 'Console Login'}
          </a>
        </div>

        {/* Mobile Menu Button + Language Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <div className="text-sm font-semibold flex items-center gap-2">
            <Link href={redirectedPathName('id')} className={`transition-all ${lang === 'id' ? 'text-white underline decoration-2 underline-offset-4 decoration-purple-500' : 'text-gray-500 hover:text-gray-300'}`}>ID</Link>
            <span className="text-gray-600">|</span>
            <Link href={redirectedPathName('en')} className={`transition-all ${lang === 'en' ? 'text-white underline decoration-2 underline-offset-4 decoration-purple-500' : 'text-gray-500 hover:text-gray-300'}`}>EN</Link>
          </div>
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
            href={`/${lang}`}
            className="block text-gray-300 hover:text-white transition-colors font-semibold"
            onClick={() => setIsOpen(false)}
          >
            {dict?.home || 'Home'}
          </Link>
          <Link
            href={`/${lang}/sign-pdf`}
            className="block text-gray-300 hover:text-white transition-colors font-semibold"
            onClick={() => setIsOpen(false)}
          >
            {dict?.signPdf || 'Sign PDF'}
          </Link>
          <Link
            href={`/${lang}/about`}
            className="block text-gray-300 hover:text-white transition-colors font-semibold"
            onClick={() => setIsOpen(false)}
          >
            {dict?.about || 'About'}
          </Link>
          <Link
            href={`/${lang}/contact-us`}
            className="block text-gray-300 hover:text-white transition-colors font-semibold"
            onClick={() => setIsOpen(false)}
          >
            {dict?.contact || 'Contact Us'}
          </Link>
          <div className="pt-4 mt-2 border-t border-white/10 space-y-4">
            <a
              href="https://dev-console.easesign.site"
              target="_blank"
              rel="noopener noreferrer"
              className="block flex items-center justify-center bg-white text-black hover:bg-gray-200 transition-colors px-4 py-2 mt-2 rounded-md text-sm font-bold"
              onClick={() => setIsOpen(false)}
            >
              {dict?.consoleLogin || 'Console Login'}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
