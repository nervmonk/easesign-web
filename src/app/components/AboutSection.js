import Image from 'next/image';

const AboutSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-6">
        
        {/* Left Column: Logos */}
        <div className="flex flex-col items-center">
          {/* Main Logo */}
          <Image
            src="/easesign-logo.png" // Replace with your logo file in /public
            alt="EaseSign Logo"
            width={300}
            height={80}
            className="h-auto"
          />
          
          <p className="text-gray-500 tracking-widest mt-12 mb-6">
            SUPPORTED BY
          </p>
          
          {/* Supporter Logos */}
          {/* Increased the gap for more breathing room */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            
            {/* 1. Each logo is wrapped in a div to create a uniform "slot" */}
            <div className="h-20 w-32 flex justify-center items-center">
              <Image 
                src="/kominfo-logo.png" // Replace with your logo
                alt="Kominfo Logo" 
                width={150} // Use original image width for optimization
                height={60}  // Use original image height
                // 2. This class makes the image fit inside the slot without distortion
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="h-20 w-32 flex justify-center items-center">
              <Image 
                src="/psre-logo.png" // Replace with your logo
                alt="PSrE Logo" 
                width={100} 
                height={100} 
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="h-20 w-32 flex justify-center items-center">
              <Image 
                src="/djp-logo.png" // Replace with your logo
                alt="DJP Logo" 
                width={80} 
                height={80} 
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="h-20 w-32 flex justify-center items-center">
              <Image 
                src="/peruri-logo.png" // Replace with your logo
                alt="Peruri Logo" 
                width={200} 
                height={50} 
                className="max-h-full max-w-full object-contain"
              />
            </div>

          </div>
        </div>

        {/* Right Column: About Us Text */}
        <div className="text-center lg:text-left">
          <p className="text-gray-500 tracking-widest mb-4">
            ABOUT US
          </p>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              EaseSign, a brand name of PT Paramita Digital Nusantara is a company
              focuses in offering a platform based products and services to meet the
              growing demands of businesses in the digital era.
            </p>
            <p>
              With a focus on reliability, security, and efficiency, we empower businesses to
              streamline our client’s document authentication processes and embrace
              digital transformation for sustainability.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;