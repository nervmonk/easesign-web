"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const CheckIcon = () => (
  <svg className="h-5 w-5 text-cyan-400 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const Hero = ({ lang = 'id', dict = {}, valuePropsDict = {} }) => {
  const features = [
    valuePropsDict.feature1 || 'Legal Comply',
    valuePropsDict.feature2 || 'Geographic Dispersion',
    valuePropsDict.feature3 || 'Security & Authentication',
    valuePropsDict.feature4 || 'Environmental Sustainability',
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section className="relative px-4 py-16 md:py-24 overflow-hidden">
      {/* Glow Effects in the background */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto max-w-[1200px]">
        {/* The Glass/Glow Card */}
        <div className="relative rounded-3xl border border-indigo-500/30 bg-[#0d0c1e] shadow-[0_0_80px_-20px_rgba(124,58,237,0.25)] p-8 md:p-16 lg:p-20 overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12">

          {/* Side Tab (JetBrains Style) */}
          <div className="hidden sm:block absolute top-20 -left-[2px] bg-gradient-to-b from-purple-500 to-indigo-500 text-white text-xs font-bold px-4 py-1.5 -rotate-90 origin-bottom-left rounded-t-md tracking-wider">
            {dict?.badge || 'EaseSign'}
          </div>

          {/* Text Column */}
          <div className="w-full md:w-3/5 text-center md:text-left z-10 flex flex-col">
            {/* Title — always first */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-6 order-1">
              {dict?.title || 'Secure Documents. Signed and Sealed in Seconds'}
            </h1>

            {/* Image — shown between title and subtitle on mobile only */}
            <div className="order-2 md:hidden w-full relative mb-6">
              <div className="relative w-full aspect-square max-w-[280px] mx-auto">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-tr from-purple-600/20 to-indigo-400/20 rounded-full blur-[40px]"></div>
                <Image
                  src="/hero.png"
                  alt="Digital signature illustration"
                  fill
                  className="object-contain drop-shadow-2xl brightness-110 contrast-125"
                />
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-gray-400 text-lg max-w-lg mx-auto md:mx-0 mb-8 leading-relaxed font-light order-3">
              {dict?.subtitle || 'Use it via the EaseSign portal, or connect your API key for seamless system integration, all in one unified experience.'}
            </p>

            {/* Value Props Carousel */}
            <div className="mb-10 order-4">
              <div className="relative h-8 overflow-hidden">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 flex items-center justify-center md:justify-start gap-2.5 transition-all duration-500 ease-in-out ${
                      index === activeIndex
                        ? 'opacity-100 translate-y-0'
                        : index === (activeIndex - 1 + features.length) % features.length
                        ? 'opacity-0 -translate-y-6'
                        : 'opacity-0 translate-y-6'
                    }`}
                  >
                    <CheckIcon />
                    <span className="text-base text-white/80 font-medium tracking-wide">{feature}</span>
                  </div>
                ))}
              </div>
              {/* Carousel dots */}
              <div className="flex items-center justify-center md:justify-start gap-1.5 mt-4">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? 'w-6 h-1.5 bg-cyan-400'
                        : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to feature ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="order-5">
              <Link href={`/${lang}/sign-pdf`}>
                <button className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors shadow-lg shadow-white/10 hover:shadow-white/20">
                  {dict?.ctaPrimary || 'Try now'}
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column (Image/Decoration) — desktop only */}
          <div className="hidden md:block w-full md:w-2/5 z-10 relative">
            <div className="relative w-full aspect-square max-w-[400px] mx-auto">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-purple-600/20 to-indigo-400/20 rounded-full blur-[40px]"></div>
              <Image
                src="/hero.png"
                alt="Digital signature illustration"
                fill
                className="object-contain drop-shadow-2xl brightness-110 contrast-125"
              />
            </div>
          </div>

          {/* Abstract subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik00MCAwaC0xdjQwaDFWMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMSkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgo8cGF0aCBkPSJNMCA0MGgxVjBoLTF2NDB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDEpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPHBhdGggZD0iTTAgMGg0MHYxaC00MFYweightIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDEpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPC9zdmc+')] opacity-50 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
