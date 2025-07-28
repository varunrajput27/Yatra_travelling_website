const multer = require("multer");
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save in 'uploads' folder (make sure it exists)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get file extension
    const name = path.basename(file.originalname, ext); // Get file name
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${name}-${uniqueSuffix}${ext}`); // Format: originalname-timestamp.ext
  },
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Export the multer upload middleware
const upload = multer({ storage, fileFilter });

module.exports = upload;
