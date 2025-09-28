import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="container mx-auto flex flex-col md:flex-row items-center p-6 mt-10 md:mt-20">
      {/* Left Column (Text Content) */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <p className="text-gray-500 tracking-widest mb-2">EASESIGN</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
          Digital Solution for Modern Business
        </h1>
        <Link href="#products">
          {" "}
          <button className="mt-8 bg-green-500 text-white font-bold py-3 px-8 rounded-md hover:bg-green-600 transition-all duration-300">
            Learn More
          </button>
        </Link>
      </div>

      {/* Right Column (Image) */}
      <div className="w-full md:w-1/2 mt-12 md:mt-0">
        {/*
          Replace this placeholder with your actual image.
          Make sure to add 'easesign.id' to your next.config.js domains if you're using their image URL directly.
        */}
        <Image
          src="/hero.png" // Placeholder path - put your image in the `public` folder
          alt="Digital signature illustration"
          width={600}
          height={450}
          className="mx-auto"
        />
      </div>
    </section>
  );
};

export default Hero;
