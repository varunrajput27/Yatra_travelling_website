import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import { User } from "lucide-react"; 
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({ showProfileName, classname }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
     const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchProfile();
  }, [token]);

 const handleLogout = async () => {
  try {
    await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/user/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.log("Logout error:", err);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/", { replace: true }); // 
  }
};


  if (loading) {
    return <Loader classname="w-5 h-5" />;
  }

  if (!user) {
    return <p className="text-red-500">User not found</p>;
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center justify-center w-full">
         
           {user.profilePictureUrl ? (
            <img
              src={user.profilePictureUrl}
              className="object-cover border-2 border-white rounded-full shadow-sm w-7 h-7 md:mr-4"
              alt="profile_picture"
            />
          ) : (
            <User className="w-7 h-7 p-1 text-white bg-primaryColor rounded-full md:mr-4" />
          )}
          {showProfileName && (
            <span className="hidden font-medium text-darkColor dark:text-white md:block">
              {user.name}
            </span>
          )}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform scale-95"
        enterTo="transform scale-100"
        leave="transition ease-in duration=75"
        leaveFrom="transform scale-100"
        leaveTo="transform scale-95"
      >
        <Menu.Items
          className={`absolute right-0 z-50 w-56 mt-2 origin-top-right dark:bg-white bg-darkColor rounded shadow-sm ${classname}`}
        >
          <div className="p-1">
            <Menu.Item>
              <Link
                to="/profile"
                className="flex items-center p-2 text-sm text-white transition-colors rounded dark:text-darkColor hover:bg-blue-400 hover:text-white group"
              >
                Profile
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                to="/dashboard"
                className="flex items-center p-2 text-sm text-white transition-colors rounded dark:text-darkColor hover:bg-blue-400 hover:text-white group"
              >
                Dashboard
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                onClick={handleLogout}
                to="#"
                className="flex items-center p-2 text-sm text-white transition-colors rounded dark:text-darkColor hover:bg-blue-400 hover:text-white group"
              >
                Logout
              </Link>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileDropdown;

