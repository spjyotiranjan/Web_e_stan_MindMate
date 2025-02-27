import React, { useState, useContext, useEffect } from "react";
import { SessionContext } from "../Context/SessionContext";
import axios from "axios";
import Cookies from "js-cookie";
import MainBg from "../assets/mainbg.png";
import Navbar from "./ui/Navbar";
import { Link } from "react-router-dom";

const SessionsPage = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currUser, setCurrUser] = useState(() => {
    const user = Cookies.get("user");
    return user ? JSON.parse(user) : null;
  });

  const { setCurrSession } = useContext(SessionContext);

  useEffect(() => {
    if (!currUser) return; // Prevent API call if user is null

    const fetchSessions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/userdatas/${currUser._id}`
        );
        setSessions(response.data.OneUser.TherapyHistory);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [currUser]);

  const  handleResumeClick = async(session) => {
    setCurrSession(session);
    await localStorage.setItem("currSession", JSON.stringify(session)); // Persist session
    setTimeout(() => {
      window.location.href = "/therapy-room";
    }, 500);
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div
          className="flex flex-col items-center h-screen text-[#242424]"
          style={{ backgroundImage: `url(${MainBg})` }}
        >
          <Navbar />
          <h2 className="text-3xl font-semibold mb-4 text-[#141414]">
            Sessions
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="card bg-[#AF90D8] text-primary-content w-96">
              <div className="card-body">
                <h2 className="card-title">Start a new session</h2>
                <div className="card-actions justify-center">
                  <Link
                    to={"/new-session"}
                    className="btn rounded-full w-24 bg-[#ffffff30] border-none text-[#141414] hover:bg-[#ffffff60] text-4xl font-normal"
                  >
                    +
                  </Link>
                </div>
              </div>
            </div>
            {sessions.map((session) => (
              <div
                className="card bg-[#AF90D8] text-primary-content w-96"
                key={session._id}
              >
                <div className="card-body">
                  <h2 className="card-title">{session.Title}</h2>
                  <div className="card-actions justify-end">
                    <button
                      className="btn rounded-full w-24 bg-[#ffffff30] border-none text-[#141414] hover:bg-[#ffffff60]"
                      onClick={() => handleResumeClick(session)} 
                    >
                      Resume
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SessionsPage;
