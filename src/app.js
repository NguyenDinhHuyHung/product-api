require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Middleware đọc JSON
app.use(express.json());

// Route kiểm tra API
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Product API is running"
  });
});
// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy"
  });
});

// Product routes
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Kết nối MongoDB trước, sau đó mới khởi động server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Product API running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });