import ClientWrapper from './ClientWrapper';
import { getDictionary } from '../../dictionaries';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  return {
    title: lang === 'en' ? 'Sign PDF Online | EaseSign' : 'Tanda Tangan PDF Online | EaseSign',
    description: lang === 'en' ? 'Quick, secure, and privacy-first PDF electronic signature.' : 'Tanda tangan elektronik PDF yang cepat, aman, dan memprioritaskan privasi.'
  }
}

export default async function SignPdfServer({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return <ClientWrapper lang={lang} dict={dict.signPdf} navbarDict={dict.navbar} />;
}
