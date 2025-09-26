import React from 'react';

// Product data array
const products = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    title: 'Easy Sign',
    description: 'We offer an easy, secure and legally valid digital signature solution for our clients. Users can easily send, receive, and digitally authenticate and sign documents.',
    gradient: 'from-green-300 to-lime-400',
    isOffset: true,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Easy Stamp',
    description: 'We offer Easy Stamp, an easy, secure, digital form of paper stamps used for electronic document purposes. E-Stamp is fully supported by PERURI (Indonesian Security Printing and Minting Corporation) and DJP (Directorate General of Taxes).',
    gradient: 'from-teal-300 to-cyan-400',
    isOffset: false,
  },
];


const ProductCard = ({ product, index }) => (
  <div className={`relative ${index === 0 ? 'lg:mt-16' : ''}`}>
    <div className={`relative z-10 p-10 rounded-3xl shadow-xl text-slate-800 bg-gradient-to-br ${product.gradient}`}>
      <div className="mb-6">{product.icon}</div>
      <h3 className="text-2xl font-bold mb-4">{product.title}</h3>
      <p>{product.description}</p>
    </div>
    {/* Decorative shape for the second card */}
    {index === 1 && (
      <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-tl-3xl z-0" />
    )}
  </div>
);

const ProductsSection = () => {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-16">
          Our Products
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-20 items-start">
          {products.map((product, index) => (
            <ProductCard key={product.title} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;