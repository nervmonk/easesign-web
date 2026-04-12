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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden py-20 md:py-0">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik00MCAwaC0xdjQwaDFWMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMSkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgo8cGF0aCBkPSJNMCA0MGgxVjBoLTF2NDB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDEpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPHBhdGggZD0iTTAgMGg0MHYxaC00MFYweightIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDEpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPC9zdmc+')] opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

          {/* Text Column */}
          <div className="w-full md:w-3/5 text-center md:text-left flex flex-col">

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-8 order-1">
              {dict?.title || 'Secure Documents. Signed and Sealed in Seconds'}
            </h1>

            {/* Image — mobile only */}
            <div className="order-2 md:hidden w-full relative mb-10">
              <div className="relative w-full aspect-square max-w-[320px] mx-auto">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-gradient-to-tr from-purple-600/30 to-indigo-400/30 rounded-full blur-[50px]"></div>
                <Image
                  src="/hero.png"
                  alt="Digital signature illustration"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto md:mx-0 mb-10 leading-relaxed font-light order-3">
              {dict?.subtitle || 'Use it via the EaseSign portal, or connect your API key for seamless system integration, all in one unified experience.'}
            </p>

            {/* Value Props Carousel */}
            <div className="mb-12 order-4">
              <div className="relative h-10 overflow-hidden">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 flex items-center justify-center md:justify-start gap-3 transition-all duration-700 ease-in-out ${index === activeIndex
                      ? 'opacity-100 translate-y-0'
                      : index === (activeIndex - 1 + features.length) % features.length
                        ? 'opacity-0 -translate-y-8'
                        : 'opacity-0 translate-y-8'
                      }`}
                  >
                    <CheckIcon />
                    <span className="text-lg text-white/90 font-medium tracking-wide">{feature}</span>
                  </div>
                ))}
              </div>
              {/* Carousel dots */}
              <div className="flex items-center justify-center md:justify-start gap-2 mt-4">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`rounded-full transition-all duration-300 ${index === activeIndex
                      ? 'w-8 h-1.5 bg-cyan-400'
                      : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                      }`}
                    aria-label={`Go to feature ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="order-5">
              <Link href={`/${lang}/sign-pdf`}>
                <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 px-10 rounded-full hover:scale-105 transition-all shadow-xl shadow-cyan-500/20 active:scale-95">
                  {dict?.ctaPrimary || 'Try now'}
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column (Image) — desktop only */}
          <div className="hidden md:block w-full md:w-2/5 relative">
            <div className="relative w-full aspect-square max-w-[500px] ml-auto">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-purple-600/30 to-indigo-400/30 rounded-full blur-[60px]"></div>
              <Image
                src="/hero.png"
                alt="Digital signature illustration"
                fill
                className="object-contain drop-shadow-[0_0_50px_rgba(124,58,237,0.3)] brightness-110"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
