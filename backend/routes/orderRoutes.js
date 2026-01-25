import express from "express";
import {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

/* 📦 Place new order */
router.post("/", protect, placeOrder);

/* 📜 User order history */
router.get("/my-orders", protect, getMyOrders);

/* 👑 Admin: get all orders */
router.get("/", protect, admin, getAllOrders);

/* 🔄 Admin: update order status */
router.put("/:id", protect, admin, updateOrderStatus);

export default router;
