const Order = require("../../model/vendor/orderModel"); // Correct import path

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("product");
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { product, quantity, status } = req.body;

    const newOrder = new Order({
      product,
      quantity,
      status,
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// Update an order
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params; // Order ID
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update order",
      error: error.message,
    });
  }
};

module.exports = { getAllOrders, createOrder, updateOrder };
