const { default: mongoose } = require("mongoose");
const Product = require("../../model/vendor/ProductModel");
const createProduct = async (req, res) => {
  try {
    const { vendor, name, price, stock } = req.body;

    if (!vendor) {
      return res.status(400).json({ error: "Vendor ID is required" });
    }

    const product = new Product({ vendor, name, price, stock });
    await product.save();
    return res
      .status(201)
      .json({ message: "Product saved successfully", product });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Controller function to edit a product
const editProduct = async (req, res) => {
  try {
    const productId = req.params.id; // Extract product ID from URL params
    const { name, price, stock } = req.body; // Extract updated fields from request body

    // Find the product by ID
    const product = await Product.findById(productId);

    // Check if product exists
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the authenticated vendor matches the product's vendor
    if (product.vendor.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized: Access denied" });
    }

    // Update product fields
    if (name) product.name = name;
    if (price) product.price = price;
    if (stock) product.stock = stock;

    // Save the updated product
    await product.save();

    return res
      .status(200)
      .json({ message: "Product updated successfully", product });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createProduct, getAllProducts, editProduct };
