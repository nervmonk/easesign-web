"use client";

import { ShieldCheck, ArrowUpRight } from "lucide-react";

interface AuditTrailBadgeProps {
  lang?: string;
  onUpgradeClick?: () => void;
}

export default function AuditTrailBadge({ lang = "id", onUpgradeClick }: AuditTrailBadgeProps) {
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
                className="inline-flex items-center gap-1 text-xs font-bold text-[#0B57D0] hover:underline"
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
