import Image from 'next/image';

// A simple checkmark icon component to use in the list
const CheckIcon = () => (
  <svg className="h-6 w-6 text-cyan-400 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const ValuePropsSection = () => {
  return (
    <section className="relative bg-slate-900 text-white py-24 overflow-hidden">
      {/* 1. Switched to a two-column grid layout on large screens */}
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* ========== Left Column (Text Content) ========== */}
        {/* 2. Grouped all text content here and made it left-aligned */}
        <div className="text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold">
            Reliable, Secure, and Efficient
          </h2>
          
          {/* 3. Enhanced the feature list with icons and better spacing */}
          <ul className="space-y-4 mt-8 max-w-md mx-auto lg:mx-0">
            <li className="flex items-center gap-3 justify-center lg:justify-start">
              <CheckIcon />
              <span className="text-lg">Legal Comply</span>
            </li>
            <li className="flex items-center gap-3 justify-center lg:justify-start">
              <CheckIcon />
              <span className="text-lg">Geographic Dispersion</span>
            </li>
            <li className="flex items-center gap-3 justify-center lg:justify-start">
              <CheckIcon />
              <span className="text-lg">Security & Authentication</span>
            </li>
            <li className="flex items-center gap-3 justify-center lg:justify-start">
              <CheckIcon />
              <span className="text-lg">Environmental Sustainability</span>
            </li>
          </ul>
        </div>

        {/* ========== Right Column (Visuals) ========== */}
        {/* The images are now in their own column */}
        <div className="relative flex justify-center">
          <Image
            src="/wave.png"
            alt="Decorative background wave"
            width={800}
            height={400}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-10"
          />
          <div className="relative z-10">
            <Image
              src="/tablet.png"
              alt="Tablet showing a digital signature"
              width={800}
              height={500}
              className="max-w-xs md:max-w-2xl lg:max-w-3xl"
            />
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default ValuePropsSection;