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
const RssIcon = () => (
  <svg
    className="h-6 w-6"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M4.5 3a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-3 0V4.5A1.5 1.5 0 014.5 3z" />
    <path
      fillRule="evenodd"
      d="M19.5 3A1.5 1.5 0 0121 4.5v15a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 19.5V11.25a1.5 1.5 0 013 0v7.5a.75.75 0 00.75.75h13.5a.75.75 0 00.75-.75V5.25a.75.75 0 00-.75-.75H12.75a1.5 1.5 0 010-3h6.75zM8.25 7.5a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 010 3H9.75a1.5 1.5 0 01-1.5-1.5zM1.5 4.5a3 3 0 013-3h.008a3 3 0 013 3v.008a3 3 0 01-3 3H4.5a3 3 0 01-3-3V4.5z"
      clipRule="evenodd"
    />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8">
          {/* Column 1: Logo and Button */}
          <div className="space-y-6">
            <Image
              src="/easesign-white.png" // Replace with your white logo
              alt="EaseSign Logo"
              width={150}
              height={40}
            />
            <button className="bg-cyan-400 text-slate-900 font-bold py-2 px-5 rounded hover:bg-cyan-300 transition-colors">
              Privacy Notice
            </button>
          </div>

          {/* Column 2: Address */}
          <div>
            <h3 className="font-bold text-white mb-3">Address</h3>
            <p className="text-sm leading-relaxed">
              Casaverde Office Building, Jl. Mampang Prapatan No. 17, South
              Jakarta, 12790
            </p>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-white mb-1">Phone Number</h3>
              <p className="text-sm">021 - 38915110</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-1">e-Mail</h3>
              <p className="text-sm">info@easesign.id</p>
            </div>
          </div>

          {/* Column 4: Partners */}
          <div>
            <h3 className="font-bold text-white mb-3">
              Electronic System Operator
            </h3>
            <div className="flex items-center gap-4">
              {" "}
              <Image
                src="/kominfo-footer.png"
                alt="DJP Logo"
                width={50}
                height={40}
              />
              <Image
                src="/psre-footer.png"
                alt="Peruri Logo"
                width={80}
                height={40}
              />
            </div>
            <h3 className="font-bold text-white mb-3">Powered by</h3>
            <div className="flex items-center gap-4">
              <Image
                src="/djp-footer.png"
                alt="DJP Logo"
                width={50}
                height={40}
              />
              <Image
                src="/peruri-footer.png"
                alt="Peruri Logo"
                width={80}
                height={40}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Footer with Social Links */}
      <div className="bg-black py-4">
        <div className="container mx-auto px-6 flex justify-center sm:justify-end">
          <div className="flex items-center space-x-4">
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FacebookIcon />
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <XIcon />
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <InstagramIcon />
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <RssIcon />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
