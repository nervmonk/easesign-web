"use client";

import { ShieldCheck, ArrowUpRight, Stamp, Users, CheckCircle2 } from "lucide-react";

interface AuditTrailBadgeProps {
  lang?: string;
  tier?: "free" | "psre" | "meterai" | "multi";
  onUpgradeClick?: () => void;
}

export default function AuditTrailBadge({
  lang = "id",
  tier = "free",
  onUpgradeClick,
}: AuditTrailBadgeProps) {
  if (tier === "psre") {
    return (
      <div className="rounded-2xl border-2 border-emerald-500/80 bg-emerald-50/50 p-5 shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider">
                {lang === "id"
                  ? "Sertifikat Elektronik PSrE Terdaftar Komdigi (Tilaka)"
                  : "Certified Digital Signature by Tilaka PSrE"}
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-emerald-200/80 text-[10px] font-bold text-emerald-900 border border-emerald-300">
                UU ITE Pasal 11
              </span>
            </div>
            <p className="text-xs text-emerald-900 leading-relaxed">
              {lang === "id"
                ? "Dokumen ini akan diterbitkan dengan Sertifikat Elektronik Resmi yang mengikat secara hukum dengan kekuatan pembuktian penuh di pengadilan dan terverifikasi e-KYC Dukcapil."
                : "This document will be signed with an official Digital Certificate holding full evidentiary power in Indonesian courts under UU ITE."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (tier === "meterai") {
    return (
      <div className="rounded-2xl border-2 border-amber-500/80 bg-amber-50/50 p-5 shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 shrink-0">
            <Stamp className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-xs font-extrabold text-amber-950 uppercase tracking-wider">
                {lang === "id"
                  ? "Pembubuhan Meterai Elektronik Resmi 10.000 (Peruri)"
                  : "Official 10,000 e-Meterai Stamping (Peruri)"}
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-amber-200/80 text-[10px] font-bold text-amber-900 border border-amber-300">
                UU No. 10/2020
              </span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              {lang === "id"
                ? "Meterai elektronik resmi akan dibubuhkan langsung pada koordinat yang Anda tentukan, lengkap dengan nomor seri unik dan QR code validasi resmi Direktorat Jenderal Pajak (DJP)."
                : "Official e-Meterai will be stamped directly onto your selected coordinates with unique serial number and official tax verification QR."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (tier === "multi") {
    return (
      <div className="rounded-2xl border-2 border-purple-500/80 bg-purple-50/50 p-5 shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-purple-100 border border-purple-300 text-purple-900 shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-xs font-extrabold text-purple-950 uppercase tracking-wider">
                {lang === "id"
                  ? "Alur Multi-Signer dengan Proteksi Anti-Phishing"
                  : "Multi-Signer Workflow with Anti-Phishing Protection"}
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-purple-200/80 text-[10px] font-bold text-purple-900 border border-purple-300">
                OTP Pengirim
              </span>
            </div>
            <p className="text-xs text-purple-900 leading-relaxed">
              {lang === "id"
                ? "Dokumen akan dikirimkan ke seluruh penanda tangan secara berurutan. Setiap penanda tangan menerima tautan berenkripsi unik untuk menandatangani secara mandiri."
                : "Invitations with secure unique token links will be dispatched to each signer with sender verification."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
      <div className="flex items-start gap-3.5">
        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-700 shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {lang === "id" ? "Segel Integritas Kriptografis" : "Cryptographic Integrity Seal"}
            </h4>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 border border-slate-200">
              SHA-256
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {lang === "id"
              ? "Dokumen ini akan otomatis dilengkapi Halaman Bukti Audit (Audit Trail) berisi Timestamp waktu Indonesia (WIB), IP Address, dan Hash Kriptografis untuk membuktikan integritas file dari perubahan tidak sah."
              : "This document will automatically include an Audit Trail page with official Indonesian timestamp, IP address, and cryptographic hash ensuring tamper-evident integrity."}
          </p>

          {/* Legal Note UU ITE */}
          <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 leading-normal">
            <span className="font-semibold text-slate-700">
              {lang === "id" ? "Catatan Legalitas: " : "Legal Notice: "}
            </span>
            {lang === "id"
              ? "Fitur Tanda Tangan Cepat menghasilkan Tanda Tangan Elektronik Tidak Tersertifikasi (UU ITE Pasal 11 & PP 71/2019). Cocok untuk persetujuan internal, tugas, atau formulir harian."
              : "Quick signing generates an uncertified electronic signature with audit trail. Recommended for internal approvals and routine agreements."}
          </div>

          {/* Upsell to Tilaka PSrE */}
          {onUpgradeClick && (
            <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-xs text-[#003366] font-semibold">
                {lang === "id"
                  ? "Butuh kekuatan hukum mutlak di pengadilan?"
                  : "Need absolute legal enforceability in court?"}
              </span>
              <button
                type="button"
                onClick={onUpgradeClick}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#0B57D0] hover:underline cursor-pointer"
              >
                <span>{lang === "id" ? "Gunakan Tilaka PSrE" : "Upgrade to PSrE"}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
