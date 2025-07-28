const express = require("express");
const router = express.Router();
const Promo = require("../models/promo");
const auth = require("../middleware/authMiddleware"); // JWT middleware
const upload = require("../middleware/upload"); // Multer middleware
const fs = require("fs");
const path = require("path");

// POST /api/create-promo
router.post("/create-promo", auth, async (req, res) => {
  try {
    const {
      title,
      description,
      imageUrl,
      promo_code,
      promo_discount_price,
      minimum_claim_price,
      terms_condition,
    } = req.body;

    // Check for required fields
    if (
      !title ||
      !description ||
      !imageUrl ||
      !promo_code ||
      !promo_discount_price ||
      !minimum_claim_price ||
      !terms_condition
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create promo 
    const newPromo = new Promo({
      title,
      description,
      imageUrl,
      promo_code,
      promo_discount_price,
      minimum_claim_price,
      terms_condition,
      createdBy: req.user.id, // from auth middleware
    });

    await newPromo.save();

    res.status(201).json({
      message: "Promo created successfully!",
      data: newPromo,
    });
  } catch (error) {
    console.error("Create promo error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});


// ✅ GET - Get Promo by ID
router.get("/promo/:id", async (req, res) => {
  try {
    const promoId = req.params.id;
    const promo = await Promo.findById((promoId));
    if (!promo) {
      return res.status(404).json({ message: "Promo not found" });
    }
    res.status(200).json({ data: promo });
  } catch (err) {
    console.error("Error fetching promo by ID:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// ✅ PUT - Edit Promo
router.put("/update-promo/:id", upload.single("image"), async (req, res) => {
  try {
    const promoId = req.params.id;
    const {
      title,
      description,
      terms_condition,
      promo_code,
      promo_discount_price,
      minimum_claim_price,
    } = req.body;

    const promo = await Promo.findById(promoId);
    if (!promo) return res.status(404).json({ message: "Promo not found" });

    // ✅ Delete old image if new one is uploaded
    if (req.file && promo.imageUrl) {
      const oldPath = path.join(__dirname, "../", promo.imageUrl);
      fs.unlink(oldPath, (err) => {
        if (err) console.log("Old image delete error:", err.message);
      });
    }

    promo.title = title || promo.title;
    promo.description = description || promo.description;
    promo.terms_condition = terms_condition || promo.terms_condition;
    promo.promo_code = promo_code || promo.promo_code;
    promo.promo_discount_price = promo_discount_price || promo.promo_discount_price;
    promo.minimum_claim_price = minimum_claim_price || promo.minimum_claim_price;
    
    if (req.file) {
      promo.imageUrl = `/uploads/${req.file.filename}`;
    }

    await promo.save();

    res.status(200).json({ message: "Promo updated successfully", promo });
  } catch (err) {
    console.error("Error updating promo:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


//get all promos
router.get("/promos", async (req, res) => {
  try {
    const promos = await Promo.find();
    res.status(200).json({ data: promos });
  } catch (err) {
    res.status(500).json({ message: "Error fetching promos" });
  }
});


//delete promo by id
router.delete("/delete-promo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPromo = await Promo.findByIdAndDelete(id);

    if (!deletedPromo) {
      return res.status(404).json({ message: "Promo not found" });
    }

    res.status(200).json({ message: "Promo deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});




module.exports = router;

