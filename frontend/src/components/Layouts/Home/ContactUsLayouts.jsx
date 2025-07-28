
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ContactUsLayouts = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleContactClick = () => {

    setLoading(true);
    setTimeout(() => {
      navigate("/contactus");
    }, 1500);
  };

  return (
    <section id="contact"className="relative h-screen w-full scroll-mt-24 overflow-hidden">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1575986767340-5d17ae767ab0?q=80&w=1633&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Beautiful travel background"
        className="absolute top-0 left-0 w-full h-full object-cover object-center z-0"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-white text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-xl leading-tight animate-fade-in">
          Discover the World with <span className="text-primaryColor">Yatra<span className="text-md text-white">.com</span></span>
        </h2>
        <p className="text-gray-200 text-lg md:text-xl max-w-2xl mb-10 drop-shadow-md animate-fade-in delay-200">
          Plan your perfect trip with personalized experiences, expert guides, and unforgettable destinations.
        </p>

        <button
          onClick={handleContactClick}
          disabled={loading}
          className={`px-8 py-3 rounded-full text-white text-lg font-semibold shadow-lg transition-all duration-300 ease-in-out ${
            loading
              ? "bg-primaryColor/60 cursor-not-allowed"
              : "bg-primaryColor hover:bg-primaryColor/90 hover:scale-105"
          } flex items-center gap-3 animate-fade-in delay-500`}
        >
          {loading ? (
            <>
              <svg
                className="w-5 h-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Redirecting...
            </>
          ) : (
            <>
              Contact Us
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </>
          )}
        </button>
      </div>
    </section>
  );
};

export default ContactUsLayouts;
