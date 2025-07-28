import { motion } from "framer-motion";
import { useEffect } from "react";

const activities = [
  {
    title: "Mountain Hiking",
    image: "/mounthiking.avif",
    desc: "Experience the thrill of hiking through majestic mountain trails.",
  },
  {
    title: "River Boating",
    image: "/river boating.avif",
    desc: "Glide through serene rivers surrounded by lush landscapes.",
  },
  {
    title: "Beach Relaxation",
    image: "/beach relaxation.avif",
    desc: "Unwind on sun-kissed beaches and enjoy peaceful sunsets.",
  },
  {
    title: "Skydiving",
    image: "/sky diving.avif",
    desc: "Dive from the skies and feel the rush of ultimate freedom.",
  },
  {
    title: "Camping",
    image: "/camping.avif",
    desc: "Sleep under the stars and reconnect with nature's peace.",
  },
  {
    title: "Water Jetpack",
    image: "/water jetpack.jpg",
    desc: "Challenge yourself by scaling great heights and water paths.",
  },
];

const ActivityLayouts = () => {
  

  return (
    <section
      id="activity"
      className="py-20 transition-all duration-400 dark:bg-gray-900 scroll-mt-24  bg-white"
    >
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <p className="text-primaryColor font-semibold text-lg tracking-widest uppercase">
            Best Activities
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 dark:text-white mt-2 leading-snug">
            Explore Interesting Activities in Our Destinations
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {activities.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-2xl overflow-hidden shadow-lg backdrop-blur-sm bg-white/80 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transform transition-all duration-300"
            >
              <div className="overflow-hidden h-56">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivityLayouts;
