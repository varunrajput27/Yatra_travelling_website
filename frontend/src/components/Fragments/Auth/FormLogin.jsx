import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Alert from "../Global/Alert";
import axios from "axios";

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleAlertClose = () => {
    setAlert({ show: false, message: "" });
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }

    if (password.trim() === "") {
      setPasswordError("Password must not be empty");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/api/login`, {
        email,
        password,
      });

      const data = response.data;
      const decoded = jwtDecode(data.token);

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", decoded.userId);

      setAlert({
        show: true,
        message: data.message || "Login success!",
        headerMessage: "Success!",
        style: "text-green-700 bg-green-200 border-green-400 w-96",
      });

      setTimeout(() => {
        setIsSubmitting(false);
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);

      setAlert({
        show: true,
        message: error?.response?.data?.message || "Login failed. Please try again.",
        headerMessage: "Failed!",
        style: "text-red-700 bg-red-100 border-red-400 w-96",
      });

      setTimeout(() => {
        setAlert({ show: false, message: "" });
        setIsSubmitting(false);
      }, 3000);
    }
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    const isValid = email && validateEmail(email) && password;
    setIsFormValid(isValid);
  }, [email, password]);

  const handleEmailKeyDown = (e) => {
    if (e.key === "Enter") {
      passwordRef.current.focus();
    }
  };

  const handlePasswordKeyDown = (e) => {
    if (e.key === "Enter" && isFormValid) {
      handleSubmit(e);
    }
  };

  return (
    <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
      {alert?.show && (
        <Alert
          headerMessage={alert.headerMessage}
          message={alert.message}
          classname={`fixed right-10 ${alert.style} top-20`}
          onClose={handleAlertClose}
        />
      )}

      <div className="flex flex-col pt-4">
        <label htmlFor="email" className="text-lg dark:text-white">Email</label>
        <input
          type="email"
          id="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError("");
          }}
          onBlur={() => {
            if (email && !validateEmail(email)) {
              setEmailError("Invalid email");
            }
          }}
          onKeyDown={handleEmailKeyDown}
          className="w-full px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          ref={emailRef}
        />
        {emailError && <span className="text-sm text-red-500">{emailError}</span>}
      </div>

      <div className="flex flex-col pt-4">
        <label htmlFor="password" className="text-lg dark:text-white">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError) setPasswordError("");
          }}
          onBlur={() => {
            if (password.trim() === "") {
              setPasswordError("Password must not be empty");
            }
          }}
          onKeyDown={handlePasswordKeyDown}
          className="w-full px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          ref={passwordRef}
        />
        {passwordError && <span className="text-sm text-red-500">{passwordError}</span>}
      </div>

      <button
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className={`p-2 mt-8 text-lg font-bold text-white rounded bg-[#015AB8] hover:bg-gray-700 transition-all duration-200 ${
          (!isFormValid || isSubmitting) && "opacity-50 cursor-not-allowed"
        }`}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default FormLogin;




