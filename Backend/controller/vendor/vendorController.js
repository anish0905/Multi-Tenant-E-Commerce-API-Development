const Vendor = require("../../model/vendor/vendorModel");

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const bcrypt = require("bcrypt");

const registerVendor = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if vendor already exists
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: "Vendor already exists!" });
    }

    const vendor = new Vendor({ name, email, password });

    await vendor.save();

    return res.status(201).json({ message: "Vendor registered successfully!" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const vendor = await Vendor.findOne({ email });

    if (!vendor) return res.status(404).json({ message: "Vendor not found!" });

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials!" });

    const token = jwt.sign(
      { vendorId: vendor._id, email: vendor.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, vendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerVendor, loginVendor };
