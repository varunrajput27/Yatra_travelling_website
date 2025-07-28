const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/userController");

// Cleanly link to controller
router.post("/register", registerUser);

module.exports = router;
