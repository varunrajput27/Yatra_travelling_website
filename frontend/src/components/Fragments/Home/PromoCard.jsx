import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PromoCard = () => {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;
  if (!promos || promos.length === 0) return <p className="text-center">No data available.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2 sm:px-4">
      {promos.slice(0, 9).map((v, i) => (
        <div
          key={i}
          onClick={() =>
            navigate("/package", {
              state: {
                promoCode: v.promo_code,
                discount: v.promo_discount_price,
              },
            })
          }
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
        >
          <div className="relative">
            <img
              src={`http://localhost:5000${v.imageUrl}`}
              alt={v.promo_code}
              className="w-full h-52 object-cover object-center rounded-t-3xl"
            />
            <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-700/80 text-sm px-3 py-[6px] rounded-lg shadow font-bold text-gray-800 dark:text-white">
              {v.promo_code}
            </div>
          </div>

          <div className="p-4 flex flex-col gap-2">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-1">
              {v.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {v.terms_condition?.slice(0, 60) || "Special destination offer."}
            </p>
            <div className="mt-2">
              <span className="text-primaryColor font-semibold text-lg">
                ₹{v.promo_discount_price}
              </span>
              <span className="ml-1 text-gray-500 text-sm">/offer</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromoCard;


