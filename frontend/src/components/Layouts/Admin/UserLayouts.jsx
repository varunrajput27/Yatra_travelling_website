import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayouts from "../Wrapper/AdminLayouts";
import Button from "../../Elements/Button/Index";
import Loader from "../../Fragments/Global/Loader";
import Alert from "../../Fragments/Global/Alert";
import { motion } from "framer-motion";

const UserLayouts = () => {
  const [dataUser, setDataUser] = useState([]);
  const [visibleData, setVisibleData] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "" });

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/user/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDataUser(res.data?.data || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const loadMore = () => {
    setVisibleData((prev) => prev + 6);
  };

  const handleAlertClose = () => {
    setAlert({ show: false, message: "" });
  };

  return (
    <AdminLayouts>
      {alert.show && (
        <Alert
          headerMessage={alert.headerMessage}
          message={alert.message}
          classname={`fixed w-96 right-10 ${alert.style} top-20`}
          onClose={handleAlertClose}
        />
      )}

      <h1 className="mb-8 text-4xl font-extrabold text-darkColor dark:text-white tracking-wide">
        All Users
      </h1>

      {error && <p className="text-red-500">{error?.message}</p>}

      {loading ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2">
          <Loader classname="w-12 h-12" />
        </div>
      ) : (
        <>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {dataUser.slice(0, visibleData).map((user, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300"
              >
                <div className="w-full flex justify-center">
                  <img
                    alt="profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-primaryColor shadow-md transition transform group-hover:scale-105"
                    src={
                      user.profilePictureUrl
                        ? user.profilePictureUrl
                        : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                  />
                </div>
                <div className="mt-4 text-center">
                  <h2 className="text-xl font-semibold text-darkColor dark:text-white">
                    {user.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {user.email}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    📞 {user.phoneNumber}
                  </p>
                  <span className="inline-block mt-3 px-4 py-1 text-xs font-medium rounded-full bg-primaryColor text-white shadow">
                    {user.role}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {visibleData < dataUser.length && (
            <div className="flex justify-center mt-10">
              <Button
                classname="px-6 py-2 text-white rounded-full bg-primaryColor hover:bg-opacity-90 shadow-md hover:shadow-lg transition duration-300"
                onClick={loadMore}
              >
                Load More
              </Button>
            </div>
          )}
        </>
      )}
    </AdminLayouts>
  );
};

export default UserLayouts;


