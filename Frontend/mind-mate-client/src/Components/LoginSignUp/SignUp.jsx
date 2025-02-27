import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../../Context/LoginContext";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import GoogleSignInButton from "./GoogleSignInButton";

const SignUp = () => {
  const url = import.meta.env.VITE_API_URL;
  const { isLoggedIn, setIsLoggedIn, currUser, setCurrUser } =
    useContext(LoginContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Username: "",
    Name: "",
    Email: "",
    Password: "",
  });

  const [isOTPMode, setIsOTPMode] = useState(false);
  const [email, setEmail] = useState(null);
  const [otp, setOtp] = useState("");

 

  const handleSignUp = async (e) => {

    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/userdatas/signup`, formData);
      setEmail(response.data.data.email);
      setIsOTPMode(true);
      toast.success("Registration Successful!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        onClose: () => {
            setIsLoggedIn(true);
            navigate("/");
          },
      });

      Cookies.set("token", response.data.token, { expires: 7, path: "/" });
      Cookies.set("user", JSON.stringify(response.data.data), {
        expires: 7,
        path: "/",
      });
      setCurrUser(response.data.data);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        
      });
    }
  };

  const handleOTPVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/userdatas/verify`, {
        email,
        otp,
      });
      Cookies.set("token", response.data.token, { expires: 7, path: "/" });
      Cookies.set("user", JSON.stringify(response.data.data), {
        expires: 7,
        path: "/",
      });
      setCurrUser(response.data.data);
      toast.success("OTP verified successfully.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        onClose: () => {
          setIsLoggedIn(true);
          navigate("/");
        },
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const handleChange = (e) => {
    //   console.log(formData);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOTPChange = (e) => {
    setOtp(e.target.value);
  };

  return (
    <div >
      {/* {isOTPMode ? (
        <form onSubmit={handleOTPVerification} className="otp-form">
          <div className="form-fields">
            <input
              type="text"
              id="otp"
              name="otp"
              placeholder="Enter OTP"
              className="form-input"
              required
              value={otp}
              onChange={handleOTPChange}
            />
            <label htmlFor="otp" className="form-label">
              OTP
            </label>
          </div>
          <FilledBtn
            value="VERIFY OTP"
            styles={{ fontSize: "16px", margin: "20px auto" }}
          />
        </form>
      ) : ( */}
        <form onSubmit={handleSignUp} className="ls-form">
          <div className="form-fields">
            <input
              type="text"
              id="username"
              name="Username"
              placeholder="User Name"
              className="form-input"
              required
              value={formData.username}
              onChange={handleChange}
            />
            <label htmlFor="username" className="form-label">
              UserName
            </label>
          </div>
          <div className="form-fields">
            <input
              type="text"
              id="name"
              name="Name"
              placeholder="Name"
              className="form-input"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor="name" className="form-label">
              Name
            </label>
          </div>
          <div className="form-fields">
            <input
              type="email"
              id="email"
              name="Email"
              placeholder="Email"
              className="form-input"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="email" className="form-label">
              Email
            </label>
          </div>
          <div className="form-fields">
            <input
              type="password"
              id="password"
              name="Password"
              placeholder="Password"
              className="form-input"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <label htmlFor="password" className="form-label">
              Password
            </label>
          </div>
          <button
            type="submit"
            className="btn rounded-full w-24 bg-[#AF90D8] border-none text-white"
          >
            SignUp
          </button>
        </form>
      {/* )} */}
      <GoogleSignInButton />
    </div>
  );
};

export default SignUp;
