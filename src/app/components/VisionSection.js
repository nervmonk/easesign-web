import Image from 'next/image';

const VisionSection = ({ dict = {} }) => {
  return (
    <section className="py-24 relative px-4">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto max-w-[1200px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16 items-center">
          
          {/* ========== Left Column (Text Content) ========== */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <div className="flex items-center text-xs font-bold tracking-widest text-cyan-400 uppercase mb-4">
              <span className="w-8 h-px bg-cyan-500/50 mr-4"></span>
              {dict.eyebrow || 'Who we are'}
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 leading-tight">
              {dict.title || 'Our Vision'}
            </h2>
            
            <div className="space-y-6 text-gray-400 leading-relaxed font-light text-lg">
              <p>
                {dict.desc1 || 'EaseSign aims to revolutionize document validation through the implementation of digital signatures and seals, enhancing security, speed, and compliance.'}
              </p>
              <p>
                {dict.desc2 || 'By maintaining high standards of security and reliability, EaseSign enables companies to handle their documentation processes confidently.'}
              </p>
            </div>
          </div>

          {/* ========== Right Column (Layered Image Card) ========== */}
          <div className="relative flex items-center justify-center min-h-[400px] order-1 lg:order-2">
            {/* Glossy card wrapper */}
            <div className="relative w-full max-w-lg p-3 bg-[#0d0c1e]/60 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_4px_40px_rgba(0,0,0,0.5)] transform hover:scale-[1.02] transition-transform duration-500">
               {/* Decorative tech accent block */}
               <div className="absolute -top-6 -right-6 w-32 h-32 border border-cyan-500/30 rounded-xl rounded-tr-[50px] z-0 opacity-40 bg-cyan-500/5 backdrop-blur-md pointer-events-none" />
              
              <Image
                src="/team-tablet.png"
                alt="Team working on a tablet"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-xl relative z-10"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VisionSection;