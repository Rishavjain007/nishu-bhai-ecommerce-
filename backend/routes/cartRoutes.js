import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} from "../controllers/cartController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

/* 🛒 Get user cart */
router.get("/", protect, getCart);

/* ➕ Add item to cart */
router.post("/add", protect, addToCart);

/* 🔄 Update quantity */
router.put("/update", protect, updateCartItem);

/* ❌ Remove item */
router.delete("/remove", protect, removeCartItem);

export default router;
