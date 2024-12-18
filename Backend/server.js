const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("../Backend/config/dbConnection");
const vendor = require("./routes/vendor/vendorRoutes.js");
const product = require("./routes/vendor/productRoutes.js");
const order = require("./routes/vendor/orderRoutes.js");

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use("/api/vendor", vendor);
app.use("/api", product);
app.use("/api", order);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server listening on ${port}`));
