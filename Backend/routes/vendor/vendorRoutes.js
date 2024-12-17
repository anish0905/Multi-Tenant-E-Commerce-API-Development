const express = require("express");

const router = express.Router();

const vendorController = require("../../controller/vendor/vendorController");

// @route POST api/vendor/register
router.post("/register", vendorController.registerVendor);

// @route POST api/vendor/login

router.post("/login", vendorController.loginVendor);

module.exports = router;
