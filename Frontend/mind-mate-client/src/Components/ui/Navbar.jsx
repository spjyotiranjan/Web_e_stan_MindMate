import React from "react";
import LogoImg from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="navbar bg-transparent px-8">
        <div className="flex-1">
          <img src={`${LogoImg}`} className="h-12" />
        </div>
        <div className="flex-none">
          <Link to="/get-started" className="btn rounded-full w-24 bg-[#AF90D8] border-none text-white">Login</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
