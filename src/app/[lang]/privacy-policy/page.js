import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PrivacyNotice from "../../components/PrivacyNotice";
import { getDictionary } from "../../dictionaries";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: 'Privacy Notice | EaseSign',
    description: lang === 'en'
      ? 'Read the EaseSign Privacy Notice to understand how we collect, use, and protect your personal data.'
      : 'Baca Kebijakan Privasi EaseSign untuk memahami bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda.',
  };
}

export default async function PrivacyNoticePage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-white">
        <Navbar lang={lang} dict={dict.navbar} />
        <PrivacyNotice />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
