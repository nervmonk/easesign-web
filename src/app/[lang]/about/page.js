import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AboutHero from '../../components/AboutHero';
import VisionSection from '../../components/VisionSection';
import TeamSection from '../../components/TeamSection';
import { getDictionary } from '../../dictionaries';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: lang === 'en' ? 'About Us - Trusted Digital Signatures | EaseSign' : 'Tentang Kami - Penyedia Tanda Tangan Digital Terpercaya | EaseSign',
    description: lang === 'en' ? 'Learn about EaseSign (PT Paramita Digital Nusantara), our vision, and the professional team behind secure and trusted digital document solutions.' : 'Pelajari tentang EaseSign (PT Paramita Digital Nusantara), visi kami, dan tim profesional di balik solusi dokumen digital yang aman.',
  };
}

export default async function AboutPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#180f33] via-[#0d0d1a] to-[#050505] text-white font-sans overflow-x-hidden">
      <main className="flex-grow">
        <Navbar lang={lang} dict={dict.navbar} />
        <AboutHero lang={lang} dict={dict.aboutHero} />
        <VisionSection dict={dict.visionSection} />
        <TeamSection dict={dict.teamSection} />
        {/* You can add more sections for the about page here */}
      </main>
      <Footer lang={lang} dict={dict.footer} />
    </div>
  );
}