const path = require("path");
const express = require("express");

const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./db.js");
connectDB(); // ✅ Actually triggers the DB connection



const auth = require("./routes/auth");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());


const uploadRoute = require("./routes/uploadRoute");
const promoRoutes = require("./routes/promo");
const categoryRoutes = require("./routes/categoryRoutes");



// ✅ Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://yatrafrontend.vercel.app",

];

// ✅ CORS middleware (add only ONCE, at top)
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", userRoutes);  
app.use("/api", auth);  
app.use("/api/user", require("./routes/user"));


//photo upload
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

// Routes upload
app.use("/api", uploadRoute);  // 👈 mount upload route


//for category
app.use("/api", categoryRoutes);

// for promo  - add , edit, -delete
app.use("/api", promoRoutes);


const bookingRoutes = require("./routes/bookingRoutes");


// ✅ Use routes
app.use("/api", bookingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

