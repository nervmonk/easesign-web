import Navbar from './components/Navbar'
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import FeatureSection from './components/FeatureSection';
import ValuePropsSection from './components/ValuePropsSection';
import ProductsSection from './components/ProductsSection';
import ClientSection from './components/ClientSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="bg-white text-gray-800">
      <Navbar />
      <Hero />
      <AboutSection/>
      <FeatureSection />
      <ValuePropsSection/>
      <ProductsSection/>
      <ClientSection/>
      <Footer/>
      {/* You can add the rest of your page sections here */}
    </main>
  );
}
