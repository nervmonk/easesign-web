import React from "react";
import Image from "next/image";

// Data for the feature cards. This makes it easy to add, remove, or change content.
const features = [
  {
    icon: "/graphic.png",
    title: "Efficiency and Productivity",
    description:
      "Our tailored platform for digital signatures and stamps based on customer needs will streamline document workflows, reducing the time and resources required for manual paperwork.",
  },
  {
    icon: "/security.png",
    title: "Enhanced Security Measures",
    description:
      "Our company has employed advanced encryption techniques and authentication methods to safeguard digital documents against unauthorized access and fraud.",
  },
  {
    icon: "/efficiency.png",
    title: "Government Support and Partnerships",
    description:
      "Our company has received Electronic System Operator permit from Kominfo Ministry of Communications and Informatics. Our Platform is fully supported by PERURI and Directorate General of Taxes. The validity of the document is certainly guaranteed.",
  },
];

const FeatureCard = ({ icon, title, description }) => (
  <div className="border border-cyan-200 rounded-lg p-8 flex flex-col h-full">
    <Image
      src={icon}
      alt={`${title} Icon`}
      width={48} // Corresponds to the original h-12/w-12 size
      height={48}
      className="mb-6"
    />
    <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const FeaturesSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
