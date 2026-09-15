"use client";

import { useState, useRef } from "react";
import { UploadCloud, FileText, Shield, CheckCircle2, AlertCircle } from "lucide-react";

interface DocumentDropzoneProps {
  onFileSelected: (file: File) => void;
  lang?: string;
}

export default function DocumentDropzone({ onFileSelected, lang = "id" }: DocumentDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      validateAndProcess(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndProcess(files[0]);
    }
  };

  const validateAndProcess = (file: File) => {
    setErrorMsg("");
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setErrorMsg(
        lang === "id"
          ? "Hanya file format PDF yang didukung."
          : "Only PDF documents are supported."
      );
      return;
    }

    // 25MB limit
    if (file.size > 25 * 1024 * 1024) {
      setErrorMsg(
        lang === "id"
          ? "Ukuran file terlalu besar. Maksimal 25MB."
          : "File size exceeds 25MB limit."
      );
      return;
    }

    onFileSelected(file);
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`group relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 p-8 sm:p-12 text-center flex flex-col items-center justify-center ${
          isDragging
            ? "border-[#0B57D0] bg-blue-50/80 scale-[1.01]"
            : "border-slate-300 hover:border-[#003366] bg-white hover:bg-slate-50/70 shadow-xs"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Upload Icon with M3 Container styling */}
        <div className="w-16 h-16 rounded-2xl bg-blue-50 group-hover:bg-blue-100/80 flex items-center justify-center text-[#003366] group-hover:text-[#0B57D0] transition-colors mb-5 shadow-xs">
          <UploadCloud className="w-8 h-8" />
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
          {lang === "id"
            ? "Tarik & Lepas Dokumen PDF di Sini"
            : "Drag & Drop Your PDF Document Here"}
        </h3>

        <p className="text-sm text-slate-500 max-w-md mb-6">
          {lang === "id"
            ? "atau klik tombol di bawah untuk memilih file dari komputer atau ponsel Anda"
            : "or click below to choose a file from your computer or phone"}
        </p>

        {/* Action Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="bg-[#003366] hover:bg-[#0B57D0] text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          <span>{lang === "id" ? "Pilih Dokumen PDF" : "Select PDF File"}</span>
        </button>

        {/* Security & File info */}
        <div className="mt-8 pt-6 border-t border-slate-100 w-full flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>Enkripsi AES-256</span>
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Maksimal 25MB</span>
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="text-slate-400">
            {lang === "id"
              ? "Privasi UU PDP (Auto-purge 48 jam)"
              : "UU PDP Compliant (Auto-purge 48h)"}
          </span>
        </div>
      </div>

      {errorMsg && (
        <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
}
