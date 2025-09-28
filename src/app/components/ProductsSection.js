import React from "react";
import Image from "next/image";

// Product data array
const products = [
  {
    icon: "/signature-vector.png",
    title: "Easy Sign",
    description:
      "We offer an easy, secure and legally valid digital signature solution for our clients. Users can easily send, receive, and digitally authenticate and sign documents.",
    gradient: "from-green-300 to-lime-400",
    isOffset: true,
  },
  {
    icon: "/meterai-vector.png",
    title: "Easy Stamp",
    description:
      "We offer Easy Stamp, an easy, secure, digital form of paper stamps used for electronic document purposes. E-Stamp is fully supported by PERURI (Indonesian Security Printing and Minting Corporation) and DJP (Directorate General of Taxes).",
    gradient: "from-teal-300 to-cyan-400",
    isOffset: false,
  },
];

const ProductCard = ({ product, index }) => (
  <div className={`relative ${index === 0 ? "lg:mt-16" : ""}`}>
    <div
      className={`relative z-10 p-10 rounded-3xl shadow-xl text-slate-800 bg-gradient-to-br ${product.gradient}`}
    >
      <Image
        src={product.icon}
        alt={`${product.title} Icon`}
        width={64} // Corresponds to the original h-16/w-16 size
        height={64}
        className="mb-6"
      />
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
    <section className="bg-white py-24" id="products">
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
