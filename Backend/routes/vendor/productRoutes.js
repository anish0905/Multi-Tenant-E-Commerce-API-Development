const express = require("express");

const router = express.Router();
const productController = require("../../controller/vendor/productController");
const authenticateVendor = require("../../middleware/authenticateVendor");

// @route POST api/vendor/product/create

router.post("/products", authenticateVendor, productController.createProduct);

router.get("/products", authenticateVendor, productController.getAllProducts);

router.put("/product/:id", authenticateVendor, productController.editProduct);
module.exports = router;
