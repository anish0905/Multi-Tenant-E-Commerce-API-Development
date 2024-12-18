import React from "react";
import SideBar from "../sideBar/SideBar";
import TopBar from "../TopBar/TopBar";

const VenderDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-300 h-full bg-gray-800 text-white">
        <SideBar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100">
        <TopBar text={"Welcome to Vendor Dashboard"} />
        {/* Add your Dashboard Content Here */}
        <div className="p-8">
          {/* Placeholder for dashboard content */}
          <h2 className="text-2xl font-semibold text-gray-700">
            Dashboard Content
          </h2>
          <p className="mt-2 text-gray-500">
            This is where your dashboard content goes. You can add charts,
            tables, and other components here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VenderDashboard;
