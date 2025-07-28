import { Link } from "react-router-dom";
import { FaInstagram, FaYoutube, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import { footerContentList1, footerContentList2 } from "../../../utils/data";
import { motion } from "framer-motion";

const FooterLayouts = () => {
  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden pt-20 pb-10 z-10">
      {/* Fancy Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-800/70 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 z-10">
        {/* Brand Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/"
            className="text-3xl font-extrabold font-serif text-white hover:text-primaryColor transition"
          >
            Yatra<span className="text-sm text-white">.com</span>
          </Link>
          <p className="mt-4 text-sm text-gray-400">
            Your trusted travel companion. Explore, book, and enjoy seamless travel experiences.
          </p>
        </motion.div>

        {/* Learn More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h4 className="text-lg font-semibold mb-4 text-white">Learn More</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            {footerContentList1.map((item, i) => (
              <li key={i}>
                <Link to={item.url} className="hover:text-primaryColor transition">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Booking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h4 className="text-lg font-semibold mb-4 text-white">Booking</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            {footerContentList2.map((item, i) => (
              <li key={i}>
                <Link to={item.url} className="hover:text-primaryColor transition">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Social Media Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
          <div className="flex space-x-4 text-2xl">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition duration-300 hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-600 transition duration-300 hover:scale-110"
            >
              <FaYoutube />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-sky-500 transition duration-300 hover:scale-110"
            >
              <FaTwitter />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 transition duration-300 hover:scale-110"
            >
              <FaFacebook />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition duration-300 hover:scale-110"
            >
              <FaLinkedin />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Text */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400 z-10 relative">
        © 2025{" "}
        <span className="text-primaryColor font-semibold">
          Yatra<span className="text-sm text-white">.com</span>
        </span>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default FooterLayouts;
