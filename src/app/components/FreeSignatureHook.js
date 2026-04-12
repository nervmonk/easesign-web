"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PenTool, ArrowRight, Zap, ShieldCheck, FileCheck2 } from "lucide-react";

const FreeSignatureHook = ({ lang = 'id', dict = {} }) => {
  return (
    <section className="py-16 md:py-20 relative px-4 overflow-hidden z-20">
      {/* Container */}
      <div className="container mx-auto max-w-[1200px]">
        
        {/* Glow Effects Specific to this Banner */}
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-emerald-500/10 rounded-[100px] blur-[100px] pointer-events-none"></div>

        {/* The Glass Banner Card */}
        <div className="relative rounded-3xl border border-emerald-500/30 bg-[#0d0c1e]/80 backdrop-blur-xl shadow-[0_0_80px_-20px_rgba(16,185,129,0.2)] p-8 md:p-12 lg:p-16 overflow-hidden">
          
          {/* Subtle geometric pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik00MCAwaC0xdjQwaDFWMHoiIGZpbGw9InJnYmEoMTYsMTg1LDEyOSwwLjAyKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+CjxwYXRoIGQ9Ik0wIDQwaDFWMGgtMXY0MHoiIGZpbGw9InJnYmEoMTYsMTg1LDEyOSwwLjAyKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+CjxwYXRoIGQ9Ik0wIDBoNDB2MWgtNDBWMHoiIGZpbGw9InJnYmEoMTYsMTg1LDEyOSwwLjAyKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+Cjwvc3ZnPg==')] opacity-50 pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 relative z-10">
            
            {/* Left Column: Text & CTA */}
            <div className="w-full lg:w-3/5 text-center lg:text-left">
              <div className="mb-6 flex justify-center lg:justify-start items-center gap-3">
                <span className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-4 py-1.5 rounded-full tracking-[0.2em] uppercase">
                  <Zap size={14} className="fill-emerald-400 text-emerald-400" />
                  {dict.badge || '100% FREE UTILITY'}
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.2]">
                {dict.title || 'Need to quickly sign a PDF?'}
              </h2>
              
              <p className="text-gray-400 text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed font-light">
                {dict.subtitle || 'No sign-up. No credit card. Just upload your document, securely drop your signature, and download it instantly.'}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link href={`/${lang}/sign-pdf`}>
                  <button className="group flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-gray-900 font-bold py-4 px-10 rounded-full transition-all shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 transform hover:-translate-y-1 w-full sm:w-auto">
                    <PenTool size={20} />
                    {dict.cta || 'Sign a PDF for Free'}
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                
                <div className="text-sm text-gray-500 flex items-center gap-2 mt-4 sm:mt-0">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  <span>100% Private & Localized</span>
                </div>
              </div>
            </div>

            {/* Right Column: Mini Mockup / Visual */}
            <div className="w-full lg:w-2/5 relative hidden md:block">
              <div className="relative w-full aspect-[4/3] max-w-[400px] mx-auto group">
                
                {/* Back Decoration Paper */}
                <div className="absolute inset-0 bg-white/5 rounded-2xl border border-white/10 transform rotate-6 translate-x-4 translate-y-4 group-hover:rotate-12 group-hover:translate-x-6 group-hover:translate-y-6 transition-all duration-500"></div>
                
                {/* Main Paper Mockup */}
                <div className="absolute inset-0 bg-[#f8f9fa] rounded-2xl shadow-2xl p-6 flex flex-col justify-between transform -rotate-3 group-hover:rotate-0 transition-all duration-500 border border-gray-200">
                  
                  {/* Fake Document Content */}
                  <div className="space-y-4 w-full">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div className="w-24 h-4 bg-gray-300 rounded-sm"></div>
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-sm"></div>
                    <div className="w-5/6 h-3 bg-gray-200 rounded-sm"></div>
                    <div className="w-4/6 h-3 bg-gray-200 rounded-sm"></div>
                    
                    <div className="pt-6 space-y-3">
                      <div className="w-full h-3 bg-gray-200 rounded-sm"></div>
                      <div className="w-3/4 h-3 bg-gray-200 rounded-sm"></div>
                    </div>
                  </div>

                  {/* The Highlighted "Signature" Area */}
                  <div className="mt-8 self-end w-48 h-24 border border-emerald-400/30 bg-emerald-50 rounded-xl flex items-center justify-center relative overflow-hidden group/sig">
                    
                    {/* Subtle pulse */}
                    <div className="absolute inset-0 bg-emerald-400/10 scale-95 group-hover/sig:scale-100 transition-transform duration-500 rounded-xl"></div>
                    
                    {/* The handwritten signature Inline SVG for absolute reliability */}
                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-2 gap-1 group-hover/sig:scale-[1.15] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                       <svg width="100" height="40" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm opacity-80" style={{ transform: "rotate(-4deg)" }}>
                         <path d="M 12 30 C 15 10, 30 5, 35 25 C 40 45, 50 15, 60 25 C 70 35, 75 20, 85 22" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                         <path d="M 25 35 C 40 35, 60 38, 90 32" stroke="#059669" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
                         <circle cx="8" cy="18" r="2" fill="#059669" />
                       </svg>
                       <div className="absolute bottom-2 right-2 flex items-center gap-1 opacity-0 group-hover/sig:opacity-100 transition-opacity duration-300">
                          <FileCheck2 className="w-3 h-3 text-emerald-600" />
                          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Signed</span>
                       </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeSignatureHook;
