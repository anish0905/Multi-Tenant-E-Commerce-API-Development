const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  createOrder,
  updateOrder,
} = require("../../controller/vendor/orderController");
const authenticateVendor = require("../../middleware/authenticateVendor");

// Get all orders
router.get("/orders", authenticateVendor, getAllOrders);

// Create a new order
router.post("/orders", authenticateVendor, createOrder);

// Update an order (requires an ID)
router.put("/orders/:id", authenticateVendor, updateOrder);

module.exports = router;
