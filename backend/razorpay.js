import Razorpay from "razorpay";
import crypto from "crypto";

let razorpayInstance = null;

/* Initialize only if keys exist */
if (
  process.env.RAZORPAY_KEY_ID &&
  process.env.RAZORPAY_KEY_SECRET
) {
  razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

/* 💳 Create Razorpay Order */
export const createRazorpayOrder = async (req, res) => {
  if (!razorpayInstance) {
    return res
      .status(501)
      .json({ message: "Payment gateway not configured yet" });
  }

  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `order_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ✅ Verify Payment */
export const verifyRazorpayPayment = async (req, res) => {
  if (!razorpayInstance) {
    return res
      .status(501)
      .json({ message: "Payment gateway not configured yet" });
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
