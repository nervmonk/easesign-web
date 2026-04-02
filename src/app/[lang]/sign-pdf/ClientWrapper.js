"use client";

import dynamic from 'next/dynamic';

const Client = dynamic(() => import('./Client'), { ssr: false });

export default function SignPdfWrapper({ lang, dict, navbarDict }) {
  return <Client lang={lang} dict={dict} navbarDict={navbarDict} />;
}
