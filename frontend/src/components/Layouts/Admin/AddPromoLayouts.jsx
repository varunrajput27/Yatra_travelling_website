import { useState } from "react";
import AdminLayouts from "../Wrapper/AdminLayouts";
import axios from "axios";
import Loader from "../../Fragments/Global/Loader";
import Alert from "../../Fragments/Global/Alert";
import { Link } from "react-router-dom";

const AddPromoLayouts = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [minimum_claim_price, setMinimumClaimPrice] = useState("");
  const [terms_condition, setTermsCondition] = useState("");
  const [promo_code, setPromoCode] = useState("");
  const [promo_discount_price, setPromoDiscountPrice] = useState("");
  const [profilePictureName, setProfilePictureName] = useState("");
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "" });
  const token = localStorage.getItem("token");

  const handleAlertClose = () => {
    setAlert({ show: false, message: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      let urlFoto = "";
      if (profilePictureFile) {
        const acceptImage = ["image/"];
        if (!acceptImage.some((item) => profilePictureFile.type.includes(item))) {
          setAlert({
            show: true,
            message: "Files that are allowed are only of type Image",
            headerMessage: "Failed!",
            style: "text-red-700 bg-red-100 border-red-400 w-96",
          });
          setTimeout(() => handleAlertClose(), 3000);
          return;
        }

        if (profilePictureFile.size > 500 * 1024) {
          setAlert({
            show: true,
            message: "File size exceeds 500 kb",
            headerMessage: "Failed!",
            style: "text-red-700 bg-red-100 border-red-400 w-96",
          });
          setTimeout(() => handleAlertClose(), 3000);
          return;
        }

        let data = new FormData();
        data.append("image", profilePictureFile);

        const uploadRes = await axios.post(
          `${import.meta.env.VITE_BACKEND_LINK}/api/upload-image`,
          data,
          {
            headers: {
              // apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              // Removed Authorization header
                "Content-Type": "multipart/form-data"
            },
          }
        );

        urlFoto = uploadRes.data.imageUrl;
    
      }

      const promoData = {
        title,
        description,
        imageUrl: urlFoto,
        terms_condition,
        promo_code,
        promo_discount_price: parseInt(promo_discount_price),
        minimum_claim_price: parseInt(minimum_claim_price),
      };

      const createRes = await axios.post(
       `${import.meta.env.VITE_BACKEND_LINK}/api/create-promo`,
        promoData,
        {
          headers: {
            // apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            // Removed Authorization header
              Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Promo created successfully:", createRes.data);
      setAlert({
        show: true,
        message: "Promo added successfully!",
        headerMessage: "Success!",
        style: "text-green-700 bg-green-100 border-green-400 w-96",
      });
      setTimeout(() => handleAlertClose(), 3000);
    } catch (error) {
      console.error("Error during add:", error);
      setAlert({
        show: true,
        message: "Something went wrong!",
        headerMessage: "Error!",
        style: "text-red-700 bg-red-100 border-red-400 w-96",
      });
      setTimeout(() => handleAlertClose(), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayouts classname="pb-8">
      {alert?.show && (
        <Alert
          headerMessage={alert.headerMessage}
          message={alert.message}
          classname={`fixed right-10 ${alert.style} top-20`}
          onClose={handleAlertClose}
        />
      )}
      <p className="mb-6 text-3xl font-bold text-darkColor dark:text-white">Add Promo</p>
      {loading ? (
        <div className="absolute top-1/2 left-[43%] md:left-[47%]">
          <Loader classname="w-12 h-12" />
        </div>
      ) : (
        <div className="p-6 mb-4 bg-white border border-gray-100 rounded-md shadow-md text-dark-900 dark:text-white dark:border-gray-700 dark:bg-gray-700 shadow-black/5 ">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="w-full">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    className="w-full p-2 mt-1 border rounded dark:text-darkColor"
                    placeholder="India 🙏"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="promo_code">Promo Code:</label>
                  <input
                    type="text"
                    id="promo_code"
                    className="w-full p-2 mt-1 uppercase border rounded dark:text-darkColor"
                    placeholder="india12"
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="w-full">
                  <label htmlFor="promo_discount_price">Promo Discount Price:</label>
                  <input
                    type="number"
                    id="promo_discount_price"
                    className="w-full p-2 mt-1 border rounded dark:text-darkColor"
                    placeholder="100000"
                    onChange={(e) => setPromoDiscountPrice(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="minimum_claim_price">Min Claim Price:</label>
                  <input
                    type="number"
                    id="minimum_claim_price"
                    className="w-full p-2 mt-1 border rounded dark:text-darkColor"
                    placeholder="5000000"
                    onChange={(e) => setMinimumClaimPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="w-full">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    rows="6"
                    className="w-full p-2 border rounded dark:text-darkColor"
                    placeholder="Promo details..."
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="terms_condition">Terms Condition:</label>
                  <textarea
                    id="terms_condition"
                    rows="6"
                    className="w-full p-2 border rounded dark:text-darkColor"
                    placeholder="T&C details..."
                    onChange={(e) => setTermsCondition(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="w-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setProfilePictureName(e.target.value);
                      setProfilePictureFile(e.target.files[0]);
                    }}
                    className="text-darkColordark:text-darkColor"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center my-2">
              <button
                type="submit"
                className="px-3 py-2 text-white rounded-md bg-primaryColor"
              >
                Add Data
              </button>
            </div>
          </form>
        </div>
      )}
      <Link
        to="/promo"
        className="inline-flex gap-1 px-2 py-1 bg-white border border-gray-100 rounded-md shadow-md text-darkColor dark:text-white dark:border-gray-700 dark:bg-gray-700 shadow-black/5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
          />
        </svg>
        Back to activity
      </Link>
    </AdminLayouts>
  );
};

export default AddPromoLayouts;

