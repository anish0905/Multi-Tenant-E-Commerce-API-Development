import React from "react";

const TopBar = ({ text }) => {
  return (
    <div className="w-full mt-4">
      <div className="h-16 bg-gradient-to-r from-blue-500 to-blue-700 shadow-md flex items-center">
        <div className="flex justify-between items-center mx-10 w-full">
          <h1 className="text-white font-bold text-2xl tracking-wide">
            {text}
          </h1>
          <p className="text-white font-semibold text-lg">
            Logged in as <span className="text-yellow-300">Vendor</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
