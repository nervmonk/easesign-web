import Image from 'next/image';

// --- Client Data ---
// Group your clients by category here. This makes it easy to manage.
const clientCategories = [
  {
    name: 'Bank & Fintech',
    logos: [
      { src: '/BRI-logo.png', alt: 'BRI' },
      { src: '/BNI-logo.png', alt: 'BNI' },
      { src: '/banksumut-logo.png', alt: 'Bank Sumut' },
      { src: '/bantusaku-logo.png', alt: 'Bantusaku' },
      { src: '/clients/advance-ai.png', alt: 'Advance.AI' },
      { src: '/clients/idmeta.png', alt: 'IDMeta' },
      { src: '/clients/xendit.png', alt: 'Xendit' },
      { src: '/clients/danarupiah.png', alt: 'DanaRupiah' },
    ],
  },
  {
    name: 'Others',
    logos: [
      { src: '/clients/krakatau-steel.png', alt: 'Krakatau Steel' },
      { src: '/clients/antam.png', alt: 'Antam' },
      { src: '/clients/timah.png', alt: 'Timah' },
      { src: '/clients/polytron.png', alt: 'Polytron' },
      { src: '/clients/samsung.png', alt: 'Samsung' },
      // Add another logo example if needed
      // { src: '/clients/another-logo.png', alt: 'Another Logo' },
    ],
  },
];

const ClientsSection = () => {
  return (
    <section className="bg-slate-50 py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We're proud to collaborate with a diverse range of businesses, from innovative fintech startups to established industry giants.
          </p>
        </div>

        {/* Client Logos */}
        <div className="space-y-12">
          {clientCategories.map((category) => (
            <div key={category.name}>
              {/* Category Title */}
              <div className="flex justify-start mb-8">
                <span className="bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-full">
                  {category.name}
                </span>
              </div>
              
              {/* Logo Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-6 items-center">
                {category.logos.map((logo) => (
                  <div key={logo.alt} className="flex justify-center items-center h-20 filter grayscale hover:grayscale-0 transition-all duration-300">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={150} // Default width for aspect ratio
                      height={60} // Default height
                      className="max-h-12 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
              <hr className="mt-8 border-blue-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;