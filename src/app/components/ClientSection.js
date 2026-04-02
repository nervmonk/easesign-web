import Image from "next/image";

// --- Client Data ---
const clientCategories = [
  {
    name: "Bank & Fintech",
    logos: [
      { src: "/BRI-logo.png", alt: "BRI" },
      { src: "/BNI-logo.png", alt: "BNI" },
      { src: "/banksumut-logo.png", alt: "Bank Sumut" },
      { src: "/bantusaku-logo.png", alt: "Bantusaku" },
      { src: "/AAI-logo.png", alt: "Advance.AI" },
      { src: "/IDmeta-logo.png", alt: "IDMeta" },
      { src: "/xendit-logo.png", alt: "Xendit" },
      { src: "/danarupiah-logo.png", alt: "DanaRupiah" },
    ],
  },
  {
    name: "Others",
    logos: [
      { src: "/krakatau-steel-logo.png", alt: "Krakatau Steel" },
      { src: "/antam-logo.png", alt: "Antam" },
      { src: "/timah-logo.png", alt: "Timah" },
      { src: "/polytron-logo.png", alt: "Polytron" },
      { src: "/samsung-logo.png", alt: "Samsung" },
    ],
  },
];

const allLogos = clientCategories.flatMap((category) => category.logos);

const ClientsSection = ({ dict = {} }) => {
  return (
    <section className="py-24 relative overflow-hidden px-4">
      {/* Dynamic Keyframes for the marquee */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* Decorative Glows */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto max-w-[1200px] relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase mb-6 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            {dict.badge || 'Industry Leaders'}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {dict.title || 'Trusted by World-Class Teams'}
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-400 font-light leading-relaxed">
            {dict.subtitle || 'We are proud to collaborate with a diverse range of businesses, from innovative fintech startups to established industry giants.'}
          </p>
        </div>

        {/* Marquee Wrapper Glass Card */}
        <div className="relative max-w-[1200px] mx-auto overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0d0c1e]/60 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-12 md:py-16">
          
          <div 
            className="overflow-hidden" 
            style={{ 
              maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', 
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' 
            }}
          >
            {/* The infinite scrolling track */}
            <div className="flex w-max animate-marquee">
               {/* 
                  Render the logos multiple times to ensure the track is 
                  wide enough to fill the screen and seamlessly loop 
               */}
               {[...allLogos, ...allLogos, ...allLogos, ...allLogos].map((logo, index) => (
                  <div
                    key={`${logo.alt}-${index}`}
                    className="flex-shrink-0 w-36 md:w-48 mx-6 md:mx-10 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={160}
                      height={60}
                      className="max-h-12 w-auto object-contain brightness-0 invert"
                    />
                  </div>
               ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
