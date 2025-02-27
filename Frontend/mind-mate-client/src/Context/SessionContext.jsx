import { createContext, useState, useEffect } from "react";

export const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const [currSession, setCurrSession] = useState(() => {
    // Retrieve session from localStorage if available
    const savedSession = localStorage.getItem("currSession");
    return savedSession ? JSON.parse(savedSession) : null;
  });
console.log(currSession);
  // Update localStorage whenever currSession changes
  useEffect(() => {
    if (currSession) {
      localStorage.setItem("currSession", JSON.stringify(currSession));
    } else {
      localStorage.removeItem("currSession"); // Clean up if null
    }
  }, [currSession]);

  return (
    <SessionContext.Provider value={{ currSession, setCurrSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;