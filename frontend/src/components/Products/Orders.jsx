import React from "react";
import SideBar from "../sideBar/SideBar";
import TopBar from "../TopBar/TopBar";
import BASE_URL from "../../constant";
import axios from "axios";

const Orders = () => {
  const response = axios.get(`${BASE_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  response.then((data) => {
    console.log(response.data);
  });
  return (
    <div className="flex h-screen">
      <div className="w-64 border-r border-gray-300 bg-gray-800 text-white">
        <SideBar />
      </div>
      <div className="flex-1 bg-gray-100">
        <TopBar text={"Order"} />
      </div>
    </div>
  );
};

export default Orders;
