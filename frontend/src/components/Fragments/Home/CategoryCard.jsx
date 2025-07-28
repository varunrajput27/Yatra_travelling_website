import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Global/Loader";

const CategoryCard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch categories from real API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/categories`);
        setData(res.data?.data || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2">
        <Loader />
      </div>
    );
  }

  // Error
  if (error) {
    return <p className="text-red-500 text-center">Error: {error.message}</p>;
  }

  // Empty
  if (data.length === 0) {
    return <p className="text-gray-500 text-center">No categories found.</p>;
  }

  // Success UI
  return (
    <>
      {data.slice(0, 6).map((v, i) => (
        <div
          key={i}
          onClick={() => navigate("/package", { state: { categoryId: v._id, categoryName: v.name } })}
          className="group relative w-full h-64 rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
        >
          <img
            src={`${import.meta.env.VITE_BACKEND_LINK}${v.imageUrl}`}
            alt={v.name}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 w-full bg-black/50 text-white text-center py-3 backdrop-blur-sm">
            <p className="text-lg font-semibold capitalize tracking-wide">
              {v.name}
            </p>
          </div>

          {/* Optional Hover Effect */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-300"></div>
        </div>
      ))}
    </>
  );
};

export default CategoryCard;


