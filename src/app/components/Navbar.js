"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

const Navbar = ({ lang = "id", dict = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const redirectedPathName = (locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const isActive = (path) => {
    if (!pathname) return false;
    return pathname === `/${lang}${path}` || (path === "" && pathname === `/${lang}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-slate-200/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left: Brand + Status Chip */}
          <div className="flex items-center gap-3.5 lg:gap-4 shrink-0">
            <Link href={`/${lang}`} className="flex items-center focus:outline-none">
              <div className="relative h-8 w-32 sm:w-36">
                <Image
                  src="/easesign-logo.png"
                  alt="EaseSign"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </div>
            </Link>

            {/* Regulatory Live Status Pill */}
            <div className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-tight bg-emerald-50 text-emerald-800 border border-emerald-200/80 whitespace-nowrap select-none">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600"></span>
              </span>
              <span>{dict?.badgeOfficial || "PSrE Komdigi"}</span>
            </div>
          </div>

          {/* Center: Navigation Links (Strictly No Wrapping) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            <Link
              href={`/${lang}/sign-pdf`}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-medium tracking-tight whitespace-nowrap transition-all duration-150 ${isActive("/sign-pdf")
                  ? "text-[#003366] bg-slate-100/90 font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                }`}
            >
              {dict?.signPdf || "Tanda Tangan Online"}
            </Link>
            <a
              href={`/${lang}#layanan`}
              className="px-3 py-1.5 rounded-lg text-[13px] font-medium tracking-tight whitespace-nowrap text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 transition-all duration-150"
            >
              {dict?.emeterai || "Beli e-Meterai"}
            </a>
            <a
              href={`/${lang}#legalitas`}
              className="px-3 py-1.5 rounded-lg text-[13px] font-medium tracking-tight whitespace-nowrap text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 transition-all duration-150"
            >
              {dict?.legality || "Keabsahan Hukum"}
            </a>
            <a
              href={`/${lang}#faq`}
              className="px-3 py-1.5 rounded-lg text-[13px] font-medium tracking-tight whitespace-nowrap text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 transition-all duration-150"
            >
              {dict?.faq || "FAQ"}
            </a>
            <Link
              href={`/${lang}/contact-us`}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-medium tracking-tight whitespace-nowrap transition-all duration-150 ${isActive("/contact-us")
                  ? "text-[#003366] bg-slate-100/90 font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                }`}
            >
              {dict?.contact || "Kontak"}
            </Link>
          </nav>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Minimalist Language Switcher */}
            <div className="flex items-center bg-slate-100/90 p-0.5 rounded-full border border-slate-200/70 text-[11px] font-bold text-slate-600">
              <Link
                href={redirectedPathName("id")}
                className={`px-2.5 py-0.5 rounded-full transition-all duration-150 ${lang === "id"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "hover:text-slate-900"
                  }`}
              >
                ID
              </Link>
              <Link
                href={redirectedPathName("en")}
                className={`px-2.5 py-0.5 rounded-full transition-all duration-150 ${lang === "en"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "hover:text-slate-900"
                  }`}
              >
                EN
              </Link>
            </div>

            {/* Console Login Link */}
            <a
              href="https://dev-console.easesign.site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium text-slate-600 hover:text-slate-900 px-2.5 py-1.5 transition-colors whitespace-nowrap"
            >
              {dict?.consoleLogin || "Masuk Console"}
            </a>

            {/* Sleek Primary Button */}
            <Link
              href={`/${lang}/sign-pdf`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-[#003366] px-4 py-2 rounded-full shadow-xs hover:shadow transition-all duration-200 whitespace-nowrap"
            >
              <span>{dict?.startFree || "Mulai Gratis"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            {/* Language Switcher Mobile */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200 text-[11px] font-bold">
              <Link
                href={redirectedPathName("id")}
                className={`px-2 py-0.5 rounded-full ${lang === "id" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500"
                  }`}
              >
                ID
              </Link>
              <Link
                href={redirectedPathName("en")}
                className={`px-2 py-0.5 rounded-full ${lang === "en" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500"
                  }`}
              >
                EN
              </Link>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-5 py-4 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
            <span>{dict?.badgeOfficial || "PSrE Berinduk Komdigi"}</span>
          </div>

          <div className="space-y-1 pt-1">
            <Link
              href={`/${lang}/sign-pdf`}
              className={`block px-3 py-2 rounded-lg text-sm font-medium ${isActive("/sign-pdf")
                  ? "bg-slate-100 text-[#003366] font-semibold"
                  : "text-slate-700 hover:bg-slate-50"
                }`}
              onClick={() => setIsOpen(false)}
            >
              {dict?.signPdf || "Tanda Tangan Online"}
            </Link>
            <a
              href={`/${lang}#layanan`}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              onClick={() => setIsOpen(false)}
            >
              {dict?.emeterai || "Beli e-Meterai"}
            </a>
            <a
              href={`/${lang}#legalitas`}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              onClick={() => setIsOpen(false)}
            >
              {dict?.legality || "Keabsahan Hukum"}
            </a>
            <a
              href={`/${lang}#faq`}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              onClick={() => setIsOpen(false)}
            >
              {dict?.faq || "FAQ"}
            </a>
            <Link
              href={`/${lang}/contact-us`}
              className={`block px-3 py-2 rounded-lg text-sm font-medium ${isActive("/contact-us")
                  ? "bg-slate-100 text-[#003366] font-semibold"
                  : "text-slate-700 hover:bg-slate-50"
                }`}
              onClick={() => setIsOpen(false)}
            >
              {dict?.contact || "Kontak Kami"}
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="https://dev-console.easesign.site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              onClick={() => setIsOpen(false)}
            >
              {dict?.consoleLogin || "Masuk Console"}
            </a>
            <Link
              href={`/${lang}/sign-pdf`}
              className="text-center py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-[#003366] transition-colors shadow-xs"
              onClick={() => setIsOpen(false)}
            >
              {dict?.startFree || "Mulai Gratis"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
