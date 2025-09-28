// "use client" is required for interactive components
"use client";

import Image from "next/image";
import { useState } from "react"; // useState for handling form state

// (Your icon components remain the same)
const PhoneIcon = () => (
  <svg
    className="h-8 w-8"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />{" "}
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
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
    />{" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
    />{" "}
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
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
    />{" "}
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
    // Sanitize by trimming whitespace
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    // Name validation: not empty, no numbers, sensible characters
    if (!trimmedName) {
      tempErrors.name = "Name is required.";
    } else if (!/^[a-zA-Z\s'-]+$/.test(trimmedName)) {
      tempErrors.name = "Please enter a valid name (letters and spaces only).";
    }

    // Email validation: not empty, valid format
    if (!trimmedEmail) {
      tempErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    // Message validation: not empty, minimum length
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
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    setStatus("submitting");
    // We create a FormData object to send to Formspree
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
        setFormData({ name: "", email: "", message: "" }); // Clear form on success
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="bg-gray-50 pt-16 lg:pt-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side */}
          <div className="relative py-20 px-6 sm:px-12 flex flex-col justify-center">
            <Image
              src="/graphic-bg.png"
              alt="Decorative background wave"
              layout="fill"
              objectFit="cover"
              className="z-0 opacity-50"
            />
            <div className="relative z-10">
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mt-2">
                Contact Us
              </h1>
            </div>
          </div>
          {/* Right Side */}
          <div className="bg-teal-400 p-8 sm:p-12 text-white flex items-center justify-center">
            {status === "success" ? (
              <div className="text-center">
                <h3 className="text-2xl font-bold">Thank you!</h3>
                <p className="mt-2">Your message has been sent successfully.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                action="https://formspree.io/f/meoredvv"
                method="POST"
                className="flex flex-col h-full w-full"
              >
                <div className="flex-grow space-y-6">
                  <div>
                    <label htmlFor="name" className="sr-only">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-transparent border-b placeholder-white/80 focus:outline-none focus:border-white transition-colors py-2 ${
                        errors.name ? "border-yellow-300" : "border-white/50"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-yellow-300 text-sm mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-transparent border-b placeholder-white/80 focus:outline-none focus:border-white transition-colors py-2 ${
                        errors.email ? "border-yellow-300" : "border-white/50"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-yellow-300 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="message" className="sr-only">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full bg-transparent border-b placeholder-white/80 focus:outline-none focus:border-white transition-colors py-2 ${
                        errors.message ? "border-yellow-300" : "border-white/50"
                      }`}
                    ></textarea>
                    {errors.message && (
                      <p className="text-yellow-300 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="border border-white rounded-full px-12 py-3 text-white font-bold tracking-widest uppercase hover:bg-white hover:text-teal-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? "Submitting..." : "Submit"}
                  </button>
                </div>
                {status === "error" && (
                  <p className="text-center mt-4 text-yellow-300">
                    Oops! Something went wrong. Please try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
        {/* Bottom Section */}
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
