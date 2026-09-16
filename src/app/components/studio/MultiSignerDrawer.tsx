"use client";

import { useState } from "react";
import {
  X,
  Users,
  Plus,
  Trash2,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  QrCode,
  KeyRound,
  Send,
} from "lucide-react";

interface Signer {
  id: string;
  name: string;
  email: string;
  role: "signer" | "viewer";
}

interface MultiSignerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (summary: { signers: Signer[]; senderEmail: string }) => void;
  lang?: string;
}

export default function MultiSignerDrawer({
  isOpen,
  onClose,
  onSuccess,
  lang = "id",
}: MultiSignerDrawerProps) {
  const [step, setStep] = useState<"recipients" | "otp" | "payment">("recipients");

  // Signer list
  const [signers, setSigners] = useState<Signer[]>([
    { id: "1", name: "", email: "", role: "signer" },
  ]);

  // Sender info
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");

  // OTP State
  const [otpCode, setOtpCode] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  // Payment simulation
  const [isSimulatingPaid, setIsSimulatingPaid] = useState(false);

  if (!isOpen) return null;

  const totalSigners = signers.filter((s) => s.role === "signer").length;
  const pricePerSigner = 15000;
  const totalPrice = totalSigners * pricePerSigner;

  const handleAddSigner = () => {
    setSigners((prev) => [
      ...prev,
      { id: Date.now().toString(), name: "", email: "", role: "signer" },
    ]);
  };

  const handleRemoveSigner = (id: string) => {
    if (signers.length <= 1) return;
    setSigners((prev) => prev.filter((s) => s.id !== id));
  };

  const handleUpdateSigner = (
    id: string,
    field: "name" | "email" | "role",
    val: string
  ) => {
    setSigners((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: val } : s))
    );
  };

  const handleProceedToOtp = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate sender
    if (!senderName.trim() || !senderEmail.includes("@")) {
      alert(
        lang === "id"
          ? "Mohon isi nama dan email pengirim yang valid."
          : "Please enter valid sender name and email."
      );
      return;
    }

    // Validate all signers
    for (let i = 0; i < signers.length; i++) {
      const s = signers[i];
      if (!s.name.trim() || !s.email.includes("@")) {
        alert(
          lang === "id"
            ? `Penerima #${i + 1} belum memiliki nama atau email yang valid.`
            : `Signer #${i + 1} is missing a valid name or email.`
        );
        return;
      }
    }

    setIsSendingOtp(true);
    setTimeout(() => {
      setIsSendingOtp(false);
      setOtpSent(true);
      setStep("otp");
    }, 800);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length < 4) {
      alert(
        lang === "id"
          ? "Masukkan kode verifikasi 6-digit."
          : "Please enter the 6-digit verification code."
      );
      return;
    }
    setStep("payment");
  };

  const handleSimulatePayment = () => {
    setIsSimulatingPaid(true);
    setTimeout(() => {
      setIsSimulatingPaid(false);
      onSuccess({ signers, senderEmail });
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-50 text-[#003366]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                {lang === "id" ? "Kirim ke Banyak Pihak (Multi-Signer)" : "Send to Multiple Signers"}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === "id"
                  ? "Proteksi Anti-Phishing dengan Verifikasi OTP Pengirim"
                  : "Anti-Phishing Shield with Sender OTP Verification"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-slate-100/70 border-b border-slate-200 text-xs font-semibold text-slate-600">
          <span className={`flex items-center gap-1.5 ${step === "recipients" ? "text-[#003366] font-bold" : ""}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${step === "recipients" ? "bg-[#003366] text-white" : "bg-slate-300 text-slate-700"}`}>1</span>
            <span>{lang === "id" ? "Penerima" : "Signers"}</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className={`flex items-center gap-1.5 ${step === "otp" ? "text-[#003366] font-bold" : ""}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${step === "otp" ? "bg-[#003366] text-white" : "bg-slate-300 text-slate-700"}`}>2</span>
            <span>{lang === "id" ? "Verifikasi OTP" : "Sender OTP"}</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className={`flex items-center gap-1.5 ${step === "payment" ? "text-[#003366] font-bold" : ""}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${step === "payment" ? "bg-[#003366] text-white" : "bg-slate-300 text-slate-700"}`}>3</span>
            <span>{lang === "id" ? "QRIS & Kirim" : "QRIS & Send"}</span>
          </span>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {step === "recipients" && (
            <form onSubmit={handleProceedToOtp} className="space-y-5">
              {/* Sender Info Section */}
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#003366]">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{lang === "id" ? "Informasi Anda (Pengirim Dokumen)" : "Your Information (Sender)"}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      {lang === "id" ? "Nama Pengirim" : "Sender Name"}
                    </label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#003366] bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      {lang === "id" ? "Email Pengirim (Wajib Valid)" : "Sender Email (Required)"}
                    </label>
                    <input
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="john@company.com"
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#003366] bg-white"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-slate-500">
                  {lang === "id"
                    ? "Kode OTP 6-digit akan dikirimkan ke email ini untuk memverifikasi kepemilikan sebelum dokumen dikirim."
                    : "A 6-digit OTP will be dispatched to this email to prevent domain spoofing."}
                </p>
              </div>

              {/* Recipients Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    {lang === "id" ? "Daftar Penanda Tangan" : "List of Signers"}
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddSigner}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0B57D0] hover:underline cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{lang === "id" ? "Tambah Penanda Tangan" : "Add Signer"}</span>
                  </button>
                </div>

                {signers.map((signer, idx) => (
                  <div
                    key={signer.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col gap-2.5 relative group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">
                        {lang === "id" ? `Pihak #${idx + 1}` : `Party #${idx + 1}`}
                      </span>
                      {signers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSigner(signer.id)}
                          className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input
                        type="text"
                        required
                        value={signer.name}
                        onChange={(e) =>
                          handleUpdateSigner(signer.id, "name", e.target.value)
                        }
                        placeholder={lang === "id" ? "Nama Lengkap" : "Full Name"}
                        className="text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#003366] bg-white"
                      />
                      <input
                        type="email"
                        required
                        value={signer.email}
                        onChange={(e) =>
                          handleUpdateSigner(signer.id, "email", e.target.value)
                        }
                        placeholder={lang === "id" ? "Email Penerima" : "Recipient Email"}
                        className="text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#003366] bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculation Card */}
              <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-600">Total Biaya Tilaka PSrE:</span>
                  <p className="font-bold text-slate-800">
                    {totalSigners} {lang === "id" ? "Penanda Tangan x Rp 15.000" : "Signers x Rp 15,000"}
                  </p>
                </div>
                <span className="text-base font-extrabold text-[#003366]">
                  Rp {totalPrice.toLocaleString("id-ID")}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSendingOtp}
                className="w-full bg-[#003366] hover:bg-[#0B57D0] disabled:opacity-50 text-white font-bold text-xs py-3 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>
                  {isSendingOtp
                    ? lang === "id"
                      ? "Mengirim OTP..."
                      : "Sending OTP..."
                    : lang === "id"
                    ? "Lanjut ke Verifikasi Pengirim"
                    : "Proceed to Sender Verification"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-5 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-[#003366] flex items-center justify-center mx-auto">
                <KeyRound className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  {lang === "id" ? "Masukkan Kode OTP Pengirim" : "Enter Sender OTP"}
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  {lang === "id"
                    ? `Kode OTP 6-digit telah dikirimkan ke ${senderEmail}. Masukkan kode untuk memverifikasi bahwa Anda adalah pengirim resmi.`
                    : `A 6-digit OTP code has been sent to ${senderEmail}. Enter the code to verify sender identity.`}
                </p>
              </div>

              <div>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="123456"
                  className="tracking-widest text-center text-xl font-mono font-bold w-48 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#003366]"
                />
                <p className="text-[11px] text-slate-400 mt-2">
                  {lang === "id" ? "Simulasi: Masukkan 6 angka sembarang (e.g. 123456)" : "Simulation: Enter any 6 digits"}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("recipients")}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  {lang === "id" ? "Kembali" : "Back"}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#003366] hover:bg-[#0B57D0] text-white text-xs font-bold shadow-xs hover:shadow-md cursor-pointer"
                >
                  {lang === "id" ? "Verifikasi & Lanjut" : "Verify & Continue"}
                </button>
              </div>
            </form>
          )}

          {step === "payment" && (
            <div className="space-y-5 text-center">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{lang === "id" ? "Identitas Pengirim Terverifikasi" : "Sender Identity Verified"}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1">
                  {lang === "id" ? "Pembayaran QRIS Multi-Signer" : "QRIS Multi-Signer Payment"}
                </h4>
                <p className="text-xs text-slate-500">
                  {lang === "id"
                    ? `Total: Rp ${totalPrice.toLocaleString("id-ID")} untuk ${totalSigners} Penanda Tangan`
                    : `Total: Rp ${totalPrice.toLocaleString("id-ID")} for ${totalSigners} Signers`}
                </p>
              </div>

              {/* QR Mockup */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm inline-block mx-auto">
                <div className="w-44 h-44 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center p-2">
                  <QrCode className="w-28 h-28 text-slate-800" />
                  <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                    QRIS Standar Bank Indonesia
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                {lang === "id"
                  ? "Setelah pembayaran terkonfirmasi, tautan undangan resmi Tilaka PSrE akan otomatis dikirimkan ke email seluruh penanda tangan."
                  : "Once payment is confirmed, official Tilaka PSrE invite links will be automatically emailed to all signers."}
              </p>

              <button
                type="button"
                onClick={handleSimulatePayment}
                disabled={isSimulatingPaid}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {isSimulatingPaid
                    ? lang === "id"
                      ? "Memverifikasi Pembayaran & Mengirim Email..."
                      : "Verifying & Sending Invitations..."
                    : lang === "id"
                    ? "Simulasi Bayar QRIS & Kirim Dokumen"
                    : "Simulate QRIS Payment & Send"}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
