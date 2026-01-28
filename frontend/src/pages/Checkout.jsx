import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { isLoggedIn } from "../utils/auth";

function Checkout() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  if (!isLoggedIn()) {
    navigate("/login");
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      await axios.post(
        "https://nishu-bhai-ecommerce.onrender.com/api/orders",
        {
          shippingAddress: form,
          paymentMethod: "COD",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Order placed successfully ✅");
      navigate("/");
    } catch (error) {
      console.error("ORDER ERROR:", error.response || error);
      alert("Failed to place order ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "30px auto" }}>
      <h2>Checkout</h2>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          name={key}
          placeholder={key.toUpperCase()}
          value={form[key]}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
          }}
        />
      ))}

      <button
        onClick={placeOrder}
        disabled={loading}
        style={{ width: "100%", padding: "10px" }}
      >
        {loading ? "Placing Order..." : "Place Order (COD)"}
      </button>
    </div>
  );
}

export default Checkout;
