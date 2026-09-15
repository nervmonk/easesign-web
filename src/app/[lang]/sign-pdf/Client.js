"use client";

import { useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import {
  PenLine,
  ShieldCheck,
  Stamp,
  Sparkles,
} from "lucide-react";

import DocumentDropzone from "../../components/studio/DocumentDropzone";
import SigningStudioWorkspace from "../../components/studio/SigningStudioWorkspace";

export default function SignPdfPage({ lang = "id", dict = {}, navbarDict = {} }) {
  const [pdfFile, setPdfFile] = useState(null);
  const [signingTier, setSigningTier] = useState("free"); // "free" | "psre" | "meterai"

  const handleFileDrop = (file) => {
    setPdfFile(file);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans">
      <Navbar lang={lang} dict={navbarDict} />

      {!pdfFile ? (
        /* Empty State: Dropzone + Product Tiers */
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-12 lg:py-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#003366] text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#0B57D0]" />
              <span>{lang === "id" ? "Studio Tanda Tangan PDF Tanpa Login" : "Guest PDF Signing Studio"}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              {dict?.title || (lang === "id" ? "Tanda Tangan PDF Online" : "Sign PDF Documents Online")}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {dict?.subtitle ||
                (lang === "id"
                  ? "Unggah dokumen PDF Anda dan pilih tingkat legalitas yang diinginkan. Cepat, instan, dan aman."
                  : "Upload your PDF and select the signature tier that meets your legal requirements.")}
            </p>
          </div>

          {/* Document Dropzone */}
          <div className="max-w-3xl mx-auto mb-12">
            <DocumentDropzone onFileSelected={handleFileDrop} lang={lang} />
          </div>

          {/* Product Tiers Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div
              onClick={() => setSigningTier("free")}
              className={`rounded-2xl p-6 border transition-all cursor-pointer ${
                signingTier === "free"
                  ? "border-[#003366] bg-white shadow-md ring-2 ring-[#003366]/10"
                  : "border-slate-200 bg-white hover:border-slate-300 shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
                  Rp 0 · Gratis
                </span>
                <PenLine className="w-5 h-5 text-[#003366]" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">
                {lang === "id" ? "Tanda Tangan Cepat" : "Quick Signature"}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {lang === "id"
                  ? "Stempel PNG transparan + Segel Hash SHA-256 + Halaman Bukti Audit resmi."
                  : "Transparent signature + SHA-256 Hash + Official Audit Trail page."}
              </p>
            </div>

            {/* PSrE Tier */}
            <div
              onClick={() => setSigningTier("psre")}
              className={`rounded-2xl p-6 border transition-all cursor-pointer relative overflow-hidden ${
                signingTier === "psre"
                  ? "border-[#003366] bg-white shadow-md ring-2 ring-[#003366]/10"
                  : "border-slate-200 bg-white hover:border-slate-300 shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold">
                  {lang === "id" ? "Sah UU ITE · PSrE" : "UU ITE Certified"}
                </span>
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">
                {lang === "id" ? "Tilaka PSrE Certified" : "Tilaka PSrE Certificate"}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {lang === "id"
                  ? "Verifikasi e-KYC Dukcapil dengan kekuatan pembuktian penuh di pengadilan."
                  : "Dukcapil e-KYC verification with full courtroom legal enforceability."}
              </p>
            </div>

            {/* e-Meterai Tier */}
            <div
              onClick={() => setSigningTier("meterai")}
              className={`rounded-2xl p-6 border transition-all cursor-pointer ${
                signingTier === "meterai"
                  ? "border-[#003366] bg-white shadow-md ring-2 ring-[#003366]/10"
                  : "border-slate-200 bg-white hover:border-slate-300 shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold">
                  Rp 11.500 · Resmi Peruri
                </span>
                <Stamp className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">
                {lang === "id" ? "Meterai Elektronik" : "Official e-Meterai"}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {lang === "id"
                  ? "Pembubuhan e-meterai resmi Peruri & DJP untuk dokumen perpajakan & perdata."
                  : "Official Peruri digital stamp for tax compliance and civil contracts."}
              </p>
            </div>
          </div>
        </main>
      ) : (
        /* Active Workspace View */
        <main className="flex-1 flex flex-col">
          <SigningStudioWorkspace
            pdfFile={pdfFile}
            onDiscard={() => setPdfFile(null)}
            lang={lang}
            dict={dict}
          />
        </main>
      )}

      <Footer lang={lang} />
    </div>
  );
}