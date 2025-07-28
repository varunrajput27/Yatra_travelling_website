import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email.includes("@") || !formData.message) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setShowSuccess(true);
    }, 2000);
  };

  const handleSuccessOK = () => {
    navigate("/");
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-12" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2070&q=80')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 w-full max-w-xl bg-white/20 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/30">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Contact Shubh Yatra</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl bg-white/80 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primaryColor"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl bg-white/80 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primaryColor"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 rounded-xl bg-white/80 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primaryColor"
              placeholder="Write your message here..."
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={submitting}
              className={`px-6 py-2 rounded-full text-white font-semibold bg-primaryColor transition-all duration-300 ${submitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primaryColor/90'}`}
            >
              {submitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </div>
        </form>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-lg px-8 py-6 text-center animate-fade-in">
            <h3 className="text-xl font-semibold mb-2 text-primaryColor">Message Received!</h3>
            <p className="text-gray-700 mb-4">We will contact you shortly.</p>
            <button
              onClick={handleSuccessOK}
              className="bg-primaryColor text-white px-5 py-2 rounded-full hover:bg-primaryColor/90 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
