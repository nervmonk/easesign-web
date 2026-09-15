"use client";

import { useState, useRef, useEffect } from "react";
import { PenLine, Type, Upload, X, Trash2, Check, Image as ImageIcon } from "lucide-react";

interface SignaturePadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignatureReady: (file: File, url: string) => void;
  lang?: string;
}

export default function SignaturePadModal({
  isOpen,
  onClose,
  onSignatureReady,
  lang = "id",
}: SignaturePadModalProps) {
  const [activeTab, setActiveTab] = useState<"draw" | "type" | "upload">("draw");
  const [typedName, setTypedName] = useState("");
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const hasDrawn = useRef(false);

  // Setup canvas size on open
  useEffect(() => {
    if (isOpen && activeTab === "draw") {
      const timer = setTimeout(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * 2;
        canvas.height = rect.height * 2;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.scale(2, 2);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = "#001D36"; // Authoritative deep navy ink
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  const getCanvasPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    isDrawing.current = true;
    lastPos.current = getCanvasPos(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const currentPos = getCanvasPos(e);

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.stroke();

    lastPos.current = currentPos;
    hasDrawn.current = true;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawing.current = false;
    if (e?.target) {
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hasDrawn.current = false;
  };

  const handleSaveDrawn = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn.current) {
      alert(lang === "id" ? "Silakan gambar tanda tangan Anda terlebih dahulu." : "Please draw your signature first.");
      return;
    }

    const dataUrl = canvas.toDataURL("image/png");
    fetch(dataUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "tanda-tangan.png", { type: "image/png" });
        onSignatureReady(file, URL.createObjectURL(file));
        onClose();
      });
  };

  const handleSaveTyped = () => {
    if (!typedName.trim()) {
      alert(lang === "id" ? "Silakan ketik nama Anda terlebih dahulu." : "Please type your name first.");
      return;
    }

    const offscreen = document.createElement("canvas");
    offscreen.width = 600;
    offscreen.height = 200;
    const ctx = offscreen.getContext("2d");
    if (!ctx) return;

    ctx.font = "italic 48px 'Brush Script MT', 'Dancing Script', 'Caveat', cursive";
    ctx.fillStyle = "#001D36";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(typedName.trim(), 300, 100);

    offscreen.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], "tanda-tangan-ketik.png", { type: "image/png" });
      onSignatureReady(file, URL.createObjectURL(file));
      onClose();
    }, "image/png");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert(lang === "id" ? "File harus berupa gambar (PNG/JPG)." : "File must be an image (PNG/JPG).");
      return;
    }
    setUploadedFile(file);
    setUploadPreview(URL.createObjectURL(file));
  };

  const handleSaveUploaded = () => {
    if (!uploadedFile || !uploadPreview) {
      alert(lang === "id" ? "Silakan pilih file gambar tanda tangan." : "Please upload a signature image first.");
      return;
    }
    onSignatureReady(uploadedFile, uploadPreview);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-[#003366]">
              <PenLine className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {lang === "id" ? "Buat Tanda Tangan Digital" : "Create Digital Signature"}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === "id" ? "Pilih metode pembuatan tanda tangan" : "Select signature input method"}
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

        {/* M3 Segmented Tabs */}
        <div className="flex border-b border-slate-100 bg-slate-50/70 p-1.5 gap-1 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("draw")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl transition-all ${
              activeTab === "draw"
                ? "bg-white text-[#003366] shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
            }`}
          >
            <PenLine className="w-3.5 h-3.5" />
            <span>{lang === "id" ? "Gambar Manual" : "Draw"}</span>
          </button>

          <button
            onClick={() => setActiveTab("type")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl transition-all ${
              activeTab === "type"
                ? "bg-white text-[#003366] shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>{lang === "id" ? "Ketik Nama" : "Type Name"}</span>
          </button>

          <button
            onClick={() => setActiveTab("upload")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl transition-all ${
              activeTab === "upload"
                ? "bg-white text-[#003366] shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{lang === "id" ? "Unggah Gambar" : "Upload PNG"}</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6">
          {activeTab === "draw" && (
            <div className="space-y-4">
              <div className="relative border-2 border-dashed border-slate-300 rounded-xl bg-slate-50/50 overflow-hidden touch-none h-56 flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  className="w-full h-full cursor-crosshair"
                />
                {!hasDrawn.current && (
                  <div className="absolute pointer-events-none text-slate-400 text-xs font-medium flex items-center gap-1.5">
                    <PenLine className="w-4 h-4" />
                    <span>{lang === "id" ? "Goreskan tanda tangan Anda di sini" : "Draw your signature here"}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{lang === "id" ? "Gunakan mouse, stylus, atau jari Anda" : "Use mouse, stylus, or your finger"}</span>
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 px-2.5 py-1 rounded-lg transition-colors font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{lang === "id" ? "Hapus" : "Clear"}</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === "type" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {lang === "id" ? "Ketik Nama Lengkap Anda" : "Type Your Full Name"}
                </label>
                <input
                  type="text"
                  value={typedName}
                  onChange={(e) => setTypedName(e.target.value)}
                  placeholder={lang === "id" ? "Contoh: Budi Pratama, S.H." : "e.g. John Doe"}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#003366]/20 focus:border-[#003366] text-sm text-slate-900"
                />
              </div>

              {/* Preview Box */}
              <div className="border border-slate-200 rounded-xl bg-slate-50 p-6 text-center h-36 flex items-center justify-center">
                {typedName ? (
                  <span className="font-serif italic text-3xl sm:text-4xl text-[#001D36] tracking-wide select-none">
                    {typedName}
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 italic">
                    {lang === "id" ? "Hasil tanda tangan akan muncul di sini" : "Signature preview will appear here"}
                  </span>
                )}
              </div>
            </div>
          )}

          {activeTab === "upload" && (
            <div className="space-y-4">
              <label className="border-2 border-dashed border-slate-300 hover:border-[#003366] rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-slate-50/50 hover:bg-blue-50/50 transition-colors h-56">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                {uploadPreview ? (
                  <div className="relative max-h-40 max-w-xs flex items-center justify-center">
                    <img
                      src={uploadPreview}
                      alt="Pratinjau"
                      className="max-h-36 object-contain rounded"
                    />
                  </div>
                ) : (
                  <>
                    <ImageIcon className="w-10 h-10 text-slate-400 mb-2" />
                    <p className="text-xs font-bold text-slate-700">
                      {lang === "id" ? "Klik untuk memilih gambar tanda tangan" : "Click to select signature image"}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {lang === "id" ? "Disarankan format PNG dengan latar belakang transparan" : "Transparent PNG recommended"}
                    </p>
                  </>
                )}
              </label>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            {lang === "id" ? "Batal" : "Cancel"}
          </button>

          <button
            type="button"
            onClick={
              activeTab === "draw"
                ? handleSaveDrawn
                : activeTab === "type"
                ? handleSaveTyped
                : handleSaveUploaded
            }
            className="bg-[#003366] hover:bg-[#0B57D0] text-white px-5 py-2 rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>{lang === "id" ? "Gunakan Tanda Tangan" : "Apply Signature"}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
