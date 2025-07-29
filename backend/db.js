// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config();



// // MongoDB Local
// //const mongoURL = process.env.MONGODB_LOCAL_URL;

// // MongoDB Atlas 
// const mongoURL = process.env.MONGODB_URL;

// mongoose.connect(mongoURL)
//   .then(() => console.log("MongoDB connected successfully"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// const db = mongoose.connection;

// db.on('disconnected', () => {
//   console.log("MongoDB is disconnected");
// });

// db.on('error', () => {
//   console.log("Error with MongoDB");
// });

// export default db;
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB Atlas URL
const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

const db = mongoose.connection;

db.on('disconnected', () => {
  console.log("MongoDB is disconnected");
});

db.on('error', () => {
  console.log("Error with MongoDB");
});

module.exports = () => db; // ✅ Now exporting a function that returns db

