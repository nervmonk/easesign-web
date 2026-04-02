"use client";

import Image from "next/image";
import { useState } from "react";

const PhoneIcon = () => (
  <svg
    className="h-7 w-7"
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
    className="h-7 w-7"
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
    className="h-7 w-7"
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    let tempErrors = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      tempErrors.name = "Name is required.";
    } else if (!/^[a-zA-Z\s'-]+$/.test(trimmedName)) {
      tempErrors.name = "Please enter a valid name (letters and spaces only).";
    }

    if (!trimmedEmail) {
      tempErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    if (!trimmedMessage) {
      tempErrors.message = "Message is required.";
    } else if (trimmedMessage.length < 10) {
      tempErrors.message = "Message must be at least 10 characters long.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("submitting");
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="py-20 md:py-32 relative px-4 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto max-w-[1100px] relative z-10">
        
        {/* Main Glass Card Wrapper */}
        <div className="bg-[#0d0c1e]/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-[0_4px_40px_rgba(0,0,0,0.5)] overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left Side (Title / Graphic) */}
            <div className="relative p-10 md:p-16 flex flex-col justify-center min-h-[400px]">
              {/* Optional: Subtle grid background */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik00MCAwaC0xdjQwaDFWMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMSkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgo8cGF0aCBkPSJNMCA0MGgxVjBoLTF2NDB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDEpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPC9zdmc+')] opacity-50 z-0"></div>
              
              <div className="relative z-10">
                <div className="flex items-center text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase mb-4">
                  <span className="w-8 h-px bg-cyan-500/50 mr-4"></span>
                  Get In Touch
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
                  Contact<br className="hidden lg:block"/> Us
                </h1>
                <p className="mt-8 text-gray-400 text-lg max-w-sm font-light leading-relaxed">
                  Have questions or need assistance? Our team is here to help you revolutionize your digital document workflows.
                </p>
              </div>
            </div>

            {/* Right Side (Form) */}
            <div className="bg-[#15132d]/40 backdrop-blur-sm border-t lg:border-t-0 lg:border-l border-white/10 p-10 md:p-16 relative">
              
              {status === "success" ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-cyan-500/10 text-cyan-400 rounded-2xl flex items-center justify-center mb-6 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Thank you!</h3>
                  <p className="text-gray-400 text-lg font-light leading-relaxed">Your message has been sent successfully.<br/>We will get back to you soon.</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  action="https://formspree.io/f/meoredvv"
                  method="POST"
                  className="flex flex-col h-full w-full max-w-md mx-auto"
                >
                  <div className="flex-grow space-y-10">
                    {/* Name */}
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`peer w-full bg-transparent border-b-2 placeholder-transparent focus:outline-none transition-colors py-2 text-white font-light text-lg ${
                          errors.name ? "border-red-400 focus:border-red-400" : "border-white/20 focus:border-cyan-400"
                        }`}
                      />
                      <label htmlFor="name" className={`absolute p-0 left-0 -top-4 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs font-bold uppercase tracking-[0.1em] ${errors.name ? "text-red-400" : "text-cyan-400"}`}>
                        Name
                      </label>
                      {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name}</p>}
                    </div>
                    
                    {/* Email */}
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`peer w-full bg-transparent border-b-2 placeholder-transparent focus:outline-none transition-colors py-2 text-white font-light text-lg ${
                          errors.email ? "border-red-400 focus:border-red-400" : "border-white/20 focus:border-cyan-400"
                        }`}
                      />
                      <label htmlFor="email" className={`absolute p-0 left-0 -top-4 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs font-bold uppercase tracking-[0.1em] ${errors.email ? "text-red-400" : "text-cyan-400"}`}>
                        Email Address
                      </label>
                      {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
                    </div>
                    
                    {/* Message */}
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        className={`peer w-full bg-transparent border-b-2 placeholder-transparent focus:outline-none transition-colors py-2 text-white font-light text-lg resize-none ${
                          errors.message ? "border-red-400 focus:border-red-400" : "border-white/20 focus:border-cyan-400"
                        }`}
                      ></textarea>
                      <label htmlFor="message" className={`absolute p-0 left-0 -top-4 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs font-bold uppercase tracking-[0.1em] ${errors.message ? "text-red-400" : "text-cyan-400"}`}>
                        Message
                      </label>
                      {errors.message && <p className="text-red-400 text-sm mt-2">{errors.message}</p>}
                    </div>
                  </div>
                  
                  <div className="mt-12 pt-4">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full relative group overflow-hidden bg-cyan-600 rounded-full px-8 py-4 text-white font-bold tracking-[0.2em] uppercase hover:bg-cyan-500 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10">{status === "submitting" ? "Submitting..." : "Send Message"}</span>
                      {status !== "submitting" && (
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-cyan-400/30"></div>
                      )}
                    </button>
                  </div>
                  {status === "error" && (
                    <p className="text-center mt-6 text-red-400 font-medium">
                      Oops! Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
          
          {/* Bottom Section (Contact Details) */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/10 bg-[#0a0914]/80">
            {contactDetails.map((item, index) => (
              <div
                key={index}
                className={`py-12 px-8 flex flex-col xl:flex-row items-center gap-6 justify-center text-center xl:text-left ${
                  index < 2 ? "border-b md:border-b-0 md:border-r border-white/10" : ""
                } hover:bg-white/[0.03] transition-colors duration-300`}
              >
                <div className="h-16 w-16 min-w-[64px] rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-shadow">
                  {item.icon}
                </div>
                <p className="text-gray-300 whitespace-pre-line font-light leading-relaxed text-base">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
