"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Rnd } from "react-rnd";
import { PDFDocument, rgb } from "pdf-lib";
import {
  FileText,
  Download,
  PenLine,
  Move,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Stamp,
  CheckCircle2,
  ShieldCheck,
  Users,
} from "lucide-react";

import SignaturePadModal from "./SignaturePadModal";
import AuditTrailBadge from "./AuditTrailBadge";
import PaywallDrawer from "./PaywallDrawer";
import MultiSignerDrawer from "./MultiSignerDrawer";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface SigningStudioWorkspaceProps {
  pdfFile: File;
  initialTier?: "free" | "psre" | "meterai" | "multi";
  onDiscard: () => void;
  lang?: string;
  dict?: any;
}

export default function SigningStudioWorkspace({
  pdfFile,
  initialTier = "free",
  onDiscard,
  lang = "id",
}: SigningStudioWorkspaceProps) {
  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const [signatureUrl, setSignatureUrl] = useState<string | null>(null);
  const [signingTier, setSigningTier] = useState<"free" | "psre" | "meterai" | "multi">(initialTier);

  // Meterai state
  const [hasMeterai, setHasMeterai] = useState(initialTier === "meterai");
  const [meteraiPos, setMeteraiPos] = useState({ x: 80, y: 150 });

  // Modals & Drawers
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [showPaywallDrawer, setShowPaywallDrawer] = useState(false);
  const [showMultiSignerDrawer, setShowMultiSignerDrawer] = useState(false);

  // PDF Page & Canvas state
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [signaturePos, setSignaturePos] = useState({ x: 50, y: 50 });
  const [imageSize, setImageSize] = useState({ width: 160, height: 60 });
  const [isProcessing, setIsProcessing] = useState(false);
  const [domReady, setDomReady] = useState(false);
  const [pageWidth, setPageWidth] = useState(800);
  const [showSignatureHint, setShowSignatureHint] = useState(true);

  const documentWrapperRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);

  // Auto-prompt initial modal based on initial tier
  useEffect(() => {
    if (initialTier === "meterai") {
      setHasMeterai(true);
      setSigningTier("meterai");
    } else if (initialTier === "multi") {
      setSigningTier("multi");
      setShowMultiSignerDrawer(true);
    } else {
      setShowSignatureModal(true);
    }
  }, [initialTier]);

  useEffect(() => {
    setDomReady(true);
    const updateWidth = () => {
      setPageWidth(Math.min(window.innerWidth - 48, 840));
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Compute image ratio, center signature on PDF
  useEffect(() => {
    if (signatureUrl) {
      const img = new window.Image();
      img.onload = () => {
        const ratio = img.height / img.width;
        const newWidth = 160;
        const newHeight = Math.max(40, Math.round(160 * ratio));
        setImageSize({ width: newWidth, height: newHeight });

        const wrapperEl = documentWrapperRef.current;
        if (wrapperEl) {
          const wrapperWidth = wrapperEl.clientWidth;
          const wrapperHeight = wrapperEl.clientHeight;
          setSignaturePos({
            x: Math.max(0, Math.round((wrapperWidth - newWidth) / 2)),
            y: Math.max(20, Math.round((wrapperHeight - newHeight) / 3)),
          });
        } else {
          setSignaturePos({
            x: Math.max(0, Math.round((pageWidth - newWidth) / 2)),
            y: 100,
          });
        }

        setShowSignatureHint(true);
      };
      img.src = signatureUrl;
    }
  }, [signatureUrl, pageWidth]);

  // Auto-dismiss hint after 5 seconds
  useEffect(() => {
    if (showSignatureHint && signatureUrl) {
      const timer = setTimeout(() => setShowSignatureHint(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showSignatureHint, signatureUrl]);

  const dismissHint = useCallback(() => {
    setShowSignatureHint(false);
  }, []);

  const handleSignatureReady = (file: File, url: string) => {
    setSignatureFile(file);
    setSignatureUrl(url);
  };

  const executePdfDownload = async () => {
    if (!pdfFile) return;
    setIsProcessing(true);

    try {
      const existingPdfBytes = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();
      const currentPage = pages[pageNumber - 1];

      const mbWidth = currentPage.getWidth();
      const mbHeight = currentPage.getHeight();
      const wrapperEl = documentWrapperRef.current;
      const renderedW = wrapperEl ? wrapperEl.clientWidth : pageWidth;
      const renderedH = wrapperEl ? wrapperEl.clientHeight : (pageWidth * 1.414);
      const scaleX = mbWidth / renderedW;
      const scaleY = mbHeight / renderedH;

      // 1. Embed signature if present
      if (signatureFile) {
        const signatureBytes = await signatureFile.arrayBuffer();
        let signatureImage;
        if (signatureFile.type === "image/png") {
          signatureImage = await pdfDoc.embedPng(signatureBytes);
        } else {
          signatureImage = await pdfDoc.embedJpg(signatureBytes);
        }

        const finalX = signaturePos.x * scaleX;
        const finalY = mbHeight - (signaturePos.y * scaleY) - (imageSize.height * scaleY);
        const finalW = imageSize.width * scaleX;
        const finalH = imageSize.height * scaleY;

        currentPage.drawImage(signatureImage, {
          x: finalX,
          y: finalY,
          width: finalW,
          height: finalH,
        });
      }

      // 2. Embed e-Meterai seal if activated
      if (hasMeterai || signingTier === "meterai") {
        const mX = meteraiPos.x * scaleX;
        const mY = mbHeight - (meteraiPos.y * scaleY) - (105 * scaleY);
        const mW = 105 * scaleX;
        const mH = 105 * scaleY;

        currentPage.drawRectangle({
          x: mX,
          y: mY,
          width: mW,
          height: mH,
          borderColor: rgb(0.85, 0.55, 0.1),
          borderWidth: 1.5,
          color: rgb(0.99, 0.97, 0.9),
          opacity: 0.85,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `EaseSign-${pdfFile.name.replace(/\.[^/.]+$/, "")}-Signed.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        setIsProcessing(false);
      }, 800);
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert(lang === "id" ? "Gagal memproses dokumen PDF." : "Failed to process PDF document.");
      setIsProcessing(false);
    }
  };

  const handleFinishAction = () => {
    if (signingTier === "free") {
      executePdfDownload();
    } else if (signingTier === "multi") {
      setShowMultiSignerDrawer(true);
    } else {
      setShowPaywallDrawer(true);
    }
  };

  return (
    <div ref={workspaceRef} className="flex-1 flex flex-col bg-[#EEF2F6] min-h-[calc(100vh-4rem)] animate-in fade-in duration-200">
      {/* Sticky Executive Studio Bar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Back/Discard button & File Info */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={onDiscard}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200 cursor-pointer"
              title={lang === "id" ? "Ganti Dokumen" : "Change Document"}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{lang === "id" ? "Ganti Dokumen" : "Change File"}</span>
            </button>

            <div className="flex items-center gap-2 min-w-0">
              <div className="p-1.5 rounded-md bg-blue-50 text-[#003366] shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 text-xs sm:text-sm truncate max-w-[120px] sm:max-w-xs">
                {pdfFile.name}
              </span>
            </div>

            {/* Page Navigation */}
            {numPages && numPages > 1 && (
              <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg text-xs font-bold text-slate-700 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                  disabled={pageNumber <= 1}
                  className="p-1 hover:bg-white rounded disabled:opacity-30 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="px-1.5 whitespace-nowrap">
                  {pageNumber} / {numPages}
                </span>
                <button
                  type="button"
                  onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
                  disabled={pageNumber >= numPages}
                  className="p-1 hover:bg-white rounded disabled:opacity-30 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Center: Service Tier Segmented Switcher */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold overflow-x-auto">
            <button
              type="button"
              onClick={() => setSigningTier("free")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                signingTier === "free"
                  ? "bg-white text-[#003366] font-bold shadow-xs border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              ✍️ Cepat (Rp 0)
            </button>
            <button
              type="button"
              onClick={() => setSigningTier("psre")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                signingTier === "psre"
                  ? "bg-emerald-50 text-emerald-800 font-bold shadow-xs border border-emerald-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🛡️ PSrE UU ITE
            </button>
            <button
              type="button"
              onClick={() => {
                setHasMeterai((prev) => !prev);
                if (!hasMeterai) setSigningTier("meterai");
              }}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                hasMeterai || signingTier === "meterai"
                  ? "bg-amber-100 text-amber-950 font-bold border border-amber-300 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Stamp className="w-3 h-3 text-amber-700" />
              <span>+ e-Meterai</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSigningTier("multi");
                setShowMultiSignerDrawer(true);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                signingTier === "multi"
                  ? "bg-purple-50 text-purple-900 font-bold shadow-xs border border-purple-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Users className="w-3 h-3 text-purple-700" />
              <span>Multi-Signer</span>
            </button>
          </div>

          {/* Right: Signature tool + Finish Action */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => setShowSignatureModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-800 text-xs font-bold transition-all shadow-2xs hover:bg-slate-50 cursor-pointer"
            >
              <PenLine className="w-3.5 h-3.5 text-[#003366]" />
              <span>
                {signatureUrl
                  ? lang === "id"
                    ? "Ubah Tanda Tangan"
                    : "Change Signature"
                  : lang === "id"
                  ? "Tambah Tanda Tangan"
                  : "Add Signature"}
              </span>
            </button>

            <button
              type="button"
              onClick={handleFinishAction}
              disabled={isProcessing || (signingTier === "free" && !signatureUrl)}
              className={`font-bold text-xs px-4 sm:px-5 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                signingTier === "free"
                  ? "bg-[#003366] hover:bg-[#0B57D0] text-white"
                  : signingTier === "psre"
                  ? "bg-emerald-700 hover:bg-emerald-800 text-white"
                  : signingTier === "meterai"
                  ? "bg-amber-700 hover:bg-amber-800 text-white"
                  : "bg-purple-700 hover:bg-purple-800 text-white"
              }`}
            >
              {signingTier === "free" ? (
                <Download className="w-4 h-4" />
              ) : signingTier === "multi" ? (
                <Users className="w-4 h-4" />
              ) : (
                <ShieldCheck className="w-4 h-4" />
              )}
              <span>
                {isProcessing
                  ? lang === "id"
                    ? "Memproses..."
                    : "Processing..."
                  : signingTier === "free"
                  ? lang === "id"
                    ? "Unduh PDF Gratis"
                    : "Download PDF"
                  : signingTier === "psre"
                  ? lang === "id"
                    ? "Lanjut ke QRIS (Rp 15.000)"
                    : "Proceed to QRIS"
                  : signingTier === "meterai"
                  ? lang === "id"
                    ? "Lanjut Bayar e-Meterai (Rp 11.500)"
                    : "Pay e-Meterai"
                  : lang === "id"
                  ? "Kirim ke Banyak Pihak"
                  : "Send to Signers"}
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* Document Canvas Render Area */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex flex-col items-center justify-start">
        {domReady && (
          <div
            ref={documentWrapperRef}
            className="relative inline-block max-w-full select-none bg-white p-2 rounded-xl shadow-lg border border-slate-300/80 mb-8"
          >
            <Document
              file={pdfFile}
              onLoadSuccess={({ numPages: total }) => setNumPages(total)}
              loading={
                <div className="p-16 text-slate-500 text-sm font-medium animate-pulse text-center">
                  {lang === "id" ? "Memuat halaman PDF..." : "Loading PDF..."}
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                width={pageWidth}
                className="bg-white [&>canvas]:block rounded"
              />
            </Document>

            {/* Draggable & Resizable Signature Overlay */}
            {signatureUrl && (
              <Rnd
                bounds="parent"
                position={{ x: signaturePos.x, y: signaturePos.y }}
                size={{ width: imageSize.width, height: imageSize.height }}
                onDragStart={dismissHint}
                onDragStop={(e, d) => setSignaturePos({ x: d.x, y: d.y })}
                onResizeStart={dismissHint}
                onResizeStop={(e, direction, ref, delta, position) => {
                  setImageSize({
                    width: parseInt(ref.style.width, 10),
                    height: parseInt(ref.style.height, 10),
                  });
                  setSignaturePos(position);
                }}
                lockAspectRatio={true}
                className={`z-20 cursor-move border-2 border-dashed rounded ${
                  showSignatureHint
                    ? "border-[#0B57D0] bg-blue-500/10"
                    : "border-[#003366] hover:border-[#0B57D0] bg-transparent"
                } transition-colors`}
                style={{ overflow: "visible" }}
              >
                <img
                  src={signatureUrl}
                  alt="Tanda Tangan"
                  className="w-full h-full object-contain pointer-events-none"
                />

                {/* Corner Indicators */}
                <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#003366] rounded-full border-2 border-white shadow-xs pointer-events-none" />
                <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#003366] rounded-full border-2 border-white shadow-xs pointer-events-none" />
                <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#003366] rounded-full border-2 border-white shadow-xs pointer-events-none" />
                <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#003366] rounded-full border-2 border-white shadow-xs pointer-events-none" />

                {/* Hint tooltip */}
                {showSignatureHint && (
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg border border-slate-700 pointer-events-none z-30">
                    <span className="flex items-center gap-1.5">
                      <Move className="w-3 h-3 text-blue-400" />
                      <span>{lang === "id" ? "Geser & atur ukuran tanda tangan" : "Drag to move or resize"}</span>
                    </span>
                  </div>
                )}
              </Rnd>
            )}

            {/* Draggable e-Meterai Peruri Stamp Overlay */}
            {(hasMeterai || signingTier === "meterai") && (
              <Rnd
                bounds="parent"
                position={{ x: meteraiPos.x, y: meteraiPos.y }}
                size={{ width: 110, height: 110 }}
                onDragStop={(e, d) => setMeteraiPos({ x: d.x, y: d.y })}
                enableResizing={false}
                className="z-20 cursor-move border-2 border-dashed border-amber-600 rounded-xl bg-amber-500/10 shadow-md transition-shadow hover:shadow-lg"
                style={{ overflow: "visible" }}
              >
                <div className="w-full h-full p-2 flex flex-col items-center justify-between text-center select-none bg-white/95 rounded-lg border border-amber-300 relative group">
                  <div className="flex items-center justify-between w-full text-[8px] font-extrabold text-amber-900 border-b border-amber-200/80 pb-0.5">
                    <span>METERAI</span>
                    <span className="text-red-600 font-black">ELEKTRONIK</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-300 flex items-center justify-center my-0.5 shadow-2xs">
                    <Stamp className="w-4 h-4 text-amber-700" />
                  </div>
                  <div className="text-[12px] font-black text-slate-900 tracking-tight leading-none">
                    10000
                  </div>
                  <div className="text-[7px] text-slate-500 font-mono tracking-tighter">
                    RESMI PERURI & DJP
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setHasMeterai(false);
                      if (signingTier === "meterai") setSigningTier("free");
                    }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow cursor-pointer text-xs font-bold leading-none"
                    title="Hapus e-Meterai"
                  >
                    ×
                  </button>
                </div>
              </Rnd>
            )}
          </div>
        )}

        {/* Audit Trail info below canvas */}
        <div className="max-w-2xl w-full mb-12">
          <AuditTrailBadge
            lang={lang}
            tier={signingTier}
            onUpgradeClick={() => {
              setSigningTier("psre");
              setShowPaywallDrawer(true);
            }}
          />
        </div>
      </div>

      {/* Signature Creation Modal */}
      <SignaturePadModal
        isOpen={showSignatureModal}
        onClose={() => setShowSignatureModal(false)}
        onSignatureReady={handleSignatureReady}
        lang={lang}
      />

      {/* Paywall Drawer (QRIS for PSrE and e-Meterai) */}
      <PaywallDrawer
        isOpen={showPaywallDrawer}
        onClose={() => setShowPaywallDrawer(false)}
        type={signingTier === "meterai" ? "meterai" : "psre"}
        onPaymentSuccess={({ email }) => {
          alert(
            lang === "id"
              ? `Pembayaran berhasil terverifikasi untuk ${email}. Dokumen resmi telah berhasil diproses.`
              : `Payment confirmed for ${email}. Document successfully processed.`
          );
          executePdfDownload();
        }}
        lang={lang}
      />

      {/* Multi-Signer Sending Drawer */}
      <MultiSignerDrawer
        isOpen={showMultiSignerDrawer}
        onClose={() => setShowMultiSignerDrawer(false)}
        onSuccess={({ signers, senderEmail }) => {
          alert(
            lang === "id"
              ? `Dokumen berhasil dikirim ke ${signers.length} penerima! Tautan undangan resmi telah dikirim ke email masing-masing penanda tangan.`
              : `Document successfully sent to ${signers.length} signers! Official invitation links have been dispatched.`
          );
        }}
        lang={lang}
      />
    </div>
  );
}
