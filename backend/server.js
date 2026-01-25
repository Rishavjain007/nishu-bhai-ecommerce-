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

/* ================== CONFIG ================== */
dotenv.config();
connectDB();

const app = express();

/* ================== CORS (FINAL FIX) ================== */
const allowedOrigins = [
  "http://localhost:5173", // frontend local
  "http://localhost:5174", // admin local
  "https://nishu-bhai-ecommerce.vercel.app", // frontend live
  "https://nishu-bhai-admin.vercel.app", // admin live (change if different)
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without origin (Postman, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* Preflight requests */
app.options("*", cors());

/* ================== MIDDLEWARES ================== */
app.use(express.json());

/* ================== ROUTES ================== */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/categories", categoryRoutes);

/* ================== RAZORPAY ROUTES (SAFE) ================== */
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  app.post("/api/payment/create-order", createRazorpayOrder);
  app.post("/api/payment/verify", verifyRazorpayPayment);
}

/* ================== ROOT ================== */
app.get("/", (req, res) => {
  res.send("E-Commerce API Running 🚀");
});

/* ================== ERROR HANDLER ================== */
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
  });
});

/* ================== START SERVER ================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
