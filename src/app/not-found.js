import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* The <main> tag grows to fill the available space */}
      <main className="flex flex-grow flex-col items-center justify-center text-center px-6 py-20">
        <div className="max-w-md">
          {/* Large "404" text */}
          <h1 className="text-8xl font-extrabold text-cyan-500">404</h1>

          {/* Main Heading */}
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="mt-4 text-base text-gray-600">
            Oops! It looks like the page you’re looking for doesn’t exist.
          </p>

          {/* Home Button */}
          <div className="mt-10">
            <Link
              href="/"
              className="inline-block rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
