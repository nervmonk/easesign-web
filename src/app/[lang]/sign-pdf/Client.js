"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Rnd } from 'react-rnd';
import { PDFDocument, degrees } from 'pdf-lib';
import { UploadCloud, FileText, Download, PenLine, Image as ImageIcon, ShieldCheck, Move } from "lucide-react";

// Configure pdfjs worker to use CDN to avoid next.js turbopack issues
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function SignPdfPage({ lang = 'id', dict = {}, navbarDict = {} }) {
    const [pdfFile, setPdfFile] = useState(null);
    const [signatureFile, setSignatureFile] = useState(null);
    const [signatureUrl, setSignatureUrl] = useState(null);
    const [showSignatureModal, setShowSignatureModal] = useState(false);
    const [modalTab, setModalTab] = useState("upload");

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [signaturePos, setSignaturePos] = useState({ x: 50, y: 50 });
    const [imageSize, setImageSize] = useState({ width: 150, height: 50 });
    const [isProcessing, setIsProcessing] = useState(false);
    const [domReady, setDomReady] = useState(false);
    const [pageWidth, setPageWidth] = useState(800);
    const [showSignatureHint, setShowSignatureHint] = useState(true);

    useEffect(() => {
        setDomReady(true);
        const updateWidth = () => {
            setPageWidth(Math.min(window.innerWidth - 32, 800));
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const documentWrapperRef = useRef(null);
    const workspaceRef = useRef(null);
    const canvasRef = useRef(null);
    const isDrawing = useRef(false);
    const lastPos = useRef({ x: 0, y: 0 });

    // Compute image ratio, center signature on PDF, and scroll workspace into view
    useEffect(() => {
        if (signatureUrl) {
            const img = new window.Image();
            img.onload = () => {
                const ratio = img.height / img.width;
                const newWidth = 150;
                const newHeight = Math.round(150 * ratio);
                setImageSize({ width: newWidth, height: newHeight });

                // Center signature on the rendered PDF page
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

                // Scroll to top of workspace so the user sees the PDF
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
            };
            img.src = signatureUrl;
        }
    }, [signatureUrl, pageWidth]);

    // Auto-dismiss hint after 6 seconds
    useEffect(() => {
        if (showSignatureHint && signatureUrl) {
            const timer = setTimeout(() => setShowSignatureHint(false), 6000);
            return () => clearTimeout(timer);
        }
    }, [showSignatureHint, signatureUrl]);

    const dismissHint = useCallback(() => {
        setShowSignatureHint(false);
    }, []);

    const onFileUpload = (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        if (type === "pdf") {
            setPdfFile(file);
            setShowSignatureModal(true);
        } else {
            setSignatureFile(file);
            setSignatureUrl(URL.createObjectURL(file));
        }
    };

    const getCanvasPos = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY,
        };
    };

    const startDrawing = (e) => {
        e.target.setPointerCapture(e.pointerId);
        isDrawing.current = true;
        lastPos.current = getCanvasPos(e);
    };

    const draw = (e) => {
        if (!isDrawing.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const currentPos = getCanvasPos(e);

        ctx.beginPath();
        ctx.moveTo(lastPos.current.x, lastPos.current.y);
        ctx.lineTo(currentPos.x, currentPos.y);
        ctx.strokeStyle = "rgba(0,0,0,0.85)";
        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();

        lastPos.current = currentPos;
    };

    const stopDrawing = (e) => {
        isDrawing.current = false;
        if (e && e.target) e.target.releasePointerCapture(e.pointerId);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const saveCanvasSignature = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Check if canvas is empty using a rough pixel check
        const ctx = canvas.getContext("2d");
        const pixelBuffer = new Uint32Array(ctx.getImageData(0, 0, canvas.width, canvas.height).data.buffer);
        if (!pixelBuffer.some(color => color !== 0)) {
            alert("Please draw your signature first.");
            return;
        }

        const dataUrl = canvas.toDataURL("image/png");
        fetch(dataUrl)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], "drawn-signature.png", { type: "image/png" });
                setSignatureFile(file);
                setSignatureUrl(URL.createObjectURL(file));
                setShowSignatureModal(false);
            });
    };

    const handleDownloadPDF = async () => {
        if (!pdfFile || !signatureFile) return;
        setIsProcessing(true);
        console.log("Starting PDF generation for download...");

        try {
            // 1. Load the original PDF
            const existingPdfBytes = await pdfFile.arrayBuffer();
            const pdfDoc = await PDFDocument.load(existingPdfBytes);

            // 2. Load the image based on it's format
            const signatureBytes = await signatureFile.arrayBuffer();
            let signatureImage;
            if (signatureFile.type === "image/png") {
                signatureImage = await pdfDoc.embedPng(signatureBytes);
            } else if (signatureFile.type === "image/jpeg" || signatureFile.type === "image/jpg") {
                signatureImage = await pdfDoc.embedJpg(signatureBytes);
            } else {
                alert("Please upload a PNG or JPG signature image.");
                setIsProcessing(false);
                return;
            }

            // 3. Get currently viewed page and its properties
            const pages = pdfDoc.getPages();
            const currentPage = pages[pageNumber - 1];

            // MediaBox dimensions (unrotated native PDF coordinates)
            const mbWidth = currentPage.getWidth();
            const mbHeight = currentPage.getHeight();

            // Page rotation — react-pdf renders the rotated view,
            // but pdf-lib coordinates are in the unrotated MediaBox space
            const rotAngle = currentPage.getRotation().angle;
            const isRotated = (rotAngle === 90 || rotAngle === 270);

            // Visual dimensions (what the user actually sees in the browser)
            const visWidth = isRotated ? mbHeight : mbWidth;
            const visHeight = isRotated ? mbWidth : mbHeight;

            // 4. Get the rendered canvas for coordinate mapping
            const canvasElement = documentWrapperRef.current?.querySelector('canvas');
            if (!canvasElement) {
                console.error("Canvas element not found, cannot calculate coordinates.");
                setIsProcessing(false);
                return;
            }

            // Client dimensions of the canvas as rendered in the UI
            const canvasW = canvasElement.clientWidth;
            const canvasH = canvasElement.clientHeight;

            console.log('PDF Debug:', { mbWidth, mbHeight, rotAngle, visWidth, visHeight, canvasW, canvasH });

            // Scale from UI pixels to visual PDF points
            const scaleX = visWidth / canvasW;
            const scaleY = visHeight / canvasH;

            // Signature visual position in the rendered view (relative to canvas)
            const canvasRect = canvasElement.getBoundingClientRect();
            // We use client rect to get zero-offset relative to the canvas content
            const sigVisX = (signaturePos.x - (canvasRect.left - documentWrapperRef.current.getBoundingClientRect().left)) * scaleX;
            const sigVisY = (signaturePos.y - (canvasRect.top - documentWrapperRef.current.getBoundingClientRect().top)) * scaleY;
            const sigVisW = imageSize.width * scaleX;
            const sigVisH = imageSize.height * scaleY;

            // 5. Transform visual coordinates → MediaBox coordinates and draw
            // pdf-lib draws in the unrotated MediaBox space (origin bottom-left)
            let finalX, finalY, finalW, finalH, imgRotation;

            switch (rotAngle) {
                case 90:
                    // Visual X→up = MB Y↑, Visual Y→right = MB X→
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
                default: // 0 — no rotation
                    finalX = sigVisX;
                    finalY = visHeight - sigVisY - sigVisH;
                    finalW = sigVisW;
                    finalH = sigVisH;
                    imgRotation = degrees(0);
                    break;
            }

            console.log('Signature placement:', { sigVisX, sigVisY, sigVisW, sigVisH, finalX, finalY, finalW, finalH, rotAngle });

            // 6. Draw image with rotation compensation
            currentPage.drawImage(signatureImage, {
                x: finalX,
                y: finalY,
                width: finalW,
                height: finalH,
                rotate: imgRotation,
            });

            // 6. Save and Download
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: "application/pdf" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `signed-${pdfFile.name}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Telemetry Ping (Fire and Forget)
            const timezone = Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone || "UTC";
            console.log("Dispatching telemetry:", { timezone });
            fetch("https://dev-api.easesign.site/esign/simple-count", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                keepalive: true,
                body: JSON.stringify({
                    event: "simple_esign_completed",
                    timezone: timezone,
                    timestamp: new Date().toISOString()
                })
            }).catch(e => console.error("Telemetry error", e));

            // Reset the page so the user can sign another file immediately
            setTimeout(() => {
                setPdfFile(null);
                setSignatureFile(null);
                setSignatureUrl(null);
                setPageNumber(1);
                setSignaturePos({ x: 50, y: 50 });
                setIsProcessing(false);
            }, 500);

        } catch (error) {
            console.error("Error signing PDF", error);
            alert("There was an error generating the PDF.");
            setIsProcessing(false);
        }
    };

    // Shared page navigation component
    const PageNavigation = ({ compact = false }) => {
        if (!numPages || numPages <= 1) return null;
        return (
            <div className={`flex items-center gap-1 text-sm bg-white/5 border border-white/10 rounded-lg flex-shrink-0 ${compact ? 'px-1.5 py-0.5' : 'px-2 py-1'}`}>
                <button
                    onClick={() => setPageNumber(p => Math.max(1, p - 1))}
                    disabled={pageNumber <= 1}
                    className="hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30 p-1 rounded"
                >
                    ◀
                </button>
                <span className={`font-semibold text-purple-200 whitespace-nowrap px-1 ${compact ? 'text-xs' : ''}`}>{pageNumber} / {numPages}</span>
                <button
                    onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
                    disabled={pageNumber >= numPages}
                    className="hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30 p-1 rounded"
                >
                    ▶
                </button>
            </div>
        );
    };

    // Shared action buttons component
    const ActionButtons = ({ compact = false }) => (
        <div className={`flex items-center ${compact ? 'gap-2' : 'gap-2 md:gap-3'}`}>
            {!signatureUrl && (
                <button
                    onClick={() => setShowSignatureModal(true)}
                    className={`flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors whitespace-nowrap border border-white/10 ${compact ? 'px-3 py-2 text-xs' : 'px-4 py-2 text-sm'}`}
                >
                    <PenLine className={compact ? "w-3.5 h-3.5 text-purple-400" : "w-4 h-4 text-purple-400"} /> {dict?.addSignature || 'Add Signature'}
                </button>
            )}
            <button
                onClick={handleDownloadPDF}
                disabled={isProcessing || !signatureUrl}
                className={`flex items-center justify-center gap-1.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white rounded-lg font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20 ${compact ? 'px-4 py-2 text-xs' : 'px-6 py-2 text-sm'}`}
            >
                <Download className={compact ? "w-3.5 h-3.5" : "w-4 h-4"} />
                {isProcessing ? (dict?.processing || "Processing...") : (dict?.signButton || 'Sign')}
            </button>
        </div>
    );

    return (
        <>
            <Navbar lang={lang} dict={navbarDict} />
            <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#180f33] via-[#0d0d1a] to-[#050505] text-white font-sans overflow-x-hidden relative">

                {/* Step 1: Initial Upload Screen */}
                {!pdfFile ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-4 max-w-5xl mx-auto w-full py-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">{dict?.title || 'Sign PDF'}</h1>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-16">
                            {/* Left: Subtitle Words */}
                            <div className="text-center lg:text-left order-2 lg:order-1">
                                <p className="text-gray-400 text-lg md:text-2xl font-light leading-relaxed">
                                    {dict?.subtitle || 'Select the signing level that meets your needs. Use simple self-signing or verifiable digital signature compliant with Komdigi standards.'}
                                </p>
                            </div>

                            {/* Right: Tablet Visual Candy */}
                            <div className="flex justify-center items-center relative group order-1 lg:order-2">
                                {/* Soft Backlight for Tablet */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-indigo-500/20 rounded-full blur-[100px] opacity-40 group-hover:opacity-70 transition-opacity duration-700"></div>

                                <div className="relative w-full max-w-[400px] aspect-square animate-float">
                                    <Image
                                        src="/tablet.png"
                                        alt="Digital Signature on Tablet Illustration"
                                        fill
                                        className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:scale-105"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">

                            {/* Option 1: Simple Signature */}
                            <div className="bg-[#140e2a]/50 border border-purple-500/20 hover:border-purple-500/50 hover:bg-[#1a1235]/80 backdrop-blur-md p-8 rounded-2xl shadow-xl transition-all flex flex-col items-center text-center group">
                                <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform">
                                    <PenLine className="w-8 h-8 text-purple-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">{dict?.simpleTitle || 'Simple e-Signature'}</h2>
                                <p className="text-gray-400 mb-8 flex-1">{dict?.simpleDesc || 'Quick and easy electronic signature. Upload your PDF and immediately draw or upload your signature.'}</p>

                                <label className="cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md transition-all w-full inline-block">
                                    {dict?.selectPdf || 'Select PDF file'}
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        className="hidden"
                                        onChange={(e) => {
                                            onFileUpload(e, "pdf");
                                            setShowSignatureModal(true);
                                        }}
                                    />
                                </label>
                            </div>

                            {/* Option 2: Digital Certificate (PSrE) */}
                            <div className="bg-[#140e2a]/50 border border-indigo-500/20 hover:border-indigo-500/50 hover:bg-[#1a1235]/80 backdrop-blur-md p-8 rounded-2xl shadow-xl transition-all flex flex-col items-center text-center group relative overflow-hidden">
                                <div className="absolute top-4 right-4 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    {dict?.certBadge || 'Komdigi Verified'}
                                </div>
                                <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform">
                                    <ShieldCheck className="w-8 h-8 text-indigo-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">{dict?.certTitle || 'Digital Certificate'}</h2>
                                <p className="text-gray-400 mb-8 flex-1">{dict?.certDesc || 'Secure, legally binding digital signature involving Indonesian PSrE Certificate. Verifiable on root CA portals.'}</p>

                                <a href="https://dev-console.easesign.site" target="_blank" rel="noopener noreferrer" className="bg-[#1f1642] hover:bg-indigo-600 border border-indigo-500/30 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md transition-colors w-full inline-block">
                                    {dict?.gotoConsole || 'Go to Console'}
                                </a>
                                <p className="text-xs text-gray-500 mt-4">{dict?.requiresAccount || 'Requires EaseSign registered account'}</p>
                            </div>

                        </div>

                    </div>
                ) : (
                    /* Step 2: Interactive Workspace View */
                    <div ref={workspaceRef} className="flex-1 flex flex-col">

                        {/* Mobile: Compact filename header */}
                        <div className="md:hidden bg-[#140e2a]/95 backdrop-blur-xl border-b border-white/10 px-4 py-2.5 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-purple-400 flex-shrink-0" />
                            <span className="font-medium text-white truncate text-sm">{pdfFile.name}</span>
                        </div>

                        {/* Desktop: Full sticky top toolbar */}
                        <div className="hidden md:flex sticky top-0 bg-[#140e2a]/95 backdrop-blur-xl border-b border-white/10 px-4 md:px-6 py-3 items-center justify-between gap-3 shadow-xl z-20">
                            {/* Left: File name + page nav */}
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 min-w-0">
                                    <FileText className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                    <span className="font-medium text-white truncate text-sm">{pdfFile.name}</span>
                                </div>
                                <PageNavigation />
                            </div>
                            {/* Right: Actions */}
                            <ActionButtons />
                        </div>

                        {/* Document Render Area — extra bottom padding on mobile for fixed bar */}
                        <div className="flex-1 bg-[#050505] overflow-auto p-4 md:p-8 pb-24 md:pb-8 flex justify-center shadow-inner relative z-0">
                            {domReady && (
                                <div
                                    ref={documentWrapperRef}
                                    className="relative inline-block max-w-full select-none"
                                >
                                    <Document
                                        file={pdfFile}
                                        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                                        loading={<div className="p-10 md:p-20 text-purple-400 font-medium animate-pulse text-center w-full">{dict?.documentName || 'Loading document...'}</div>}
                                    >
                                        <Page
                                            pageNumber={pageNumber}
                                            renderTextLayer={false}
                                            renderAnnotationLayer={false}
                                            width={pageWidth}
                                            className="bg-white border border-white/10 shadow-2xl [&>canvas]:block"
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
                                            className={`z-10 cursor-move border-2 border-dashed rounded-sm ${showSignatureHint ? 'border-purple-400 bg-purple-500/10 animate-signature-pulse' : 'border-purple-500/50 hover:border-purple-400 bg-transparent'} transition-colors`}
                                            style={{ overflow: 'visible' }}
                                        >
                                            <img
                                                src={signatureUrl}
                                                alt="Signature"
                                                className="w-full h-full object-contain pointer-events-none"
                                            />

                                            {/* Corner resize grip indicators */}
                                            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-purple-500 rounded-full border-2 border-white shadow-md pointer-events-none" />
                                            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-purple-500 rounded-full border-2 border-white shadow-md pointer-events-none" />
                                            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-purple-500 rounded-full border-2 border-white shadow-md pointer-events-none" />
                                            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-purple-500 rounded-full border-2 border-white shadow-md pointer-events-none" />

                                            {/* Drag/resize hint tooltip */}
                                            {showSignatureHint && (
                                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1a1235]/95 text-purple-300 text-[11px] px-3 py-1.5 rounded-full shadow-lg border border-purple-500/30 animate-bounce-gentle pointer-events-none z-20 backdrop-blur-sm">
                                                    <span className="flex items-center gap-1.5">
                                                        <Move className="w-3 h-3" /> {dict?.signatureHint || 'Drag to move · Drag corners to resize'}
                                                    </span>
                                                </div>
                                            )}
                                        </Rnd>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Mobile: Fixed bottom bar with page nav + sign button */}
                        <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-[#140e2a]/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 flex items-center justify-between gap-2 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] safe-bottom">
                            {/* Left: page navigation */}
                            {numPages && numPages > 1 ? (
                                <PageNavigation compact />
                            ) : <div />}

                            {/* Right: action buttons */}
                            <ActionButtons compact />
                        </div>

                    </div>
                )}

                {/* Modal Overlay for Signature */}
                {pdfFile && showSignatureModal && !signatureUrl && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
                        <div className="bg-[#1a1235] border border-white/10 rounded-2xl shadow-2xl max-w-xl w-full animate-in fade-in zoom-in duration-200">

                            <div className="flex items-center justify-between p-6 border-b border-white/10">
                                <h2 className="text-2xl font-bold text-white">{dict?.modalTitle || 'Set your signature details'}</h2>
                                <button onClick={() => setShowSignatureModal(false)} className="text-gray-500 hover:text-white text-2xl font-bold leading-none transition-colors">&times;</button>
                            </div>

                            {/* Tabs Row */}
                            <div className="flex border-b border-white/10 px-6 pt-2">
                                <button
                                    onClick={() => setModalTab("upload")}
                                    className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${modalTab === 'upload' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400 hover:text-gray-300'}`}
                                >
                                    {dict?.uploadTab || 'Upload Image'}
                                </button>
                                <button
                                    onClick={() => setModalTab("draw")}
                                    className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${modalTab === 'draw' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400 hover:text-gray-300'}`}
                                >
                                    {dict?.drawTab || 'Draw Signature'}
                                </button>
                            </div>

                            <div className="p-8">
                                {modalTab === "upload" ? (
                                    <div className="border-2 border-dashed border-white/20 rounded-xl p-10 flex flex-col items-center justify-center hover:border-purple-500 transition-colors bg-white/5 hover:bg-purple-500/10 group">
                                        <ImageIcon className="w-12 h-12 text-gray-500 group-hover:text-purple-400 mb-4 transition-colors" />
                                        <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">{dict?.uploadTab || 'Upload Image'}</h3>
                                        <p className="text-gray-400 text-sm mt-2 text-center">{dict?.uploadDesc || 'We highly recommend using a transparent PNG image for best results.'}</p>

                                        <label className="cursor-pointer bg-white/10 border border-white/20 text-white hover:bg-purple-600 hover:border-purple-500 px-6 py-2 mt-6 rounded-md font-semibold transition-colors shadow-sm">
                                            {dict?.selectImage || 'Select Image'}
                                            <input
                                                type="file"
                                                accept="image/png, image/jpeg, image/jpg"
                                                className="hidden"
                                                onChange={(e) => {
                                                    onFileUpload(e, "signature");
                                                    setShowSignatureModal(false);
                                                }}
                                            />
                                        </label>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <div className="border-2 border-white/20 rounded-xl bg-white overflow-hidden w-full max-w-sm cursor-crosshair relative shadow-inner">
                                            <canvas
                                                ref={canvasRef}
                                                width={300}
                                                height={200}
                                                onPointerDown={startDrawing}
                                                onPointerMove={draw}
                                                onPointerUp={stopDrawing}
                                                onPointerCancel={stopDrawing}
                                                className="w-full touch-none"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between w-full max-w-sm mt-6">
                                            <button onClick={clearCanvas} className="text-gray-400 hover:text-white font-medium px-4 py-2 hover:bg-white/10 rounded-md transition-colors text-sm">
                                                {dict?.clearArea || 'Clear Area'}
                                            </button>
                                            <button onClick={saveCanvasSignature} className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white px-6 py-2 rounded-md font-semibold transition-colors shadow-md">
                                                {dict?.useSignature || 'Use Signature'}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                )}

            </div>
            <Footer lang={lang} />
            <style jsx global>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                @keyframes signature-pulse {
                    0%, 100% {
                        border-color: rgba(192, 132, 252, 0.5);
                        box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.3);
                    }
                    50% {
                        border-color: rgba(192, 132, 252, 1);
                        box-shadow: 0 0 14px 4px rgba(168, 85, 247, 0.15);
                    }
                }
                .animate-signature-pulse {
                    animation: signature-pulse 2s ease-in-out infinite;
                }
                @keyframes bounce-gentle {
                    0%, 100% { transform: translateX(-50%) translateY(0); }
                    50% { transform: translateX(-50%) translateY(-4px); }
                }
                .animate-bounce-gentle {
                    animation: bounce-gentle 1.5s ease-in-out infinite;
                }
                .safe-bottom {
                    padding-bottom: max(0.75rem, env(safe-area-inset-bottom, 0.75rem));
                }
            `}</style>
        </>
    );
};