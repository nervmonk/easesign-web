"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  Search,
  BarChart3,
  CreditCard,
  Monitor,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const ConsoleSection = ({ lang = 'id', dict = {} }) => {
  const [activeTab, setActiveTab] = useState(0);

  const features = dict.features || [
    { title: "Dashboard", desc: "Overview of your document activities.", image: "/dashboard-light.jpeg" },
    { title: "Tracking", desc: "Real-time document signing status.", image: "/document-sign-tracking.jpeg" },
    { title: "Transactions", desc: "Detailed expense reports.", image: "/transaction-details.jpeg" },
    { title: "Payments", desc: "Support for major providers.", image: "/easy-payment.jpeg" },
  ];

  const icons = [
    <LayoutDashboard key="0" className="w-6 h-6" />,
    <Search key="1" className="w-6 h-6" />,
    <BarChart3 key="2" className="w-6 h-6" />,
    <CreditCard key="3" className="w-6 h-6" />,
  ];

  const handlePrev = () => {
    setActiveTab((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveTab((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-24 relative px-4 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto max-w-[1200px]">
        {/* Header - Centered for both views */}
        <div className="text-center mb-16 z-10 relative">
          <div className="mb-6">
            <span className="inline-block bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold px-4 py-1.5 rounded-full tracking-[0.2em] uppercase">
              {dict.badge || 'EASESIGN CONSOLE'}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-[1.2] max-w-3xl mx-auto">
            {dict.title || 'Sophisticated Management at Your Fingertips'}
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed font-light max-w-2xl mx-auto">
            {dict.subtitle || 'Experience how easy it is to manage, track, and pay for your digital document needs with our all-in-one console.'}
          </p>
        </div>

        {/* --- DESKTOP VIEW --- */}
        <div className="hidden lg:flex flex-row items-center gap-24">
          {/* Left Column: Tabs */}
          <div className="w-1/2 z-10">
            <div className="flex flex-col gap-4">
              {features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 text-left cursor-pointer ${activeTab === index
                      ? 'bg-indigo-500/10 border-indigo-500/40 shadow-[0_0_20px_rgba(99,102,241,0.1)]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                >
                  <div className={`mt-1 transition-colors duration-300 ${activeTab === index ? 'text-cyan-400' : 'text-gray-500'}`}>
                    {icons[index] || <Monitor className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg mb-1 transition-colors duration-300 ${activeTab === index ? 'text-white' : 'text-gray-400'}`}>
                      {feature.title}
                    </h3>
                    <p className={`text-sm leading-relaxed transition-colors duration-300 ${activeTab === index ? 'text-gray-300' : 'text-gray-500'}`}>
                      {feature.desc}
                    </p>
                  </div>
                  {activeTab === index && (
                    <div className="ml-auto">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 animate-pulse" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-12">
              <Link href="https://dev-console.easesign.site">
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 px-10 rounded-full transition-all shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 transform hover:-translate-y-1">
                  {dict.cta || 'Mulai Sekarang'}
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column: Interaction Mockup */}
          <div className="w-1/2 relative group">
            <div className="relative z-10 rounded-2xl border border-white/10 bg-[#0d0c1e]/80 backdrop-blur-xl shadow-2xl p-3 overflow-hidden transition-all duration-700">
              {/* Browser Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#12112a]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                </div>
                <div className="text-[10px] text-gray-500 font-mono tracking-widest uppercase opacity-50">EaseSign Console Preview</div>
              </div>

              {/* Image Showcase */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-b-xl bg-[#0a0a0f]">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${activeTab === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                      }`}
                  >
                    <Image src={feature.image} alt={feature.title} fill className="object-cover" priority={index === 0} />
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-purple-500/10 pointer-events-none"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-full h-full bg-indigo-600/10 rounded-2xl -z-10 blur-3xl transform rotate-3"></div>
            <div className="absolute -bottom-10 -left-10 w-full h-full bg-purple-600/10 rounded-2xl -z-10 blur-3xl transform -rotate-3"></div>
          </div>
        </div>

        {/* --- MOBILE VIEW: CAROUSEL --- */}
        <div className="lg:hidden z-10 relative">
          <div className="flex flex-col items-center">
            {/* Carousel Mockup Image */}
            <div className="w-full relative px-4 mb-8">
              <div className="relative rounded-xl border border-white/10 bg-[#0d0c1e]/80 backdrop-blur-xl shadow-2xl overflow-hidden aspect-[16/10]">
                {/* Browser Bar (Mobile) */}
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5 bg-[#12112a]">
                  <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500/50"></div>
                </div>

                {/* Images */}
                <div className="relative h-full">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-500 ease-in-out ${activeTab === index ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'
                        }`}
                    >
                      <Image src={feature.image} alt={feature.title} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature Caption (Active Slide) */}
            <div className="text-center px-4 mb-8 w-full min-h-[140px]">
              <div className="flex justify-center mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-cyan-400">
                  {icons[activeTab]}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {features[activeTab].title}
              </h3>
              <p className="text-gray-400 leading-relaxed font-light">
                {features[activeTab].desc}
              </p>
            </div>

            {/* Modern Navigation Pill */}
            <div className="inline-flex items-center gap-6 p-2 rounded-full bg-[#12112a]/80 border border-white/10 backdrop-blur-xl mb-12 shadow-2xl shadow-indigo-900/20">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white text-gray-400 transition-all border border-transparent hover:border-white/10 shadow-sm active:scale-95"
                aria-label="Previous feature"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex gap-2.5 items-center">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`transition-all duration-300 rounded-full ${activeTab === index
                        ? 'w-6 h-1.5 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]'
                        : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-all border border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.4)] active:scale-95"
                aria-label="Next feature"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <Link href="https://dev-console.easesign.site" className="w-full max-w-xs">
              <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-full shadow-xl">
                {dict.cta || 'Mulai Sekarang'}
              </button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ConsoleSection;
