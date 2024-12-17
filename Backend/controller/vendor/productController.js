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

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createProduct, getAllProducts };
