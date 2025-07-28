const express = require("express");
const router = express.Router();
const Banner = require("../models/Banner");
const upload = require("../middleware/upload");

// ✅ Create Banner
router.post("/create-banner", upload.single("image"), async (req, res) => {
  try {
    console.log("🔥 Incoming Body:", req.body);
    const { bannerName } = req.body;

    if (!req.file || !bannerName) {
      return res.status(400).json({ message: "Banner name and image are required" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const newBanner = await Banner.create({ bannerName, imageUrl });

    res.status(201).json({
      status: "OK",
      message: "Banner created",
      data: newBanner,
    });
  } catch (err) {
    console.error("❌ Error creating banner:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get all banners
router.get("/banners", async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.json({ status: "OK", data: banners });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get single banner
router.get("/banner/:id", async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });
    res.json({ status: "OK", data: banner });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update banner
router.put("/update-banner/:id", upload.single("image"), async (req, res) => {
  try {
    const { bannerName } = req.body;
    let updateData = { bannerName };

    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedBanner = await Banner.findByIdAndUpdate(req.params.id, updateData, { new: true });

    res.json({ status: "OK", message: "Banner updated", data: updatedBanner });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete banner
router.delete("/delete-banner/:id", async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    res.json({ status: "OK", message: "Banner deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
