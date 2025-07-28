import { useState, useEffect } from "react";
import axios from "axios";
import AdminLayouts from "../Wrapper/AdminLayouts";
import Loader from "../../Fragments/Global/Loader";
import { UserCircle } from "lucide-react";

const ProfileLayouts = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  if (error) {
    return (
      <AdminLayouts>
        <p className="text-red-500 text-center mt-10">Error: {error.message}</p>
      </AdminLayouts>
    );
  }

  if (loading) {
    return (
      <AdminLayouts>
        <div className="flex justify-center items-center h-[80vh]">
          <Loader classname="w-12 h-12" />
        </div>
      </AdminLayouts>
    );
  }

  if (!data) {
    return (
      <AdminLayouts>
        <p className="text-center text-gray-500 dark:text-gray-300 mt-10">No profile data available.</p>
      </AdminLayouts>
    );
  }

  return (
    <AdminLayouts>
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="w-full max-w-md glass-effect p-8 rounded-3xl shadow-2xl backdrop-blur-lg bg-white/20 dark:bg-darkColor/40 border dark:border-gray-700 text-center">
          {data.profilePictureUrl ? (
            <img
              src={data.profilePictureUrl}
              alt="profile"
              className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <UserCircle className="w-32 h-32 text-gray-400 dark:text-gray-500 mx-auto" />
          )}

          <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">{data.name}</h2>
          <p className="text-sm text-blue-500 font-medium">{data.role.toUpperCase()}</p>

          <div className="mt-6 space-y-4 text-left">
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">📧 Email</label>
              <div className="bg-white/60 dark:bg-gray-800 px-4 py-2 rounded-xl text-gray-800 dark:text-white mt-1 shadow-sm">
                {data.email}
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">📱 Phone</label>
              <div className="bg-white/60 dark:bg-gray-800 px-4 py-2 rounded-xl text-gray-800 dark:text-white mt-1 shadow-sm">
                {data.phoneNumber || "Not Provided"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayouts>
  );
};

export default ProfileLayouts;
