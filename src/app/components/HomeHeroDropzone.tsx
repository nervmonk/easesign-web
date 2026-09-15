"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, FileText, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

interface HomeHeroDropzoneProps {
  lang?: string;
  dict?: {
    dropzoneTitle?: string;
    dropzoneSubtitle?: string;
    dropzoneButton?: string;
  };
  onFileSelected?: (file: File) => void;
}

export default function HomeHeroDropzone({
  lang = "id",
  dict = {},
  onFileSelected,
}: HomeHeroDropzoneProps) {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      onFileSelected(file);
    } else {
      router.push(`/${lang}/sign-pdf`);
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
    <div className="w-full max-w-2xl mx-auto">
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

        {/* M3 Upload Container */}
        <div className="w-16 h-16 rounded-2xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center text-[#003366] group-hover:text-[#0B57D0] transition-colors mb-4 shadow-xs">
          <UploadCloud className="w-8 h-8" />
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5">
          {dict?.dropzoneTitle || (lang === "id" ? "Tarik & Lepas Dokumen PDF di Sini" : "Drag & Drop Your PDF Here")}
        </h3>

        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-6">
          {dict?.dropzoneSubtitle ||
            (lang === "id"
              ? "atau klik tombol di bawah untuk langsung membuka dokumen di Studio Tanda Tangan"
              : "or click below to open your document instantly in the Signature Studio")}
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
            <span>{dict?.dropzoneButton || (lang === "id" ? "Pilih File PDF" : "Choose PDF Document")}</span>
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
          <span className="text-slate-600 font-semibold">100% Gratis Tanpa Login</span>
        </div>
      </div>
    </div>
  );
}

