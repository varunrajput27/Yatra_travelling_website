const mongoose = require("mongoose");

const promoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  promo_code: {
    type: String,
    required: true,
    unique: true,
  },
  promo_discount_price: {
    type: Number,
    required: true,
  },
  minimum_claim_price: {
    type: Number,
    required: true,
  },
  terms_condition: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assuming user is authenticated
  },
}, { timestamps: true });

module.exports = mongoose.model("Promo", promoSchema);
