const express = require("express");
const router = express.Router();

const { register, login } = require("../../controller/client/userController");

// @route POST api/client/register

router.post("/register", register);

// @route POST api/client/login

router.post("/login", login);

module.exports = router;
