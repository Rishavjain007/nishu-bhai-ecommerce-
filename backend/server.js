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

// dotenv.config();
// connectDB();

// const app = express();

// /* ===== CORS CONFIG (PRODUCTION SAFE) ===== */
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173", // frontend local
//       "http://localhost:5174", // admin local
//       process.env.FRONTEND_URL, // netlify frontend
//       process.env.ADMIN_URL,    // netlify admin
//     ],
//     credentials: true,
//   })
// );

// /* Middlewares */
// app.use(express.json());

// /* Routes */
// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/categories", categoryRoutes);

// /* Razorpay Routes (SAFE) */
// if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
//   app.post("/api/payment/create-order", createRazorpayOrder);
//   app.post("/api/payment/verify", verifyRazorpayPayment);
// }

// /* Root Route */
// app.get("/", (req, res) => {
//   res.send("E-Commerce API Running 🚀");
// });

// /* Error Handling */
// app.use((err, req, res, next) => {
//   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//   res.status(statusCode).json({
//     message: err.message,
//   });
// });

// /* Start Server */
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
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








// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";

// import authRoutes from "./routes/authRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";

// dotenv.config();

// const app = express();

// /* ===== BODY PARSER ===== */
// app.use(express.json());

// /* ===== 🔥 CORS FIX (VERCEL + ADMIN + USER) ===== */
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, OPTIONS"
//   );

//   // IMPORTANT: preflight request
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }

//   next();
// });

// /* ===== DATABASE ===== */
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error(err));

// /* ===== ROUTES ===== */
// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/categories", categoryRoutes);

// /* ===== ROOT ===== */
// app.get("/", (req, res) => {
//   res.send("API Running 🚀");
// });

// /* ===== SERVER ===== */
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });








// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";

// import authRoutes from "./routes/authRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";

// dotenv.config();

// const app = express();

// /* ===============================
//    🔥 GLOBAL CORS (ABSOLUTE FIX)
// ================================ */
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, PATCH, DELETE, OPTIONS"
//   );

//   // VERY IMPORTANT: Preflight request
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }

//   next();
// });

// /* ===== BODY PARSER ===== */
// app.use(express.json());

// /* ===== DATABASE ===== */
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error(err));

// /* ===== ROUTES ===== */
// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/categories", categoryRoutes);

// /* ===== ROOT ===== */
// app.get("/", (req, res) => {
//   res.send("API Running 🚀");
// });

// /* ===== SERVER ===== */
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


















// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";

// import authRoutes from "./routes/authRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";

// dotenv.config();

// const app = express();

// /* ===============================
//    ✅ CORRECT CORS CONFIG
// ================================ */
// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://localhost:5174",
//   "https://nishu-bhai-ecommerce.vercel.app",
//   "https://nishu-bhai-ecommerce-admin.vercel.app",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // allow requests with no origin (Postman, mobile apps)
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// /* 🔥 VERY IMPORTANT FOR PREFLIGHT */
// app.options("*", cors());

// /* ===============================
//    BODY PARSER
// ================================ */
// app.use(express.json());

// /* ===============================
//    DATABASE
// ================================ */
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error(err));

// /* ===============================
//    ROUTES
// ================================ */
// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/categories", categoryRoutes);

// /* ===============================
//    ROOT
// ================================ */
// app.get("/", (req, res) => {
//   res.send("API Running 🚀");
// });

// /* ===============================
//    SERVER
// ================================ */
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




















// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";

// import authRoutes from "./routes/authRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";

// dotenv.config();

// const app = express();

// /* ===============================
//    ✅ CORS: allow specific origins,
//    echo origin, and support credentials
// ================================ */
// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://localhost:5174",
//   "https://nishu-bhai-ecommerce.vercel.app",
//   "https://nishu-bhai-ecommerce-admin.vercel.app",
// ];

// const corsOptions = {
//   origin: (origin, callback) => {
//     // allow non-browser requests (Postman, mobile apps) that have no origin
//     if (!origin) return callback(null, true);

//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true, // if frontend sends cookies / credentials
// };

// app.use(cors(corsOptions));
// // VERY IMPORTANT: respond to preflight requests using the SAME corsOptions
// app.options("*", cors(corsOptions));

// /* Fallback safety middleware: ensure headers are always present (helps with proxies/short-circuits) */
// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   if (origin && allowedOrigins.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//   }
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,POST,PUT,PATCH,DELETE,OPTIONS"
//   );

//   if (req.method === "OPTIONS") {
//     console.log("Handled preflight OPTIONS for", req.originalUrl, "from", origin);
//     return res.sendStatus(200);
//   }
//   next();
// });

// /* ===============================
//    BODY PARSER
// ================================ */
// app.use(express.json());

// /* ===============================
//    DATABASE
// ================================ */
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error(err));

// /* ===============================
//    ROUTES
// ================================ */
// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/categories", categoryRoutes);

// /* ===============================
//    ROOT
// ================================ */
// app.get("/", (req, res) => {
//   res.send("API Running 🚀");
// });

// /* ===============================
//    SERVER
// ================================ */
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });









import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cartRoutes from "./routes/cartRoutes.js"; // ✅ IMPORTANT
import orderRoutes from "./routes/orderRoutes.js";


dotenv.config();

const app = express();

/* ===============================
   ✅ CORS CONFIG (PRODUCTION SAFE)
================================ */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://nishu-bhai-ecommerce.vercel.app",
  "https://nishu-bhai-ecommerce-admin.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

/* ===============================
   DATABASE
================================ */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

/* ===============================
   ROUTES
================================ */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes); // ✅ FIXED
app.use("/api/orders", orderRoutes); // ✅ MUST


/* ===============================
   ROOT
================================ */
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

/* ===============================
   SERVER
================================ */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
