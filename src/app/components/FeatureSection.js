import React from "react";
import Image from "next/image";

// Data for the feature icons.
const featureIcons = [
  "/graphic.png",
  "/security.png",
  "/efficiency.png",
];

const FeatureCard = ({ icon, title, description }) => (
  <div className="relative rounded-3xl border border-white/10 bg-[#0d0c1e]/60 backdrop-blur-md hover:bg-[#17143e]/80 shadow-[0_4px_30px_rgba(0,0,0,0.3)] transition-all duration-300 p-8 flex flex-col h-full group overflow-hidden">
    {/* Subtle gradient hover effect inside the card */}
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

    <div className="relative z-10">
      <div className="h-16 w-16 mb-8 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden">
        {/* Glow behind icon */}
        <div className="absolute inset-0 bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <Image
          src={icon}
          alt={`${title} Icon`}
          width={40}
          height={40}
          className="relative z-10 brightness-0 invert"
        />
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors duration-300">{title}</h3>
      <p className="text-gray-400 leading-relaxed font-light">{description}</p>
    </div>
  </div>
);

const FeaturesSection = ({ dict = {} }) => {
  const dictFeatures = dict.features || [
    { title: "Efficiency and Productivity", description: "Our tailored platform for digital signatures and stamps based customer needs will streamline document workflows, reducing the time and resources required for manual paperwork." },
    { title: "Enhanced Security Measures", description: "Our company has employed advanced encryption techniques and authentication methods to safeguard digital documents against unauthorized access and fraud." },
    { title: "Government Support and Partnerships", description: "Our company has received Electronic System Operator permit from Komdigi Ministry of Communications and Informatics. Our Platform is fully supported by PERURI and Directorate General of Taxes. The validity of the document is certainly guaranteed." }
  ];

  const features = dictFeatures.map((f, i) => ({
    icon: featureIcons[i],
    title: f.title,
    description: f.description
  }));
  return (
    <section className="py-20 relative px-4">
      {/* Glow Effects */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto max-w-[1200px]">
        {/* Header for Features Section */}
        <div className="text-center mb-16 relative z-10">
          <span className="inline-block bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold px-3 py-1 rounded-full tracking-wider uppercase mb-6">
            {dict.badge || 'Platform Capabilities'}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {dict.title || 'Why choose EaseSign?'}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            {dict.subtitle || 'Experience a secure and legally-binding digital signature platform tailored for your modern business operations.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
