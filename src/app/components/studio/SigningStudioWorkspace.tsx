"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Rnd } from "react-rnd";
import { PDFDocument, degrees } from "pdf-lib";
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
} from "lucide-react";

import SignaturePadModal from "./SignaturePadModal";
import AuditTrailBadge from "./AuditTrailBadge";
import PaywallDrawer from "./PaywallDrawer";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface SigningStudioWorkspaceProps {
  pdfFile: File;
  onDiscard: () => void;
  lang?: string;
  dict?: any;
}

export default function SigningStudioWorkspace({
  pdfFile,
  onDiscard,
  lang = "id",
}: SigningStudioWorkspaceProps) {
  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const [signatureUrl, setSignatureUrl] = useState<string | null>(null);
  const [signingTier, setSigningTier] = useState<"free" | "psre" | "meterai">("free");

  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [showPaywallDrawer, setShowPaywallDrawer] = useState(false);

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

  // Auto-prompt signature modal on initial document mount
  useEffect(() => {
    setShowSignatureModal(true);
  }, []);

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
    if (!pdfFile || !signatureFile) return;
    setIsProcessing(true);

    try {
      const existingPdfBytes = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      const signatureBytes = await signatureFile.arrayBuffer();
      let signatureImage;
      if (signatureFile.type === "image/png") {
        signatureImage = await pdfDoc.embedPng(signatureBytes);
      } else {
        signatureImage = await pdfDoc.embedJpg(signatureBytes);
      }

      const pages = pdfDoc.getPages();
      const currentPage = pages[pageNumber - 1];

      const mbWidth = currentPage.getWidth();
      const mbHeight = currentPage.getHeight();

      const rotAngle = currentPage.getRotation().angle;
      const isRotated = rotAngle === 90 || rotAngle === 270;

      const visWidth = isRotated ? mbHeight : mbWidth;
      const visHeight = isRotated ? mbWidth : mbHeight;

      const canvasElement = documentWrapperRef.current?.querySelector("canvas");
      if (!canvasElement) {
        setIsProcessing(false);
        return;
      }

      const canvasW = canvasElement.clientWidth;
      const canvasH = canvasElement.clientHeight;

      const scaleX = visWidth / canvasW;
      const scaleY = visHeight / canvasH;

      const canvasRect = canvasElement.getBoundingClientRect();
      const wrapperRect = documentWrapperRef.current?.getBoundingClientRect() || canvasRect;
      const sigVisX = (signaturePos.x - (canvasRect.left - wrapperRect.left)) * scaleX;
      const sigVisY = (signaturePos.y - (canvasRect.top - wrapperRect.top)) * scaleY;
      const sigVisW = imageSize.width * scaleX;
      const sigVisH = imageSize.height * scaleY;

      let finalX, finalY, finalW, finalH, imgRotation;

      switch (rotAngle) {
        case 90:
          finalX = sigVisY;
          finalY = sigVisX;
          finalW = sigVisH;
          finalH = sigVisW;
          imgRotation = degrees(-90);
          break;
        case 180:
          finalX = mbWidth - sigVisX - sigVisW;
          finalY = sigVisY;
          finalW = sigVisW;
          finalH = sigVisH;
          imgRotation = degrees(-180);
          break;
        case 270:
          finalX = mbWidth - sigVisY - sigVisH;
          finalY = mbHeight - sigVisX - sigVisW;
          finalW = sigVisH;
          finalH = sigVisW;
          imgRotation = degrees(-270);
          break;
        default:
          finalX = sigVisX;
          finalY = visHeight - sigVisY - sigVisH;
          finalW = sigVisW;
          finalH = sigVisH;
          imgRotation = degrees(0);
          break;
      }

      currentPage.drawImage(signatureImage, {
        x: finalX,
        y: finalY,
        width: finalW,
        height: finalH,
        rotate: imgRotation,
      });

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
              <span className="font-bold text-slate-900 text-xs sm:text-sm truncate max-w-[150px] sm:max-w-xs">
                {pdfFile.name}
              </span>
            </div>

            {/* Page Navigation */}
            {numPages && numPages > 1 && (
              <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg text-xs font-bold text-slate-700 border border-slate-200">
                <button
                  onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                  disabled={pageNumber <= 1}
                  className="p-1 hover:bg-white rounded disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="px-1.5 whitespace-nowrap">
                  {pageNumber} / {numPages}
                </span>
                <button
                  onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
                  disabled={pageNumber >= numPages}
                  className="p-1 hover:bg-white rounded disabled:opacity-30 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Right: Signature & Stamp tools + Finish Action */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => setShowSignatureModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-800 text-xs font-bold transition-all shadow-2xs hover:bg-slate-50"
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
              onClick={() => {
                setSigningTier("meterai");
                setShowPaywallDrawer(true);
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-amber-200 bg-amber-50/70 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-all shadow-2xs"
            >
              <Stamp className="w-3.5 h-3.5 text-amber-700" />
              <span>+ e-Meterai</span>
            </button>

            <button
              type="button"
              onClick={handleFinishAction}
              disabled={isProcessing || !signatureUrl}
              className="bg-[#003366] hover:bg-[#0B57D0] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs px-4 sm:px-5 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>
                {isProcessing
                  ? lang === "id"
                    ? "Memproses..."
                    : "Processing..."
                  : signingTier === "free"
                  ? lang === "id"
                    ? "Unduh PDF Gratis"
                    : "Download PDF"
                  : lang === "id"
                  ? "Lanjut ke Pembayaran"
                  : "Proceed to Payment"}
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
          </div>
        )}

        {/* Audit Trail info below canvas */}
        <div className="max-w-2xl w-full mb-12">
          <AuditTrailBadge
            lang={lang}
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

      {/* Paywall Drawer (QRIS) */}
      <PaywallDrawer
        isOpen={showPaywallDrawer}
        onClose={() => setShowPaywallDrawer(false)}
        type={signingTier === "meterai" ? "meterai" : "psre"}
        onPaymentSuccess={({ email }) => {
          alert(
            lang === "id"
              ? `Pembayaran berhasil terverifikasi untuk ${email}. Sertifikat resmi Tilaka PSrE telah dibubuhkan.`
              : `Payment confirmed for ${email}. Tilaka PSrE certificate successfully applied.`
          );
          executePdfDownload();
        }}
        lang={lang}
      />
    </div>
  );
}
