import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  bannerName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Banner", bannerSchema);
