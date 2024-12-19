import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaClipboardList,
  FaUsers,
  FaCogs,
  FaSignOutAlt,
} from "react-icons/fa";

const SideBar = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-800 text-white h-screen w-60 shadow-lg rounded-r-lg">
      {/* Logo */}
      <div className="flex items-center justify-center py-6 border-b border-gray-700">
        <img
          src="https://via.placeholder.com/150x50"
          alt="Logo"
          className="w-32"
        />
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col mt-6 px-4 space-y-4">
        <Link
          to="/dashboard"
          className="flex items-center p-3 bg-gray-700 rounded-md hover:bg-blue-500 transition duration-300"
        >
          <FaTachometerAlt className="mr-3" /> Dashboard
        </Link>

        <Link
          to="/products"
          className="flex items-center p-3 bg-gray-700 rounded-md hover:bg-blue-500 transition duration-300"
        >
          <FaBox className="mr-3" /> Products
        </Link>

        <Link
          to="/orders"
          className="flex items-center p-3 bg-gray-700 rounded-md hover:bg-blue-500 transition duration-300"
        >
          <FaClipboardList className="mr-3" /> Orders
        </Link>

        <a
          href="#"
          className="flex items-center p-3 bg-gray-700 rounded-md hover:bg-blue-500 transition duration-300"
        >
          <FaUsers className="mr-3" /> Customers
        </a>

        <a
          href="#"
          className="flex items-center p-3 bg-gray-700 rounded-md hover:bg-blue-500 transition duration-300"
        >
          <FaCogs className="mr-3" /> Settings
        </a>

        <a
          href="#"
          className="flex items-center p-3 bg-red-500 rounded-md hover:bg-red-600 transition duration-300"
          onClick={() => {
            console.log("clear");
            localStorage.clear();
            navigate("/");
          }}
        >
          <FaSignOutAlt className="mr-3" /> Logout
        </a>
      </div>
    </div>
  );
};

export default SideBar;
