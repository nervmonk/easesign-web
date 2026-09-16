"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  UploadCloud,
  FileText,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  PenLine,
  Stamp,
  Users,
} from "lucide-react";

export type ProductTier = "free" | "psre" | "meterai" | "multi";

interface HomeHeroDropzoneProps {
  lang?: string;
  dict?: any;
  activeTier?: ProductTier;
  onTierChange?: (tier: ProductTier) => void;
  onFileSelected?: (file: File, tier: ProductTier) => void;
}

export default function HomeHeroDropzone({
  lang = "id",
  dict = {},
  activeTier,
  onTierChange,
  onFileSelected,
}: HomeHeroDropzoneProps) {
  const router = useRouter();
  const [internalTier, setInternalTier] = useState<ProductTier>("free");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentTier = activeTier ?? internalTier;

  const handleTierSelect = (tier: ProductTier) => {
    if (onTierChange) {
      onTierChange(tier);
    } else {
      setInternalTier(tier);
    }
  };

  const tabs = [
    {
      id: "free" as ProductTier,
      label: lang === "id" ? "Tanda Tangan Cepat" : "Quick Sign",
      sub: lang === "id" ? "Gratis · Rp 0" : "Free · $0",
      badge: lang === "id" ? "Gratis Tanpa Login" : "100% Free",
      icon: PenLine,
      title:
        lang === "id"
          ? "Tarik & Lepas Dokumen untuk Tanda Tangan Cepat"
          : "Drop Document for Quick Signature",
      subtitle:
        lang === "id"
          ? "Tanda tangan cepat dengan Halaman Bukti Audit SHA-256 tanpa login atau biaya."
          : "Instant signature with SHA-256 audit trail without login.",
      btnText:
        lang === "id" ? "Pilih PDF Tanda Tangan Gratis" : "Choose PDF to Sign Free",
      colorClasses: "border-blue-600 text-[#003366]",
    },
    {
      id: "psre" as ProductTier,
      label: lang === "id" ? "Sah UU ITE (PSrE)" : "Certified PSrE",
      sub: lang === "id" ? "Tilaka PSrE · Rp 15rb" : "Legal PSrE",
      badge: lang === "id" ? "Kekuatan Hukum Penuh UU ITE" : "Full Legal Enforceability",
      icon: ShieldCheck,
      title:
        lang === "id"
          ? "Tarik & Lepas Dokumen untuk Tanda Tangan PSrE"
          : "Drop Document for Tilaka PSrE Signature",
      subtitle:
        lang === "id"
          ? "Sertifikat elektronik resmi berinduk Komdigi (Tilaka) & verifikasi biometrik e-KYC Dukcapil."
          : "Certified digital certificate with Dukcapil e-KYC verification.",
      btnText:
        lang === "id" ? "Pilih PDF untuk PSrE Resmi" : "Choose PDF for PSrE",
      colorClasses: "border-emerald-600 text-emerald-800",
    },
    {
      id: "meterai" as ProductTier,
      label: lang === "id" ? "Meterai Elektronik" : "e-Meterai",
      sub: lang === "id" ? "Resmi Peruri · Rp 11.5rb" : "Peruri · 10.000",
      badge: lang === "id" ? "Resmi Peruri & DJP" : "Official Peruri Stamp",
      icon: Stamp,
      title:
        lang === "id"
          ? "Tarik & Lepas Dokumen untuk Pembubuhan e-Meterai"
          : "Drop Document for Official e-Meterai",
      subtitle:
        lang === "id"
          ? "Bubuhkan meterai elektronik resmi 10.000 dengan QR code validasi & nomor seri unik Peruri."
          : "Official 10,000 tax stamp with unique serial number and QR verification.",
      btnText:
        lang === "id" ? "Pilih PDF untuk e-Meterai" : "Choose PDF for e-Meterai",
      colorClasses: "border-amber-600 text-amber-900",
    },
    {
      id: "multi" as ProductTier,
      label: lang === "id" ? "Kirim Multi-Signer" : "Send to Others",
      sub: lang === "id" ? "Anti-Phishing OTP" : "Multi-Signer",
      badge: lang === "id" ? "Proteksi OTP Pengirim" : "Sender OTP Verified",
      icon: Users,
      title:
        lang === "id"
          ? "Tarik & Lepas Dokumen untuk Dikirim ke Pihak Lain"
          : "Drop Document to Send for Signatures",
      subtitle:
        lang === "id"
          ? "Kirim kontrak ke satu atau lebih penanda tangan melalui email bertoken aman & terverifikasi."
          : "Invite multiple signers with sender OTP verification and real-time tracking.",
      btnText:
        lang === "id" ? "Pilih PDF untuk Dikirim" : "Choose PDF to Send",
      colorClasses: "border-purple-600 text-purple-900",
    },
  ];

  const currentTab = tabs.find((t) => t.id === currentTier) || tabs[0];

  const handleSelectFile = (file?: File) => {
    if (!file) return;

    // Validate file type
    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      alert(
        lang === "id"
          ? "Format file tidak didukung. Mohon unggah dokumen PDF."
          : "Unsupported file format. Please upload a PDF document."
      );
      return;
    }

    // Validate size (25MB max)
    if (file.size > 25 * 1024 * 1024) {
      alert(
        lang === "id"
          ? "Ukuran file terlalu besar. Maksimal 25MB."
          : "File size is too large. Maximum 25MB."
      );
      return;
    }

    if (onFileSelected) {
      onFileSelected(file, currentTier);
    } else {
      router.push(`/${lang}/sign-pdf?tier=${currentTier}`);
    }
  };

  const handleLoadSample = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await fetch("/sample-contract.pdf");
      const blob = await res.blob();
      const sampleFile = new File([blob], "Surat-Perjanjian-Kerja-Sama.pdf", {
        type: "application/pdf",
      });
      handleSelectFile(sampleFile);
    } catch (err) {
      console.error("Failed to load sample contract:", err);
    }
  };

  const handleContainerClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleSelectFile(files[0]);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* 4-Product Segmented Intent Tabs */}
      <div className="mb-4">
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5 text-center">
          {lang === "id" ? "1. Pilih Jenis Layanan yang Anda Butuhkan:" : "1. Choose Your Signing Service:"}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200 shadow-inner">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === currentTier;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTierSelect(tab.id)}
                className={`relative flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-white text-slate-900 shadow-sm border border-slate-200/80 font-bold scale-[1.01]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60 font-medium"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? "text-[#003366]" : "text-slate-500"
                    }`}
                  />
                  <span className="text-xs font-bold leading-tight truncate">
                    {tab.label}
                  </span>
                </div>
                <span
                  className={`text-[10px] ${
                    isActive ? "text-[#0B57D0] font-semibold" : "text-slate-400"
                  }`}
                >
                  {tab.sub}
                </span>

                {isActive && (
                  <div className="absolute -bottom-1 w-6 h-1 bg-[#003366] rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleContainerClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        className={`group relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 p-8 sm:p-10 text-center bg-white flex flex-col items-center justify-center focus:outline-none focus:ring-4 focus:ring-blue-100 ${
          isDragging
            ? "border-[#0B57D0] bg-blue-50/80 scale-[1.01] shadow-lg"
            : "border-slate-300 hover:border-[#003366] hover:shadow-lg shadow-sm"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files?.[0]) handleSelectFile(e.target.files[0]);
          }}
        />

        {/* Dynamic Badge per Selected Tier */}
        <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
          <currentTab.icon className="w-3.5 h-3.5 text-[#003366]" />
          <span>{currentTab.badge}</span>
        </div>

        {/* M3 Upload Icon */}
        <div className="w-16 h-16 rounded-2xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center text-[#003366] group-hover:text-[#0B57D0] transition-colors mb-3.5 shadow-xs">
          <UploadCloud className="w-8 h-8" />
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5 max-w-lg">
          {currentTab.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-500 max-w-md mb-6 leading-relaxed">
          {currentTab.subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="bg-[#003366] hover:bg-[#0B57D0] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>{currentTab.btnText}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>

          <button
            type="button"
            onClick={handleLoadSample}
            className="border border-slate-300 hover:border-[#003366] bg-white hover:bg-slate-50 text-slate-700 hover:text-[#003366] font-semibold text-xs sm:text-sm px-4 py-3 rounded-xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{lang === "id" ? "Coba Dokumen Contoh (PKS)" : "Try Sample Document (PKS)"}</span>
          </button>
        </div>

        {/* Security strip */}
        <div className="mt-6 pt-4 border-t border-slate-100 w-full flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Enkripsi AES-256</span>
          </span>
          <span className="text-slate-300">•</span>
          <span>Maksimal 25MB</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-700 font-semibold">
            {currentTier === "free"
              ? lang === "id" ? "100% Gratis Tanpa Login" : "100% Free No Login"
              : currentTier === "psre"
              ? lang === "id" ? "Sertifikat Tilaka PSrE" : "Tilaka PSrE Certificate"
              : currentTier === "meterai"
              ? lang === "id" ? "Meterai Resmi Peruri" : "Official Peruri Stamp"
              : lang === "id" ? "Proteksi OTP Pengirim" : "Sender OTP Protection"}
          </span>
        </div>
      </div>
    </div>
  );
}
