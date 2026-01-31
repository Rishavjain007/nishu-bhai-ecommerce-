import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = await Order.create({
      user: req.user._id,
      items: cart.items.map((i) => ({
        product: i.product._id,
        name: i.product.name,
        price: i.price,
        quantity: i.quantity,
        image: i.product.image,
      })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      totalAmount: cart.totalAmount,
    });

    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(orders);
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.orderStatus = req.body.status || order.orderStatus;
  await order.save();

  res.json(order);
};
