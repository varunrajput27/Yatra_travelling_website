const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const upload = require("../middleware/upload");

// ✅ Create Category
router.post("/create-category", async (req, res) => {
  try {
    console.log("🔥 Incoming Body:", req.body);


    const { name, imageUrl } = req.body;
    

    if (!name || !imageUrl) {
      return res.status(400).json({ message: "Name and imageUrl are required" });
    }

    const newCategory = await Category.create({ name, imageUrl });

    res.status(201).json({
      status: "OK",
      message: "Category created",
      data: newCategory,
    });
  } catch (err) {
    console.error("❌ Error creating category:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get all categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json({ status: "OK", data: categories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get single category
router.get("/category/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json({ status: "OK", data: category });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update category
router.put("/update-category/:id", async (req, res) => {
  try {
    const { name, imageUrl } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, imageUrl },
      { new: true }
    );
    res.json({ status: "OK", message: "Category updated", data: updatedCategory });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete category
router.delete("/delete-category/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ status: "OK", message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
