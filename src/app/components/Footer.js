import Image from "next/image";
import Link from "next/link";
import { Shield, Building2, Mail, Phone, ExternalLink } from "lucide-react";

const Footer = ({ lang = 'id', dict = {} }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 font-sans border-t border-slate-800 text-sm">
      {/* Regulatory & Partner Trust Strip */}
      <div className="border-b border-slate-800 bg-slate-950/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-950/80 border border-blue-800/50 text-blue-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">
                Penyelenggara Sistem Elektronik (PSE) Terdaftar Komdigi
              </p>
              <p className="text-xs text-slate-400">
                Mematuhi UU ITE No. 1/2024, PP No. 71/2019 & UU Bea Meterai No. 10/2020
              </p>
            </div>
          </div>

          {/* Official Partner Badges */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 opacity-90">
            <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
              <span className="text-[11px] font-bold text-slate-300">PSrE:</span>
              <span className="text-[11px] font-extrabold text-white tracking-wide">Tilaka PSrE</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
              <span className="text-[11px] font-bold text-slate-300">Meterai:</span>
              <span className="text-[11px] font-extrabold text-white tracking-wide">PERURI</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
              <span className="text-[11px] font-bold text-slate-300">Verifikasi:</span>
              <span className="text-[11px] font-extrabold text-white tracking-wide">Dukcapil Kemendagri</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
              <span className="text-[11px] font-bold text-slate-300">Pembayaran:</span>
              <span className="text-[11px] font-extrabold text-white tracking-wide">QRIS Nasional</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <div className="h-9 w-36 relative">
              <Image
                src="/easesign-white.png"
                alt="EaseSign"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              {dict.company || "PT Paramita Digital Nusantara"}
            </p>
            <p className="text-xs leading-relaxed text-slate-400">
              {dict.tagline || "Solusi tanda tangan digital tersertifikasi PSrE dan meterai elektronik resmi Indonesia. Cepat, instan, dan sah menurut UU ITE."}
            </p>
            <div className="pt-2">
              <Link
                href={`/${lang}/privacy-policy`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span>{dict.privacyNotice || "Kebijakan Privasi & UU PDP"}</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Column 2: Layanan Dokumen */}
          <div>
            <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-4">
              Layanan Utama
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href={`/${lang}/sign-pdf`} className="hover:text-white transition-colors">
                  Tanda Tangan Cepat Gratis (Cosmetic)
                </Link>
              </li>
              <li>
                <Link href={`/${lang}#layanan`} className="hover:text-white transition-colors">
                  Tanda Tangan Bersertifikat Tilaka PSrE
                </Link>
              </li>
              <li>
                <Link href={`/${lang}#layanan`} className="hover:text-white transition-colors">
                  Pembubuhan e-Meterai Resmi Peruri
                </Link>
              </li>
              <li>
                <Link href={`/${lang}#layanan`} className="hover:text-white transition-colors">
                  Kirim Multi-Signer (Anti-Phishing OTP)
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact-us`} className="hover:text-white transition-colors">
                  Hubungi Kami & Konsultasi Dokumen
                </Link>
              </li>
              <li>
                <a
                  href="https://dev-console.easesign.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-blue-400 font-semibold"
                >
                  Portal Console B2B / Enterprise →
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legalitas & Kepatuhan */}
          <div>
            <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-4">
              Dasar Hukum Indonesia
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>UU No. 1 Tahun 2024 (Perubahan UU ITE)</li>
              <li>PP No. 71 Tahun 2019 (Penyelenggaraan STE)</li>
              <li>UU No. 10 Tahun 2020 (Bea Meterai Elektronik)</li>
              <li>UU No. 27 Tahun 2022 (Pelindungan Data Pribadi)</li>
              <li>Standar Kriptografi SHA-256 & ISO 27001</li>
            </ul>
          </div>

          {/* Column 4: Kontak Kantor Operasional */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-4">
              Kantor Pusat
            </h3>
            <div className="flex items-start gap-2.5 text-xs text-slate-400">
              <Building2 className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <span>
                Dea Tower II, Lantai 15 Suite<br />
                Jl. Mega Kuningan Barat Kav. E4.3 No. 1-2<br />
                Jakarta Selatan, DKI Jakarta 12950
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-400 pt-1">
              <Phone className="w-4 h-4 text-slate-500 shrink-0" />
              <span>021 - 38915110</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <Mail className="w-4 h-4 text-slate-500 shrink-0" />
              <a href="mailto:info@easesign.id" className="hover:text-white transition-colors">
                info@easesign.id
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Sub-footer Copyright */}
      <div className="border-t border-slate-800/80 bg-slate-950 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} PT Paramita Digital Nusantara. {dict.allRights || "Hak Cipta Dilindungi Undang-Undang."}
          </p>
          <div className="flex items-center gap-6">
            <Link href={`/${lang}/privacy-policy`} className="hover:text-slate-300 transition-colors">
              {dict.privacyNotice || "Kebijakan Privasi"}
            </Link>
            <a
              href="https://www.linkedin.com/company/easesign-id/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
