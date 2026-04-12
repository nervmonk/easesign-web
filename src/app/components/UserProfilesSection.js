"use client";

import React from "react";
import Link from "next/link";
import { 
  User, 
  Building2, 
  CheckCircle2, 
  Terminal, 
  Wallet,
  FileSignature,
  FileBadge
} from "lucide-react";

const UserProfilesSection = ({ lang = 'id', dict = {} }) => {
  return (
    <section className="py-24 relative px-4 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none translate-x-1/4 translate-y-1/4"></div>

      <div className="container mx-auto max-w-[1200px]">
        {/* Section Header */}
        <div className="text-center mb-16 z-10 relative">
          <div className="mb-6">
            <span className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold px-4 py-1.5 rounded-full tracking-[0.2em] uppercase">
              {dict.badge || 'FLEXIBLE SOLUTIONS'}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-[1.2]">
            {dict.title || 'Built for Every Scale'}
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed font-light max-w-2xl mx-auto">
            {dict.subtitle || 'Whether you\'re signing personal documents or fully automating enterprise workflows, we have the right tools tailored for your profile.'}
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto relative z-10">
          
          {/* Individual Profile Card */}
          <div className="rounded-3xl border border-white/10 bg-[#0d0c1e]/60 backdrop-blur-md p-8 lg:p-12 flex flex-col relative overflow-hidden group hover:bg-[#12112a]/80 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <User size={80} />
            </div>
            
            <div className="mb-8">
              <div className="w-14 h-14 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl flex items-center justify-center mb-6">
                <User className="text-cyan-400 w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {dict.individual?.title || 'Individual Profile'}
              </h3>
              <p className="text-gray-400 font-light">
                {dict.individual?.desc || 'Perfect for freelancers and personal use.'}
              </p>
            </div>

            <div className="flex-grow">
              <ul className="space-y-4 mb-10">
                {(dict.individual?.features || []).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link href={`/${lang}/sign-pdf`} className="w-full">
              <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-4 rounded-xl transition-all shadow-sm">
                {dict.individual?.cta || 'Start for Free'}
              </button>
            </Link>
          </div>

          {/* Corporate Profile Card */}
          <div className="rounded-3xl border border-indigo-500/30 bg-[#0d0c1e]/80 backdrop-blur-md p-8 lg:p-12 flex flex-col relative overflow-hidden group shadow-[0_0_40px_-10px_rgba(99,102,241,0.2)] hover:shadow-[0_0_60px_-10px_rgba(99,102,241,0.3)] transition-all duration-300">
            {/* Glowing accent border top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
            
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Building2 size={80} />
            </div>
            
            <div className="mb-8 relative z-10">
              <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="text-indigo-400 w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {dict.corporate?.title || 'Corporate Profile'}
              </h3>
              <p className="text-gray-400 font-light">
                {dict.corporate?.desc || 'Advanced features for modern enterprises.'}
              </p>
            </div>

            <div className="flex-grow relative z-10">
              <ul className="space-y-4 mb-10">
                {(dict.corporate?.features || []).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link href="https://dev-console.easesign.site" className="w-full relative z-10">
              <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-indigo-600/20 hover:-translate-y-0.5 border border-indigo-500/50">
                {dict.corporate?.cta || 'Contact Sales'}
              </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default UserProfilesSection;
