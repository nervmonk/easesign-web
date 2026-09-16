"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  Stamp,
  Send,
  Scale,
  Briefcase,
  Sparkles,
} from "lucide-react";

import HomeHeroDropzone, { ProductTier } from "../components/HomeHeroDropzone";
import FaqSection from "../components/FaqSection";

// Dynamically import SigningStudioWorkspace to prevent SSR issues with canvas / react-pdf
const SigningStudioWorkspace = dynamic(
  () => import("../components/studio/SigningStudioWorkspace"),
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 flex items-center justify-center min-h-[60vh] bg-[#EEF2F6]">
        <div className="text-center p-8">
          <div className="w-10 h-10 border-4 border-[#003366] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-semibold text-sm">
            Mempersiapkan Studio Tanda Tangan...
          </p>
        </div>
      </div>
    ),
  }
);

interface HomeClientProps {
  lang: string;
  dict: any;
}

export default function HomeClient({ lang = "id", dict = {} }: HomeClientProps) {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [selectedTier, setSelectedTier] = useState<ProductTier>("free");

  const corporateClients = [
    { name: "Bank BNI", logo: "/BNI-logo.png" },
    { name: "Bank BRI", logo: "/BRI-logo.png" },
    { name: "Antam", logo: "/antam-logo.png" },
    { name: "Krakatau Steel", logo: "/krakatau-steel-logo.png" },
    { name: "Samsung", logo: "/samsung-logo.png" },
    { name: "Polytron", logo: "/polytron-logo.png" },
    { name: "PT Timah", logo: "/timah-logo.png" },
  ];

  const handleScrollToHero = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectProductTier = (tier: ProductTier) => {
    setSelectedTier(tier);
    handleScrollToHero();
  };

  // If user dropped or selected a PDF, seamlessly switch to SigningStudioWorkspace
  if (pdfFile) {
    return (
      <main className="flex-1 flex flex-col">
        <SigningStudioWorkspace
          pdfFile={pdfFile}
          initialTier={selectedTier}
          onDiscard={() => setPdfFile(null)}
          lang={lang}
          dict={dict}
        />
      </main>
    );
  }

  // Otherwise, render the full executive landing page
  return (
    <main className="flex-grow">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-[#F8FAFC]">
        <div className="max-w-7xl mx-auto text-center">

          {/* Regulatory Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#003366] text-xs font-bold mb-6 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-[#0B57D0]" />
            <span>{dict?.hero?.badge || "PSrE Berinduk Komdigi · Sah UU ITE No. 1/2024"}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.15] mb-6">
            {dict?.hero?.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            {dict?.hero?.subtitle ||
              "Langsung tanda tangani kontrak bisnis, perjanjian kerja, dan faktur tanpa ribet daftar. Dilengkapi sertifikat PSrE resmi, verifikasi e-KYC Dukcapil, atau tanda tangan cepat gratis."}
          </p>

          {/* PLG Dropzone Hero Component - Connected directly to Studio state */}
          <div className="mb-12">
            <HomeHeroDropzone
              lang={lang}
              dict={dict.hero}
              activeTier={selectedTier}
              onTierChange={(tier) => setSelectedTier(tier)}
              onFileSelected={(file, tier) => {
                setSelectedTier(tier);
                setPdfFile(file);
              }}
            />
          </div>

          {/* Regulatory Trust Strip */}
          <div className="max-w-4xl mx-auto pt-6 border-t border-slate-200/80">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">
              {dict?.trustBar?.title || "Standar Kepatuhan Regulasi & Keamanan Nasional"}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{dict?.trustBar?.psre || "PSrE Terdaftar Komdigi (Tilaka)"}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{dict?.trustBar?.dukcapil || "Verifikasi Identitas Dukcapil"}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{dict?.trustBar?.peruri || "e-Meterai Resmi Peruri"}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{dict?.trustBar?.uite || "Kekuatan Hukum Penuh UU ITE"}</span>
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION: PRODUCT OFFERINGS MATRIX */}
      <section id="layanan" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#003366] text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#0B57D0]" />
              <span>{dict?.offerings?.badge || "PILIHAN PRODUK EASESIGN"}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              {dict?.offerings?.title || "Layanan Penandatanganan Sesuai Kebutuhan Anda"}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {dict?.offerings?.subtitle ||
                "Dari persetujuan internal yang cepat hingga kontrak bernilai tinggi yang membutuhkan kekuatan pembuktian mutlak di pengadilan."}
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Product 1: Tanda Tangan Cepat (Gratis) */}
            <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[11px] font-bold">
                    {dict?.offerings?.free?.tag || "Gratis Selamanya"}
                  </span>
                  <FileText className="w-5 h-5 text-slate-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {dict?.offerings?.free?.title || "Tanda Tangan Cepat"}
                </h3>
                <div className="text-2xl font-black text-[#003366] mb-3">
                  {dict?.offerings?.free?.price || "Rp 0"}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {dict?.offerings?.free?.desc ||
                    "Solusi cepat untuk dokumen internal, formulir persetujuan, tugas kuliah, dan surat non-litigasi."}
                </p>

                <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                  {(dict?.offerings?.free?.features || [
                    "Stempel tanda tangan transparan",
                    "Hash Integritas Kriptografis SHA-256",
                    "Halaman Bukti Audit resmi",
                    "Unduh langsung tanpa login",
                  ]).map((feat: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleSelectProductTier("free")}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-800 text-xs font-bold transition-all text-center block shadow-2xs hover:bg-slate-50 cursor-pointer"
              >
                {dict?.offerings?.free?.cta || "Mulai Gratis"}
              </button>
            </div>

            {/* Product 2: Tilaka PSrE Certified */}
            <div className="rounded-2xl border-2 border-[#003366] bg-white p-6 flex flex-col justify-between shadow-lg relative overflow-hidden ring-4 ring-blue-50">
              <div className="absolute top-0 right-0 bg-[#003366] text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-bl-xl">
                {dict?.offerings?.psre?.tag || "Direkomendasikan"}
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold">
                    Sah UU ITE
                  </span>
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {dict?.offerings?.psre?.title || "Tanda Tangan PSrE"}
                </h3>
                <div className="text-xl font-black text-[#003366] mb-3">
                  {dict?.offerings?.psre?.price || "Pay-per-Sign via QRIS"}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {dict?.offerings?.psre?.desc ||
                    "Tanda tangan elektronik resmi berinduk Komdigi (Tilaka) dengan kekuatan pembuktian sempurna di pengadilan."}
                </p>

                <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                  {(dict?.offerings?.psre?.features || [
                    "Sah secara hukum di mata UU ITE Pasal 11",
                    "Verifikasi biometrik e-KYC Dukcapil",
                    "Sertifikat digital terenkripsi",
                    "Garansi voucher bila e-KYC gagal",
                  ]).map((feat: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleSelectProductTier("psre")}
                className="w-full py-2.5 px-4 rounded-xl bg-[#003366] hover:bg-[#0B57D0] text-white text-xs font-bold transition-all text-center block shadow-xs cursor-pointer"
              >
                {dict?.offerings?.psre?.cta || "Gunakan Sertifikat PSrE"}
              </button>
            </div>

            {/* Product 3: e-Meterai Resmi Peruri */}
            <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold">
                    {dict?.offerings?.meterai?.tag || "Resmi Peruri"}
                  </span>
                  <Stamp className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {dict?.offerings?.meterai?.title || "Meterai Elektronik"}
                </h3>
                <div className="text-2xl font-black text-[#003366] mb-3">
                  {dict?.offerings?.meterai?.price || "Rp 11.500"}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {dict?.offerings?.meterai?.desc ||
                    "Pembubuhan meterai elektronik resmi untuk dokumen perpajakan, keuangan, dan perjanjian perdata."}
                </p>

                <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                  {(dict?.offerings?.meterai?.features || [
                    "Distribusi resmi terhubung Peruri & DJP",
                    "Nomor seri unik & QR validasi resmi",
                    "Sesuai UU Bea Meterai No. 10/2020",
                    "Penempatan koordinat presisi di PDF",
                  ]).map((feat: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleSelectProductTier("meterai")}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-800 text-xs font-bold transition-all text-center block shadow-2xs hover:bg-slate-50 cursor-pointer"
              >
                {dict?.offerings?.meterai?.cta || "Bubuhkan e-Meterai"}
              </button>
            </div>

            {/* Product 4: Kirim Multi-Signer Anti-Spam */}
            <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-[11px] font-bold">
                    {dict?.offerings?.multi?.tag || "Anti-Phishing"}
                  </span>
                  <Send className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {dict?.offerings?.multi?.title || "Kirim Multi-Signer"}
                </h3>
                <div className="text-sm font-bold text-slate-700 mb-3 pt-2">
                  {dict?.offerings?.multi?.price || "Bayar Per Penanda Tangan"}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {dict?.offerings?.multi?.desc ||
                    "Kirim dokumen kontrak ke rekan bisnis atau klien dengan proteksi verifikasi OTP pengirim."}
                </p>

                <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                  {(dict?.offerings?.multi?.features || [
                    "Verifikasi OTP 6-digit pengirim",
                    "Tautan aman bertoken khusus",
                    "Pelacakan status real-time",
                    "Dokumen final bersegel untuk semua",
                  ]).map((feat: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleSelectProductTier("multi")}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-800 text-xs font-bold transition-all text-center block shadow-2xs hover:bg-slate-50 cursor-pointer"
              >
                {dict?.offerings?.multi?.cta || "Kirim Kontrak Sekarang"}
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION: WORKPLACE USE CASES */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-3">
              <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
              <span>{dict?.useCases?.badge || "SOLUSI WORKPLACE & ENTERPRISE"}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              {dict?.useCases?.title || "Dipercaya Profesional & Perusahaan di Indonesia"}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {dict?.useCases?.subtitle ||
                "Dirancang untuk mengatasi hambatan birokrasi dan cetak dokumen pada lingkungan kerja modern."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(dict?.useCases?.items || [
              {
                role: "Legal, Notaris & Konsultan Hukum",
                headline: "Kepastian Hukum Tanpa Celah",
                desc: "Tandatangani PKS, NDA, dan Surat Kuasa dengan sertifikat digital yang diakui sebagai alat bukti sah di pengadilan (UU ITE).",
              },
              {
                role: "HR & Rekrutmen",
                headline: "Onboarding Karyawan dalam Hitungan Menit",
                desc: "Kirim surat penawaran kerja (Offer Letter), kontrak PKWT/PKWTT, dan pakta integritas ke calon karyawan baru di seluruh Indonesia.",
              },
              {
                role: "Finance, Pajak & Procurement",
                headline: "Faktur & Tagihan Bermeterai Sah",
                desc: "Bubuhkan e-meterai resmi Peruri pada Invoice di atas Rp 5.000.000, Surat Perintah Kerja (SPK), PO, dan Kwitansi sesuai regulasi DJP.",
              },
              {
                role: "Freelancer & Pemilik Bisnis UKM",
                headline: "Tutup Kesepakatan Klien Lebih Cepat",
                desc: "Tandatangani proposal proyek dan perjanjian klien langsung dari ponsel atau laptop tanpa printer atau biaya langganan bulanan.",
              },
            ]).map((item: { role: string; headline: string; desc: string }, idx: number) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 border border-slate-200 shadow-2xs hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-[#003366] uppercase tracking-wider mb-2">
                  <Scale className="w-4 h-4 text-[#0B57D0]" />
                  <span>{item.role}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {item.headline}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION: STATUTORY LEGAL FOUNDATIONS */}
      <section id="legalitas" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold mb-3">
              <Scale className="w-3.5 h-3.5 text-slate-700" />
              <span>{dict?.legalSection?.badge || "KEPATUHAN HUKUM REPUBLIK INDONESIA"}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              {dict?.legalSection?.title || "Landasan Hukum & Kekuatan Pembuktian"}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {dict?.legalSection?.subtitle ||
                "Setiap tanda tangan dan meterai yang diproses melalui EaseSign mematuhi peraturan perundang-undangan Republik Indonesia:"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(dict?.legalSection?.laws || [
              {
                title: "UU No. 1 Tahun 2024 (UU ITE)",
                desc: "Menegaskan kekuatan hukum informasi elektronik dan tanda tangan digital bersertifikat sebagai alat bukti sah di pengadilan.",
              },
              {
                title: "PP No. 71 Tahun 2019 (PSTE)",
                desc: "Mengatur standar operasional Penyelenggara Sertifikasi Elektronik (PSrE) berinduk Komdigi dan identifikasi kepemilikan sertifikat.",
              },
              {
                title: "UU No. 10 Tahun 2020 (Bea Meterai)",
                desc: "Memberikan landasan legal pemungutan bea meterai atas dokumen perdata dan perpajakan elektronik menggunakan Meterai Elektronik.",
              },
              {
                title: "UU No. 27 Tahun 2022 (UU PDP)",
                desc: "Menjamin kerahasiaan data pribadi, NIK, serta pemusnahan otomatis dokumen pengguna tamu setelah 48 jam.",
              },
            ]).map((law: { title: string; desc: string }, idx: number) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 flex flex-col justify-start"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#003366] flex items-center justify-center font-bold text-xs mb-4">
                  0{idx + 1}
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">
                  {law.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {law.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CORPORATE CLIENTS LOGO STRIP */}
      <section className="py-16 bg-slate-100/60 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
            Dipercaya oleh Institusi BUMN & Korporasi Terkemuka
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-70 grayscale hover:grayscale-0 transition-all">
            {corporateClients.map((client, idx) => (
              <div key={idx} className="h-8 w-24 relative">
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: FAQ */}
      <FaqSection dict={dict.faq} />
    </main>
  );
}
