import React from "react";
import Image from "next/image";

// Static styling definitions
const signatureProductStyles = [
  {
    icon: "/signature-vector.png",
    accentColor: "green",
    glowClass: "bg-green-500",
    borderClass: "border-green-500/30",
    shadowClass: "shadow-[0_0_15px_rgba(34,197,94,0.15)]",
    textHoverClass: "group-hover:text-green-400",
  },
  {
    icon: "/meterai-vector.png",
    accentColor: "cyan",
    glowClass: "bg-cyan-500",
    borderClass: "border-cyan-500/30",
    shadowClass: "shadow-[0_0_15px_rgba(6,182,212,0.15)]",
    textHoverClass: "group-hover:text-cyan-400",
  },
];

const kycProductStyles = [
  {
    icon: "/identity-verification.png",
    accentColor: "purple",
    glowClass: "bg-purple-500",
    borderClass: "border-purple-500/30",
    shadowClass: "shadow-[0_0_15px_rgba(168,85,247,0.15)]",
    textHoverClass: "group-hover:text-purple-400",
  },
  {
    icon: "/user-verification.png",
    accentColor: "blue",
    glowClass: "bg-blue-500",
    borderClass: "border-blue-500/30",
    shadowClass: "shadow-[0_0_15px_rgba(59,130,246,0.15)]",
    textHoverClass: "group-hover:text-blue-400",
  },
  {
    icon: "/face-detection.png",
    accentColor: "rose",
    glowClass: "bg-rose-500",
    borderClass: "border-rose-500/30",
    shadowClass: "shadow-[0_0_15px_rgba(244,63,94,0.15)]",
    textHoverClass: "group-hover:text-rose-400",
  },
];

const ProductCard = ({ product, index, isKYC }) => (
  <div className={`relative ${!isKYC && index === 0 ? "lg:mt-12" : ""} h-full`}>
    <div
      className={`relative z-10 ${isKYC ? "p-8" : "p-10 md:p-12"} rounded-3xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] bg-[#0d0c1e]/60 backdrop-blur-xl overflow-hidden group hover:bg-[#17143e]/80 transition-all duration-300 h-full flex flex-col`}
    >
      {/* Dynamic Glow Background based on accent color */}
      <div className={`absolute -top-10 -right-10 w-64 h-64 rounded-full blur-[80px] opacity-[0.15] pointer-events-none transition-opacity duration-300 group-hover:opacity-[0.25] ${product.glowClass}`}></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className={`h-16 w-16 md:h-20 md:w-20 mb-8 rounded-2xl bg-white/5 border flex items-center justify-center relative ${product.borderClass} ${product.shadowClass}`}>
          <Image
            src={product.icon}
            alt={`${product.title} Icon`}
            width={isKYC ? 32 : 48}
            height={isKYC ? 32 : 48}
            className="relative z-10 brightness-0 invert"
          />
        </div>
        <h3 className={`text-2xl md:text-3xl font-bold mb-4 text-white transition-colors duration-300 ${product.textHoverClass}`}>
          {product.title}
        </h3>
        <p className="text-gray-400 leading-relaxed font-light text-base md:text-lg flex-grow">
          {product.description}
        </p>
      </div>
    </div>

    {/* Decorative shape for the second signature card */}
    {!isKYC && index === 1 && (
      <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-cyan-500/30 rounded-xl rounded-tr-[60px] z-0 opacity-40 bg-cyan-500/5 backdrop-blur-md" />
    )}
    {/* Decorative shape for the first signature card */}
    {!isKYC && index === 0 && (
      <div className="absolute -top-6 -left-6 w-32 h-32 border border-green-500/30 rounded-xl rounded-bl-[60px] z-0 opacity-40 bg-green-500/5 backdrop-blur-md" />
    )}
  </div>
);

const ProductsSection = ({ dict = {} }) => {
  const dictSigProducts = dict.signatureProducts || [
    { title: "Easy Sign", description: "We offer an easy, secure and legally valid digital signature solution for our clients." },
    { title: "Easy Stamp", description: "We offer Easy Stamp, an easy, secure, digital form of paper stamps used for electronic document purposes." }
  ];
  
  const dictKycProducts = dict.kycProducts || [
    { title: "ID Card Documents OCR", description: "Automate your KYC onboarding with AI-powered OCR." },
    { title: "Face Verification", description: "Ensure the person behind the screen is genuine with high-accuracy facial recognition." },
    { title: "Liveness Detection", description: "Prevent spoofing and presentation attacks instantly with our advanced passive liveness detection algorithms." }
  ];

  const signatureProducts = signatureProductStyles.map((style, i) => ({
    ...style,
    title: dictSigProducts[i]?.title,
    description: dictSigProducts[i]?.description
  }));

  const kycProducts = kycProductStyles.map((style, i) => ({
    ...style,
    title: dictKycProducts[i]?.title,
    description: dictKycProducts[i]?.description
  }));
  return (
    <section className="py-24 relative px-4" id="products">
      {/* Background glow for the section */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto max-w-[1200px] relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <span className="inline-block bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold px-4 py-1.5 rounded-full tracking-[0.2em] uppercase mb-6 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            {dict.badge || 'Core Solutions'}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            {dict.title || 'Our Products'}
          </h2>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            {dict.subtitle || 'From legally-binding electronic signatures to military-grade identity verification, we provide everything you need to digitize your onboarding and operations.'}
          </p>
        </div>

        {/* Row 1: Document Signing & Stamping (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16 items-stretch mb-12">
          {signatureProducts.map((product, index) => (
            <ProductCard key={product.title} product={product} index={index} isKYC={false} />
          ))}
        </div>

        {/* KYC Section Divider */}
        <div className="flex items-center justify-center my-20">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-white/20"></div>
          <span className="mx-6 text-sm font-bold tracking-[0.3em] text-gray-500 uppercase">{dict.signatureDivider || 'KYC & Onboarding'}</span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-white/20"></div>
        </div>

        {/* Row 2: KYC & Identity Verification (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {kycProducts.map((product, index) => (
            <ProductCard key={product.title} product={product} index={index} isKYC={true} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProductsSection;
