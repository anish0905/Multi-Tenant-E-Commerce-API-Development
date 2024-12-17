const mongoose = require("mongoose");

const orderSchema = new mongoose.schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  status: { Enum: ["pending", "shipped"], required: true, default: "pending" },
});
