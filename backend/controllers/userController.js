const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, passwordRepeat, phoneNumber, role } = req.body;

    if (!name || !email || !password || !passwordRepeat) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password too short." });
    }

    if (password !== passwordRepeat) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};
