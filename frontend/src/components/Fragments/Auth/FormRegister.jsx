import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../../hooks/useLocalStorage";
import Alert from "../Global/Alert";
import { Eye, EyeOff } from "lucide-react";

const FormRegister = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [role, setRole] = useState("admin");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [token] = useLocalStorage("authToken", "");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordRepeatError, setPasswordRepeatError] = useState("");

  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Refs for Enter key navigation
  const nameRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();
  const phoneRef = useRef();

  const handleAlertClose = () => {
    setAlert({ show: false, message: "", type: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!emailPattern.test(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!passwordRepeat.trim()) {
      setPasswordRepeatError("Please confirm your password");
      isValid = false;
    } else if (password !== passwordRepeat) {
      setPasswordRepeatError("Passwords do not match");
      isValid = false;
    } else {
      setPasswordRepeatError("");
    }

    return isValid;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) setPhoneNumber(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    setLoading(true);

    // Guarantee spinner shows at least 1 second
    const spinnerDelay = new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const registerData = {
        name,
        phoneNumber,
        email,
        password,
        passwordRepeat,
        role,
      };

      const [response] = await Promise.all([
        axios.post(`${import.meta.env.VITE_BACKEND_LINK}/api/register`, registerData),
        spinnerDelay,
      ]);

      setAlert({
        show: true,
        message: response.data.message || "Registered successfully",
        type: "success",
      });

      setTimeout(() => {
        setAlert({ show: false, message: "", type: "" });
        navigate("/login");
      }, 2000);
    } catch (error) {
      await spinnerDelay;
      setAlert({
        show: true,
        message:
          error.response?.data?.message || "Something went wrong. Try again.",
        type: "error",
      });
      setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
      {alert?.show && (
        <Alert
          headerMessage={alert.type === "success" ? "Success!" : "Error!"}
          message={alert.message}
          classname={`fixed right-10 top-20 ${
            alert.type === "success"
              ? "text-green-700 bg-green-100 border-green-400"
              : "text-red-700 bg-red-100 border-red-400"
          } w-96`}
          onClose={handleAlertClose}
        />
      )}

      <div className="flex flex-row gap-2 w-full">
        <div className="flex flex-col pt-4 w-1/2">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && nameRef.current.focus()}
            className="w-full h-8 px-3 py-2 mt-1 text-gray-700 border rounded shadow focus:outline-none"
          />
          {emailError && <p className="text-xs text-red-600">{emailError}</p>}
        </div>

        <div className="flex flex-col pt-4 w-1/2">
          <input
            type="text"
            placeholder="Your Name"
            ref={nameRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && passRef.current.focus()}
            className="w-full h-8 px-3 py-2 mt-1 text-gray-700 border rounded shadow focus:outline-none"
          />
          {nameError && <p className="text-xs text-red-600">{nameError}</p>}
        </div>
      </div>

      <div className="flex flex-row gap-2 w-full">
        <div className="flex flex-col pt-4 w-1/2 relative">
          <input
            ref={passRef}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && confirmPassRef.current.focus()}
            className="w-full h-8 px-3 py-2 mt-1 text-gray-700 border rounded shadow focus:outline-none"
          />
          <div
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-7 cursor-pointer text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
          {passwordError && <p className="text-xs text-red-600">{passwordError}</p>}
        </div>

        <div className="flex flex-col pt-4 w-1/2 relative">
          <input
            ref={confirmPassRef}
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && phoneRef.current.focus()}
            className="w-full h-8 px-3 py-2 mt-1 text-gray-700 border rounded shadow focus:outline-none"
          />
          <div
            onClick={() => setShowConfirm((prev) => !prev)}
            className="absolute right-3 top-7 cursor-pointer text-gray-600"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
          {passwordRepeatError && <p className="text-xs text-red-600">{passwordRepeatError}</p>}
        </div>
      </div>

      <div className="pt-4">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full h-8 px-3 mt-1 text-gray-700 border rounded shadow focus:outline-none"
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      <div className="flex flex-col pt-4">
        <input
          ref={phoneRef}
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={handlePhoneChange}
          maxLength={10}
          className="w-full h-8 px-3 py-2 mt-1 text-gray-700 border rounded shadow focus:outline-none"
        />
      </div>

      <button
        disabled={loading}
        type="submit"
        className={`p-2 mt-6 h-8 flex justify-center items-center text-md font-bold text-white rounded ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#015AB8] hover:bg-gray-700"
        }`}
      >
        {loading ? (
          <svg
            className="w-5 h-5 animate-spin text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="white"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="white"
              d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 100 16v-4l-3.5 3.5L12 24v-4a8 8 0 01-8-8z"
            ></path>
          </svg>
        ) : (
          "Register"
        )}
      </button>
    </form>
  );
};

export default FormRegister;
