import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative px-4 py-16 md:py-24 overflow-hidden">
      {/* Glow Effects in the background */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto max-w-[1200px]">
        {/* The Glass/Glow Card */}
        <div className="relative rounded-3xl border border-indigo-500/30 bg-[#0d0c1e] shadow-[0_0_80px_-20px_rgba(124,58,237,0.25)] p-8 md:p-16 lg:p-20 overflow-hidden flex flex-col md:flex-row items-center gap-12">

          {/* Side Tab (JetBrains Style) */}
          <div className="absolute top-20 -left-1 sm:-left-[2px] bg-gradient-to-b from-purple-500 to-indigo-500 text-white text-xs font-bold px-4 py-1.5 -rotate-90 origin-bottom-left rounded-t-md tracking-wider">
            EaseSign
          </div>

          {/* Left Column (Text Content) */}
          <div className="w-full md:w-3/5 text-center md:text-left z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-6">
              Secure Documents. <br className="hidden md:block" /> Signed and Sealed in Seconds
            </h1>

            <h2 className="text-2xl md:text-3xl text-purple-400 font-medium mb-6">
              Now with AI-powered document analysis
            </h2>

            <p className="text-gray-400 text-lg max-w-lg mx-auto md:mx-0 mb-10 leading-relaxed font-light">
              Use it via the EaseSign portal, or connect your API key for seamless system integration, all in one unified experience.
            </p>

            <Link href="#products">
              <button className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors shadow-lg shadow-white/10 hover:shadow-white/20">
                Try now
              </button>
            </Link>
          </div>

          {/* Right Column (Image/Decoration) */}
          <div className="w-full md:w-2/5 z-10 relative">
            <div className="relative w-full aspect-square max-w-[400px] mx-auto">
              {/* Decorative background shapes simulating the JetBrains logo graphics */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-purple-600/20 to-indigo-400/20 rounded-full blur-[40px]"></div>

              <Image
                src="/hero.png" // Placeholder path
                alt="Digital signature illustration"
                fill
                className="object-contain drop-shadow-2xl brightness-110 contrast-125"
              />
            </div>
          </div>

          {/* Abstract subtle grid pattern overlay over the card body */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik00MCAwaC0xdjQwaDFWMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMSkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgo8cGF0aCBkPSJNMCA0MGgxVjBoLTF2NDB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDEpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPHBhdGggZD0iTTAgMGg0MHYxaC00MFYweightIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDEpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPC9zdmc+')] opacity-50 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
