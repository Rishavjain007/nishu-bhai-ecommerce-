import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "./razorpay.js";

dotenv.config();
connectDB();

const app = express();

/* ===== CORS CONFIG (PRODUCTION SAFE) ===== */
app.use(
  cors({
    origin: [
      "http://localhost:5173", // frontend local
      "http://localhost:5174", // admin local
      process.env.FRONTEND_URL, // netlify frontend
      process.env.ADMIN_URL,    // netlify admin
    ],
    credentials: true,
  })
);

/* Middlewares */
app.use(express.json());

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/categories", categoryRoutes);

/* Razorpay Routes (SAFE) */
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  app.post("/api/payment/create-order", createRazorpayOrder);
  app.post("/api/payment/verify", verifyRazorpayPayment);
}

/* Root Route */
app.get("/", (req, res) => {
  res.send("E-Commerce API Running 🚀");
});

/* Error Handling */
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
  });
});

/* Start Server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
