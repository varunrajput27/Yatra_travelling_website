import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Users, BookOpen, Tag, Folder, LayoutGrid } from "lucide-react";
import AdminLayouts from "../Wrapper/AdminLayouts";
import Loader from "../../Fragments/Global/Loader";

const DashboardLayouts = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [totalUser, setTotalUser] = useState(0);
  const [totalBooking, setTotalBooking] = useState(0);
  const [totalPromo, setTotalPromo] = useState(0);
  const [totalCategory, setTotalCategory] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usersRes, bookingsRes, promosRes, categoriesRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/user/all`),
          axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/bookings`),
          axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/promos`),
          axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/categories`),
        ]);

        setTotalUser(usersRes.data?.data?.length || 0);
        setTotalBooking(bookingsRes.data?.length || 0);
        setTotalPromo(promosRes.data?.data?.length || 0);
        setTotalCategory(categoriesRes.data?.data?.length || 0);

        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalOverall = totalUser + totalBooking + totalPromo + totalCategory;

  const dataDashboard = [
    {
      title: "Total Users",
      count: totalUser,
      icon: <Users className="w-8 h-8 text-white" />,
      color: "bg-gradient-to-r from-indigo-500 to-purple-500",
    },
    {
      title: "Total Bookings",
      count: totalBooking,
      icon: <BookOpen className="w-8 h-8 text-white" />,
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
    },
    {
      title: "Total Promos",
      count: totalPromo,
      icon: <Tag className="w-8 h-8 text-white" />,
      color: "bg-gradient-to-r from-yellow-500 to-orange-500",
    },
    {
      title: "Total Categories",
      count: totalCategory,
      icon: <Folder className="w-8 h-8 text-white" />,
      color: "bg-gradient-to-r from-pink-500 to-red-500",
    },
  ];

  return (
    <AdminLayouts title="Dashboard">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader classname="w-12 h-12" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-lg text-center font-semibold">{error}</div>
      ) : (
        <>
          {/* 🎯 Total Overall Card */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 rounded-2xl shadow-2xl bg-gradient-to-r from-cyan-500 to-blue-600 p-8 flex items-center justify-between"
          >
            <div className="text-white">
              <h2 className="text-lg md:text-xl font-semibold opacity-80">Total Dashboard Items</h2>
              <p className="text-4xl md:text-5xl font-extrabold animate-pulse">{totalOverall}</p>
            </div>
            <div className="bg-white/20 rounded-full p-5">
              <LayoutGrid className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* 🔢 Detailed Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataDashboard.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl shadow-xl p-6 flex items-center justify-between ${item.color}`}
              >
                <div className="text-white">
                  <h2 className="text-sm md:text-base font-medium opacity-80">{item.title}</h2>
                  <p className="text-3xl font-bold">{item.count}</p>
                </div>
                <div className="bg-white/20 rounded-full p-3">{item.icon}</div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </AdminLayouts>
  );
};

export default DashboardLayouts;
