"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqSectionProps {
  dict?: {
    badge?: string;
    title?: string;
    subtitle?: string;
    items?: FaqItem[];
  };
}

export default function FaqSection({ dict = {} }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  const items = dict?.items || [
    {
      q: "Apakah tanda tangan di EaseSign sah di mata hukum Indonesia?",
      a: "Ya. Untuk dokumen berkekuatan hukum penuh di pengadilan, pilih layanan Tanda Tangan Bersertifikat PSrE (Tilaka) yang telah berizin resmi Komdigi sesuai UU ITE Pasal 11. Untuk dokumen persetujuan internal harian, Anda dapat menggunakan layanan Tanda Tangan Cepat gratis yang dilengkapi hash kriptografi SHA-256 dan Halaman Bukti Audit.",
    },
    {
      q: "Apakah saya harus membuat akun untuk menandatangani dokumen?",
      a: "Tidak. EaseSign menganut sistem Guest / No-Login Signing. Anda dapat langsung mengunggah file PDF, menempatkan tanda tangan atau e-meterai, dan membayar biaya per dokumen via QRIS tanpa hambatan registrasi.",
    },
    {
      q: "Bagaimana cara pembayaran jika memilih tanda tangan PSrE atau e-Meterai?",
      a: "Setelah menempatkan tanda tangan atau meterai pada posisi yang diinginkan, sistem akan menampilkan kode QRIS dinamis. Anda dapat membayar secara instan menggunakan BCA Mobile, Livin by Mandiri, GoPay, OVO, ShopeePay, Dana, atau aplikasi m-banking apa pun.",
    },
    {
      q: "Bagaimana jika saya tidak sengaja menutup browser setelah membayar?",
      a: "Begitu kode QRIS dibuat, sistem mengirimkan tautan pemulihan (Magic Link) ke alamat email Anda. Anda dapat membuka email tersebut dan langsung melanjutkan proses penandatanganan dari status terakhir.",
    },
    {
      q: "Berapa lama dokumen saya tersimpan di sistem EaseSign?",
      a: "Sesuai dengan kepatuhan UU Pelindungan Data Pribadi (UU PDP), dokumen milik pengguna tamu yang tidak diklaim akan terhapus otomatis dari penyimpanan kami setelah 48 jam. Jika Anda ingin menyimpannya permanen di vault, Anda cukup memasukkan password setelah proses unduh selesai.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#003366] text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#0B57D0]" />
            <span>{dict?.badge || "PUSAT BANTUAN & FAQ"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
            {dict?.title || "Pertanyaan yang Sering Diajukan"}
          </h2>
          <p className="text-sm text-slate-600">
            {dict?.subtitle || "Informasi penting mengenai legalitas, cara pembayaran, dan alur penggunaan."}
          </p>
        </div>

        {/* Accordion Items */}
        <div className="space-y-3">
          {items.map((item: FaqItem, idx: number) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 text-sm sm:text-base hover:text-[#003366] transition-colors"
                >
                  <span className="pr-4">{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#003366]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
