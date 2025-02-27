import { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./AllRoutes";
import LoginProvider from "./Context/LoginContext";
import { WindowWidthProvider } from "./Context/WindowWidthContext";
import SessionProvider from "./Context/SessionContext";

function App() {
  return (
    <>
      <WindowWidthProvider>
        <LoginProvider>
          <SessionProvider>
            <BrowserRouter>
              <AllRoutes />
            </BrowserRouter>
          </SessionProvider>
        </LoginProvider>
      </WindowWidthProvider>
    </>
  );
}

export default App;
