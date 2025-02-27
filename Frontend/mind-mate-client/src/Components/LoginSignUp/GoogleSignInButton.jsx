import React, { useContext } from "react";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import Cookies from "js-cookie";
import axios from "../../configs/axiosConfig";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../Context/LoginContext";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import app from "../../configs/firebaseConfig.js";
import GoogleIcon from "../../assets/google-logo.png";

const auth = getAuth(app);

const GoogleSignInButton = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { setIsLoggedIn, setCurrUser, currUser } = useContext(LoginContext);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = {
        Username: result.user.email.split("@")[0],
        Name: result.user.displayName,
        Email: result.user.email,
        Password: result.user.uid,
      };
      const response = await axios.post(
        `${apiUrl}/api/userdatas/google-auth`,
        userData
      );
      Cookies.set("token", response.data.token, { expires: 7, path: "/" });
      Cookies.set("user", JSON.stringify(response.data.data), {
        expires: 7,
        path: "/",
      });
      setCurrUser(response.data.data);
      toast.success(response.data.message, {
        autoClose: 3000,
        closeOnClick: true,
        onClose: () => {
          navigate("/");
          setIsLoggedIn(true);
        },
      });
    } catch (error) {
      toast.error(error, { autoClose: 3000 });
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="btn rounded-full w-64 bg-[#AF90D8] border-none text-white flex gap-2 my-3 mx-auto">
        <img src={GoogleIcon} className="h-6"/>
        Continue with Google
      </button>
  );
};

export default GoogleSignInButton;
