import React, { useState } from "react";
import Login from "./Login";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <a
          href="#"
          className="text-3xl font-extrabold text-pink-400 tracking-wide"
        >
          MyLogo
        </a>

        {/* Hamburger Icon for Mobile */}
        <button
          className="block lg:hidden text-gray-300 hover:text-pink-500 focus:outline-none"
          onClick={toggleMenu}
        >
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </div>
        </button>

        {/* Navbar Items */}
        <div
          className={`lg:flex lg:items-center lg:space-x-6 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="lg:flex lg:space-x-6 space-y-4 lg:space-y-0 mt-4 lg:mt-0">
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-gray-300 hover:text-pink-500 transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-gray-300 hover:text-pink-500 transition"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-gray-300 hover:text-green-500 transition"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-gray-300 hover:text-green-500 transition"
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Buttons */}
          <div className="flex space-x-4 mt-4 lg:mt-0">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
              Sign Up
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Sign Up Modal */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-50 z-40"></div>

          {/* Modal */}
          <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-white w-full max-w-md p-6 rounded-lg shadow-xl z-50">
            <Login setIsOpen={setIsOpen} />
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
