import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],

    shippingAddress: {
      fullName: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
      phone: String,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "RAZORPAY"],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },

    razorpayOrderId: String,
    razorpayPaymentId: String,

    totalAmount: {
      type: Number,
      required: true,
    },

    orderStatus: {
      type: String,
      enum: ["PLACED", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PLACED",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
