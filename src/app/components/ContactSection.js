import Image from "next/image";

// Icons for the contact details section
const PhoneIcon = () => (
  <svg
    className="h-8 w-8"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);
const MapPinIcon = () => (
  <svg
    className="h-8 w-8"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
    />
  </svg>
);
const EnvelopeIcon = () => (
  <svg
    className="h-8 w-8"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
    />
  </svg>
);

const contactDetails = [
  { icon: <PhoneIcon />, detail: "021 - 38915119" },
  {
    icon: <MapPinIcon />,
    detail:
      "Dea Tower II 15th Floor Suite,\nJl. Mega Kuningan Barat Kav. E4.3 No 1-2,\nSouth Jakarta, 12950",
  },
  { icon: <EnvelopeIcon />, detail: "info@easesign.id" },
];

const ContactSection = () => {
  return (
    // THE ONLY CHANGE IS HERE: Added pt-16 lg:pt-20 for top padding
    <section className="bg-gray-50 pt-16 lg:pt-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side: Title and Decorative BG */}
          <div className="relative py-20 px-6 sm:px-12 flex flex-col justify-center">
            <Image
              src="/graphic-bg.png" // Replace with your decorative background
              alt="Decorative background wave"
              layout="fill"
              objectFit="cover"
              className="z-0 opacity-50"
            />
            <div className="relative z-10">
              <p className="text-sm font-bold tracking-wider text-gray-600 uppercase">
                Contact
              </p>
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mt-2">
                Contact Us
              </h1>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="bg-teal-400 p-8 sm:p-12 text-white">
            <form className="flex flex-col h-full">
              <div className="flex-grow space-y-8">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    className="w-full bg-transparent border-b border-white/50 placeholder-white/80 focus:outline-none focus:border-white transition-colors py-2"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email Address
                  </label>

                  <input
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    className="w-full bg-transparent border-b border-white/50 placeholder-white/80 focus:outline-none focus:border-white transition-colors py-2"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Message"
                    rows="4"
                    className="w-full bg-transparent border-b border-white/50 placeholder-white/80 focus:outline-none focus:border-white transition-colors py-2"
                  ></textarea>
                </div>
              </div>
              <div className="mt-8 text-center">
                <button
                  type="submit"
                  className="border border-white rounded-full px-12 py-3 text-white font-bold tracking-widest uppercase hover:bg-white hover:text-teal-500 transition-all duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Section: Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t">
          {contactDetails.map((item, index) => (
            <div
              key={index}
              className={`py-12 px-6 flex flex-col items-center text-center ${
                index < 2 ? "md:border-r" : ""
              }`}
            >
              <div className="text-teal-500 mb-4">{item.icon}</div>
              <p className="text-gray-600 whitespace-pre-line">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
