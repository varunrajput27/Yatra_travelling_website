import { useEffect, useState } from "react";
import AdminLayouts from "../Wrapper/AdminLayouts";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../Fragments/Global/Loader";
import Alert from "../../Fragments/Global/Alert";

const EditPromoLayouts = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", headerMessage: "", style: "" });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    terms_condition: "",
    promo_code: "",
    promo_discount_price: 0,
    minimum_claim_price: 0,
  });

  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [profilePictureName, setProfilePictureName] = useState("");

  // Get promo data
  const fetchPromoData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/get-promo/${id}`);
      if (response?.data) {
        setFormData({
          title: response.data.title || "",
          description: response.data.description || "",
          imageUrl: response.data.imageUrl || "",
          terms_condition: response.data.terms_condition || "",
          promo_code: response.data.promo_code || "",
          promo_discount_price: response.data.promo_discount_price || 0,
          minimum_claim_price: response.data.minimum_claim_price || 0,
        });
      }
    } catch (err) {
      console.error("Error fetching promo:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromoData();
  }, []);

  const handleAlertClose = () => {
    setAlert({ show: false, message: "", headerMessage: "", style: "" });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = new FormData();
      dataToSend.append("title", formData.title);
      dataToSend.append("description", formData.description);
      dataToSend.append("terms_condition", formData.terms_condition);
      dataToSend.append("promo_code", formData.promo_code);
      dataToSend.append("promo_discount_price", formData.promo_discount_price);
      dataToSend.append("minimum_claim_price", formData.minimum_claim_price);

      if (profilePictureFile) {
        dataToSend.append("image", profilePictureFile);
      }

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_LINK}/api/update-promo/${id}`,
        dataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setAlert({
        show: true,
        headerMessage: "Success!",
        message: "Promo updated successfully!",
        style: "text-green-700 bg-green-200 border-green-400 w-96",
      });

      setTimeout(() => {
        setAlert({ show: false, message: "" });
        navigate("/promo");
      }, 2000);
    } catch (error) {
      console.error("Update failed:", error.message);
      setAlert({
        show: true,
        headerMessage: "Error!",
        message: "Failed to update promo.",
        style: "text-red-700 bg-red-100 border-red-400 w-96",
      });
    }
  };

  return (
    <AdminLayouts>
      {alert?.show && (
        <Alert
          headerMessage={alert.headerMessage}
          message={alert.message}
          classname={`fixed right-10 ${alert.style} top-20`}
          onClose={handleAlertClose}
        />
      )}

      <p className="mb-6 text-3xl font-bold text-darkColor dark:text-white">Edit Promo</p>

      {loading ? (
        <div className="absolute top-1/2 left-[43%] md:left-[47%]">
          <Loader classname="w-12 h-12" />
        </div>
      ) : (
        <div className="p-6 mb-4 bg-white border border-gray-100 rounded-md shadow-md text-dark-900 dark:text-white dark:border-gray-700 dark:bg-gray-700 shadow-black/5">
          <form onSubmit={handleUpdate}>
            <div className="flex flex-col gap-4">
              {/* Title and Code */}
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="w-full">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    className=" bg-white text-black w-full p-2 mt-1 border rounded"
                    placeholder="Promo Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="promo_code">Promo Code:</label>
                  <input
                    type="text"
                    id="promo_code"
                    className=" bg-white text-black w-full p-2 mt-1 border rounded"
                    placeholder="PROMO2025"
                    value={formData.promo_code}
                    onChange={(e) => setFormData({ ...formData, promo_code: e.target.value })}
                  />
                </div>
              </div>

              {/* Prices */}
              <div className="f bg-white text-black lex flex-col gap-2 md:flex-row">
                <div className="w-full">
                  <label htmlFor="promo_discount_price">Promo Discount Price:</label>
                  <input
                    type="number"
                    id="promo_discount_price"
                    className="w-full p-2 mt-1 border rounded"
                    placeholder="100000"
                    value={formData.promo_discount_price}
                    onChange={(e) => setFormData({ ...formData, promo_discount_price: e.target.value })}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="minimum_claim_price">Min Claim Price:</label>
                  <input
                    type="number"
                    id="minimum_claim_price"
                    className="w-full p-2 mt-1 border rounded"
                    placeholder="500000"
                    value={formData.minimum_claim_price}
                    onChange={(e) => setFormData({ ...formData, minimum_claim_price: e.target.value })}
                  />
                </div>
              </div>

              {/* Description and Terms */}
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="w-full">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    className="w-full p-2 border rounded"
                    rows="6"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="terms_condition">Terms & Conditions:</label>
                  <textarea
                    id="terms_condition"
                    className="w-full p-2 border rounded"
                    rows="6"
                    value={formData.terms_condition}
                    onChange={(e) => setFormData({ ...formData, terms_condition: e.target.value })}
                  />
                </div>
              </div>

              {/* Current Image */}
              <div className="flex">
                {formData.imageUrl && (
                  <img
                    src={formData.imageUrl}
                    alt="Promo"
                    className="object-cover w-full h-72 md:h-96"
                  />
                )}
              </div>

              {/* Upload New Image */}
              <div className="w-full">
                <input
                  type="file"
                  accept="image/*"
                  value={profilePictureName}
                  onChange={(e) => {
                    setProfilePictureName(e.target.value);
                    setProfilePictureFile(e.target.files[0]);
                  }}
                  className="text-darkColor dark:text-white"
                />
              </div>

              {/* Submit */}
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 text-white rounded-md bg-primaryColor hover:bg-opacity-80"
                >
                  Update Promo
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </AdminLayouts>
  );
};

export default EditPromoLayouts;


