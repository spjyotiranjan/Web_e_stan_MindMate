import React from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import Home from './Components/Home';
import SessionsPage from './Components/SessionsPage';
import LoginSignup from './Components/LoginSignUp/LoginSignup';
import TherapyRoomPage from './Components/TherapyRoomPage';
import NewSessionPage from './Components/NewSessionPage';
import UserIntakeForm from './Components/UserIntakeForm';


const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/user-intake' element={<UserIntakeForm/>}/>
        <Route path="/all-sessions" element={<SessionsPage />}  />
        <Route path="/get-started" element={<LoginSignup />} />
        <Route path="therapy-room" element={<TherapyRoomPage />} />
        <Route path="/new-session" element={<NewSessionPage />} />
    </Routes>
  )
}

export default AllRoutes