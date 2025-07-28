// routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs"); // password check karne ke liye
const jwt = require("jsonwebtoken"); // token banane ke liye

const JWT_SECRET = "mera_secret_token"; // .env me rakhna actual project me

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // 1. Email match karo
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Email galat hai" });
  }

  // 2. Password match karo
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Password galat hai" });
  }

  // 3. JWT Token banao
  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  // 4. Token return karo frontend ko
  res.status(200).json({
    message: "Login successful",
    token,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

module.exports = router;
