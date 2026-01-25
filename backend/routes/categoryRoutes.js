import express from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/categoryController.js";

import { protect, admin } from "../middlewares/authMiddleware.js";
import { deleteCategory } from "../controllers/categoryController.js";

const router = express.Router();

/* Public */
router.get("/", getCategories);

/* Admin */
router.post("/", protect, admin, createCategory);
router.delete("/:id", protect, admin, deleteCategory);

export default router;
