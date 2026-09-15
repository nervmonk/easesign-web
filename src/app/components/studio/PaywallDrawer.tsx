"use client";

import { useState } from "react";
import { X, QrCode, ShieldCheck, Mail, CheckCircle2, ArrowRight } from "lucide-react";

interface PaywallDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  type?: string;
  onPaymentSuccess: (details: { email: string; type: string }) => void;
  lang?: string;
}

export default function PaywallDrawer({
  isOpen,
  onClose,
  type = "psre",
  onPaymentSuccess,
  lang = "id",
}: PaywallDrawerProps) {
  const [email, setEmail] = useState("");
  const [isQrGenerated, setIsQrGenerated] = useState(false);
  const [isSimulatingPaid, setIsSimulatingPaid] = useState(false);

  if (!isOpen) return null;

  const isMeterai = type === "meterai";
  const itemTitle = isMeterai
    ? lang === "id"
      ? "Pembubuhan Meterai Elektronik (e-Meterai)"
      : "Official e-Meterai Stamping"
    : lang === "id"
    ? "Sertifikat Elektronik Tilaka PSrE (UU ITE)"
    : "Tilaka PSrE Certified Digital Signature";

  const price = isMeterai ? "Rp 11.500" : "Rp 15.000";

  const handleGenerateQris = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      alert(lang === "id" ? "Silakan masukkan alamat email yang valid." : "Please enter a valid email address.");
      return;
    }
    setIsQrGenerated(true);
  };

  const handleSimulatePayment = () => {
    setIsSimulatingPaid(true);
    setTimeout(() => {
      onPaymentSuccess({ email, type });
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-[#003366]">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                {lang === "id" ? "Pembayaran Instan QRIS" : "Instant QRIS Checkout"}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === "id" ? "Bayar per dokumen tanpa saldo deposit" : "Pay-per-document with zero prepayments"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Item & Price Badge */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                {lang === "id" ? "Layanan Dipilih:" : "Selected Service:"}
              </p>
              <h4 className="text-sm font-bold text-slate-900">{itemTitle}</h4>
            </div>
            <div className="text-right">
              <span className="text-lg font-extrabold text-[#003366]">{price}</span>
              <p className="text-[10px] text-slate-400">Nett / Dokumen</p>
            </div>
          </div>

          {!isQrGenerated ? (
            <form onSubmit={handleGenerateQris} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {lang === "id" ? "Email Penerima Dokumen & Tautan Pemulihan" : "Email for Document & Recovery Link"}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@perusahaan.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#003366]/20 focus:border-[#003366] text-sm text-slate-900"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5 leading-normal">
                  {lang === "id"
                    ? "Tautan pemulihan otomatis dikirim ke sini. Jika browser tertutup saat membayar via m-banking, Anda bisa langsung melanjutkan proses."
                    : "A recovery link is sent here so you can resume if the tab is closed while opening your banking app."}
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#003366] hover:bg-[#0B57D0] text-white py-3 rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>{lang === "id" ? "Tampilkan Kode QRIS" : "Generate QRIS Code"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="space-y-4 text-center">
              {/* Dynamic QRIS Box */}
              <div className="p-5 rounded-2xl border-2 border-slate-900 bg-white inline-block shadow-md">
                <div className="w-48 h-48 bg-slate-100 rounded-lg flex flex-col items-center justify-center p-3 border border-slate-200">
                  <QrCode className="w-32 h-32 text-slate-900" />
                  <span className="text-[10px] font-mono font-bold text-slate-600 mt-1">
                    NMID: ID102003920199
                  </span>
                </div>
                <div className="mt-2 text-xs font-bold text-slate-800 tracking-wider">
                  QRIS STANDAR NASIONAL
                </div>
              </div>

              <p className="text-xs text-slate-600">
                {lang === "id"
                  ? "Pindai dengan BCA Mobile, Livin, GoPay, OVO, ShopeePay, atau m-Banking apa pun."
                  : "Scan with BCA Mobile, Livin, GoPay, OVO, ShopeePay, or any banking app."}
              </p>

              {/* Dev Demo Simulation Button */}
              <button
                type="button"
                onClick={handleSimulatePayment}
                disabled={isSimulatingPaid}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {isSimulatingPaid
                    ? lang === "id"
                      ? "Verifikasi Pembayaran..."
                      : "Verifying Payment..."
                    : lang === "id"
                    ? "Simulasi Bayar Berhasil (Demo)"
                    : "Simulate Successful Payment"}
                </span>
              </button>
            </div>
          )}

          {/* Safety Net Notice */}
          <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-2.5 text-xs text-blue-900">
            <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <p className="leading-normal">
              <span className="font-bold">
                {lang === "id" ? "Garansi Keamanan Dana: " : "Refund Protection: "}
              </span>
              {lang === "id"
                ? "Bila verifikasi biometrik e-KYC gagal hingga batas percobaan maksimal (3x), sistem menerbitkan voucher pengganti ke email Anda."
                : "If biometric e-KYC fails after 3 retries, a replacement voucher code is automatically emailed to you."}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
