const jwt = require("jsonwebtoken");

// Ensure JWT_SECRET is set in the environment variables
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

const authenticateVendor = (req, res, next) => {
  // Get token from the Authorization header (Bearer token)
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // If no token is provided, return an error
  if (!token) {
    return res.status(401).json({ message: "Authorization required" });
  }

  try {
    // Verify token and decode it
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach vendorId from the decoded token to the request object
    req.vendorId = decoded.vendorId;
    req.email = decoded.email; // Optionally, you can also attach the email

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // If token is invalid or expired, return an error
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticateVendor;
