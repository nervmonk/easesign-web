import Image from "next/image";
import Link from "next/link";

// SVGs for Social Icons
const FacebookIcon = () => (
  <svg
    className="h-6 w-6"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
      clipRule="evenodd"
    />
  </svg>
);
const XIcon = () => (
  <svg
    className="h-6 w-6"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const InstagramIcon = () => (
  <svg
    className="h-6 w-6"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 4.22c.636-.247 1.363-.416 2.427-.465C9.793 2.013 10.147 2 12.315 2zm-1.002 11.23a4.23 4.23 0 118.46 0 4.23 4.23 0 01-8.46 0zm6.34-6.883a1.214 1.214 0 10-2.428 0 1.214 1.214 0 002.428 0z"
      clipRule="evenodd"
    />
  </svg>
);
const LinkedInIcon = () => (
  <svg
    className="h-6 w-6"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const Footer = ({ lang = 'id', dict = {} }) => {
  return (
    <footer className="relative border-t border-white/10 bg-[#050505] text-gray-400 overflow-hidden font-light">
      {/* Decorative Top Edge Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-12">

          {/* Column 1: Logo and Button */}
          <div className="space-y-8 flex flex-col items-start">
            <div className="h-10 w-40 relative">
              <Image
                src="/easesign-white.png" // Replace with your white logo
                alt="EaseSign Logo"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm leading-relaxed max-w-[250px] opacity-80">
              {dict.tagline || 'Transforming your document workflows with secure, legally valid digital signatures and e-meterai.'}
            </p>
            <Link
              href={`/${lang}/privacy-policy`}
              className="inline-block border border-cyan-500/30 text-cyan-400 font-bold py-2.5 px-6 rounded-full hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300 text-xs tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            >
              {dict.privacyNotice || 'Privacy Notice'}
            </Link>
          </div>

          {/* Column 2: Address */}
          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-[0.1em] text-sm">{dict.address || 'Address'}</h3>
            <p className="text-sm leading-relaxed opacity-80">
              Dea Tower II, 15th Floor Suite<br />
              Jl. Mega Kuningan Barat Kav. E4.3 No. 1-2<br />
              South Jakarta, 12950
            </p>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-white mb-3 uppercase tracking-[0.1em] text-sm flex items-center gap-2">
                <svg className="w-4 h-4 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                {dict.phone || 'Phone Number'}
              </h3>
              <p className="text-sm opacity-80 transition-opacity hover:opacity-100 cursor-pointer">021 - 38915110</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-3 uppercase tracking-[0.1em] text-sm flex items-center gap-2">
                <svg className="w-4 h-4 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                e-Mail
              </h3>
              <p className="text-sm opacity-80 transition-opacity hover:opacity-100 cursor-pointer">info@easesign.id</p>
            </div>
          </div>

          {/* Column 4: Partners */}
          <div>
            <h3 className="font-bold text-white mb-4 uppercase tracking-[0.1em] text-xs">
              Electronic System Operator
            </h3>
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="h-8 w-16 relative opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                <Image src="/kominfo-logo.png" alt="Komdigi Logo" fill className="object-contain object-left brightness-0 invert" />
              </div>
              <div className="h-8 w-20 relative opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                <Image src="/psre-footer.png" alt="PSrE Logo" fill className="object-contain object-left brightness-0 invert" />
              </div>
            </div>

            <h3 className="font-bold text-white mb-4 uppercase tracking-[0.1em] text-xs">
              Powered by
            </h3>
            <div className="flex flex-wrap items-center gap-6">
              <div className="h-8 w-12 relative opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                <Image src="/djp-logo.png" alt="DJP Logo" fill className="object-contain object-left brightness-0 invert" />
              </div>
              <div className="h-8 w-24 relative opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                <Image src="/peruri-logo.png" alt="Peruri Logo" fill className="object-contain object-left brightness-0 invert" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Sub-Footer with Social Links */}
      <div className="border-t border-white/5 bg-[#030303] py-6">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600 tracking-wider">
            &copy; {new Date().getFullYear()} PT Paramita Digital Nusantara. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            {/* <Link href="#" className="text-gray-500 hover:text-cyan-400 transition-colors transform hover:-translate-y-1 duration-300">
              <FacebookIcon />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-cyan-400 transition-colors transform hover:-translate-y-1 duration-300">
              <XIcon />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-cyan-400 transition-colors transform hover:-translate-y-1 duration-300">
              <InstagramIcon />
            </Link> */}
            <Link href="https://www.linkedin.com/company/easesign-id/" target="_blank" className="text-gray-500 hover:text-cyan-400 transition-colors transform hover:-translate-y-1 duration-300">
              <LinkedInIcon />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
