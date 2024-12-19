import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../sideBar/SideBar";
import TopBar from "../TopBar/TopBar";
import BASE_URL from "../../constant";

const Orders = () => {
  const vendorId = localStorage.getItem("venderId"); // Get vendorId from localStorage

  const [orders, setOrders] = useState([]); // State to store orders data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch orders data on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const allOrders = response.data.data; // Get all orders
        console.log("All Orders:", allOrders);

        // Filter orders by vendorId in the product object
        const filteredOrders = allOrders.filter(
          (order) => order.product.vendor === vendorId // Compare vendorId with order.product.vendor
        );

        setOrders(filteredOrders); // Update state with filtered orders
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false); // Stop loading regardless of success or error
      }
    };

    if (vendorId) {
      fetchOrders();
    } else {
      setError("Vendor ID is missing. Please log in again.");
      setLoading(false);
    }
  }, [vendorId]); // Effect runs when vendorId changes

  // Function to update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `${BASE_URL}/orders/${orderId}`, // API endpoint for order status update
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update local state for real-time UI changes
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      console.log(`Order ${orderId} updated to ${newStatus}`);
    } catch (err) {
      console.error("Error updating order status:", err);
      alert("Failed to update order status. Please try again.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-300 bg-gray-800 text-white">
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        <TopBar text={"Orders"} />

        {/* Orders Table */}
        <div className="p-6">
          {loading ? (
            <p>Loading...</p> // Show loading message
          ) : error ? (
            <p className="text-red-500">{error}</p> // Show error message
          ) : (
            <table className="w-full border-collapse bg-white shadow-md">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Price</th>
                  <th className="py-3 px-6 text-left">Quantity</th>
                  <th className="py-3 px-6 text-left">Total Price</th>
                  <th className="py-3 px-6 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-gray-100 text-gray-700 text-sm border-b"
                    >
                      <td className="py-3 px-6">
                        {order.product?.name || "N/A"}
                      </td>
                      <td className="py-3 px-6">{order.product?.price || 0}</td>
                      <td className="py-3 px-6">{order.quantity}</td>
                      <td className="py-3 px-6">
                        ${order.product?.price * order.quantity || 0}
                      </td>
                      <td className="py-3 px-6">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(order._id, e.target.value)
                          }
                          className="border border-gray-300 p-1 rounded"
                        >
                          <option value="pending">Pending</option>
                          <option value="shipped">Shipped</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-3 text-gray-500">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
