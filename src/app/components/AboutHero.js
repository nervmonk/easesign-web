import Image from "next/image";
import Link from "next/link";

const AboutHero = () => {
  return (
    <section className="relative pt-10 pb-20 md:pt-28 md:pb-32 overflow-hidden px-4">
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto max-w-[1200px]">
        <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Left Column: Text Block Glass Card */}
          <div className="relative z-10 lg:col-span-2 bg-[#0d0c1e]/60 backdrop-blur-xl border border-white/10 rounded-3xl text-white p-8 md:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              About Us
            </h1>
            <div className="space-y-6 text-gray-300 leading-relaxed font-light text-lg">
              <p>
                EaseSign, a brand name of PT Paramita Digital Nusantara is a
                company focuses in offering a platform based products and
                services to meet the growing demands of businesses in the
                digital era.
              </p>
              <p>
                With a focus on reliability, security, and efficiency, we
                empower businesses to streamline our client’s document
                authentication processes and embrace digital transformation for
                sustainability.
              </p>
            </div>
          </div>

          {/* Right Column: Decorative Image */}
          <div className="lg:col-span-3 lg:-ml-16 relative z-0">
             {/* Background glow behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-[80px]"></div>
            <Image
              src="/abstract-background.png" // Ensure this image looks good on dark bg
              alt="Abstract decorative graphic"
              width={800}
              height={500}
              className="w-full h-auto drop-shadow-2xl relative z-10"
            />
          </div>
        </div>

        {/* "Get In Touch" Decorative Element */}
        <div className="relative mt-24 md:mt-32 flex flex-col items-center justify-center">
          <div className="relative w-64 h-32">
            {/* The semi-circle arc */}
            <div className="absolute bottom-0 left-0 w-full h-full border-b border-l border-r border-white/20 shadow-[0_10px_20px_-10px_rgba(255,255,255,0.1)] rounded-b-full pointer-events-none"></div>
            {/* The circle group */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
               {/* Dark cutout illusion */}
              <div className="absolute w-20 h-20 bg-[#0d0d1a] rounded-full"></div>
              <div className="relative z-10 w-20 h-20 bg-[#15132d] border border-white/10 shadow-[0_0_20px_rgba(168,85,247,0.3)] rounded-full flex items-center justify-center hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all cursor-pointer group">
                <Link href="/contact-us">
                  <button className="w-14 h-14 bg-purple-600 text-white rounded-full flex items-center justify-center group-hover:bg-purple-500 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <p className="mt-4 text-gray-400 font-medium tracking-wide">Get in touch</p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
