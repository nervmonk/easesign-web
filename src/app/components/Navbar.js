import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    // We added sticky, top-0, z-50, and a shadow
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-6">
        {/* Logo */}
        <div>
          <Link href="/">
            <Image
              src="/easesign-logo.png"
              alt="EaseSign Logo"
              width={150}
              height={40}
              priority
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-600 hover:text-cyan-500 transition-colors">
            HOME
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-cyan-500 transition-colors">
            ABOUT
          </Link>
          <Link href="/contact-us" className="text-gray-600 hover:text-cyan-500 transition-colors">
            CONTACT US
          </Link>
          {/* Search Icon */}
          <button className="text-gray-600 hover:text-cyan-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Button (Optional, for future use) */}
        <div className="md:hidden">
          <button>
            {/* You can add a burger icon here for mobile */}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;