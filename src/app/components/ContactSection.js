"use client";

import { useState } from "react";
import {
  Building2,
  Mail,
  Phone,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const ContactSection = ({ dict = {}, lang = "id" }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "psre",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(""); // "" | "submitting" | "success" | "error"

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      tempErrors.name =
        lang === "id" ? "Nama lengkap wajib diisi." : "Full name is required.";
    }

    if (!trimmedEmail) {
      tempErrors.email =
        lang === "id" ? "Alamat email wajib diisi." : "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      tempErrors.email =
        lang === "id" ? "Format alamat email tidak valid." : "Invalid email address.";
    }

    if (!trimmedMessage) {
      tempErrors.message =
        lang === "id" ? "Pesan tidak boleh kosong." : "Message cannot be empty.";
    } else if (trimmedMessage.length < 10) {
      tempErrors.message =
        lang === "id"
          ? "Pesan terlalu singkat (minimal 10 karakter)."
          : "Message must be at least 10 characters.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("submitting");
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", category: "psre", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        {/* Left Column: Office & Entity Info */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#003366] text-xs font-bold mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0B57D0]" />
              <span>{dict?.badge || "KONSULTASI & DUKUNGAN RESMI"}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              {dict?.title || "Hubungi Tim EaseSign"}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {dict?.subtitle ||
                "Konsultasikan kebutuhan tanda tangan digital resmi, e-meterai korporasi, atau integrasi API untuk bisnis Anda."}
            </p>
          </div>

          {/* Contact Details Cards */}
          <div className="space-y-4">
            {/* Address */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-50 text-[#003366] shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm">
                <h4 className="font-bold text-slate-900 mb-1">
                  {dict?.addressTitle || "Kantor Pusat Operasional"}
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  Dea Tower II, Lantai 15 Suite<br />
                  Jl. Mega Kuningan Barat Kav. E4.3 No. 1-2<br />
                  Jakarta Selatan, DKI Jakarta 12950
                </p>
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 text-[#003366] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-900">
                    {dict?.phoneTitle || "Telepon"}
                  </p>
                  <p className="text-slate-600 mt-0.5">021 - 38915110</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 text-[#003366] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-900">
                    {dict?.emailTitle || "Email"}
                  </p>
                  <a
                    href="mailto:info@easesign.id"
                    className="text-slate-600 hover:text-[#003366] mt-0.5 block transition-colors"
                  >
                    info@easesign.id
                  </a>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="p-4 rounded-2xl bg-slate-100/70 border border-slate-200 flex items-center gap-3 text-xs text-slate-600">
              <Clock className="w-4 h-4 text-slate-500 shrink-0" />
              <span>
                {lang === "id"
                  ? "Jam Layanan: Senin – Jumat, 08:30 – 17:30 WIB"
                  : "Business Hours: Monday – Friday, 08:30 – 17:30 WIB"}
              </span>
            </div>
          </div>

          {/* Regulatory Note */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <span className="font-bold">Keamanan & Kepatuhan: </span>
              {lang === "id"
                ? "PT Paramita Digital Nusantara adalah PSE resmi berlisensi Komdigi. Seluruh data dilindungi regulasi UU PDP No. 27/2022."
                : "PT Paramita Digital Nusantara is a Komdigi-licensed PSE. All communications comply with UU PDP No. 27/2022."}
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-lg">
            {status === "success" ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {dict?.successTitle || "Pesan Berhasil Terkirim!"}
                </h3>
                <p className="text-slate-600 text-sm max-w-md leading-relaxed">
                  {dict?.successMsg ||
                    "Terima kasih telah menghubungi EaseSign. Tim enterprise kami akan segera merespons pesan Anda dalam 1x24 jam kerja."}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("")}
                  className="mt-4 px-6 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-all"
                >
                  {lang === "id" ? "Kirim Pesan Lainnya" : "Send Another Message"}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                action="https://formspree.io/f/meoredvv"
                method="POST"
                className="space-y-6"
              >
                <div className="border-b border-slate-100 pb-4 mb-6">
                  <h3 className="text-lg font-bold text-slate-900">
                    {dict?.formTitle || "Formulir Konsultasi Dokumen"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {lang === "id"
                      ? "Isi formulir berikut dan tim kami akan segera menghubungi Anda."
                      : "Fill in the form below and our team will get in touch shortly."}
                  </p>
                </div>

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
                  >
                    {dict?.fieldName || "Nama Lengkap"} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={lang === "id" ? "Contoh: Budi Pratama" : "e.g. John Doe"}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                      errors.name
                        ? "border-red-300 focus:ring-red-200 focus:border-red-500 bg-red-50/20"
                        : "border-slate-300 focus:ring-[#003366]/20 focus:border-[#003366] bg-white"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
                    >
                      {dict?.fieldEmail || "Email Kerja"} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nama@perusahaan.com"
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                        errors.email
                          ? "border-red-300 focus:ring-red-200 focus:border-red-500 bg-red-50/20"
                          : "border-slate-300 focus:ring-[#003366]/20 focus:border-[#003366] bg-white"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
                    >
                      {dict?.fieldPhone || "Nomor Telepon / WhatsApp"}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0812xxxxxxxx"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#003366]/20 focus:border-[#003366] text-sm text-slate-900 bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Inquiry Category */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
                  >
                    {dict?.fieldCategory || "Kategori Kebutuhan"}
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#003366]/20 focus:border-[#003366] text-sm text-slate-900 bg-white transition-all"
                  >
                    <option value="psre">
                      {lang === "id"
                        ? "Tanda Tangan Bersertifikat PSrE (Tilaka)"
                        : "Certified PSrE Digital Signature (Tilaka)"}
                    </option>
                    <option value="meterai">
                      {lang === "id"
                        ? "Pembubuhan e-Meterai Korporasi (Peruri)"
                        : "Corporate e-Meterai Stamping (Peruri)"}
                    </option>
                    <option value="api">
                      {lang === "id"
                        ? "Integrasi REST API / SDK EaseSign"
                        : "EaseSign REST API / SDK Integration"}
                    </option>
                    <option value="partnership">
                      {lang === "id"
                        ? "Kemitraan Bisnis / Notaris / B2B"
                        : "Business Partnership / Notary / Enterprise"}
                    </option>
                    <option value="other">
                      {lang === "id" ? "Pertanyaan Lainnya" : "Other Inquiries"}
                    </option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
                  >
                    {dict?.fieldMessage || "Pesan atau Kebutuhan Dokumen"}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={
                      lang === "id"
                        ? "Jelaskan kebutuhan dokumen atau perkiraan volume penandatanganan perusahaan Anda..."
                        : "Describe your document signing requirements or estimated monthly volume..."
                    }
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                      errors.message
                        ? "border-red-300 focus:ring-red-200 focus:border-red-500 bg-red-50/20"
                        : "border-slate-300 focus:ring-[#003366]/20 focus:border-[#003366] bg-white"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {status === "error" && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>
                      {dict?.errorMsg ||
                        "Maaf, terjadi kendala pengiriman. Silakan coba lagi atau hubungi info@easesign.id"}
                    </span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-[#003366] hover:bg-[#0B57D0] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {status === "submitting"
                      ? dict?.submitting || "Sedang Mengirim..."
                      : dict?.submit || "Kirim Pesan Sekarang"}
                  </span>
                </button>

                <p className="text-[11px] text-slate-400 text-center">
                  {lang === "id"
                    ? "Kami menghormati privasi Anda. Data tidak akan dibagikan ke pihak ketiga."
                    : "We respect your privacy. Information is strictly confidential."}
                </p>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
