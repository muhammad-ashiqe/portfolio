import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="px-[30%] mt-10">
      <div className="p-4 bg-[#007a2b] bg-opacity-30 text-white rounded-xl backdrop-blur-xl shadow-lg border border-gray-600 font-bold">
        <ul className="flex justify-between px-5 ">
          <Link to={"/"} className="hover:text-gray-300 transition-all">
            Home
          </Link>
          <Link to={"skills"} className="hover:text-gray-300 transition-all">
            Skills
          </Link>
          <Link to={"projects"} className="hover:text-gray-300 transition-all">
            Project
          </Link>
          <Link to={"contact"} className="hover:text-gray-300 transition-all">
            Contact
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
