const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Promo", // or "Package" if that's your model
    required: true,
  },
  members: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["upi", "cash", "card"],
    default: "upi",
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  bookedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
