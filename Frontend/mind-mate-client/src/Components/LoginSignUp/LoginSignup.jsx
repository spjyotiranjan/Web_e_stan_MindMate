import React, { useState, useEffect, useContext } from "react";
import "./LoginSignUpStyles.css";
import Login from "./Login";
import SignUp from "./SignUp";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainBg from "../../assets/mainbg.png"
// import GoogleSignInButton from "./GoogleSignInButton";
import { WindowWidthContext } from "../../Context/WindowWidthContext";


const LoginSignup = () => {
  const [currPage, setCurrPage] = useState("signup");
  const windowWidth = useContext(WindowWidthContext);

  return (
    <div className="main" style={{ backgroundImage: `url(${MainBg})` }}>
      <div className="main min-h-screen ls-content flex justify-center items-center flex-wrap flex-col md:flex-row">
      
        <div className={windowWidth < 786 ? "ls-right-res" : "ls-right"}>
          <div className="mt-4">
            <div className="border-b border-[#3F3F3F]">
              <nav className="-mb-px flex" aria-label="Tabs">
                <button
                  className={`w-1/2 py-4 px-1 text-center text-base font-bold cursor-pointer border-b-2 ${
                    currPage === "signup"
                      ? "border-[#AF90D8] text-[#AF90D8]"
                      : "border-transparent text-[#3F3F3F] hover:border-[#141414] hover:text-[#141414]"
                  }`}
                  onClick={() => setCurrPage("signup")}
                >
                  REGISTER
                </button>
                <button
                  className={`w-1/2 py-4 px-1 text-center text-base font-bold cursor-pointer border-b-2 ${
                    currPage === "login"
                      ? "border-[#AF90D8] text-[#AF90D8]"
                      : "border-transparent text-[#3F3F3F] hover:border-[#141414] hover:text-[#141414]"
                  }`}
                  onClick={() => setCurrPage("login")}
                >
                  LOGIN
                </button>
              </nav>
            </div>
          </div>
          {currPage === "signup" ? <SignUp /> : <Login />}
          {/* <GoogleSignInButton /> */}
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
};

export default LoginSignup;
