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





























// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";

// import connectDB from "./config/db.js";

// import authRoutes from "./routes/authRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import cartRoutes from "./routes/cartRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";

// import {
//   createRazorpayOrder,
//   verifyRazorpayPayment,
// } from "./razorpay.js";

// /* ================= CONFIG ================= */
// dotenv.config();
// connectDB();

// const app = express();

// /* ================= FORCE CORS (FINAL FIX) ================= */
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, OPTIONS"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization"
//   );

//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }

//   next();
// });

// /* ================= MIDDLEWARE ================= */
// app.use(express.json());

// /* ================= ROUTES ================= */
// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/categories", categoryRoutes);

// /* ================= RAZORPAY ROUTES ================= */
// if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
//   app.post("/api/payment/create-order", createRazorpayOrder);
//   app.post("/api/payment/verify", verifyRazorpayPayment);
// }

// /* ================= ROOT ================= */
// app.get("/", (req, res) => {
//   res.send("E-Commerce API Running 🚀");
// });

// /* ================= ERROR HANDLER ================= */
// app.use((err, req, res, next) => {
//   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//   res.status(statusCode).json({
//     message: err.message,
//   });
// });

// /* ================= START SERVER ================= */
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });






// import express from "express";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();

// /* FORCE CORS — NO DEPENDENCY */
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });

// app.use(express.json());

// app.get("/api/products", (req, res) => {
//   res.json([{ test: "CORS WORKING" }]);
// });

// app.post("/api/auth/register", (req, res) => {
//   res.json({ success: true });
// });

// app.get("/", (req, res) => {
//   res.send("API OK");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log("Server running on port", PORT);
// });





// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";

// import connectDB from "./config/db.js";

// import authRoutes from "./routes/authRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import cartRoutes from "./routes/cartRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";

// dotenv.config();
// connectDB();

// const app = express();

// /* ===== CORS (PRODUCTION SAFE) ===== */
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173", // frontend local
//       "http://localhost:5174", // admin local
//       "https://nishu-bhai-ecommerce.vercel.app", // frontend live
//       "https://nishu-bhai-admin.vercel.app",     // admin live (future)
//     ],
//     credentials: true,
//   })
// );

// app.use(express.json());

// /* Routes */
// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/categories", categoryRoutes);

// /* Root */
// app.get("/", (req, res) => {
//   res.send("E-Commerce API Running 🚀");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, reflect => {
//   console.log(`Server running on port ${PORT}`);
// });





// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";

// import connectDB from "./config/db.js";

// import authRoutes from "./routes/authRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import cartRoutes from "./routes/cartRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";

// dotenv.config();
// connectDB();

// const app = express();

// /* ===== CORS CONFIG (FINAL & SAFE) ===== */
// const corsOptions = {
//   origin: [
//     "http://localhost:5173",
//     "http://localhost:5174",
//     "https://nishu-bhai-ecommerce.vercel.app",
//     "https://nishu-bhai-admin.vercel.app",
//   ],
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions)); // 🔥 VERY IMPORTANT

// app.use(express.json());

// /* Routes */
// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/categories", categoryRoutes);

// /* Root */
// app.get("/", (req, res) => {
//   res.send("E-Commerce API Running 🚀");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });









// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import mongoose from "mongoose";

// import authRoutes from "./routes/authRoutes.js";

// dotenv.config();

// const app = express();

// /* ===== MIDDLEWARE ===== */
// app.use(express.json());

// app.use(
//   cors({
//     origin: "*", // ✅ SIMPLE & WORKING (later restrict kar sakte ho)
//   })
// );

// /* ===== DATABASE ===== */
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error(err));

// /* ===== ROUTES ===== */
// app.use("/api/auth", authRoutes);

// /* ===== TEST ROUTE ===== */
// app.get("/", (req, res) => {
//   res.send("API Running 🚀");
// });

// /* ===== SERVER ===== */
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
