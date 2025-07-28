import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Package = () => {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);

  const navigate = useNavigate();

  const fetchPromos = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/promos`);
      setPromos(res.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  const handleBook = (promo) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to continue booking.");
      navigate("/login");
      return;
    }

    setClickedIndex(promo._id);
    setTimeout(() => {
      navigate(`/bookpackage/${promo._id}`);
    }, 1000);
  };

  if (loading) return <p className="text-center text-xl py-20">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;
  if (!promos || promos.length === 0) return <p className="text-center">No data available.</p>;

  return (
    <>
      {/* Fixed Fancy Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
           <span className="text-primaryColor">Yatra
  <span className="text-sm text-white">.com</span></span>
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                document.documentElement.classList.toggle("dark");
              }}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:scale-105 transition"
            >
              change Theme
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <section className="pt-28 pb-16 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-3">
            🌍 Explore Best Travel Deals
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Book your perfect vacation with unbeatable prices!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {promos.map((v, i) => (
            <div
              key={v._id}
              className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <div className="relative">
                <img
                  src={`${import.meta.env.VITE_BACKEND_LINK}${v.imageUrl}`}
                  alt={v.promo_code}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-3 left-3 bg-white dark:bg-gray-900 text-blue-600 dark:text-cyan-400 font-bold text-xs px-3 py-1 rounded-full shadow">
                  {v.promo_code}
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between h-[200px]">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white truncate">
                    {v.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 line-clamp-2">
                    {v.description ||
                      "Discover exclusive travel experiences with our limited-time offers!"}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-green-600 text-lg font-bold">
                      ₹{v.promo_discount_price}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                      7 Days Package
                    </p>
                  </div>
                  <button
                    className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
                    disabled={clickedIndex === v._id}
                    onClick={() => handleBook(v)}
                  >
                    {clickedIndex === v._id ? "Processing..." : "Book Now"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Package;
