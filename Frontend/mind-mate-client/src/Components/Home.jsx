import React, { useContext, useEffect } from "react";
import MainBg from "../assets/mainbg.png";
import Navbar from "./ui/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";

const Home = () => {
  const navigate = useNavigate()
  const {currUser} = useContext(LoginContext);
  return (
    <div className="h-screen" style={{ backgroundImage: `url(${MainBg})`, backgroundSize: "cover" }}>
      <div
        className="top-section"
        
      >
        <Navbar />
      </div>

      <div className="flex justify-center items-center h-5/6 min-w-max">
        <div className="hero bg-transparent">
          <div className="hero-content text-center">
            <div className="max-w-max text-center flex flex-col justify-center items-center">
              <h1 className="text-6xl font-semibold text-[#141414]">Welcome to MindMateAI</h1>
              <h3 className="text-2xl font-semibold text-[#141414] py-4">Private. Empathetic. Real-time Support.</h3>
              <p className="py-6 text-[#141414] max-w-lg text-center">
              Break the barriers to mental health support. MindMate AI provides a safe, judgment-free space where you can talk, reflect, and heal with an AI-powered virtual therapist.
              </p>
              <Link to={!currUser.UserDetails ? "/user-intake":"/all-sessions"} className="btn rounded-full w-32 bg-[#AF90D8] border-none text-white font-poppins">Start Now</Link>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
