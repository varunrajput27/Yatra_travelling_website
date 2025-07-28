import { useState } from "react";

const AboutUsLayouts = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleExploreClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      window.location.href = "/package";
    }, 1000);
  };

  return (
    <section id="about" className="bg-white dark:bg-gray-900 py-12 scroll-mt-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-primaryColor text-sm font-semibold uppercase mb-2">
          About Us
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Explore the World with <span className="text-primaryColor">Yatra
  <span className="text-sm  text-gray-900 dark:text-white">.com</span></span>
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">
          Yatra<span className="text-sm">.com</span> is your gateway to unforgettable journeys. Whether you're craving
          mountains, beaches, or cultural wonders — we help you discover breathtaking
          destinations. Secure and beautiful admin tools enhance your experience.
        </p>

        <button
          onClick={handleExploreClick}
          disabled={isLoading}
          className={`px-6 py-2 font-semibold rounded-full transition 
            ${isLoading
              ? "bg-primaryColor/50 cursor-not-allowed"
              : "bg-primaryColor hover:bg-primaryColor/90 text-white"
            }`}
        >
          {isLoading ? "Redirecting..." : "Explore Packages"}
        </button>
      </div>

      <div className="mt-12 max-w-3xl mx-auto">
        <img
          src="https://images.unsplash.com/photo-1592076829872-c41dc1274060?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="About Shubh Yatra"
          className="w-full h-auto rounded-2xl shadow-lg object-cover"
        />
      </div>
    </section>
  );
};

export default AboutUsLayouts;

