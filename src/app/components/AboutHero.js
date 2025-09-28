import Image from "next/image";
import Link from "next/link";

const AboutHero = () => {
  return (
    <section className="bg-white pt-10 pb-20 md:pt-20 md:pb-32">
      <div className="container mx-auto px-6">
        <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Left Column: Text Block */}
          {/* On large screens, it spans 2 columns and has a higher z-index to overlap */}
          <div className="relative z-10 lg:col-span-2 bg-slate-900 text-white p-8 md:p-12 shadow-lg">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              About Us
            </h1>
            <div className="space-y-4 text-gray-300 leading-relaxed">
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
          {/* On large screens, it spans 3 columns and is positioned to allow overlap */}
          <div className="lg:col-span-3 lg:-ml-24">
            <Image
              src="/abstract-background.png" // Replace with your image
              alt="Abstract decorative graphic"
              width={800}
              height={500}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* "Get In Touch" Decorative Element */}
        <div className="relative mt-16 md:mt-0 flex flex-col items-center justify-center">
          <div className="relative w-64 h-32">
            {/* The semi-circle arc */}
            <div className="absolute bottom-0 left-0 w-full h-full border-b border-l border-r border-gray-300 rounded-b-full"></div>
            {/* The circle group */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <div className="absolute w-20 h-20 bg-black rounded-full -mr-5"></div>
              <div className="relative z-10 w-20 h-20 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
                <Link href="/contact-us">
                  {" "}
                  <button className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
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
          <p className="mt-4 text-gray-600">Get in touch</p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
