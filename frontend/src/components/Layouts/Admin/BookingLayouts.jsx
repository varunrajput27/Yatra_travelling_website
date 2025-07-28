import { useState, useEffect } from "react";
import AdminLayouts from "../Wrapper/AdminLayouts";
import TableLayouts from "../Wrapper/TableLayouts";
import Pagination from "../../Fragments/Global/Pagination";
import Loader from "../../Fragments/Global/Loader";
import Alert from "../../Fragments/Global/Alert";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BookingLayout = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, message: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");

  const itemsPerPage = 5;

const fetchBookings = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token not found");

    const decoded = jwtDecode(token);
    const roleFromToken = decoded?.role;
    const userIdFromToken = decoded?.userId;

    setRole(roleFromToken);
    setUserId(userIdFromToken);

    let res;

    if (roleFromToken === "admin") {
      res = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/bookings`);
    } else {
      console.log("Decoded Token:", decoded);
      console.log("Using User ID:", userIdFromToken); // ✅ This should be defined

      res = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/bookings/user/${userIdFromToken}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    }

    setBookings(res.data);
  } catch (error) {
    console.error("Error fetching bookings", error);
    setAlert({
      show: true,
      message: "Failed to load bookings",
      headerMessage: "Error",
      style: "text-red-700 bg-red-100 border-red-400 w-96",
    });
  } finally {
    setLoading(false);
  }
};




  useEffect(() => {
    fetchBookings();
  }, []);

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    setCurrentPage(1);
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    setDeletingId(id);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
      setAlert({
        show: true,
        message: "Booking cancelled successfully!",
        headerMessage: "Deleted",
        style: "text-green-700 bg-green-100 border-green-400 w-96",
      });
    } catch (error) {
      console.error("Delete error", error);
      setAlert({
        show: true,
        message: "Failed to cancel booking",
        headerMessage: "Error",
        style: "text-red-700 bg-red-100 border-red-400 w-96",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const filteredBookings = bookings.filter((b) =>
    role === "admin"
      ? b?.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedData = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <AdminLayouts>
      {alert.show && (
        <Alert
          headerMessage={alert.headerMessage}
          message={alert.message}
          classname={`fixed right-10 top-20 z-50 ${alert.style}`}
          onClose={() => setAlert({ show: false, message: "" })}
        />
      )}

      <p className="mb-6 text-3xl font-bold text-darkColor dark:text-white">
        {role === "admin" ? "All Bookings" : "My Bookings"}
      </p>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader classname="w-12 h-12" />
        </div>
      ) : (
        <TableLayouts
          title={role === "admin" ? "Manage Bookings" : "Your Bookings"}
          searchTerm={searchTerm}
          onSearch={handleSearch}
          hideSearch={role !== "admin"}
        >
          {paginatedData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
                <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                  <tr>
                    {role === "admin" && <th className="px-4 py-2">User</th>}
                    {role === "admin" && <th className="px-4 py-2">Email</th>}
                    <th className="px-4 py-2">Phone</th>
                    <th className="px-4 py-2">Package</th>
                    <th className="px-4 py-2">Members</th>
                    <th className="px-4 py-2">Payment</th>
                    <th className="px-4 py-2">Total</th>
                    <th className="px-4 py-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((b) => (
                    <tr key={b._id} className="border-b">
                      {role === "admin" && (
                        <td className="px-4 py-2">{b?.userId?.name}</td>
                      )}
                      {role === "admin" && (
                        <td className="px-4 py-2">{b?.userId?.email}</td>
                      )}
                      <td className="px-4 py-2">{b?.userId?.phoneNumber}</td>
                      <td className="px-4 py-2">{b?.packageId?.title || "N/A"}</td>
                      <td className="px-4 py-2">{b?.members}</td>
                      <td className="px-4 py-2">{b?.paymentMethod}</td>
                      <td className="px-4 py-2">₹{b?.totalPrice}</td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => handleDeleteBooking(b._id)}
                          disabled={deletingId === b._id}
                          className={`text-white px-3 py-1 rounded-md transition-all duration-300 ${
                            deletingId === b._id
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-red-500 hover:bg-red-600"
                          }`}
                        >
                          {deletingId === b._id ? (
                            <span className="flex items-center justify-center gap-2">
                              <svg
                                className="w-4 h-4 animate-spin"
                                fill="none"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8v8z"
                                ></path>
                              </svg>
                              Cancelling...
                            </span>
                          ) : (
                            "Cancel Booking"
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center">No bookings found</p>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </TableLayouts>
      )}
    </AdminLayouts>
  );
};

export default BookingLayout;
