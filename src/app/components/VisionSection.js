import Image from 'next/image';

const VisionSection = () => {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-6">
        {/* The main grid is now balanced to vertically center the content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 items-center">
          
          {/* ========== Left Column (All Text Content) ========== */}
          {/* 1. All text is now unified in this column for a cleaner flow */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center text-sm font-bold tracking-wider text-cyan-500 uppercase">
              <span className="w-8 h-px bg-cyan-500 mr-3"></span>
              Who we are
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">
              Our Vision
            </h2>
            {/* The paragraphs now sit directly on the page, removing the heavy box */}
            <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
              <p>
                EaseSign aims to revolutionize document validation through the implementation of digital signatures and seals, enhancing security, speed, and compliance. By leveraging advanced technology and developing user-friendly solutions, EaseSign is committed to exceeding client expectations.
              </p>
              <p>
                By maintaining high standards of security and reliability, EaseSign enables companies to handle their documentation processes confidently. This dedication allows businesses to focus on their core activities, knowing that their validation needs are met with the utmost precision and care.
              </p>
            </div>
          </div>

          {/* ========== Right Column (Layered Images) ========== */}
          {/* 2. The two images are now layered to create depth and visual interest */}
          <div className="relative flex items-center justify-center min-h-[400px]">
            {/* The team photo is layered on top with a nice shadow and border */}
            <div className="absolute w-[85%]">
              <Image
                src="/team-tablet.png"
                alt="Team working on a tablet"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-xl shadow-2xl border-4 border-white"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VisionSection;