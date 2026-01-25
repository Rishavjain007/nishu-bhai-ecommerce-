import Product from "../models/Product.js";
import Category from "../models/Category.js";

/* 📦 Get all products */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* 🔍 Get single product */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ➕ Create product (Admin) */
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock, image } = req.body;

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const product = await Product.create({
      name,
      price,
      description,
      category,
      stock,
      image,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ✏️ Update product (Admin) */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    Object.assign(product, req.body);
    const updated = await product.save();

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ❌ Delete product (Admin – Soft delete) */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.isActive = false;
    await product.save();

    res.json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
