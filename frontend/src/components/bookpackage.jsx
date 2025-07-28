import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BookPackage = () => {
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [user, setUser] = useState(null);
  const [members, setMembers] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [loading, setLoading] = useState(false); // ⏳ Spinner state

  // ✅ Get logged-in user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  // ✅ Get package data
  useEffect(() => {
    if (!id) return;
    axios
      .get(`${import.meta.env.VITE_BACKEND_LINK}/api/promo/${id}`)
      .then((res) => setPackageData(res.data.data))
      .catch((err) => console.error("Promo fetch error:", err));
  }, [id]);

  // ✅ Confirm booking
  const handleBooking = async () => {
    setLoading(true); // 🔄 Start spinner
    try {
      const bookingData = {
        userId: user._id,
        packageId: id,
        members,
        paymentMethod,
        totalPrice: members * packageData.promo_discount_price,
      };

      // ⏳ Wait 2 sec to simulate loading
      await new Promise((res) => setTimeout(res, 2000));

      await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/api/bookings`, bookingData);
      alert("✅ Booking Confirmed!");
    } catch (err) {
      console.error("Booking Error:", err);
      alert("❌ Booking failed. Try again.");
    } finally {
      setLoading(false); // ✅ Reset spinner
    }
  };

  if (!user || !packageData)
    return <div className="text-center py-10 text-lg">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* 🧳 Left: Package Details */}
        <div>
          <img
            src={`${import.meta.env.VITE_BACKEND_LINK}${packageData.imageUrl}`}
            alt={packageData.title}
            className="rounded-xl h-60 w-full object-cover"
          />
          <h2 className="mt-4 text-3xl font-bold text-gray-800">{packageData.title}</h2>
          <p className="text-gray-600 mt-2">{packageData.description}</p>
          <p className="mt-3 text-lg font-semibold text-green-600">
            ₹{packageData.promo_discount_price} / person
          </p>
          <p className="text-sm text-gray-500 mt-1">Duration: 7 Days</p>
        </div>

        {/* 📝 Right: Booking Form */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-blue-700 mb-2">Welcome, {user.name}! 🎉</h1>
          <p className="text-gray-600 mb-4">You're just one step away from booking your dream trip.</p>

          <input type="text" value={user.name} disabled className="w-full px-3 py-2 border rounded-md bg-gray-100" />
          <input type="email" value={user.email} disabled className="w-full px-3 py-2 border rounded-md bg-gray-100" />
          <input type="tel" value={user.phoneNumber || ""} disabled className="w-full px-3 py-2 border rounded-md bg-gray-100" />

          {/* Members Counter */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Members</label>
            <div className="flex items-center mt-1">
              <button
                onClick={() => setMembers((m) => Math.max(1, m - 1))}
                className="bg-red-500 text-white px-3 py-1 rounded-l"
              >
                -
              </button>
              <span className="px-5 border-y py-1">{members}</span>
              <button
                onClick={() => setMembers((m) => m + 1)}
                className="bg-green-500 text-white px-3 py-1 rounded-r"
              >
                +
              </button>
            </div>
          </div>

          {/* Payment Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
            <div className="flex gap-3">
              {["upi", "cash", "card"].map((method) => (
                <label key={method} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  {method.toUpperCase()}
                </label>
              ))}
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleBooking}
            disabled={loading}
            className={`mt-4 w-full ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } text-white font-semibold py-2 rounded-md shadow flex justify-center items-center`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Booking...
              </>
            ) : (
              `Confirm Booking ₹${members * packageData.promo_discount_price}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookPackage;

