import { motion } from "framer-motion";

const HeroLayouts = () => {
  return (
    <section
      id="banner"
      className="relative h-screen w-full overflow-hidden dark:bg-gray-900"
    >
      {/* Background Image */}
      <img
        src="https://plus.unsplash.com/premium_photo-1664476291505-93b2ef4256ac?q=80&w=1471&auto=format&fit=crop"
        alt="Travel Background"
        className="w-full h-full object-cover object-center"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-wide"
        >
          Welcome to{" "}
          <span className="text-primaryColor">
            Yatra<span className="text-3xl  text-white">.com</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-6 text-lg sm:text-xl max-w-2xl text-gray-200"
        >
          Experience unforgettable adventures with India’s trusted travel partner.
        </motion.p>
      </div>
    </section>
  );
};

export default HeroLayouts;

 