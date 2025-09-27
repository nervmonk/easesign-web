"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-6">
        {/* Logo */}
        <div>
          <Link href="/">
            <Image
              src="/easesign-logo.png"
              alt="EaseSign Logo"
              width={150}
              height={40}
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-gray-600 hover:text-cyan-500 transition-colors"
          >
            HOME
          </Link>
          <Link
            href="/about"
            className="text-gray-600 hover:text-cyan-500 transition-colors"
          >
            ABOUT
          </Link>
          <Link
            href="/contact-us"
            className="text-gray-600 hover:text-cyan-500 transition-colors"
          >
            CONTACT US
          </Link>
          {/* Search Icon */}
          <button className="text-gray-600 hover:text-cyan-500 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-cyan-500 focus:outline-none"
          >
            {isOpen ? (
              // X icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Burger icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 pb-4 space-y-4">
          <Link
            href="/"
            className="block text-gray-600 hover:text-cyan-500 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            HOME
          </Link>
          <Link
            href="/about"
            className="block text-gray-600 hover:text-cyan-500 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            ABOUT
          </Link>
          <Link
            href="/contact-us"
            className="block text-gray-600 hover:text-cyan-500 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            CONTACT US
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
