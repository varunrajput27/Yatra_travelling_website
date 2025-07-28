const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");

// ✅ Create Booking
router.post("/bookings", async (req, res) => {
  try {
    const { userId, packageId, members, paymentMethod, totalPrice } = req.body;

    const newBooking = new Booking({
      userId,
      packageId,
      members,
      paymentMethod,
      totalPrice,
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking successful", booking: newBooking });
  } catch (error) {
    console.error("Booking creation error:", error);
    res.status(500).json({ message: "Booking failed", error });
  }
});


// GET all bookings with user and package details
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email phoneNumber")  // Adjust if your User model fields differ
      .populate("packageId", "title"); // Adjust for your Promo/Package model fields

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});


// delete booking by id
router.delete("/bookings/:id", async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ Get bookings of a specific use
router.get("/bookings/user/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate("packageId", "title")
      .populate("userId", "name email phoneNumber");

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});


module.exports = router;


