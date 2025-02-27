import React, { useContext, useState } from "react";
import MainBg from "../assets/mainbg.png";
import Navbar from "./ui/Navbar";
import axios from "axios";
import { LoginContext } from "../Context/LoginContext";
import { SessionContext } from "../Context/SessionContext";

const NewSessionPage = () => {
  const [userInput, setUserInput] = useState("");
  const [approach, setApproach] = useState("");
  const {currSession, setCurrSession} = useContext(SessionContext);
  const { currUser } = useContext(LoginContext);

  async function handleSessionStart() {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/therapydatas`,
      {
        inputProblem: userInput,
        therapist: "Clara",
        approach: approach,
        username: currUser.Username,
      }
    );

    setCurrSession(response.data.createdTherapySession);
    localStorage.setItem(
      "currSession",
      JSON.stringify(response.data.createdTherapySession)
    );
    setTimeout(() => {
      window.location.href = "/therapy-room";
    }, 500);
  }

  return (
    <>
      <div
        className="flex flex-col items-center h-screen text-[#242424]"
        style={{ backgroundImage: `url(${MainBg})` }}
      >
        <Navbar />
        <div className="flex justify-center items-center h-5/6 min-w-max">
          <div className="hero bg-transparent">
            <div className="hero-content text-center">
              <div className="text-center flex flex-col justify-center items-center max-w-2xl">
                <h1 className="text-4xl font-semibold text-[#141414]">
                  What’s on your mind today?{" "}
                </h1>
                <h3 className="text-xl font-semibold text-[#141414] py-4">
                  Take a moment to share what’s bothering you. Whether it’s
                  stress, anxiety, relationships, or anything else, I’m here to
                  listen.
                </h3>
                <textarea
                  className="textarea textarea-primary border-[#AF90D8] outline-[#AF90D8] bg-transparent w-5/6 h-32 p-2 m-4 text-[#141414]"
                  placeholder="Share your thoughts here..."
                  onChange={(e) => setUserInput(e.target.value)}
                ></textarea>

                <details className="dropdown">
                  <summary className="btn m-1">Select Approach ▾</summary>
                  <ul className="menu dropdown-content bg-[#AF90D8] rounded-box z-[1] w-52 p-2 shadow">
                    <li>
                      <a onClick={(e) => setApproach(e.target.innerText)}>
                        Person Centered Therapy
                      </a>
                    </li>
                    <li>
                      <a onClick={(e) => setApproach(e.target.innerText)}>
                        Mindfulness Based Therapy
                      </a>
                    </li>
                    <li>
                      <a onClick={(e) => setApproach(e.target.innerText)}>
                        Solution Focused Brief Therapy
                      </a>
                    </li>
                  </ul>
                </details>

                <button
                  className="btn rounded-full w-32 bg-[#AF90D8] border-none text-white font-poppins"
                  onClick={() => {
                    handleSessionStart();
                  }}
                >
                  Start Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewSessionPage;
