import Image from 'next/image';

const AboutSection = ({ dict = {} }) => {
  return (
    <section className="py-20 relative px-4">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto max-w-[1200px]">

        {/* Unified Card Design */}
        <div className="relative rounded-3xl border border-white/10 bg-[#0d0c1e]/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] p-8 md:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Column: Logos */}
            <div className="flex flex-col items-center lg:items-start lg:border-r border-white/10 lg:pr-12">
              {/* Main Logo */}
              <Image
                src="/easesign-logo.png"
                alt="EaseSign penyedia tanda tangan digital Logo"
                width={220}
                height={60}
                className="h-auto brightness-0 invert mb-2"
              />

              <p className="text-purple-400/80 text-xs font-bold tracking-[0.2em] mt-10 mb-6 uppercase">
                {dict.supportedBy || 'Supported By'}
              </p>

              {/* Supporter Logos */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-6">

                <div className="h-14 w-28 relative opacity-60 hover:opacity-100 transition-opacity">
                  <Image
                    src="/kominfo-logo.png"
                    alt="Komdigi - Ministry of Communication and Information Technology Indonesia"
                    fill
                    className="object-contain brightness-0 invert grayscale"
                  />
                </div>

                <div className="h-14 w-24 relative opacity-60 hover:opacity-100 transition-opacity">
                  <Image
                    src="/psre-footer.png"
                    alt="PSrE - Certified Electronic Certificate Provider"
                    fill
                    className="object-contain brightness-0 invert grayscale"
                  />
                </div>

                <div className="h-14 w-24 relative opacity-60 hover:opacity-100 transition-opacity">
                  <Image
                    src="/djp-logo.png"
                    alt="DJP - Directorate General of Taxes Indonesia"
                    fill
                    className="object-contain brightness-0 invert grayscale"
                  />
                </div>

                <div className="h-14 w-28 relative opacity-60 hover:opacity-100 transition-opacity">
                  <Image
                    src="/peruri-logo.png"
                    alt="Peruri - Indonesian Security Printing and Minting Corporation"
                    fill
                    className="object-contain brightness-0 invert grayscale"
                  />
                </div>

              </div>
            </div>

            {/* Right Column: About Us Text */}
            <div className="text-center lg:text-left z-10">
              <div className="mb-6">
                {/* Decorative Pill like Jetbrains tags */}
                <span className="inline-block bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold px-3 py-1 rounded-full tracking-wider uppercase">
                  {dict.badge || 'ABOUT US'}
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                {dict.title1 || 'Building the foundation'} <br className="hidden md:block" /> {dict.title2 || 'of Digital Trust'}
              </h2>

              <div className="space-y-6 text-gray-400 text-lg leading-relaxed font-light">
                <p>
                  {dict.desc1 || 'EaseSign, a product of PT Paramita Digital Nusantara, delivers enterprise-grade document authentication platforms built for the rigorous demands of the modern economy.'}
                </p>
                <p>
                  {dict.desc2 || 'We eliminate workflow bottlenecks by providing secure, legally compliant, and instantaneous digital signatures. Our mission is to empower teams to authenticate documents with absolute confidence and accelerate their digital transformation.'}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;