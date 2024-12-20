const User = require("../../model/client/model/userModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Create a new user instance
    const newUser = new User({ name, email, password });

    // Save the new user to the database
    await newUser.save();

    // Return a success response
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    // Return error message for debugging
    console.error("Registration Error: ", error.message);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login };
